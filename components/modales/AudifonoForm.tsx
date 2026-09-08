"use client";

import { useState } from "react";
import { Modal, Alerta } from "@/components/ui";
import { useStore } from "@/lib/store";
import { MARCAS_SUGERIDAS, AGENCIAS } from "@/lib/data";
import type { Audifono, EstadoAudifono, ProcedenciaAudifono } from "@/lib/types";

const ESTADOS: EstadoAudifono[] = ["En uso", "En reparación", "Devuelto", "Dado de baja"];
const PROCEDENCIAS: ProcedenciaAudifono[] = ["Adquirido en Proaudio", "Traído de otra empresa"];

export default function AudifonoFormModal({
  abierto,
  onCerrar,
  pacienteId,
  equipo,
}: {
  abierto: boolean;
  onCerrar: () => void;
  pacienteId: string;
  /** Si viene definido se edita ese equipo; si no, se registra uno nuevo. */
  equipo?: Audifono | null;
}) {
  const { hoy, guardarAudifono } = useStore();
  const [marca, setMarca] = useState(equipo?.marca ?? "");
  const [modelo, setModelo] = useState(equipo?.modelo ?? "");
  const [oido, setOido] = useState<Audifono["oido"]>(equipo?.oido ?? "Derecho");
  const [serie, setSerie] = useState(equipo?.serie ?? "");
  const [fechaEntrega, setFechaEntrega] = useState(equipo?.fechaEntrega ?? hoy);
  const [estado, setEstado] = useState<EstadoAudifono>(equipo?.estado ?? "En uso");
  const [numeroFactura, setNumeroFactura] = useState(equipo?.numeroFactura ?? "");
  const [procedencia, setProcedencia] = useState<ProcedenciaAudifono>(
    equipo?.procedencia ?? "Adquirido en Proaudio"
  );
  const [agenciaAdquisicion, setAgenciaAdquisicion] = useState(equipo?.agenciaAdquisicion ?? "");
  const [garantiaInicio, setGarantiaInicio] = useState(equipo?.garantia?.inicio ?? "");
  const [garantiaVencimiento, setGarantiaVencimiento] = useState(equipo?.garantia?.vencimiento ?? "");
  const [observaciones, setObservaciones] = useState(equipo?.observaciones ?? "");
  const [error, setError] = useState("");

  function guardar() {
    if (!marca.trim() || !modelo.trim()) {
      setError("La marca y el modelo son obligatorios.");
      return;
    }
    if (!fechaEntrega) {
      setError("La fecha de entrega o de inicio de uso es obligatoria.");
      return;
    }
    if (fechaEntrega > hoy) {
      setError("No se pueden registrar fechas futuras en este campo: fecha de entrega.");
      return;
    }
    guardarAudifono({
      id: equipo?.id,
      pacienteId,
      marca: marca.trim(),
      modelo: modelo.trim(),
      oido,
      serie: serie.trim() || undefined,
      fechaEntrega,
      estado,
      procedencia,
      agenciaAdquisicion: procedencia === "Adquirido en Proaudio" ? (agenciaAdquisicion || undefined) : undefined,
      numeroFactura: numeroFactura.trim() || undefined,
      observaciones: observaciones.trim() || undefined,
      garantia:
        garantiaInicio || garantiaVencimiento
          ? { inicio: garantiaInicio || undefined, vencimiento: garantiaVencimiento || undefined }
          : undefined,
    });
    setError("");
    onCerrar();
  }

  return (
    <Modal
      titulo={equipo ? "Editar audífono" : "Registrar audífono"}
      abierto={abierto}
      onCerrar={onCerrar}
    >
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="etiqueta">Marca *</label>
            <input
              className="campo"
              list="marcas-sugeridas"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Escriba o elija una marca"
            />
            <datalist id="marcas-sugeridas">
              {MARCAS_SUGERIDAS.map((m) => (
                <option key={m} value={m} />
              ))}
            </datalist>
            <p className="mt-1 text-[10px] text-amber-700">⚠ Marcas de ejemplo — por validar</p>
          </div>
          <div>
            <label className="etiqueta">Modelo *</label>
            <input className="campo" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          </div>
          <div>
            <label className="etiqueta">Oído *</label>
            <select
              className="campo"
              value={oido}
              onChange={(e) => setOido(e.target.value as Audifono["oido"])}
            >
              <option>Derecho</option>
              <option>Izquierdo</option>
              <option>Ambos</option>
            </select>
          </div>
          <div>
            <label className="etiqueta">Número de serie</label>
            <input
              className="campo"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              placeholder="SERIE-DEMO-000"
            />
          </div>
          <div>
            <label className="etiqueta">Fecha de entrega o inicio de uso *</label>
            <input
              type="date"
              className="campo"
              max={hoy}
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />
          </div>
          <div>
            <label className="etiqueta">Estado *</label>
            <select
              className="campo"
              value={estado}
              onChange={(e) => setEstado(e.target.value as EstadoAudifono)}
            >
              {ESTADOS.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="etiqueta">Nº de factura</label>
            <input
              className="campo"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              placeholder="FACT-DEMO-000"
            />
          </div>
          <div>
            <label className="etiqueta">Procedencia *</label>
            <select
              className="campo"
              value={procedencia}
              onChange={(e) => setProcedencia(e.target.value as ProcedenciaAudifono)}
            >
              {PROCEDENCIAS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {procedencia === "Traído de otra empresa" && (
          <Alerta>
            El alcance de la garantía para equipos de otra procedencia está por definir (D-05).
          </Alerta>
        )}

        {procedencia === "Adquirido en Proaudio" && (
          <div>
            <label className="etiqueta">Agencia donde se adquirió</label>
            <select
              className="campo"
              value={agenciaAdquisicion}
              onChange={(e) => setAgenciaAdquisicion(e.target.value)}
            >
              <option value="">— Sin especificar —</option>
              {AGENCIAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Garantía (opcional)
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="etiqueta">Inicio</label>
              <input
                type="date"
                className="campo"
                value={garantiaInicio}
                onChange={(e) => setGarantiaInicio(e.target.value)}
              />
            </div>
            <div>
              <label className="etiqueta">Vencimiento</label>
              <input
                type="date"
                className="campo"
                value={garantiaVencimiento}
                onChange={(e) => setGarantiaVencimiento(e.target.value)}
              />
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            El estado (vigente / por vencer / vencida) se calcula a partir del vencimiento. Si no se
            indica fecha, se mostrará &laquo;Garantía sin registrar&raquo;. Las reglas reales de
            duración y cobertura siguen sin definirse (D-05).
          </p>
        </div>

        <div>
          <label className="etiqueta">Observaciones</label>
          <textarea
            className="campo"
            rows={2}
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
          />
        </div>

        <p className="text-[11px] text-slate-500">
          ℹ Los equipos no se borran. Para retirar uno, cambie su estado a &laquo;Dado de baja&raquo;:
          seguirá visible en el historial.
        </p>

        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button className="btn-secundario" onClick={onCerrar}>
            Cancelar
          </button>
          <button className="btn-primario" onClick={guardar}>
            {equipo ? "Guardar cambios" : "Registrar audífono"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
