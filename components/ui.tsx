"use client";

import React from "react";
import { X, Check, Clock3, CheckCheck, XCircle, RefreshCcw, CalendarClock, AlertTriangle, AlertOctagon } from "lucide-react";
import type { EstadoCita } from "@/lib/types";

export function Modal({
  titulo,
  abierto,
  onCerrar,
  children,
  ancho = "max-w-2xl",
}: {
  titulo: string;
  abierto: boolean;
  onCerrar: () => void;
  children: React.ReactNode;
  ancho?: string;
}) {
  if (!abierto) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 pt-10"
      onClick={onCerrar}
    >
      <div
        className={`w-full ${ancho} rounded-2xl bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-bold text-slate-800">{titulo}</h2>
          <button onClick={onCerrar} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function PorValidar({ texto = "Por validar" }: { texto?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800">
      <AlertTriangle size={11} /> {texto}
    </span>
  );
}

export function FaseFutura({ texto = "Fase futura" }: { texto?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
      {texto}
    </span>
  );
}

/**
 * Colores de estado de cita — definidos por Karla Chamba (Proaudio Ibarra) el 6 ago 2026:
 * Confirmada = amarillo, Completada = verde, No atendida = naranja,
 * Reagendada = morado, Incompleta = rojo (no se puede eliminar hasta que el
 * audiólogo agregue sus comentarios y observaciones de la atención).
 */
const ESTILO_ESTADO_CITA: Record<EstadoCita, { clases: string; icono: React.ReactNode }> = {
  Agendada: { clases: "bg-slate-100 text-slate-700 border-slate-300", icono: <Clock3 size={12} /> },
  Confirmada: { clases: "bg-amber-50 text-amber-800 border-amber-300", icono: <Check size={12} /> },
  Completada: { clases: "bg-emerald-50 text-emerald-800 border-emerald-300", icono: <CheckCheck size={12} /> },
  "No atendida": { clases: "bg-orange-50 text-orange-800 border-orange-300", icono: <XCircle size={12} /> },
  Cancelada: { clases: "bg-slate-100 text-slate-500 border-slate-300 line-through", icono: <XCircle size={12} /> },
  Reagendada: { clases: "bg-violet-50 text-violet-800 border-violet-300", icono: <RefreshCcw size={12} /> },
  Incompleta: { clases: "bg-rose-50 text-rose-800 border-rose-300", icono: <AlertOctagon size={12} /> },
};

export function EstadoCitaBadge({ estado }: { estado: EstadoCita }) {
  const s = ESTILO_ESTADO_CITA[estado];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-semibold ${s.clases}`}>
      {s.icono} {estado}
    </span>
  );
}

export function PrioridadBadge({ prioridad }: { prioridad: "Alta" | "Media" | "Baja" }) {
  const clases =
    prioridad === "Alta"
      ? "bg-rose-50 text-rose-800 border-rose-300"
      : prioridad === "Media"
        ? "bg-amber-50 text-amber-800 border-amber-300"
        : "bg-slate-100 text-slate-600 border-slate-300";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${clases}`}>
      Prioridad {prioridad.toLowerCase()}
    </span>
  );
}

export function DigitalizacionBadge({ estado }: { estado: string }) {
  const clases =
    estado === "Completa" || estado === "Completa para operar"
      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
      : estado === "Parcial"
        ? "bg-amber-50 text-amber-800 border-amber-300"
        : estado === "Datos básicos"
          ? "bg-sky-50 text-sky-800 border-sky-300"
          : "bg-slate-100 text-slate-600 border-slate-300";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${clases}`}>
      Ficha: {estado}
    </span>
  );
}

export function CategoriaBadge({ categoria }: { categoria?: string }) {
  if (!categoria) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
      Categoría {categoria}
      <span className="text-[10px] text-amber-700">· criterio por definir</span>
    </span>
  );
}

export function GarantiaBadge({ estado }: { estado: string }) {
  const clases =
    estado === "Vigente"
      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
      : estado === "Por vencer"
        ? "bg-amber-50 text-amber-800 border-amber-300"
        : estado === "Vencida"
          ? "bg-rose-50 text-rose-800 border-rose-300"
          : "bg-slate-100 text-slate-600 border-slate-300";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${clases}`}>
      Garantía: {estado.toLowerCase()}
    </span>
  );
}

export function ProcedenciaBadge({ procedencia }: { procedencia: string }) {
  const externo = procedencia === "Traído de otra empresa";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${
        externo
          ? "border-violet-300 bg-violet-50 text-violet-800"
          : "border-slate-300 bg-slate-50 text-slate-600"
      }`}
    >
      {procedencia}
    </span>
  );
}

export function Alerta({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
      <AlertTriangle size={16} className="mt-0.5 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

export function TituloSeccion({
  icono,
  children,
  extra,
}: {
  icono?: React.ReactNode;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <h1 className="flex items-center gap-2 text-xl font-bold text-slate-800">
        {icono} {children}
      </h1>
      {extra}
    </div>
  );
}

export function Vacio({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
      {children}
    </div>
  );
}

export { CalendarClock };
