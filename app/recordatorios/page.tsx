"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { BellRing, Phone, UserRound, CalendarClock, MessageSquareDashed, MessageCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Recordatorio } from "@/lib/types";
import { fechaCorta, diasEntre } from "@/lib/format";
import { linkWhatsApp, mensajeParaRecordatorio } from "@/lib/whatsapp";
import { Alerta, FaseFutura, Modal, PrioridadBadge, TituloSeccion, Vacio } from "@/components/ui";
import ContactoModal from "@/components/modales/Contacto";
import CitaFormModal from "@/components/modales/CitaForm";
import { MotivoModal, RecordatorioFormModal } from "@/components/modales/Extras";

type Pestania = "hoy" | "atrasados" | "proximos" | "completados";

const ICONO_CATEGORIA: Record<string, React.ReactNode> = {
  "Tarea para recepción": <Phone size={13} />,
  "Alerta para profesional": <BellRing size={13} />,
  "Recordatorio de cita": <CalendarClock size={13} />,
  "Comunicación futura al paciente": <MessageSquareDashed size={13} />,
};

const COLOR_CATEGORIA: Record<string, string> = {
  "Tarea para recepción": "bg-sky-50 text-sky-800 border-sky-300",
  "Alerta para profesional": "bg-violet-50 text-violet-800 border-violet-300",
  "Recordatorio de cita": "bg-emerald-50 text-emerald-800 border-emerald-300",
  "Comunicación futura al paciente": "bg-slate-100 text-slate-600 border-slate-300",
};

function RecordatoriosContenido() {
  const router = useRouter();
  const params = useSearchParams();
  const destacar = params.get("destacar");
  const { hoy, recordatorios, pacientes, profesionales, actualizarRecordatorio } = useStore();
  const [pestania, setPestania] = useState<Pestania>("hoy");
  const [contactoPara, setContactoPara] = useState<Recordatorio | null>(null);
  const [citaPara, setCitaPara] = useState<string | null>(null);
  const [editar, setEditar] = useState<Recordatorio | null>(null);
  const [posponer, setPosponer] = useState<Recordatorio | null>(null);
  const [reasignar, setReasignar] = useState<Recordatorio | null>(null);
  const [cancelar, setCancelar] = useState<Recordatorio | null>(null);
  const [modalNuevo, setModalNuevo] = useState(false);

  const grupos = useMemo(() => {
    const pendientes = recordatorios.filter((r) => r.estado === "Pendiente");
    return {
      hoy: pendientes.filter((r) => r.fecha === hoy),
      atrasados: pendientes.filter((r) => r.fecha < hoy),
      proximos: pendientes.filter((r) => r.fecha > hoy),
      completados: recordatorios.filter((r) => r.estado === "Completado" || r.estado === "Cancelado"),
    };
  }, [recordatorios, hoy]);

  const lista =
    pestania === "atrasados"
      ? [...grupos.atrasados].sort((a, b) => a.fecha.localeCompare(b.fecha))
      : pestania === "hoy"
        ? [...grupos.atrasados, ...grupos.hoy]
        : [...grupos[pestania]].sort((a, b) => a.fecha.localeCompare(b.fecha));

  const pacienteDe = (id?: string) => (id ? pacientes.find((p) => p.id === id) : undefined);
  const nombrePaciente = (id?: string) => {
    const p = pacienteDe(id);
    return p ? `${p.nombres} ${p.apellidos}` : id;
  };
  const nombreResponsable = (id: string) => profesionales.find((p) => p.id === id)?.nombre ?? id;

  return (
    <div className="space-y-4">
      <TituloSeccion
        extra={
          <button className="btn-primario" onClick={() => setModalNuevo(true)}>
            + Recordatorio manual
          </button>
        }
      >
        Centro de recordatorios
      </TituloSeccion>

      <Alerta>
        La cantidad y priorización de tareas se configurará según la capacidad real del equipo. Las
        tareas de esta lista son ejemplos ficticios para validar el concepto.
      </Alerta>

      <div className="flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1">
        {(
          [
            ["hoy", `Hoy (${grupos.hoy.length + grupos.atrasados.length})`],
            ["atrasados", `Atrasados (${grupos.atrasados.length})`],
            ["proximos", `Próximos (${grupos.proximos.length})`],
            ["completados", `Completados (${grupos.completados.length})`],
          ] as [Pestania, string][]
        ).map(([id, texto]) => (
          <button
            key={id}
            onClick={() => setPestania(id)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              pestania === id ? "bg-marca-700 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {texto}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {lista.map((r) => {
          const atrasado = r.estado === "Pendiente" && r.fecha < hoy;
          const paciente = pacienteDe(r.pacienteId);
          const linkWa =
            paciente?.telefono &&
            linkWhatsApp(
              paciente.telefono,
              mensajeParaRecordatorio({
                tipo: r.tipo,
                nombrePaciente: `${paciente.nombres} ${paciente.apellidos}`,
                motivo: r.motivo,
                fecha: fechaCorta(r.fecha),
              })
            );
          return (
            <div
              key={r.id}
              className={`tarjeta ${destacar === r.id ? "ring-2 ring-marca-600" : ""} ${
                atrasado ? "border-rose-300" : ""
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {atrasado && (
                      <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                        ATRASADO · {diasEntre(r.fecha, hoy)} días
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${COLOR_CATEGORIA[r.categoria]}`}
                    >
                      {ICONO_CATEGORIA[r.categoria]} {r.categoria}
                    </span>
                    <PrioridadBadge prioridad={r.prioridad} />
                    {r.canal.includes("Fase futura") && <FaseFutura texto="Envío externo: Fase futura" />}
                  </div>
                  <h3 className="mt-1.5 font-bold text-slate-800">
                    {r.tipo}
                    {r.pacienteId && (
                      <span className="font-semibold text-slate-500"> · {nombrePaciente(r.pacienteId)}</span>
                    )}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-600">{r.motivo}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    <UserRound size={12} className="mr-1 inline" />
                    Previsto: <span className="font-semibold">{fechaCorta(r.fecha)}</span> · Responsable:{" "}
                    {nombreResponsable(r.responsableId)} · Canal sugerido: {r.canal} · Estado: {r.estado}
                    {r.motivoCancelacion ? ` (motivo: ${r.motivoCancelacion})` : ""}
                  </p>
                  {r.nota && <p className="mt-1 text-xs italic text-slate-500">Nota: {r.nota}</p>}
                </div>
              </div>
              {r.estado === "Pendiente" && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-2.5">
                  {linkWa && (
                    <a href={linkWa} target="_blank" rel="noopener noreferrer" className="btn-suave border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
                      <MessageCircle size={13} className="mr-1 inline" />
                      Enviar WhatsApp
                    </a>
                  )}
                  {r.pacienteId && (
                    <Link href={`/pacientes/${r.pacienteId}`} className="btn-suave">
                      Abrir ficha
                    </Link>
                  )}
                  {r.pacienteId && (
                    <button className="btn-suave" onClick={() => setContactoPara(r)}>
                      Registrar contacto
                    </button>
                  )}
                  <button className="btn-suave" onClick={() => setEditar(r)}>Editar</button>
                  <button className="btn-suave" onClick={() => setPosponer(r)}>Posponer</button>
                  <button className="btn-suave" onClick={() => setReasignar(r)}>Reasignar</button>
                  <button
                    className="btn-suave"
                    onClick={() => actualizarRecordatorio(r.id, { estado: "Completado" })}
                  >
                    Completar
                  </button>
                  <button className="btn-suave text-rose-700" onClick={() => setCancelar(r)}>
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {lista.length === 0 && <Vacio>No hay elementos en esta pestaña.</Vacio>}
      </div>

      {contactoPara?.pacienteId && (
        <ContactoModal
          abierto={!!contactoPara}
          pacienteId={contactoPara.pacienteId}
          recordatorioId={contactoPara.id}
          onCerrar={() => setContactoPara(null)}
          onAgendarCita={() => setCitaPara(contactoPara.pacienteId!)}
        />
      )}
      <CitaFormModal
        abierto={!!citaPara}
        pacienteId={citaPara ?? undefined}
        onCerrar={() => setCitaPara(null)}
        onGuardada={(c) => router.push(`/pacientes/${c.pacienteId}`)}
      />
      <RecordatorioFormModal abierto={modalNuevo} onCerrar={() => setModalNuevo(false)} />

      {editar && (
        <EditarModal
          rec={editar}
          onCerrar={() => setEditar(null)}
          onGuardar={(patch) => {
            actualizarRecordatorio(editar.id, patch);
            setEditar(null);
          }}
        />
      )}
      {posponer && (
        <PosponerModal
          rec={posponer}
          hoy={hoy}
          onCerrar={() => setPosponer(null)}
          onGuardar={(fecha) => {
            actualizarRecordatorio(posponer.id, { fecha, nota: `Pospuesto para ${fechaCorta(fecha)}.` });
            setPosponer(null);
          }}
        />
      )}
      {reasignar && (
        <ReasignarModal
          rec={reasignar}
          onCerrar={() => setReasignar(null)}
          onGuardar={(responsableId) => {
            actualizarRecordatorio(reasignar.id, { responsableId });
            setReasignar(null);
          }}
        />
      )}
      <MotivoModal
        abierto={!!cancelar}
        titulo="Cancelar recordatorio"
        descripcion={cancelar ? `${cancelar.tipo}${cancelar.pacienteId ? ` · ${nombrePaciente(cancelar.pacienteId)}` : ""}` : ""}
        etiquetaBoton="Cancelar recordatorio"
        onCerrar={() => setCancelar(null)}
        onConfirmar={(motivo) => {
          if (cancelar)
            actualizarRecordatorio(cancelar.id, { estado: "Cancelado", motivoCancelacion: motivo });
          setCancelar(null);
        }}
      />
    </div>
  );
}

function EditarModal({
  rec,
  onCerrar,
  onGuardar,
}: {
  rec: Recordatorio;
  onCerrar: () => void;
  onGuardar: (patch: Partial<Recordatorio>) => void;
}) {
  const [motivo, setMotivo] = useState(rec.motivo);
  const [fecha, setFecha] = useState(rec.fecha);
  const [prioridad, setPrioridad] = useState(rec.prioridad);
  return (
    <Modal titulo="Editar recordatorio" abierto onCerrar={onCerrar} ancho="max-w-md">
      <div className="space-y-3">
        <div>
          <label className="etiqueta">Motivo</label>
          <textarea className="campo" rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="etiqueta">Fecha prevista</label>
            <input type="date" className="campo" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Prioridad</label>
            <select className="campo" value={prioridad} onChange={(e) => setPrioridad(e.target.value as Recordatorio["prioridad"])}>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={() => onGuardar({ motivo, fecha, prioridad })}>Guardar</button>
        </div>
      </div>
    </Modal>
  );
}

function PosponerModal({
  rec,
  hoy,
  onCerrar,
  onGuardar,
}: {
  rec: Recordatorio;
  hoy: string;
  onCerrar: () => void;
  onGuardar: (fecha: string) => void;
}) {
  const [fecha, setFecha] = useState(rec.fecha > hoy ? rec.fecha : hoy);
  return (
    <Modal titulo="Posponer recordatorio" abierto onCerrar={onCerrar} ancho="max-w-md">
      <div className="space-y-3">
        <p className="text-sm text-slate-600">{rec.tipo} — nueva fecha prevista:</p>
        <input type="date" className="campo" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={() => onGuardar(fecha)}>Posponer</button>
        </div>
      </div>
    </Modal>
  );
}

function ReasignarModal({
  rec,
  onCerrar,
  onGuardar,
}: {
  rec: Recordatorio;
  onCerrar: () => void;
  onGuardar: (responsableId: string) => void;
}) {
  const { profesionales } = useStore();
  const [responsableId, setResponsableId] = useState(rec.responsableId);
  return (
    <Modal titulo="Reasignar responsable" abierto onCerrar={onCerrar} ancho="max-w-md">
      <div className="space-y-3">
        <select className="campo" value={responsableId} onChange={(e) => setResponsableId(e.target.value)}>
          {profesionales.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre} — {p.rol}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={() => onGuardar(responsableId)}>Reasignar</button>
        </div>
      </div>
    </Modal>
  );
}

export default function RecordatoriosPage() {
  return (
    <Suspense>
      <RecordatoriosContenido />
    </Suspense>
  );
}