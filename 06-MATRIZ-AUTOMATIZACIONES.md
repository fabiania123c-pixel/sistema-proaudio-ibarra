# Documento 6 — Matriz de automatizaciones

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (propuesta para validación)
**Fecha:** 1 de agosto de 2026

---

## Principio rector de todo este documento

**[C, principio 14]** *Las automatizaciones deberán poder ser revisadas, editadas, pospuestas o canceladas por un empleado.*

Este principio no es un detalle: **es la diferencia entre un sistema que ayuda y un sistema que envía mensajes equivocados a personas mayores en horarios inadecuados.** Ninguna automatización de este documento actúa sin que exista un responsable humano identificable que pueda intervenir.

---

## Cinco tipos de automatización — no confundirlos

El encargo pide distinguir claramente entre cinco naturalezas distintas. Es una distinción importante porque **el riesgo de cada una es muy diferente**.

| Tipo | Símbolo | Quién lo recibe | Sale de Proaudio | Riesgo si falla |
|---|---|---|---|---|
| **Mensaje al paciente** | 💬 | Paciente | **Sí** | **Alto** — el paciente recibe algo incorrecto |
| **Correo al paciente** | ✉️ | Paciente | **Sí** | **Alto** — queda registro escrito de un error |
| **Tarea para recepcionista** | 📋 | Recepción | No | Bajo — se corrige internamente |
| **Alerta para audióloga** | 🔔 | Audióloga | No | Bajo — se corrige internamente |
| **Evento de agenda** | 📅 | Sistema | No | Medio — puede desordenar la agenda |

> **Regla de secuencia propuesta:** todo lo interno (📋 🔔 📅) se implementa en **Fase 2**. Todo lo que sale hacia el paciente (💬 ✉️) espera a la **Fase 3**, y arranca con **aprobación humana obligatoria** antes de cada envío.
>
> **Fundamento:** una tarea interna mal generada la corrige la recepcionista en diez segundos. Un mensaje mal enviado a un paciente no se puede retirar.

---

## Estados comunes a todas las automatizaciones

```
   PROGRAMADA
       │
       ├──► LISTA PARA EJECUTAR
       │          │
       │          ├──► EN ESPERA DE APROBACIÓN  (solo 💬 ✉️ en F3)
       │          │            │
       │          │            ├──► APROBADA ──► EJECUTADA ──► ✔ CERRADA
       │          │            │                     │
       │          │            │                     └──► SIN RESPUESTA
       │          │            │
       │          │            └──► RECHAZADA
       │          │
       │          └──► FALLIDA ──► REINTENTO
       │
       ├──► POSPUESTA ──► (vuelve a PROGRAMADA con nueva fecha)
       │
       └──► CANCELADA (requiere motivo escrito)
```

**Todo cambio de estado registra quién lo hizo y cuándo** **[C, principio 15]**.

---

## Condiciones de detención que aplican a TODAS las automatizaciones

Una automatización **nunca se ejecuta** si se cumple alguna de estas condiciones. Esta lista es transversal y no admite excepciones.

| # | Condición de detención | Motivo |
|---|---|---|
| 1 | El paciente está marcado como **"no desea ser contactado"** | Respeto a su decisión. **Debe existir esta marca antes de la Fase 3** → D-27 |
| 2 | El paciente está marcado como **fallecido** | Evita un daño grave e irreparable a la familia → **[V]** ¿existe esta marca hoy? |
| 3 | El paciente ya fue contactado por otro motivo en las últimas **X horas** | Evita saturarlo. **[V]** El valor de X lo define Proaudio |
| 4 | Un empleado la canceló manualmente | **[C, principio 14]** |
| 5 | La condición que la originó **desapareció** (ej.: ya agendó cita) | Evita mensajes sin sentido |
| 6 | La ficha del paciente está marcada como duplicada o en fusión | Evita mensajes dobles |
| 7 | El paciente está marcado como **inactivo por decisión propia** | Respeta su salida |
| 8 | Está fuera de la ventana horaria permitida | **[V]** Franja a definir. Propuesta: 09:00–18:00, días laborables |
| 9 | El dato de contacto está vacío o marcado como erróneo | Evita fallos y falsos registros de contacto |
| 10 | El sistema está en mantenimiento o hubo un fallo de datos | Prudencia operativa |

---

# MATRIZ DE AUTOMATIZACIONES

**[C]** Los diez tipos de seguimiento fueron listados por Proaudio. Se agregan tres automatizaciones internas de apoyo, señaladas como propuestas del analista.

---

## A-01 · Recordatorio de cita al paciente 💬

| Atributo | Definición |
|---|---|
| **Nombre** | Recordatorio de cita |
| **Tipo** | 💬 Mensaje al paciente (F3) · 📋 Tarea para recepción (F2) |
| **Evento que la activa** | Existe una cita en estado *Agendada* o *Confirmada* |
| **Involucrado** | Paciente con cita próxima |
| **Regla de ejecución** | **[V]** Propuesta: 1 día antes, a las 10:00. El plazo real debe definirlo Proaudio → **D-03** |
| **Canal futuro** | F2: tarea interna de llamada · F3: WhatsApp, con correo como alternativa |
| **Plantilla** | *"Estimado/a [NOMBRE], le recordamos su cita en Proaudio el [FECHA] a las [HORA] con [PROFESIONAL] en [SUCURSAL]. Si necesita cambiarla, responda a este mensaje o llame al [TELÉFONO]."* |
| **Edición** | Contenido y fecha totalmente editables antes del envío **[C]** |
| **Responsable humano** | Recepcionista de la sucursal de la cita |
| **Estados posibles** | Programada · Lista · En espera de aprobación · Enviada · Entregada · Leída · Fallida · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + cita cancelada + paciente ya confirmó |
| **Riesgos** | Mensaje a paciente equivocado · datos incorrectos en la plantilla · paciente adulto mayor que no usa WhatsApp · saturación si además se le llama |
| **Fase** | **F2** como tarea interna · **F3** como mensaje automático |

---

## A-02 · Cita pendiente de confirmación 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Confirmar cita con el paciente |
| **Tipo** | 📋 Tarea para recepcionista |
| **Evento que la activa** | Una cita se acerca y sigue sin confirmación del paciente |
| **Involucrado** | Recepcionista responsable |
| **Regla de ejecución** | **[V]** Propuesta: 2 días hábiles antes. Definir → **D-03** |
| **Canal futuro** | Interno. La recepcionista elige cómo contactar |
| **Plantilla** | Tarea: *"Confirmar cita de [PACIENTE] · [FECHA] [HORA] · [MOTIVO] · [PROFESIONAL]"* |
| **Edición** | Sí, incluida la reasignación a otra persona |
| **Responsable humano** | Recepcionista de la sucursal |
| **Estados posibles** | Pendiente · En curso · Confirmada · No contactado · Reagendada · Cancelada · Pospuesta |
| **Condiciones de detención** | Cita ya confirmada, cancelada o reagendada |
| **Riesgos** | Volumen excesivo si se genera para todas las citas · duplicidad con A-01 |
| **Fase** | **F2** |

> **Advertencia de capacidad:** si Proaudio tiene 60 citas semanales, esta automatización genera 60 tareas semanales. **Hay que confirmar que existe capacidad real para atenderlas** antes de activarla. → *pregunta crítica de la sesión de validación.*

---

## A-03 · Audiometría anual 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Recordatorio de audiometría anual |
| **Tipo** | 📋 Tarea para recepción (F2) · 💬 Mensaje al paciente (F3) |
| **Evento que la activa** | Han transcurrido **[V] X meses** desde la última audiometría registrada |
| **Involucrado** | Paciente con audiometría vencida |
| **Regla de ejecución** | **[V]** Propuesta: aviso a los 11 meses, para agendar antes de cumplir 12. **La frecuencia real debe confirmarla Proaudio** → **D-03** |
| **Canal futuro** | F2: tarea de llamada · F3: WhatsApp o correo |
| **Plantilla** | *"Estimado/a [NOMBRE], ha pasado aproximadamente un año desde su última evaluación auditiva en Proaudio. Podemos agendar su control cuando le convenga. Llámenos al [TELÉFONO]."* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista · con visibilidad para la audióloga responsable |
| **Estados posibles** | Programada · Pendiente · Contactado · Agendó · No contesta · Rechazado · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + audiometría ya realizada + cita ya agendada + paciente inactivo por decisión propia |
| **Riesgos** | **Alto riesgo de contenido:** el mensaje no debe sugerir un diagnóstico ni una urgencia clínica que no existe **[C, principio 6]** · genera volumen alto si muchos pacientes están vencidos a la vez |
| **Fase** | **F2** interno · **F3** externo |

> **Advertencia de arranque:** al activar esta regla por primera vez, **todos** los pacientes con audiometría vencida generarán tarea el mismo día. Podrían ser cientos. **Debe activarse por lotes**, no de golpe. → *Ver Documento 7, sección de activación gradual.*

---

## A-04 · Control periódico 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Recordatorio de control periódico |
| **Tipo** | 📋 Tarea (F2) · 💬 Mensaje (F3) |
| **Evento que la activa** | Llega la fecha de la próxima acción recomendada registrada por la audióloga en la atención anterior |
| **Involucrado** | Paciente con control programado |
| **Regla de ejecución** | La fecha la define **la audióloga** al cerrar la atención. El aviso se genera **[V] X días antes** |
| **Canal futuro** | F2: tarea · F3: WhatsApp |
| **Plantilla** | *"Estimado/a [NOMBRE], según lo conversado en su última visita, corresponde su control en Proaudio. ¿Le agendamos una cita? [TELÉFONO]"* |
| **Edición** | Sí, incluida la fecha |
| **Responsable humano** | Recepcionista · audióloga que indicó el control |
| **Estados posibles** | Programada · Pendiente · Contactado · Agendó · No contesta · Rechazado · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + cita ya agendada + paciente ya atendido |
| **Riesgos** | Si la audióloga no registra la próxima acción, **la automatización nunca se genera** y el paciente se pierde silenciosamente |
| **Fase** | **F2** interno · **F3** externo |

> **Punto crítico del sistema:** esta automatización depende **enteramente** de que la audióloga registre la próxima acción al cerrar cada atención. Por eso la pantalla 9 pregunta explícitamente *"¿qué sigue?"* y avisa si se deja vacío.

---

## A-05 · Garantía próxima a vencer 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Aviso de garantía próxima a vencer |
| **Tipo** | 📋 Tarea para recepción · 🔔 Alerta en la ficha · 💬 Mensaje (F3) |
| **Evento que la activa** | Faltan **[V] X días** para la fecha de vencimiento de una garantía vigente |
| **Involucrado** | Paciente titular de la garantía |
| **Regla de ejecución** | **[V]** Propuesta: aviso a 60 y a 15 días. **Las reglas de garantía no están definidas** → **D-05** |
| **Canal futuro** | F2: tarea + alerta en ficha · F3: WhatsApp o llamada |
| **Plantilla** | *"Estimado/a [NOMBRE], le informamos que la garantía de su equipo [MARCA MODELO] vence el [FECHA]. Si desea una revisión antes de esa fecha, con gusto le agendamos. [TELÉFONO]"* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista |
| **Estados posibles** | Programada · Pendiente · Contactado · Agendó revisión · No contesta · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + garantía ya usada + equipo dado de baja + revisión ya agendada |
| **Riesgos** | **Puede percibirse como venta**, no como servicio — el tono importa mucho · si las fechas de garantía están mal cargadas, se avisa a destiempo · genera expectativa de que Proaudio hará algo antes del vencimiento |
| **Fase** | **F2** interno · **F3** externo |

> **Bloqueante:** sin la respuesta a **D-05** (duración, inicio y cobertura de las garantías), esta automatización **no puede construirse**.

---

## A-06 · Seguimiento posterior a una atención 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Seguimiento post-atención |
| **Tipo** | 📋 Tarea (F2) · 💬 Mensaje (F3) |
| **Evento que la activa** | Han pasado **[V] X días** desde una atención de cierto tipo (adaptación, entrega, cambio de equipo) |
| **Involucrado** | Paciente recientemente atendido |
| **Regla de ejecución** | **[V]** Propuesta: 7 días después de una adaptación o entrega. **Los tipos de atención que lo ameritan debe definirlos Proaudio** → **D-23** |
| **Canal futuro** | F2: tarea de llamada · F3: WhatsApp |
| **Plantilla** | *"Estimado/a [NOMBRE], queríamos saber cómo le ha ido con su equipo desde su visita del [FECHA]. Si tiene alguna dificultad, estamos para ayudarle. [TELÉFONO]"* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista · o la audióloga que atendió, según el caso |
| **Estados posibles** | Programada · Pendiente · Contactado · Reporta problema · Sin novedad · No contesta · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + el paciente ya volvió + ya hay cita agendada |
| **Riesgos** | Si el paciente reporta un problema y **nadie da continuidad**, el efecto es peor que no haber preguntado. **Requiere que exista un flujo claro para el resultado "reporta problema"** |
| **Fase** | **F2** interno · **F3** externo |

---

## A-07 · Reparación terminada 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Aviso de reparación terminada |
| **Tipo** | 📋 Tarea para recepción · 💬 Mensaje (F3) |
| **Evento que la activa** | Una reparación cambia a estado *Lista para entregar* |
| **Involucrado** | Paciente cuyo equipo está listo |
| **Regla de ejecución** | Inmediata, dentro de la ventana horaria permitida |
| **Canal futuro** | F2: tarea de llamada · F3: WhatsApp |
| **Plantilla** | *"Estimado/a [NOMBRE], su equipo ya está listo para ser retirado en Proaudio [SUCURSAL]. Horario de atención: [HORARIO]."* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista de la sucursal |
| **Estados posibles** | Pendiente · Contactado · Retirado · No contesta · Reintento · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + equipo ya retirado |
| **Riesgos** | Avisar antes de que esté realmente listo genera un viaje inútil y molestia · **el proceso de reparación no está descrito**, por lo que el disparador exacto está por definir |
| **Fase** | **F5** (requiere el módulo de reparaciones). Hasta entonces, tarea manual |

---

## A-08 · Paciente que dejó de asistir 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Detección de paciente inactivo |
| **Tipo** | 📋 Tarea para recepcionista — **interna, nunca automática hacia el paciente** |
| **Evento que la activa** | Han pasado **[V] X meses** sin ninguna atención registrada |
| **Involucrado** | Paciente sin actividad |
| **Regla de ejecución** | **[V]** Propuesta: 12 meses. **El umbral debe definirlo Proaudio** → **D-08** |
| **Canal futuro** | **Solo llamada humana.** No se propone mensaje automático |
| **Plantilla** | Tarea: *"[PACIENTE] no registra visita desde [FECHA] ([N] meses). Última indicación: [TEXTO]. Contactar para conocer su situación."* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista · con visibilidad de la audióloga responsable |
| **Estados posibles** | Pendiente · Contactado · Volverá · No desea continuar · No contesta · Datos incorrectos · Falleció · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + ya tiene cita agendada + ya fue contactado por esta causa en los últimos **[V] X meses** |
| **Riesgos** | **El riesgo más alto de todo el documento.** Un mensaje automático a alguien que no viene hace dos años puede resultar invasivo, o llegar a una familia en duelo. Por eso se propone **exclusivamente llamada humana**. También: volumen inicial enorme al activarla por primera vez |
| **Fase** | **F2** |

> **Esta es la automatización que más directamente ataca el objetivo del proyecto** (reducir la pérdida de pacientes). Por eso mismo merece el mayor cuidado.
>
> **Regla de activación obligatoria:** al encenderla por primera vez, **no procesar todo el historial de golpe.** Empezar con los pacientes inactivos del último año, en lotes semanales manejables. → *Documento 7.*

---

## A-09 · Llamada humana pendiente 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Llamada humana pendiente |
| **Tipo** | 📋 Tarea para recepcionista |
| **Evento que la activa** | Un empleado la crea manualmente, o una regla determina que se requiere contacto personal en lugar de mensaje |
| **Involucrado** | Cualquier paciente |
| **Regla de ejecución** | La fecha la define quien la crea |
| **Canal futuro** | Llamada telefónica |
| **Plantilla** | Libre. Quien la crea escribe el motivo |
| **Edición** | Total |
| **Responsable humano** | El asignado al crearla |
| **Estados posibles** | Pendiente · En curso · Realizada · No contesta · Reintento · Pospuesta · Cancelada |
| **Condiciones de detención** | Las 10 generales + el motivo dejó de existir |
| **Riesgos** | Bajo. Es la automatización más simple |
| **Fase** | **F2** |

> **Función importante:** esta es la "válvula de escape" del sistema. Cuando una situación no encaja en ninguna regla automática, un empleado crea una llamada pendiente. **Sin esto, el equipo volvería a los papelitos.**

---

## A-10 · Mensaje de bienvenida a paciente nuevo 💬 📋

| Atributo | Definición |
|---|---|
| **Nombre** | Bienvenida a paciente nuevo |
| **Tipo** | 📋 Tarea (F2) · 💬 Mensaje (F3) |
| **Evento que la activa** | Se completa la **primera atención** de un paciente |
| **Involucrado** | Paciente nuevo |
| **Regla de ejecución** | **[V]** Propuesta: 1 a 2 días después de la primera atención → **D-03** |
| **Canal futuro** | F2: tarea · F3: WhatsApp o correo |
| **Plantilla** | *"Estimado/a [NOMBRE], gracias por confiar en Proaudio. Cualquier consulta sobre su tratamiento o su equipo, estamos a su disposición en el [TELÉFONO]. Su audióloga es [PROFESIONAL]."* |
| **Edición** | Sí |
| **Responsable humano** | Recepcionista |
| **Estados posibles** | Programada · Pendiente · Enviada · Entregada · Fallida · Cancelada |
| **Condiciones de detención** | Las 10 generales + el paciente ya recibió bienvenida |
| **Riesgos** | Bajo, si el tono es correcto. **Evitar que suene comercial** · debe dispararse tras la **atención**, no tras el registro, para no saludar a alguien que nunca llegó |
| **Fase** | **F2** interno · **F3** externo |

---

## Automatizaciones internas adicionales — **propuestas del analista, no solicitadas**

Las tres siguientes **no fueron pedidas por Proaudio**. Se proponen porque protegen la calidad del sistema. Deben validarse.

---

### A-11 · Cita no atendida → generar seguimiento 📋 *(propuesta)*

| Atributo | Definición |
|---|---|
| **Evento que la activa** | Una cita se marca como *No atendida* |
| **Regla de ejecución** | Al día siguiente hábil |
| **Canal** | Tarea interna de llamada |
| **Plantilla** | *"[PACIENTE] no asistió a su cita del [FECHA] ([MOTIVO]). Contactar para reagendar."* |
| **Responsable** | Recepcionista |
| **Riesgos** | Que el paciente se sienta reprendido. **El tono de la llamada importa más que el sistema** |
| **Fase** | **F2** |

> **Fundamento:** una inasistencia sin seguimiento es el primer paso del abandono. Esta regla convierte cada no-show en una oportunidad de recuperación.

---

### A-12 · Ficha sin digitalizar tras la visita 📋 *(propuesta)*

| Atributo | Definición |
|---|---|
| **Evento que la activa** | Un paciente fue atendido y su ficha sigue por debajo del **[V] X%** digitalizado |
| **Regla de ejecución** | El mismo día de la atención |
| **Canal** | Tarea interna |
| **Plantilla** | *"[PACIENTE] estuvo hoy en consulta. Su ficha está al [N]% digitalizada. Aprovechar para escanear los documentos faltantes."* |
| **Responsable** | Recepcionista |
| **Riesgos** | Genera carga adicional; podría desactivarse en días de mucha demanda |
| **Fase** | **F4** (o F2 en modo suave) |

> **Fundamento:** es el motor de la estrategia de digitalización oportunista del Documento 7. Cada visita mejora una ficha.

---

### A-13 · Recordatorio pospuesto en exceso 🔔 *(propuesta)*

| Atributo | Definición |
|---|---|
| **Evento que la activa** | Un recordatorio se pospone más de **[V] X veces** (propuesta: 3) |
| **Regla de ejecución** | Inmediata |
| **Canal** | Alerta interna al administrador |
| **Plantilla** | *"El seguimiento de [PACIENTE] se ha pospuesto [N] veces. ¿Requiere otra estrategia o debe cerrarse?"* |
| **Responsable** | Administrador |
| **Riesgos** | Puede percibirse como control sobre el trabajo del equipo. **Debe presentarse como ayuda, no como vigilancia** (riesgo R-02) |
| **Fase** | **F2** |

---

# CUADRO RESUMEN

| ID | Automatización | Tipo | Fase interna | Fase externa | Bloqueada por |
|---|---|---|---|---|---|
| A-01 | Recordatorio de cita | 💬 📋 | F2 | F3 | D-03 |
| A-02 | Cita pendiente de confirmación | 📋 | F2 | — | D-03 |
| A-03 | Audiometría anual | 💬 📋 | F2 | F3 | **D-03** |
| A-04 | Control periódico | 💬 📋 | F2 | F3 | **D-03** |
| A-05 | Garantía próxima a vencer | 💬 📋 🔔 | F2 | F3 | **D-05** |
| A-06 | Seguimiento post-atención | 💬 📋 | F2 | F3 | D-23 |
| A-07 | Reparación terminada | 💬 📋 | F5 | F5 | Proceso de taller |
| A-08 | Paciente que dejó de asistir | 📋 | F2 | **nunca automático** | **D-08** |
| A-09 | Llamada humana pendiente | 📋 | F2 | — | — |
| A-10 | Bienvenida a paciente nuevo | 💬 📋 | F2 | F3 | D-03 |
| A-11 | Cita no atendida *(propuesta)* | 📋 | F2 | — | — |
| A-12 | Ficha sin digitalizar *(propuesta)* | 📋 | F4 | — | D-22 |
| A-13 | Recordatorio muy pospuesto *(propuesta)* | 🔔 | F2 | — | — |

---

# ESTIMACIÓN DE CARGA — la pregunta que puede hundir el proyecto

Antes de activar cualquier automatización hay que responder:

> **¿Cuántas tareas diarias generará y cuántas puede atender realmente el equipo?**

### Ejemplo ilustrativo con cifras ficticias

Supongamos, **solo como ejercicio**, 1.200 pacientes activos y 60 citas semanales:

| Automatización | Tareas semanales estimadas |
|---|---|
| A-01 Recordatorio de cita | ~60 |
| A-02 Confirmación de cita | ~60 |
| A-03 Audiometría anual | ~23 (1.200 ÷ 52) |
| A-04 Control periódico | ~40 |
| A-05 Garantía por vencer | ~10 |
| A-06 Seguimiento post-atención | ~15 |
| A-08 Paciente inactivo | ~10 en régimen estable |
| A-10 Bienvenida | ~5 |
| A-11 No-show | ~8 |
| **Total aproximado** | **~230 tareas semanales · ~46 diarias** |

**Si una recepcionista puede atender 20 contactos al día además de su trabajo habitual, el sistema generaría más del doble de lo que se puede atender.**

### Tres formas de resolverlo

| Opción | Descripción |
|---|---|
| **Priorizar** | Activar solo las automatizaciones de mayor impacto al inicio |
| **Automatizar el envío** | Pasar a Fase 3 los recordatorios simples (A-01, A-10) para liberar tiempo humano |
| **Ajustar frecuencias** | Alargar los plazos de las reglas para reducir volumen |

> **Todas las cifras anteriores son ficticias.** Las reales dependen de datos que Proaudio aún no ha entregado. **Esta estimación debe rehacerse con datos verdaderos antes de activar nada.** → *Pregunta P-GER-02.*

---

# RECOMENDACIÓN DE ACTIVACIÓN GRADUAL

| Momento | Automatizaciones a activar | Justificación |
|---|---|---|
| **Semana 1 de F2** | A-09 (llamada manual) | Sin riesgo. Reemplaza los papelitos |
| **Semana 3 de F2** | A-01, A-02 (internas) | Volumen previsible y controlado |
| **Semana 5 de F2** | A-11, A-04 | Empieza el efecto sobre la retención |
| **Semana 8 de F2** | A-05, A-10, A-06 | Requieren datos ya cargados |
| **Semana 12 de F2** | A-03, A-08 **por lotes** | Alto volumen inicial. **Nunca de golpe** |
| **Fase 3** | Envío externo de A-01 y A-10 primero | Los mensajes más simples y de menor riesgo |
| **Fase 3 avanzada** | A-03, A-04, A-05 externos | Requieren plantillas ya probadas internamente |
| **Nunca automático** | A-08 hacia el paciente | Siempre contacto humano |

---

# REGLAS DE SEGURIDAD PARA LA FASE 3

Cuando llegue el momento de enviar mensajes reales, se proponen estas siete reglas. **Todas deben validarse con Proaudio.**

1. **Aprobación humana obligatoria** durante al menos las primeras 4 semanas. Nada sale sin que alguien lo revise.
2. **Prueba en frío:** los primeros envíos van a números del propio equipo, no a pacientes.
3. **Límite diario de envíos**, para que un error no afecte a cientos de personas.
4. **Ventana horaria estricta**, sin envíos de noche, domingos ni feriados.
5. **Lista de exclusión** siempre respetada y fácil de actualizar por cualquier empleado.
6. **Botón de parada general** que detiene todos los envíos de inmediato.
7. **Revisión semanal** de qué se envió, a quién y con qué resultado.

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Los diez tipos de seguimiento (A-01 a A-10) | **Confirmado** — listados por Proaudio |
| La distinción entre mensaje, correo, tarea, alerta y evento | **Confirmado** — solicitada por Proaudio |
| Que las automatizaciones se revisan, editan, posponen y cancelan | **Confirmado** — principio 14 |
| Que debe registrarse el estado de cada recordatorio | **Confirmado** |
| Que WhatsApp y correo son canales futuros | **Confirmado** |
| **Todas las reglas de tiempo (días, meses, umbrales)** | **Propuestas provisionales — pendientes de definición** |
| **Todos los textos de plantilla** | **Propuestas del analista — deben aprobarse por Proaudio** |
| Las automatizaciones A-11, A-12 y A-13 | **Propuestas no solicitadas — requieren aprobación** |
| Las condiciones de detención | **Propuestas del analista** |
| La estimación de carga | **Ejercicio con cifras ficticias — sin valor real** |
| El calendario de activación gradual | **Propuesta del analista** |
