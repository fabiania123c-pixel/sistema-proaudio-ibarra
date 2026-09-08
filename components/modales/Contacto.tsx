"use client";

import { useState } from "react";
import { Modal, FaseFutura } from "@/components/ui";
import { useStore } from "@/lib/store";
import { sumarDias } from "@/lib/format";
import type { ResultadoContacto } from "@/lib/types";

const RESULTADOS: ResultadoContacto[] = [
  "Contactado",
  "No respondió",
  "Agendó cita",
  "Solicita llamada posterior",
  "No desea ser contactado",
  "Número incorrecto",
  "Otro",
];

export default function ContactoModal({
  abierto,
  onCerrar,
  pacienteId,
  recordatorioId,
  onAgendarCita,
}: {
  abierto: boolean;
  onCerrar: () => void;
  pacienteId: string;
  recordatorioId?: string;
  onAgendarCita?: () => void;
}) {
  const { hoy, pacientes, registrarContacto, crearRecordatorio } = useStore();
  const paciente = pacientes.find((p) => p.id === pacienteId);
  const [canal, setCanal] = useState("Llamada");
  const [resultado, setResultado] = useState<string>("");
  const [nota, setNota] = useState("");
  const [seguimiento, setSeguimiento] = useState<"no" | "7dias" | "otra">("no");
  const [fechaOtra, setFechaOtra] = useState(sumarDias(hoy, 7));
  const [error, setError] = useState("");

  function limpiar() {
    setCanal("Llamada");
    setResultado("");
    setNota("");
    setSeguimiento("no");
    setError("");
  }

  function guardar() {
    if (!resultado) {
      setError("Seleccione el resultado del contacto.");
      return;
    }
    registrarContacto({ pacienteId, canal, resultado, nota: nota.trim() || undefined, recordatorioId });
    if (seguimiento !== "no") {
      crearRecordatorio({
        tipo: "Llamada de seguimiento",
        categoria: "Tarea para recepción",
        pacienteId,
        motivo: `Nuevo intento de contacto (resultado anterior: ${resultado}).`,
        fecha: seguimiento === "7dias" ? sumarDias(hoy, 7) : fechaOtra,
        responsableId: "PRO-03",
        prioridad: "Media",
        canal: "Llamada",
      });
    }
    const agendo = resultado === "Agendó cita";
    limpiar();
    onCerrar();
    if (agendo) onAgendarCita?.();
  }

  return (
    <Modal
      titulo={`Registrar contacto — ${paciente ? `${paciente.nombres} ${paciente.apellidos}` : ""}`}
      abierto={abierto}
      onCerrar={() => { limpiar(); onCerrar(); }}
    >
      <div className="space-y-4">
        <p className="text-xs text-slate-500">
          Este registro es manual. El prototipo no realiza llamadas ni envía mensajes.
        </p>
        <div>
          <label className="etiqueta">Canal</label>
          <div className="flex flex-wrap gap-2">
            {["Llamada", "Presencial"].map((c) => (
              <button
                key={c}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                  canal === c
                    ? "border-marca-600 bg-marca-50 text-marca-700"
                    : "border-slate-300 bg-white text-slate-600"
                }`}
                onClick={() => setCanal(c)}
              >
                {c}
              </button>
            ))}
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
              WhatsApp <FaseFutura />
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400">
              Correo <FaseFutura />
            </span>
          </div>
        </div>

        <div>
          <label className="etiqueta">Resultado *</label>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {RESULTADOS.map((r) => (
              <label
                key={r}
                className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                  resultado === r ? "border-marca-600 bg-marca-50" : "border-slate-200 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="resultado"
                  checked={resultado === r}
                  onChange={() => setResultado(r)}
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="etiqueta">Nota</label>
          <textarea className="campo" rows={2} value={nota} onChange={(e) => setNota(e.target.value)} />
        </div>

        <div>
          <label className="etiqueta">¿Programar nuevo seguimiento?</label>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <label className="flex items-center gap-1.5">
              <input type="radio" checked={seguimiento === "no"} onChange={() => setSeguimiento("no")} /> No
            </label>
            <label className="flex items-center gap-1.5">
              <input type="radio" checked={seguimiento === "7dias"} onChange={() => setSeguimiento("7dias")} /> En 7 días
            </label>
            <label className="flex items-center gap-1.5">
              <input type="radio" checked={seguimiento === "otra"} onChange={() => setSeguimiento("otra")} /> Otra fecha:
            </label>
            {seguimiento === "otra" && (
              <input type="date" className="campo w-auto" value={fechaOtra} onChange={(e) => setFechaOtra(e.target.value)} />
            )}
          </div>
        </div>

        {resultado === "Agendó cita" && (
          <p className="rounded-lg bg-sky-50 px-3 py-2 text-sm text-sky-800">
            Al guardar se abrirá el formulario de cita para este paciente.
          </p>
        )}
        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={() => { limpiar(); onCerrar(); }}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>Guardar contacto</button>
        </div>
      </div>
    </Modal>
  );
}
