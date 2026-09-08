import { diasEntre } from "./format";
import type { Audifono } from "./types";

export type EstadoGarantia = "Vigente" | "Por vencer" | "Vencida" | "Sin registrar";

/**
 * Días de antelación con los que una garantía pasa a considerarse "por vencer".
 * ⚠ Valor provisional: las reglas reales de garantía siguen sin definirse (D-05).
 */
export const DIAS_AVISO_GARANTIA = 60;

/**
 * Estado de la garantía calculado a partir de su fecha de vencimiento.
 * Si no hay fecha registrada no se inventa ninguna: devuelve "Sin registrar".
 */
export function estadoGarantia(equipo: Audifono, hoy: string): EstadoGarantia {
  const vencimiento = equipo.garantia?.vencimiento;
  if (!vencimiento) return "Sin registrar";
  const dias = diasEntre(hoy, vencimiento);
  if (dias < 0) return "Vencida";
  if (dias <= DIAS_AVISO_GARANTIA) return "Por vencer";
  return "Vigente";
}

/** Días que faltan para el vencimiento (negativo si ya venció). */
export function diasParaVencer(equipo: Audifono, hoy: string): number | null {
  const vencimiento = equipo.garantia?.vencimiento;
  return vencimiento ? diasEntre(hoy, vencimiento) : null;
}
