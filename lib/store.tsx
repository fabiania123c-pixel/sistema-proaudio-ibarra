"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";
import {
  atencionesSeed,
  audifonosSeed,
  citasSeed,
  comunicacionesSeed,
  documentosSeed,
  eventosSeed,
  HOY,
  pacientesSeed,
  profesionales,
  recordatoriosSeed,
  SUCURSAL_ID,
  sucursales,
} from "./data";
import { fechaCorta } from "./format";
import type {
  Atencion,
  Audifono,
  Cita,
  Comunicacion,
  Documento,
  EstadoCita,
  EstadoRecordatorio,
  EventoTimeline,
  Paciente,
  Profesional,
  Recordatorio,
  Sucursal,
} from "./types";

export const USUARIA_ACTUAL = "Mayra Lechón";
export const USUARIA_ACTUAL_ID = "PRO-03";

/** Nombre del bucket de Supabase Storage donde viven los documentos reales. */
const BUCKET_DOCUMENTOS = "documentos";

/**
 * Trae TODAS las filas de una tabla, sin importar cuántas sean.
 *
 * Supabase (PostgREST) limita cada consulta a un máximo de filas por defecto
 * (normalmente 1000), así que un simple `.select("*")` se queda corto apenas
 * una tabla crece más de eso — como pasó con "pacientes" (más de 6000
 * registros reales, de los cuales solo se veían los primeros 1000). Esta
 * función pagina automáticamente con `.range()` hasta traer todo.
 */
async function traerTodasLasFilas<T>(
  tabla: string
): Promise<{ data: T[] | null; error: { message: string } | null }> {
  const TAMANO_PAGINA = 1000;
  let desde = 0;
  const filas: T[] = [];
  while (true) {
    const { data, error } = await supabase
      .from(tabla)
      .select("*")
      .range(desde, desde + TAMANO_PAGINA - 1);
    if (error) return { data: null, error };
    if (!data || data.length === 0) break;
    filas.push(...(data as T[]));
    if (data.length < TAMANO_PAGINA) break; // última página
    desde += TAMANO_PAGINA;
  }
  return { data: filas, error: null };
}

interface Store {
  hoy: string;
  cargando: boolean;
  conectadoASupabase: boolean;
  sucursales: Sucursal[];
  sucursalId: string;
  profesionales: Profesional[];
  pacientes: Paciente[];
  citas: Cita[];
  atenciones: Atencion[];
  recordatorios: Recordatorio[];
  documentos: Documento[];
  audifonos: Audifono[];
  comunicaciones: Comunicacion[];
  eventos: EventoTimeline[];

  crearPaciente: (datos: Partial<Paciente>) => Paciente;
  actualizarPaciente: (id: string, patch: Partial<Paciente>) => void;
  crearCita: (datos: Omit<Cita, "id" | "estado"> & { estado?: EstadoCita }) => Cita;
  cambiarEstadoCita: (id: string, estado: EstadoCita, motivo?: string) => void;
  marcarIncompleta: (id: string) => void;
  reagendarCita: (
    id: string,
    nueva: { fecha: string; hora: string; profesionalId: string },
    motivo: string
  ) => Cita | undefined;
  registrarAtencion: (datos: {
    pacienteId: string;
    citaId?: string;
    tipo: string;
    observacion: string;
    indicacion: string;
    proximaAccion: string;
    fechaSeguimiento?: string;
    responsableId: string;
    documentoAdjunto?: string;
  }) => void;
  registrarContacto: (datos: {
    pacienteId: string;
    canal: string;
    resultado: string;
    nota?: string;
    recordatorioId?: string;
  }) => void;
  crearRecordatorio: (
    datos: Omit<Recordatorio, "id" | "estado"> & { estado?: EstadoRecordatorio }
  ) => void;
  actualizarRecordatorio: (id: string, patch: Partial<Recordatorio>) => void;
  /**
   * Crea el registro de un documento y, si se adjunta un archivo real, lo sube
   * al bucket de Supabase Storage "documentos" antes de guardar la fila. Es
   * asíncrona porque la subida del archivo tarda; el llamador debe esperarla
   * (await) para saber cuándo terminó y poder cerrar el modal.
   */
  agregarDocumento: (datos: {
    pacienteId: string;
    tipo: string;
    titulo: string;
    fechaDocumento?: string;
    observaciones?: string;
    archivo?: File;
  }) => Promise<{ ok: boolean; error?: string }>;
  /**
   * Genera una URL temporal (10 minutos) para abrir o descargar un documento
   * real guardado en Storage. Recibe la ruta guardada en `archivo_url`.
   */
  obtenerUrlDocumento: (rutaArchivo: string) => Promise<string | null>;
  guardarAudifono: (datos: Omit<Audifono, "id"> & { id?: string }) => void;
}

const Ctx = createContext<Store | null>(null);

/**
 * ID único basado en el reloj, no en un contador que se reinicia cada vez que
 * recargas la página. Un contador simple (PAC-00501, PAC-00502...) choca
 * consigo mismo entre sesiones. Con reloj + un sufijo aleatorio, esto no
 * puede volver a pasar sin importar cuántas veces recargues.
 */
function nuevoId(prefijo: string): string {
  const marcaDeTiempo = Date.now().toString(36);
  const azar = Math.random().toString(36).slice(2, 6);
  return `${prefijo}-${marcaDeTiempo}${azar}`.toUpperCase();
}

/** Resta un día a una fecha en formato YYYY-MM-DD, cruzando mes/año correctamente. */
function diaAntes(fechaISO: string): string {
  const d = new Date(fechaISO + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/** Quita acentos, espacios y símbolos que Supabase Storage no acepta bien en rutas. */
function limpiarNombreArchivo(nombre: string): string {
  return nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

const TABLA: Record<string, string> = {
  pacientes: "pacientes",
  citas: "citas",
  atenciones: "atenciones",
  recordatorios: "recordatorios",
  documentos: "documentos",
  audifonos: "audifonos",
  comunicaciones: "comunicaciones",
  eventos: "eventos_timeline",
};

function persistir(tabla: string, accion: "insert" | "update", fila: object, id?: string) {
  const ejecutar = async () => {
    const { error } =
      accion === "insert"
        ? await supabase.from(TABLA[tabla]).insert([fila])
        : await supabase.from(TABLA[tabla]).update(fila).eq("id", id ?? (fila as { id?: string }).id);
    if (error) {
      console.error(`[Supabase] Error al guardar en "${tabla}":`, error.message, fila);
    }
  };
  void ejecutar();
}

function aplanarGarantia(equipo: Audifono) {
  const { garantia, ...resto } = equipo as Audifono & { garantia?: { inicio?: string; vencimiento?: string } };
  return {
    ...resto,
    garantia_inicio: garantia?.inicio ?? null,
    garantia_vencimiento: garantia?.vencimiento ?? null,
  };
}

function anidarGarantia(fila: Record<string, unknown>): Audifono {
  const { garantia_inicio, garantia_vencimiento, ...resto } = fila as Record<string, unknown> & {
    garantia_inicio?: string | null;
    garantia_vencimiento?: string | null;
  };
  return {
    ...(resto as unknown as Audifono),
    garantia:
      garantia_inicio || garantia_vencimiento
        ? { inicio: garantia_inicio ?? undefined, vencimiento: garantia_vencimiento ?? undefined }
        : undefined,
  };
}

const ETIQUETA_CAMPO: Partial<Record<keyof Paciente, string>> = {
  nombres: "Nombres",
  apellidos: "Apellidos",
  documento: "Cédula o documento",
  fichaFisica: "Nº de ficha física",
  telefono: "Teléfono principal",
  telefono2: "Teléfono 2",
  telefonoFamiliar: "Teléfono de familiar",
  correo: "Correo",
  ciudad: "Ciudad",
  agencia: "Agencia",
  comoConocio: "Cómo conoció Proaudio",
  referidoPor: "Quién lo refirió",
  profesionalId: "Profesional responsable",
  categoria: "Categoría",
  ultimaIndicacion: "Última indicación",
  proximaAccion: "Próxima acción recomendada",
  estadoDigitalizacion: "Estado de digitalización",
  ubicacionArchivo: "Ubicación de la ficha física",
  fechaNacimiento: "Fecha de nacimiento",
  fechaPrimeraVisita: "Fecha de primera visita",
  estado: "Estado del paciente",
  notas: "Notas administrativas",
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [atenciones, setAtenciones] = useState<Atencion[]>([]);
  const [recordatorios, setRecordatorios] = useState<Recordatorio[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [audifonos, setAudifonos] = useState<Audifono[]>([]);
  const [comunicaciones, setComunicaciones] = useState<Comunicacion[]>([]);
  const [eventos, setEventos] = useState<EventoTimeline[]>([]);
  const [cargando, setCargando] = useState(true);
  const [conectadoASupabase, setConectadoASupabase] = useState(false);

  useEffect(() => {
    let cancelado = false;
    async function cargarDatosReales() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setPacientes(pacientesSeed);
        setCitas(citasSeed);
        setAtenciones(atencionesSeed);
        setRecordatorios(recordatoriosSeed);
        setDocumentos(documentosSeed);
        setAudifonos(audifonosSeed);
        setComunicaciones(comunicacionesSeed);
        setEventos(eventosSeed);
        setCargando(false);
        return;
      }
      const [pac, cit, ate, rec, doc, aud, com, evt] = await Promise.all([
        traerTodasLasFilas<Paciente>("pacientes"),
        traerTodasLasFilas<Cita>("citas"),
        traerTodasLasFilas<Atencion>("atenciones"),
        traerTodasLasFilas<Recordatorio>("recordatorios"),
        traerTodasLasFilas<Documento>("documentos"),
        traerTodasLasFilas<Record<string, unknown>>("audifonos"),
        traerTodasLasFilas<Comunicacion>("comunicaciones"),
        traerTodasLasFilas<EventoTimeline>("eventos_timeline"),
      ]);
      if (cancelado) return;

      const errores = [pac, cit, ate, rec, doc, aud, com, evt].filter((r) => r.error);
      if (errores.length) {
        console.error("[Supabase] Error cargando datos iniciales:", errores.map((e) => e.error?.message));
      }

      if (pac.data) {
        setPacientes(pac.data as Paciente[]);
      }
      if (cit.data) setCitas(cit.data as Cita[]);
      if (ate.data) setAtenciones(ate.data as Atencion[]);
      if (rec.data) setRecordatorios(rec.data as Recordatorio[]);
      if (doc.data) setDocumentos(doc.data as Documento[]);
      if (aud.data) setAudifonos((aud.data as Record<string, unknown>[]).map(anidarGarantia));
      if (com.data) setComunicaciones(com.data as Comunicacion[]);
      if (evt.data) setEventos(evt.data as EventoTimeline[]);

      setConectadoASupabase(true);
      setCargando(false);
    }
    cargarDatosReales();

    // Vuelve a cargar los datos reales apenas se detecte una sesión iniciada
    // (por ejemplo, justo después de hacer login), en vez de quedarse para
    // siempre con lo que se cargó (vacío) antes de autenticarse.
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, session) => {
      if (session) {
        cargarDatosReales();
      }
    });

    return () => {
      cancelado = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const pushEvento = useCallback((e: Omit<EventoTimeline, "id">) => {
    const nuevo: EventoTimeline = { ...e, id: nuevoId("EVT") };
    setEventos((prev) => [nuevo, ...prev]);
    persistir("eventos", "insert", nuevo);
  }, []);

  const crearPaciente = useCallback(
    (datos: Partial<Paciente>): Paciente => {
      const nuevo: Paciente = {
        id: nuevoId("PAC"),
        nombres: datos.nombres ?? "",
        apellidos: datos.apellidos ?? "",
        telefono: datos.telefono ?? "",
        sucursalId: SUCURSAL_ID,
        estado: "Paciente nuevo",
        estadoDigitalizacion: "Sin digitalizar",
        esNuevo: true,
        ...datos,
      } as Paciente;
      setPacientes((prev) => [nuevo, ...prev]);
      persistir("pacientes", "insert", nuevo);
      const fechaFicha = nuevo.fechaPrimeraVisita ?? HOY;
      pushEvento({
        pacienteId: nuevo.id,
        fecha: fechaFicha,
        tipo: "Ficha",
        titulo: "Ficha creada",
        detalle:
          fechaFicha !== HOY
            ? `Paciente antiguo: primera visita el ${fechaCorta(fechaFicha)}. Ficha registrada en el sistema el ${fechaCorta(HOY)}.`
            : undefined,
        autor: USUARIA_ACTUAL,
      });
      return nuevo;
    },
    [pushEvento]
  );

  const actualizarPaciente = useCallback(
    (id: string, patch: Partial<Paciente>) => {
      const anterior = pacientes.find((p) => p.id === id);
      setPacientes((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
      persistir("pacientes", "update", patch, id);
      if (!anterior) return;

      const cambios = (Object.keys(patch) as (keyof Paciente)[])
        .filter((campo) => ETIQUETA_CAMPO[campo] && patch[campo] !== anterior[campo])
        .map((campo) => {
          const antes = anterior[campo];
          const ahora = patch[campo];
          const textoAntes = antes === undefined || antes === "" ? "(vacío)" : String(antes);
          const textoAhora = ahora === undefined || ahora === "" ? "(vacío)" : String(ahora);
          return `${ETIQUETA_CAMPO[campo]}: "${textoAntes}" → "${textoAhora}"`;
        });

      if (cambios.length === 0) return;
      pushEvento({
        pacienteId: id,
        fecha: HOY,
        tipo: "Ficha",
        titulo: `Datos de la ficha modificados (${cambios.length} ${cambios.length === 1 ? "campo" : "campos"})`,
        detalle: cambios.join(" · "),
        autor: USUARIA_ACTUAL,
      });
    },
    [pacientes, pushEvento]
  );

  const crearCita = useCallback(
    (datos: Omit<Cita, "id" | "estado"> & { estado?: EstadoCita }): Cita => {
      const cita: Cita = { id: nuevoId("CIT"), estado: "Agendada", ...datos };
      setCitas((prev) => [cita, ...prev]);
      persistir("citas", "insert", cita);
      const prof = profesionales.find((p) => p.id === cita.profesionalId);
      pushEvento({
        pacienteId: cita.pacienteId,
        fecha: cita.fecha,
        tipo: "Cita",
        titulo: `Cita agendada · ${cita.motivo} · ${cita.hora} · ${prof?.nombreCorto ?? ""}`,
        detalle: "Estado: Agendada",
        autor: USUARIA_ACTUAL,
        refId: cita.id,
      });

      const recordatorioCita: Recordatorio = {
        id: nuevoId("REC"),
        tipo: "Recordatorio de cita",
        categoria: "Recordatorio de cita",
        pacienteId: cita.pacienteId,
        motivo: `Enviar recordatorio de la cita del ${fechaCorta(cita.fecha)} a las ${cita.hora}.`,
        fecha: diaAntes(cita.fecha),
        responsableId: USUARIA_ACTUAL_ID,
        prioridad: "Alta",
        estado: "Pendiente",
        canal: "WhatsApp",
      };
      setRecordatorios((prev) => [recordatorioCita, ...prev]);
      persistir("recordatorios", "insert", recordatorioCita);

      return cita;
    },
    [pushEvento]
  );

  const cambiarEstadoCita = useCallback(
    (id: string, estado: EstadoCita, motivo?: string) => {
      const cita = citas.find((c) => c.id === id);
      if (cita?.estado === "Incompleta") {
        console.warn(`Cita ${id} está Incompleta: debe registrarse la atención antes de cambiar su estado.`);
        return;
      }
      setCitas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, estado, motivoCambio: motivo ?? c.motivoCambio } : c))
      );
      persistir("citas", "update", { estado, motivoCambio: motivo ?? cita?.motivoCambio }, id);
      if (cita && (estado === "Cancelada" || estado === "No atendida")) {
        pushEvento({
          pacienteId: cita.pacienteId,
          fecha: HOY,
          tipo: "Cita",
          titulo: `Cita ${estado.toLowerCase()} · ${cita.motivo} · ${fechaCorta(cita.fecha)} ${cita.hora}`,
          detalle: motivo ? `Motivo: ${motivo}` : undefined,
          autor: USUARIA_ACTUAL,
          refId: cita.id,
        });
      }
    },
    [citas, pushEvento]
  );

  const marcarIncompleta = useCallback(
    (id: string) => {
      const cita = citas.find((c) => c.id === id);
      if (!cita) return;
      setCitas((prev) => prev.map((c) => (c.id === id ? { ...c, estado: "Incompleta" as EstadoCita } : c)));
      persistir("citas", "update", { estado: "Incompleta" }, id);
      pushEvento({
        pacienteId: cita.pacienteId,
        fecha: HOY,
        tipo: "Cita",
        titulo: `Cita marcada como incompleta · ${cita.motivo} · ${fechaCorta(cita.fecha)} ${cita.hora}`,
        detalle: "Pendiente de que el audiólogo registre observaciones de la atención.",
        autor: USUARIA_ACTUAL,
        refId: cita.id,
      });
    },
    [citas, pushEvento]
  );

  const reagendarCita = useCallback(
    (
      id: string,
      nueva: { fecha: string; hora: string; profesionalId: string },
      motivo: string
    ): Cita | undefined => {
      const original = citas.find((c) => c.id === id);
      if (!original) return undefined;
      const citaNueva: Cita = {
        ...original,
        id: nuevoId("CIT"),
        fecha: nueva.fecha,
        hora: nueva.hora,
        profesionalId: nueva.profesionalId,
        estado: "Agendada",
        motivoCambio: undefined,
      };
      setCitas((prev) => [
        citaNueva,
        ...prev.map((c) =>
          c.id === id ? { ...c, estado: "Reagendada" as EstadoCita, motivoCambio: motivo } : c
        ),
      ]);
      persistir("citas", "insert", citaNueva);
      persistir("citas", "update", { estado: "Reagendada", motivoCambio: motivo }, id);
      pushEvento({
        pacienteId: original.pacienteId,
        fecha: HOY,
        tipo: "Reagendamiento",
        titulo: `Cita reagendada: de ${fechaCorta(original.fecha)} ${original.hora} a ${fechaCorta(nueva.fecha)} ${nueva.hora}`,
        detalle: `Motivo: ${motivo}. La cita original queda en el historial.`,
        autor: USUARIA_ACTUAL,
        refId: citaNueva.id,
      });
      return citaNueva;
    },
    [citas, pushEvento]
  );

  const registrarAtencion = useCallback(
    (datos: {
      pacienteId: string;
      citaId?: string;
      tipo: string;
      observacion: string;
      indicacion: string;
      proximaAccion: string;
      fechaSeguimiento?: string;
      responsableId: string;
      documentoAdjunto?: string;
    }) => {
      const cita = citas.find((c) => c.id === datos.citaId);
      const atencion: Atencion = {
        id: nuevoId("ATN"),
        fecha: HOY,
        profesionalId: cita?.profesionalId ?? "PRO-01",
        ...datos,
      };
      setAtenciones((prev) => [atencion, ...prev]);
      persistir("atenciones", "insert", atencion);
      if (datos.citaId) {
        setCitas((prev) =>
          prev.map((c) => (c.id === datos.citaId ? { ...c, estado: "Completada" as EstadoCita } : c))
        );
        persistir("citas", "update", { estado: "Completada" }, datos.citaId);
      }
      setPacientes((prev) =>
        prev.map((p) =>
          p.id === datos.pacienteId
            ? {
                ...p,
                ultimaVisita: HOY,
                ultimaIndicacion: datos.indicacion || p.ultimaIndicacion,
                proximaAccion: datos.proximaAccion || p.proximaAccion,
                esNuevo: false,
              }
            : p
        )
      );
      persistir(
        "pacientes",
        "update",
        { ultimaVisita: HOY, ultimaIndicacion: datos.indicacion, proximaAccion: datos.proximaAccion, esNuevo: false },
        datos.pacienteId
      );
      const prof = profesionales.find((p) => p.id === atencion.profesionalId);
      pushEvento({
        pacienteId: datos.pacienteId,
        fecha: HOY,
        tipo: "Atención",
        titulo: `Atención · ${datos.tipo}${prof ? ` · ${prof.nombre}` : ""}`,
        autor: USUARIA_ACTUAL,
        refId: atencion.id,
      });
      if (datos.proximaAccion) {
        const rec: Recordatorio = {
          id: nuevoId("REC"),
          tipo: "Seguimiento posterior a la atención",
          categoria: "Tarea para recepción",
          pacienteId: datos.pacienteId,
          motivo: `${datos.proximaAccion} (definido al registrar la atención de hoy).`,
          fecha: datos.fechaSeguimiento || HOY,
          responsableId: datos.responsableId,
          prioridad: "Media",
          estado: "Pendiente",
          canal: "Llamada",
        };
        setRecordatorios((prev) => [rec, ...prev]);
        persistir("recordatorios", "insert", rec);
        pushEvento({
          pacienteId: datos.pacienteId,
          fecha: HOY,
          tipo: "Recordatorio",
          titulo: `Tarea de seguimiento creada: ${datos.proximaAccion}`,
          detalle: `Prevista para ${fechaCorta(rec.fecha)}.`,
          autor: USUARIA_ACTUAL,
        });
      }
    },
    [citas, pushEvento]
  );

  const registrarContacto = useCallback(
    (datos: {
      pacienteId: string;
      canal: string;
      resultado: string;
      nota?: string;
      recordatorioId?: string;
    }) => {
      const com: Comunicacion = {
        id: nuevoId("COM"),
        pacienteId: datos.pacienteId,
        fecha: HOY,
        canal: datos.canal,
        resultado: datos.resultado,
        nota: datos.nota,
        registradoPorId: USUARIA_ACTUAL_ID,
      };
      setComunicaciones((prev) => [com, ...prev]);
      persistir("comunicaciones", "insert", com);
      if (datos.recordatorioId) {
        setRecordatorios((prev) =>
          prev.map((r) =>
            r.id === datos.recordatorioId
              ? {
                  ...r,
                  estado: "Completado" as EstadoRecordatorio,
                  nota: `Contacto: ${datos.resultado}`,
                }
              : r
          )
        );
        persistir(
          "recordatorios",
          "update",
          { estado: "Completado", nota: `Contacto: ${datos.resultado}` },
          datos.recordatorioId
        );
      }
      pushEvento({
        pacienteId: datos.pacienteId,
        fecha: HOY,
        tipo: "Contacto",
        titulo: `Contacto · ${datos.canal}`,
        detalle: `Resultado: ${datos.resultado}${datos.nota ? `. ${datos.nota}` : ""}`,
        autor: USUARIA_ACTUAL,
      });
    },
    [pushEvento]
  );

  const crearRecordatorio = useCallback(
    (datos: Omit<Recordatorio, "id" | "estado"> & { estado?: EstadoRecordatorio }) => {
      const rec: Recordatorio = { id: nuevoId("REC"), estado: "Pendiente", ...datos };
      setRecordatorios((prev) => [rec, ...prev]);
      persistir("recordatorios", "insert", rec);
      if (rec.pacienteId) {
        pushEvento({
          pacienteId: rec.pacienteId,
          fecha: HOY,
          tipo: "Recordatorio",
          titulo: `Recordatorio creado: ${rec.tipo}`,
          detalle: rec.motivo,
          autor: USUARIA_ACTUAL,
        });
      }
    },
    [pushEvento]
  );

  const actualizarRecordatorio = useCallback(
    (id: string, patch: Partial<Recordatorio>) => {
      setRecordatorios((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
      persistir("recordatorios", "update", patch, id);
      const rec = recordatorios.find((r) => r.id === id);
      if (rec?.pacienteId && patch.estado && patch.estado !== rec.estado) {
        pushEvento({
          pacienteId: rec.pacienteId,
          fecha: HOY,
          tipo: "Recordatorio",
          titulo: `Recordatorio ${patch.estado.toLowerCase()}: ${rec.tipo}`,
          detalle: patch.motivoCancelacion ? `Motivo: ${patch.motivoCancelacion}` : undefined,
          autor: USUARIA_ACTUAL,
        });
      }
    },
    [recordatorios, pushEvento]
  );

  const agregarDocumento = useCallback(
    async (datos: {
      pacienteId: string;
      tipo: string;
      titulo: string;
      fechaDocumento?: string;
      observaciones?: string;
      archivo?: File;
    }): Promise<{ ok: boolean; error?: string }> => {
      const id = nuevoId("DOC");
      let archivo_url: string | undefined;

      // Si hay un archivo real, se sube primero al bucket de Supabase Storage.
      // La ruta incluye el id del paciente (para organizar por carpeta) y el id
      // del documento (para que nunca choque con otro archivo del mismo nombre).
      if (datos.archivo) {
        const nombreLimpio = limpiarNombreArchivo(datos.archivo.name);
        const ruta = `${datos.pacienteId}/${id}-${nombreLimpio}`;
        const { error: errorSubida } = await supabase.storage
          .from(BUCKET_DOCUMENTOS)
          .upload(ruta, datos.archivo, { upsert: false });
        if (errorSubida) {
          console.error("[Supabase Storage] Error al subir archivo:", errorSubida.message);
          return {
            ok: false,
            error:
              "No se pudo subir el archivo. Verifique que el bucket \"documentos\" exista en Supabase Storage y vuelva a intentar.",
          };
        }
        archivo_url = ruta;
      }

      const { archivo: _archivo, ...resto } = datos;
      const doc: Documento = {
        id,
        fechaCarga: HOY,
        cargadoPorId: USUARIA_ACTUAL_ID,
        ...resto,
        archivo_url,
      };
      setDocumentos((prev) => [doc, ...prev]);
      persistir("documentos", "insert", doc);
      pushEvento({
        pacienteId: datos.pacienteId,
        fecha: HOY,
        tipo: "Documento",
        titulo: `Documento cargado: ${datos.titulo}`,
        autor: USUARIA_ACTUAL,
        refId: doc.id,
      });
      return { ok: true };
    },
    [pushEvento]
  );

  const obtenerUrlDocumento = useCallback(async (ruta: string): Promise<string | null> => {
    const { data, error } = await supabase.storage
      .from(BUCKET_DOCUMENTOS)
      .createSignedUrl(ruta, 60 * 10); // válida 10 minutos
    if (error) {
      console.error("[Supabase Storage] Error generando URL del documento:", error.message);
      return null;
    }
    return data?.signedUrl ?? null;
  }, []);

  const guardarAudifono = useCallback(
    (datos: Omit<Audifono, "id"> & { id?: string }) => {
      const esNuevo = !datos.id;
      const equipo: Audifono = { ...datos, id: datos.id ?? nuevoId("AUD") } as Audifono;
      setAudifonos((prev) =>
        esNuevo ? [equipo, ...prev] : prev.map((a) => (a.id === equipo.id ? equipo : a))
      );
      persistir("audifonos", esNuevo ? "insert" : "update", aplanarGarantia(equipo), equipo.id);
      const resumen = `${equipo.marca} ${equipo.modelo} · ${equipo.oido}${
        equipo.serie ? ` · ${equipo.serie}` : ""
      }`;
      pushEvento({
        pacienteId: equipo.pacienteId,
        fecha: HOY,
        tipo: "Equipo",
        titulo: `${esNuevo ? "Equipo registrado" : "Equipo actualizado"} · ${resumen}`,
        detalle: [
          `Procedencia: ${equipo.procedencia}`,
          `Estado: ${equipo.estado}`,
          equipo.numeroFactura ? `Factura ${equipo.numeroFactura}` : null,
          equipo.garantia?.vencimiento
            ? `Garantía hasta ${fechaCorta(equipo.garantia.vencimiento)}`
            : "Garantía sin registrar",
        ]
          .filter(Boolean)
          .join(" · "),
        autor: USUARIA_ACTUAL,
        refId: equipo.id,
      });
    },
    [pushEvento]
  );

  const value = useMemo<Store>(
    () => ({
      hoy: HOY,
      cargando,
      conectadoASupabase,
      sucursales,
      sucursalId: SUCURSAL_ID,
      profesionales,
      pacientes,
      citas,
      atenciones,
      recordatorios,
      documentos,
      audifonos,
      comunicaciones,
      eventos,
      crearPaciente,
      actualizarPaciente,
      crearCita,
      cambiarEstadoCita,
      marcarIncompleta,
      reagendarCita,
      registrarAtencion,
      registrarContacto,
      crearRecordatorio,
      actualizarRecordatorio,
      agregarDocumento,
      obtenerUrlDocumento,
      guardarAudifono,
    }),
    [
      cargando,
      conectadoASupabase,
      pacientes,
      citas,
      atenciones,
      recordatorios,
      documentos,
      audifonos,
      comunicaciones,
      eventos,
      crearPaciente,
      actualizarPaciente,
      crearCita,
      cambiarEstadoCita,
      marcarIncompleta,
      reagendarCita,
      registrarAtencion,
      registrarContacto,
      crearRecordatorio,
      actualizarRecordatorio,
      agregarDocumento,
      obtenerUrlDocumento,
      guardarAudifono,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore debe usarse dentro de StoreProvider");
  return ctx;
}