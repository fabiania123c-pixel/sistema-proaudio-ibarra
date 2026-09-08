"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { useStore } from "@/lib/store";
import { fechaCorta, normalizar } from "@/lib/format";
import { CategoriaBadge, DigitalizacionBadge, TituloSeccion, Vacio } from "@/components/ui";
import PacienteFormModal from "@/components/modales/PacienteForm";
import CitaFormModal from "@/components/modales/CitaForm";

function PacientesContenido() {
  const router = useRouter();
  const params = useSearchParams();
  const { hoy, pacientes, citas, profesionales } = useStore();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [filtroProf, setFiltroProf] = useState("todos");
  const [soloAlertas, setSoloAlertas] = useState(false);
  const [modalPaciente, setModalPaciente] = useState(false);
  const [citaParaNuevo, setCitaParaNuevo] = useState<string | undefined>(undefined);
  const [modalCita, setModalCita] = useState(false);

  const resultados = useMemo(() => {
    const nq = normalizar(q);
    const soloDigitos = nq.replace(/\D/g, "");
    return pacientes.filter((p) => {
      if (filtroProf !== "todos" && p.profesionalId !== filtroProf) return false;
      if (soloAlertas && !p.alerta) return false;
      if (!nq) return true;
      // Busca en los tres teléfonos: principal, secundario y el del familiar.
      const coincideTelefono =
        soloDigitos.length > 0 &&
        [p.telefono, p.telefono2, p.telefonoFamiliar].some((t) =>
          (t ?? "").replace(/\D/g, "").includes(soloDigitos)
        );
      return (
        normalizar(`${p.nombres} ${p.apellidos}`).includes(nq) ||
        normalizar(`${p.apellidos} ${p.nombres}`).includes(nq) ||
        coincideTelefono ||
        normalizar(p.documento ?? "").includes(nq) ||
        normalizar(p.id).includes(nq)
      );
    });
  }, [pacientes, q, filtroProf, soloAlertas]);

  const proximaCita = (pacienteId: string) => {
    const futuras = citas
      .filter(
        (c) =>
          c.pacienteId === pacienteId &&
          c.fecha >= hoy &&
          (c.estado === "Agendada" || c.estado === "Confirmada")
      )
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
    return futuras[0];
  };

  return (
    <div className="space-y-4">
      <TituloSeccion
        extra={
          <button className="btn-primario" onClick={() => setModalPaciente(true)}>
            <UserPlus size={16} /> Paciente nuevo
          </button>
        }
      >
        Pacientes
      </TituloSeccion>

      <div className="tarjeta space-y-3">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="campo pl-9"
            placeholder="Buscar por nombre, teléfono (propio o de familiar), documento o código (PAC-…)"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <select className="campo w-auto" value={filtroProf} onChange={(e) => setFiltroProf(e.target.value)}>
            <option value="todos">Todo el equipo</option>
            {profesionales.filter((p) => p.atiende).map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
          <label className="flex items-center gap-1.5 text-slate-600">
            <input type="checkbox" checked={soloAlertas} onChange={(e) => setSoloAlertas(e.target.checked)} />
            Solo con alertas
          </label>
          <span className="ml-auto text-xs text-slate-400">
            {resultados.length} paciente{resultados.length !== 1 ? "s" : ""} (datos ficticios)
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {resultados.map((p) => {
          const prox = proximaCita(p.id);
          const prof = profesionales.find((x) => x.id === p.profesionalId);
          return (
            <Link key={p.id} href={`/pacientes/${p.id}`} className="tarjeta block transition hover:border-marca-600 hover:shadow">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-slate-800">{p.apellidos}, {p.nombres}</span>
                    <span className="text-xs font-semibold text-slate-400">{p.id}</span>
                    {p.esNuevo && (
                      <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">NUEVO</span>
                    )}
                    <CategoriaBadge categoria={p.categoria} />
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    📞 {p.telefono}
                    {p.telefonoFamiliar ? ` · familiar ${p.telefonoFamiliar}` : ""}
                    {prof ? ` · ${prof.nombreCorto}` : ""} · Últ. visita: {fechaCorta(p.ultimaVisita)} ·
                    Próx. cita: {prox ? `${fechaCorta(prox.fecha)} ${prox.hora}` : "—"}
                  </div>
                  {p.alerta && <div className="mt-1 text-xs font-semibold text-amber-800">⚠ {p.alerta}</div>}
                </div>
                <DigitalizacionBadge estado={p.estadoDigitalizacion} />
              </div>
            </Link>
          );
        })}
        {resultados.length === 0 && (
          <Vacio>
            No se encontraron pacientes con esos datos.{" "}
            <button className="font-semibold text-marca-700 underline" onClick={() => setModalPaciente(true)}>
              Crear paciente nuevo
            </button>
          </Vacio>
        )}
      </div>

      <PacienteFormModal
        abierto={modalPaciente}
        onCerrar={() => setModalPaciente(false)}
        onGuardado={(p, agendar) => {
          setModalPaciente(false);
          if (agendar) {
            setCitaParaNuevo(p.id);
            setModalCita(true);
          } else {
            router.push(`/pacientes/${p.id}`);
          }
        }}
      />
      <CitaFormModal
        abierto={modalCita}
        pacienteId={citaParaNuevo}
        onCerrar={() => setModalCita(false)}
        onGuardada={(c) => router.push(`/pacientes/${c.pacienteId}`)}
      />
    </div>
  );
}

export default function PacientesPage() {
  return (
    <Suspense>
      <PacientesContenido />
    </Suspense>
  );
}
