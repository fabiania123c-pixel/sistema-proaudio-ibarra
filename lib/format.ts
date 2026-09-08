// NFD separa cada tilde en una marca combinante del rango U+0300–U+036F.
const MARCA_MIN = 0x0300;
const MARCA_MAX = 0x036f;

/** Minúsculas sin tildes, para comparar nombres escritos de formas distintas. */
export function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .split("")
    .filter((ch) => {
      const codigo = ch.charCodeAt(0);
      return codigo < MARCA_MIN || codigo > MARCA_MAX;
    })
    .join("")
    .trim();
}

const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

export function partesFecha(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

export function fechaCorta(iso?: string): string {
  if (!iso) return "—";
  const { y, m, d } = partesFecha(iso);
  return `${d} ${MESES[m - 1]} ${y}`;
}

export function fechaLarga(iso: string): string {
  const { y, m, d } = partesFecha(iso);
  const date = new Date(y, m - 1, d);
  const dia = DIAS[date.getDay()];
  return `${dia.charAt(0).toUpperCase() + dia.slice(1)}, ${d} de ${nombreMes(m)} de ${y}`;
}

export function nombreMes(m: number): string {
  const nombres = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  return nombres[m - 1];
}

export function sumarDias(iso: string, dias: number): string {
  const { y, m, d } = partesFecha(iso);
  const date = new Date(y, m - 1, d + dias);
  return toISO(date);
}

export function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Minutos desde medianoche de una hora "HH:mm". */
export function horaEnMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

/** Hora de fin de una cita, a partir de su inicio y su duración. */
export function horaFin(hora: string, duracionMin: number): string {
  const total = horaEnMinutos(hora) + duracionMin;
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function diaSemana(iso: string): number {
  const { y, m, d } = partesFecha(iso);
  return new Date(y, m - 1, d).getDay();
}

/** Lunes de la semana a la que pertenece la fecha */
export function inicioSemana(iso: string): string {
  const dw = diaSemana(iso);
  const offset = dw === 0 ? -6 : 1 - dw;
  return sumarDias(iso, offset);
}

/**
 * Día de la demostración: la fecha real en que se abre el prototipo.
 *
 * Se calcula sobre el instante absoluto desplazado a UTC−5 (Ecuador no tiene horario
 * de verano), de modo que el servidor y el navegador obtienen siempre el mismo día
 * aunque estén configurados en zonas horarias distintas.
 *
 * Si ese día cae en domingo se avanza al lunes, para que la agenda de ejemplo no
 * aparezca vacía en plena reunión.
 */
export function diaDemostracion(): { fecha: string; desplazadaDesdeDomingo: boolean } {
  const desfaseEcuador = 5 * 60 * 60 * 1000;
  const enEcuador = new Date(Date.now() - desfaseEcuador);
  const iso = enEcuador.toISOString().slice(0, 10);
  const esDomingo = diaSemana(iso) === 0;
  return { fecha: esDomingo ? sumarDias(iso, 1) : iso, desplazadaDesdeDomingo: esDomingo };
}

/** Meses completos transcurridos entre dos fechas. */
export function mesesEntre(desde: string, hasta: string): number {
  const a = partesFecha(desde);
  const b = partesFecha(hasta);
  let meses = (b.y - a.y) * 12 + (b.m - a.m);
  if (b.d < a.d) meses -= 1; // el mes en curso todavía no se ha completado
  return Math.max(0, meses);
}

/** "14 meses" · "3 años y 2 meses" — para describir antigüedades en texto. */
export function antiguedadEnTexto(desde: string, hasta: string): string {
  const meses = mesesEntre(desde, hasta);
  if (meses < 1) return "menos de un mes";
  if (meses < 24) return `${meses} ${meses === 1 ? "mes" : "meses"}`;
  const anios = Math.floor(meses / 12);
  const resto = meses % 12;
  const textoAnios = `${anios} años`;
  return resto === 0 ? textoAnios : `${textoAnios} y ${resto} ${resto === 1 ? "mes" : "meses"}`;
}

/** "ago 2026" — mes y año, para indicaciones aproximadas. */
export function mesYAnio(iso: string): string {
  const { y, m } = partesFecha(iso);
  return `${MESES[m - 1]} ${y}`;
}

export function diasEntre(desde: string, hasta: string): number {
  const a = partesFecha(desde);
  const b = partesFecha(hasta);
  const ms =
    new Date(b.y, b.m - 1, b.d).getTime() - new Date(a.y, a.m - 1, a.d).getTime();
  return Math.round(ms / 86400000);
}
