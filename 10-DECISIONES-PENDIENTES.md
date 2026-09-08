# Documento 10 — Registro de decisiones pendientes

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0
**Fecha:** 1 de agosto de 2026
**Total de decisiones registradas:** 28 · **abiertas:** 27 · **resueltas:** 1 (D-10, el 2 de agosto de 2026)

---

## Para qué sirve este documento

**[C, principio 7]** *"Cuando falte información, registra la cuestión como una decisión pendiente."*

Este es el registro vivo de todo lo que el proyecto **no puede decidir por sí mismo**. Cada línea representa un punto donde el análisis se detuvo deliberadamente en lugar de inventar una respuesta.

### Cómo mantenerlo

- **Se actualiza después de cada reunión con Proaudio.**
- Cuando una decisión se cierra, se registra la respuesta, quién la dio y cuándo.
- Una decisión cerrada **no se borra**: se marca como resuelta y se conserva la trazabilidad.
- Si aparece una nueva pregunta bloqueante, se agrega con el siguiente número disponible.

### Estados

| Estado | Significado |
|---|---|
| 🔴 **Abierta — bloqueante** | Impide avanzar. Debe resolverse ya |
| 🟠 **Abierta — urgente** | No bloquea hoy, pero sí la próxima fase |
| 🟡 **Abierta** | Puede esperar sin costo |
| 🔵 **En análisis** | Se está evaluando con Proaudio |
| ✅ **Resuelta** | Cerrada, con respuesta documentada |

---

# TABLA RESUMEN

| ID | Decisión | Quién decide | Fase límite | Estado |
|---|---|---|---|---|
| D-01 | Identificador único del paciente | Gerencia + Recepción | **F0** | 🔴 |
| D-02 | Catálogo de motivos de cita | Recepción + Audiólogas | **F0** | 🔴 |
| D-03 | Frecuencias y plazos de recordatorios | Audiólogas + Gerencia | **F0** | 🔴 |
| D-04 | Significado de las categorías S+, A, B | Gerencia | **F0** | 🔴 |
| D-05 | Reglas de garantía | Gerencia + Audiólogas | **F0** | 🔴 |
| D-06 | Rol definitivo de Google Calendar | Gerencia | F1 | 🟠 |
| D-07 | Reglas de cancelación de citas | Gerencia + Recepción | F1 | 🟠 |
| D-08 | Definición de paciente inactivo | Gerencia | **F0** | 🔴 |
| D-09 | Alcance y responsable de la digitalización | Gerencia | F2 | 🟠 |
| D-10 | Número y operación de las sucursales | Gerencia | **F0** | ✅ |
| D-11 | Marco de protección de datos | Gerencia | **F0** | 🔴 |
| D-12 | Esquema de permisos: abierto o restrictivo | Gerencia | F2 | 🟠 |
| D-13 | Un usuario con varios roles | Gerencia | F2 | 🟠 |
| D-14 | ¿Se registran las consultas a fichas? | Gerencia | F2 | 🟡 |
| D-15 | ¿Recepción lee observaciones clínicas? | Gerencia + Audiólogas | F2 | 🟠 |
| D-16 | ¿Gerencia accede a fichas individuales? | Gerencia | F2 | 🟠 |
| D-17 | Acceso del soporte técnico a datos reales | Gerencia | F2 | 🟠 |
| D-18 | ¿Existe rol de taller? | Gerencia | F5 | 🟡 |
| D-19 | Metas numéricas de los objetivos | Gerencia | F2 | 🟡 |
| D-20 | Ventana de corrección del registro clínico | Audiólogas + Gerencia | F2 | 🟠 |
| D-21 | ¿Se comparten indicadores de productividad? | Gerencia | F6 | 🟡 |
| D-22 | Cómo se calcula el porcentaje digitalizado | Gerencia + Recepción | F1 | 🟠 |
| D-23 | Catálogo de tipos de atención | Audiólogas | F1 | 🟠 |
| D-24 | ¿La información económica entra al sistema? | Gerencia | F2 | 🟠 |
| D-25 | Estructura de los datos de audiometría | Audiólogas | F2 | 🟠 |
| D-26 | Número de intentos de contacto | Recepción + Gerencia | F2 | 🟡 |
| D-27 | Marca de "no desea ser contactado" | Gerencia | **F3 (previa)** | 🔴 |
| D-28 | Futuro del archivo físico en papel | Gerencia | F4 | 🟡 |

---

# DETALLE DE CADA DECISIÓN

---

## D-01 · Identificador único del paciente 🔴

| | |
|---|---|
| **Decisión** | ¿Qué dato identifica de forma única a un paciente? |
| **Motivo** | Sin una regla clara, el mismo paciente se registra varias veces. Con 21 años de historia, el riesgo es enorme (riesgo R-05) |
| **Opciones** | **a)** Cédula o documento de identidad · **b)** Número de ficha física existente · **c)** Código nuevo generado por el sistema · **d)** Combinación de nombre + teléfono + fecha de nacimiento |
| **Impacto** | **Máximo.** Afecta la estructura de fichas, la búsqueda, la prevención de duplicados y toda la digitalización |
| **Quién decide** | Gerencia con recepción |
| **Fase límite** | **F0 — antes de diseñar cualquier pantalla de paciente** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-PAC-02, P-PAC-03, P-PAC-04 |
| **Nota del analista** | Si no todos los pacientes tienen cédula (menores, extranjeros, casos gestionados por familiares), la opción (a) sola no funciona. Lo más probable es que se necesite un código propio del sistema **más** la cédula como dato de verificación opcional |

---

## D-02 · Catálogo de motivos de cita 🔴

| | |
|---|---|
| **Decisión** | ¿Cuál es la lista completa de motivos por los que un paciente asiste? |
| **Motivo** | La agenda, los formularios y varias automatizaciones dependen de esta lista. **No se puede inventar** **[C, principio 6]** |
| **Opciones** | No hay opciones que proponer. **Proaudio debe enumerarlos** |
| **Impacto** | **Alto.** Bloquea las pantallas 2, 8 y las automatizaciones A-01, A-04, A-06 |
| **Quién decide** | Recepción y audiólogas, en conjunto |
| **Fase límite** | **F0** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-AGE-03, P-AGE-04 |
| **Nota del analista** | Debe recogerse el vocabulario real del equipo, no traducirlo a términos técnicos. Además, conviene saber la duración típica de cada motivo |

---

## D-03 · Frecuencias y plazos de recordatorios 🔴

| | |
|---|---|
| **Decisión** | ¿Con cuánta anticipación y cada cuánto debe avisar el sistema para cada tipo de seguimiento? |
| **Motivo** | Todas las automatizaciones necesitan una regla temporal. Hoy no existe ninguna definida |
| **Opciones** | Debe definirse un valor para cada caso: recordatorio de cita, confirmación, audiometría anual, control periódico, seguimiento post-atención, bienvenida |
| **Impacto** | **Alto.** Bloquea A-01, A-02, A-03, A-04, A-06, A-10 y determina el volumen de trabajo diario |
| **Quién decide** | Audiólogas (criterio clínico) + gerencia (criterio de capacidad) |
| **Fase límite** | **F0** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-AUM-06, P-AUM-07, P-AGE-11, P-SEG-06 |
| **Nota del analista** | **Esta decisión debe tomarse junto con la respuesta a P-SEG-06** (cuántos contactos puede hacer una persona al día). Definir frecuencias sin considerar la capacidad real produce un sistema que genera más trabajo del que se puede atender |

---

## D-04 · Significado de las categorías S+, A, B 🔴

| | |
|---|---|
| **Decisión** | ¿Qué significan estas categorías, quién las asigna y con qué criterio? |
| **Motivo** | El encargo confirma que existen y son configurables **[C]**, pero **no dice qué significan**. Sin criterio compartido, dos personas clasifican distinto al mismo paciente (riesgo R-09) |
| **Opciones** | **a)** Volumen o valor de compra · **b)** Antigüedad como paciente · **c)** Complejidad clínica · **d)** Potencial comercial · **e)** Cumplimiento de controles · **f)** Combinación · **g)** No implementar la categoría hasta tener criterio |
| **Impacto** | **Medio-alto.** Afecta la ficha, la priorización de seguimientos y posibles indicadores |
| **Quién decide** | Gerencia |
| **Fase límite** | **F0** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-CAT-01 a P-CAT-09 |
| **Nota del analista** | Si el criterio es comercial y la categoría se muestra en pantalla, **un paciente podría verla**. Conviene evaluar si debe mostrarse abiertamente o de forma discreta. La opción (g) es legítima: es mejor no implementarla que implementarla sin sentido |

---

## D-05 · Reglas de garantía 🔴

| | |
|---|---|
| **Decisión** | ¿Cuánto dura una garantía, desde cuándo corre, qué cubre y quién la otorga? |
| **Motivo** | Sin estas reglas, el sistema **no puede calcular vencimientos ni generar avisos** |
| **Opciones** | Debe definirse por tipo de equipo, marca y tipo de servicio |
| **Impacto** | **Alto.** Bloquea F2-12, A-05 y la Ola 3 de digitalización |
| **Quién decide** | Gerencia con audiólogas |
| **Fase límite** | **F0** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-GAR-01 a P-GAR-11 |
| **Nota del analista** | Si la duración varía por marca, el sistema debe permitir configurarla por marca o modelo, no un valor único. También debe definirse qué pasa cuando la garantía se usa: ¿se agota o continúa? |

---

## D-06 · Rol definitivo de Google Calendar 🟠

| | |
|---|---|
| **Decisión** | ¿Google Calendar se mantiene, y si es así, en qué dirección fluye la información? |
| **Motivo** | **[C]** El encargo indica que puede mantenerse temporalmente como vista sincronizada, pero no como base. Falta definir el mecanismo y hasta cuándo |
| **Opciones** | **a)** El sistema escribe en Calendar; Calendar es solo lectura · **b)** Sincronización en ambos sentidos · **c)** Se abandona Calendar al arrancar la F2 · **d)** Convivencia por un período definido, luego se abandona |
| **Impacto** | **Alto.** La opción (b) genera el riesgo R-07 (dos versiones de la verdad) |
| **Quién decide** | Gerencia |
| **Fase límite** | F1 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-AGE-01, P-AGE-02 |
| **Nota del analista** | **Se recomienda evitar la opción (b).** La sincronización en ambos sentidos es la fuente de error más común en este tipo de transiciones. La opción (d) con dirección única es la más segura |

---

## D-07 · Reglas de cancelación de citas 🟠

| | |
|---|---|
| **Decisión** | ¿Quién puede cancelar una cita, con cuánta anticipación y qué se registra? |
| **Motivo** | Define permisos y afecta los indicadores de cancelación |
| **Opciones** | **a)** Cualquier usuario, en cualquier momento, con motivo obligatorio · **b)** Solo recepción y administrador · **c)** Restricción por anticipación mínima |
| **Impacto** | Medio |
| **Quién decide** | Gerencia con recepción |
| **Fase límite** | F1 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-AGE-12, P-AGE-13 |
| **Nota del analista** | Independientemente de la opción, **el motivo debería ser siempre obligatorio**: es el dato que permite entender por qué se pierden citas |

---

## D-08 · Definición de paciente inactivo 🔴

| | |
|---|---|
| **Decisión** | ¿A partir de cuánto tiempo sin visita se considera que un paciente se está perdiendo? |
| **Motivo** | Es la regla central del objetivo declarado del proyecto: reducir el abandono |
| **Opciones** | **a)** 6 meses · **b)** 12 meses · **c)** 18 meses · **d)** 24 meses · **e)** Variable según categoría o tipo de paciente |
| **Impacto** | **Máximo.** Define cuántas tareas genera A-08, qué es un "paciente activo" para la digitalización y cómo se mide el abandono en F6 |
| **Quién decide** | Gerencia, con criterio de audiólogas |
| **Fase límite** | **F0** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-SEG-04, P-SEG-05, P-HIS-04 |
| **Nota del analista** | Un umbral corto detecta antes pero genera mucho volumen. Un umbral largo genera menos trabajo pero detecta tarde. **La respuesta correcta depende de la capacidad real del equipo**, no solo del criterio clínico |

---

## D-09 · Alcance y responsable de la digitalización 🟠

| | |
|---|---|
| **Decisión** | ¿Quién realiza el trabajo de digitalización y hasta dónde se llega? |
| **Motivo** | Determina el costo, el ritmo y el riesgo de exposición de datos |
| **Opciones** | **a)** El equipo actual, oportunistamente · **b)** Personal contratado para ello · **c)** Servicio externo · **d)** Mixta |
| **Impacto** | Alto en costo y en riesgo de protección de datos |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-HIS-07, P-HIS-08, P-HIS-09, P-DOC-03 |
| **Nota del analista** | **No se recomienda la opción (c)** mientras no exista una política de protección de datos y un acuerdo de confidencialidad firmado (D-11). Sacar documentos clínicos de la empresa es un riesgo importante |

---

## D-10 · Número y operación de las sucursales ✅

| | |
|---|---|
| **Decisión** | ¿Cuántas sucursales hay, cómo se relacionan y cómo se comparte la información entre ellas? |
| **Motivo** | Afecta la agenda, los permisos, el archivo físico y la ficha del paciente |
| **Respuesta** | **Una sola sucursal, en Ibarra.** No hay operación multisucursal |
| **Quién decidió** | José González / Proaudio |
| **Fecha** | 2 de agosto de 2026 |
| **Estado** | ✅ **Resuelta** |
| **Preguntas asociadas** | P-SUC-01 a P-SUC-08 |
| **Consecuencias aplicadas** | En el prototipo v0.2 desaparecen todos los selectores y filtros de sucursal. El campo `sucursalId` **se conserva en el modelo de datos** con un valor único, para no rehacer la estructura si en el futuro se abre otra sucursal. Ver [addendum v0.2](docs/ADDENDUM-PROTOTIPO-V0.2.md) |
| **Queda abierto** | Si en algún momento se atendiera en localidades sin local fijo, la agenda necesitaría un concepto adicional que hoy no está contemplado |

---

## D-11 · Marco de protección de datos 🔴

| | |
|---|---|
| **Decisión** | ¿Qué normas aplican al manejo de datos de salud y qué política adopta Proaudio? |
| **Motivo** | Se manejará información de salud de miles de personas. **Hoy no hay ninguna política definida** (riesgo R-06) |
| **Opciones** | Debe definirse: consentimiento del paciente, quién accede, dónde se almacena, cuánto se conserva, qué pasa si un paciente pide ver o borrar sus datos, acceso de terceros |
| **Impacto** | **Máximo.** Afecta permisos, almacenamiento, digitalización, mensajería y responsabilidad legal |
| **Quién decide** | Gerencia, idealmente con asesoría legal |
| **Fase límite** | **F0 — antes de cargar el primer dato real** |
| **Estado** | 🔴 Abierta — bloqueante |
| **Preguntas asociadas** | P-PRO-01 a P-PRO-10 |
| **Nota del analista** | **Este análisis no constituye asesoría legal.** Se recomienda que Proaudio consulte con un profesional del derecho sobre la normativa de protección de datos aplicable a su actividad y jurisdicción antes de digitalizar información de salud |

---

## D-12 · Esquema de permisos: abierto o restrictivo 🟠

| | |
|---|---|
| **Decisión** | ¿Todos ven casi todo con trazabilidad, o cada quien ve solo lo suyo? |
| **Motivo** | Define toda la matriz de permisos del Documento 3 |
| **Opciones** | **a)** Abierto con trazabilidad · **b)** Restrictivo por rol · **c)** Mixto: abierto para datos operativos, restrictivo para clínicos y económicos |
| **Impacto** | Alto en el diseño y en la cultura de trabajo |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ROL-10, P-ROL-11 |
| **Nota del analista** | En equipos pequeños, el esquema restrictivo suele entorpecer más de lo que protege. La opción (c) es la que mejor equilibra ambos objetivos |

---

## D-13 · Un usuario con varios roles 🟠

| | |
|---|---|
| **Decisión** | ¿Puede una misma persona tener más de un rol? |
| **Motivo** | Es frecuente en empresas de este tamaño que la misma persona sea recepcionista y administradora, o audióloga y gerencia |
| **Opciones** | **a)** Sí, roles acumulables · **b)** No, un rol por persona · **c)** Roles combinados predefinidos |
| **Impacto** | Medio |
| **Quién decide** | Gerencia con administrador |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ROL-01, P-ROL-02 |
| **Nota del analista** | La opción (a) es la más flexible y la más probable dado el tamaño de la empresa |

---

## D-14 · ¿Se registran las consultas a fichas? 🟡

| | |
|---|---|
| **Decisión** | ¿El sistema registra quién consultó qué ficha, además de quién la modificó? |
| **Motivo** | Es práctica habitual con datos de salud, pero genera un volumen de registro muy alto |
| **Opciones** | **a)** No registrar consultas · **b)** Registrar todas · **c)** Registrar solo las consultas fuera del flujo normal de atención |
| **Impacto** | Medio |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-ROL-11, P-PRO-07 |
| **Nota del analista** | Se recomienda la opción (c): registra lo relevante sin saturar el sistema |

---

## D-15 · ¿Recepción lee observaciones clínicas? 🟠

| | |
|---|---|
| **Decisión** | ¿La recepcionista puede ver lo que escribió la audióloga sobre un paciente? |
| **Motivo** | Necesita contexto para atender llamadas, pero se trata de información de salud |
| **Opciones** | **a)** Sí, acceso completo · **b)** No · **c)** Solo un resumen: última indicación y próxima acción, sin la observación clínica completa |
| **Impacto** | Alto en la utilidad práctica del sistema y en la protección de datos |
| **Quién decide** | Gerencia con audiólogas |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ROL-08 |
| **Nota del analista** | La opción (c) suele ser el mejor equilibrio: la recepcionista puede responder *"le toca control en agosto"* sin acceder al detalle clínico |

---

## D-16 · ¿Gerencia accede a fichas individuales? 🟠

| | |
|---|---|
| **Decisión** | ¿La gerencia puede abrir la ficha completa de un paciente concreto? |
| **Motivo** | En empresas pequeñas la gerencia conoce a los pacientes, pero es información de salud |
| **Opciones** | **a)** Sí, acceso completo · **b)** Solo información agregada · **c)** Acceso posible pero registrado en auditoría |
| **Impacto** | Medio-alto |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ROL-09 |
| **Nota del analista** | Se recomienda la opción (c) |

---

## D-17 · Acceso del soporte técnico a datos reales 🟠

| | |
|---|---|
| **Decisión** | ¿Bajo qué condiciones puede el soporte técnico acceder a información de pacientes? |
| **Motivo** | Quien mantiene un sistema técnicamente puede ver los datos. El control debe ser contractual, no solo técnico |
| **Opciones** | **a)** Acceso libre para mantenimiento · **b)** Acceso solo bajo solicitud registrada · **c)** Sin acceso a datos reales; solo entorno de prueba con datos ficticios |
| **Impacto** | Alto en protección de datos |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-PRO-08 |
| **Nota del analista** | Se recomienda (c) como norma y (b) como excepción, siempre con acuerdo de confidencialidad firmado |

---

## D-18 · ¿Existe rol de taller? 🟡

| | |
|---|---|
| **Decisión** | ¿Hay personal dedicado a reparaciones que necesite su propio acceso? |
| **Motivo** | Determina si se crea un rol adicional en la Fase 5 |
| **Opciones** | **a)** Sí, rol propio · **b)** No, lo hacen las audiólogas · **c)** Se envía a terceros |
| **Impacto** | Bajo hasta la Fase 5 |
| **Quién decide** | Gerencia |
| **Fase límite** | F5 |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-REP-01, P-REP-02, P-ROL-04 |

---

## D-19 · Metas numéricas de los objetivos 🟡

| | |
|---|---|
| **Decisión** | ¿Qué valores concretos definen el éxito del proyecto? |
| **Motivo** | Los objetivos del Documento 1 no tienen meta numérica porque **no se conoce la línea base** |
| **Opciones** | Deben fijarse tras medir la situación actual con datos reales |
| **Impacto** | Medio. Afecta cómo se evaluará el proyecto |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 (tras 3 meses de datos) |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-GER-02, P-GER-03 |
| **Nota del analista** | **No fijar metas antes de tener línea base.** Una meta inventada es peor que ninguna meta |

---

## D-20 · Ventana de corrección del registro clínico 🟠

| | |
|---|---|
| **Decisión** | ¿Cuánto tiempo puede una audióloga corregir su propio registro antes de que quede cerrado? |
| **Motivo** | **[C, principio 13]** nada se borra, pero es razonable poder corregir un error de tipeo reciente |
| **Opciones** | **a)** Sin límite · **b)** Mismo día · **c)** 24 horas · **d)** Hasta que se registre otra atención · **e)** Ninguna edición; solo aclaraciones posteriores |
| **Impacto** | Medio |
| **Quién decide** | Audiólogas con gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ATE-11 |
| **Nota del analista** | Cualquiera que sea la opción, **la versión original debe conservarse siempre** |

---

## D-21 · ¿Se comparten indicadores de productividad? 🟡

| | |
|---|---|
| **Decisión** | ¿Los indicadores por profesional se comparten con el equipo o son solo para gerencia? |
| **Motivo** | Es el punto donde el sistema puede percibirse como herramienta de vigilancia (riesgo R-02) |
| **Opciones** | **a)** Cada quien ve solo lo suyo · **b)** Todos ven todo · **c)** Solo gerencia · **d)** No se implementan |
| **Impacto** | **Alto en la confianza del equipo**, bajo en lo técnico |
| **Quién decide** | Gerencia |
| **Fase límite** | F6 |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-ROL-13, P-GER-08 |
| **Nota del analista** | Conviene acordarlo **con el equipo, no sobre el equipo**. Un sistema percibido como vigilancia deja de usarse bien |

---

## D-22 · Cómo se calcula el porcentaje digitalizado 🟠

| | |
|---|---|
| **Decisión** | ¿Qué documentos componen una ficha completa? |
| **Motivo** | **[C]** El encargo pide mostrar el porcentaje digitalizado. **No se puede calcular un porcentaje sin conocer el total** |
| **Opciones** | **a)** Definir una lista de documentos esperados y calcular el porcentaje · **b)** Usar estados simples en lugar de porcentaje · **c)** Porcentaje diferenciado por tipo de paciente |
| **Impacto** | Medio. Bloquea F1-10, F2-15 y A-12 |
| **Quién decide** | Gerencia con recepción, tras revisar el archivo |
| **Fase límite** | F1 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-DOC-01 |
| **Nota del analista** | Se recomienda **empezar con la opción (b)**. Es honesta y no exige una definición prematura. Puede migrarse a porcentaje después |

---

## D-23 · Catálogo de tipos de atención 🟠

| | |
|---|---|
| **Decisión** | ¿Cuáles son todos los tipos de atención que realiza Proaudio? |
| **Motivo** | Necesario para el registro de atención y para las automatizaciones de seguimiento. **No se inventa** **[C, principio 6]** |
| **Opciones** | Debe enumerarlos Proaudio |
| **Impacto** | Alto. Bloquea F1-09, F2-06 y A-06 |
| **Quién decide** | Audiólogas |
| **Fase límite** | F1 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-ATE-02 |
| **Nota del analista** | Debe distinguirse de los motivos de cita (D-02): el motivo es por qué **viene**; el tipo de atención es qué **se hizo**. Pueden no coincidir |

---

## D-24 · ¿La información económica entra al sistema? 🟠

| | |
|---|---|
| **Decisión** | ¿Precios, costos y rentabilidad se registran aquí o se manejan aparte? |
| **Motivo** | El encargo menciona indicadores económicos como necesidad futura, pero no aclara de dónde saldrían los datos |
| **Opciones** | **a)** Sí, dentro del sistema · **b)** No, se maneja en contabilidad · **c)** Solo datos mínimos para calcular indicadores |
| **Impacto** | Alto en el alcance de las fases 5 y 6, y en los permisos |
| **Quién decide** | Gerencia |
| **Fase límite** | F2 (para no diseñar campos que no se usarán) |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-AUD-10, P-GER-07 |
| **Nota del analista** | Si ya existe un sistema contable, duplicar la información genera inconsistencias. La opción (c) suele ser suficiente |

---

## D-25 · Estructura de los datos de audiometría 🟠

| | |
|---|---|
| **Decisión** | ¿Se guardan las audiometrías como documento adjunto o se estructuran sus valores numéricos? |
| **Motivo** | Estructurar permitiría comparar y graficar la evolución, pero exige definiciones clínicas que **no han sido descritas** |
| **Opciones** | **a)** Solo documento adjunto · **b)** Estructura completa de valores · **c)** Documento adjunto ahora, estructura más adelante |
| **Impacto** | Medio ahora, alto en el futuro |
| **Quién decide** | Audiólogas |
| **Fase límite** | F2 |
| **Estado** | 🟠 Abierta — urgente |
| **Preguntas asociadas** | P-AUM-01 a P-AUM-05 |
| **Nota del analista** | Se recomienda la opción (c). Antes de estructurar hay que ver el formato real que produce el equipo y saber si puede exportar datos. **Este análisis no define ninguna estructura clínica por su cuenta** |

---

## D-26 · Número de intentos de contacto 🟡

| | |
|---|---|
| **Decisión** | ¿Cuántas veces se intenta contactar a un paciente antes de cerrar el seguimiento? |
| **Motivo** | Sin regla, unos insisten demasiado y otros desisten pronto |
| **Opciones** | **a)** 1 intento · **b)** 2 o 3 intentos en días distintos · **c)** Hasta lograr contacto · **d)** Variable según el tipo de seguimiento |
| **Impacto** | Medio. Afecta el volumen de trabajo |
| **Quién decide** | Recepción con gerencia |
| **Fase límite** | F2 |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-SEG-07, P-SEG-08 |

---

## D-27 · Marca de "no desea ser contactado" 🔴

| | |
|---|---|
| **Decisión** | ¿Cómo se registra y respeta la voluntad de un paciente de no ser contactado? |
| **Motivo** | **Es un requisito previo indispensable para cualquier envío automático.** También aplica a pacientes fallecidos |
| **Opciones** | **a)** Marca simple de exclusión total · **b)** Exclusión por canal (no WhatsApp pero sí llamada) · **c)** Exclusión por tipo de mensaje |
| **Impacto** | **Máximo en la Fase 3.** Sin esto, no debe activarse ningún envío |
| **Quién decide** | Gerencia |
| **Fase límite** | **Antes de iniciar la F3** |
| **Estado** | 🔴 Abierta — bloqueante para F3 |
| **Preguntas asociadas** | P-PAC-13, P-PAC-14, P-PRO-03, P-SEG-15 |
| **Nota del analista** | Debería implementarse ya en la **Fase 2**, aunque todavía no haya envíos automáticos, para que el dato esté disponible cuando llegue la Fase 3. También hace falta una forma de marcar pacientes fallecidos |

---

## D-28 · Futuro del archivo físico en papel 🟡

| | |
|---|---|
| **Decisión** | ¿El papel se conserva indefinidamente, se archiva o se destruye tras digitalizar? |
| **Motivo** | **[C]** El encargo habla de conservar "temporalmente" la ubicación física, lo que sugiere una intención de eliminarlo, pero no se ha definido |
| **Opciones** | **a)** Conservar todo indefinidamente · **b)** Conservar y trasladar a archivo pasivo · **c)** Destruir tras digitalizar y verificar · **d)** Depende del tipo de documento |
| **Impacto** | Alto en costo de espacio y en riesgo legal |
| **Quién decide** | Gerencia, con asesoría legal |
| **Fase límite** | F4 |
| **Estado** | 🟡 Abierta |
| **Preguntas asociadas** | P-DOC-12, P-DOC-13 |
| **Nota del analista** | **Este análisis no recomienda destruir ningún documento.** La decisión tiene implicaciones legales que exceden su alcance |

---

# LAS DIEZ DECISIONES MÁS URGENTES

Si solo se pudieran cerrar diez decisiones en la próxima reunión, deberían ser estas:

| Orden | ID | Decisión | Qué desbloquea |
|---|---|---|---|
| 1 | **D-01** | Identificador único del paciente | Toda la estructura de fichas y la digitalización |
| 2 | **D-11** | Marco de protección de datos | Permiso ético y legal para cargar datos reales |
| 3 | **D-08** | Definición de paciente inactivo | El objetivo central del proyecto |
| 4 | **D-02** | Catálogo de motivos de cita | Agenda y formularios |
| 5 | **D-03** | Frecuencias de recordatorios | Todas las automatizaciones |
| 6 | **D-05** | Reglas de garantía | Avisos de vencimiento y Ola 3 |
| ~~7~~ | ~~**D-10**~~ | ~~Sucursales~~ | ✅ **Resuelta el 2 ago 2026:** una sola sucursal, en Ibarra |
| 8 | **D-04** | Categorías S+, A, B | Clasificación de pacientes |
| 9 | **D-23** | Tipos de atención | Registro de atención |
| 10 | **D-27** | Marca de "no contactar" | Toda la Fase 3 |

---

# REGISTRO DE DECISIONES RESUELTAS

| ID | Decisión | Respuesta | Quién decidió | Fecha |
|---|---|---|---|---|
| **D-10** | Número y operación de las sucursales | **Una sola sucursal, en Ibarra.** No hay operación multisucursal. El campo se conserva en el modelo de datos por si en el futuro se abre otra | José González / Proaudio | 2 ago 2026 |

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| El principio de registrar los vacíos como decisiones pendientes | **Confirmado** — principio 7 del encargo |
| **Las 28 decisiones identificadas** | **Detectadas por el analista** al elaborar los documentos 1 a 9 |
| **Las opciones propuestas** | **Sugerencias del analista** — Proaudio puede elegir otras |
| **Las notas y recomendaciones** | **Opinión profesional**, no obligatoria |
| **Todas las respuestas** | **Pendientes en su totalidad** |
| Fechas límite por fase | **Propuesta del analista** |
