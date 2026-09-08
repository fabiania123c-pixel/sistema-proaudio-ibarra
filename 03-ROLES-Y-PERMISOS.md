# Documento 3 — Usuarios, roles y permisos preliminares

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (propuesta preliminar para validación)
**Fecha:** 1 de agosto de 2026

---

## Advertencia

**Estos permisos NO son definitivos.** Constituyen una propuesta de partida para discutir con Proaudio. La estructura organizacional real, la cantidad de personas por rol y las relaciones de confianza dentro del equipo **no se conocen**.

Todo permiso aquí propuesto debe leerse como: *"proponemos esto; confírmennos si es correcto"*.

Marcadores usados:

| Marcador | Significado |
|---|---|
| **[C]** | Confirmado por el encargo |
| **[I]** | Propuesta del analista basada en criterio profesional |
| **[V]** | Requiere decisión de Proaudio |

---

## 1. Principios de permisos propuestos

Antes de detallar roles, se proponen seis principios que deberían gobernar todo el esquema. **Estos principios también deben validarse.**

| # | Principio | Fundamento |
|---|---|---|
| P-1 | **Nadie borra información clínica ni histórica.** Se puede corregir, anular o marcar como error, pero el registro original permanece | **[C, principio 13]** |
| P-2 | **Toda acción queda registrada con autor y fecha.** No hay acciones anónimas | **[C, principio 15]** |
| P-3 | **Cada persona usa su propia cuenta.** No hay cuentas compartidas ni sesiones genéricas de "recepción" | **[I]** — sin esto, la trazabilidad del principio 15 es imposible |
| P-4 | **Permiso mínimo necesario.** Cada rol accede a lo que necesita para su trabajo, no a todo | **[I]** — buena práctica; especialmente relevante con datos de salud |
| P-5 | **Ante la duda, permitir consultar y restringir modificar.** Bloquear consultas entorpece la atención; bloquear modificaciones protege la información | **[I]** — a validar |
| P-6 | **Las automatizaciones siempre tienen un responsable humano identificable** | **[C, principio 14]** |

**[V] Pregunta transversal:** ¿Proaudio prefiere un esquema **abierto** (todos ven casi todo, la trazabilidad disuade el mal uso) o un esquema **restrictivo** (cada quien ve solo lo suyo)? Esta decisión cambia todo el documento. → *Decisión D-12.*

---

## 2. Resumen de roles

| Rol | Descripción | Frecuencia de uso | Nº de personas |
|---|---|---|---|
| **Administrador** | Configura el sistema, gestiona usuarios y catálogos | Ocasional | **[V]** |
| **Audióloga** | Atiende pacientes, consulta y registra información clínica | Diaria intensiva | **[V]** |
| **Recepcionista** | Opera la agenda, contacta pacientes, registra documentos | Diaria intensiva | **[V]** |
| **Gerencia** | Consulta información agregada para tomar decisiones | Periódica | **[V]** |
| **Usuario técnico / soporte** | Mantiene el sistema, resuelve incidencias | Bajo demanda | **[V]** |

**[V] Roles adicionales posibles, no confirmados:**

- **Técnico de reparaciones / taller** — si existe personal dedicado. Relevante desde Fase 5.
- **Auxiliar de digitalización** — si se contrata personal para la Fase 4.
- **Administrativo / contable** — si existe y necesita acceso a información económica.
- **Coordinador de sucursal** — si las sucursales tienen responsable propio.

→ *Pregunta P-ROL-04.*

**[V] Pregunta clave sobre combinación de roles:** ¿una misma persona cumple varios roles? Es común en empresas de este tamaño que la misma persona sea recepcionista y administradora, o que la dueña sea audióloga y gerencia a la vez. **El sistema debería permitir asignar varios roles a un mismo usuario.** → *Pregunta P-ROL-01, decisión D-13.*

---

## 3. Detalle por rol

---

### 3.1 ADMINISTRADOR

**Quién sería:** **[V]** probablemente la persona responsable de la operación diaria de Proaudio, o quien lidere internamente el proyecto. **No necesariamente es la gerencia.**

#### Qué necesita consultar

- Toda la información operativa del sistema: pacientes, citas, atenciones, documentos.
- Lista de usuarios y sus roles.
- Configuración de catálogos: motivos de cita, tipos de atención, sucursales, categorías de paciente, plantillas de mensaje.
- Reglas de automatización activas y su comportamiento.
- Historial de cambios de cualquier registro.
- Estado general del sistema: cuántas fichas, cuántas digitalizadas, cuántas tareas pendientes.

#### Qué puede crear

- Usuarios y asignación de roles.
- Sucursales.
- Motivos de cita y tipos de atención.
- Categorías de paciente (S+, A, B u otras — **[C]** el encargo indica que son configurables).
- Reglas de automatización y plantillas de mensaje.
- Pacientes, citas y atenciones (puede hacer todo lo operativo).

#### Qué puede modificar

- Toda la configuración del sistema.
- Datos de pacientes y citas.
- Puede **anular** (no borrar) registros creados por error, dejando constancia.
- Puede reasignar el profesional responsable de una cita o de un paciente.
- Puede **fusionar fichas duplicadas** — acción crítica, siempre con registro.

#### Qué NO debería poder ver o modificar

- **[I]** No debería poder **eliminar definitivamente** historial clínico ni observaciones. Ni siquiera el administrador. **[C, principio 13]**
- **[I]** No debería poder modificar el registro de auditoría (quién hizo qué y cuándo).
- **[I]** No debería poder alterar el contenido de una observación clínica ya escrita por una audióloga; sí puede marcarla como corregida y añadir una aclaración.
- **[V]** ¿Debería ver información económica y de rentabilidad? → *Depende de si administrador y gerencia son la misma persona. Pregunta P-ROL-05.*

#### Acciones que requieren trazabilidad reforzada

| Acción | Por qué |
|---|---|
| Crear, desactivar o cambiar el rol de un usuario | Cambia quién puede hacer qué |
| Fusionar dos fichas de paciente | Es irreversible en la práctica |
| Anular una atención o una cita completada | Altera el historial clínico |
| Modificar una regla de automatización | Afecta a muchos pacientes a la vez |
| Cambiar una plantilla de mensaje | Afecta lo que reciben los pacientes |
| Exportar información de pacientes | Riesgo de fuga de datos sensibles |

#### Decisiones pendientes de este rol

- **[V]** ¿Cuántos administradores habrá? Se recomienda **al menos dos**, para no depender de una sola persona.
- **[V]** ¿El administrador es también quien atiende? Si sí, necesita permisos combinados.
- **[V]** ¿Puede acceder a fichas de todas las sucursales?

---

### 3.2 AUDIÓLOGA

**Quién sería:** **[C]** profesional que atiende a los pacientes. Usuaria prioritaria en términos de facilidad de uso **[C, principio 9]**.

#### Qué necesita consultar

**Lo esencial, antes de cada atención:**

- Su agenda del día, la semana y el mes.
- La ficha completa del paciente que va a atender.
- La **última atención** y **la última indicación** dada al paciente **[C, requerimiento explícito]**.
- Audiometrías anteriores **[C]**.
- Audífonos en uso: marca, modelo, oído, número de serie **[C]**.
- Estado de garantías **[C]**.
- Reparaciones **[C]**.
- Historial completo de citas y reagendamientos **[C]**.
- Documentos digitalizados de la cartilla física **[C]**.
- Línea de tiempo completa del paciente **[C]**.
- **Próxima acción recomendada** **[C]**.
- Porcentaje digitalizado y ubicación del archivo físico **[C]**.

**Adicional:**

- Sus propias alertas y recordatorios asignados.
- Pacientes bajo su responsabilidad.

#### Qué puede crear

- Registros de atención con observaciones.
- Indicaciones al paciente.
- Registros de audiometría.
- Registro de audífonos entregados o adaptados.
- Citas (para el paciente que está atendiendo, o generales).
- Recordatorios y seguimientos para sus pacientes.
- Tareas para recepción (ejemplo: "llamar a este paciente en 15 días").
- Carga de documentos y fotografías de cartilla física.
- Pacientes nuevos, si atiende a alguien sin ficha previa.

#### Qué puede modificar

- **[I]** Sus propios registros de atención, **dentro de una ventana de tiempo limitada** (propuesta: mismo día). Después, solo puede agregar una aclaración, no reescribir.
- Datos de contacto del paciente (si detecta que el teléfono cambió).
- Fecha y contenido de los recordatorios que ella creó **[C, principio 14]**.
- Sus propias citas: reagendar o cancelar.
- La próxima acción recomendada del paciente.

**[V]** ¿Debería poder modificar el registro de otra audióloga? **Propuesta: no.** Puede leerlo y añadir su propia observación. → *Pregunta P-ROL-06.*

#### Qué NO debería poder ver o modificar

- **[I]** Configuración del sistema, usuarios ni roles.
- **[I]** Reglas de automatización globales (sí puede gestionar sus propios recordatorios).
- **[I]** Información económica: costos, rentabilidad, márgenes. **[V]** — a validar; en algunas empresas la audióloga también vende.
- **[I]** Indicadores de productividad de otras profesionales.
- **[I]** No puede borrar observaciones propias ni ajenas **[C, principio 13]**.
- **[I]** No puede borrar documentos cargados; solo marcarlos como incorrectos.
- **[V]** ¿Puede ver fichas de pacientes de otra sucursal? **Propuesta: sí, para continuidad de la atención,** pero es decisión de Proaudio. → *Decisión D-10.*
- **[V]** ¿Puede ver fichas de pacientes que atiende otra audióloga? **Propuesta: sí.** Restringirlo dificultaría cubrir ausencias. → *Pregunta P-ROL-07.*

#### Acciones que requieren trazabilidad

| Acción | Por qué |
|---|---|
| Registrar o corregir una atención | Es información clínica |
| Registrar una audiometría | Es información clínica |
| Registrar un audífono entregado | Origina garantías y obligaciones |
| Cancelar un seguimiento del paciente | Puede provocar pérdida del paciente |
| Modificar la próxima acción recomendada | Cambia el plan de seguimiento |
| Consultar la ficha de un paciente | **[V]** ¿Debe registrarse la sola consulta? Es práctica común con datos de salud, pero genera mucho registro. → *Decisión D-14* |

#### Decisiones pendientes de este rol

- **[V]** ¿Existe más de un tipo de profesional que atiende (audióloga, técnico, asesor)? ¿Requieren permisos distintos?
- **[V]** ¿Hay profesionales externos o que trabajan por horas?
- **[V]** ¿Cuánto tiempo debería tener una audióloga para corregir su propio registro antes de que quede cerrado?

---

### 3.3 RECEPCIONISTA

**Quién sería:** **[C]** persona que gestiona la agenda y el contacto con pacientes. **Es el usuario más frecuente del sistema** **[I]** y el que más determinará el éxito o el fracaso del proyecto.

#### Qué necesita consultar

- Agenda del día, la semana y el mes, de todos los profesionales y sucursales que le correspondan **[C]**.
- **Centro de Recordatorios**: a quién debe contactar hoy y por qué.
- Ficha resumida de cualquier paciente: datos de contacto, próxima cita, última visita, audífono en uso, estado de garantía.
- Historial de citas, reagendamientos, inasistencias **[C]**.
- Historial de comunicaciones: mensajes, correos y llamadas **[C]**.
- Estado de las reparaciones, para informar al paciente.
- Ubicación del archivo físico y porcentaje digitalizado **[C]**.
- Disponibilidad de los profesionales.

#### Qué puede crear

- Pacientes nuevos.
- Citas, reagendamientos y cancelaciones **[C]**.
- Registro de inasistencia **[C]**.
- Recordatorios manuales **[C]**.
- Registro de comunicaciones realizadas (llamada, mensaje, correo) con su resultado.
- Notas administrativas en la ficha (no clínicas).
- Tareas internas para sí misma o para otro miembro del equipo.
- Carga de documentos escaneados o fotografiados.

#### Qué puede modificar

- Datos personales y de contacto del paciente.
- Citas: fecha, hora, profesional, motivo, estado.
- Recordatorios: fecha, contenido, estado; puede posponer y cancelar **[C, principio 14]**.
- Sus propias notas administrativas.
- Ubicación del archivo físico.

#### Qué NO debería poder ver o modificar

- **[I]** **No debería poder modificar observaciones clínicas** escritas por una audióloga. Puede leerlas si eso ayuda a atender al paciente por teléfono. → **[V]** ¿Debería siquiera poder leerlas? Es una decisión sensible: la recepcionista necesita contexto para responder, pero se trata de información de salud. → *Decisión D-15.*
- **[I]** No debería poder registrar audiometrías ni datos clínicos.
- **[I]** No debería poder modificar el registro de audífonos ni de garantías. **[V]** — a validar; podría necesitar registrar la entrega si la audióloga no está.
- **[I]** No debería ver información económica ni indicadores de productividad.
- **[I]** No debería poder configurar reglas de automatización globales.
- **[I]** No puede borrar historial de ningún tipo **[C, principio 13]**.

#### Acciones que requieren trazabilidad

| Acción | Por qué |
|---|---|
| Crear, reagendar o cancelar una cita | Afecta la operación y al paciente |
| Registrar una inasistencia | Alimenta indicadores y puede afectar la relación con el paciente |
| Registrar un contacto con el paciente | Es evidencia del seguimiento realizado |
| Cancelar o posponer un recordatorio | Puede provocar pérdida del paciente |
| Modificar datos de contacto | Un error deja al paciente incontactable |
| Crear un paciente | Riesgo de duplicados |

#### Decisiones pendientes de este rol

- **[V]** ¿La recepcionista de una sucursal debe ver la agenda de las otras?
- **[V]** ¿Puede agendar con cualquier profesional o solo con los de su sucursal?
- **[V]** ¿Puede ver el motivo clínico de la cita o solo un motivo genérico?
- **[V]** ¿Hay más de una recepcionista por turno? ¿Necesitan ver el trabajo de la otra?

---

### 3.4 GERENCIA

**Quién sería:** **[C]** rol de dirección. **[V]** No se conoce si es una persona, varias, o si coincide con la propiedad de la empresa.

#### Qué necesita consultar

**En las primeras fases (2 y 3), de forma limitada:**

- Volumen de citas por período.
- Pacientes nuevos por período.
- Inasistencias y cancelaciones.
- Estado general de avance de la digitalización.

**En la Fase 6, de forma completa** **[C, lista del encargo]**:

- Indicadores de abandono, pacientes activos, recuperados, frecuencia de visitas.
- No-shows, cancelaciones, reagendamientos.
- Cumplimiento de controles y de audiometría anual.
- Garantías y reparaciones.
- Costos por paciente y por reparación, repuestos, rentabilidad por paciente.
- Productividad por profesional.
- Origen y referidos de pacientes.
- Inventario.

#### Qué puede crear

- **[I]** Consultas y reportes. Muy poco más.
- **[V]** ¿Debería poder crear pacientes o citas? Depende de si la gerencia también opera. En empresas pequeñas suele ser así.

#### Qué puede modificar

- **[I]** Prácticamente nada en la información operativa.
- **[I]** Podría definir metas y objetivos de los indicadores (Fase 6).

**Fundamento:** separar quién decide de quién registra protege la calidad del dato. Si la gerencia necesita corregir algo, lo pide al administrador y queda constancia.

#### Qué NO debería poder ver o modificar

- **[I]** No debería modificar registros clínicos ni observaciones.
- **[I]** No debería modificar citas ni atenciones directamente.
- **[V]** **¿Debería ver observaciones clínicas individuales de los pacientes?** Esta es una de las preguntas más delicadas del proyecto. Argumentos en ambos sentidos:
  - *A favor:* en una empresa pequeña, la gerencia suele conocer a los pacientes y necesita resolver situaciones concretas.
  - *En contra:* la información de salud debería limitarse a quien la necesita para atender.
  - **Propuesta preliminar:** acceso a datos agregados por defecto; acceso a fichas individuales posible pero **registrado en auditoría**. → *Decisión D-16.*

#### Acciones que requieren trazabilidad

| Acción | Por qué |
|---|---|
| Consultar la ficha individual de un paciente | Acceso a datos sensibles fuera del proceso de atención |
| Exportar reportes con datos de pacientes | Riesgo de fuga de información |
| Definir o cambiar metas de indicadores | Afecta cómo se evalúa al equipo |

#### Decisiones pendientes de este rol

- **[V]** ¿Gerencia y administrador son la misma persona?
- **[V]** ¿Con qué frecuencia consultará el sistema? Esto define si necesita un tablero propio o basta con un reporte periódico.
- **[V]** ¿Los indicadores de productividad por profesional se compartirán con el equipo o solo con gerencia? **Advertencia:** si el equipo percibe el sistema como herramienta de vigilancia, aumenta el riesgo R-02.

---

### 3.5 USUARIO TÉCNICO / SOPORTE

**Quién sería:** **[C]** rol de mantenimiento del sistema. **[V]** Puede ser interno o externo (proveedor).

#### Qué necesita consultar

- Estado técnico del sistema: funcionamiento, errores, rendimiento.
- Registros de error y de auditoría.
- Configuración técnica.
- Estructura de datos, **sin necesidad de ver contenido de pacientes**.

#### Qué puede crear

- Registros técnicos y respaldos.
- Correcciones de configuración.
- **[V]** Usuarios, si el administrador no está disponible. Preferible que no.

#### Qué puede modificar

- Configuración técnica y parámetros del sistema.
- Corrección de datos **solo bajo solicitud formal y registrada** del administrador.

#### Qué NO debería poder ver o modificar

- **[I]** **No debería acceder rutinariamente a información clínica ni personal de pacientes.**
- **[I]** No debería modificar historial clínico.
- **[I]** No debería exportar información de pacientes sin autorización.

**Realidad a reconocer:** quien mantiene un sistema **técnicamente puede** acceder a los datos. El control no es solo técnico, es contractual y de auditoría. Se recomienda:

1. Acuerdo de confidencialidad firmado.
2. Acceso a datos reales solo cuando sea imprescindible y con registro.
3. Uso de datos ficticios para pruebas **[C, principio 8]**.
4. Revisión periódica del registro de accesos.

→ *Decisión D-17.*

#### Acciones que requieren trazabilidad

| Acción | Por qué |
|---|---|
| Cualquier acceso a datos de pacientes | Es acceso privilegiado a información sensible |
| Modificación directa de información | Sortea los controles normales del sistema |
| Exportación o copia de datos | Riesgo mayor de fuga |
| Cambios de configuración | Puede alterar el comportamiento del sistema |

---

## 4. Matriz resumen de permisos (propuesta preliminar)

**Leyenda:** ● Completo · ◐ Parcial o condicionado · ○ Solo consulta · ✕ Sin acceso · **?** Por decidir

| Función | Admin | Audióloga | Recepción | Gerencia | Soporte |
|---|:---:|:---:|:---:|:---:|:---:|
| **PACIENTES** | | | | | |
| Ver lista de pacientes | ● | ● | ● | ? | ✕ |
| Ver ficha completa | ● | ● | ◐ | **?** | ✕ |
| Crear paciente | ● | ● | ● | ? | ✕ |
| Editar datos de contacto | ● | ● | ● | ✕ | ✕ |
| Editar datos clínicos | ● | ● | ✕ | ✕ | ✕ |
| Fusionar duplicados | ● | ✕ | ? | ✕ | ✕ |
| Ver categoría S+/A/B | ● | ● | ? | ● | ✕ |
| Asignar categoría | ● | ? | ? | ● | ✕ |
| **AGENDA Y CITAS** | | | | | |
| Ver agenda propia | ● | ● | ● | ○ | ✕ |
| Ver agenda de otros | ● | ◐ | ● | ○ | ✕ |
| Crear cita | ● | ● | ● | ? | ✕ |
| Reagendar | ● | ● | ● | ✕ | ✕ |
| Cancelar | ● | ● | ● | ✕ | ✕ |
| Registrar inasistencia | ● | ● | ● | ✕ | ✕ |
| **ATENCIONES** | | | | | |
| Ver historial de atenciones | ● | ● | **?** | **?** | ✕ |
| Registrar atención | ● | ● | ✕ | ✕ | ✕ |
| Corregir atención propia | ● | ◐ | ✕ | ✕ | ✕ |
| Corregir atención ajena | ◐ | ✕ | ✕ | ✕ | ✕ |
| Borrar atención | ✕ | ✕ | ✕ | ✕ | ✕ |
| **AUDIOMETRÍAS** | | | | | |
| Ver audiometrías | ● | ● | ? | ? | ✕ |
| Registrar audiometría | ● | ● | ✕ | ✕ | ✕ |
| **AUDÍFONOS Y GARANTÍAS** | | | | | |
| Ver audífonos y garantías | ● | ● | ● | ● | ✕ |
| Registrar audífono | ● | ● | ? | ✕ | ✕ |
| Registrar garantía | ● | ● | ? | ✕ | ✕ |
| **REPARACIONES (F5)** | | | | | |
| Ver reparaciones | ● | ● | ● | ● | ✕ |
| Registrar reparación | ● | ● | ◐ | ✕ | ✕ |
| **DOCUMENTOS** | | | | | |
| Ver documentos | ● | ● | ◐ | ? | ✕ |
| Cargar documento | ● | ● | ● | ✕ | ✕ |
| Marcar documento erróneo | ● | ● | ● | ✕ | ✕ |
| Eliminar documento | ✕ | ✕ | ✕ | ✕ | ✕ |
| Ver/editar ubicación física | ● | ● | ● | ○ | ✕ |
| **RECORDATORIOS Y TAREAS** | | | | | |
| Ver recordatorios propios | ● | ● | ● | ○ | ✕ |
| Ver recordatorios de otros | ● | ◐ | ● | ○ | ✕ |
| Crear recordatorio manual | ● | ● | ● | ✕ | ✕ |
| Editar contenido y fecha | ● | ● | ● | ✕ | ✕ |
| Posponer | ● | ● | ● | ✕ | ✕ |
| Cancelar | ● | ● | ● | ✕ | ✕ |
| **COMUNICACIONES (F3)** | | | | | |
| Ver historial de mensajes | ● | ● | ● | ? | ✕ |
| Registrar llamada o contacto | ● | ● | ● | ✕ | ✕ |
| Aprobar envío automático | ● | ? | ● | ✕ | ✕ |
| Editar plantillas | ● | ✕ | ✕ | ? | ✕ |
| **CONFIGURACIÓN** | | | | | |
| Gestionar usuarios y roles | ● | ✕ | ✕ | ? | ◐ |
| Configurar catálogos | ● | ✕ | ✕ | ✕ | ✕ |
| Configurar automatizaciones | ● | ✕ | ✕ | ✕ | ✕ |
| Configurar sucursales | ● | ✕ | ✕ | ? | ✕ |
| **INDICADORES (F6)** | | | | | |
| Ver indicadores operativos | ● | ◐ | ◐ | ● | ✕ |
| Ver indicadores económicos | ? | ✕ | ✕ | ● | ✕ |
| Ver productividad por profesional | ? | ◐ | ✕ | ● | ✕ |
| Exportar reportes | ● | ✕ | ✕ | ● | ✕ |
| **AUDITORÍA** | | | | | |
| Ver historial de cambios | ● | ◐ | ◐ | ? | ● |
| Modificar historial de cambios | ✕ | ✕ | ✕ | ✕ | ✕ |

> **Nota sobre las celdas ✕ en "borrar":** ninguna fila de eliminación permanente tiene ● para ningún rol. Esto es deliberado y responde al principio 13 **[C]**.

---

## 5. Trazabilidad — qué se registra siempre

**[C, principio 15]** El sistema conserva quién creó o modificó cada información y cuándo lo hizo.

### 5.1 Datos mínimos de cada registro de auditoría

| Dato | Descripción |
|---|---|
| Quién | Usuario que realizó la acción |
| Cuándo | Fecha y hora exacta |
| Qué | Tipo de acción (crear, modificar, anular, consultar, exportar) |
| Sobre qué | Registro afectado (paciente, cita, atención, etc.) |
| Valor anterior | Contenido previo, cuando aplique |
| Valor nuevo | Contenido resultante |
| Desde dónde | **[V]** ¿Se registra el equipo o la sucursal? A decidir |
| Motivo | Obligatorio en acciones críticas |

### 5.2 Acciones críticas — requieren motivo escrito

Propuesta **[I]**:

1. Cancelar una cita.
2. Registrar una inasistencia.
3. Cancelar un recordatorio o seguimiento.
4. Corregir o anular una atención registrada.
5. Fusionar fichas de pacientes.
6. Cambiar el profesional responsable de un paciente.
7. Cambiar la categoría del paciente.
8. Desactivar un paciente o marcarlo como inactivo.
9. Cambiar el rol de un usuario.
10. Exportar información de pacientes.
11. Detener una automatización activa.

### 5.3 ¿Se registran las consultas?

**[V] Decisión pendiente D-14.** Tres opciones:

| Opción | Ventaja | Desventaja |
|---|---|---|
| No registrar consultas | Sistema más liviano y simple | No se sabe quién vio qué |
| Registrar todas las consultas | Máxima trazabilidad | Enorme volumen de registro, poco útil en la práctica |
| **Registrar solo consultas fuera del flujo normal** (gerencia, soporte, acceso a pacientes de otra sucursal, exportaciones) | Equilibrio razonable | Requiere definir qué es "flujo normal" |

**Recomendación preliminar:** la tercera opción.

---

## 6. Qué NO se define todavía

Por principio del proyecto, **no se definen en esta etapa**:

- Mecanismo de inicio de sesión, contraseñas o autenticación.
- Estructura técnica de permisos.
- Herramientas o plataformas de gestión de identidad.
- Políticas de expiración de sesión.
- Doble factor de autenticación.

Estos temas se abordarán cuando se apruebe pasar a la Fase 2 y se defina la plataforma.

---

## 7. Decisiones pendientes específicas de este documento

| ID | Decisión | Quién decide | Fase límite |
|---|---|---|---|
| D-12 | ¿Esquema de permisos abierto o restrictivo? | Gerencia | Antes de F2 |
| D-13 | ¿Un usuario puede tener varios roles? | Gerencia + Admin | Antes de F2 |
| D-14 | ¿Se registran las consultas a fichas? | Gerencia | Antes de F2 |
| D-15 | ¿Recepción puede leer observaciones clínicas? | Gerencia + Audiólogas | Antes de F2 |
| D-16 | ¿Gerencia accede a fichas individuales? | Gerencia | Antes de F2 |
| D-17 | Marco de acceso del soporte técnico a datos reales | Gerencia | Antes de F2 |
| D-18 | ¿Existe rol de taller / técnico de reparaciones? | Gerencia | Antes de F5 |
| D-20 | ¿La audióloga puede corregir su registro? ¿Por cuánto tiempo? | Audiólogas + Gerencia | Antes de F2 |
| D-21 | ¿Se comparten indicadores de productividad con el equipo? | Gerencia | Antes de F6 |

*Registro completo en el Documento 10.*

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Los cinco roles a considerar | **Confirmado** |
| Prioridad de facilidad de uso para audiólogas y recepcionistas | **Confirmado** |
| Trazabilidad de creación y modificación | **Confirmado** |
| Que nada se borra | **Confirmado** |
| Que las categorías de paciente son configurables | **Confirmado** |
| **Todos los permisos concretos de la matriz** | **Propuesta preliminar del analista** |
| Los principios P-1 a P-6 | P-1, P-2 y P-6 confirmados; P-3, P-4 y P-5 propuestos |
| Número de personas por rol, estructura organizacional | **Pendiente** |
| Roles adicionales (taller, digitalización, contable) | **Pendiente** |
| Todas las celdas marcadas **?** en la matriz | **Pendiente de decisión de Proaudio** |
