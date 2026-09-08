export type EstadoCita =
  | "Agendada"
  | "Confirmada"
  | "Completada"
  | "No atendida"
  | "Cancelada"
  | "Reagendada"
  | "Incompleta";

export type EstadoDigitalizacion =
  | "Sin digitalizar"
  | "Datos básicos"
  | "Parcial"
  | "Completa para operar"
  | "Completa";

export type EstadoRecordatorio = "Pendiente" | "Completado" | "Pospuesto" | "Cancelado";

export type CategoriaRecordatorio =
  | "Tarea para recepción"
  | "Alerta para profesional"
  | "Recordatorio de cita"
  | "Comunicación futura al paciente";

export type ResultadoContacto =
  | "Contactado"
  | "No respondió"
  | "Agendó cita"
  | "Solicita llamada posterior"
  | "No desea ser contactado"
  | "Número incorrecto"
  | "Otro";

export interface Sucursal {
  id: string;
  nombre: string;
  ciudad: string;
}

export interface Profesional {
  id: string;
  nombre: string;
  nombreCorto: string;
  iniciales: string;
  rol: "Audiología" | "Recepción" | "Administración";
  sucursalId: string;
  color: string; // clases tailwind para la agenda
  atiende: boolean;
  /** Marca al personal que no corresponde a una persona real del equipo. */
  ficticio?: boolean;
}

export interface Paciente {
  id: string; // PAC-00000 — código interno generado por el sistema
  nombres: string;
  apellidos: string;
  telefono: string;
  telefono2?: string;
  /** Muchos pacientes adultos mayores se contactan a través de un familiar. */
  telefonoFamiliar?: string;
  documento?: string; // opcional — no es identificador universal (D-01 abierta)
  fichaFisica?: string; // número de ficha física: dato separado
  correo?: string;
  fechaNacimiento?: string;
  fechaPrimeraVisita?: string;
  ciudad?: string;
  /** Sucursal única por ahora (D-10 resuelta). Se conserva para un futuro multisucursal. */
  sucursalId: string;
  /**
   * Agencia Proaudio de referencia del paciente (Ibarra, Quito, etc.).
   * Pedido por Karla Chamba el 6 ago 2026 — reemplaza el uso de "categoría" para este propósito.
   */
  agencia?: string;
  profesionalId?: string;
  categoria?: string; // "Criterio por definir" (D-04)
  estado: string;
  estadoDigitalizacion: EstadoDigitalizacion;
  ubicacionArchivo?: string;
  ultimaVisita?: string;
  ultimaIndicacion?: string;
  proximaAccion?: string;
  alerta?: string;
  comoConocio?: string;
  referidoPor?: string;
  notas?: string;
  esNuevo?: boolean;
}

export interface Cita {
  id: string;
  pacienteId: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:mm
  duracionMin: number;
  profesionalId: string;
  sucursalId: string;
  motivo: string;
  estado: EstadoCita;
  notas?: string;
  motivoCambio?: string; // motivo de cancelación / reagendamiento / no atención
}

export interface Atencion {
  id: string;
  pacienteId: string;
  citaId?: string;
  fecha: string;
  profesionalId: string;
  tipo: string; // Catálogo por validar (D-23)
  observacion: string;
  indicacion: string;
  proximaAccion: string;
  fechaSeguimiento?: string;
  responsableId: string;
  documentoAdjunto?: string;
}

export interface Recordatorio {
  id: string;
  tipo: string;
  categoria: CategoriaRecordatorio;
  pacienteId?: string;
  motivo: string;
  fecha: string;
  responsableId: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: EstadoRecordatorio;
  canal: string;
  nota?: string;
  motivoCancelacion?: string;
}

export interface Documento {
  id: string;
  pacienteId: string;
  tipo: string;
  titulo: string;
  fechaDocumento?: string;
  fechaCarga: string;
  cargadoPorId: string;
  observaciones?: string;
}

export type EstadoAudifono = "En uso" | "En reparación" | "Devuelto" | "Dado de baja";

/** De dónde salió el equipo. Condiciona quién responde por la garantía (D-05). */
export type ProcedenciaAudifono = "Adquirido en Proaudio" | "Traído de otra empresa";

export interface Audifono {
  id: string;
  pacienteId: string;
  marca: string;
  modelo: string;
  oido: "Derecho" | "Izquierdo" | "Ambos";
  serie?: string; // SERIE-DEMO-000 — formato evidentemente ficticio
  fechaEntrega: string;
  estado: EstadoAudifono;
  procedencia: ProcedenciaAudifono;
  /**
   * Agencia Proaudio donde se adquirió el audífono (Ibarra, Quito, etc.).
   * Pedido por Karla Chamba el 6 ago 2026. Aplica solo si procedencia = "Adquirido en Proaudio".
   */
  agenciaAdquisicion?: string;
  numeroFactura?: string; // FACT-DEMO-000 — formato evidentemente ficticio
  observaciones?: string;
  garantia?: {
    inicio?: string;
    vencimiento?: string;
  };
}

export interface Comunicacion {
  id: string;
  pacienteId: string;
  fecha: string;
  canal: string;
  resultado: ResultadoContacto | string;
  nota?: string;
  registradoPorId: string;
}

export type TipoEvento =
  | "Cita"
  | "Atención"
  | "Reagendamiento"
  | "Contacto"
  | "Recordatorio"
  | "Documento"
  | "Equipo"
  | "Ficha";

export interface EventoTimeline {
  id: string;
  pacienteId: string;
  fecha: string; // YYYY-MM-DD
  tipo: TipoEvento;
  titulo: string;
  detalle?: string;
  autor: string;
  /**
   * Registro al que apunta el evento (cita, atención, documento o audífono).
   * Permite consultar el detalle completo desde la línea de tiempo.
   */
  refId?: string;
}
