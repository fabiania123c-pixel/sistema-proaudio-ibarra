"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { Modal } from "@/components/ui";
import { useStore } from "@/lib/store";
import type { Paciente } from "@/lib/types";
import { fechaCorta, normalizar } from "@/lib/format";
import { AGENCIAS } from "@/lib/data";

export const AYUDA_TELEFONO_FAMILIAR =
  "Muchos pacientes adultos mayores se contactan a través de un familiar. A quién debe dirigirse cada mensaje está por definir con Proaudio.";

export default function PacienteFormModal({
  abierto,
  onCerrar,
  onGuardado,
}: {
  abierto: boolean;
  onCerrar: () => void;
  onGuardado: (paciente: Paciente, agendarCita: boolean) => void;
}) {
  const { hoy, pacientes, profesionales, sucursalId, crearPaciente } = useStore();
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [verOpcionales, setVerOpcionales] = useState(false);
  const [documento, setDocumento] = useState("");
  const [telefono2, setTelefono2] = useState("");
  const [telefonoFamiliar, setTelefonoFamiliar] = useState("");
  const [correo, setCorreo] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [agencia, setAgencia] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaPrimeraVisita, setFechaPrimeraVisita] = useState(hoy);
  const [comoConocio, setComoConocio] = useState("");
  const [referidoPor, setReferidoPor] = useState("");
  const [profesionalId, setProfesionalId] = useState("");
  const [fichaFisica, setFichaFisica] = useState("");
  const [notas, setNotas] = useState("");
  const [agendarDespues, setAgendarDespues] = useState(true);
  const [descartarAviso, setDescartarAviso] = useState(false);
  const [error, setError] = useState("");

  const posiblesDuplicados = useMemo(() => {
    const na = normalizar(apellidos);
    const nn = normalizar(nombres);
    const nt = telefono.replace(/\D/g, "");
    const nd = normalizar(documento);
    if (na.length < 3 && nt.length < 7 && nd.length < 5) return [];
    return pacientes.filter((p) => {
      const coincideApellido = na.length >= 3 && normalizar(p.apellidos).includes(na);
      const coincideNombre = nn.length >= 3 && normalizar(p.nombres).includes(nn);
      const coincideTel =
        nt.length >= 7 &&
        [p.telefono, p.telefono2, p.telefonoFamiliar].some((t) =>
          (t ?? "").replace(/\D/g, "").includes(nt)
        );
      const coincideDoc = nd.length >= 5 && normalizar(p.documento ?? "").includes(nd);
      return coincideApellido || (coincideNombre && coincideApellido) || coincideTel || coincideDoc;
    });
  }, [pacientes, nombres, apellidos, telefono, documento]);

  function limpiar() {
    setNombres("");
    setApellidos("");
    setTelefono("");
    setVerOpcionales(false);
    setDocumento("");
    setTelefono2("");
    setTelefonoFamiliar("");
    setCorreo("");
    setCiudad("");
    setAgencia("");
    setFechaNacimiento("");
    setFechaPrimeraVisita(hoy);
    setComoConocio("");
    setReferidoPor("");
    setProfesionalId("");
    setFichaFisica("");
    setNotas("");
    setAgendarDespues(true);
    setDescartarAviso(false);
    setError("");
  }

  function guardar() {
    if (!nombres.trim() || !apellidos.trim() || !telefono.trim()) {
      setError("Nombres, apellidos y teléfono principal son obligatorios.");
      return;
    }
    if (fechaPrimeraVisita && fechaPrimeraVisita > hoy) {
      setError("No se pueden registrar fechas futuras en este campo: fecha de primera visita.");
      return;
    }
    if (fechaNacimiento && fechaNacimiento > hoy) {
      setError("No se pueden registrar fechas futuras en este campo: fecha de nacimiento.");
      return;
    }
    const paciente = crearPaciente({
      nombres: nombres.trim(),
      apellidos: apellidos.trim(),
      telefono: telefono.trim(),
      sucursalId,
      documento: documento.trim() || undefined,
      telefono2: telefono2.trim() || undefined,
      telefonoFamiliar: telefonoFamiliar.trim() || undefined,
      correo: correo.trim() || undefined,
      ciudad: ciudad.trim() || undefined,
      agencia: agencia || undefined,
      fechaNacimiento: fechaNacimiento || undefined,
      fechaPrimeraVisita: fechaPrimeraVisita || hoy,
      comoConocio: comoConocio || undefined,
      referidoPor: referidoPor.trim() || undefined,
      profesionalId: profesionalId || undefined,
      fichaFisica: fichaFisica.trim() || undefined,
      notas: notas.trim() || undefined,
    });
    limpiar();
    onGuardado(paciente, agendarDespues);
  }

  const esPacienteAntiguo = fechaPrimeraVisita !== "" && fechaPrimeraVisita < hoy;

  return (
    <Modal
      titulo="Paciente nuevo"
      abierto={abierto}
      onCerrar={() => {
        limpiar();
        onCerrar();
      }}
    >
      <div className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
            Datos necesarios
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="etiqueta">Nombres *</label>
              <input className="campo" value={nombres} onChange={(e) => setNombres(e.target.value)} />
            </div>
            <div>
              <label className="etiqueta">Apellidos *</label>
              <input className="campo" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
            </div>
            <div>
              <label className="etiqueta">Teléfono principal *</label>
              <input
                className="campo"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="099-000-0000 (ficticio)"
              />
            </div>
            <div>
              <label className="etiqueta">Fecha de primera visita</label>
              <input
                type="date"
                className="campo"
                max={hoy}
                value={fechaPrimeraVisita}
                onChange={(e) => setFechaPrimeraVisita(e.target.value)}
              />
              <p className="mt-1 text-[11px] text-slate-500">
                {esPacienteAntiguo
                  ? `Paciente antiguo: la ficha se fechará el ${fechaCorta(fechaPrimeraVisita)}.`
                  : "Por defecto hoy. Cámbiela si el paciente ya venía desde antes."}
              </p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            El código interno (PAC-…) lo genera el sistema. La cédula es opcional y no es el
            identificador definitivo (decisión D-01 por validar).
          </p>
        </div>

        {posiblesDuplicados.length > 0 && !descartarAviso && (
          <div className="rounded-lg border border-amber-300 bg-amber-50 p-3">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-900">
              <AlertTriangle size={16} /> ¿Es alguna de estas personas? (advertencia — la fusión
              nunca es automática)
            </div>
            <div className="space-y-2">
              {posiblesDuplicados.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-sm"
                >
                  <div>
                    <span className="font-semibold">
                      {p.apellidos}, {p.nombres}
                    </span>{" "}
                    <span className="text-slate-500">
                      · {p.id} · {p.telefono} · últ. visita {fechaCorta(p.ultimaVisita)}
                    </span>
                  </div>
                  <button
                    className="btn-suave"
                    onClick={() => {
                      limpiar();
                      onGuardado(p, false);
                    }}
                  >
                    Usar esta ficha
                  </button>
                </div>
              ))}
            </div>
            <button
              className="mt-2 text-xs font-semibold text-amber-800 underline"
              onClick={() => setDescartarAviso(true)}
            >
              No, es una persona distinta — continuar
            </button>
          </div>
        )}

        <div className="rounded-lg border border-slate-200">
          <button
            className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold text-slate-600"
            onClick={() => setVerOpcionales((v) => !v)}
          >
            Datos adicionales (opcionales — se pueden completar después)
            {verOpcionales ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {verOpcionales && (
            <div className="grid gap-3 border-t border-slate-200 p-3 sm:grid-cols-2">
              <div>
                <label className="etiqueta">Cédula o documento (opcional)</label>
                <input
                  className="campo"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder="DOC-FICT-000"
                />
              </div>
              <div>
                <label className="etiqueta">Teléfono 2</label>
                <input className="campo" value={telefono2} onChange={(e) => setTelefono2(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="etiqueta">Teléfono de familiar</label>
                <input
                  className="campo"
                  value={telefonoFamiliar}
                  onChange={(e) => setTelefonoFamiliar(e.target.value)}
                  placeholder="099-000-0000 (ficticio)"
                />
                <p className="mt-1 text-[11px] text-slate-500">{AYUDA_TELEFONO_FAMILIAR}</p>
              </div>
              <div>
                <label className="etiqueta">Correo</label>
                <input
                  className="campo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@prototipo.invalid"
                />
              </div>
              <div>
                <label className="etiqueta">Ciudad</label>
                <input className="campo" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
              </div>
              <div>
                <label className="etiqueta">Agencia</label>
                <select className="campo" value={agencia} onChange={(e) => setAgencia(e.target.value)}>
                  <option value="">Sin especificar</option>
                  {AGENCIAS.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="etiqueta">Fecha de nacimiento</label>
                <input
                  type="date"
                  className="campo"
                  max={hoy}
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              <div>
                <label className="etiqueta">¿Cómo conoció Proaudio?</label>
                <select className="campo" value={comoConocio} onChange={(e) => setComoConocio(e.target.value)}>
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
                <label className="etiqueta">¿Quién lo refirió?</label>
                <input className="campo" value={referidoPor} onChange={(e) => setReferidoPor(e.target.value)} />
              </div>
              <div>
                <label className="etiqueta">Profesional responsable</label>
                <select
                  className="campo"
                  value={profesionalId}
                  onChange={(e) => setProfesionalId(e.target.value)}
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
                <label className="etiqueta">Nº de ficha física (dato separado)</label>
                <input className="campo" value={fichaFisica} onChange={(e) => setFichaFisica(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="etiqueta">Notas</label>
                <textarea className="campo" rows={2} value={notas} onChange={(e) => setNotas(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={agendarDespues}
            onChange={(e) => setAgendarDespues(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          Agendar primera cita después de guardar
        </label>

        {error && <p className="text-sm font-semibold text-rose-700">{error}</p>}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
          <button
            className="btn-secundario"
            onClick={() => {
              limpiar();
              onCerrar();
            }}
          >
            Cancelar
          </button>
          <button className="btn-primario" onClick={guardar}>
            Guardar paciente
          </button>
        </div>
      </div>
    </Modal>
  );
}
