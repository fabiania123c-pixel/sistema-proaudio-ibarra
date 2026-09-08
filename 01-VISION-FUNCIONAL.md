# Documento 1 — Visión funcional del proyecto

**Proyecto:** SISTEMA PROAUDIO
**Cliente:** Proaudio Ibarra
**Versión:** 1.0 (borrador para validación)
**Fecha:** 1 de agosto de 2026
**Estado:** Documento de definición funcional. No contiene decisiones técnicas ni compromisos de desarrollo.

---

## Nota sobre el origen de la información

Este documento se elabora a partir del encargo escrito recibido. **No se ha tenido acceso a archivos, fichas, formularios, calendarios ni datos reales de Proaudio Ibarra.** Toda afirmación se etiqueta con uno de estos tres marcadores:

| Marcador | Significado |
|---|---|
| **[C]** | **Confirmado.** Declarado explícitamente por Proaudio en el encargo. |
| **[I]** | **Inferencia razonable.** Deducción lógica del analista. Debe confirmarse antes de usarse como base de diseño. |
| **[V]** | **Por validar.** Vacío de información. Registrado como decisión o pregunta pendiente. |

Ningún elemento marcado **[I]** o **[V]** debe tratarse como un hecho hasta que Proaudio lo confirme.

---

## 1. Problema actual

### 1.1 Situación descrita

**[C]** Proaudio Ibarra atiende a personas con problemas auditivos y comercializa, adapta, mantiene y repara audífonos.

**[C]** La empresa opera desde hace más de 21 años y conserva gran parte de su información en documentos y fichas físicas.

**[C]** Actualmente utiliza Google Calendar para gestionar las citas.

**[C]** La agenda no está correctamente conectada con las fichas, historiales, garantías, audiometrías, reparaciones ni seguimientos de los pacientes.

### 1.2 Consecuencias del problema

Las siguientes consecuencias se derivan lógicamente de la situación descrita, pero **su magnitud real no ha sido medida**:

**[I]** **La información del paciente está fragmentada.** Para responder una pregunta simple —¿qué audífono usa este paciente?, ¿su garantía sigue vigente?, ¿cuándo fue su última audiometría?— es necesario consultar al menos dos fuentes distintas: el calendario digital y el archivo físico.

**[I]** **El seguimiento depende de la memoria de las personas.** Sin un sistema que dispare avisos, recordar que un paciente debe volver a control, que una garantía está por vencer o que alguien dejó de asistir queda a criterio individual del personal.

**[I]** **La pérdida de pacientes no es visible.** Si un paciente deja de asistir, nada en el sistema actual lo señala. El abandono ocurre de forma silenciosa.

**[I]** **La consulta del archivo físico es costosa en tiempo.** Cada consulta implica localizar físicamente una carpeta, lo que interrumpe la atención y limita la posibilidad de responder por teléfono.

**[I]** **No existe base confiable para medir.** Sin datos estructurados, no es posible responder con precisión preguntas gerenciales como cuántos pacientes activos hay, qué porcentaje cumple sus controles o cuál es la tasa de inasistencia.

**[I]** **El conocimiento es personal, no institucional.** Cuando una persona del equipo se ausenta o se retira, parte del contexto de sus pacientes se va con ella.

**[V]** **Magnitud del problema sin cuantificar.** No se conoce el número de pacientes en el archivo, cuántos están activos, cuántas citas se agendan por semana, ni la tasa actual de inasistencia o abandono. → *Ver Documento 8, sección Gerencia.*

---

## 2. Objetivo general

Construir, de forma progresiva y validada por los usuarios, un sistema de gestión de pacientes y agenda para Proaudio Ibarra que:

> **Convierta la ficha del paciente en la fuente central y confiable de información de la empresa, conecte la agenda y los seguimientos con esa ficha, y reduzca la pérdida de pacientes mediante recordatorios y tareas que el equipo pueda revisar y controlar.**

El objetivo **no** es digitalizar 21 años de archivo. El objetivo es que, a partir de la puesta en marcha, **ningún paciente que entre al sistema se pierda por falta de seguimiento**, y que el archivo histórico se incorpore de forma gradual conforme se necesite.

---

## 3. Objetivos específicos

| # | Objetivo específico | Cómo se sabrá que se logró (preliminar) |
|---|---|---|
| OE-1 | Centralizar la información del paciente en una ficha única y accesible | El personal puede responder las preguntas frecuentes sobre un paciente desde una sola pantalla, sin abrir el archivo físico |
| OE-2 | Vincular cada cita con la ficha del paciente correspondiente | Desde cualquier cita de la agenda se puede abrir la ficha en un clic, y desde la ficha se ve el historial de citas |
| OE-3 | Registrar el resultado real de cada cita | Toda cita pasada tiene un estado final: completada, no atendida, cancelada o reagendada |
| OE-4 | Hacer visible el seguimiento pendiente | Existe una pantalla donde la recepcionista ve qué pacientes debe contactar hoy y por qué |
| OE-5 | Conservar el historial completo sin pérdida de información | Ninguna observación se sobrescribe; toda la línea de tiempo del paciente es consultable **[C]** |
| OE-6 | Mantener trazabilidad de quién hizo qué y cuándo | Todo registro y toda modificación queda asociada a un usuario y una fecha **[C]** |
| OE-7 | Permitir control humano sobre las automatizaciones | Todo recordatorio automático puede ser revisado, editado, pospuesto o cancelado por un empleado **[C]** |
| OE-8 | Digitalizar el archivo físico de forma progresiva y priorizada | La ficha indica qué porcentaje está digitalizado y dónde se encuentra el archivo físico **[C]** |
| OE-9 | Ser usable por personal sin experiencia tecnológica | Una audióloga o recepcionista puede completar sus tareas habituales sin capacitación técnica **[C]** |
| OE-10 | Generar datos confiables para decisiones gerenciales futuras | Los indicadores de la Fase 6 pueden calcularse sin recolección manual adicional |

**[V]** Las metas numéricas de cada objetivo (por ejemplo, "reducir el no-show del X% al Y%") **no pueden fijarse todavía** porque no se conoce la línea base. → *Decisión D-19.*

---

## 4. Usuarios del sistema

**[C]** El sistema debe priorizar la facilidad de uso para audiólogas y recepcionistas que no necesariamente tienen experiencia tecnológica.

| Usuario | Rol frente al sistema | Uso previsto | Nivel tecnológico asumido |
|---|---|---|---|
| **Recepcionista** | Usuario más frecuente. Opera la agenda y el contacto con pacientes | Todo el día, muchas veces | **[I]** Básico. Requiere pantallas simples y flujos cortos |
| **Audióloga** | Usuario clínico. Consulta la ficha y registra la atención | Antes, durante y después de cada cita | **[I]** Básico–intermedio. Prioriza velocidad de consulta |
| **Administrador** | Configura el sistema y gestiona usuarios | Ocasional | **[I]** Intermedio |
| **Gerencia** | Consulta información agregada para decidir | Periódico (semanal o mensual) | **[I]** Intermedio |
| **Usuario técnico / soporte** | Mantiene el sistema y resuelve incidencias | Bajo demanda | Avanzado |

**[V]** Usuarios no confirmados que podrían existir: personal de taller de reparaciones, personal de bodega o inventario, contabilidad, y personal dedicado exclusivamente a digitalización. → *Ver Documento 3 y pregunta P-ROL-04.*

**[V]** Se desconoce el número de personas por rol y si una misma persona cumple varios roles a la vez. → *Pregunta P-ROL-01.*

**[V]** El paciente **no** es usuario del sistema en esta etapa. No se contempla portal de pacientes ni autoagendamiento. → *Excluido, ver sección 10.*

---

## 5. Beneficios esperados

### 5.1 Para la recepcionista

- Ver de un vistazo a quién debe llamar hoy y por qué, sin depender de notas sueltas.
- Agendar una cita sin salir de la ficha del paciente.
- Responder por teléfono preguntas sobre citas, garantías o audífonos sin buscar la carpeta física.
- Dejar constancia escrita de cada llamada, mensaje o intento de contacto.

### 5.2 Para la audióloga

- Llegar a la cita sabiendo qué se hizo la vez anterior y qué se le indicó al paciente.
- Registrar la atención sin perder observaciones previas.
- Dejar programada la siguiente acción en el mismo momento de la atención.
- Consultar audiometrías y equipos anteriores sin pedir el archivo.

### 5.3 Para la gerencia

- Saber cuántos pacientes están activos y cuántos se están perdiendo.
- Ver el cumplimiento de controles y audiometrías anuales.
- Tener una base de datos que sobreviva a la rotación de personal.
- Fundamentar decisiones con datos propios en lugar de percepciones.

### 5.4 Para la empresa

- Menor pérdida de pacientes por falta de seguimiento **[C: es el objetivo declarado]**.
- Menor dependencia del papel y del conocimiento individual.
- Continuidad del servicio cuando alguien se ausenta.
- Base para crecimiento futuro (nuevas sucursales, nuevos servicios).

**[V]** **Ningún beneficio está cuantificado.** El impacto económico y operativo real deberá medirse después de la puesta en marcha. Este documento no promete cifras.

---

## 6. Alcance inicial

El alcance se organiza en tres niveles claramente separados, según el principio 5 del encargo.

### 6.1 Nivel A — Primer prototipo (Fase 1)

**Propósito:** validar con audiólogas y recepcionistas que las pantallas y los flujos tienen sentido, **antes de construir nada funcional.**

**Naturaleza:** pantallas navegables con **datos ficticios**. Sin base de datos, sin guardado real, sin integraciones, sin envío de mensajes.

Incluye únicamente:

- Inicio / panel del día
- Agenda (vistas día, semana, mes)
- Centro de recordatorios y tareas
- Lista de pacientes con búsqueda
- Ficha resumida del paciente
- Historial / línea de tiempo del paciente
- Formulario de paciente nuevo
- Formulario de cita
- Registro de atención
- Carga de documento

*Detalle completo en el Documento 5.*

### 6.2 Nivel B — MVP interno (Fase 2)

**Propósito:** que el equipo de Proaudio empiece a trabajar realmente sobre el sistema en su operación diaria.

Incluye:

- Registro real de pacientes con datos mínimos
- Agenda operativa con creación, reagendamiento, cancelación y registro de inasistencia
- Estados de cita completos (confirmada, reagendada, cancelada, completada, no atendida) **[C]**
- Registro de atención con observaciones acumulativas y línea de tiempo **[C]**
- Recordatorios y tareas **internas** (dentro del sistema, sin envío externo)
- Registro manual de comunicaciones realizadas (llamadas, mensajes)
- Carga de documentos e imágenes de la cartilla física
- Indicador de porcentaje digitalizado y ubicación del archivo físico **[C]**
- Registro de audífonos, garantías y audiometrías en su versión básica
- Trazabilidad de creación y modificación **[C]**
- Roles y permisos básicos

**[C]** Google Calendar podrá mantenerse temporalmente como **vista sincronizada**, pero no será la base central del sistema. → *La dirección y el mecanismo de esa sincronización es una decisión pendiente (D-06).*

### 6.3 Nivel C — Fases posteriores

**Fase 3 — Comunicaciones:** envío de recordatorios por WhatsApp y correo, plantillas, registro de estado de envío.

**Fase 4 — Digitalización histórica:** incorporación progresiva y priorizada del archivo físico. *Ver Documento 7.*

**Fase 5 — Reparaciones, garantías e inventario:** flujo completo de taller, control de repuestos y stock.

**Fase 6 — KPIs y analítica:** indicadores de abandono, productividad, rentabilidad y tableros gerenciales.

---

## 7. Alcance futuro

**[C]** Las siguientes funcionalidades fueron señaladas como necesidades futuras y **no forman parte necesariamente del primer prototipo**:

**Indicadores de pacientes:** abandono, pacientes nuevos, pacientes activos, pacientes recuperados, frecuencia de visitas, no-shows, cancelaciones y reagendamientos.

**Indicadores clínicos y de servicio:** cumplimiento de controles, cumplimiento de audiometría anual, garantías, reparaciones.

**Indicadores económicos:** costos por paciente, costos por reparación, repuestos, rentabilidad por paciente.

**Indicadores de gestión:** productividad por profesional, origen y referidos de pacientes.

**Operación:** inventario, integraciones avanzadas, dashboards gerenciales.

> **Criterio de orden:** los indicadores de la Fase 6 solo son confiables si los datos que los alimentan se capturan correctamente desde la Fase 2. Por eso el diccionario de datos (Documento 4) ya contempla campos "Futuro": para no tener que rehacer la captura más adelante. **Contemplar un campo no significa construirlo ahora.**

---

## 8. Principios del proyecto

Estos principios fueron establecidos por Proaudio **[C]** y rigen todas las decisiones de diseño.

### 8.1 Principios de alcance

1. **Paso a paso.** No se construye todo de una vez. Cada fase se valida antes de avanzar.
2. **No digitalizar los 21 años desde el comienzo.** Se cargan datos mínimos y las fichas se completan conforme los pacientes regresen o la información sea requerida.
3. **Distinción explícita entre prototipo, MVP y futuro.** Ninguna funcionalidad entra al prototipo por inercia.
4. **No se propone todavía una aplicación definitiva.** Esta etapa es exclusivamente de definición funcional.

### 8.2 Principios de información

5. **La ficha del paciente es la fuente central de información.** Todo lo demás se conecta a ella.
6. **Nada se borra.** Ninguna observación anterior se elimina al escribir una nueva. Existe una línea de tiempo histórica.
7. **Trazabilidad completa.** El sistema conserva quién creó o modificó cada información y cuándo lo hizo.
8. **La agenda, las citas, los recordatorios y las fichas están vinculados.**
9. **Google Calendar es una vista temporal, no la base.**

### 8.3 Principios de operación

10. **Control humano sobre las automatizaciones.** Toda automatización puede ser revisada, editada, pospuesta o cancelada por un empleado.
11. **Facilidad de uso primero.** El sistema se diseña para personas sin experiencia tecnológica.

### 8.4 Principios de rigor del análisis

12. **No inventar procedimientos.** No se define ningún procedimiento médico, clínico o comercial que no haya sido descrito por Proaudio.
13. **Los vacíos se registran, no se rellenan.** Cuando falta información, se abre una decisión pendiente.
14. **Datos ficticios únicamente.** No se usa información real de pacientes en ningún ejemplo, prototipo o documento.
15. **Las inferencias se declaran como tales.** Nunca se presenta una inferencia como hecho confirmado.

---

## 9. Riesgos principales

| # | Riesgo | Probabilidad *(estimada)* | Impacto | Señal temprana de alerta | Mitigación propuesta |
|---|---|---|---|---|---|
| R-01 | **Doble digitación.** El equipo mantiene el papel y el sistema en paralelo indefinidamente, duplicando trabajo | Alta | Alto | El personal sigue anotando primero en papel después de 4 semanas | Definir desde el inicio qué deja de escribirse en papel; medir tiempo de registro; no exigir campos que no aportan valor inmediato |
| R-02 | **Rechazo del equipo.** El sistema se percibe como control o carga adicional | Alta | Muy alto | Baja frecuencia de uso, campos vacíos, quejas informales | Involucrar a audiólogas y recepcionistas desde el prototipo; presentar el sistema como ayuda, no como supervisión; una persona referente por rol |
| R-03 | **Sobrealcance del prototipo.** Se intenta construir todo lo listado en el encargo desde el inicio | Alta | Alto | El backlog de Fase 1 crece con funciones de Fase 5 o 6 | Regla escrita: toda función nueva entra al backlog con fase asignada, no al prototipo |
| R-04 | **Migración masiva prematura.** Se intenta digitalizar el archivo completo antes de tener el sistema estable | Media | Muy alto | Se contrata personal de digitalización antes de terminar la Fase 2 | Estrategia por olas del Documento 7; la digitalización masiva es Fase 4 |
| R-05 | **Fichas duplicadas.** El mismo paciente se registra dos o más veces | Alta | Alto | Búsquedas que devuelven nombres similares con datos parciales | Definir regla de identificación única (D-01); buscador con coincidencias aproximadas; función de fusión con trazabilidad |
| R-06 | **Datos de salud sin marco de protección.** Se registra información sensible sin política definida | Media | Muy alto | Documentos clínicos cargados sin restricción de acceso | Definir política de protección de datos antes de la Fase 2 (D-11); marcar campos sensibles en el diccionario |
| R-07 | **Desincronización con Google Calendar.** Dos agendas con información distinta | Alta | Alto | Citas que existen en un lado y no en el otro | Definir una única fuente de verdad (D-06); si hay duda, el sistema manda |
| R-08 | **Mensajes automáticos mal enviados.** Recordatorio a paciente equivocado, en horario inadecuado o a paciente fallecido | Media | Muy alto | Quejas de pacientes; mensajes rebotados | Fase 3 con aprobación humana previa obligatoria; lista de exclusión; ventana horaria; ver Documento 6 |
| R-09 | **Vaguedad en las categorías S+, A, B.** Se usan sin criterio compartido | Alta | Medio | Dos personas clasifican distinto al mismo paciente | Documentar el criterio real antes de implementarlo (D-04); si no hay criterio, no se implementa la clasificación automática |
| R-10 | **Pérdida del archivo físico durante la digitalización.** Carpetas que salen del archivo y no vuelven | Media | Alto | Fichas marcadas "en digitalización" por más de X días | Registro de ubicación física obligatorio **[C]**; control de préstamo con responsable y fecha |
| R-11 | **Dependencia de una sola persona del proyecto.** El conocimiento queda en quien lidera | Media | Alto | Solo una persona sabe cómo funciona el sistema | Documentación viva (estos documentos); segunda persona formada |
| R-12 | **Expectativa de resultados inmediatos.** Se espera reducción de abandono en semanas | Media | Medio | Preguntas gerenciales por resultados antes de tener datos | Comunicar desde ahora que los indicadores requieren meses de datos acumulados |
| R-13 | **Campos que nadie llena.** Se diseñan campos que en la práctica quedan vacíos | Alta | Medio | Reportes con alta proporción de vacíos | Mínimo obligatorio muy corto; el resto opcional; revisar uso real a las 4 semanas |
| R-14 | **Interrupción del servicio durante la transición.** La operación diaria se ve afectada | Baja | Muy alto | Retrasos en la atención el día de la puesta en marcha | Puesta en marcha por partes; el papel se mantiene como respaldo durante la transición |

---

## 10. Elementos expresamente excluidos de la primera versión

Los siguientes elementos **quedan fuera** del prototipo y del MVP. Se listan de forma explícita para evitar malentendidos de alcance.

### 10.1 Excluido por instrucción directa del encargo **[C]**

- Escritura de código de cualquier tipo.
- Conexión a Supabase o cualquier base de datos.
- Integración con Google Calendar.
- Integración con WhatsApp.
- Integración con correo electrónico.
- Cualquier otra plataforma externa.
- Propuesta de aplicación definitiva.
- Diseño de base de datos técnica, tablas SQL, APIs o frameworks.
- Uso de información real de pacientes.

### 10.2 Excluido del prototipo (Fase 1) por decisión de alcance

- Guardado real de información (el prototipo usa datos ficticios fijos).
- Inicio de sesión y gestión de contraseñas.
- Envío real de mensajes por cualquier canal.
- Cálculo de indicadores o gráficos.
- Facturación, cobros, precios o cualquier función económica.
- Inventario y control de stock.
- Flujo completo de taller de reparaciones.
- Firma digital o consentimientos electrónicos.
- Aplicación móvil nativa.
- Reportes exportables.

### 10.3 Excluido del MVP (Fase 2)

- Envío automático de mensajes al paciente (es Fase 3).
- Digitalización masiva del archivo histórico (es Fase 4).
- Módulo económico y de inventario (es Fase 5).
- Tableros gerenciales e indicadores (es Fase 6).
- Portal para pacientes o autoagendamiento (sin fase asignada; **[V]** no ha sido solicitado).
- Historia clínica electrónica completa con estándares clínicos formales (**[V]** no ha sido solicitado; requiere validación regulatoria).

### 10.4 Excluido de todo el proyecto hasta nueva instrucción

- Cualquier procedimiento clínico, médico o comercial no descrito por Proaudio **[C, principio 6]**.
- Diagnóstico automático o interpretación automática de audiometrías.
- Recomendación automática de equipos o tratamientos.

---

## 11. Qué se necesita para avanzar

Este documento **no puede convertirse en especificación definitiva** sin resolver, como mínimo:

1. La regla de identificación única del paciente (D-01).
2. El catálogo real de motivos de cita (D-02).
3. El significado real de las categorías S+, A, B (D-04).
4. La política de protección de datos de salud (D-11).
5. La relación definitiva con Google Calendar (D-06).

*Ver Documento 10 para el registro completo de decisiones pendientes y Documento 8 para las preguntas de validación.*

---

## Anexo — Declaración de origen de la información de este documento

| Sección | Confirmado | Inferido | Pendiente |
|---|---|---|---|
| Problema actual | Situación y herramientas actuales | Consecuencias operativas | Magnitud y cifras |
| Objetivo general | Dirección estratégica | Redacción del enunciado | Metas numéricas |
| Objetivos específicos | Principios que los originan | Formulación e indicadores | Valores objetivo |
| Usuarios | Los 5 roles y su nivel tecnológico prioritario | Frecuencia de uso | Cantidad de personas, roles adicionales |
| Beneficios | Que se busca reducir la pérdida de pacientes | Beneficios operativos concretos | Cuantificación |
| Alcance inicial | Lista de funcionalidades deseadas | Asignación a fases | Confirmación de prioridades |
| Alcance futuro | Lista completa de necesidades futuras | Orden entre ellas | Prioridad relativa |
| Principios | Los 15 principios íntegros | — | — |
| Riesgos | — | Todos los riesgos y su valoración | Validación con el equipo |
| Exclusiones | Exclusiones por instrucción | Exclusiones por alcance | Confirmación de gerencia |
