"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarPlus,
  ClipboardList,
  BellPlus,
  PhoneCall,
  FileUp,
  Pencil,
  FileText,
  Plus,
  ChevronRight,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { fechaCorta, horaFin } from "@/lib/format";
import { diasParaVencer, estadoGarantia } from "@/lib/garantia";
import type { Audifono, EventoTimeline } from "@/lib/types";
import {
  Alerta,
  CategoriaBadge,
  DigitalizacionBadge,
  EstadoCitaBadge,
  FaseFutura,
  GarantiaBadge,
  Modal,
  ProcedenciaBadge,
  Vacio,
} from "@/components/ui";
import CitaFormModal from "@/components/modales/CitaForm";
import ContactoModal from "@/components/modales/Contacto";
import AudifonoFormModal from "@/components/modales/AudifonoForm";
import PacienteEditarModal from "@/components/modales/PacienteEditar";
import { DocumentoModal, RecordatorioFormModal } from "@/components/modales/Extras";

const PESTANIAS = [
  "Resumen",
  "Línea de tiempo",
  "Citas",
  "Audífonos",
  "Documentos",
  "Comunicaciones",
] as const;
type Pestania = (typeof PESTANIAS)[number];

const COLOR_EVENTO: Record<string, string> = {
  Cita: "bg-emerald-500",
  Atención: "bg-sky-500",
  Reagendamiento: "bg-violet-500",
  Contacto: "bg-amber-500",
  Recordatorio: "bg-slate-400",
  Documento: "bg-teal-500",
  Equipo: "bg-indigo-500",
  Ficha: "bg-slate-300",
};

/** Tipos de evento cuyo detalle se puede consultar desde la línea de tiempo. */
const TIPOS_CONSULTABLES = ["Cita", "Reagendamiento", "Atención", "Documento", "Equipo"];

export default function FichaPaciente() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const {
    hoy,
    pacientes,
    citas,
    atenciones,
    audifonos,
    documentos,
    comunicaciones,
    eventos,
    profesionales,
  } = useStore();
  const [pestania, setPestania] = useState<Pestania>("Resumen");
  const [filtroTimeline, setFiltroTimeline] = useState("Todo");
  const [modalCita, setModalCita] = useState(false);
  const [modalContacto, setModalContacto] = useState(false);
  const [modalRecordatorio, setModalRecordatorio] = useState(false);
  const [modalDocumento, setModalDocumento] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalAudifono, setModalAudifono] = useState<{ abierto: boolean; equipo?: Audifono | null }>({
    abierto: false,
  });
  const [eventoAbierto, setEventoAbierto] = useState<EventoTimeline | null>(null);

  const paciente = pacientes.find((p) => p.id === params.id);

  const citasPaciente = useMemo(
    () =>
      citas
        .filter((c) => c.pacienteId === params.id)
        .sort((a, b) => (b.fecha + b.hora).localeCompare(a.fecha + a.hora)),
    [citas, params.id]
  );
  const proxima = citasPaciente
    .filter((c) => c.fecha >= hoy && (c.estado === "Agendada" || c.estado === "Confirmada"))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))[0];
  const equipos = audifonos.filter((a) => a.pacienteId === params.id);
  const equiposActivos = equipos.filter((a) => a.estado !== "Dado de baja");
  const docs = documentos.filter((d) => d.pacienteId === params.id);
  const contactos = comunicaciones.filter((c) => c.pacienteId === params.id);
  const timeline = eventos
    .filter((e) => e.pacienteId === params.id)
    .filter((e) => filtroTimeline === "Todo" || e.tipo === filtroTimeline)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (!paciente) {
    return (
      <div className="space-y-3">
        <p className="text-slate-600">No se encontró el paciente.</p>
        <Link href="/pacientes" className="btn-secundario">
          Volver a Pacientes
        </Link>
      </div>
    );
  }

  const prof = profesionales.find((p) => p.id === paciente.profesionalId);
  const nombreProf = (id: string) => profesionales.find((p) => p.id === id)?.nombreCorto ?? id;

  function esConsultable(e: EventoTimeline) {
    return TIPOS_CONSULTABLES.includes(e.tipo) && !!e.refId;
  }

  return (
    <div className="space-y-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft size={15} /> Volver
      </button>

      {/* Encabezado */}
      <div className="tarjeta">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold uppercase text-slate-800">
                {paciente.nombres} {paciente.apellidos}
              </h1>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-500">
                {paciente.id}
              </span>
              {paciente.esNuevo && (
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                  NUEVO
                </span>
              )}
              <CategoriaBadge categoria={paciente.categoria} />
            </div>
            <div className="mt-1 text-sm text-slate-500">
              📞 {paciente.telefono}
              {paciente.telefono2 ? ` · alt. ${paciente.telefono2}` : ""}
              {paciente.telefonoFamiliar ? ` · familiar ${paciente.telefonoFamiliar}` : ""}
            </div>
            <div className="text-sm text-slate-500">
              {paciente.correo ? `✉ ${paciente.correo}` : "✉ (sin correo)"} · 📍{" "}
              {paciente.ciudad ?? "—"}
              {paciente.agencia ? ` · 🏢 Agencia: ${paciente.agencia}` : ""}
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Profesional responsable:{" "}
              <span className="font-semibold">{prof?.nombre ?? "Sin asignar"}</span> · Estado:{" "}
              <span className="font-semibold">{paciente.estado}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <DigitalizacionBadge estado={paciente.estadoDigitalizacion} />
            {paciente.ubicacionArchivo && (
              <span className="text-[11px] text-slate-400">
                Ficha física: {paciente.ubicacionArchivo}
              </span>
            )}
          </div>
        </div>
        {paciente.alerta && (
          <div className="mt-3">
            <Alerta>{paciente.alerta}</Alerta>
          </div>
        )}
      </div>

      {/* Acciones principales */}
      <div className="flex flex-wrap gap-2">
        <button className="btn-primario" onClick={() => setModalCita(true)}>
          <CalendarPlus size={16} /> Agendar cita
        </button>
        <Link
          href={`/pacientes/${paciente.id}/atencion${proxima && proxima.fecha === hoy ? `?cita=${proxima.id}` : ""}`}
          className="btn-primario"
        >
          <ClipboardList size={16} /> Registrar atención
        </Link>
        <button className="btn-secundario" onClick={() => setModalRecordatorio(true)}>
          <BellPlus size={16} /> Crear recordatorio
        </button>
        <button className="btn-secundario" onClick={() => setModalContacto(true)}>
          <PhoneCall size={16} /> Registrar contacto
        </button>
        <button className="btn-secundario" onClick={() => setModalDocumento(true)}>
          <FileUp size={16} /> Adjuntar documento
        </button>
        <button className="btn-secundario" onClick={() => setModalEditar(true)}>
          <Pencil size={16} /> Editar ficha
        </button>
      </div>

      {/* Pestañas */}
      <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {PESTANIAS.map((t) => (
          <button
            key={t}
            onClick={() => setPestania(t)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold ${
              pestania === t ? "bg-marca-700 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {pestania === "Resumen" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="tarjeta">
            <h2 className="mb-2 font-bold text-slate-700">Contexto clínico operativo</h2>
            <dl className="space-y-2.5 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-400">Última atención</dt>
                <dd className="text-slate-700">{fechaCorta(paciente.ultimaVisita)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-400">
                  Última indicación al paciente
                </dt>
                <dd className="text-slate-700">
                  {paciente.ultimaIndicacion ? `"${paciente.ultimaIndicacion}"` : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-400">
                  ▶ Próxima acción recomendada
                </dt>
                <dd className="font-semibold text-slate-800">{paciente.proximaAccion ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-400">Próxima cita</dt>
                <dd className="text-slate-700">
                  {proxima ? (
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {fechaCorta(proxima.fecha)} · {proxima.hora} · {proxima.motivo} ·{" "}
                      {nombreProf(proxima.profesionalId)} <EstadoCitaBadge estado={proxima.estado} />
                    </span>
                  ) : (
                    "Sin cita agendada"
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-400">Primera visita</dt>
                <dd className="text-slate-700">{fechaCorta(paciente.fechaPrimeraVisita)}</dd>
              </div>
            </dl>
            <button
              className="mt-3 text-sm font-semibold text-marca-700 hover:underline"
              onClick={() => setPestania("Línea de tiempo")}
            >
              Ver línea de tiempo →
            </button>
          </section>

          <section className="tarjeta">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-bold text-slate-700">Equipos y garantías</h2>
              <button
                className="btn-suave"
                onClick={() => setModalAudifono({ abierto: true, equipo: null })}
              >
                <Plus size={13} /> Registrar
              </button>
            </div>
            {equiposActivos.length === 0 && <Vacio>Sin audífonos registrados.</Vacio>}
            {equiposActivos.map((a) => (
              <ResumenEquipo key={a.id} equipo={a} hoy={hoy} />
            ))}
            {equipos.length > equiposActivos.length && (
              <button
                className="mt-2 text-xs font-semibold text-slate-500 hover:underline"
                onClick={() => setPestania("Audífonos")}
              >
                Ver también los equipos dados de baja →
              </button>
            )}
          </section>

          <section className="tarjeta">
            <h2 className="mb-2 font-bold text-slate-700">Citas recientes</h2>
            <div className="divide-y divide-slate-100 text-sm">
              {citasPaciente.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2">
                  <span>
                    {fechaCorta(c.fecha)} · {c.hora} · {c.motivo}
                  </span>
                  <EstadoCitaBadge estado={c.estado} />
                </div>
              ))}
              {citasPaciente.length === 0 && <Vacio>Sin citas registradas.</Vacio>}
            </div>
            <button
              className="mt-2 text-sm font-semibold text-marca-700 hover:underline"
              onClick={() => setPestania("Citas")}
            >
              Ver todas →
            </button>
          </section>

          <section className="tarjeta">
            <h2 className="mb-2 font-bold text-slate-700">Archivo y documentos</h2>
            <div className="space-y-1.5 text-sm text-slate-600">
              <p>
                Estado de digitalización:{" "}
                <DigitalizacionBadge estado={paciente.estadoDigitalizacion} />{" "}
                <span className="text-xs text-slate-400">
                  (estado visual — sin porcentajes en esta versión)
                </span>
              </p>
              <p>Ubicación de la ficha física: {paciente.ubicacionArchivo ?? "Sin registrar"}</p>
              <p>Nº de ficha física: {paciente.fichaFisica ?? "—"}</p>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {docs.slice(0, 3).map((d) => (
                <span
                  key={d.id}
                  className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
                >
                  <FileText size={12} /> {d.titulo}
                </span>
              ))}
            </div>
            <button
              className="mt-2 text-sm font-semibold text-marca-700 hover:underline"
              onClick={() => setPestania("Documentos")}
            >
              Ver documentos →
            </button>
          </section>
        </div>
      )}

      {pestania === "Línea de tiempo" && (
        <div className="tarjeta">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-slate-600">Filtrar:</span>
            {["Todo", "Atención", "Cita", "Contacto", "Documento", "Recordatorio", "Equipo"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFiltroTimeline(f)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    filtroTimeline === f
                      ? "bg-marca-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
          <p className="mb-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Los eventos históricos no desaparecen silenciosamente: correcciones, anulaciones o
            eliminaciones autorizadas dejan trazabilidad, según las reglas que defina Proaudio.
            <br />
            Desde aquí el historial <strong>solo se consulta</strong>: pulse un evento para ver su
            detalle completo.
          </p>
          <ol className="relative ml-2 space-y-4 border-l-2 border-slate-200 pl-5">
            {timeline.map((e) => {
              const consultable = esConsultable(e);
              const Contenido = (
                <>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {fechaCorta(e.fecha)} · {e.tipo}
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-800">
                    {e.titulo}
                    {consultable && <ChevronRight size={14} className="shrink-0 text-slate-400" />}
                  </div>
                  {e.detalle && <div className="mt-0.5 text-sm text-slate-600">{e.detalle}</div>}
                  <div className="mt-0.5 text-[11px] text-slate-400">Registrado por: {e.autor}</div>
                </>
              );
              return (
                <li key={e.id} className="relative">
                  <span
                    className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full ring-4 ring-white ${
                      COLOR_EVENTO[e.tipo] ?? "bg-slate-400"
                    }`}
                  />
                  {consultable ? (
                    <button
                      onClick={() => setEventoAbierto(e)}
                      className="-mx-2 block w-full cursor-pointer rounded-lg px-2 py-1 text-left transition hover:bg-slate-50"
                    >
                      {Contenido}
                    </button>
                  ) : (
                    <div className="px-0 py-1">{Contenido}</div>
                  )}
                </li>
              );
            })}
            {timeline.length === 0 && <Vacio>Sin eventos con este filtro.</Vacio>}
          </ol>
        </div>
      )}

      {pestania === "Citas" && (
        <div className="tarjeta">
          <div className="divide-y divide-slate-100 text-sm">
            {citasPaciente.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <div>
                  <div className="font-semibold text-slate-800">
                    {fechaCorta(c.fecha)} · {c.hora}–{horaFin(c.hora, c.duracionMin)} · {c.motivo}
                  </div>
                  <div className="text-xs text-slate-500">
                    {nombreProf(c.profesionalId)} · {c.duracionMin} min
                    {c.motivoCambio ? ` · Motivo: ${c.motivoCambio}` : ""}
                  </div>
                </div>
                <EstadoCitaBadge estado={c.estado} />
              </div>
            ))}
            {citasPaciente.length === 0 && <Vacio>Sin citas registradas.</Vacio>}
          </div>
        </div>
      )}

      {pestania === "Audífonos" && (
        <div className="tarjeta space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Los equipos no se borran. Los dados de baja se muestran atenuados.
            </p>
            <button
              className="btn-secundario"
              onClick={() => setModalAudifono({ abierto: true, equipo: null })}
            >
              <Plus size={15} /> Registrar audífono
            </button>
          </div>
          {equipos.map((a) => {
            const estado = estadoGarantia(a, hoy);
            const dias = diasParaVencer(a, hoy);
            const baja = a.estado === "Dado de baja";
            return (
              <div
                key={a.id}
                className={`rounded-lg border border-slate-200 p-3 text-sm ${baja ? "opacity-60" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-slate-800">
                      {a.marca} {a.modelo}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <ProcedenciaBadge procedencia={a.procedencia} />
                      <GarantiaBadge estado={estado} />
                      <span className="text-xs text-slate-500">Estado: {a.estado}</span>
                    </div>
                  </div>
                  <button
                    className="btn-suave"
                    onClick={() => setModalAudifono({ abierto: true, equipo: a })}
                  >
                    <Pencil size={13} /> Editar
                  </button>
                </div>
                <div className="mt-2 grid gap-1 text-slate-600 sm:grid-cols-2">
                  <span>Oído: {a.oido}</span>
                  <span>Serie: {a.serie ?? "—"}</span>
                  <span>Entregado: {fechaCorta(a.fechaEntrega)}</span>
                  <span>Nº de factura: {a.numeroFactura ?? "—"}</span>
                </div>
                {a.garantia?.vencimiento ? (
                  <p className="mt-2 text-xs text-slate-500">
                    Garantía: {fechaCorta(a.garantia.inicio)} → {fechaCorta(a.garantia.vencimiento)}
                    {dias !== null &&
                      (dias >= 0 ? ` · faltan ${dias} días` : ` · venció hace ${-dias} días`)}{" "}
                    — fechas y reglas ficticias para validación visual (D-05).
                  </p>
                ) : (
                  <p className="mt-2 text-xs text-slate-500">Garantía sin registrar.</p>
                )}
                {a.procedencia === "Traído de otra empresa" && (
                  <p className="mt-1 text-xs font-medium text-violet-800">
                    El alcance de la garantía para equipos de otra procedencia está por definir (D-05).
                  </p>
                )}
                {a.observaciones && (
                  <p className="mt-1 text-xs italic text-slate-500">{a.observaciones}</p>
                )}
              </div>
            );
          })}
          {equipos.length === 0 && <Vacio>Sin audífonos registrados.</Vacio>}
        </div>
      )}

      {pestania === "Documentos" && (
        <div className="tarjeta space-y-2">
          {docs.map((d) => (
            <div
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 p-3 text-sm"
            >
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                <div>
                  <div className="font-semibold text-slate-800">{d.titulo}</div>
                  <div className="text-xs text-slate-500">
                    {d.tipo} · Fecha del documento: {fechaCorta(d.fechaDocumento)} · Cargado:{" "}
                    {fechaCorta(d.fechaCarga)} por {nombreProf(d.cargadoPorId)}
                  </div>
                </div>
              </div>
              <span className="text-xs italic text-slate-400">
                Visor no disponible en el prototipo
              </span>
            </div>
          ))}
          {docs.length === 0 && <Vacio>Sin documentos adjuntos.</Vacio>}
          <button className="btn-secundario" onClick={() => setModalDocumento(true)}>
            <FileUp size={16} /> Adjuntar documento simulado
          </button>
        </div>
      )}

      {pestania === "Comunicaciones" && (
        <div className="tarjeta space-y-2">
          <p className="text-xs text-slate-500">
            Registro manual de llamadas y contactos. Envío de WhatsApp y correo: <FaseFutura />
          </p>
          {contactos.map((c) => (
            <div key={c.id} className="rounded-lg border border-slate-200 p-3 text-sm">
              <div className="font-semibold text-slate-800">
                {fechaCorta(c.fecha)} · {c.canal} · {c.resultado}
              </div>
              {c.nota && <div className="text-slate-600">{c.nota}</div>}
              <div className="text-[11px] text-slate-400">
                Registrado por: {nombreProf(c.registradoPorId)}
              </div>
            </div>
          ))}
          {contactos.length === 0 && <Vacio>Sin contactos registrados.</Vacio>}
          <button className="btn-secundario" onClick={() => setModalContacto(true)}>
            <PhoneCall size={16} /> Registrar contacto
          </button>
        </div>
      )}

      {/* Modales */}
      <CitaFormModal abierto={modalCita} pacienteId={paciente.id} onCerrar={() => setModalCita(false)} />
      <ContactoModal
        abierto={modalContacto}
        pacienteId={paciente.id}
        onCerrar={() => setModalContacto(false)}
        onAgendarCita={() => setModalCita(true)}
      />
      <RecordatorioFormModal
        abierto={modalRecordatorio}
        pacienteId={paciente.id}
        onCerrar={() => setModalRecordatorio(false)}
      />
      <DocumentoModal
        abierto={modalDocumento}
        pacienteId={paciente.id}
        onCerrar={() => setModalDocumento(false)}
      />
      {modalEditar && (
        <PacienteEditarModal abierto paciente={paciente} onCerrar={() => setModalEditar(false)} />
      )}
      {modalAudifono.abierto && (
        <AudifonoFormModal
          abierto
          pacienteId={paciente.id}
          equipo={modalAudifono.equipo}
          onCerrar={() => setModalAudifono({ abierto: false })}
        />
      )}
      {eventoAbierto && (
        <DetalleEventoModal evento={eventoAbierto} onCerrar={() => setEventoAbierto(null)} />
      )}
    </div>
  );
}

function ResumenEquipo({ equipo, hoy }: { equipo: Audifono; hoy: string }) {
  const estado = estadoGarantia(equipo, hoy);
  return (
    <div className="mb-2 rounded-lg border border-slate-200 p-3 text-sm">
      <div className="font-semibold text-slate-800">
        {equipo.marca} {equipo.modelo} · Oído: {equipo.oido}
      </div>
      <div className="text-slate-500">
        Serie: {equipo.serie ?? "—"} · Entregado: {fechaCorta(equipo.fechaEntrega)} · Estado:{" "}
        {equipo.estado}
      </div>
      <div className="text-slate-500">Nº de factura: {equipo.numeroFactura ?? "—"}</div>
      {equipo.agenciaAdquisicion && (
        <div className="text-slate-500">Agencia de adquisición: {equipo.agenciaAdquisicion}</div>
      )}
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <ProcedenciaBadge procedencia={equipo.procedencia} />
        <GarantiaBadge estado={estado} />
      </div>
      {equipo.garantia?.vencimiento ? (
        <p className="mt-1 text-xs text-slate-500">
          Vence el {fechaCorta(equipo.garantia.vencimiento)} — fechas y reglas ficticias para
          validación visual (D-05 por definir).
        </p>
      ) : (
        <p className="mt-1 text-xs text-slate-500">Garantía sin registrar.</p>
      )}
    </div>
  );
}

/** Detalle de solo lectura de un evento de la línea de tiempo. */
function DetalleEventoModal({
  evento,
  onCerrar,
}: {
  evento: EventoTimeline;
  onCerrar: () => void;
}) {
  const { citas, atenciones, documentos, audifonos, profesionales, hoy } = useStore();
  const nombreProf = (id: string) => profesionales.find((p) => p.id === id)?.nombre ?? id;

  const cita = citas.find((c) => c.id === evento.refId);
  const atencion = atenciones.find((a) => a.id === evento.refId);
  const documento = documentos.find((d) => d.id === evento.refId);
  const equipo = audifonos.find((a) => a.id === evento.refId);

  return (
    <Modal titulo={`${evento.tipo} · ${fechaCorta(evento.fecha)}`} abierto onCerrar={onCerrar} ancho="max-w-lg">
      <div className="space-y-3 text-sm">
        {cita && (
          <dl className="space-y-2">
            <Dato etiqueta="Fecha y hora">
              {fechaCorta(cita.fecha)} · {cita.hora}–{horaFin(cita.hora, cita.duracionMin)}
            </Dato>
            <Dato etiqueta="Duración">{cita.duracionMin} minutos</Dato>
            <Dato etiqueta="Profesional">{nombreProf(cita.profesionalId)}</Dato>
            <Dato etiqueta="Motivo">{cita.motivo}</Dato>
            <Dato etiqueta="Estado">
              <EstadoCitaBadge estado={cita.estado} />
            </Dato>
            {cita.notas && <Dato etiqueta="Notas">{cita.notas}</Dato>}
            {cita.motivoCambio && <Dato etiqueta="Motivo registrado">{cita.motivoCambio}</Dato>}
          </dl>
        )}

        {atencion && (
          <dl className="space-y-2">
            <Dato etiqueta="Fecha">{fechaCorta(atencion.fecha)}</Dato>
            <Dato etiqueta="Profesional">{nombreProf(atencion.profesionalId)}</Dato>
            <Dato etiqueta="Tipo de atención">{atencion.tipo}</Dato>
            <Dato etiqueta="Observación">{atencion.observacion}</Dato>
            <Dato etiqueta="Indicación al paciente">{atencion.indicacion || "—"}</Dato>
            <Dato etiqueta="Próxima acción">{atencion.proximaAccion || "—"}</Dato>
            {atencion.fechaSeguimiento && (
              <Dato etiqueta="Fecha de seguimiento">{fechaCorta(atencion.fechaSeguimiento)}</Dato>
            )}
            <Dato etiqueta="Responsable del seguimiento">
              {nombreProf(atencion.responsableId)}
            </Dato>
          </dl>
        )}

        {documento && (
          <dl className="space-y-2">
            <Dato etiqueta="Título">{documento.titulo}</Dato>
            <Dato etiqueta="Tipo">{documento.tipo}</Dato>
            <Dato etiqueta="Fecha del documento">{fechaCorta(documento.fechaDocumento)}</Dato>
            <Dato etiqueta="Cargado">
              {fechaCorta(documento.fechaCarga)} por {nombreProf(documento.cargadoPorId)}
            </Dato>
            <p className="italic text-slate-400">Visor no disponible en el prototipo.</p>
          </dl>
        )}

        {equipo && (
          <dl className="space-y-2">
            <Dato etiqueta="Equipo">
              {equipo.marca} {equipo.modelo} · {equipo.oido}
            </Dato>
            <Dato etiqueta="Serie">{equipo.serie ?? "—"}</Dato>
            <Dato etiqueta="Nº de factura">{equipo.numeroFactura ?? "—"}</Dato>
            <Dato etiqueta="Procedencia">
              <ProcedenciaBadge procedencia={equipo.procedencia} />
            </Dato>
            <Dato etiqueta="Estado">{equipo.estado}</Dato>
            <Dato etiqueta="Garantía">
              <GarantiaBadge estado={estadoGarantia(equipo, hoy)} />
            </Dato>
          </dl>
        )}

        {!cita && !atencion && !documento && !equipo && (
          <p className="text-slate-600">{evento.detalle ?? evento.titulo}</p>
        )}

        <p className="border-t border-slate-200 pt-3 text-[11px] text-slate-400">
          Registrado por: {evento.autor} · El historial es de solo lectura.
        </p>

        <div className="flex justify-end">
          <button className="btn-secundario" onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Dato({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{etiqueta}</dt>
      <dd className="text-slate-700">{children}</dd>
    </div>
  );
}
