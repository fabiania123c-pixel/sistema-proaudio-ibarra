"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Modal } from "@/components/ui";
import { useStore } from "@/lib/store";
import { ESTADOS_DIGITALIZACION, AGENCIAS } from "@/lib/data";
import type { EstadoDigitalizacion, Paciente } from "@/lib/types";
import { AYUDA_TELEFONO_FAMILIAR } from "./PacienteForm";

/** Bloque plegable: lo esencial queda visible, el resto se despliega. */
function Bloque({
  titulo,
  children,
  abiertoPorDefecto = false,
}: {
  titulo: string;
  children: React.ReactNode;
  abiertoPorDefecto?: boolean;
}) {
  const [abierto, setAbierto] = useState(abiertoPorDefecto);
  return (
    <div className="rounded-lg border border-slate-200">
      <button
        className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-600"
        onClick={() => setAbierto((v) => !v)}
      >
        {titulo}
        {abierto ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {abierto && <div className="grid gap-3 border-t border-slate-200 p-3 sm:grid-cols-2">{children}</div>}
    </div>
  );
}

export default function PacienteEditarModal({
  abierto,
  paciente,
  onCerrar,
}: {
  abierto: boolean;
  paciente: Paciente;
  onCerrar: () => void;
}) {
  const { hoy, profesionales, actualizarPaciente } = useStore();
  const [f, setF] = useState<Paciente>(paciente);
  const [error, setError] = useState("");

  const set = <K extends keyof Paciente>(campo: K, valor: Paciente[K]) =>
    setF((prev) => ({ ...prev, [campo]: valor }));

  function guardar() {
    if (!f.nombres.trim() || !f.apellidos.trim() || !f.telefono.trim()) {
      setError("Nombres, apellidos y teléfono principal no pueden quedar vacíos.");
      return;
    }
    // Los campos que registran algo ya ocurrido no admiten fechas futuras.
    if (f.fechaNacimiento && f.fechaNacimiento > hoy) {
      setError("No se pueden registrar fechas futuras en este campo: fecha de nacimiento.");
      return;
    }
    if (f.fechaPrimeraVisita && f.fechaPrimeraVisita > hoy) {
      setError("No se pueden registrar fechas futuras en este campo: fecha de primera visita.");
      return;
    }
    const limpio = (s?: string) => {
      const v = (s ?? "").trim();
      return v === "" ? undefined : v;
    };
    actualizarPaciente(paciente.id, {
      nombres: f.nombres.trim(),
      apellidos: f.apellidos.trim(),
      documento: limpio(f.documento),
      fichaFisica: limpio(f.fichaFisica),
      telefono: f.telefono.trim(),
      telefono2: limpio(f.telefono2),
      telefonoFamiliar: limpio(f.telefonoFamiliar),
      correo: limpio(f.correo),
      ciudad: limpio(f.ciudad),
      comoConocio: limpio(f.comoConocio),
      referidoPor: limpio(f.referidoPor),
      profesionalId: limpio(f.profesionalId),
      categoria: limpio(f.categoria),
      agencia: limpio(f.agencia),
      ultimaIndicacion: limpio(f.ultimaIndicacion),
      proximaAccion: limpio(f.proximaAccion),
      estadoDigitalizacion: f.estadoDigitalizacion,
      ubicacionArchivo: limpio(f.ubicacionArchivo),
      fechaNacimiento: limpio(f.fechaNacimiento),
      fechaPrimeraVisita: limpio(f.fechaPrimeraVisita),
      estado: f.estado.trim(),
      notas: limpio(f.notas),
    });
    setError("");
    onCerrar();
  }

  return (
    <Modal titulo={`Editar ficha — ${paciente.id}`} abierto={abierto} onCerrar={onCerrar}>
      <div className="space-y-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Identificación y contacto
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="etiqueta">Nombres *</label>
              <input className="campo" value={f.nombres} onChange={(e) => set("nombres", e.target.value)} />
            </div>
            <div>
              <label className="etiqueta">Apellidos *</label>
              <input className="campo" value={f.apellidos} onChange={(e) => set("apellidos", e.target.value)} />
            </div>
            <div>
              <label className="etiqueta">Teléfono principal *</label>
              <input className="campo" value={f.telefono} onChange={(e) => set("telefono", e.target.value)} />
            </div>
            <div>
              <label className="etiqueta">Código interno</label>
              <input className="campo bg-slate-100 text-slate-500" value={paciente.id} readOnly />
              <p className="mt-1 text-[11px] text-slate-500">
                Lo genera el sistema y no se edita (D-01 por validar).
              </p>
            </div>
          </div>
        </div>

        <Bloque titulo="Más datos de contacto">
          <div>
            <label className="etiqueta">Teléfono 2</label>
            <input className="campo" value={f.telefono2 ?? ""} onChange={(e) => set("telefono2", e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Correo</label>
            <input
              className="campo"
              value={f.correo ?? ""}
              onChange={(e) => set("correo", e.target.value)}
              placeholder="ejemplo@prototipo.invalid"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="etiqueta">Teléfono de familiar</label>
            <input
              className="campo"
              value={f.telefonoFamiliar ?? ""}
              onChange={(e) => set("telefonoFamiliar", e.target.value)}
              placeholder="099-000-0000 (ficticio)"
            />
            <p className="mt-1 text-[11px] text-slate-500">{AYUDA_TELEFONO_FAMILIAR}</p>
          </div>
          <div>
            <label className="etiqueta">Ciudad</label>
            <input className="campo" value={f.ciudad ?? ""} onChange={(e) => set("ciudad", e.target.value)} />
          </div>
        </Bloque>

        <Bloque titulo="Identificación documental">
          <div>
            <label className="etiqueta">Cédula o documento</label>
            <input
              className="campo"
              value={f.documento ?? ""}
              onChange={(e) => set("documento", e.target.value)}
              placeholder="DOC-FICT-000"
            />
          </div>
          <div>
            <label className="etiqueta">Nº de ficha física</label>
            <input
              className="campo"
              value={f.fichaFisica ?? ""}
              onChange={(e) => set("fichaFisica", e.target.value)}
            />
          </div>
        </Bloque>

        <Bloque titulo="Origen y asignación">
          <div>
            <label className="etiqueta">Cómo conoció Proaudio</label>
            <select
              className="campo"
              value={f.comoConocio ?? ""}
              onChange={(e) => set("comoConocio", e.target.value)}
            >
              <option value="">— Sin registrar —</option>
              <option>Referido por un paciente</option>
              <option>Referido por un médico</option>
              <option>Redes sociales</option>
              <option>Pasó por el local</option>
              <option>Otro</option>
            </select>
            <p className="mt-1 text-[10px] text-amber-700">⚠ Lista provisional — por validar</p>
          </div>
          <div>
            <label className="etiqueta">Quién lo refirió</label>
            <input
              className="campo"
              value={f.referidoPor ?? ""}
              onChange={(e) => set("referidoPor", e.target.value)}
            />
          </div>
          <div>
            <label className="etiqueta">Profesional responsable</label>
            <select
              className="campo"
              value={f.profesionalId ?? ""}
              onChange={(e) => set("profesionalId", e.target.value)}
            >
              <option value="">— Sin asignar —</option>
              {profesionales
                .filter((p) => p.atiende)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="etiqueta">Categoría</label>
            <select
              className="campo"
              value={f.categoria ?? ""}
              onChange={(e) => set("categoria", e.target.value)}
            >
              <option value="">— Sin asignar —</option>
              <option>S+</option>
              <option>A</option>
              <option>B</option>
            </select>
            <p className="mt-1 text-[10px] text-amber-700">⚠ Criterio por definir (D-04)</p>
          </div>
          <div>
            <label className="etiqueta">Agencia</label>
            <select
              className="campo"
              value={f.agencia ?? ""}
              onChange={(e) => set("agencia", e.target.value)}
            >
              <option value="">— Sin especificar —</option>
              {AGENCIAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        </Bloque>

        <Bloque titulo="Resumen clínico operativo">
          <div className="sm:col-span-2">
            <label className="etiqueta">Última indicación al paciente</label>
            <textarea
              className="campo"
              rows={2}
              value={f.ultimaIndicacion ?? ""}
              onChange={(e) => set("ultimaIndicacion", e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="etiqueta">Próxima acción recomendada</label>
            <input
              className="campo"
              value={f.proximaAccion ?? ""}
              onChange={(e) => set("proximaAccion", e.target.value)}
            />
          </div>
        </Bloque>

        <Bloque titulo="Archivo físico y digitalización">
          <div>
            <label className="etiqueta">Estado de digitalización</label>
            <select
              className="campo"
              value={f.estadoDigitalizacion}
              onChange={(e) => set("estadoDigitalizacion", e.target.value as EstadoDigitalizacion)}
            >
              {ESTADOS_DIGITALIZACION.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="etiqueta">Ubicación de la ficha física</label>
            <input
              className="campo"
              value={f.ubicacionArchivo ?? ""}
              onChange={(e) => set("ubicacionArchivo", e.target.value)}
              placeholder="Estante 4 · carpeta 128"
            />
          </div>
        </Bloque>

        <Bloque titulo="Fechas, estado y notas">
          <div>
            <label className="etiqueta">Fecha de nacimiento</label>
            <input
              type="date"
              className="campo"
              max={hoy}
              value={f.fechaNacimiento ?? ""}
              onChange={(e) => set("fechaNacimiento", e.target.value)}
            />
          </div>
          <div>
            <label className="etiqueta">Fecha de primera visita</label>
            <input
              type="date"
              className="campo"
              max={hoy}
              value={f.fechaPrimeraVisita ?? ""}
              onChange={(e) => set("fechaPrimeraVisita", e.target.value)}
            />
          </div>
          <div>
            <label className="etiqueta">Estado del paciente</label>
            <input className="campo" value={f.estado} onChange={(e) => set("estado", e.target.value)} />
          </div>
          <div className="sm:col-span-2">
            <label className="etiqueta">Notas administrativas</label>
            <textarea
              className="campo"
              rows={2}
              value={f.notas ?? ""}
              onChange={(e) => set("notas", e.target.value)}
            />
          </div>
        </Bloque>

        <p className="text-[11px] text-slate-500">
          ℹ Al guardar se añade a la línea de tiempo un registro de qué campos cambiaron, con autor y
          fecha. Nada se sobrescribe en silencio.
        </p>

        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn-primario" onClick={guardar}>
            Guardar cambios
          </button>
        </div>
      </div>
    </Modal>
  );
}
