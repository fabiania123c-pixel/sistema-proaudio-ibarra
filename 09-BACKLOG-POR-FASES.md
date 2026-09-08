# Documento 9 — Backlog inicial por fases

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (propuesta para validación)
**Fecha:** 1 de agosto de 2026

---

## Cómo leer este backlog

Cada funcionalidad se describe con seis atributos:

| Atributo | Qué significa |
|---|---|
| **Descripción** | Qué hace, en lenguaje claro |
| **Usuario beneficiado** | Quién gana con esto |
| **Prioridad** | 🔴 Imprescindible · 🟠 Importante · 🟡 Deseable · ⚪ Opcional |
| **Dependencias** | Qué debe existir antes |
| **Riesgos** | Qué puede salir mal |
| **Criterio de aceptación** | Cómo se sabrá que está bien hecho |

### Reglas del backlog

1. **Ninguna funcionalidad sube de fase sin decisión explícita.** El riesgo R-03 (sobrealcance) es real.
2. **Toda funcionalidad bloqueada por una decisión pendiente lo indica.** No se construye sobre supuestos.
3. **Las prioridades son propuestas del analista.** Proaudio decide.
4. **Los criterios de aceptación son preliminares.** Se afinan al iniciar cada fase.

### Advertencia sobre plazos

**Este documento no contiene estimaciones de tiempo.** No se puede estimar sin conocer volúmenes, equipo disponible ni plataforma. Estimar ahora sería inventar.

---

# Resumen de fases

| Fase | Nombre | Objetivo | Entregable | Estado |
|---|---|---|---|---|
| **F0** | Levantamiento | Entender la operación real y cerrar decisiones críticas | Documentos validados | **En curso** |
| **F1** | Prototipo visual | Validar pantallas y flujos con las usuarias | 10 pantallas navegables con datos ficticios | No iniciada |
| **F2** | MVP interno | Que el equipo trabaje sobre el sistema | Sistema operativo con agenda, fichas y seguimiento interno | No iniciada |
| **F3** | Comunicaciones | Automatizar el contacto con pacientes | Envío por WhatsApp y correo, con control humano | No iniciada |
| **F4** | Digitalización histórica | Incorporar el archivo físico progresivamente | Fichas digitalizadas por olas | No iniciada |
| **F5** | Reparaciones, garantías e inventario | Completar la operación técnica | Módulo de taller y stock | No iniciada |
| **F6** | KPIs y analítica | Dar visibilidad gerencial | Indicadores y tableros | No iniciada |

**Regla de avance:** no se inicia una fase sin haber cerrado los criterios de salida de la anterior.

---

# FASE 0 — LEVANTAMIENTO

**Objetivo:** convertir inferencias en hechos y cerrar las decisiones que bloquean el diseño.

**Nada de esta fase requiere programar.**

---

### F0-01 · Validar los documentos de análisis con Proaudio

| | |
|---|---|
| **Descripción** | Revisar los documentos 1 a 8 con gerencia y con el equipo, corrigiendo toda inferencia equivocada |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | Ninguna |
| **Riesgos** | Que se validen "por cortesía" sin lectura real; que se confirmen inferencias sin verificarlas |
| **Criterio de aceptación** | Cada marcador **[I]** del Documento 2 queda confirmado, corregido o descartado, por escrito |

---

### F0-02 · Sesiones de entrevista por rol

| | |
|---|---|
| **Descripción** | Cuatro sesiones (gerencia, recepción, audiólogas, administrativo) siguiendo el Documento 8 |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | F0-01 |
| **Riesgos** | Que el equipo perciba las entrevistas como evaluación de su trabajo (riesgo R-02); que solo hable la gerencia |
| **Criterio de aceptación** | Las 53 preguntas críticas 🔴 tienen respuesta registrada |

---

### F0-03 · Observación en sitio

| | |
|---|---|
| **Descripción** | Media jornada observando la operación real: agendamiento, atención, archivo. Sin intervenir |
| **Usuario beneficiado** | Diseño del sistema |
| **Prioridad** | 🔴 |
| **Dependencias** | Autorización de gerencia y de pacientes cuando corresponda |
| **Riesgos** | Alterar el comportamiento del equipo por estar observado; acceso involuntario a datos de pacientes |
| **Criterio de aceptación** | Están cronometradas las tres tareas clave (crear paciente, agendar cita, localizar ficha) y descrito el proceso real |

---

### F0-04 · Inventario del archivo físico

| | |
|---|---|
| **Descripción** | Recorrer el archivo, contar fichas aproximadamente, describir su organización y estado |
| **Usuario beneficiado** | Estrategia de digitalización |
| **Prioridad** | 🔴 |
| **Dependencias** | F0-03 |
| **Riesgos** | Descubrir un volumen mucho mayor al previsto; manipular documentos frágiles |
| **Criterio de aceptación** | Se conoce el número aproximado de fichas, su organización, ubicación y estado de conservación |

---

### F0-05 · Cerrar las decisiones bloqueantes

| | |
|---|---|
| **Descripción** | Obtener respuesta formal a las diez decisiones más urgentes del Documento 10 |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | F0-02, F0-03, F0-04 |
| **Riesgos** | Que se posterguen indefinidamente; que nadie tenga autoridad para decidir |
| **Criterio de aceptación** | D-01 a D-05, D-08, D-10, D-11 resueltas y documentadas |

---

### F0-06 · Definir el responsable del proyecto en Proaudio

| | |
|---|---|
| **Descripción** | Designar formalmente a una persona con autoridad para decidir y disponibilidad para participar |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | Ninguna |
| **Riesgos** | Sin esta figura, cada decisión se demora semanas (riesgo R-11) |
| **Criterio de aceptación** | Hay una persona designada, con nombre y tiempo asignado |

---

### F0-07 · Revisar formatos y documentos existentes

| | |
|---|---|
| **Descripción** | Recopilar (sin datos de pacientes) los formatos actuales: ficha, garantía, audiometría, orden de reparación |
| **Usuario beneficiado** | Diccionario de datos |
| **Prioridad** | 🟠 |
| **Dependencias** | F0-03 |
| **Riesgos** | Exposición accidental de datos reales |
| **Criterio de aceptación** | Existe una copia en blanco o anonimizada de cada formato en uso |

---

### F0-08 · Revisar la estructura actual de Google Calendar

| | |
|---|---|
| **Descripción** | Ver cuántos calendarios hay, cómo se nombran los eventos y qué información contienen |
| **Usuario beneficiado** | Diseño de la agenda |
| **Prioridad** | 🟠 |
| **Dependencias** | F0-03 |
| **Riesgos** | Ninguno relevante |
| **Criterio de aceptación** | Está documentada la estructura real y se puede decidir D-06 |

---

### Criterio de salida de la Fase 0

- [ ] Las 53 preguntas críticas tienen respuesta.
- [ ] Las decisiones D-01 a D-05, D-08, D-10 y D-11 están cerradas.
- [ ] Hay un responsable designado en Proaudio.
- [ ] El proceso actual está descrito con hechos, no inferencias.
- [ ] Se conoce el tamaño del archivo físico.

---

# FASE 1 — PROTOTIPO VISUAL

**Objetivo:** validar pantallas y flujos antes de construir nada funcional.

**No guarda datos. No se conecta a nada. Datos ficticios.**

---

### F1-01 · Pantalla de inicio / panel del día

| | |
|---|---|
| **Descripción** | Panel con citas del día, pendientes, contadores y alertas |
| **Usuario beneficiado** | Recepcionista, audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | F0-05 |
| **Riesgos** | Mostrar información que en la práctica no sirve |
| **Criterio de aceptación** | Una recepcionista dice qué hará hoy con solo mirar la pantalla |

---

### F1-02 · Agenda con vistas día, semana y mes

| | |
|---|---|
| **Descripción** | Agenda navegable por profesional y sucursal, con estados de cita visibles |
| **Usuario beneficiado** | Recepcionista, audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | D-02 (motivos de cita) |
| **Riesgos** | Que no refleje cómo trabajan realmente |
| **Criterio de aceptación** | Las usuarias reconocen su forma de trabajo en la agenda y encuentran una cita sin ayuda |

---

### F1-03 · Centro de recordatorios

| | |
|---|---|
| **Descripción** | Lista de seguimientos de hoy, atrasados y próximos, con acciones de posponer, editar y cancelar |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | D-03, D-08 |
| **Riesgos** | Generar percepción de carga inmanejable |
| **Criterio de aceptación** | La recepcionista identifica a quién llamar primero y por qué, sin explicación previa |

---

### F1-04 · Lista de pacientes con buscador

| | |
|---|---|
| **Descripción** | Listado con búsqueda y filtros, más aviso visual de posibles duplicados |
| **Usuario beneficiado** | Todos |
| **Prioridad** | 🔴 |
| **Dependencias** | D-01 |
| **Riesgos** | Diseñar la búsqueda sobre un identificador equivocado |
| **Criterio de aceptación** | La usuaria encuentra un paciente en menos de 10 segundos usando el dato que usa habitualmente |

---

### F1-05 · Ficha resumida del paciente

| | |
|---|---|
| **Descripción** | Pantalla central con contexto clínico, equipos, garantías, citas y estado de digitalización |
| **Usuario beneficiado** | Audióloga (principal), recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F0-05 |
| **Riesgos** | Saturar la pantalla o dejar fuera lo esencial |
| **Criterio de aceptación** | La audióloga responde *"¿qué necesita saber antes de atender?"* señalando la pantalla, sin buscar en otro lado |

---

### F1-06 · Línea de tiempo del paciente

| | |
|---|---|
| **Descripción** | Historial cronológico completo, con autor y fecha de cada evento |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | F1-05 |
| **Riesgos** | Exceso de información difícil de leer |
| **Criterio de aceptación** | La audióloga encuentra qué se hizo en una visita anterior en menos de 15 segundos |

---

### F1-07 · Formulario de paciente nuevo

| | |
|---|---|
| **Descripción** | Alta de paciente con tres campos obligatorios y el resto opcional plegado |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | D-01 |
| **Riesgos** | Pedir demasiado y que no se use (riesgo R-13) |
| **Criterio de aceptación** | Un paciente se registra en menos de un minuto y las usuarias confirman que el mínimo es suficiente |

---

### F1-08 · Formulario de cita

| | |
|---|---|
| **Descripción** | Crear, reagendar y cancelar cita, siempre vinculada a un paciente |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | D-02, D-07 |
| **Riesgos** | Lista de motivos equivocada |
| **Criterio de aceptación** | Se agenda una cita completa en menos de un minuto y el motivo se elige de una lista reconocida por el equipo |

---

### F1-09 · Registro de atención

| | |
|---|---|
| **Descripción** | Formulario de atención con observación acumulativa, indicación y próxima acción |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | D-23 |
| **Riesgos** | **El mayor riesgo de adopción del proyecto.** Si es lento, no se usará |
| **Criterio de aceptación** | La audióloga registra una atención típica en menos de dos minutos y confirma que no perdería información respecto al papel |

---

### F1-10 · Carga de documento

| | |
|---|---|
| **Descripción** | Subir imagen o PDF, clasificarlo y ver el avance de digitalización |
| **Usuario beneficiado** | Recepcionista, audióloga |
| **Prioridad** | 🟠 |
| **Dependencias** | D-22 |
| **Riesgos** | Mostrar un porcentaje que no puede calcularse |
| **Criterio de aceptación** | Las usuarias entienden qué falta por digitalizar de esa ficha |

---

### F1-11 · Sesiones de validación del prototipo

| | |
|---|---|
| **Descripción** | Sesiones separadas con audiólogas y recepcionistas, donde ellas manejan el prototipo |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | F1-01 a F1-10 |
| **Riesgos** | Que se limiten a decir "está bien" por cortesía |
| **Criterio de aceptación** | Hay una lista escrita de cambios solicitados, con al menos un cambio relevante por pantalla crítica |

---

### Criterio de salida de la Fase 1

- [ ] Las 10 pantallas fueron probadas por al menos una audióloga y una recepcionista.
- [ ] Los cambios solicitados están documentados y priorizados.
- [ ] Las tres tareas de prueba se completaron sin ayuda.
- [ ] El equipo expresa que el sistema le ayudaría (no que le complicaría).

> **Si el equipo no ve valor en el prototipo, no se avanza a la Fase 2.** Se rediseña.

---

# FASE 2 — MVP INTERNO

**Objetivo:** que Proaudio trabaje realmente sobre el sistema.

**Nada sale hacia el paciente todavía.**

---

### F2-01 · Gestión de usuarios y roles

| | |
|---|---|
| **Descripción** | Alta de usuarios con rol asignado y acceso individual |
| **Usuario beneficiado** | Administrador |
| **Prioridad** | 🔴 |
| **Dependencias** | D-12, D-13 |
| **Riesgos** | Cuentas compartidas que rompen la trazabilidad |
| **Criterio de aceptación** | Cada persona entra con su propio usuario y ve solo lo que su rol permite |

---

### F2-02 · Configuración de catálogos

| | |
|---|---|
| **Descripción** | Sucursales, motivos de cita, tipos de atención, tipos de documento, categorías de paciente |
| **Usuario beneficiado** | Administrador |
| **Prioridad** | 🔴 |
| **Dependencias** | D-02, D-04, D-10, D-23 |
| **Riesgos** | Catálogos inventados que nadie usa |
| **Criterio de aceptación** | Todos los catálogos reflejan el vocabulario real del equipo y son editables sin ayuda técnica |

---

### F2-03 · Registro y gestión de pacientes

| | |
|---|---|
| **Descripción** | Crear, buscar y editar fichas, con detección de posibles duplicados |
| **Usuario beneficiado** | Recepcionista, audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | D-01, F2-01 |
| **Riesgos** | Duplicados masivos (riesgo R-05) |
| **Criterio de aceptación** | Se crea un paciente en menos de un minuto y el sistema avisa ante nombres o teléfonos similares |

---

### F2-04 · Agenda operativa

| | |
|---|---|
| **Descripción** | Crear, reagendar, cancelar y registrar inasistencias, con todos los estados de cita |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-02, F2-03, D-07 |
| **Riesgos** | Convivencia con Google Calendar (riesgo R-07) |
| **Criterio de aceptación** | Una semana completa de citas se gestiona íntegramente en el sistema, sin recurrir al calendario anterior |

---

### F2-05 · Vínculo cita ↔ ficha

| | |
|---|---|
| **Descripción** | Abrir la ficha desde la cita y ver el historial de citas desde la ficha |
| **Usuario beneficiado** | Audióloga, recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-03, F2-04 |
| **Riesgos** | Ninguno relevante |
| **Criterio de aceptación** | Desde cualquier cita se llega a la ficha en un clic |

---

### F2-06 · Registro de atención con historial acumulativo

| | |
|---|---|
| **Descripción** | Registro de atención donde ninguna observación anterior se sobrescribe |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-04, D-20, D-23 |
| **Riesgos** | Lentitud que genere rechazo (riesgo R-02) |
| **Criterio de aceptación** | Se registra una atención en menos de dos minutos y ninguna observación previa se pierde |

---

### F2-07 · Línea de tiempo del paciente

| | |
|---|---|
| **Descripción** | Historial completo de todo lo ocurrido, con autor y fecha |
| **Usuario beneficiado** | Audióloga, recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-06 |
| **Riesgos** | Ninguno relevante |
| **Criterio de aceptación** | Todo evento del paciente aparece en orden cronológico, sin pérdidas |

---

### F2-08 · Trazabilidad completa

| | |
|---|---|
| **Descripción** | Registro de quién creó o modificó cada dato y cuándo |
| **Usuario beneficiado** | Administrador, gerencia |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-01, D-14 |
| **Riesgos** | Percepción de vigilancia (riesgo R-02) |
| **Criterio de aceptación** | Cualquier cambio puede rastrearse hasta su autor y fecha |

---

### F2-09 · Recordatorios y tareas internas

| | |
|---|---|
| **Descripción** | Centro de recordatorios con creación manual y automática, editables y posponibles |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-04, D-03, D-08 |
| **Riesgos** | Volumen inmanejable de tareas |
| **Criterio de aceptación** | La recepcionista trabaja su día desde esta pantalla y el volumen diario es abordable |

---

### F2-10 · Registro de comunicaciones

| | |
|---|---|
| **Descripción** | Registrar manualmente llamadas, mensajes y contactos con su resultado |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-03, D-26 |
| **Riesgos** | Que se olvide registrar y el historial quede incompleto |
| **Criterio de aceptación** | Todo contacto con un paciente queda visible en su línea de tiempo |

---

### F2-11 · Registro de audífonos

| | |
|---|---|
| **Descripción** | Marca, modelo, oído, número de serie, fecha de entrega y estado |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-06, D-24 |
| **Riesgos** | Estructura equivocada si no se resuelve el registro por oído (P-AUD-03) |
| **Criterio de aceptación** | Se consulta el equipo actual de cualquier paciente desde su ficha |

---

### F2-12 · Registro de garantías con alerta de vencimiento

| | |
|---|---|
| **Descripción** | Garantías con fecha de vencimiento calculada y aviso anticipado |
| **Usuario beneficiado** | Recepcionista, audióloga, paciente |
| **Prioridad** | 🔴 |
| **Dependencias** | **D-05 (bloqueante)**, F2-11 |
| **Riesgos** | Avisos a destiempo si las reglas están mal definidas |
| **Criterio de aceptación** | Toda garantía vigente muestra su estado y genera aviso en el plazo definido |

---

### F2-13 · Registro de audiometrías como documento

| | |
|---|---|
| **Descripción** | Adjuntar el resultado y registrar fecha, profesional y observación |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🟠 |
| **Dependencias** | F2-14, D-25 |
| **Riesgos** | Que se espere estructura numérica que no está en el alcance |
| **Criterio de aceptación** | Se consultan las audiometrías anteriores de un paciente desde su ficha |

---

### F2-14 · Carga de documentos

| | |
|---|---|
| **Descripción** | Subir imágenes y PDF, clasificarlos y consultarlos |
| **Usuario beneficiado** | Todos |
| **Prioridad** | 🔴 |
| **Dependencias** | D-11 |
| **Riesgos** | Almacenamiento de datos sensibles sin política definida (riesgo R-06) |
| **Criterio de aceptación** | Se sube un documento desde el teléfono en menos de un minuto y queda asociado al paciente correcto |

---

### F2-15 · Estado de digitalización y ubicación física

| | |
|---|---|
| **Descripción** | Indicador de avance y registro de dónde está la ficha física, con control de préstamo |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🟠 |
| **Dependencias** | D-22, F2-14 |
| **Riesgos** | Porcentaje sin base de cálculo |
| **Criterio de aceptación** | Se sabe dónde está cualquier ficha física y qué falta por digitalizar |

---

### F2-16 · Detección de pacientes inactivos

| | |
|---|---|
| **Descripción** | Generación automática de tareas para pacientes sin visita en el plazo definido |
| **Usuario beneficiado** | Recepcionista, gerencia |
| **Prioridad** | 🔴 |
| **Dependencias** | **D-08 (bloqueante)**, F2-09 |
| **Riesgos** | Volumen masivo al activarse por primera vez |
| **Criterio de aceptación** | Se activa por lotes y el volumen diario es atendible por el equipo |

---

### F2-17 · Vista sincronizada con Google Calendar

| | |
|---|---|
| **Descripción** | Reflejo de las citas en Google Calendar como vista temporal de solo lectura |
| **Usuario beneficiado** | Equipo en transición |
| **Prioridad** | 🟡 |
| **Dependencias** | **D-06**, F2-04 |
| **Riesgos** | Desincronización y dos versiones de la verdad (riesgo R-07) |
| **Criterio de aceptación** | El sistema es la única fuente de verdad; Google Calendar solo refleja |

> **[C]** Google Calendar podrá mantenerse temporalmente como vista sincronizada, pero no será la base central del sistema.

---

### F2-18 · Capacitación y puesta en marcha

| | |
|---|---|
| **Descripción** | Formación del equipo y arranque por partes, con el papel como respaldo |
| **Usuario beneficiado** | Todo el equipo |
| **Prioridad** | 🔴 |
| **Dependencias** | F2-01 a F2-16 |
| **Riesgos** | Interrupción del servicio (riesgo R-14); doble digitación indefinida (riesgo R-01) |
| **Criterio de aceptación** | El equipo opera una semana completa en el sistema y se define qué deja de escribirse en papel |

---

### Criterio de salida de la Fase 2

- [ ] Toda cita nueva se crea en el sistema, no en Google Calendar.
- [ ] Toda atención queda registrada con observación y próxima acción.
- [ ] La recepcionista trabaja desde el Centro de Recordatorios.
- [ ] Ninguna información se ha perdido.
- [ ] El equipo prefiere el sistema al método anterior.

---

# FASE 3 — COMUNICACIONES

**Objetivo:** que el sistema contacte al paciente, con control humano.

**Nada de esta fase se activa sin las reglas de seguridad del Documento 6.**

---

### F3-01 · Marca de "no contactar" y lista de exclusión

| | |
|---|---|
| **Descripción** | Posibilidad de marcar que un paciente no desea ser contactado, respetada por todas las automatizaciones |
| **Usuario beneficiado** | Paciente, equipo |
| **Prioridad** | 🔴 |
| **Dependencias** | D-27 |
| **Riesgos** | Contactar a quien pidió no serlo |
| **Criterio de aceptación** | **Ninguna automatización puede ejecutarse sobre un paciente excluido.** Se verifica antes de cualquier envío |

> **Esta funcionalidad debe existir ANTES que cualquier envío. No es negociable.**

---

### F3-02 · Plantillas de mensaje editables

| | |
|---|---|
| **Descripción** | Textos configurables por tipo de recordatorio, aprobados por Proaudio |
| **Usuario beneficiado** | Administrador |
| **Prioridad** | 🔴 |
| **Dependencias** | P-MSG-05, P-MSG-06 |
| **Riesgos** | Tono inadecuado; sugerir diagnósticos (viola el principio 6) |
| **Criterio de aceptación** | Cada plantilla fue leída y aprobada por Proaudio antes de su uso |

---

### F3-03 · Aprobación humana previa al envío

| | |
|---|---|
| **Descripción** | Cola de mensajes pendientes de revisión antes de salir |
| **Usuario beneficiado** | Recepcionista, paciente |
| **Prioridad** | 🔴 |
| **Dependencias** | F3-02 |
| **Riesgos** | Que se apruebe en bloque sin leer |
| **Criterio de aceptación** | Ningún mensaje sale sin aprobación durante las primeras 4 semanas |

---

### F3-04 · Envío por WhatsApp

| | |
|---|---|
| **Descripción** | Envío de recordatorios por WhatsApp con registro de estado |
| **Usuario beneficiado** | Paciente, recepcionista |
| **Prioridad** | 🟠 |
| **Dependencias** | F3-01, F3-02, F3-03 |
| **Riesgos** | Mensajes a destinatario equivocado (riesgo R-08); pacientes que no usan WhatsApp |
| **Criterio de aceptación** | Se envía correctamente, se registra el estado y existe botón de parada general |

---

### F3-05 · Envío por correo electrónico

| | |
|---|---|
| **Descripción** | Envío por correo como canal alternativo |
| **Usuario beneficiado** | Paciente con correo |
| **Prioridad** | 🟡 |
| **Dependencias** | F3-01, F3-02, F3-03 |
| **Riesgos** | Bajo uso si pocos pacientes tienen correo (P-PAC-08) |
| **Criterio de aceptación** | Se envía y se registra el resultado |

---

### F3-06 · Registro de estado de envío

| | |
|---|---|
| **Descripción** | Enviado, entregado, leído, fallido, y respuesta del paciente |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | 🔴 |
| **Dependencias** | F3-04 |
| **Riesgos** | Confiar en un "entregado" que no equivale a "leído por la persona correcta" |
| **Criterio de aceptación** | Todo envío tiene estado visible en la línea de tiempo del paciente |

---

### F3-07 · Ventana horaria y límites de envío

| | |
|---|---|
| **Descripción** | Restricción de horarios y tope diario de mensajes |
| **Usuario beneficiado** | Paciente |
| **Prioridad** | 🔴 |
| **Dependencias** | F3-04 |
| **Riesgos** | Molestar a pacientes en horarios inadecuados |
| **Criterio de aceptación** | No sale ningún mensaje fuera de la franja definida ni por encima del tope |

---

### F3-08 · Botón de parada general

| | |
|---|---|
| **Descripción** | Detención inmediata de todos los envíos automáticos |
| **Usuario beneficiado** | Administrador |
| **Prioridad** | 🔴 |
| **Dependencias** | F3-04 |
| **Riesgos** | Que no funcione cuando se necesite |
| **Criterio de aceptación** | Se prueba antes de activar cualquier envío real |

---

### Criterio de salida de la Fase 3

- [ ] Ningún paciente excluido recibió mensajes.
- [ ] Las plantillas están aprobadas por Proaudio.
- [ ] No hubo mensajes a destinatario equivocado.
- [ ] Se revisó semanalmente qué se envió y con qué resultado.

---

# FASE 4 — DIGITALIZACIÓN HISTÓRICA

**Objetivo:** incorporar el archivo físico de forma progresiva. *Detalle completo en el Documento 7.*

---

### F4-01 · Preparación (Ola 0)

| | |
|---|---|
| **Descripción** | Lista de documentos esperados, nomenclatura de ubicación, prueba piloto y medición de tiempos |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | D-01, D-22, F0-04 |
| **Riesgos** | Digitalizar con criterio equivocado y tener que rehacerlo |
| **Criterio de aceptación** | Se conoce el tiempo medio por ficha y existe la lista de documentos esperados |

---

### F4-02 · Digitalización de citas próximas (Ola 1)

| | |
|---|---|
| **Descripción** | Preparar la ficha digital de todo paciente con cita en los próximos días |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🔴 |
| **Dependencias** | F4-01, F2-14 |
| **Riesgos** | Que no alcance el tiempo de la recepcionista |
| **Criterio de aceptación** | 100% de las citas de la semana tienen ficha con datos mínimos |

---

### F4-03 · Digitalización oportunista (Ola 2)

| | |
|---|---|
| **Descripción** | Cada paciente que visita sale con su ficha más completa |
| **Usuario beneficiado** | Todos |
| **Prioridad** | 🟠 |
| **Dependencias** | F4-02 |
| **Riesgos** | Competir con la atención (regla de los cinco minutos) |
| **Criterio de aceptación** | El porcentaje digitalizado de pacientes activos crece cada mes |

---

### F4-04 · Garantías vigentes (Ola 3)

| | |
|---|---|
| **Descripción** | Registrar todas las garantías aún vigentes |
| **Usuario beneficiado** | Paciente, recepcionista |
| **Prioridad** | 🟠 |
| **Dependencias** | **D-05**, F2-12 |
| **Riesgos** | No poder identificar qué garantías siguen vigentes |
| **Criterio de aceptación** | Toda garantía vigente identificable está en el sistema |

---

### F4-05 · Archivo histórico bajo demanda (Ola 4)

| | |
|---|---|
| **Descripción** | Digitalizar solo cuando se necesita o cuando hay tiempo disponible |
| **Usuario beneficiado** | Todos |
| **Prioridad** | 🟡 |
| **Dependencias** | F4-03 |
| **Riesgos** | Que nunca se complete — **lo cual es aceptable** |
| **Criterio de aceptación** | Toda ficha consultada queda digitalizada tras su consulta |

---

### F4-06 · Control de duplicados y fusión

| | |
|---|---|
| **Descripción** | Detección, revisión y fusión manual de fichas duplicadas, sin pérdida de información |
| **Usuario beneficiado** | Administrador |
| **Prioridad** | 🔴 |
| **Dependencias** | D-01, F2-03 |
| **Riesgos** | **Fusionar por error a dos pacientes distintos** |
| **Criterio de aceptación** | Toda fusión queda registrada y ninguna información se pierde |

---

### F4-07 · Validación humana de lo digitalizado

| | |
|---|---|
| **Descripción** | Niveles de verificación y marca de confianza del dato |
| **Usuario beneficiado** | Audióloga |
| **Prioridad** | 🟠 |
| **Dependencias** | F4-02 |
| **Riesgos** | Confiar en datos mal transcritos |
| **Criterio de aceptación** | Todo dato dudoso está marcado como tal; **ningún dato se inventa** |

---

# FASE 5 — REPARACIONES, GARANTÍAS E INVENTARIO

**Objetivo:** completar la operación técnica.

> **Advertencia:** el proceso de reparación **no fue descrito**. Toda esta fase requiere levantamiento previo (bloque 7 del Documento 8).

---

### F5-01 · Levantamiento del proceso de reparaciones

| | |
|---|---|
| **Descripción** | Entender el flujo real de taller antes de diseñar nada |
| **Usuario beneficiado** | Todo el proyecto |
| **Prioridad** | 🔴 |
| **Dependencias** | Ninguna |
| **Riesgos** | Diseñar un flujo inventado (violaría el principio 6) |
| **Criterio de aceptación** | El proceso está descrito paso a paso y validado por quien lo ejecuta |

---

### F5-02 · Registro y seguimiento de reparaciones

| | |
|---|---|
| **Descripción** | Orden de reparación con estados, desde la recepción hasta la entrega |
| **Usuario beneficiado** | Recepcionista, taller, paciente |
| **Prioridad** | 🟠 |
| **Dependencias** | F5-01, D-18 |
| **Riesgos** | Estados que no reflejan el proceso real |
| **Criterio de aceptación** | Se conoce el estado de cualquier equipo en reparación desde la ficha del paciente |

---

### F5-03 · Aviso de reparación terminada

| | |
|---|---|
| **Descripción** | Automatización A-07 |
| **Usuario beneficiado** | Paciente |
| **Prioridad** | 🟠 |
| **Dependencias** | F5-02, F3-04 |
| **Riesgos** | Avisar antes de que esté realmente listo |
| **Criterio de aceptación** | El aviso se dispara solo cuando el equipo está confirmado como listo |

---

### F5-04 · Garantías sobre reparaciones

| | |
|---|---|
| **Descripción** | Cobertura de las reparaciones realizadas |
| **Usuario beneficiado** | Paciente |
| **Prioridad** | 🟡 |
| **Dependencias** | D-05, F5-02 |
| **Riesgos** | Reglas no definidas |
| **Criterio de aceptación** | Toda reparación registra si genera garantía y por cuánto tiempo |

---

### F5-05 · Control de repuestos e inventario

| | |
|---|---|
| **Descripción** | Stock de repuestos, entradas y salidas |
| **Usuario beneficiado** | Taller, gerencia |
| **Prioridad** | 🟡 |
| **Dependencias** | F5-02 |
| **Riesgos** | Inventario que se desactualiza y deja de usarse |
| **Criterio de aceptación** | El stock refleja la realidad tras un mes de uso |

---

### F5-06 · Equipos de préstamo

| | |
|---|---|
| **Descripción** | Control de equipos prestados durante una reparación |
| **Usuario beneficiado** | Recepcionista |
| **Prioridad** | ⚪ |
| **Dependencias** | F5-02, P-AUD-05 |
| **Riesgos** | Equipos que no vuelven |
| **Criterio de aceptación** | Se sabe qué equipos están prestados y a quién |

---

# FASE 6 — KPIs Y ANALÍTICA

**Objetivo:** dar visibilidad gerencial sobre datos reales.

> **Requisito absoluto:** los indicadores solo son confiables si los datos se capturaron bien en las fases 2 a 5. **Esta fase no se adelanta.**

---

### F6-01 · Indicadores de pacientes

| | |
|---|---|
| **Descripción** | Pacientes nuevos, activos, recuperados, en abandono; frecuencia de visitas |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | 🔴 |
| **Dependencias** | D-08, 6+ meses de datos en F2 |
| **Riesgos** | Interpretar mal cifras basadas en datos incompletos |
| **Criterio de aceptación** | Cada indicador muestra qué período cubre y qué porcentaje de datos tiene disponible |

---

### F6-02 · Indicadores de agenda

| | |
|---|---|
| **Descripción** | No-shows, cancelaciones, reagendamientos, ocupación |
| **Usuario beneficiado** | Gerencia, recepción |
| **Prioridad** | 🟠 |
| **Dependencias** | 6+ meses de datos en F2 |
| **Riesgos** | Usarlos para evaluar personas en lugar de procesos (riesgo R-02) |
| **Criterio de aceptación** | Se pueden ver tendencias mensuales fiables |

---

### F6-03 · Cumplimiento clínico

| | |
|---|---|
| **Descripción** | Cumplimiento de controles y de audiometría anual |
| **Usuario beneficiado** | Gerencia, audiólogas |
| **Prioridad** | 🟠 |
| **Dependencias** | D-03, F2-16 |
| **Riesgos** | Medir contra una norma que no está definida |
| **Criterio de aceptación** | Se conoce qué porcentaje de pacientes cumple la frecuencia definida |

---

### F6-04 · Indicadores de garantías y reparaciones

| | |
|---|---|
| **Descripción** | Garantías vigentes, por vencer, usadas; volumen y tiempos de reparación |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | 🟡 |
| **Dependencias** | F5-02, F2-12 |
| **Riesgos** | Datos incompletos del histórico |
| **Criterio de aceptación** | Las cifras coinciden con la realidad operativa |

---

### F6-05 · Indicadores económicos

| | |
|---|---|
| **Descripción** | Costos por paciente y por reparación, repuestos, rentabilidad por paciente |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | 🟡 |
| **Dependencias** | **D-24**, F5-05 |
| **Riesgos** | Requiere información económica que puede vivir en otro sistema |
| **Criterio de aceptación** | Las cifras cuadran con la contabilidad de la empresa |

---

### F6-06 · Origen y referidos

| | |
|---|---|
| **Descripción** | De dónde vienen los pacientes y qué canales funcionan |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | 🟡 |
| **Dependencias** | F2-03 con el campo de origen bien usado |
| **Riesgos** | Datos vacíos si el campo no se llena (riesgo R-13) |
| **Criterio de aceptación** | Más del 80% de los pacientes nuevos tienen origen registrado |

---

### F6-07 · Productividad por profesional

| | |
|---|---|
| **Descripción** | Atenciones, ocupación y seguimiento por profesional |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | ⚪ |
| **Dependencias** | D-21 |
| **Riesgos** | **El riesgo más alto de esta fase.** Puede dañar la confianza del equipo en el sistema |
| **Criterio de aceptación** | Su uso y visibilidad fueron acordados previamente con el equipo |

---

### F6-08 · Tablero gerencial

| | |
|---|---|
| **Descripción** | Vista consolidada de los indicadores principales |
| **Usuario beneficiado** | Gerencia |
| **Prioridad** | 🟠 |
| **Dependencias** | F6-01 a F6-06 |
| **Riesgos** | Tablero bonito sobre datos poco confiables |
| **Criterio de aceptación** | Cada indicador indica su origen, período y nivel de completitud |

---

# VISIÓN GENERAL DEL BACKLOG

| Fase | Funcionalidades | 🔴 Imprescindibles | Bloqueada por |
|---|---|---|---|
| F0 | 8 | 6 | — |
| F1 | 11 | 10 | D-01, D-02, D-03, D-08 |
| F2 | 18 | 15 | D-05, D-08, D-12, D-13 |
| F3 | 8 | 6 | D-27, P-MSG-05 |
| F4 | 7 | 3 | D-01, D-22 |
| F5 | 6 | 1 | Proceso de taller sin describir |
| F6 | 8 | 1 | Datos acumulados |
| **Total** | **66** | **42** | |

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Las siete fases y sus nombres | **Confirmado** — definidas por Proaudio |
| Las funcionalidades derivadas de requerimientos explícitos | **Confirmado como necesidad** |
| **La asignación de cada funcionalidad a una fase** | **Propuesta del analista** |
| **Las prioridades** | **Propuesta del analista** |
| **Los criterios de aceptación** | **Preliminares** |
| Las dependencias entre funcionalidades | **Propuesta del analista** |
| Estimaciones de tiempo, costo o esfuerzo | **No incluidas — no hay base para calcularlas** |
