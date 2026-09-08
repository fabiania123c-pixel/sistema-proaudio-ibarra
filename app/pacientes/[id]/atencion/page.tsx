"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, Paperclip, FileUp } from "lucide-react";
import { useStore } from "@/lib/store";
import { TIPOS_ATENCION } from "@/lib/data";
import { fechaCorta, sumarDias } from "@/lib/format";
import { estadoGarantia } from "@/lib/garantia";
import { Alerta, EstadoCitaBadge } from "@/components/ui";

function RegistroAtencion() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { hoy, pacientes, citas, audifonos, profesionales, registrarAtencion } = useStore();

  const paciente = pacientes.find((p) => p.id === params.id);
  const citaParam = searchParams.get("cita");
  const citaHoyPendiente = citas.find(
    (c) =>
      c.pacienteId === params.id &&
      c.fecha === hoy &&
      (c.estado === "Agendada" || c.estado === "Confirmada")
  );
  const cita = citas.find((c) => c.id === citaParam) ?? citaHoyPendiente;
  const equipo = audifonos.find(
    (a) => a.pacienteId === params.id && a.estado !== "Dado de baja"
  );
  const profesionalQueAtiende = profesionales.find(
    (p) => p.id === (cita?.profesionalId ?? paciente?.profesionalId)
  );

  const [tipo, setTipo] = useState(cita?.motivo && TIPOS_ATENCION.includes(cita.motivo) ? cita.motivo : TIPOS_ATENCION[0]);
  const [observacion, setObservacion] = useState("");
  const [indicacion, setIndicacion] = useState("");
  const [proximaAccion, setProximaAccion] = useState("");
  const [fechaSeguimiento, setFechaSeguimiento] = useState(sumarDias(hoy, 90));
  const [responsableId, setResponsableId] = useState("PRO-03");
  const [sinSeguimiento, setSinSeguimiento] = useState(false);
  const [adjunto, setAdjunto] = useState("");
  const [error, setError] = useState("");

  if (!paciente) {
    return (
      <div className="space-y-3">
        <p className="text-slate-600">No se encontró el paciente.</p>
        <Link href="/pacientes" className="btn-secundario">Volver a Pacientes</Link>
      </div>
    );
  }

  function guardar() {
    if (!observacion.trim()) {
      setError("La observación es obligatoria (es el único campo imprescindible).");
      return;
    }
    if (!sinSeguimiento && !proximaAccion.trim()) {
      setError(
        "Defina la próxima acción o marque \"No requiere seguimiento\". Es el punto donde se previene el abandono."
      );
      return;
    }
    registrarAtencion({
      pacienteId: paciente!.id,
      citaId: cita?.id,
      tipo,
      observacion: observacion.trim(),
      indicacion: indicacion.trim(),
      proximaAccion: sinSeguimiento ? "" : proximaAccion.trim(),
      fechaSeguimiento: sinSeguimiento ? undefined : fechaSeguimiento,
      responsableId,
      documentoAdjunto: adjunto || undefined,
    });
    router.push(`/pacientes/${paciente!.id}`);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-slate-700">
        <ArrowLeft size={15} /> Volver
      </button>

      <div>
        <h1 className="text-xl font-bold text-slate-800">Registrar atención</h1>
        <p className="text-sm text-slate-500">
          {paciente.nombres} {paciente.apellidos} · {paciente.id}
          {cita && (
            <>
              {" "}· {fechaCorta(cita.fecha)} {cita.hora} · {cita.motivo}{" "}
              <EstadoCitaBadge estado={cita.estado} />
            </>
          )}
        </p>
      </div>

      <Alerta>
        Este formulario es un <strong>resumen operativo</strong>, no una historia clínica
        electrónica completa.
      </Alerta>

      {/* Contexto de solo lectura */}
      <section className="tarjeta bg-slate-50 text-sm">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
          Contexto antes de atender (solo lectura)
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Última atención:</span> {fechaCorta(paciente.ultimaVisita)}
          </p>
          <p>
            <span className="font-semibold">Próxima acción pendiente:</span>{" "}
            {paciente.proximaAccion ?? "—"}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold">Última indicación:</span>{" "}
            {paciente.ultimaIndicacion ? `"${paciente.ultimaIndicacion}"` : "—"}
          </p>
          <p className="sm:col-span-2">
            <span className="font-semibold">Audífono actual:</span>{" "}
            {equipo
              ? `${equipo.marca} ${equipo.modelo} · ${equipo.oido}${
                  equipo.serie ? ` · ${equipo.serie}` : ""
                } · Garantía ${estadoGarantia(equipo, hoy).toLowerCase()}${
                  equipo.garantia?.vencimiento
                    ? ` hasta ${fechaCorta(equipo.garantia.vencimiento)} (fechas ficticias)`
                    : ""
                }`
              : "Sin equipo registrado"}
          </p>
        </div>
      </section>

      <section className="tarjeta space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="etiqueta">Fecha</label>
            <input className="campo" value={fechaCorta(hoy)} readOnly />
          </div>
          <div>
            <label className="etiqueta">Profesional que atiende</label>
            <input
              className="campo"
              value={
                profesionalQueAtiende
                  ? `${profesionalQueAtiende.nombre} (simulado)`
                  : "Sin asignar (simulado)"
              }
              readOnly
            />
          </div>
        </div>
        <div>
          <label className="etiqueta">Tipo de atención *</label>
          <select className="campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS_ATENCION.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <p className="mt-1 text-[10px] text-amber-700">⚠ Catálogo por validar con Proaudio (D-23)</p>
        </div>
        <div>
          <label className="etiqueta">Observación de esta atención *</label>
          <textarea
            className="campo"
            rows={4}
            value={observacion}
            onChange={(e) => setObservacion(e.target.value)}
            placeholder="Qué se realizó y qué se observó…"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            ℹ Esta observación se agrega al historial. No reemplaza ninguna anterior.
          </p>
        </div>
        <div>
          <label className="etiqueta">Indicación entregada al paciente</label>
          <textarea
            className="campo"
            rows={2}
            value={indicacion}
            onChange={(e) => setIndicacion(e.target.value)}
            placeholder="Qué se le indicó hacer…"
          />
        </div>

        <div>
          <button
            className={`flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed px-3 py-3 text-sm ${
              adjunto ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-slate-300 text-slate-500 hover:border-marca-600"
            }`}
            onClick={() => setAdjunto(adjunto ? "" : `audiometria-demo-${Date.now() % 1000}.pdf`)}
          >
            {adjunto ? <Paperclip size={16} /> : <FileUp size={16} />}
            {adjunto
              ? `Documento simulado adjuntado: ${adjunto} (clic para quitar)`
              : "Adjuntar documento simulado (ej.: resultado de audiometría — nada se guarda realmente)"}
          </button>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <h3 className="mb-2 text-sm font-bold text-slate-700">¿Qué sigue?</h3>
          <label className="mb-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={sinSeguimiento}
              onChange={(e) => setSinSeguimiento(e.target.checked)}
            />
            No requiere seguimiento
          </label>
          {!sinSeguimiento && (
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-3">
                <label className="etiqueta">Próxima acción *</label>
                <input
                  className="campo"
                  value={proximaAccion}
                  onChange={(e) => setProximaAccion(e.target.value)}
                  placeholder="Ej.: Control periódico en noviembre 2026"
                />
              </div>
              <div>
                <label className="etiqueta">Fecha sugerida</label>
                <input
                  type="date"
                  className="campo"
                  value={fechaSeguimiento}
                  onChange={(e) => setFechaSeguimiento(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="etiqueta">Responsable del seguimiento</label>
                <select className="campo" value={responsableId} onChange={(e) => setResponsableId(e.target.value)}>
                  {profesionales.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} — {p.rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <p className="mt-2 text-[11px] text-slate-500">
            Al guardar se creará una tarea en el Centro de Recordatorios para el responsable
            elegido{cita ? " y la cita de hoy quedará marcada como Completada" : ""}.
          </p>
        </div>

        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={() => router.back()}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>
            Guardar {cita ? "y marcar cita como atendida" : "atención"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default function RegistroAtencionPage() {
  return (
    <Suspense>
      <RegistroAtencion />
    </Suspense>
  );
}
