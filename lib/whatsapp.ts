/**
 * Genera un link de WhatsApp "click to chat" con el mensaje ya escrito.
 * Al abrirlo, WhatsApp (Web o app) abre la conversación con ese número y
 * el mensaje puesto en el cuadro de texto — la persona solo tiene que
 * revisar y darle a Enviar. Nunca se manda solo, siempre requiere que
 * alguien confirme.
 */
export function linkWhatsApp(telefono: string, mensaje: string): string {
  const soloDigitos = telefono.replace(/\D/g, "");
  const conCodigoPais =
    soloDigitos.length === 10 && soloDigitos.startsWith("0")
      ? "593" + soloDigitos.slice(1)
      : soloDigitos;
  return `https://wa.me/${conCodigoPais}?text=${encodeURIComponent(mensaje)}`;
}

/** Suma un día a una fecha YYYY-MM-DD, cruzando mes/año correctamente. */
export function diaDespues(fechaISO: string): string {
  const d = new Date(fechaISO + "T00:00:00");
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

const CLINICA = "Proaudio Ibarra";
const TELEFONO_CLINICA = "06 264 4739";
const DIRECCION_CLINICA = "Juan Genaro Jaramillo N-337 y Mariano Acosta, Ibarra";

/**
 * Plantillas de mensaje por tipo de recordatorio. Cada una arma el texto
 * ya listo, personalizado con los datos del paciente y de la cita.
 * Ajustar aquí el texto cambia el mensaje en toda la app, sin tocar cada pantalla.
 */
export function mensajeParaRecordatorio(datos: {
  tipo: string;
  nombrePaciente: string;
  motivo?: string;
  fecha?: string;
  hora?: string;
  medico?: string;
}): string {
  const { tipo, nombrePaciente, motivo, fecha, hora, medico } = datos;

  if (tipo === "Recordatorio de cita") {
    return [
      `Estimado(a) ${nombrePaciente}.`,
      "",
      `Por este medio le recordamos su cita agendada previamente en ${CLINICA}.`,
      "",
      `*Clínica:* ${CLINICA}`,
      `*Médico:* ${medico ?? "Por confirmar"}`,
      `*Teléfono:* ${TELEFONO_CLINICA}`,
      `*Dirección:* ${DIRECCION_CLINICA}`,
      `*Fecha y hora:* ${fecha ?? "próximo día agendado"}${hora ? ` a las ${hora}` : ""}`,
      "",
      "Por favor asistir puntualmente a su cita.",
    ].join("\n");
  }

  if (tipo === "Renovación de equipo" || tipo === "Recordatorio de renovación de equipo") {
    return [
      `Estimado(a) ${nombrePaciente}.`,
      "",
      `Le escribimos de ${CLINICA} para recordarle que es un buen momento para revisar o renovar su equipo auditivo.`,
      "",
      `*Clínica:* ${CLINICA}`,
      `*Teléfono:* ${TELEFONO_CLINICA}`,
      `*Dirección:* ${DIRECCION_CLINICA}`,
      "",
      "Si desea agendar una cita, responda este mensaje o contáctenos con los datos anteriores. Quedamos atentos.",
    ].join("\n");
  }

  if (tipo === "Seguimiento posterior a la atención") {
    return [
      `Estimado(a) ${nombrePaciente}.`,
      "",
      `Le escribimos de ${CLINICA} para darle seguimiento${motivo ? `: ${motivo}` : "."}`,
      "",
      `*Clínica:* ${CLINICA}`,
      `*Teléfono:* ${TELEFONO_CLINICA}`,
      "",
      "Quedamos atentos a cualquier consulta o si podemos ayudarle en algo.",
    ].join("\n");
  }

  // Plantilla genérica para cualquier otro tipo de recordatorio
  return [
    `Estimado(a) ${nombrePaciente}.`,
    "",
    `Le escribimos de ${CLINICA}${motivo ? ` sobre: ${motivo}` : "."}`,
    "",
    `*Clínica:* ${CLINICA}`,
    `*Teléfono:* ${TELEFONO_CLINICA}`,
    "",
    "Quedamos atentos a cualquier consulta.",
  ].join("\n");
}