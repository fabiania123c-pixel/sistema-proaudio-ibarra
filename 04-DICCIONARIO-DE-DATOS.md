# Documento 4 — Diccionario preliminar de datos

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (borrador funcional para validación)
**Fecha:** 1 de agosto de 2026

---

## Cómo leer este documento

Este documento describe **qué información necesita el sistema**, en lenguaje comprensible. **No es un diseño de base de datos.** No se definen tablas, claves, tipos técnicos ni relaciones técnicas. Eso corresponde a una etapa posterior.

### Clasificación por fase — el criterio más importante

| Clasificación | Significado | Regla práctica |
|---|---|---|
| **PROTOTIPO** | Mínimo para el primer prototipo visual | Aparece en pantalla con datos ficticios. Sin guardado real |
| **MVP** | Necesario para que el sistema sirva en la operación diaria | Se captura y se guarda de verdad desde la Fase 2 |
| **FUTURO** | Se contempla ahora para no rehacer después, pero se construye más adelante | Fases 3 a 6 |
| **VALIDAR** | No puede clasificarse hasta que Proaudio responda una pregunta | Bloqueado |

> **Advertencia central:** que un campo aparezca en este documento **no significa que deba construirse ahora**. El diccionario es exhaustivo a propósito, para anticipar la estructura. El prototipo usa una fracción mínima.

### Otras columnas

- **Tipo:** descripción aproximada del dato (texto, fecha, número, lista de opciones, sí/no, archivo, referencia a otra ficha).
- **Oblig.:** ● obligatorio · ○ opcional · ◐ obligatorio solo en ciertos casos.
- **Registra:** quién ingresa el dato. "Sistema" = generado automáticamente.
- **Sens.:** 🔴 dato sensible de salud · 🟡 dato personal identificable · ⚪ no sensible.

### Regla de oro del diseño

**Cuantos menos campos obligatorios, más se usará el sistema.** El riesgo R-13 (campos que nadie llena) es real. Por eso el mínimo obligatorio propuesto para crear un paciente son **tres campos**.

---

## Índice de entidades

| # | Entidad | Fase de aparición | Rol en el sistema |
|---|---|---|---|
| 1 | Paciente | Prototipo | **Entidad central** **[C]** |
| 2 | Cita | Prototipo | Núcleo de la agenda |
| 3 | Atención | Prototipo | Registro de lo realizado |
| 4 | Profesional | Prototipo | Quién atiende |
| 5 | Sucursal | Prototipo | Dónde se atiende |
| 6 | Audífono | MVP | Equipo del paciente |
| 7 | Garantía | MVP | Cobertura del equipo |
| 8 | Audiometría | MVP | Examen auditivo |
| 9 | Reparación | Futuro (F5) | Servicio técnico |
| 10 | Documento | Prototipo | Archivo digitalizado |
| 11 | Recordatorio | Prototipo | Seguimiento programado |
| 12 | Comunicación | MVP / F3 | Contacto con el paciente |
| 13 | Referido | MVP | Origen del paciente |
| 14 | Categoría de cliente | MVP | Clasificación S+, A, B |
| 15 | Tarea interna | Prototipo | Trabajo del equipo |
| 16 | Historial de cambios | MVP | Trazabilidad **[C]** |

---

# 1. PACIENTE

**[C]** La ficha del paciente es la fuente central de información del sistema.

### 1.1 Identificación

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de paciente | Identificador interno visible | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Nombres | Nombres del paciente | Texto | ● | Recepción / Audióloga | PROTOTIPO | 🟡 |
| Apellidos | Apellidos del paciente | Texto | ● | Recepción / Audióloga | PROTOTIPO | 🟡 |
| Cédula o documento | Documento de identidad | Texto corto | ◐ | Recepción | **VALIDAR** | 🟡 |
| Número de ficha física | Número de la carpeta en el archivo | Texto corto | ○ | Recepción | MVP | ⚪ |

**Preguntas a resolver antes de implementar:**

- **¿Cuál es el identificador único real del paciente?** ¿Cédula, número de ficha, combinación de nombre y teléfono? Sin esta respuesta no se puede prevenir duplicados. → **D-01**
- ¿Todos los pacientes tienen cédula? ¿Qué pasa con menores de edad, extranjeros o pacientes cuyo familiar gestiona la cita?
- ¿El código de paciente debe coincidir con el número de ficha física existente, o es nuevo?
- ¿Los números de ficha se repiten entre sucursales o entre años?

### 1.2 Contacto

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Teléfono principal | Número de contacto principal | Texto corto | ● | Recepción | PROTOTIPO | 🟡 |
| Teléfono secundario | Número alternativo | Texto corto | ○ | Recepción | MVP | 🟡 |
| ¿El teléfono tiene WhatsApp? | Si el número recibe WhatsApp | Sí/No/Desconocido | ○ | Recepción | FUTURO (F3) | ⚪ |
| Correo electrónico | Dirección de correo | Texto | ○ | Recepción | MVP | 🟡 |
| Ciudad de procedencia | Ciudad de donde viene el paciente **[C]** | Lista + texto libre | ○ | Recepción | MVP | ⚪ |
| Dirección | Domicilio | Texto | ○ | Recepción | **VALIDAR** | 🟡 |
| Canal de contacto preferido | Cómo prefiere que lo contacten | Lista | ○ | Recepción | FUTURO (F3) | ⚪ |
| Horario preferido de contacto | Franja horaria conveniente | Lista | ○ | Recepción | FUTURO (F3) | ⚪ |
| Persona de contacto alternativa | Familiar o acompañante | Texto | ○ | Recepción | MVP | 🟡 |
| Relación del contacto alternativo | Parentesco o vínculo | Texto corto | ○ | Recepción | MVP | 🟡 |

**Preguntas:**

- ¿Muchos pacientes son adultos mayores contactados a través de un familiar? Esto cambia el diseño de los recordatorios: el mensaje podría dirigirse a otra persona. → **P-MSG-04**
- ¿Se guarda dirección hoy? ¿Se necesita para algo? Si no aporta valor, **no se pide** (riesgo R-13 y dato sensible innecesario).
- ¿Qué proporción de pacientes tiene correo electrónico? Determina si el canal correo vale la pena.

### 1.3 Origen y clasificación

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Cómo conoció Proaudio | Medio por el que llegó **[C]** | Lista | ○ | Recepción | MVP | ⚪ |
| Quién lo refirió | Persona o entidad que lo derivó **[C]** | Texto o referencia | ○ | Recepción | MVP | 🟡 |
| Categoría de cliente | S+, A, B u otra **[C]** | Lista configurable | ○ | **VALIDAR** | **VALIDAR** | ⚪ |
| Fecha de primera visita | Primera vez que asistió | Fecha | ○ | Sistema / Recepción | MVP | ⚪ |
| Estado del paciente | Activo, inactivo, en seguimiento, no desea contacto | Lista | ● | Sistema + Recepción | MVP | ⚪ |

**Preguntas:**

- **¿Qué significan exactamente S+, A y B?** ¿Quién asigna la categoría? ¿Con qué criterio? ¿Se puede cambiar? ¿El paciente lo sabe? → **D-04**
- ¿Qué opciones debe tener "cómo conoció Proaudio"? Debe surgir de la experiencia real, no inventarse.
- ¿A partir de cuántos meses sin visita un paciente pasa a "inactivo"? → **D-08**
- ¿Existe hoy alguna forma de marcar que un paciente **no desea ser contactado**? Es imprescindible antes de la Fase 3.

### 1.4 Asignación y ubicación

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Sucursal principal | Dónde se atiende habitualmente **[C]** | Referencia a Sucursal | ● | Recepción | PROTOTIPO | ⚪ |
| Profesional responsable | Audióloga a cargo **[C]** | Referencia a Profesional | ○ | Recepción / Audióloga | MVP | ⚪ |
| Ubicación del archivo físico | Dónde está la carpeta **[C]** | Texto | ○ | Recepción | MVP | ⚪ |
| Estado del archivo físico | En archivo, prestado, en digitalización, no ubicado | Lista | ○ | Recepción | MVP | ⚪ |
| Quién tiene la ficha física | Si está prestada | Referencia a Profesional | ○ | Recepción | MVP | ⚪ |
| Porcentaje digitalizado | Avance de digitalización **[C]** | Porcentaje | ○ | Sistema | MVP | ⚪ |

**Preguntas:**

- ¿Cómo se describe hoy la ubicación de una ficha? ¿Existe una nomenclatura (estante, caja, letra)?
- ¿Un paciente puede atenderse en varias sucursales? ¿Su ficha física se mueve? → **D-10**
- **¿Cómo se calcula el "porcentaje digitalizado"?** Requiere saber qué documentos se esperan por paciente. Si no hay una lista esperada, el porcentaje no puede calcularse y habría que reemplazarlo por un estado simple (sin digitalizar / parcial / completo). → **D-22**

### 1.5 Resumen clínico visible en la ficha

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Última atención | Fecha de la última visita | Fecha | — | Sistema | PROTOTIPO | ⚪ |
| Última indicación al paciente | Lo último que se le indicó **[C]** | Texto | — | Sistema (desde Atención) | PROTOTIPO | 🔴 |
| Próxima acción recomendada | Qué debería pasar después **[C]** | Texto + fecha | ○ | Audióloga | PROTOTIPO | 🔴 |
| Próxima cita | Fecha de la siguiente cita | Fecha | — | Sistema | PROTOTIPO | ⚪ |
| Fecha de última audiometría | Para control anual | Fecha | — | Sistema | MVP | 🔴 |
| Alertas activas | Garantía por vencer, control atrasado, etc. | Lista calculada | — | Sistema | MVP | ⚪ |
| Notas administrativas | Observaciones no clínicas | Texto | ○ | Recepción | MVP | 🟡 |

### 1.6 Datos personales adicionales

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Fecha de nacimiento | Para edad y contexto clínico | Fecha | ○ | Recepción | **VALIDAR** | 🟡 |
| Sexo / género | Si se requiere clínicamente | Lista | ○ | Recepción | **VALIDAR** | 🟡 |
| Ocupación | Actividad laboral | Texto | ○ | Recepción | **VALIDAR** | 🟡 |
| Aseguradora o convenio | Si aplica cobertura | Texto | ○ | Recepción | **VALIDAR** | 🟡 |

**Advertencia — principio 6 del proyecto:** **estos cuatro campos no fueron solicitados por Proaudio.** Se listan porque son habituales en fichas de este tipo, pero **no deben incluirse sin confirmación explícita.** Registrar datos personales que no se usan es riesgo, no beneficio. → **P-PAC-06**

### 1.7 Trazabilidad de la ficha **[C, principio 15]**

| Campo | Descripción | Tipo | Registra | Clasificación |
|---|---|---|---|---|
| Creado por | Usuario que creó la ficha | Referencia a Profesional | Sistema | MVP |
| Fecha de creación | Cuándo se creó | Fecha y hora | Sistema | MVP |
| Modificado por | Último usuario que modificó | Referencia a Profesional | Sistema | MVP |
| Fecha de última modificación | Cuándo se modificó | Fecha y hora | Sistema | MVP |

### 1.8 Mínimo absoluto para crear un paciente

> **Propuesta: tres campos.**
> **Nombres · Apellidos · Teléfono principal** (+ Sucursal, preseleccionada automáticamente)
>
> Todo lo demás se completa después, conforme el paciente regrese **[C, criterio de Proaudio]**.

---

# 2. CITA

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de cita | Identificador de la cita | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Paciente | A quién corresponde **[C]** | Referencia a Paciente | ● | Recepción | PROTOTIPO | 🟡 |
| Fecha | Día de la cita | Fecha | ● | Recepción | PROTOTIPO | ⚪ |
| Hora de inicio | Hora programada | Hora | ● | Recepción | PROTOTIPO | ⚪ |
| Duración | Minutos previstos | Número | ● | Recepción | PROTOTIPO | ⚪ |
| Profesional asignado | Quién atenderá **[C]** | Referencia a Profesional | ● | Recepción | PROTOTIPO | ⚪ |
| Sucursal | Dónde se atenderá | Referencia a Sucursal | ● | Recepción | PROTOTIPO | ⚪ |
| Motivo de la cita | Por qué viene **[C]** | Lista configurable | ● | Recepción | PROTOTIPO | 🔴 |
| Estado | Situación de la cita **[C]** | Lista | ● | Recepción / Sistema | PROTOTIPO | ⚪ |
| Notas de la cita | Observaciones previas | Texto | ○ | Recepción | PROTOTIPO | 🟡 |
| Canal de solicitud | Cómo pidió la cita (teléfono, presencial, WhatsApp) | Lista | ○ | Recepción | MVP | ⚪ |
| ¿Es primera vez? | Si es paciente nuevo | Sí/No | — | Sistema | MVP | ⚪ |
| Cita origen | Si proviene de un reagendamiento **[C]** | Referencia a Cita | ○ | Sistema | MVP | ⚪ |
| Cita de reemplazo | Si fue reagendada, cuál la sustituye | Referencia a Cita | ○ | Sistema | MVP | ⚪ |
| Motivo de cancelación | Por qué se canceló | Lista + texto | ◐ | Recepción | MVP | ⚪ |
| Motivo de reagendamiento | Por qué se movió | Lista + texto | ◐ | Recepción | MVP | ⚪ |
| ¿Confirmada por el paciente? | Si el paciente confirmó asistencia | Sí/No | ○ | Recepción | MVP | ⚪ |
| Fecha de confirmación | Cuándo confirmó | Fecha y hora | — | Sistema | MVP | ⚪ |
| Hora de llegada | Cuándo llegó realmente | Hora | ○ | Recepción | FUTURO | ⚪ |
| Hora de salida | Cuándo terminó | Hora | ○ | Recepción | FUTURO | ⚪ |
| Identificador en Google Calendar | Vínculo con el evento espejo | Texto | — | Sistema | **VALIDAR** | ⚪ |
| Creado por / Fecha de creación | Trazabilidad **[C]** | — | — | Sistema | MVP | ⚪ |
| Modificado por / Fecha de modificación | Trazabilidad **[C]** | — | — | Sistema | MVP | ⚪ |

**Estados de la cita** **[C]**: Agendada · Confirmada · Completada · No atendida · Cancelada · Reagendada.

**Preguntas:**

- **¿Cuál es la lista real de motivos de cita?** No se inventa. Debe salir de la práctica de Proaudio. → **D-02**
- ¿Cuánto dura cada tipo de cita? ¿La duración es fija por motivo?
- ¿Una cita puede tener más de un motivo?
- ¿Puede haber citas sin paciente identificado (por ejemplo, alguien que solo consulta)?
- ¿Puede una cita tener más de un profesional?
- ¿Se necesita un estado intermedio "en sala" o "en atención"? → **P-AGE-09**
- ¿Quién puede cancelar y con cuánta anticipación? → **D-07**
- ¿Qué se considera "no atendida"? ¿Llegar tarde cuenta como inasistencia?

---

# 3. ATENCIÓN

Registro de lo realizado durante una cita. **[C, principio 13]** Ninguna observación anterior se borra al escribir una nueva.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de atención | Identificador | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Cita asociada | De qué cita proviene | Referencia a Cita | ◐ | Sistema | PROTOTIPO | ⚪ |
| Paciente | A quién se atendió | Referencia a Paciente | ● | Sistema | PROTOTIPO | 🟡 |
| Fecha y hora | Cuándo ocurrió | Fecha y hora | ● | Sistema | PROTOTIPO | ⚪ |
| Profesional que atendió | Quién atendió realmente **[C]** | Referencia a Profesional | ● | Sistema / Audióloga | PROTOTIPO | ⚪ |
| Sucursal | Dónde se atendió | Referencia a Sucursal | ● | Sistema | PROTOTIPO | ⚪ |
| Tipo de atención | Qué se hizo | Lista configurable | ● | Audióloga | **VALIDAR** | 🔴 |
| Observación de la atención | Qué ocurrió, en texto libre **[C]** | Texto largo | ● | Audióloga | PROTOTIPO | 🔴 |
| Indicación al paciente | Qué se le dijo que hiciera **[C]** | Texto | ○ | Audióloga | PROTOTIPO | 🔴 |
| Próxima acción recomendada | Qué debería pasar después **[C]** | Texto + fecha sugerida | ○ | Audióloga | PROTOTIPO | 🔴 |
| Audífono relacionado | Si la atención involucró un equipo | Referencia a Audífono | ○ | Audióloga | MVP | ⚪ |
| Audiometría realizada | Si se hizo examen | Referencia a Audiometría | ○ | Audióloga | MVP | 🔴 |
| Documentos adjuntos | Archivos de esta atención | Lista de Documentos | ○ | Audióloga | MVP | 🔴 |
| ¿Requiere seguimiento? | Si genera un recordatorio | Sí/No | ○ | Audióloga | MVP | ⚪ |
| Estado del registro | Vigente, corregido, anulado | Lista | ● | Sistema | MVP | ⚪ |
| Aclaración posterior | Texto agregado después, sin borrar el original | Texto | ○ | Audióloga | MVP | 🔴 |
| Creado por / Fecha de creación | Trazabilidad **[C]** | — | — | Sistema | MVP | ⚪ |

**Preguntas:**

- **¿Cuáles son los tipos de atención reales?** No se inventan procedimientos **[C, principio 6]**. La lista debe darla Proaudio. → **D-23**
- ¿La observación debería tener secciones fijas o ser texto libre? El texto libre es más rápido de escribir pero imposible de medir. Recomendación: empezar con texto libre + un campo de tipo, y estructurar después con base en el uso real.
- ¿Puede haber una atención sin cita previa (paciente que llega sin agendar)? **Propuesta: sí.**
- ¿Puede una atención involucrar a más de un profesional?
- ¿Cuánto tiempo puede una audióloga corregir su propio registro? → **D-20**

---

# 4. PROFESIONAL

Persona que trabaja en Proaudio y usa el sistema.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de profesional | Identificador | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Nombre completo | Nombre de la persona | Texto | ● | Administrador | PROTOTIPO | 🟡 |
| Nombre corto | Cómo aparece en la agenda | Texto corto | ● | Administrador | PROTOTIPO | ⚪ |
| Rol | Audióloga, recepcionista, admin, gerencia, soporte | Lista | ● | Administrador | PROTOTIPO | ⚪ |
| Sucursal principal | Dónde trabaja | Referencia a Sucursal | ● | Administrador | PROTOTIPO | ⚪ |
| Otras sucursales | Si atiende en varias | Lista de Sucursales | ○ | Administrador | MVP | ⚪ |
| Estado | Activo o inactivo | Lista | ● | Administrador | MVP | ⚪ |
| Correo de trabajo | Para avisos internos | Texto | ○ | Administrador | MVP | 🟡 |
| Teléfono de trabajo | Contacto interno | Texto corto | ○ | Administrador | MVP | 🟡 |
| Color en la agenda | Para distinguir visualmente | Color | ○ | Administrador | PROTOTIPO | ⚪ |
| Horario de atención | Días y horas disponibles | Estructura de horarios | ○ | Administrador | MVP | ⚪ |
| ¿Atiende pacientes? | Si aparece como opción al agendar | Sí/No | ● | Administrador | PROTOTIPO | ⚪ |
| Fecha de ingreso | Cuándo se incorporó | Fecha | ○ | Administrador | FUTURO (F6) | 🟡 |

**Preguntas:**

- ¿Cuántas personas hay y con qué roles? → **P-ROL-01**
- ¿Una persona puede tener varios roles? → **D-13**
- ¿Los horarios varían por semana? ¿Hay profesionales que viajan entre sucursales?
- ¿Qué se hace cuando una persona sale de la empresa? **Propuesta: se desactiva, nunca se borra**, porque su nombre debe seguir apareciendo en el historial **[C, principio 15]**.
- **Nota:** este documento **no incluye datos laborales** (salario, contrato, evaluaciones). No fueron solicitados y son información sensible.

---

# 5. SUCURSAL

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de sucursal | Identificador | Texto corto | ● | Administrador | PROTOTIPO | ⚪ |
| Nombre | Nombre visible | Texto | ● | Administrador | PROTOTIPO | ⚪ |
| Ciudad | Dónde está ubicada | Texto | ● | Administrador | PROTOTIPO | ⚪ |
| Dirección | Ubicación física | Texto | ○ | Administrador | MVP | ⚪ |
| Teléfono | Contacto de la sucursal | Texto corto | ○ | Administrador | MVP | ⚪ |
| Horario de atención | Días y horas de apertura | Estructura de horarios | ○ | Administrador | MVP | ⚪ |
| Estado | Activa o inactiva | Lista | ● | Administrador | MVP | ⚪ |
| ¿Tiene archivo físico propio? | Si guarda fichas | Sí/No | ○ | Administrador | MVP | ⚪ |

**Preguntas:**

- **¿Cuántas sucursales existen y dónde?** → **D-10**
- ¿Cada sucursal tiene su propio archivo físico o hay uno central?
- ¿Se atiende en localidades sin sucursal fija (visitas periódicas a otras ciudades)? Esto cambiaría el diseño de la agenda.
- ¿Los pacientes se atienden siempre en la misma sucursal?

---

# 6. AUDÍFONO

**[C]** Se debe registrar marca, modelo, oído y número de serie.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de equipo | Identificador interno | Texto corto | ● | Sistema | MVP | ⚪ |
| Paciente | De quién es el equipo | Referencia a Paciente | ● | Audióloga | MVP | 🟡 |
| Marca | Fabricante **[C]** | Lista configurable | ● | Audióloga | MVP | ⚪ |
| Modelo | Modelo del equipo **[C]** | Texto / lista | ● | Audióloga | MVP | ⚪ |
| Oído | Derecho, izquierdo, ambos **[C]** | Lista | ● | Audióloga | MVP | 🔴 |
| Número de serie | Serie del equipo **[C]** | Texto corto | ● | Audióloga | MVP | ⚪ |
| Fecha de entrega | Cuándo se entregó | Fecha | ● | Audióloga | MVP | ⚪ |
| Estado del equipo | En uso, en reparación, devuelto, dado de baja | Lista | ● | Audióloga | MVP | ⚪ |
| Fecha de adaptación | Cuándo se adaptó | Fecha | ○ | Audióloga | MVP | 🔴 |
| Tipo de equipo | Categoría (según catálogo de Proaudio) | Lista | ○ | Audióloga | **VALIDAR** | ⚪ |
| Garantía asociada | Cobertura del equipo | Referencia a Garantía | ○ | Audióloga | MVP | ⚪ |
| Observaciones del equipo | Notas técnicas | Texto | ○ | Audióloga | MVP | ⚪ |
| Fecha de baja | Si dejó de usarse | Fecha | ○ | Audióloga | MVP | ⚪ |
| Motivo de baja | Por qué dejó de usarse | Lista + texto | ○ | Audióloga | MVP | ⚪ |
| Precio de venta | Valor cobrado | Número | ○ | **VALIDAR** | FUTURO (F5/F6) | 🟡 |
| Costo de adquisición | Costo para Proaudio | Número | ○ | **VALIDAR** | FUTURO (F5/F6) | 🟡 |
| Proveedor | De quién se compró | Texto / referencia | ○ | Administrador | FUTURO (F5) | ⚪ |

**Preguntas:**

- ¿Qué marcas se manejan? La lista debe salir de Proaudio.
- ¿Un paciente puede tener dos equipos (uno por oído) registrados por separado o como una sola unidad? **Esto afecta el diseño.** → **P-AUD-03**
- ¿Se registra el historial completo de equipos de un paciente, incluidos los antiguos? **Propuesta: sí** — es información valiosa.
- ¿Existen equipos de prueba o préstamo?
- ¿Se registra la programación o configuración del equipo? **No se asume nada; requiere confirmación.**
- ¿La información de precios entra al sistema o se maneja aparte (facturación)? → **D-24**

---

# 7. GARANTÍA

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de garantía | Identificador | Texto corto | ● | Sistema | MVP | ⚪ |
| Paciente | Titular | Referencia a Paciente | ● | Sistema | MVP | 🟡 |
| Audífono o servicio cubierto | Qué cubre | Referencia a Audífono / Reparación | ● | Audióloga | MVP | ⚪ |
| Tipo de garantía | Fabricante, Proaudio, de reparación | Lista | ● | Audióloga | **VALIDAR** | ⚪ |
| Fecha de inicio | Desde cuándo rige | Fecha | ● | Audióloga | MVP | ⚪ |
| Duración | Cuánto dura | Número + unidad | ● | Audióloga | **VALIDAR** | ⚪ |
| Fecha de vencimiento | Hasta cuándo rige | Fecha | ● | Sistema (calculada) | MVP | ⚪ |
| Estado | Vigente, por vencer, vencida, usada | Lista | ● | Sistema | MVP | ⚪ |
| Qué cubre | Alcance de la cobertura | Texto | ○ | Audióloga | **VALIDAR** | ⚪ |
| Documento de respaldo | Certificado o factura | Referencia a Documento | ○ | Recepción | MVP | ⚪ |
| Días de aviso anticipado | Con cuánta anticipación avisar | Número | ○ | Administrador | MVP | ⚪ |
| Observaciones | Notas | Texto | ○ | Audióloga | MVP | ⚪ |

**Preguntas — bloqueantes:**

- **¿Cuánto dura cada garantía?** ¿Depende de la marca, del modelo, del tipo de servicio? **Sin esta respuesta el aviso automático no puede construirse.** → **D-05**
- **¿Desde qué fecha corre**: compra, entrega o adaptación?
- ¿Qué cubre y qué no? ¿Se registra o basta con el documento adjunto?
- ¿Existe garantía sobre reparaciones? ¿De cuánto tiempo?
- ¿Con cuánta anticipación se debería avisar de un vencimiento? ¿30, 60, 90 días?
- ¿Una garantía puede extenderse o renovarse?
- ¿Qué pasa cuando el paciente usa la garantía? ¿Se agota o continúa?

---

# 8. AUDIOMETRÍA

**[C]** La ficha debe permitir consultar audiometrías anteriores.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de audiometría | Identificador | Texto corto | ● | Sistema | MVP | ⚪ |
| Paciente | A quién corresponde | Referencia a Paciente | ● | Sistema | MVP | 🟡 |
| Fecha de realización | Cuándo se hizo | Fecha | ● | Audióloga | MVP | 🔴 |
| Profesional que la realizó | Quién la hizo | Referencia a Profesional | ● | Sistema | MVP | ⚪ |
| Sucursal | Dónde se hizo | Referencia a Sucursal | ● | Sistema | MVP | ⚪ |
| Atención asociada | En qué visita se realizó | Referencia a Atención | ○ | Sistema | MVP | ⚪ |
| Documento del resultado | Archivo o imagen del resultado | Referencia a Documento | ● | Audióloga | MVP | 🔴 |
| Observaciones | Comentario de la profesional | Texto | ○ | Audióloga | MVP | 🔴 |
| Motivo del examen | Por qué se realizó | Lista | ○ | Audióloga | **VALIDAR** | 🔴 |
| Equipo utilizado | Con qué audiómetro | Texto | ○ | Audióloga | FUTURO | ⚪ |
| Fecha sugerida del próximo control | Para el aviso anual | Fecha | ○ | Audióloga / Sistema | MVP | ⚪ |

### Advertencia importante sobre valores audiométricos

**[C, principio 6] Este documento NO define campos para los valores numéricos de la audiometría** (umbrales por frecuencia, vía aérea, vía ósea, discriminación, tipo o grado de pérdida). Hacerlo implicaría inventar una estructura clínica que Proaudio no ha descrito.

**Propuesta para el MVP:** guardar la audiometría **como documento adjunto** (imagen o PDF) más la observación de la audióloga. Es suficiente para consultar el historial y no exige decisiones clínicas prematuras.

**Estructurar los valores numéricos** —lo que permitiría comparar audiometrías en el tiempo y graficar la evolución— es una funcionalidad **futura** que requiere:

1. Que Proaudio defina exactamente qué valores registra hoy.
2. Ver el formato real que produce el equipo de audiometría.
3. Saber si el equipo puede exportar datos digitalmente.

→ **D-25 y P-AUM-01 a P-AUM-05**

---

# 9. REPARACIÓN — Fase 5

**[C]** La empresa repara audífonos y la ficha debe permitir consultar reparaciones. **El proceso de reparación no fue descrito, por lo que los campos siguientes son una propuesta mínima y deben validarse en su totalidad.**

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de reparación | Identificador / número de orden | Texto corto | ● | Sistema | FUTURO (F5) | ⚪ |
| Paciente | De quién es el equipo | Referencia a Paciente | ● | Recepción | FUTURO (F5) | 🟡 |
| Audífono | Equipo a reparar | Referencia a Audífono | ● | Recepción | FUTURO (F5) | ⚪ |
| Fecha de recepción | Cuándo ingresó | Fecha | ● | Recepción | FUTURO (F5) | ⚪ |
| Recibido por | Quién lo recibió | Referencia a Profesional | ● | Sistema | FUTURO (F5) | ⚪ |
| Problema reportado | Qué dice el paciente | Texto | ● | Recepción | FUTURO (F5) | ⚪ |
| Diagnóstico | Qué se encontró | Texto | ○ | **VALIDAR** | FUTURO (F5) | ⚪ |
| Estado | Recibido, en diagnóstico, en reparación, listo, entregado | Lista | ● | **VALIDAR** | FUTURO (F5) | ⚪ |
| ¿Se repara internamente o se envía? | Ubicación de la reparación | Lista | ○ | **VALIDAR** | FUTURO (F5) | ⚪ |
| Fecha estimada de entrega | Compromiso con el paciente | Fecha | ○ | Recepción | FUTURO (F5) | ⚪ |
| Fecha real de entrega | Cuándo se devolvió | Fecha | ○ | Recepción | FUTURO (F5) | ⚪ |
| ¿Cubierta por garantía? | Si aplica cobertura | Sí/No | ○ | **VALIDAR** | FUTURO (F5) | ⚪ |
| Repuestos utilizados | Piezas empleadas | Lista | ○ | **VALIDAR** | FUTURO (F5) | ⚪ |
| Costo de la reparación | Valor cobrado | Número | ○ | **VALIDAR** | FUTURO (F5/F6) | 🟡 |
| ¿Se prestó equipo de reemplazo? | Si el paciente recibió otro equipo | Sí/No | ○ | Recepción | FUTURO (F5) | ⚪ |
| Observaciones | Notas | Texto | ○ | **VALIDAR** | FUTURO (F5) | ⚪ |

**Todos los campos de esta entidad requieren validación.** Ver preguntas del bloque "Reparaciones" en el Documento 8.

---

# 10. DOCUMENTO

Archivo digitalizado asociado a un paciente. **[C]** Se deben poder cargar imágenes o documentos de la cartilla física y resultados de exámenes.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de documento | Identificador | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Paciente | A quién pertenece | Referencia a Paciente | ● | Quien carga | PROTOTIPO | 🟡 |
| Tipo de documento | Cartilla, audiometría, garantía, factura, examen, otro | Lista configurable | ● | Quien carga | PROTOTIPO | ⚪ |
| Título o descripción | Nombre comprensible | Texto | ● | Quien carga | PROTOTIPO | ⚪ |
| Archivo | La imagen o PDF | Archivo | ● | Quien carga | PROTOTIPO | 🔴 |
| Fecha del documento | Fecha del contenido, no de la carga | Fecha | ○ | Quien carga | MVP | ⚪ |
| Fecha de carga | Cuándo se subió al sistema | Fecha y hora | — | Sistema | MVP | ⚪ |
| Cargado por | Quién lo subió **[C]** | Referencia a Profesional | — | Sistema | MVP | ⚪ |
| Atención asociada | De qué visita proviene | Referencia a Atención | ○ | Quien carga | MVP | ⚪ |
| Origen | Digitalización histórica o generado ahora | Lista | ○ | Sistema | MVP (F4) | ⚪ |
| Estado | Vigente, marcado como erróneo, reemplazado | Lista | ● | Sistema | MVP | ⚪ |
| Documento que reemplaza | Si sustituye a otro | Referencia a Documento | ○ | Quien carga | MVP | ⚪ |
| ¿Validado por una persona? | Si alguien confirmó que corresponde | Sí/No | ○ | Quien valida | MVP (F4) | ⚪ |
| Validado por | Quién lo confirmó | Referencia a Profesional | ○ | Sistema | MVP (F4) | ⚪ |
| Observaciones | Notas sobre el documento | Texto | ○ | Quien carga | MVP | ⚪ |

**Preguntas:**

- ¿Qué tipos de documento existen realmente en las fichas físicas? La lista debe surgir de una revisión del archivo.
- ¿Qué formatos se aceptarán? ¿Fotos desde el teléfono?
- ¿Hay límite de tamaño o cantidad por paciente?
- ¿Cuánto tiempo deben conservarse los documentos? ¿Existe obligación legal? → **D-11**
- **Los documentos no se eliminan** **[C, principio 13]**. Solo se marcan como erróneos o reemplazados.

---

# 11. RECORDATORIO

**[C]** Debe existir la posibilidad de crear recordatorios automáticos o manuales, registrar su estado y editar su fecha y contenido. Toda automatización debe poder revisarse, editarse, posponerse o cancelarse por un empleado.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de recordatorio | Identificador | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Tipo de recordatorio | Cuál de los tipos definidos **[C]** | Lista | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Paciente | A quién se refiere | Referencia a Paciente | ● | Sistema / Usuario | PROTOTIPO | 🟡 |
| Cita asociada | Si deriva de una cita | Referencia a Cita | ○ | Sistema | PROTOTIPO | ⚪ |
| Destinatario | Paciente o miembro del equipo | Lista | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Responsable humano | Quién debe ocuparse **[C, principio 14]** | Referencia a Profesional | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Fecha prevista | Cuándo debe ejecutarse | Fecha | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Hora prevista | Hora de ejecución | Hora | ○ | Sistema / Usuario | MVP | ⚪ |
| Origen | Automático o manual **[C]** | Lista | ● | Sistema | PROTOTIPO | ⚪ |
| Regla que lo generó | Qué automatización lo creó | Referencia a regla | ○ | Sistema | MVP | ⚪ |
| Contenido / mensaje | Texto editable **[C]** | Texto | ● | Sistema / Usuario | PROTOTIPO | 🟡 |
| Canal previsto | Interno, llamada, WhatsApp, correo | Lista | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Estado | Situación actual **[C]** | Lista | ● | Sistema / Usuario | PROTOTIPO | ⚪ |
| Prioridad | Alta, normal, baja | Lista | ○ | Usuario | MVP | ⚪ |
| Resultado | Qué pasó al ejecutarlo | Lista + texto | ○ | Usuario | MVP | 🟡 |
| Fecha de ejecución | Cuándo se atendió | Fecha y hora | — | Sistema | MVP | ⚪ |
| Ejecutado por | Quién lo atendió | Referencia a Profesional | — | Sistema | MVP | ⚪ |
| Veces pospuesto | Cuántas veces se movió | Número | — | Sistema | MVP | ⚪ |
| Motivo de cancelación | Por qué se canceló | Texto | ◐ | Usuario | MVP | ⚪ |
| ¿Requiere aprobación previa? | Si necesita revisión humana antes de enviarse | Sí/No | ● | Sistema | FUTURO (F3) | ⚪ |
| Aprobado por | Quién autorizó el envío | Referencia a Profesional | ○ | Sistema | FUTURO (F3) | ⚪ |
| Creado por / Fecha de creación | Trazabilidad **[C]** | — | — | Sistema | MVP | ⚪ |

**Estados propuestos:** Pendiente · Programado · Listo para enviar · En espera de aprobación · Ejecutado · Pospuesto · Cancelado · Fallido · Sin respuesta.

**Preguntas:**

- ¿Con cuánta anticipación debe avisarse cada tipo de recordatorio? → **D-03**
- ¿Cuántas veces se puede posponer un recordatorio antes de que escale?
- ¿Qué pasa con un recordatorio que nadie atiende? ¿Escala a otra persona?
- ¿Puede un recordatorio dirigirse a un familiar en lugar del paciente?

---

# 12. COMUNICACIÓN

Registro de todo contacto con el paciente. **[C]** La ficha debe permitir consultar mensajes, correos y llamadas.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de comunicación | Identificador | Texto corto | ● | Sistema | MVP | ⚪ |
| Paciente | Con quién se comunicó | Referencia a Paciente | ● | Sistema | MVP | 🟡 |
| Fecha y hora | Cuándo ocurrió | Fecha y hora | ● | Sistema / Usuario | MVP | ⚪ |
| Canal | Llamada, WhatsApp, correo, presencial, mensaje de texto | Lista | ● | Usuario | MVP | ⚪ |
| Dirección | Saliente (nosotros al paciente) o entrante | Lista | ● | Usuario | MVP | ⚪ |
| Motivo | Por qué se contactó | Lista | ● | Usuario | MVP | 🟡 |
| Contenido o resumen | Qué se dijo | Texto | ○ | Usuario | MVP | 🟡 |
| Resultado | Contactado, no contesta, número equivocado, reagendó, rechazó | Lista | ● | Usuario | MVP | 🟡 |
| Realizado por | Quién hizo el contacto | Referencia a Profesional | ● | Sistema | MVP | ⚪ |
| Recordatorio asociado | De qué recordatorio proviene | Referencia a Recordatorio | ○ | Sistema | MVP | ⚪ |
| ¿Fue automático? | Enviado por el sistema o por una persona | Sí/No | ● | Sistema | FUTURO (F3) | ⚪ |
| Plantilla utilizada | Qué mensaje se usó | Referencia a plantilla | ○ | Sistema | FUTURO (F3) | ⚪ |
| Estado del envío | Enviado, entregado, leído, fallido **[C]** | Lista | ○ | Sistema | FUTURO (F3) | ⚪ |
| Respuesta del paciente | Si respondió y qué dijo | Texto | ○ | Sistema / Usuario | FUTURO (F3) | 🟡 |
| Intento número | Cuántas veces se ha intentado | Número | ○ | Sistema | MVP | ⚪ |

**Preguntas:**

- ¿Se registran hoy las llamadas de alguna forma?
- ¿Cuántos intentos se hacen antes de desistir? → **D-26**
- ¿Se debe registrar el contenido completo de un WhatsApp o solo un resumen? **Implicación de privacidad relevante.**
- ¿Qué se hace si el paciente responde algo clínico por WhatsApp? Debe existir una regla clara.
- ¿El paciente puede pedir no ser contactado? **Debe existir esta opción antes de la Fase 3.** → **D-27**

---

# 13. REFERIDO

**[C]** Debe registrarse cómo conoció Proaudio y quién lo refirió.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de referido | Identificador | Texto corto | ● | Sistema | MVP | ⚪ |
| Paciente referido | Quién llegó | Referencia a Paciente | ● | Recepción | MVP | 🟡 |
| Tipo de origen | Paciente, médico, institución, publicidad, redes, otro | Lista configurable | ● | Recepción | MVP | ⚪ |
| Paciente que refirió | Si fue otro paciente | Referencia a Paciente | ○ | Recepción | MVP | 🟡 |
| Nombre del referente externo | Si no es paciente | Texto | ○ | Recepción | MVP | 🟡 |
| Institución o empresa | Si vino por convenio | Texto | ○ | Recepción | MVP | ⚪ |
| Campaña o medio | Qué anuncio o acción específica | Texto | ○ | Recepción | FUTURO (F6) | ⚪ |
| Fecha de registro | Cuándo se anotó | Fecha | — | Sistema | MVP | ⚪ |
| Observaciones | Notas | Texto | ○ | Recepción | MVP | ⚪ |

**Preguntas:**

- ¿Cuáles son los orígenes reales? La lista debe salir de la experiencia de Proaudio, no inventarse.
- ¿Existe algún reconocimiento o beneficio para quien refiere? Si lo hay, cambia el diseño.
- ¿Se hace seguimiento a los médicos o instituciones que derivan pacientes?

---

# 14. CATEGORÍA DE CLIENTE

**[C]** El paciente se clasifica como S+, A, B u otra categoría configurable.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de categoría | Identificador | Texto corto | ● | Administrador | MVP | ⚪ |
| Nombre | S+, A, B, u otra | Texto corto | ● | Administrador | MVP | ⚪ |
| Descripción | Qué significa | Texto | ● | Administrador | **VALIDAR** | ⚪ |
| Criterio de asignación | Cómo se decide | Texto | ○ | Administrador | **VALIDAR** | ⚪ |
| ¿Se asigna manual o automáticamente? | Forma de asignación | Lista | ● | Administrador | **VALIDAR** | ⚪ |
| Color o indicador visual | Cómo se muestra | Color | ○ | Administrador | MVP | ⚪ |
| Orden de prioridad | Jerarquía entre categorías | Número | ○ | Administrador | MVP | ⚪ |
| ¿Afecta el seguimiento? | Si cambia la frecuencia de contacto | Sí/No | ○ | Administrador | **VALIDAR** | ⚪ |
| Estado | Activa o inactiva | Lista | ● | Administrador | MVP | ⚪ |

**Registro histórico de categoría del paciente:**

| Campo | Descripción | Tipo | Clasificación |
|---|---|---|---|
| Paciente | A quién corresponde | Referencia | MVP |
| Categoría asignada | Cuál se le puso | Referencia a Categoría | MVP |
| Fecha de asignación | Desde cuándo | Fecha | MVP |
| Asignada por | Quién decidió | Referencia a Profesional | MVP |
| Motivo del cambio | Por qué cambió | Texto | MVP |

**Preguntas — bloqueantes:**

- **¿Qué significan S+, A y B?** ¿Volumen de compra, antigüedad, potencial, complejidad clínica, cumplimiento? **Sin esta respuesta la categoría no puede implementarse con sentido.** → **D-04**
- ¿Quién asigna la categoría?
- ¿Se puede cambiar? ¿Bajo qué condiciones?
- ¿El paciente conoce su categoría? **Si la categoría se muestra en pantalla, alguien podría verla. Considerar la implicación.**
- ¿La categoría cambia la frecuencia o el tipo de seguimiento?

---

# 15. TAREA INTERNA

Trabajo pendiente del equipo que no es un mensaje al paciente.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de tarea | Identificador | Texto corto | ● | Sistema | PROTOTIPO | ⚪ |
| Título | Qué hay que hacer | Texto | ● | Usuario / Sistema | PROTOTIPO | ⚪ |
| Descripción | Detalle | Texto | ○ | Usuario | PROTOTIPO | 🟡 |
| Paciente relacionado | Si aplica | Referencia a Paciente | ○ | Usuario | PROTOTIPO | 🟡 |
| Asignada a | Quién debe hacerla | Referencia a Profesional | ● | Usuario / Sistema | PROTOTIPO | ⚪ |
| Creada por | Quién la generó | Referencia a Profesional | ● | Sistema | MVP | ⚪ |
| Fecha límite | Para cuándo | Fecha | ○ | Usuario | PROTOTIPO | ⚪ |
| Prioridad | Alta, normal, baja | Lista | ○ | Usuario | MVP | ⚪ |
| Estado | Pendiente, en curso, completada, cancelada, pospuesta | Lista | ● | Usuario | PROTOTIPO | ⚪ |
| Origen | Manual o generada por regla | Lista | ● | Sistema | MVP | ⚪ |
| Resultado | Qué se hizo | Texto | ○ | Usuario | MVP | 🟡 |
| Fecha de cierre | Cuándo se completó | Fecha y hora | — | Sistema | MVP | ⚪ |
| Cerrada por | Quién la completó | Referencia a Profesional | — | Sistema | MVP | ⚪ |

**Preguntas:**

- ¿El equipo usa hoy alguna lista de tareas? ¿En papel, WhatsApp, memoria?
- ¿Debería una tarea poder asignarse a un grupo ("recepción") en lugar de a una persona? **Propuesta: sí**, para que no se pierda si alguien falta.

---

# 16. HISTORIAL DE CAMBIOS

**[C, principio 15]** El sistema conserva quién creó o modificó cada información y cuándo lo hizo.

| Campo | Descripción | Tipo | Oblig. | Registra | Clasificación | Sens. |
|---|---|---|---|---|---|---|
| Código de registro | Identificador | Texto corto | ● | Sistema | MVP | ⚪ |
| Fecha y hora | Cuándo ocurrió | Fecha y hora | ● | Sistema | MVP | ⚪ |
| Usuario | Quién lo hizo | Referencia a Profesional | ● | Sistema | MVP | ⚪ |
| Tipo de acción | Crear, modificar, anular, consultar, exportar | Lista | ● | Sistema | MVP | ⚪ |
| Entidad afectada | Sobre qué se actuó | Lista | ● | Sistema | MVP | ⚪ |
| Registro afectado | Cuál específicamente | Referencia | ● | Sistema | MVP | ⚪ |
| Campo modificado | Qué campo cambió | Texto | ○ | Sistema | MVP | ⚪ |
| Valor anterior | Contenido previo | Texto | ○ | Sistema | MVP | 🔴 |
| Valor nuevo | Contenido resultante | Texto | ○ | Sistema | MVP | 🔴 |
| Motivo | Por qué se hizo | Texto | ◐ | Usuario | MVP | ⚪ |
| Sucursal desde donde se actuó | Ubicación | Referencia a Sucursal | ○ | Sistema | **VALIDAR** | ⚪ |

**Regla fundamental:** **este registro no se modifica ni se elimina por ningún rol, incluido el administrador.**

**Preguntas:**

- ¿Cuánto tiempo se conserva este historial? **Propuesta: indefinidamente.**
- ¿Se registran las consultas o solo las modificaciones? → **D-14**
- **Advertencia:** el historial contiene copias de datos sensibles (valor anterior y nuevo de una observación clínica). Requiere el mismo nivel de protección que la ficha.

---

# RESUMEN — Qué se necesita en cada fase

### Prototipo (Fase 1) — datos ficticios, sin guardado real

| Entidad | Campos necesarios |
|---|---|
| Paciente | Código, nombres, apellidos, teléfono, sucursal, última atención, última indicación, próxima acción, próxima cita |
| Cita | Código, paciente, fecha, hora, duración, profesional, sucursal, motivo, estado, notas |
| Atención | Código, cita, paciente, fecha, profesional, observación, indicación, próxima acción |
| Profesional | Código, nombre, nombre corto, rol, sucursal, color, ¿atiende? |
| Sucursal | Código, nombre, ciudad |
| Documento | Código, paciente, tipo, título, archivo |
| Recordatorio | Código, tipo, paciente, destinatario, responsable, fecha, contenido, canal, estado, origen |
| Tarea interna | Código, título, paciente, asignada a, fecha límite, estado |

**Total: aproximadamente 45 campos.** Todo lo demás queda fuera del prototipo.

### MVP (Fase 2) — captura y guardado real

Se agregan las entidades Audífono, Garantía, Audiometría, Comunicación, Referido, Categoría e Historial de cambios, más los campos marcados MVP.

### Fases posteriores

| Fase | Entidades y campos que se activan |
|---|---|
| **F3 — Comunicaciones** | Campos de envío, plantillas, estados de entrega, preferencias de contacto |
| **F4 — Digitalización** | Campos de origen, validación y avance de digitalización |
| **F5 — Reparaciones** | Entidad Reparación completa, repuestos, inventario |
| **F6 — Analítica** | Campos económicos, de productividad y de campaña |

---

# Campos que NO se incluyen y por qué

| Campo omitido | Motivo |
|---|---|
| Diagnóstico clínico estructurado | No descrito por Proaudio. Inventarlo violaría el principio 6 |
| Valores numéricos de audiometría | Requiere ver el formato real del equipo. → D-25 |
| Tipo y grado de pérdida auditiva | Decisión clínica no descrita |
| Medicación, antecedentes médicos | No solicitado. Dato sensible sin justificación de uso |
| Datos de facturación y pagos | No solicitado en esta etapa. → D-24 |
| Datos laborales del personal | No solicitado. Sensible |
| Consentimientos y firmas | No descrito. Puede ser necesario legalmente. → D-11 |

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Las 16 entidades solicitadas | **Confirmado** (lista dada por Proaudio) |
| Campos citados textualmente en el encargo (marca, modelo, oído, serie, ciudad, referido, sucursal, categoría, porcentaje digitalizado, ubicación física, etc.) | **Confirmado como necesidad** |
| Los estados de cita | **Confirmado** |
| Trazabilidad y no borrado | **Confirmado** |
| **Todos los demás campos y su clasificación por fase** | **Propuesta del analista** |
| Listas de opciones (motivos, tipos, marcas, orígenes) | **Pendiente** — deben salir de la práctica real |
| Reglas de garantía, frecuencia de controles, criterio de categorías | **Pendiente y bloqueante** |
| Estructura clínica de audiometría | **Deliberadamente no definida** |
