
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarClock,
  MessageCircle,
  UserPlus,
  Cake,
  ShieldAlert,
  Percent,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { fechaCorta } from "@/lib/format";
import { TituloSeccion, Vacio } from "@/components/ui";

/** Lunes de la semana que contiene la fecha dada (YYYY-MM-DD). */
function lunesDeLaSemana(fechaISO: string): Date {
  const d = new Date(fechaISO + "T00:00:00");
  const diaSemana = d.getDay(); // 0 = domingo, 1 = lunes...
  const offset = diaSemana === 0 ? -6 : 1 - diaSemana;
  d.setDate(d.getDate() + offset);
  return d;
}

function aISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const NOMBRES_DIA = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

/** Anillo circular de progreso simple, en SVG puro. */
function AnilloProgreso({ porcentaje, etiqueta }: { porcentaje: number; etiqueta: string }) {
  const radio = 34;
  const circunferencia = 2 * Math.PI * radio;
  const relleno = Math.max(0, Math.min(100, porcentaje));
  const offset = circunferencia - (relleno / 100) * circunferencia;
  return (
    <div className="flex items-center gap-3">
      <svg width="80" height="80" viewBox="0 0 80 80" className="shrink-0">
        <circle cx="40" cy="40" r={radio} fill="none" stroke="#e2e8f0" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radio}
          fill="none"
          stroke="#0f766e"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="45" textAnchor="middle" fontSize="18" fontWeight="700" fill="#1e293b">
          {Math.round(relleno)}%
        </text>
      </svg>
      <div>
        <div className="text-2xl font-bold text-slate-800">{Math.round(relleno)}%</div>
        <div className="text-xs text-slate-500">{etiqueta}</div>
      </div>
    </div>
  );
}

/** Barra pequeña de 7 días: atendidas vs. no atendidas/canceladas. */
function BarraSemana({
  dias,
}: {
  dias: { etiqueta: string; atendidas: number; noAtendidas: number }[];
}) {
  const max = Math.max(1, ...dias.map((d) => d.atendidas + d.noAtendidas));
  return (
    <div className="flex items-end justify-between gap-2" style={{ height: 90 }}>
      {dias.map((d, i) => {
        const alturaAt = (d.atendidas / max) * 70;
        const alturaNo = (d.noAtendidas / max) * 70;
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex w-full flex-col items-center justify-end" style={{ height: 70 }}>
              {d.noAtendidas > 0 && (
                <div className="w-4 rounded-t bg-rose-300" style={{ height: alturaNo }} />
              )}
              {d.atendidas > 0 && (
                <div
                  className={`w-4 bg-marca-600 ${d.noAtendidas > 0 ? "" : "rounded-t"}`}
                  style={{ height: alturaAt }}
                />
              )}
            </div>
            <div className="text-[10px] font-semibold text-slate-500">{d.etiqueta}</div>
          </div>
        );
      })}
    </div>
  );
}

export default function InicioPage() {
  const { hoy, citas, pacientes, recordatorios, audifonos, profesionales } = useStore();
  const [fechaVista] = useState(hoy);

  const citasHoy = useMemo(() => citas.filter((c) => c.fecha === fechaVista), [citas, fechaVista]);
  const citasAtendidasHoy = citasHoy.filter((c) => c.estado === "Completada").length;

  const recordatoriosWhatsappPendientes = useMemo(
    () =>
      recordatorios.filter(
        (r) => r.estado === "Pendiente" && r.canal.toLowerCase().includes("whatsapp") && r.fecha <= hoy
      ),
    [recordatorios, hoy]
  );

  const pacientesNuevosMes = useMemo(() => {
    const mesActual = hoy.slice(0, 7); // "YYYY-MM"
    return pacientes.filter((p) => (p.fechaPrimeraVisita ?? "").startsWith(mesActual)).length;
  }, [pacientes, hoy]);

  // --- Tasa de confirmación: citas de hoy que están Confirmada o Completada ---
  const tasaConfirmacion = useMemo(() => {
    const relevantes = citasHoy.filter((c) =>
      ["Agendada", "Confirmada", "Completada"].includes(c.estado)
    );
    if (relevantes.length === 0) return 0;
    const confirmadas = relevantes.filter((c) => c.estado === "Confirmada" || c.estado === "Completada").length;
    return (confirmadas / relevantes.length) * 100;
  }, [citasHoy]);

  // --- Barra de 7 días: lunes a domingo de la semana de "hoy" ---
  const barraDatos = useMemo(() => {
    const lunes = lunesDeLaSemana(hoy);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(lunes);
      d.setDate(d.getDate() + i);
      const fechaDia = aISO(d);
      const citasDelDia = citas.filter((c) => c.fecha === fechaDia);
      return {
        etiqueta: NOMBRES_DIA[i],
        atendidas: citasDelDia.filter((c) => c.estado === "Completada").length,
        noAtendidas: citasDelDia.filter((c) => c.estado === "No atendida" || c.estado === "Cancelada").length,
      };
    });
  }, [citas, hoy]);

  // --- Cumpleaños esta semana (ignora el año, compara mes-día) ---
  const cumpleanosSemana = useMemo(() => {
    const lunes = lunesDeLaSemana(hoy);
    const diasSemana = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(lunes);
      d.setDate(d.getDate() + i);
      return `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });
    return pacientes.filter((p) => {
      if (!p.fechaNacimiento) return false;
      const md = p.fechaNacimiento.slice(5, 10); // "MM-DD"
      return diasSemana.includes(md);
    });
  }, [pacientes, hoy]);

  // --- Garantías de audífonos por vencer en los próximos 30 días ---
  const garantiasPorVencer = useMemo(() => {
    const limite = new Date(hoy + "T00:00:00");
    limite.setDate(limite.getDate() + 30);
    const limiteISO = aISO(limite);
    return audifonos.filter(
      (a) => a.garantia?.vencimiento && a.garantia.vencimiento >= hoy && a.garantia.vencimiento <= limiteISO
    );
  }, [audifonos, hoy]);

  const nombrePaciente = (id: string) => {
    const p = pacientes.find((x) => x.id === id);
    return p ? `${p.nombres} ${p.apellidos}` : id;
  };
  const nombreProfesional = (id: string) => profesionales.find((p) => p.id === id)?.nombreCorto ?? id;

  return (
    <div className="space-y-5">
      <TituloSeccion>
        Buenos días
        <div className="mt-1 text-sm font-normal text-slate-500">
          {fechaCorta(hoy)}
        </div>
      </TituloSeccion>

      {/* KPIs principales */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="tarjeta">
          <div className="flex items-center gap-2 text-slate-400">
            <CalendarClock size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">Citas hoy</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">
            {citasAtendidasHoy} <span className="text-base font-normal text-slate-400">/ {citasHoy.length} atendidas</span>
          </div>
        </div>

        <div className="tarjeta">
          <div className="flex items-center gap-2 text-slate-400">
            <MessageCircle size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">WhatsApp pendientes</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">{recordatoriosWhatsappPendientes.length}</div>
          <Link href="/recordatorios" className="text-xs font-semibold text-marca-700 hover:underline">
            Ver recordatorios →
          </Link>
        </div>

        <div className="tarjeta">
          <div className="flex items-center gap-2 text-slate-400">
            <UserPlus size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">Pacientes nuevos (mes)</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-800">{pacientesNuevosMes}</div>
        </div>

        <div className="tarjeta">
          <div className="flex items-center gap-2 text-slate-400">
            <Percent size={16} />
            <span className="text-xs font-semibold uppercase tracking-wide">Confirmación hoy</span>
          </div>
          <div className="mt-2">
            <AnilloProgreso porcentaje={tasaConfirmacion} etiqueta="citas confirmadas" />
          </div>
        </div>
      </div>

      {/* Citas de hoy + gráfico semanal */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="tarjeta">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold text-slate-800">Citas de hoy</h3>
            <Link href="/agenda" className="text-xs font-semibold text-marca-700 hover:underline">
              Ver agenda →
            </Link>
          </div>
          {citasHoy.length === 0 && <Vacio>No hay citas agendadas para hoy.</Vacio>}
          <div className="space-y-2">
            {citasHoy.slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-700">{c.hora}</span>{" "}
                  <span className="text-slate-600">{nombrePaciente(c.pacienteId)}</span>
                  <div className="text-xs text-slate-400">{c.motivo} · {nombreProfesional(c.profesionalId)}</div>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                  {c.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="tarjeta">
          <h3 className="mb-3 font-bold text-slate-800">Citas atendidas vs. no atendidas — esta semana</h3>
          <BarraSemana dias={barraDatos} />
          <div className="mt-3 flex gap-4 text-xs text-slate-500">
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-marca-600" />Atendidas</span>
            <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-300" />No atendidas / canceladas</span>
          </div>
        </div>
      </div>

      {/* Cumpleaños + Garantías */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="tarjeta">
          <div className="mb-2 flex items-center gap-2 text-slate-700">
            <Cake size={16} />
            <h3 className="font-bold">Cumpleaños esta semana</h3>
          </div>
          {cumpleanosSemana.length === 0 && <Vacio>No hay cumpleaños esta semana.</Vacio>}
          <div className="space-y-1.5">
            {cumpleanosSemana.map((p) => (
              <Link
                key={p.id}
                href={`/pacientes/${p.id}`}
                className="block rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-700">{p.nombres} {p.apellidos}</span>{" "}
                <span className="text-slate-400">· {p.fechaNacimiento?.slice(5, 10).split("-").reverse().join("/")}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="tarjeta">
          <div className="mb-2 flex items-center gap-2 text-slate-700">
            <ShieldAlert size={16} />
            <h3 className="font-bold">Garantías por vencer (30 días)</h3>
          </div>
          {garantiasPorVencer.length === 0 && <Vacio>No hay garantías por vencer pronto.</Vacio>}
          <div className="space-y-1.5">
            {garantiasPorVencer.map((a) => (
              <Link
                key={a.id}
                href={`/pacientes/${a.pacienteId}`}
                className="block rounded-lg px-2 py-1.5 text-sm hover:bg-slate-50"
              >
                <span className="font-semibold text-slate-700">{nombrePaciente(a.pacienteId)}</span>{" "}
                <span className="text-slate-500">· {a.marca} {a.modelo}</span>{" "}
                <span className="text-amber-700">· vence {fechaCorta(a.garantia!.vencimiento!)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}