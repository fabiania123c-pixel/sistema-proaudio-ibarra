# SISTEMA PROAUDIO — Resumen ejecutivo e índice

**Cliente:** Proaudio Ibarra
**Etapa:** Definición funcional — Fase 0 (levantamiento)
**Versión:** 1.0
**Fecha:** 1 de agosto de 2026

---

# 1. RESUMEN EJECUTIVO

### El problema

Proaudio Ibarra atiende a personas con problemas auditivos desde hace más de 21 años. Su información vive en dos lugares que no se hablan entre sí: **Google Calendar**, donde están las citas, y el **archivo físico**, donde están las fichas, historiales, audiometrías, garantías y reparaciones. Nada conecta una cosa con la otra, y el seguimiento a los pacientes depende de la memoria de las personas. Cuando alguien deja de asistir, **nada en el sistema actual lo señala**.

### Lo que se propone

Construir, paso a paso y validando en cada etapa, un sistema donde **la ficha del paciente sea la fuente central de información**, con la agenda, las citas y los recordatorios conectados a ella. El objetivo no es digitalizar 21 años de archivo: es lograr que **a partir de la puesta en marcha ningún paciente se pierda por falta de seguimiento**, e incorporar el archivo histórico de forma gradual, conforme los pacientes regresen.

### Cómo se llega ahí

Siete fases. La primera no construye nada funcional: son **10 pantallas navegables con datos ficticios** para sentar a las audiólogas y recepcionistas frente a la pantalla y preguntarles si les sirve. Corregir una pantalla cuesta minutos; corregir un sistema construido cuesta semanas. Solo después viene el **MVP interno** (Fase 2), donde el equipo empieza a trabajar de verdad sobre el sistema, todavía sin enviar nada a los pacientes. Los mensajes automáticos por WhatsApp y correo llegan en la Fase 3, con **aprobación humana obligatoria** al inicio. La digitalización histórica es la Fase 4, y funciona por olas: primero los pacientes con cita próxima, después los activos, luego las garantías vigentes, y el resto solo bajo demanda.

### El principio que gobierna todo

Nada se borra. Toda observación queda en una línea de tiempo histórica, todo registro guarda quién lo hizo y cuándo, y **cualquier automatización puede ser revisada, editada, pospuesta o cancelada por un empleado**. El sistema no actúa solo: asiste a personas que siguen decidiendo.

### El estado actual del análisis, con honestidad

Estos diez documentos se elaboraron **sin haber visitado Proaudio, sin haber entrevistado a nadie y sin haber visto un solo documento real de la empresa**. La carpeta del proyecto estaba vacía. Todo lo que aquí se afirma sobre la operación actual es, salvo cinco hechos confirmados en el encargo, **inferencia del analista claramente marcada como tal**. El proceso "actual" descrito en el Documento 2 es una hipótesis que debe recorrerse en persona con el equipo.

### La restricción más importante

El sistema puede generar más trabajo del que el equipo puede atender. Si las reglas de seguimiento producen 46 tareas diarias y una recepcionista puede hacer 20 contactos al día además de su trabajo habitual, **el sistema fracasa por exceso de éxito**. Por eso la pregunta *"¿cuántas llamadas puede hacer realmente una persona en un día?"* pesa tanto como cualquier definición clínica.

### Qué se necesita ahora

**Diez decisiones** cierran el paso al diseño. Las tres más urgentes: qué dato identifica de forma única a un paciente, qué marco de protección de datos aplica a información de salud, y a partir de cuánto tiempo se considera que un paciente se está perdiendo. Ninguna puede responderla el analista. **Todas dependen de Proaudio.**

---

# 2. LAS DIEZ DECISIONES MÁS URGENTES

| # | Decisión | Por qué es urgente | Quién decide |
|---|---|---|---|
| 1 | **D-01 · Identificador único del paciente** | Sin regla clara, el mismo paciente se registrará varias veces. Con 21 años de historia, el daño sería masivo y difícil de revertir | Gerencia + Recepción |
| 2 | **D-11 · Marco de protección de datos** | Se manejará información de salud de miles de personas sin ninguna política definida. **No debería cargarse un solo dato real antes de resolverlo** | Gerencia + asesoría legal |
| 3 | **D-08 · Definición de paciente inactivo** | Es la regla central del objetivo del proyecto. Define cuánto trabajo genera el sistema y cómo se mide el abandono | Gerencia |
| 4 | **D-02 · Catálogo de motivos de cita** | Bloquea la agenda, los formularios y cuatro automatizaciones. No puede inventarse | Recepción + Audiólogas |
| 5 | **D-03 · Frecuencias de recordatorios** | Todas las automatizaciones necesitan una regla temporal. **Debe decidirse junto con la capacidad real del equipo** | Audiólogas + Gerencia |
| 6 | **D-05 · Reglas de garantía** | Sin saber cuánto dura, desde cuándo corre y qué cubre, el aviso de vencimiento no puede construirse | Gerencia + Audiólogas |
| 7 | **D-10 · Sucursales** | Afecta agenda, permisos, archivo físico y ficha. Se desconoce incluso cuántas hay | Gerencia |
| 8 | **D-04 · Significado de S+, A y B** | Se sabe que existen, no qué significan. Sin criterio compartido, dos personas clasifican distinto | Gerencia |
| 9 | **D-23 · Tipos de atención** | Bloquea la pantalla más crítica para la adopción: el registro de atención | Audiólogas |
| 10 | **D-27 · Marca de "no desea ser contactado"** | Requisito previo indispensable para cualquier envío automático. También hace falta poder marcar pacientes fallecidos | Gerencia |

*Detalle completo en el Documento 10.*

---

# 3. LAS DIEZ PREGUNTAS QUE MÁS PODRÍAN CAMBIAR EL ALCANCE

Estas preguntas no solo faltan por responder: **según cuál sea la respuesta, el proyecto cambia de forma**.

| # | Pregunta | Si la respuesta es A… | Si la respuesta es B… |
|---|---|---|---|
| 1 | **¿Hoy hacen seguimiento a los pacientes que no vuelven?** *(P-SEG-01)* | Se automatiza un proceso existente. Alcance previsible | **No se automatiza nada: se crea un proceso nuevo.** Hay que definir reglas, responsables y capacidad. Alcance mucho mayor |
| 2 | **¿Cuántas llamadas de seguimiento puede hacer una persona al día?** *(P-SEG-06)* | Si son 30+, las automatizaciones son viables tal como se diseñaron | Si son 10, hay que priorizar drásticamente o adelantar la Fase 3 para liberar tiempo humano |
| 3 | **¿Cuántos pacientes y cuántas fichas hay?** *(P-PAC-05, P-DOC-03)* | Si son ~1.000, la digitalización es abordable | Si son ~15.000, la estrategia por olas se vuelve obligatoria y la Ola 4 probablemente nunca se complete |
| 4 | **¿El equipo de audiometría exporta datos digitales?** *(P-AUM-02)* | Se puede estructurar y comparar audiometrías en el futuro | Todo queda como imagen adjunta. Se pierde la posibilidad de graficar evolución |
| 5 | **¿Cuántas sucursales hay y cómo operan?** *(P-SUC-01)* | Si es una, el diseño se simplifica mucho | Si son varias con archivos separados y personal itinerante, cambian agenda, permisos y digitalización |
| 6 | **¿Existe algún archivo digital hoy (Excel, sistema anterior)?** *(P-HIS-01)* | Se puede importar y ahorrar meses de digitalización | Se parte de cero absoluto |
| 7 | **¿Cuánto tiempo tiene una audióloga para registrar entre pacientes?** *(P-ATE-04)* | Si son 5 minutos, el formulario propuesto funciona | Si son 30 segundos, hay que rediseñarlo radicalmente o el sistema no se usará |
| 8 | **¿Existe normativa de protección de datos que los obligue?** *(P-PRO-01)* | Se diseña con las precauciones habituales | Puede exigir consentimientos, controles de acceso y almacenamiento específicos que cambian la arquitectura |
| 9 | **¿La información económica debe estar en este sistema?** *(P-GER-07)* | Las fases 5 y 6 se mantienen como están | Se amplían significativamente, o se reducen si ya existe un sistema contable |
| 10 | **¿Qué proporción de pacientes usa WhatsApp?** *(P-PAC-09)* | La Fase 3 tiene alto impacto | Si son mayoritariamente adultos mayores sin WhatsApp, la Fase 3 pierde valor y la llamada humana sigue siendo el canal principal |

---

# 4. RECOMENDACIÓN PARA LA PRÓXIMA REUNIÓN

### Antes de la reunión

Enviar a Proaudio los **Documentos 1, 2 y 10** con al menos tres días de anticipación, señalando expresamente: *"el Documento 2 contiene suposiciones nuestras sobre cómo trabajan ustedes. Necesitamos que nos corrijan."*

### Estructura sugerida — 90 minutos

| Tiempo | Bloque | Objetivo |
|---|---|---|
| **0–10 min** | Encuadre | Explicar que esta etapa es de entendimiento, no de construcción. Nadie está siendo evaluado |
| **10–30 min** | **Corregir el Documento 2** | Recorrer el proceso actual inferido y marcar qué está bien y qué está mal. **Es el bloque de mayor valor de la reunión** |
| **30–60 min** | **Cerrar las 5 decisiones bloqueantes** | D-01, D-02, D-08, D-10 y D-11. Si solo se cierran estas cinco, la reunión fue exitosa |
| **60–75 min** | **Capacidad real del equipo** | Cuántos pacientes, cuántas citas semanales, cuántas llamadas diarias son posibles. Sin estos números no se puede dimensionar nada |
| **75–85 min** | **Designar responsable del proyecto** | Una persona con autoridad para decidir y tiempo asignado |
| **85–90 min** | Acordar la visita de observación | Media jornada en sitio, con fecha concreta |

### Lo que **no** debería hacerse en esta reunión

- Mostrar pantallas o hablar de diseño. **Todavía no hay nada que enseñar** y genera expectativas prematuras.
- Prometer funcionalidades o plazos.
- Hablar de tecnología, plataformas o costos de desarrollo.
- Intentar cerrar las 28 decisiones. Cinco bien cerradas valen más que veintiocho a medias.

### Lo que debería salir de la reunión, por escrito

1. El Documento 2 corregido o confirmado.
2. Cinco decisiones cerradas.
3. Cifras aproximadas de volumen: pacientes, citas, fichas.
4. Un nombre: quién es el responsable del proyecto en Proaudio.
5. Una fecha para la visita de observación.

### Después de la reunión

Agendar las tres sesiones por rol del Documento 8 (recepción, audiólogas, administrativo) y la media jornada de observación. **Solo entonces tiene sentido empezar el prototipo.**

---

# 5. DECLARACIÓN DE ORIGEN DE LA INFORMACIÓN

Esta sección cumple con el principio 15 del encargo: *no presentar nunca una inferencia como si fuera un hecho confirmado.*

## 5.1 Nota metodológica

**La carpeta del proyecto estaba vacía al iniciar este trabajo.** No se recibió ningún archivo, documento, formulario, captura de pantalla ni base de datos de Proaudio Ibarra. **La única fuente de información fue el encargo escrito.**

En consecuencia: **no se realizaron visitas, entrevistas, observaciones ni revisión de documentos reales.** Todo lo que en estos documentos describe la operación actual de Proaudio —salvo los cinco hechos listados abajo— es una reconstrucción del analista.

## 5.2 Información CONFIRMADA

Proviene directamente del encargo y puede usarse como base de diseño.

**Sobre la empresa:**

1. Proaudio Ibarra atiende personas con problemas auditivos y comercializa, adapta, mantiene y repara audífonos.
2. Lleva más de 21 años operando.
3. Conserva gran cantidad de información en documentos y fichas físicas.
4. Utiliza Google Calendar para manejar las citas.
5. La agenda no está correctamente conectada con fichas, historiales, garantías, audiometrías, reparaciones ni seguimientos.

**Sobre los objetivos:** digitalizar progresivamente, mejorar el seguimiento, reducir el abandono de pacientes y crear una fuente confiable de datos para decisiones gerenciales. Desarrollo paso a paso, sin digitalizar los 21 años desde el comienzo.

**Sobre los principios:** los 15 principios obligatorios del encargo, incluidos: la ficha del paciente como fuente central; la vinculación de agenda, citas, recordatorios y fichas; Google Calendar como vista temporal y no como base; que ninguna observación se borre y exista línea de tiempo histórica; que las automatizaciones sean revisables, editables, posponibles y cancelables por un empleado; que se conserve quién creó o modificó cada información y cuándo; la prioridad de facilidad de uso para audiólogas y recepcionistas; la prohibición de inventar procedimientos; el uso exclusivo de datos ficticios.

**Sobre las funcionalidades deseadas:** las capacidades de agenda y recordatorios; los diez tipos de seguimiento; los campos de la ficha del paciente (incluidos marca, modelo, oído, serie, ciudad, referido, sucursal, categoría configurable S+/A/B, porcentaje digitalizado y ubicación del archivo físico); los estados de cita; la lista de necesidades futuras; las siete fases del backlog; las 16 entidades del diccionario de datos; las 10 pantallas del prototipo; los 5 roles a considerar.

**Sobre la estrategia de digitalización:** que se cargarán datos mínimos y las fichas se completarán conforme los pacientes regresen o la información sea requerida.

## 5.3 Información INFERIDA

Deducciones del analista. **Ninguna ha sido verificada.** Todas están marcadas **[I]** en los documentos.

- **Todo el proceso actual** descrito en el Documento 2 (registro de pacientes, creación de citas, registro de atención, seguimiento, consulta de documentos, gestión de garantías). **Es la inferencia más extensa y la más importante de corregir.**
- Las consecuencias operativas del problema actual (Documento 1).
- La frecuencia de uso y el nivel tecnológico de cada rol.
- Los 14 riesgos identificados y su valoración.
- Toda la matriz de permisos del Documento 3.
- Todos los campos del diccionario de datos no citados textualmente en el encargo, y su clasificación por fase.
- El diseño, la disposición y el orden de los elementos de las 10 pantallas.
- Las condiciones de detención de las automatizaciones y los textos de las plantillas.
- Las automatizaciones A-11, A-12 y A-13, que **no fueron solicitadas**.
- La estructura de cinco olas de la digitalización y sus criterios de priorización.
- La asignación de cada funcionalidad a una fase, sus prioridades y criterios de aceptación.
- Las opciones y recomendaciones de las 28 decisiones pendientes.

## 5.4 Información PENDIENTE

No se conoce y **no puede inferirse**. Requiere respuesta de Proaudio.

**Volúmenes y cifras — todas desconocidas:** número de pacientes, de fichas, de citas semanales, de sucursales, de personas por rol; tasa de inasistencia; tasa de abandono; tiempos de cada tarea; tamaño y estado del archivo físico.

**Definiciones operativas:** identificador único del paciente; motivos de cita; tipos de atención; frecuencia de controles y audiometrías; reglas de garantía; umbral de paciente inactivo; criterio de las categorías S+, A y B; lista de documentos de una ficha; opciones de "cómo conoció Proaudio".

**Procesos no descritos:** el flujo completo de reparaciones; el manejo de inventario y repuestos; el proceso de venta y entrega de equipos; el manejo de la información económica.

**Marco normativo:** normativa de protección de datos aplicable; obligaciones de conservación documental; consentimientos requeridos.

**Decisiones organizacionales:** esquema de permisos; alcance del acceso de cada rol; quién realizará la digitalización; futuro del archivo en papel; responsable del proyecto; presupuesto y plazos.

## 5.5 Lo que este análisis NO hizo, deliberadamente

- **No definió ningún procedimiento clínico, médico o comercial** que Proaudio no haya descrito **[C, principio 6]**. En particular, **no se definió la estructura de datos de una audiometría** ni ningún criterio diagnóstico.
- **No escribió código** ni diseñó base de datos, tablas, APIs o arquitectura técnica.
- **No conectó ninguna plataforma externa.**
- **No propuso una aplicación definitiva.**
- **No usó información real de pacientes.** Todos los nombres, códigos, fechas y datos de los ejemplos son ficticios.
- **No estimó plazos ni costos**, por carecer de base para calcularlos.
- **No rellenó los vacíos con supuestos.** Cada uno quedó registrado como decisión pendiente o pregunta de validación.

---

# 6. ÍNDICE DE DOCUMENTOS

| # | Documento | Contenido | Para quién |
|---|---|---|---|
| **1** | [Visión funcional del proyecto](01-VISION-FUNCIONAL.md) | Problema, objetivos, usuarios, beneficios, alcance, principios, riesgos y exclusiones | Gerencia |
| **2** | [Mapa del proceso actual y futuro](02-MAPA-DE-PROCESOS.md) | Cómo parece funcionar hoy y cómo debería funcionar, separando hechos de inferencias | **Todo el equipo — documento a corregir** |
| **3** | [Usuarios, roles y permisos](03-ROLES-Y-PERMISOS.md) | Propuesta preliminar de permisos para los 5 roles | Gerencia |
| **4** | [Diccionario preliminar de datos](04-DICCIONARIO-DE-DATOS.md) | 16 entidades con sus campos clasificados por fase | Equipo técnico + validación funcional |
| **5** | [Pantallas del primer prototipo](05-PANTALLAS-PROTOTIPO.md) | 10 pantallas con bocetos y datos ficticios | Audiólogas y recepcionistas |
| **6** | [Matriz de automatizaciones](06-MATRIZ-AUTOMATIZACIONES.md) | 13 automatizaciones con reglas, canales, estados y riesgos | Gerencia + recepción |
| **7** | [Estrategia de digitalización histórica](07-DIGITALIZACION-HISTORICA.md) | Enfoque por olas para los 21 años de archivo | Gerencia + administrativo |
| **8** | [Preguntas de validación](08-PREGUNTAS-DE-VALIDACION.md) | 192 preguntas en 16 bloques, por interlocutor | Guion de las reuniones |
| **9** | [Backlog inicial por fases](09-BACKLOG-POR-FASES.md) | 66 funcionalidades distribuidas en 7 fases | Gerencia + equipo de proyecto |
| **10** | [Registro de decisiones pendientes](10-DECISIONES-PENDIENTES.md) | 28 decisiones abiertas con opciones e impacto | **Gerencia — documento vivo** |

### Orden de lectura sugerido

- **Gerencia, si dispone de poco tiempo:** este resumen → Documento 10 → Documento 1.
- **Para preparar la próxima reunión:** Documento 2 → Documento 10 → Documento 8.
- **Audiólogas y recepcionistas:** Documento 5 → Documento 2.
- **Lectura completa:** en orden, del 1 al 10.

---

## Cierre

Estos diez documentos no describen un sistema: describen **lo que hay que entender antes de construir uno**. Su mayor valor no está en lo que afirman, sino en lo que dejan explícitamente abierto — 28 decisiones y 192 preguntas que, respondidas, convierten un análisis honesto en un diseño confiable.

**Nada de lo aquí propuesto debería construirse antes de esa conversación.**
