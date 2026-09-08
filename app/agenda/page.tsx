"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarPlus, X } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Cita } from "@/lib/types";
import {
  fechaCorta,
  fechaLarga,
  horaEnMinutos,
  horaFin,
  inicioSemana,
  nombreMes,
  partesFecha,
  sumarDias,
  toISO,
} from "@/lib/format";
import { EstadoCitaBadge, TituloSeccion, Vacio } from "@/components/ui";
import CitaFormModal from "@/components/modales/CitaForm";
import { MotivoModal, ReagendarModal } from "@/components/modales/Extras";

type Vista = "dia" | "semana" | "mes";

const SLOTS = Array.from({ length: 18 }, (_, i) => {
  const h = 8 + Math.floor(i / 2);
  return `${String(h).padStart(2, "0")}:${i % 2 === 0 ? "00" : "30"}`;
});

export default function AgendaPage() {
  const { hoy, citas, pacientes, profesionales, cambiarEstadoCita, marcarIncompleta } = useStore();
  const [vista, setVista] = useState<Vista>("dia");
  const [fecha, setFecha] = useState(hoy);
  const [filtroProf, setFiltroProf] = useState("todos");
  const [citaAbierta, setCitaAbierta] = useState<Cita | null>(null);
  const [modalNueva, setModalNueva] = useState(false);
  const [modalReagendar, setModalReagendar] = useState<Cita | null>(null);
  const [modalCancelar, setModalCancelar] = useState<Cita | null>(null);
  const [modalNoAtendida, setModalNoAtendida] = useState<Cita | null>(null);

  const audiologas = profesionales.filter((p) => p.atiende);
  const columnas = filtroProf === "todos" ? audiologas : audiologas.filter((p) => p.id === filtroProf);

  const citasFiltradas = useMemo(
    () => citas.filter((c) => filtroProf === "todos" || c.profesionalId === filtroProf),
    [citas, filtroProf]
  );

  const nombrePaciente = (id: string) => {
    const p = pacientes.find((x) => x.id === id);
    return p ? `${p.nombres} ${p.apellidos}` : id;
  };

  function avanzar(direccion: 1 | -1) {
    if (vista === "dia") setFecha(sumarDias(fecha, direccion));
    else if (vista === "semana") setFecha(sumarDias(fecha, 7 * direccion));
    else {
      const { y, m } = partesFecha(fecha);
      setFecha(toISO(new Date(y, m - 1 + direccion, 1)));
    }
  }

  // ── Vista día ──────────────────────────────────────────────────────────────
  const citasDelDia = citasFiltradas.filter((c) => c.fecha === fecha);

  // ── Vista semana ───────────────────────────────────────────────────────────
  const lunes = inicioSemana(fecha);
  const diasSemana = Array.from({ length: 6 }, (_, i) => sumarDias(lunes, i));

  // ── Vista mes ──────────────────────────────────────────────────────────────
  const { y: anio, m: mes } = partesFecha(fecha);
  const primerDia = new Date(anio, mes - 1, 1);
  const diasEnMes = new Date(anio, mes, 0).getDate();
  const offsetInicio = (primerDia.getDay() + 6) % 7; // lunes = 0

  return (
    <div className="space-y-4">
      <TituloSeccion
        extra={
          <button className="btn-primario" onClick={() => setModalNueva(true)}>
            <CalendarPlus size={16} /> Nueva cita
          </button>
        }
      >
        Agenda
      </TituloSeccion>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-white">
          {(["dia", "semana", "mes"] as Vista[]).map((v) => (
            <button
              key={v}
              onClick={() => setVista(v)}
              className={`px-4 py-2 text-sm font-semibold capitalize ${
                vista === v ? "bg-marca-700 text-white" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {v === "dia" ? "Día" : v === "semana" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-1 py-1">
          <button className="rounded p-1.5 hover:bg-slate-100" onClick={() => avanzar(-1)} aria-label="Anterior">
            <ChevronLeft size={16} />
          </button>
          <span className="min-w-48 px-2 text-center text-sm font-semibold text-slate-700">
            {vista === "dia" && fechaLarga(fecha)}
            {vista === "semana" && `${fechaCorta(lunes)} – ${fechaCorta(sumarDias(lunes, 5))}`}
            {vista === "mes" && `${nombreMes(mes)} ${anio}`}
          </span>
          <button className="rounded p-1.5 hover:bg-slate-100" onClick={() => avanzar(1)} aria-label="Siguiente">
            <ChevronRight size={16} />
          </button>
        </div>
        <button className="btn-suave" onClick={() => setFecha(hoy)}>Hoy</button>
        <select className="campo w-auto" value={filtroProf} onChange={(e) => setFiltroProf(e.target.value)}>
          <option value="todos">Todo el equipo</option>
          {audiologas.map((p) => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      {vista === "dia" && (
        <div className="tarjeta overflow-x-auto p-0">
          <table className="w-full min-w-[560px] table-fixed">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                <th className="w-16 px-3 py-2">Hora</th>
                {columnas.map((p) => (
                  <th key={p.id} className="px-3 py-2">{p.nombreCorto}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map((slot) => (
                <tr key={slot} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-1.5 text-xs font-semibold text-slate-400">{slot}</td>
                  {columnas.map((p) => {
                    const citasSlot = citasDelDia.filter((c) => {
                      if (c.profesionalId !== p.id) return false;
                      const slotMin = horaEnMinutos(slot);
                      const citaMin = horaEnMinutos(c.hora);
                      return citaMin >= slotMin && citaMin < slotMin + 30;
                    });
                    return (
                      <td key={p.id} className="px-2 py-1">
                        {citasSlot.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setCitaAbierta(c)}
                            // La altura acompaña a la duración para que una cita de 15 min y una
                            // de 120 min se distingan de un vistazo, sin romper la rejilla.
                            style={{ minHeight: `${Math.min(3, c.duracionMin / 30) * 34 + 14}px` }}
                            className={`mb-1 block w-full rounded-lg border-l-4 px-3 py-2 text-left shadow-sm transition hover:shadow ${p.color} ${
                              c.estado === "Cancelada" || c.estado === "Reagendada" ? "opacity-50" : ""
                            }`}
                          >
                            <div className="text-sm font-semibold leading-tight text-slate-800">
                              {nombrePaciente(c.pacienteId)}
                            </div>
                            <div className="text-[11px] font-medium text-slate-500">
                              {c.hora}–{horaFin(c.hora, c.duracionMin)} · {c.duracionMin} min
                            </div>
                            <div className="mt-1 flex flex-wrap items-center justify-between gap-1 text-xs text-slate-500">
                              <span>{c.motivo}</span>
                              <EstadoCitaBadge estado={c.estado} />
                            </div>
                          </button>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {citasDelDia.length === 0 && (
            <div className="p-4">
              <Vacio>No hay citas este día con los filtros actuales.</Vacio>
            </div>
          )}
        </div>
      )}

      {vista === "semana" && (
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {diasSemana.map((d) => {
            const delDia = citasFiltradas
              .filter((c) => c.fecha === d && c.estado !== "Reagendada")
              .sort((a, b) => a.hora.localeCompare(b.hora));
            return (
              <div key={d} className={`tarjeta p-3 ${d === hoy ? "ring-2 ring-marca-600" : ""}`}>
                <button
                  className="mb-2 w-full text-left text-sm font-bold text-slate-700 hover:text-marca-700"
                  onClick={() => {
                    setFecha(d);
                    setVista("dia");
                  }}
                >
                  {fechaCorta(d)}
                  <span className="block text-[11px] font-normal text-slate-400">
                    {delDia.length} cita{delDia.length !== 1 ? "s" : ""} · ver día
                  </span>
                </button>
                <div className="space-y-1">
                  {delDia.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCitaAbierta(c)}
                      className="block w-full rounded-md bg-slate-50 px-2 py-1.5 text-left text-xs hover:bg-slate-100"
                    >
                      <span className="font-semibold">{c.hora}</span> {nombrePaciente(c.pacienteId)}
                    </button>
                  ))}
                  {delDia.length === 0 && <p className="text-xs text-slate-300">—</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {vista === "mes" && (
        <div className="tarjeta overflow-x-auto">
          <div className="grid min-w-[560px] grid-cols-7 gap-1 text-center text-xs font-bold uppercase text-slate-400">
            {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>
          <div className="grid min-w-[560px] grid-cols-7 gap-1">
            {Array.from({ length: offsetInicio }).map((_, i) => (
              <div key={`v-${i}`} />
            ))}
            {Array.from({ length: diasEnMes }, (_, i) => {
              const d = `${anio}-${String(mes).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
              const n = citasFiltradas.filter((c) => c.fecha === d && c.estado !== "Reagendada" && c.estado !== "Cancelada").length;
              return (
                <button
                  key={d}
                  onClick={() => {
                    setFecha(d);
                    setVista("dia");
                  }}
                  className={`min-h-16 rounded-lg border p-2 text-left text-sm transition hover:border-marca-600 ${
                    d === hoy ? "border-marca-600 bg-marca-50" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="font-semibold text-slate-700">{i + 1}</div>
                  {n > 0 && (
                    <div className="mt-1 inline-block rounded-full bg-marca-100 px-2 py-0.5 text-[11px] font-semibold text-marca-700">
                      {n} cita{n > 1 ? "s" : ""}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="tarjeta flex flex-wrap items-center gap-3 py-2 text-xs text-slate-500">
        <span className="font-semibold text-slate-600">Estados:</span>
        {(["Agendada", "Confirmada", "Completada", "No atendida", "Cancelada", "Reagendada", "Incompleta"] as const).map((e) => (
          <EstadoCitaBadge key={e} estado={e} />
        ))}
      </div>

      {/* Panel lateral de detalle de cita */}
      {citaAbierta && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={() => setCitaAbierta(null)}>
          <div
            className="h-full w-full max-w-md overflow-y-auto bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800">{nombrePaciente(citaAbierta.pacienteId)}</h2>
                <p className="text-sm text-slate-500">
                  {fechaCorta(citaAbierta.fecha)} · {citaAbierta.hora}–
                  {horaFin(citaAbierta.hora, citaAbierta.duracionMin)} · {citaAbierta.duracionMin} min
                </p>
              </div>
              <button onClick={() => setCitaAbierta(null)} className="rounded-md p-1 text-slate-400 hover:bg-slate-100" aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Motivo:</span> {citaAbierta.motivo}</p>
              <p>
                <span className="font-semibold">Profesional:</span>{" "}
                {profesionales.find((p) => p.id === citaAbierta.profesionalId)?.nombre}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Estado:</span> <EstadoCitaBadge estado={citaAbierta.estado} />
              </p>
              {citaAbierta.notas && <p><span className="font-semibold">Notas:</span> {citaAbierta.notas}</p>}
              {citaAbierta.motivoCambio && (
                <p className="text-slate-500"><span className="font-semibold">Motivo registrado:</span> {citaAbierta.motivoCambio}</p>
              )}
            </div>

            <div className="mt-5 space-y-2">
              <Link href={`/pacientes/${citaAbierta.pacienteId}`} className="btn-primario w-full justify-center">
                Abrir ficha del paciente
              </Link>
              <Link
                href={`/pacientes/${citaAbierta.pacienteId}/atencion?cita=${citaAbierta.id}`}
                className="btn-secundario w-full justify-center"
              >
                Registrar atención
              </Link>
              {citaAbierta.estado === "Agendada" && (
                <button
                  className="btn-secundario w-full justify-center"
                  onClick={() => {
                    cambiarEstadoCita(citaAbierta.id, "Confirmada");
                    setCitaAbierta({ ...citaAbierta, estado: "Confirmada" });
                  }}
                >
                  Marcar confirmada
                </button>
              )}
              {citaAbierta.estado === "Confirmada" && (
                <button
                  className="btn-secundario w-full justify-center text-rose-700"
                  onClick={() => {
                    marcarIncompleta(citaAbierta.id);
                    setCitaAbierta({ ...citaAbierta, estado: "Incompleta" });
                  }}
                >
                  Paciente atendido, marcar incompleta (falta registrar atención)
                </button>
              )}
              {citaAbierta.estado === "Incompleta" && (
                <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-xs text-rose-800">
                  Esta cita queda bloqueada hasta que se registre la atención con sus
                  observaciones. Usa &quot;Registrar atención&quot; arriba para completarla.
                </p>
              )}
              {(citaAbierta.estado === "Agendada" || citaAbierta.estado === "Confirmada") && (
                <>
                  <button
                    className="btn-secundario w-full justify-center"
                    onClick={() => {
                      setModalReagendar(citaAbierta);
                      setCitaAbierta(null);
                    }}
                  >
                    Reagendar
                  </button>
                  <button
                    className="btn-secundario w-full justify-center"
                    onClick={() => {
                      setModalNoAtendida(citaAbierta);
                      setCitaAbierta(null);
                    }}
                  >
                    Marcar no atendida
                  </button>
                  <button
                    className="btn-secundario w-full justify-center text-rose-700"
                    onClick={() => {
                      setModalCancelar(citaAbierta);
                      setCitaAbierta(null);
                    }}
                  >
                    Cancelar cita
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <CitaFormModal abierto={modalNueva} onCerrar={() => setModalNueva(false)} />
      <ReagendarModal abierto={!!modalReagendar} cita={modalReagendar} onCerrar={() => setModalReagendar(null)} />
      <MotivoModal
        abierto={!!modalCancelar}
        titulo="Cancelar cita"
        descripcion={modalCancelar ? `${nombrePaciente(modalCancelar.pacienteId)} · ${fechaCorta(modalCancelar.fecha)} ${modalCancelar.hora}` : ""}
        etiquetaBoton="Cancelar la cita"
        opciones={["Solicitado por el paciente", "Solicitado por Proaudio", "Otro"]}
        onCerrar={() => setModalCancelar(null)}
        onConfirmar={(motivo) => {
          if (modalCancelar) cambiarEstadoCita(modalCancelar.id, "Cancelada", motivo);
          setModalCancelar(null);
        }}
      />
      <MotivoModal
        abierto={!!modalNoAtendida}
        titulo="Marcar cita como no atendida"
        descripcion="Se registrará la inasistencia. Se sugiere crear una tarea de seguimiento desde la ficha."
        etiquetaBoton="Marcar no atendida"
        opciones={["No asistió, sin aviso previo", "Avisó que no podía asistir", "Otro"]}
        onCerrar={() => setModalNoAtendida(null)}
        onConfirmar={(motivo) => {
          if (modalNoAtendida) cambiarEstadoCita(modalNoAtendida.id, "No atendida", motivo);
          setModalNoAtendida(null);
        }}
      />
    </div>
  );
}
