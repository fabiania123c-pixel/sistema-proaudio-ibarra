"use client";

import { useState } from "react";
import { FileUp, Paperclip } from "lucide-react";
import { Modal } from "@/components/ui";
import { useStore } from "@/lib/store";
import { TIPOS_DOCUMENTO } from "@/lib/data";
import type { Cita } from "@/lib/types";

/** Diálogo genérico que exige un motivo escrito (cancelar cita, no atendida, cancelar recordatorio…) */
export function MotivoModal({
  abierto,
  titulo,
  descripcion,
  etiquetaBoton,
  onCerrar,
  onConfirmar,
  opciones,
}: {
  abierto: boolean;
  titulo: string;
  descripcion?: string;
  etiquetaBoton: string;
  onCerrar: () => void;
  onConfirmar: (motivo: string) => void;
  opciones?: string[];
}) {
  const [opcion, setOpcion] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");

  function confirmar() {
    const motivo = opciones ? (opcion === "Otro" ? texto.trim() : opcion) : texto.trim();
    if (!motivo) {
      setError("El motivo es obligatorio. Queda registrado en el historial.");
      return;
    }
    setOpcion("");
    setTexto("");
    setError("");
    onConfirmar(motivo);
  }

  return (
    <Modal titulo={titulo} abierto={abierto} onCerrar={onCerrar} ancho="max-w-md">
      <div className="space-y-3">
        {descripcion && <p className="text-sm text-slate-600">{descripcion}</p>}
        {opciones ? (
          <div className="space-y-1.5">
            {opciones.map((o) => (
              <label key={o} className="flex items-center gap-2 text-sm">
                <input type="radio" checked={opcion === o} onChange={() => setOpcion(o)} /> {o}
              </label>
            ))}
            {opcion === "Otro" && (
              <input className="campo" placeholder="Especifique el motivo…" value={texto} onChange={(e) => setTexto(e.target.value)} />
            )}
          </div>
        ) : (
          <textarea className="campo" rows={3} placeholder="Motivo…" value={texto} onChange={(e) => setTexto(e.target.value)} />
        )}
        <p className="text-[11px] text-slate-500">
          ℹ Los eventos históricos no desaparecen silenciosamente: esta acción queda registrada con
          autor y motivo.
        </p>
        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Volver</button>
          <button className="btn-primario" onClick={confirmar}>{etiquetaBoton}</button>
        </div>
      </div>
    </Modal>
  );
}

export function ReagendarModal({
  abierto,
  cita,
  onCerrar,
}: {
  abierto: boolean;
  cita: Cita | null;
  onCerrar: () => void;
}) {
  const { profesionales, pacientes, reagendarCita } = useStore();
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [profesionalId, setProfesionalId] = useState("");
  const [motivo, setMotivo] = useState("");
  const [otro, setOtro] = useState("");
  const [error, setError] = useState("");

  if (!cita) return null;
  const paciente = pacientes.find((p) => p.id === cita.pacienteId);

  function confirmar() {
    if (!cita) return;
    const f = fecha || cita.fecha;
    const h = hora || cita.hora;
    const m = motivo === "Otro" ? otro.trim() : motivo;
    if (!m) {
      setError("Seleccione el motivo del reagendamiento.");
      return;
    }
    reagendarCita(cita.id, { fecha: f, hora: h, profesionalId: profesionalId || cita.profesionalId }, m);
    setFecha(""); setHora(""); setProfesionalId(""); setMotivo(""); setOtro(""); setError("");
    onCerrar();
  }

  return (
    <Modal titulo="Reagendar cita" abierto={abierto} onCerrar={onCerrar} ancho="max-w-md">
      <div className="space-y-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold">{paciente?.nombres} {paciente?.apellidos}</span> ·{" "}
          {cita.fecha} {cita.hora} · {cita.motivo}
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="etiqueta">Nueva fecha</label>
            <input type="date" className="campo" value={fecha || cita.fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Nueva hora</label>
            <input type="time" className="campo" value={hora || cita.hora} onChange={(e) => setHora(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="etiqueta">Profesional</label>
          <select className="campo" value={profesionalId || cita.profesionalId} onChange={(e) => setProfesionalId(e.target.value)}>
            {profesionales.filter((p) => p.atiende).map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="etiqueta">Motivo del reagendamiento *</label>
          {["Solicitado por el paciente", "Solicitado por Proaudio", "El paciente no pudo asistir", "Otro"].map((o) => (
            <label key={o} className="flex items-center gap-2 text-sm">
              <input type="radio" checked={motivo === o} onChange={() => setMotivo(o)} /> {o}
            </label>
          ))}
          {motivo === "Otro" && (
            <input className="campo mt-1" value={otro} onChange={(e) => setOtro(e.target.value)} placeholder="Especifique…" />
          )}
        </div>
        <p className="text-[11px] text-slate-500">
          ℹ La cita original queda registrada en el historial con su motivo.
        </p>
        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={confirmar}>Confirmar</button>
        </div>
      </div>
    </Modal>
  );
}

export function RecordatorioFormModal({
  abierto,
  onCerrar,
  pacienteId,
}: {
  abierto: boolean;
  onCerrar: () => void;
  pacienteId?: string;
}) {
  const { hoy, pacientes, profesionales, crearRecordatorio } = useStore();
  const [tipo, setTipo] = useState("Llamada humana pendiente");
  const [motivo, setMotivo] = useState("");
  const [fecha, setFecha] = useState(hoy);
  const [responsableId, setResponsableId] = useState("PRO-03");
  const [prioridad, setPrioridad] = useState<"Alta" | "Media" | "Baja">("Media");
  const [error, setError] = useState("");
  const paciente = pacientes.find((p) => p.id === pacienteId);

  function guardar() {
    if (!motivo.trim()) {
      setError("Describa el motivo del recordatorio.");
      return;
    }
    crearRecordatorio({
      tipo,
      categoria: responsableId === "PRO-03" ? "Tarea para recepción" : "Alerta para profesional",
      pacienteId,
      motivo: motivo.trim(),
      fecha,
      responsableId,
      prioridad,
      canal: "Llamada",
    });
    setMotivo(""); setError("");
    onCerrar();
  }

  return (
    <Modal
      titulo={`Crear recordatorio${paciente ? ` — ${paciente.nombres} ${paciente.apellidos}` : ""}`}
      abierto={abierto}
      onCerrar={onCerrar}
      ancho="max-w-md"
    >
      <div className="space-y-3">
        <div>
          <label className="etiqueta">Tipo</label>
          <select className="campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option>Llamada humana pendiente</option>
            <option>Control periódico</option>
            <option>Audiometría anual</option>
            <option>Garantía próxima a vencer</option>
            <option>Cita pendiente de confirmación</option>
            <option>Otro</option>
          </select>
        </div>
        <div>
          <label className="etiqueta">Motivo *</label>
          <textarea className="campo" rows={2} value={motivo} onChange={(e) => setMotivo(e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="etiqueta">Fecha prevista</label>
            <input type="date" className="campo" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Prioridad</label>
            <select className="campo" value={prioridad} onChange={(e) => setPrioridad(e.target.value as "Alta" | "Media" | "Baja")}>
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
        </div>
        <div>
          <label className="etiqueta">Responsable</label>
          <select className="campo" value={responsableId} onChange={(e) => setResponsableId(e.target.value)}>
            {profesionales.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={guardar}>Guardar</button>
        </div>
      </div>
    </Modal>
  );
}

export function DocumentoModal({
  abierto,
  onCerrar,
  pacienteId,
}: {
  abierto: boolean;
  onCerrar: () => void;
  pacienteId: string;
}) {
  const { hoy, pacientes, agregarDocumento } = useStore();
  const paciente = pacientes.find((p) => p.id === pacienteId);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [tipo, setTipo] = useState(TIPOS_DOCUMENTO[0]);
  const [titulo, setTitulo] = useState("");
  const [fechaDoc, setFechaDoc] = useState("");
  const [error, setError] = useState("");
  const [subiendo, setSubiendo] = useState(false);

  function cerrarYLimpiar() {
    setArchivo(null); setTitulo(""); setFechaDoc(""); setError(""); setSubiendo(false);
    onCerrar();
  }

  async function guardar() {
    if (!titulo.trim()) {
      setError("El título del documento es obligatorio.");
      return;
    }
    if (!archivo) {
      setError("Seleccione el archivo que desea adjuntar.");
      return;
    }
    setError("");
    setSubiendo(true);
    const resultado = await agregarDocumento({
      pacienteId,
      tipo,
      titulo: titulo.trim(),
      fechaDocumento: fechaDoc || hoy,
      archivo,
    });
    setSubiendo(false);
    if (!resultado.ok) {
      setError(resultado.error ?? "No se pudo guardar el documento. Intente nuevamente.");
      return;
    }
    cerrarYLimpiar();
  }

  return (
    <Modal
      titulo={`Adjuntar documento — ${paciente ? `${paciente.nombres} ${paciente.apellidos}` : ""}`}
      abierto={abierto}
      onCerrar={cerrarYLimpiar}
      ancho="max-w-md"
    >
      <div className="space-y-3">
        <label
          className={`flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-sm ${
            archivo
              ? "border-emerald-300 bg-emerald-50 text-emerald-800"
              : "border-slate-300 bg-slate-50 text-slate-500 hover:border-marca-600"
          }`}
        >
          {archivo ? <Paperclip size={22} /> : <FileUp size={22} />}
          <span className="text-center">
            {archivo ? `Archivo seleccionado: ${archivo.name}` : "Haga clic para elegir un archivo (PDF, foto o Word)"}
          </span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={(e) => setArchivo(e.target.files?.[0] ?? null)}
          />
        </label>
        <div>
          <label className="etiqueta">Tipo de documento *</label>
          <select className="campo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {TIPOS_DOCUMENTO.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="etiqueta">Título *</label>
          <input className="campo" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej.: Cartilla física — página 2" />
        </div>
        <div>
          <label className="etiqueta">Fecha del documento (del contenido, no de hoy)</label>
          <input type="date" className="campo" value={fechaDoc} onChange={(e) => setFechaDoc(e.target.value)} />
        </div>
        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={cerrarYLimpiar} disabled={subiendo}>Cancelar</button>
          <button className="btn-primario" onClick={guardar} disabled={subiendo}>
            {subiendo ? "Subiendo…" : "Guardar documento"}
          </button>
        </div>
      </div>
    </Modal>
  );
}