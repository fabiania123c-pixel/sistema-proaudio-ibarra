"use client";

import { useMemo, useState } from "react";
import { Modal, Alerta } from "@/components/ui";
import { useStore } from "@/lib/store";
import { DURACIONES_CITA, MOTIVOS_CITA } from "@/lib/data";
import { fechaCorta } from "@/lib/format";
import type { Cita } from "@/lib/types";

export default function CitaFormModal({
  abierto,
  onCerrar,
  pacienteId,
  onGuardada,
}: {
  abierto: boolean;
  onCerrar: () => void;
  /** Si viene definido, el paciente queda precargado */
  pacienteId?: string;
  onGuardada?: (cita: Cita) => void;
}) {
  const { hoy, pacientes, profesionales, sucursalId, crearCita, crearPaciente } = useStore();
  const [busqueda, setBusqueda] = useState("");
  const [seleccionadoId, setSeleccionadoId] = useState<string>("");
  const [fecha, setFecha] = useState(hoy);
  const [hora, setHora] = useState("09:00");
  const [duracion, setDuracion] = useState(30);
  const [profesionalId, setProfesionalId] = useState("PRO-01");
  const [motivo, setMotivo] = useState(MOTIVOS_CITA[1]);
  const [notas, setNotas] = useState("");
  const [error, setError] = useState("");

  // --- Crear paciente nuevo desde este mismo formulario ---
  const [creandoNuevo, setCreandoNuevo] = useState(false);
  const [nuevoNombres, setNuevoNombres] = useState("");
  const [nuevoApellidos, setNuevoApellidos] = useState("");
  const [nuevoTelefono, setNuevoTelefono] = useState("");
  const [errorNuevo, setErrorNuevo] = useState("");

  const idPaciente = pacienteId ?? seleccionadoId;
  const paciente = pacientes.find((p) => p.id === idPaciente);

  const resultados = useMemo(() => {
    const q = busqueda.toLowerCase().trim();
    if (q.length < 2) return [];
    return pacientes
      .filter(
        (p) =>
          `${p.nombres} ${p.apellidos}`.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          [p.telefono, p.telefono2, p.telefonoFamiliar].some((t) => (t ?? "").includes(q))
      )
      .slice(0, 5);
  }, [pacientes, busqueda]);

  function limpiar() {
    setBusqueda("");
    setSeleccionadoId("");
    setFecha(hoy);
    setHora("09:00");
    setDuracion(30);
    setMotivo(MOTIVOS_CITA[1]);
    setNotas("");
    setError("");
    setCreandoNuevo(false);
    setNuevoNombres("");
    setNuevoApellidos("");
    setNuevoTelefono("");
    setErrorNuevo("");
  }

  function crearYUsarPaciente() {
    if (!nuevoNombres.trim() || !nuevoApellidos.trim() || !nuevoTelefono.trim()) {
      setErrorNuevo("Nombres, apellidos y teléfono son obligatorios.");
      return;
    }
    const nuevo = crearPaciente({
      nombres: nuevoNombres.trim(),
      apellidos: nuevoApellidos.trim(),
      telefono: nuevoTelefono.trim(),
    });
    setSeleccionadoId(nuevo.id);
    setCreandoNuevo(false);
    setBusqueda("");
    setNuevoNombres("");
    setNuevoApellidos("");
    setNuevoTelefono("");
    setErrorNuevo("");
  }

  function guardar() {
    if (!paciente) {
      setError("Seleccione un paciente. Toda cita está vinculada a una ficha.");
      return;
    }
    if (!fecha || !hora) {
      setError("La fecha y la hora son obligatorias.");
      return;
    }
    const cita = crearCita({
      pacienteId: paciente.id,
      fecha,
      hora,
      duracionMin: duracion,
      profesionalId,
      sucursalId,
      motivo,
      notas: notas.trim() || undefined,
    });
    limpiar();
    onGuardada?.(cita);
    onCerrar();
  }

  return (
    <Modal titulo="Nueva cita" abierto={abierto} onCerrar={() => { limpiar(); onCerrar(); }}>
      <div className="space-y-4">
        {!pacienteId && !paciente && !creandoNuevo && (
          <div>
            <label className="etiqueta">Paciente *</label>
            <input
              className="campo"
              placeholder="Buscar por nombre, código o teléfono…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {resultados.length > 0 && (
              <div className="mt-1 divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white">
                {resultados.map((p) => (
                  <button
                    key={p.id}
                    className="block w-full px-3 py-2 text-left text-sm hover:bg-slate-50"
                    onClick={() => {
                      setSeleccionadoId(p.id);
                      if (p.profesionalId) setProfesionalId(p.profesionalId);
                    }}
                  >
                    <span className="font-semibold">{p.apellidos}, {p.nombres}</span>{" "}
                    <span className="text-slate-500">· {p.id} · {p.telefono}</span>
                  </button>
                ))}
              </div>
            )}
            {busqueda.trim().length >= 2 && (
              <button
                className="mt-2 text-sm font-semibold text-marca-700 hover:underline"
                onClick={() => {
                  const partes = busqueda.trim().split(" ");
                  setNuevoNombres(partes.slice(-1).join(" "));
                  setNuevoApellidos(partes.slice(0, -1).join(" "));
                  setCreandoNuevo(true);
                }}
              >
                + No está en la lista, crear paciente nuevo
              </button>
            )}
          </div>
        )}

        {creandoNuevo && (
          <div className="space-y-3 rounded-lg border border-marca-200 bg-marca-50 p-3">
            <div className="text-sm font-semibold text-slate-700">Crear paciente nuevo</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="etiqueta">Nombres *</label>
                <input
                  className="campo"
                  value={nuevoNombres}
                  onChange={(e) => setNuevoNombres(e.target.value)}
                />
              </div>
              <div>
                <label className="etiqueta">Apellidos *</label>
                <input
                  className="campo"
                  value={nuevoApellidos}
                  onChange={(e) => setNuevoApellidos(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="etiqueta">Teléfono *</label>
                <input
                  className="campo"
                  value={nuevoTelefono}
                  onChange={(e) => setNuevoTelefono(e.target.value)}
                />
              </div>
            </div>
            {errorNuevo && <p className="text-sm font-semibold text-rose-700">{errorNuevo}</p>}
            <div className="flex justify-end gap-2">
              <button className="btn-secundario" onClick={() => setCreandoNuevo(false)}>
                Cancelar
              </button>
              <button className="btn-primario" onClick={crearYUsarPaciente}>
                Crear y usar este paciente
              </button>
            </div>
          </div>
        )}

        {paciente && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-bold">{paciente.nombres} {paciente.apellidos}</span>{" "}
                <span className="text-slate-500">· {paciente.id} · {paciente.telefono}</span>
                <div className="text-xs text-slate-500">
                  Últ. visita: {fechaCorta(paciente.ultimaVisita)}
                </div>
              </div>
              {!pacienteId && (
                <button className="btn-suave" onClick={() => setSeleccionadoId("")}>Cambiar</button>
              )}
            </div>
            {paciente.alerta && (
              <div className="mt-2">
                <Alerta>{paciente.alerta} — aprovechar el contacto para mencionarlo.</Alerta>
              </div>
            )}
          </div>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="etiqueta">Fecha *</label>
            <input type="date" className="campo" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Hora *</label>
            <input type="time" className="campo" value={hora} onChange={(e) => setHora(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Duración</label>
            <select className="campo" value={duracion} onChange={(e) => setDuracion(Number(e.target.value))}>
              {DURACIONES_CITA.map((d) => (
                <option key={d} value={d}>
                  {d} minutos
                </option>
              ))}
            </select>
            <p className="mt-1 text-[10px] text-amber-700">
              ⚠ Duraciones provisionales — deben validarse con Proaudio (D-02)
            </p>
          </div>
          <div>
            <label className="etiqueta">Profesional *</label>
            <select className="campo" value={profesionalId} onChange={(e) => setProfesionalId(e.target.value)}>
              {profesionales.filter((p) => p.atiende).map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="etiqueta">Motivo *</label>
            <select className="campo" value={motivo} onChange={(e) => setMotivo(e.target.value)}>
              {MOTIVOS_CITA.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <p className="mt-1 text-[10px] text-amber-700">
              ⚠ Lista provisional — debe validarse con Proaudio (D-02)
            </p>
          </div>
          <div className="sm:col-span-2">
            <label className="etiqueta">Notas</label>
            <input className="campo" value={notas} onChange={(e) => setNotas(e.target.value)} />
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
          <div className="font-semibold text-slate-700">Recordatorios asociados</div>
          Se crea automáticamente un recordatorio para 1 día antes, con botón de WhatsApp listo
          para enviar desde el Centro de recordatorios.
        </div>

        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={() => { limpiar(); onCerrar(); }}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>Guardar cita</button>
        </div>
      </div>
    </Modal>
  );
}