# Documento 2 — Mapa del proceso actual y del proceso futuro

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (borrador para validación)
**Fecha:** 1 de agosto de 2026

---

## Advertencia metodológica — leer antes de continuar

**El proceso actual descrito en este documento NO ha sido observado.** No se ha realizado todavía ninguna visita, entrevista ni revisión de documentos reales de Proaudio Ibarra. Lo que aquí se llama "proceso actual" es, en su mayor parte, **una reconstrucción hipotética** basada únicamente en lo declarado en el encargo.

Cada paso lleva un marcador obligatorio:

| Marcador | Significado | Cómo tratarlo |
|---|---|---|
| **[C] CONFIRMADO** | Declarado explícitamente por Proaudio | Puede usarse como base de diseño |
| **[I] INFERENCIA** | Deducción del analista, plausible pero no verificada | **No usar como base sin confirmar** |
| **[V] POR VALIDAR** | Vacío de información | Requiere respuesta antes de diseñar |

> **Todo el apartado "proceso actual" debe recorrerse en persona con el equipo de Proaudio antes de dar por válido el diseño futuro.** Este documento sirve como guion de esa sesión: cada **[I]** es una hipótesis que confirmar o corregir, cada **[V]** es una pregunta que hacer.

---

## PARTE A — PROCESO ACTUAL (reconstrucción hipotética)

### A.0 Lo único confirmado sobre la operación actual

Estas cinco afirmaciones son las únicas con respaldo directo del encargo:

1. **[C]** La empresa atiende personas con problemas auditivos y comercializa, adapta, mantiene y repara audífonos.
2. **[C]** Lleva más de 21 años operando.
3. **[C]** Conserva gran cantidad de información en documentos y fichas físicas.
4. **[C]** Usa Google Calendar para manejar las citas.
5. **[C]** La agenda no está correctamente conectada con fichas, historiales, garantías, audiometrías, reparaciones ni seguimientos.

**Todo lo que sigue en la Parte A es inferencia o vacío.**

---

### A.1 Registro de un paciente nuevo

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | El paciente llega a la sucursal, llama por teléfono o escribe por algún canal | **[I]** |
| 2 | La recepcionista pregunta si ya ha sido atendido antes | **[I]** |
| 3 | Si es nuevo, se abre una ficha o cartilla física | **[I]** — se sabe que existen fichas físicas **[C]**, pero no cuándo ni quién las crea |
| 4 | Se anotan datos personales y de contacto en la ficha | **[I]** |
| 5 | Se anota cómo conoció Proaudio y quién lo refirió | **[I]** — el encargo pide registrar estos campos **[C]**, lo que sugiere que hoy se preguntan, pero no está confirmado |
| 6 | La ficha se archiva en un lugar físico determinado | **[I]** |
| 7 | Se agenda la primera cita en Google Calendar | **[I]** |

**Vacíos críticos de este proceso:**

- **[V]** ¿Qué formulario o formato de ficha se usa? ¿Es el mismo en todas las sucursales? ¿Ha cambiado a lo largo de los 21 años?
- **[V]** ¿Qué dato se usa hoy para saber si un paciente ya existe: cédula, nombre completo, teléfono, número de ficha?
- **[V]** ¿Existe un número o código de paciente? ¿Es correlativo? ¿Se reinicia por sucursal o por año?
- **[V]** ¿Se registra al paciente antes o después de la primera atención?
- **[V]** ¿Quién crea la ficha: recepción o la audióloga?
- **[V]** ¿Existe algún archivo digital paralelo (Excel, Word, agenda personal, cuaderno)?
- **[V]** ¿Se firma algún consentimiento o autorización de datos?

> **Riesgo si esto no se aclara:** el sistema puede quedar diseñado alrededor de un identificador que en la práctica no existe o no se conoce al momento de crear la ficha. → *Decisión D-01.*

---

### A.2 Creación de una cita

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | El paciente solicita cita por teléfono, presencialmente o por mensaje | **[I]** |
| 2 | La recepcionista revisa Google Calendar buscando disponibilidad | **[I]** — el uso de Google Calendar sí está confirmado **[C]** |
| 3 | Verifica la disponibilidad de la audióloga o profesional correspondiente | **[I]** |
| 4 | Crea el evento con el nombre del paciente y algún dato del motivo | **[I]** |
| 5 | Informa al paciente de la fecha y hora | **[I]** |
| 6 | La ficha física **no** se actualiza con esta información | **[I]** — coherente con la desconexión confirmada **[C]** |

**Vacíos críticos:**

- **[V]** ¿Cuántos calendarios existen? ¿Uno por sucursal, uno por audióloga, uno general?
- **[V]** ¿Qué se escribe exactamente en el título y en la descripción del evento? ¿Hay un formato acordado?
- **[V]** ¿Se registra el motivo de la cita? ¿Con qué palabras?
- **[V]** ¿Se registra el teléfono del paciente en el evento?
- **[V]** ¿Qué duración tiene cada tipo de cita?
- **[V]** ¿Existen horarios bloqueados, almuerzos, días de visita a otras localidades?
- **[V]** ¿Quién más puede crear citas además de recepción?
- **[V]** ¿Cómo se maneja una cita sin paciente identificado (por ejemplo, alguien que solo pregunta)?
- **[V]** ¿Se confirma la cita con el paciente antes? ¿Cómo?

---

### A.3 Registro de una atención

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | El paciente llega a la sucursal | **[I]** |
| 2 | Recepción localiza la ficha física en el archivo | **[I]** |
| 3 | La ficha se entrega a la audióloga | **[I]** |
| 4 | La audióloga atiende y anota lo realizado en la ficha, a mano | **[I]** |
| 5 | Si se hace audiometría, el resultado se imprime o se anota y se adjunta a la ficha | **[I]** |
| 6 | Si se entrega o adapta un audífono, se anotan marca, modelo, oído y serie | **[I]** — el encargo pide estos campos **[C]** |
| 7 | Se le indica verbalmente al paciente qué debe hacer y cuándo volver | **[I]** |
| 8 | La ficha regresa al archivo | **[I]** |
| 9 | El evento de Google Calendar **no** se actualiza con el resultado | **[I]** |

**Vacíos críticos:**

- **[V]** ¿Existe un formato estructurado de registro de atención o es texto libre?
- **[V]** ¿Qué información se registra siempre y cuál solo a veces?
- **[V]** ¿Dónde se guarda el resultado de la audiometría: papel, equipo, software del audiómetro, todo lo anterior?
- **[V]** ¿El equipo de audiometría genera archivo digital? ¿En qué formato? ¿Se puede exportar?
- **[V]** ¿Cómo se registra hoy la venta o entrega de un audífono? ¿Hay un documento aparte (factura, contrato, certificado de garantía)?
- **[V]** ¿Se registra en algún lado que el paciente debe volver, o queda solo en la indicación verbal?
- **[V]** ¿Qué pasa cuando el paciente no se presenta? ¿Se anota en algún lugar?

> **Este es el punto más importante a observar en la primera visita.** Registrar la atención es la tarea que más resistencia genera si el sistema la hace más lenta que el papel.

---

### A.4 Seguimiento de pacientes

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | La audióloga o la recepcionista recuerda que un paciente debe volver | **[I]** |
| 2 | El recordatorio puede quedar como nota personal, evento de calendario o memoria | **[I]** |
| 3 | Alguien contacta al paciente por teléfono o mensaje | **[I]** |
| 4 | El resultado de ese contacto no queda registrado de forma consultable | **[I]** — coherente con la desconexión confirmada **[C]** |
| 5 | Si el paciente no responde o no vuelve, nada lo señala automáticamente | **[I]** |

**Vacíos críticos:**

- **[V]** ¿Existe hoy algún seguimiento sistemático o depende de cada persona?
- **[V]** ¿Alguien revisa periódicamente qué pacientes no han vuelto?
- **[V]** ¿Cuántos intentos de contacto se hacen antes de desistir?
- **[V]** ¿Qué canal se usa más: llamada, WhatsApp, mensaje de texto?
- **[V]** ¿En qué horario se contacta a los pacientes?
- **[V]** ¿A partir de cuánto tiempo se considera que un paciente "se perdió"?
- **[V]** ¿Los tipos de seguimiento listados en el encargo (audiometría anual, control periódico, garantía por vencer, etc.) se hacen hoy en la práctica, o son aspiraciones a futuro?

> **Pregunta que cambia el alcance:** si estos seguimientos hoy **no se hacen**, el sistema no está automatizando un proceso existente, sino **creando un proceso nuevo**. Eso implica definir reglas, responsables y capacidad de atención antes de programar nada. → *Pregunta P-SEG-01, decisión D-08.*

---

### A.5 Consulta de documentos físicos

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | Alguien necesita un dato de un paciente | **[I]** |
| 2 | Va al archivo físico y busca por nombre o por número | **[I]** |
| 3 | Localiza la carpeta o ficha | **[I]** |
| 4 | La consulta, la fotografía o la lleva al puesto de trabajo | **[I]** |
| 5 | La devuelve al archivo | **[I]** |
| 6 | Si la ficha no está en su lugar, hay que averiguar quién la tiene | **[I]** |

**Vacíos críticos:**

- **[V]** ¿Cómo está organizado el archivo: alfabético, numérico, por año, por sucursal, por audióloga?
- **[V]** ¿Cuántas fichas hay aproximadamente?
- **[V]** ¿Están todas en un solo lugar o repartidas entre sucursales?
- **[V]** ¿Existen fichas de pacientes que ya no asisten hace años, mezcladas con las activas?
- **[V]** ¿Hay algún control de préstamo de fichas?
- **[V]** ¿En qué estado físico están los documentos más antiguos?
- **[V]** ¿Con qué frecuencia se consulta el archivo?
- **[V]** ¿Se ha digitalizado algo previamente?

> El encargo confirma **[C]** que se requiere "registrar temporalmente dónde se encuentra su archivo físico", lo que sugiere **[I]** que la ubicación de las fichas es hoy un problema real.

---

### A.6 Gestión de controles y garantías

| Paso | Descripción hipotética | Marcador |
|---|---|---|
| 1 | Al entregar un audífono se genera algún respaldo de garantía | **[I]** |
| 2 | La vigencia de la garantía depende de marca, modelo o proveedor | **[I]** |
| 3 | El control de vencimiento depende de que alguien lo recuerde o revise el papel | **[I]** |
| 4 | El paciente puede enterarse tarde de que su garantía venció | **[I]** |
| 5 | Los controles periódicos se indican verbalmente al paciente | **[I]** |
| 6 | No existe alerta automática de garantía por vencer ni de control pendiente | **[I]** |

**Vacíos críticos:**

- **[V]** ¿Qué garantías existen y cuánto duran? ¿Difieren por marca o por tipo de equipo?
- **[V]** ¿La garantía la otorga Proaudio, el fabricante, o ambos?
- **[V]** ¿Desde qué fecha corre: compra, entrega, adaptación?
- **[V]** ¿Qué cubre y qué no?
- **[V]** ¿Existe garantía sobre reparaciones?
- **[V]** ¿Cuál es la frecuencia real de los controles periódicos? ¿Es la misma para todos los pacientes?
- **[V]** ¿La audiometría anual es una política de la empresa, una recomendación clínica, o ambas?
- **[V]** ¿Qué pasa hoy cuando un paciente llega con un problema y su garantía venció?

---

### A.7 Reparaciones

**Nota:** el encargo confirma **[C]** que la empresa repara audífonos y que la ficha deberá permitir consultar reparaciones. **El proceso de reparación no fue descrito.** Por principio 6 del proyecto, **no se inventa aquí ningún flujo de taller.**

- **[V]** ¿Cómo se recibe un equipo para reparación?
- **[V]** ¿Se repara en Ibarra o se envía a un tercero o al fabricante?
- **[V]** ¿Qué documento se le entrega al paciente al recibir el equipo?
- **[V]** ¿Cómo se le avisa cuando está listo?
- **[V]** ¿Cuánto demora habitualmente?
- **[V]** ¿Se presta un equipo de reemplazo mientras tanto?
- **[V]** ¿Cómo se controlan los repuestos?

> **Recomendación:** el módulo de reparaciones se mantiene en **Fase 5**. Intentar diseñarlo ahora, sin conocer el proceso, produciría un diseño equivocado.

---

### A.8 Resumen visual del proceso actual

```
                      ┌──────────────────────────┐
                      │   GOOGLE CALENDAR  [C]   │
                      │   Citas: fecha, hora,    │
                      │   nombre del paciente    │
                      └──────────────────────────┘
                                   ╎
                                   ╎  ← SIN CONEXIÓN  [C]
                                   ╎
                      ┌──────────────────────────┐
                      │   ARCHIVO FÍSICO  [C]    │
                      │   Fichas, historiales,   │
                      │   audiometrías,          │
                      │   garantías, documentos  │
                      └──────────────────────────┘
                                   ╎
                                   ╎  ← SIN CONEXIÓN  [I]
                                   ╎
                      ┌──────────────────────────┐
                      │  SEGUIMIENTO             │
                      │  Memoria del personal,   │
                      │  notas sueltas  [I]      │
                      └──────────────────────────┘

   La información existe, pero cada pieza vive aislada de las demás.
   Conectarlas es hoy trabajo manual de una persona.
```

---

## PARTE B — PROCESO FUTURO PROPUESTO

Esta parte describe **cómo debería funcionar** el proceso una vez implementado el MVP (Fase 2). Es una **propuesta de diseño**, no una descripción de la realidad. Debe validarse con el equipo.

Cada paso indica la fase en la que estaría disponible.

---

### B.1 Registro de un paciente nuevo (Fase 2)

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | La recepcionista busca al paciente en la lista, escribiendo nombre, cédula o teléfono | F2 |
| 2 | El sistema muestra coincidencias aproximadas y avisa si hay pacientes con datos similares, **para evitar duplicados** | F2 |
| 3 | Si no existe, presiona "Paciente nuevo" | F2 |
| 4 | Completa el **mínimo obligatorio**: nombre completo, teléfono, sucursal. Todo lo demás es opcional | F2 |
| 5 | Opcionalmente registra: cédula, correo, ciudad, cómo conoció Proaudio, quién lo refirió, audióloga responsable | F2 |
| 6 | El sistema guarda automáticamente quién creó la ficha y cuándo **[C, principio 15]** | F2 |
| 7 | La ficha nace con estado de digitalización **0%** y sin ubicación física asignada | F2 |
| 8 | Desde la misma pantalla se ofrece agendar la primera cita | F2 |
| 9 | Si es paciente nuevo, se genera opcionalmente una tarea de bienvenida para recepción | F2 (tarea interna) / F3 (mensaje) |

**Principio de diseño:** *un paciente nuevo debe poder crearse en menos de un minuto con tres campos.* Si crear una ficha es lento, el equipo dejará de hacerlo.

---

### B.2 Creación de una cita (Fase 2)

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | Se accede a la agenda o directamente desde la ficha del paciente | F2 |
| 2 | Se selecciona el paciente (obligatorio — **toda cita está vinculada a una ficha**) | F2 |
| 3 | Se elige fecha, hora y duración | F2 |
| 4 | Se elige el profesional que atenderá | F2 |
| 5 | Se elige la sucursal | F2 |
| 6 | Se elige el **motivo** de una lista predefinida (catálogo por definir, D-02) | F2 |
| 7 | Se pueden agregar notas para la cita | F2 |
| 8 | La cita nace en estado **"Agendada"** | F2 |
| 9 | El sistema propone automáticamente un recordatorio previo, que el usuario puede aceptar, editar o eliminar **[C, principio 14]** | F2 (interno) / F3 (envío) |
| 10 | La cita aparece en la agenda y en la línea de tiempo del paciente **inmediatamente** | F2 |
| 11 | Opcionalmente, la cita se refleja en Google Calendar como vista de solo lectura | F2/F3 — **[C]** Google Calendar es vista temporal, no base. Mecanismo por definir (D-06) |

**Estados de la cita** **[C, listados en el encargo]**:

```
   AGENDADA ──► CONFIRMADA ──► COMPLETADA
      │              │
      │              ├──► NO ATENDIDA (no-show)
      │              │
      ├──────────────┼──► REAGENDADA ──► (nueva cita vinculada a la anterior)
      │              │
      └──────────────┴──► CANCELADA
```

- **[V]** ¿Se requiere un estado intermedio "En sala" o "Atendiendo"? → *Pregunta P-AGE-09.*
- **[V]** ¿Quién puede cancelar una cita y con cuánta anticipación? → *Decisión D-07.*
- **Regla propuesta:** al reagendar o cancelar, el sistema **pide un motivo** y conserva la cita original en el historial. Nada se borra **[C, principio 13]**.

---

### B.3 Registro de una atención (Fase 2)

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | La audióloga abre la cita del día desde la agenda | F2 |
| 2 | Desde la cita accede a la ficha en un clic **[C, requerimiento explícito]** | F2 |
| 3 | Antes de atender ve un **resumen de contexto**: última atención, última indicación, audífono en uso, estado de garantía, próxima acción recomendada | F2 |
| 4 | Atiende al paciente | — |
| 5 | Presiona "Registrar atención" | F2 |
| 6 | Escribe la observación de esta atención en un campo nuevo. **La observación anterior no se toca** **[C, principio 13]** | F2 |
| 7 | Registra qué se realizó (según catálogo por definir) | F2 |
| 8 | Registra la **indicación dada al paciente** | F2 |
| 9 | Si corresponde, adjunta audiometría, foto de la cartilla o documento | F2 |
| 10 | Si corresponde, registra o actualiza el audífono (marca, modelo, oído, serie) **[C]** | F2 |
| 11 | Define la **próxima acción**: agendar cita ahora, programar recordatorio para más adelante, o marcar que no requiere seguimiento | F2 |
| 12 | Al guardar, la cita pasa a **"Completada"** automáticamente | F2 |
| 13 | La atención se añade a la línea de tiempo con autor y fecha **[C, principio 15]** | F2 |

**Principio de diseño:** *la audióloga no debería tener que abrir más de una pantalla para registrar una atención normal.* Todo lo opcional se despliega solo si se necesita.

- **[V]** ¿Qué campos de la atención deben ser obligatorios? El diseño propone **solo la observación**. → *Pregunta P-ATE-03.*

---

### B.4 Seguimiento (Fase 2 interno, Fase 3 externo)

El seguimiento futuro se apoya en un concepto central: **el Centro de Recordatorios**, una única pantalla donde aparece todo lo que hay que hacer hoy.

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | El sistema genera automáticamente seguimientos según reglas configurables | F2 |
| 2 | Cada seguimiento aparece en el Centro de Recordatorios con: paciente, motivo, fecha prevista, responsable | F2 |
| 3 | La recepcionista abre su lista del día y ve a quién contactar y por qué | F2 |
| 4 | Puede abrir la ficha del paciente desde el recordatorio, sin perder su lugar en la lista | F2 |
| 5 | Realiza el contacto y **registra el resultado**: contactado, no contesta, número equivocado, reagendó, no desea continuar | F2 |
| 6 | Puede **posponer** el recordatorio a otra fecha **[C, principio 14]** | F2 |
| 7 | Puede **cancelar** el recordatorio indicando el motivo **[C, principio 14]** | F2 |
| 8 | Puede **editar** la fecha y el contenido **[C, requerimiento explícito]** | F2 |
| 9 | Todo queda registrado en la línea de tiempo del paciente con autor y fecha | F2 |
| 10 | Más adelante, algunos recordatorios se envían automáticamente al paciente por WhatsApp o correo | F3 |
| 11 | El sistema registra el estado del envío **[C, requerimiento explícito]** | F3 |

**Tipos de seguimiento** **[C, todos listados en el encargo]**:

| Tipo | Destinatario | Naturaleza |
|---|---|---|
| Recordatorio de cita | Paciente | Mensaje |
| Cita pendiente de confirmación | Recepcionista | Tarea interna |
| Audiometría anual | Paciente | Mensaje |
| Control periódico | Paciente | Mensaje |
| Garantía próxima a vencer | Paciente + recepcionista | Mensaje + tarea |
| Seguimiento posterior a una atención | Paciente | Mensaje |
| Reparación terminada | Paciente | Mensaje |
| Paciente que dejó de asistir | Recepcionista | Tarea interna |
| Llamada humana pendiente | Recepcionista | Tarea interna |
| Mensaje de bienvenida a paciente nuevo | Paciente | Mensaje |

*Detalle completo de reglas, canales y estados en el Documento 6.*

---

### B.5 Consulta de documentos (Fase 2, ampliada en Fase 4)

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | Se busca al paciente y se abre su ficha | F2 |
| 2 | La ficha muestra un indicador visible: **"Ficha digitalizada al X%"** **[C]** | F2 |
| 3 | Muestra también la **ubicación del archivo físico** (ej.: "Archivo Ibarra Centro, estante 4, carpeta 128") **[C]** | F2 |
| 4 | Los documentos ya digitalizados se ven en pantalla, ordenados por fecha y tipo | F2 |
| 5 | Si falta un documento, se puede fotografiar o escanear y subirlo en el momento | F2 |
| 6 | Al subirlo, el porcentaje de digitalización se actualiza | F2 |
| 7 | Si la ficha física está prestada, el sistema indica quién la tiene y desde cuándo | F2 |
| 8 | Progresivamente, la ficha física deja de ser necesaria para la consulta cotidiana | F4 |

**Concepto clave — digitalización oportunista:** **[C, criterio de Proaudio]** los documentos se digitalizan **cuando el paciente vuelve**, no todos de una vez. Cada visita mejora la ficha. Esto convierte la digitalización en un subproducto de la operación normal, en lugar de un proyecto aparte. *Ver Documento 7.*

---

### B.6 Controles y garantías (Fase 2 básico, Fase 5 completo)

| Paso | Descripción propuesta | Fase |
|---|---|---|
| 1 | Al registrar la entrega de un audífono se registra la garantía asociada | F2 |
| 2 | Se registra fecha de inicio, duración y fecha de vencimiento | F2 (regla de cálculo por definir, D-05) |
| 3 | El sistema genera automáticamente un aviso antes del vencimiento | F2 (interno) |
| 4 | El aviso aparece en el Centro de Recordatorios del responsable | F2 |
| 5 | La ficha muestra el estado de la garantía con color: vigente / por vencer / vencida | F2 |
| 6 | Los controles periódicos se programan al cerrar cada atención | F2 |
| 7 | El sistema avisa cuando se acerca la fecha del control o de la audiometría anual | F2 |
| 8 | El seguimiento de reparaciones y repuestos se incorpora completo | F5 |

- **[V]** Las reglas de duración de garantía y de frecuencia de control **no están definidas**. Sin ellas, estos avisos **no pueden construirse**. → *Decisiones D-05 y D-03.*

---

### B.7 Resumen visual del proceso futuro

```
                    ┌───────────────────────────────────┐
                    │      FICHA DEL PACIENTE           │
                    │   Fuente central de información   │
                    │            [C]                    │
                    └───────────────────────────────────┘
                       ▲      ▲      ▲      ▲      ▲
           ┌───────────┘      │      │      │      └───────────┐
           │                  │      │      │                  │
    ┌──────┴─────┐   ┌────────┴──┐  │  ┌───┴────────┐  ┌──────┴──────┐
    │   AGENDA   │   │ ATENCIONES│  │  │ DOCUMENTOS │  │  AUDÍFONOS  │
    │   Citas    │   │ Historial │  │  │ Digitaliz. │  │  Garantías  │
    └──────┬─────┘   └────────┬──┘  │  └────────────┘  └──────┬──────┘
           │                  │      │                          │
           └──────────┬───────┴──────┴──────────────────────────┘
                      ▼
        ┌───────────────────────────────┐
        │   CENTRO DE RECORDATORIOS     │
        │   Qué hacer hoy y con quién   │
        │   Editable, posponible,       │
        │   cancelable por un humano [C]│
        └───────────────────────────────┘
                      │
                      ▼  (Fase 3)
        ┌───────────────────────────────┐
        │   WhatsApp · Correo · Llamada │
        │   con registro de estado      │
        └───────────────────────────────┘

    Google Calendar queda como vista espejo temporal, no como base. [C]
```

---

## PARTE C — DIFERENCIAS CLAVE ENTRE EL PROCESO ACTUAL Y EL FUTURO

| Aspecto | Hoy | Futuro propuesto | Fase |
|---|---|---|---|
| Fuente de verdad | Repartida entre calendario y papel **[C]** | Ficha del paciente **[C]** | F2 |
| Vínculo cita ↔ ficha | Inexistente **[C]** | Directo, en un clic | F2 |
| Resultado de la cita | No se registra de forma consultable **[I]** | Estado obligatorio en toda cita pasada | F2 |
| Historial de observaciones | En papel, riesgo de sobrescritura **[I]** | Línea de tiempo acumulativa, nada se borra **[C]** | F2 |
| Seguimiento | Depende de la memoria **[I]** | Lista de trabajo diaria generada por el sistema | F2 |
| Contacto con el paciente | Sin registro consultable **[I]** | Registrado con resultado y responsable | F2 |
| Aviso de garantía | No existe **[I]** | Automático con anticipación configurable | F2 |
| Detección de abandono | No existe **[I]** | Tarea automática al superar el plazo definido | F2 |
| Consulta de documentos | Requiere el archivo físico **[I]** | En pantalla, con indicador de avance | F2→F4 |
| Ubicación de la ficha física | Se averigua preguntando **[I]** | Campo consultable en la ficha **[C]** | F2 |
| Trazabilidad | Depende de la letra y la memoria **[I]** | Autor y fecha en cada registro **[C]** | F2 |
| Medición | No es posible **[I]** | Datos estructurados desde el primer día | F2→F6 |

---

## PARTE D — LO QUE DEBE VALIDARSE ANTES DE DISEÑAR

### D.1 Observación presencial recomendada

Antes de dar por bueno el proceso futuro, se recomienda **una jornada de observación en sitio** que incluya:

1. Ver a la recepcionista agendar tres citas reales, sin intervenir.
2. Ver a una audióloga atender y registrar (con autorización del paciente y sin acceder a datos identificables).
3. Recorrer el archivo físico y ver cómo se busca una ficha.
4. Fotografiar (sin datos de pacientes) el formato de ficha, el formato de garantía y el formato de audiometría.
5. Ver la estructura real de Google Calendar.
6. Cronometrar cuánto toma hoy: crear un paciente, agendar una cita, localizar una ficha.

### D.2 Los diez vacíos que más afectan el diseño

| # | Vacío | Qué bloquea | Decisión |
|---|---|---|---|
| 1 | Identificador único del paciente | Toda la estructura de fichas y la prevención de duplicados | D-01 |
| 2 | Catálogo real de motivos de cita | Agenda, formularios y automatizaciones | D-02 |
| 3 | Frecuencia real de controles | Reglas de recordatorio automático | D-03 |
| 4 | Criterio de las categorías S+, A, B | Clasificación de pacientes y priorización | D-04 |
| 5 | Reglas de garantía | Avisos de vencimiento | D-05 |
| 6 | Rol definitivo de Google Calendar | Arquitectura de la agenda | D-06 |
| 7 | Existencia real de seguimientos hoy | Si se automatiza o se crea un proceso nuevo | D-08 |
| 8 | Estructura y tamaño del archivo físico | Estrategia de digitalización | D-09 |
| 9 | Número y operación de las sucursales | Agenda, permisos y archivo | D-10 |
| 10 | Marco de protección de datos de salud | Permisos, almacenamiento y mensajería | D-11 |

---

## Anexo — Declaración de origen de la información de este documento

| Contenido | Estado |
|---|---|
| Que existen fichas físicas, Google Calendar y desconexión entre ambos | **Confirmado** |
| Que la empresa vende, adapta, mantiene y repara audífonos | **Confirmado** |
| Los diez tipos de seguimiento listados | **Confirmado como deseo**; no confirmado como práctica actual |
| Los estados de cita | **Confirmado como requerimiento** |
| **Todos los pasos operativos de la Parte A** | **Inferencia no verificada** |
| Todo el proceso futuro de la Parte B | **Propuesta de diseño sujeta a validación** |
| Proceso de reparaciones | **No descrito. No se inventa.** |
| Cifras, volúmenes, tiempos y frecuencias | **Pendiente en su totalidad** |
