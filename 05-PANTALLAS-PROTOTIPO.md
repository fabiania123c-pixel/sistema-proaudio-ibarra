# Documento 5 — Pantallas del primer prototipo

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (especificación funcional del prototipo)
**Fecha:** 1 de agosto de 2026

---

## Qué es este prototipo y qué no es

### Qué es

Un conjunto de **10 pantallas navegables con datos ficticios**, cuyo único propósito es **sentar a una audióloga y a una recepcionista frente a la pantalla y preguntarles: "¿esto les sirve? ¿falta algo? ¿sobra algo?"**.

### Qué NO es

- **No guarda información.** Los datos son fijos y ficticios.
- **No se conecta a nada:** ni base de datos, ni Google Calendar, ni WhatsApp, ni correo.
- **No calcula nada:** los porcentajes, contadores y alertas son valores puestos a mano.
- **No tiene inicio de sesión.**
- **No es la aplicación definitiva.** Es un borrador visual para conversar.

### Por qué hacerlo así

Corregir una pantalla cuesta minutos. Corregir un sistema construido cuesta semanas. **Es más barato equivocarse ahora.** Además, mitiga directamente el riesgo R-02 (rechazo del equipo): las usuarias participan del diseño antes de que exista el producto.

---

## Aviso sobre los datos ficticios

**[C, principio 8]** Todos los nombres, números, fechas y datos de este documento son **inventados**. No corresponden a ninguna persona real. Cualquier parecido con un paciente real es casualidad y debe corregirse si se detecta.

### Elenco ficticio usado en todo el prototipo

**Profesionales ficticios:**

| Código | Nombre ficticio | Rol | Sucursal ficticia | Color |
|---|---|---|---|---|
| PRO-01 | Aud. Carmen Villacís | Audióloga | Ibarra Centro | Azul |
| PRO-02 | Aud. Paola Terán | Audióloga | Ibarra Centro | Verde |
| PRO-03 | Mónica Salgado | Recepcionista | Ibarra Centro | — |
| PRO-04 | Diego Peñafiel | Administrador | Ibarra Centro | — |

**Pacientes ficticios:**

| Código | Nombre ficticio | Situación de ejemplo |
|---|---|---|
| PAC-00412 | Rosa Cabascango | Paciente con audífono y garantía por vencer |
| PAC-01187 | Segundo Chalá | Paciente que no asiste hace 14 meses |
| PAC-00976 | Marina Pozo | Control periódico normal |
| PAC-01542 | Jorge Almeida | Paciente nuevo |
| PAC-00238 | Blanca Yépez | Audiometría anual pendiente |
| PAC-01903 | Luis Ipiales | Equipo en reparación |

**Sucursales ficticias:** "Ibarra Centro" y "Sucursal Norte".
→ **[V]** El número y nombre real de las sucursales está por confirmar (decisión D-10). En el prototipo se usan dos para probar el selector.

---

## Mapa de navegación del prototipo

```
                        ┌─────────────────┐
                        │  1. INICIO      │
                        │  Panel del día  │
                        └────────┬────────┘
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
      ┌──────────────┐  ┌────────────────┐  ┌──────────────┐
      │  2. AGENDA   │  │ 3. CENTRO DE   │  │ 4. LISTA DE  │
      │              │  │ RECORDATORIOS  │  │  PACIENTES   │
      └──────┬───────┘  └────────┬───────┘  └──────┬───────┘
             │                   │                 │
             │    ┌──────────────┴─────────────────┤
             │    │                                │
             ▼    ▼                                ▼
      ┌──────────────────┐              ┌──────────────────┐
      │ 8. FORMULARIO    │              │ 7. FORMULARIO    │
      │    DE CITA       │              │ PACIENTE NUEVO   │
      └────────┬─────────┘              └────────┬─────────┘
               │                                 │
               └────────────┬────────────────────┘
                            ▼
                  ┌──────────────────────┐
                  │  5. FICHA RESUMIDA   │◄──── centro de todo
                  │     DEL PACIENTE     │
                  └──────────┬───────────┘
                 ┌───────────┼───────────┐
                 ▼           ▼           ▼
        ┌────────────┐ ┌──────────┐ ┌────────────┐
        │ 6. LÍNEA   │ │ 9. REG.  │ │ 10. CARGA  │
        │ DE TIEMPO  │ │ ATENCIÓN │ │  DOCUMENTO │
        └────────────┘ └──────────┘ └────────────┘
```

**Regla de navegación del prototipo:** desde cualquier pantalla se debe llegar a la ficha del paciente en **un máximo de dos clics**.

---

# PANTALLA 1 — INICIO / PANEL DEL DÍA

### Objetivo

Que al abrir el sistema por la mañana, cualquier persona sepa en cinco segundos **qué pasa hoy y qué tiene pendiente**, sin buscar nada.

### Usuarios principales

Recepcionista (uso constante) · Audióloga (al inicio del día) · Administrador.

### Información que aparece

- Saludo con el nombre del usuario y la fecha.
- Selector de sucursal.
- **Cuatro contadores grandes:** citas de hoy · confirmadas · pendientes de confirmar · recordatorios para hoy.
- **Lista de citas de hoy** (las próximas 5): hora, paciente, profesional, motivo, estado.
- **Lista de pendientes de hoy** (los primeros 5 recordatorios y tareas).
- **Franja de alertas** con lo urgente.
- Buscador de paciente siempre visible.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  PROAUDIO          🔍 Buscar paciente...          Ibarra Centro ▾   MS   │
├──────────────────────────────────────────────────────────────────────────┤
│  Buenos días, Mónica          Sábado, 1 de agosto de 2026                │
│                                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│  │    12    │  │     8    │  │     4    │  │     7    │                 │
│  │ Citas hoy│  │Confirmad.│  │Por confir│  │Pendientes│                 │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘                 │
│                                                                          │
│  ⚠  2 garantías vencen esta semana    ⚠  3 pacientes sin contactar >30d  │
│                                                                          │
│  ┌─── CITAS DE HOY ──────────────────┐ ┌─── PENDIENTES DE HOY ─────────┐│
│  │ 09:00  Rosa Cabascango            │ │ ☐ Llamar a Segundo Chalá      ││
│  │        Control · C. Villacís  ✓   │ │   No asiste hace 14 meses     ││
│  │ 09:45  Marina Pozo                │ │ ☐ Confirmar cita de mañana    ││
│  │        Control · P. Terán     ✓   │ │   Blanca Yépez                ││
│  │ 10:30  Jorge Almeida  [NUEVO]     │ │ ☐ Avisar garantía por vencer  ││
│  │        1ª consulta · C. Villacís ⏳│ │   Rosa Cabascango  (12 días)  ││
│  │ 11:15  Blanca Yépez               │ │ ☐ Equipo listo: Luis Ipiales  ││
│  │        Audiometría · P. Terán ⏳   │ │ ☐ Bienvenida: Jorge Almeida   ││
│  │ 12:00  Luis Ipiales               │ │                               ││
│  │        Entrega · C. Villacís  ✓   │ │      Ver todos (7) →          ││
│  │        Ver agenda completa →      │ │                               ││
│  └───────────────────────────────────┘ └───────────────────────────────┘│
│                                                                          │
│  [ + Nueva cita ]   [ + Paciente nuevo ]                                 │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Lleva a |
|---|---|
| Clic en una cita | Ficha del paciente (pantalla 5) |
| Clic en un pendiente | Ficha del paciente, con el recordatorio destacado |
| "Ver agenda completa" | Agenda (pantalla 2) |
| "Ver todos" | Centro de recordatorios (pantalla 3) |
| "+ Nueva cita" | Formulario de cita (pantalla 8) |
| "+ Paciente nuevo" | Formulario de paciente (pantalla 7) |
| Buscador | Lista de pacientes filtrada (pantalla 4) |
| Cambiar sucursal | Recarga la misma pantalla con otros datos |

### Alertas importantes

- Garantías que vencen en los próximos 30 días.
- Pacientes sin contacto por más de un plazo definido **[V: el plazo debe definirlo Proaudio — D-08]**.
- Citas de hoy sin confirmar.
- Marca **[NUEVO]** en pacientes de primera vez.

### Qué NO se construye todavía

- Cifras reales o calculadas (los números son fijos).
- Gráficos o tendencias.
- Personalización del panel por usuario.
- Notificaciones emergentes.
- Cualquier indicador económico.

### Qué preguntar al validar esta pantalla

1. ¿Estos cuatro contadores son los correctos, o hay otros más útiles?
2. ¿Qué es lo primero que necesitan saber al llegar en la mañana?
3. ¿Las alertas que aparecen son las que realmente importan?

---

# PANTALLA 2 — AGENDA

### Objetivo

Reemplazar la consulta a Google Calendar con una agenda que, además de mostrar las citas, **conecte cada una con la ficha del paciente** **[C, requerimiento explícito]**.

### Usuarios principales

Recepcionista (uso constante) · Audióloga (su propia agenda).

### Información que aparece

- Selector de vista: **Día · Semana · Mes** **[C]**.
- Selector de sucursal y de profesional.
- Columnas por profesional en la vista día.
- Cada cita muestra: hora, paciente, motivo, estado (por color y símbolo).
- Leyenda de estados.

### Boceto — vista Día

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← AGENDA        [ DÍA ] Semana  Mes        Ibarra Centro ▾   Todos ▾    │
│  ◄  Sábado, 1 de agosto de 2026  ►                    [ + Nueva cita ]   │
├──────────────────────────────────────────────────────────────────────────┤
│         │  C. VILLACÍS                │  P. TERÁN                        │
│  ───────┼─────────────────────────────┼──────────────────────────────────│
│   09:00 │ ┌─────────────────────────┐ │                                  │
│         │ │ Rosa Cabascango      ✓  │ │ ┌──────────────────────────────┐ │
│   09:15 │ │ Control periódico       │ │ │ Marina Pozo               ✓  │ │
│   09:30 │ └─────────────────────────┘ │ │ Control periódico            │ │
│   09:45 │                             │ └──────────────────────────────┘ │
│   10:00 │                             │                                  │
│   10:15 │                             │                                  │
│   10:30 │ ┌─────────────────────────┐ │                                  │
│         │ │ Jorge Almeida  [NUEVO]⏳│ │                                  │
│   10:45 │ │ Primera consulta        │ │                                  │
│   11:00 │ └─────────────────────────┘ │ ┌──────────────────────────────┐ │
│   11:15 │                             │ │ Blanca Yépez              ⏳ │ │
│   11:30 │                             │ │ Audiometría anual            │ │
│   11:45 │                             │ └──────────────────────────────┘ │
│   12:00 │ ┌─────────────────────────┐ │                                  │
│         │ │ Luis Ipiales         ✓  │ │        (almuerzo)                │
│   12:15 │ │ Entrega de equipo       │ │                                  │
│         │ └─────────────────────────┘ │                                  │
├──────────────────────────────────────────────────────────────────────────┤
│  ✓ Confirmada   ⏳ Por confirmar   ✔ Completada   ✕ No atendida          │
│  ↻ Reagendada   ⊘ Cancelada                                              │
└──────────────────────────────────────────────────────────────────────────┘
```

### Boceto — vista Semana (esquema)

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← AGENDA         Día  [ SEMANA ]  Mes           Ibarra Centro ▾         │
│  ◄  27 jul – 2 ago 2026  ►                                               │
├──────────────────────────────────────────────────────────────────────────┤
│        LUN 27   MAR 28   MIÉ 29   JUE 30   VIE 31   SÁB 1                │
│  08:00                                                                   │
│  09:00  ▓▓▓▓    ▓▓▓▓     ▓▓▓▓     ▓▓▓▓     ▓▓▓▓     ▓▓▓▓                │
│  10:00  ▓▓▓▓             ▓▓▓▓     ▓▓▓▓              ▓▓▓▓                │
│  11:00           ▓▓▓▓    ▓▓▓▓              ▓▓▓▓     ▓▓▓▓                │
│  12:00  ▓▓▓▓                      ▓▓▓▓              ▓▓▓▓                │
│  ...                                                                     │
│         6 citas  4 citas  7 citas  5 citas  4 citas  5 citas             │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Clic en una cita | Abre panel lateral con detalle y botón "Abrir ficha" |
| "Abrir ficha" | Ficha del paciente (pantalla 5) **[C, requerimiento explícito]** |
| "+ Nueva cita" | Formulario de cita (pantalla 8) |
| Reagendar | Formulario de cita con datos precargados y campo de motivo |
| Cancelar | Diálogo que **exige motivo** |
| Marcar inasistencia | Cambia estado a "No atendida" y ofrece crear seguimiento **[C]** |
| Registrar atención | Pantalla 9 |
| Cambiar vista, fecha, sucursal o profesional | Recarga la vista |

### Alertas importantes

- Citas sin confirmar del día siguiente, destacadas.
- Pacientes con alerta activa (garantía por vencer, control atrasado) marcados con un símbolo en la cita.
- Aviso si se intenta agendar sobre un horario ocupado. **[V]** ¿Se permite el solapamiento? Debe preguntarse.

### Qué NO se construye todavía

- Arrastrar y soltar para mover citas.
- Sincronización con Google Calendar.
- Cálculo automático de disponibilidad.
- Bloqueo de horarios, vacaciones o feriados.
- Agenda de más de una sucursal en una sola vista.
- Vista de sala de espera.

### Qué preguntar al validar

1. ¿La vista día por columnas de profesional refleja cómo trabajan?
2. ¿Qué información de la cita necesitan ver **sin abrirla**?
3. ¿Cuánto dura cada tipo de cita? → alimenta D-02.
4. ¿Se permite agendar dos pacientes a la misma hora?

---

# PANTALLA 3 — CENTRO DE RECORDATORIOS

### Objetivo

**Es la pantalla más importante para reducir la pérdida de pacientes.** Reúne en un solo lugar todo lo que hay que hacer hoy, con quién y por qué, y permite que un humano lo controle **[C, principio 14]**.

### Usuarios principales

Recepcionista (dueña de esta pantalla) · Audióloga (sus propias alertas) · Administrador.

### Información que aparece

- Pestañas: **Hoy · Atrasados · Próximos · Completados**.
- Filtros por tipo de seguimiento y por responsable.
- Cada elemento muestra: tipo, paciente, motivo, fecha prevista, responsable, canal, estado.
- Contador de atrasados, visible y destacado.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← CENTRO DE RECORDATORIOS                     Ibarra Centro ▾           │
│  [ HOY (7) ]  Atrasados (3)  Próximos (24)  Completados                  │
│  Filtrar: Todos los tipos ▾    Responsable: Todos ▾   [ + Recordatorio ] │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ⚠ ATRASADOS ─────────────────────────────────────────────────────────   │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🔴 PACIENTE QUE DEJÓ DE ASISTIR          previsto: 20 jul (12 días)│  │
│  │    Segundo Chalá · PAC-01187 · 099-XXX-XXXX                        │  │
│  │    Última visita: 15 may 2025 (14 meses)                           │  │
│  │    Responsable: Mónica Salgado · Canal: Llamada                    │  │
│  │    [ Abrir ficha ] [ Registrar contacto ] [ Posponer ] [ Cancelar ]│  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  HOY ─────────────────────────────────────────────────────────────────   │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🟠 GARANTÍA PRÓXIMA A VENCER                        vence: 13 ago  │  │
│  │    Rosa Cabascango · PAC-00412 · Oticon Zircon 1 · Serie A4471...  │  │
│  │    Responsable: Mónica Salgado · Canal: Llamada + WhatsApp (F3)    │  │
│  │    Mensaje sugerido: "Sra. Rosa, le recordamos que la garantía..." │  │
│  │    [ Abrir ficha ] [ Registrar contacto ] [ Editar ] [ Posponer ]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🟡 CITA PENDIENTE DE CONFIRMACIÓN              cita: 2 ago 11:15   │  │
│  │    Blanca Yépez · PAC-00238 · Audiometría anual                    │  │
│  │    Responsable: Mónica Salgado                                     │  │
│  │    [ Abrir ficha ] [ Marcar confirmada ] [ Registrar contacto ]    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🔵 REPARACIÓN TERMINADA                        listo desde: 30 jul │  │
│  │    Luis Ipiales · PAC-01903 · Avisar que puede retirar             │  │
│  │    [ Abrir ficha ] [ Registrar contacto ] [ Marcar entregado ]     │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │ 🟢 BIENVENIDA A PACIENTE NUEVO                     Jorge Almeida   │  │
│  │    Primera consulta hoy 10:30 · PAC-01542                          │  │
│  │    [ Abrir ficha ] [ Marcar realizado ] [ Cancelar ]               │  │
│  └────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

### Diálogo "Registrar contacto"

```
┌──────────────────────────────────────────┐
│  REGISTRAR CONTACTO                      │
│  Paciente: Segundo Chalá                 │
│                                          │
│  Canal:    ( ) Llamada  ( ) WhatsApp     │
│            ( ) Correo   ( ) Presencial   │
│                                          │
│  Resultado:                              │
│    ( ) Contactado                        │
│    ( ) No contesta                       │
│    ( ) Número equivocado                 │
│    ( ) Agendó cita                       │
│    ( ) No desea continuar                │
│                                          │
│  Comentario: ______________________      │
│                                          │
│  ¿Programar nuevo seguimiento?           │
│    ( ) No   ( ) En 7 días  ( ) Otra fecha│
│                                          │
│            [ Cancelar ]  [ Guardar ]     │
└──────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado | Principio |
|---|---|---|
| Abrir ficha | Pantalla 5, sin perder el lugar en la lista | — |
| Registrar contacto | Diálogo anterior; queda en la línea de tiempo | **[C]** |
| Editar contenido y fecha | Formulario editable | **[C, req. explícito]** |
| Posponer | Selector de nueva fecha + motivo | **[C, principio 14]** |
| Cancelar | Exige motivo escrito | **[C, principio 14]** |
| Crear recordatorio manual | Formulario nuevo | **[C]** |
| Reasignar responsable | Cambia a otra persona | — |

### Alertas importantes

- **Atrasados siempre arriba y en rojo.** Un seguimiento atrasado es un paciente que se está perdiendo.
- Antigüedad del atraso en días.
- Aviso si un recordatorio se pospuso más de 3 veces. **[V]** El límite lo define Proaudio.
- Aviso si un paciente tiene varios seguimientos abiertos (evitar contactarlo por triplicado).

### Qué NO se construye todavía

- Envío real de mensajes por cualquier canal.
- Generación automática de recordatorios (en el prototipo están puestos a mano).
- Plantillas editables de mensaje.
- Estados de entrega o lectura.
- Reasignación automática o escalamiento.

### Qué preguntar al validar

1. ¿Esta lista se parece a lo que hoy tienen anotado en papel o en la cabeza?
2. ¿Cuántos seguimientos por día son manejables? **Si el sistema genera 80 tareas diarias y hay capacidad para 15, el sistema fracasa.** → pregunta crítica de capacidad.
3. ¿Qué resultados de contacto faltan en la lista?
4. ¿Quién debería ser responsable de cada tipo de seguimiento?

---

# PANTALLA 4 — LISTA DE PACIENTES

### Objetivo

Encontrar a un paciente rápido y **evitar crear duplicados** (riesgo R-05).

### Usuarios principales

Recepcionista · Audióloga · Administrador.

### Información que aparece

- Buscador que acepta nombre, apellido, código, cédula o teléfono.
- Columnas: código, nombre, teléfono, sucursal, profesional responsable, última visita, próxima cita, estado, alertas.
- Filtros: sucursal, profesional, estado, con alertas activas.
- Contador de resultados.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← PACIENTES                                        [ + Paciente nuevo ] │
│  🔍 Buscar por nombre, código, cédula o teléfono...                      │
│  Sucursal: Todas ▾   Profesional: Todas ▾   Estado: Activos ▾            │
│  ☐ Solo con alertas                                     1.284 pacientes  │
├──────────────────────────────────────────────────────────────────────────┤
│  CÓDIGO    PACIENTE            TELÉFONO      ÚLT. VISITA  PRÓX. CITA  ⚠  │
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-00412 Cabascango, Rosa    099-XXX-XX12  28 abr 2026   1 ago 09:00 🟠│
│            Ibarra Centro · C. Villacís · Cat. A          Garantía 12 días│
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-01187 Chalá, Segundo      098-XXX-XX45  15 may 2025   —          🔴│
│            Ibarra Centro · P. Terán · Cat. B             Sin visita 14 m │
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-00976 Pozo, Marina        099-XXX-XX78  12 feb 2026   1 ago 09:00   │
│            Ibarra Centro · P. Terán · Cat. A                             │
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-01542 Almeida, Jorge      096-XXX-XX03  —             1 ago 10:30 🟢│
│            Ibarra Centro · C. Villacís · [NUEVO]         Ficha 0% digit. │
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-00238 Yépez, Blanca       097-XXX-XX61  05 ago 2025   1 ago 11:15 🟡│
│            Sucursal Norte · P. Terán · Cat. S+          Audiometría anual│
│ ─────────────────────────────────────────────────────────────────────────│
│  PAC-01903 Ipiales, Luis       098-XXX-XX29  22 jul 2026   1 ago 12:00 🔵│
│            Ibarra Centro · C. Villacís · Cat. A          Equipo listo    │
└──────────────────────────────────────────────────────────────────────────┘
```

### Aviso de posible duplicado

Al escribir un nombre parecido a uno existente en el formulario de paciente nuevo:

```
┌───────────────────────────────────────────────────┐
│  ⚠  ¿Es alguna de estas personas?                 │
│                                                   │
│  PAC-00412  Cabascango, Rosa                      │
│             099-XXX-XX12 · últ. visita 28 abr     │
│             [ Usar esta ficha ]                   │
│                                                   │
│  PAC-01055  Cabascango, Rosa Elena                │
│             099-XXX-XX87 · últ. visita 03 nov 2019│
│             [ Usar esta ficha ]                   │
│                                                   │
│           [ No, es una persona distinta ]         │
└───────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Clic en un paciente | Ficha resumida (pantalla 5) |
| "+ Paciente nuevo" | Formulario (pantalla 7) |
| Buscar y filtrar | Filtra la lista |
| Ordenar por columna | Reordena |

### Alertas importantes

Cada fila muestra su alerta más urgente con un color: 🔴 abandono · 🟠 garantía · 🟡 control o audiometría · 🔵 reparación · 🟢 paciente nuevo.

### Qué NO se construye todavía

- Búsqueda con tolerancia a errores de escritura (se muestra el aviso pero no funciona de verdad).
- Fusión real de fichas duplicadas.
- Exportación de listas.
- Selección múltiple y acciones masivas.
- Paginación real.

### Qué preguntar al validar

1. **¿Cómo buscan hoy a un paciente? ¿Por nombre, por número de ficha, por teléfono?** → alimenta D-01.
2. ¿Qué columnas necesitan ver en la lista?
3. ¿Cuántos duplicados creen que existen hoy?
4. ¿Cómo escriben los nombres compuestos y los apellidos?

---

# PANTALLA 5 — FICHA RESUMIDA DEL PACIENTE

**La pantalla más importante del sistema.** **[C]** La ficha del paciente es la fuente central de información.

### Objetivo

Que en **una sola pantalla, sin desplazarse**, la audióloga vea todo lo necesario para atender: quién es, qué usa, qué se le dijo la última vez y qué debería pasar ahora.

### Usuarios principales

Audióloga (antes y durante la atención) · Recepcionista (para responder por teléfono) · Administrador.

### Información que aparece

**Encabezado:** nombre, código, categoría, teléfono, sucursal, profesional responsable, estado.

**Franja de alertas:** todo lo urgente de este paciente.

**Cuatro bloques principales:**

1. **Contexto clínico** — última atención, última indicación **[C]**, próxima acción recomendada **[C]**.
2. **Equipos y garantías** — audífonos con marca, modelo, oído, serie **[C]**; estado de garantía **[C]**.
3. **Citas** — próxima cita e historial reciente **[C]**.
4. **Archivo** — porcentaje digitalizado **[C]**, ubicación física **[C]**, documentos recientes.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← Volver                                                                │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  ROSA CABASCANGO                            PAC-00412   [ Cat. A ] │  │
│  │  📞 099-XXX-XX12   ✉ (sin correo)   📍 Ibarra Centro               │  │
│  │  Audióloga responsable: Carmen Villacís      Estado: Activa        │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  🟠 La garantía de su audífono vence en 12 días (13 ago 2026)            │
│                                                                          │
│  ┌─── CONTEXTO CLÍNICO ───────────────────────────────────────────────┐  │
│  │  Última atención:   28 abr 2026 · Control · Aud. C. Villacís       │  │
│  │                                                                    │  │
│  │  Última indicación al paciente:                                    │  │
│  │  "Continuar con uso diario. Limpiar el molde cada semana.          │  │
│  │   Volver a control en 3 meses."                                    │  │
│  │                                                                    │  │
│  │  ▶ Próxima acción recomendada:                                     │  │
│  │    Control periódico  ·  sugerido para: agosto 2026                │  │
│  │                                          [ Ver línea de tiempo → ] │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─── EQUIPOS Y GARANTÍAS ────────┐ ┌─── CITAS ───────────────────────┐  │
│  │  Oticon Zircon 1               │ │  PRÓXIMA                        │  │
│  │  Oído: Derecho                 │ │  1 ago 2026 · 09:00             │  │
│  │  Serie: A4471-XXXX             │ │  Control · C. Villacís    ✓     │  │
│  │  Entregado: 13 ago 2024        │ │                                 │  │
│  │  Estado: En uso                │ │  ANTERIORES                     │  │
│  │  🟠 Garantía hasta 13 ago 2026 │ │  28 abr 2026  Control       ✔  │  │
│  │                                │ │  12 dic 2025  Control       ✔  │  │
│  │  Sin reparaciones registradas  │ │  05 sep 2025  Audiometría   ✔  │  │
│  │                                │ │  20 jun 2025  Control       ✕  │  │
│  │              [ Ver todos → ]   │ │              [ Ver todas → ]    │  │
│  └────────────────────────────────┘ └─────────────────────────────────┘  │
│                                                                          │
│  ┌─── ARCHIVO Y DOCUMENTOS ───────────────────────────────────────────┐  │
│  │  Ficha digitalizada:  ████████████░░░░░░░░  60%                    │  │
│  │  Archivo físico: Ibarra Centro · estante 4 · carpeta 128           │  │
│  │  Estado: En archivo                                                │  │
│  │                                                                    │  │
│  │  📄 Audiometría 05 sep 2025     📄 Cartilla p.1     📄 Garantía    │  │
│  │                                        [ + Cargar documento ]      │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  [ Registrar atención ]  [ Agendar cita ]  [ Crear recordatorio ]  [...] │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Lleva a |
|---|---|
| Registrar atención | Pantalla 9 |
| Agendar cita | Pantalla 8, con paciente precargado **[C]** |
| Crear recordatorio | Diálogo de recordatorio **[C]** |
| Cargar documento | Pantalla 10 |
| Ver línea de tiempo | Pantalla 6 **[C]** |
| Editar datos de contacto | Formulario de edición |
| Ver todos los equipos / citas / documentos | Vistas ampliadas |

### Alertas importantes

Franja superior con: garantía por vencer o vencida · control atrasado · audiometría anual pendiente · sin visita por más del plazo definido · reparación pendiente de retiro · ficha con menos del X% digitalizado.

### Qué NO se construye todavía

- Edición real de la información.
- Cálculo real del porcentaje digitalizado.
- Visor de documentos (solo se muestran los íconos).
- Gráfico de evolución de audiometrías.
- Información económica del paciente.
- Historial de comunicaciones detallado.

### Qué preguntar al validar — **la pregunta más importante del prototipo**

> **"Cuando entra un paciente, ¿qué es lo primero que necesita saber?"**

Si la respuesta no está en esta pantalla, la pantalla está mal diseñada.

Preguntas complementarias:

1. ¿Sobra algo en esta pantalla?
2. ¿Los cuatro bloques están en el orden correcto?
3. ¿"Última indicación" y "próxima acción recomendada" resuelven lo que necesitan?
4. ¿La categoría (A, S+, B) debería mostrarse tan visible?

---

# PANTALLA 6 — HISTORIAL / LÍNEA DE TIEMPO

### Objetivo

**[C, principio 13]** Mostrar todo lo que ha pasado con el paciente, en orden, **sin que nada se haya borrado nunca**.

### Usuarios principales

Audióloga (consulta clínica) · Recepcionista (contexto de contacto) · Administrador.

### Información que aparece

Lista cronológica descendente de: atenciones, citas (todas, incluidas canceladas y no atendidas), audiometrías, entregas de equipo, garantías, documentos cargados, comunicaciones, recordatorios, cambios relevantes de la ficha.

Cada elemento muestra **quién lo hizo y cuándo** **[C, principio 15]**.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← Rosa Cabascango · PAC-00412                                           │
│  LÍNEA DE TIEMPO                                                         │
│  Filtrar: [ Todo ▾ ]  Atenciones · Citas · Documentos · Contactos        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  2026                                                                    │
│   │                                                                      │
│   ●  1 ago 2026 · 09:00        CITA AGENDADA               ✓ Confirmada │
│   │  Control periódico · Aud. C. Villacís                                │
│   │  Registrado por: M. Salgado · 24 jul 2026 15:42                      │
│   │                                                                      │
│   ●  24 jul 2026               CONTACTO · Llamada                        │
│   │  Resultado: Contactada. Agendó cita para el 1 de agosto.             │
│   │  Registrado por: M. Salgado · 24 jul 2026 15:40                      │
│   │                                                                      │
│   ●  28 abr 2026               ATENCIÓN · Control periódico              │
│   │  Aud. Carmen Villacís · Ibarra Centro                                │
│   │  ┌────────────────────────────────────────────────────────────────┐  │
│   │  │ Observación:                                                   │  │
│   │  │ "Paciente refiere buena adaptación. Se revisa el equipo y se   │  │
│   │  │  realiza limpieza. Sin novedades."                             │  │
│   │  │                                                                │  │
│   │  │ Indicación al paciente:                                        │  │
│   │  │ "Continuar con uso diario. Limpiar el molde cada semana.       │  │
│   │  │  Volver a control en 3 meses."                                 │  │
│   │  └────────────────────────────────────────────────────────────────┘  │
│   │  Registrado por: C. Villacís · 28 abr 2026 10:15                     │
│   │                                                                      │
│   ●  12 dic 2025               ATENCIÓN · Control periódico              │
│   │  Aud. Carmen Villacís                                                │
│   │  "Se ajusta programación. Paciente refiere mejoría en ambientes      │
│   │   ruidosos."                                                         │
│   │  Registrado por: C. Villacís · 12 dic 2025 11:30                     │
│   │                                                                      │
│   ●  05 sep 2025               AUDIOMETRÍA                     📄        │
│   │  Aud. Paola Terán · Documento adjunto                                │
│   │  Registrado por: P. Terán · 05 sep 2025 09:50                        │
│   │                                                                      │
│   ●  20 jun 2025 · 10:00       CITA NO ATENDIDA                ✕        │
│   │  Control · No asistió. Sin aviso previo.                             │
│   │  Registrado por: M. Salgado · 20 jun 2025 12:00                      │
│   │                                                                      │
│  2024                                                                    │
│   │                                                                      │
│   ●  13 ago 2024               ENTREGA DE EQUIPO                         │
│   │  Oticon Zircon 1 · Oído derecho · Serie A4471-XXXX                   │
│   │  Garantía: 24 meses · hasta 13 ago 2026                              │
│   │  Registrado por: C. Villacís · 13 ago 2024 16:20                     │
│   │                                                                      │
│   ●  02 ago 2024               FICHA CREADA                              │
│      Registrado por: M. Salgado · 02 ago 2024 09:05                      │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Filtrar por tipo | Muestra solo cierto tipo de eventos |
| Clic en una atención | Despliega el detalle completo |
| Clic en un documento | Abre el visor (no funcional en el prototipo) |
| Volver a la ficha | Pantalla 5 |

### Alertas importantes

- Los eventos de inasistencia y cancelación se muestran en un color distinto: **son la señal temprana del abandono**.
- Si hay un registro corregido, se muestra el original **y** la corrección, nunca solo la corrección.

### Qué NO se construye todavía

- Búsqueda dentro de la línea de tiempo.
- Impresión o exportación del historial.
- Comparación de audiometrías.
- Edición desde la línea de tiempo.

### Qué preguntar al validar

1. ¿Qué eventos faltan en esta línea de tiempo?
2. ¿Cuánta historia necesitan ver habitualmente: el último año, todo?
3. ¿El formato de la observación clínica es adecuado o necesitan más estructura?

---

# PANTALLA 7 — FORMULARIO DE PACIENTE NUEVO

### Objetivo

Crear una ficha **en menos de un minuto**, con el mínimo indispensable, evitando duplicados.

### Usuarios principales

Recepcionista (principal) · Audióloga.

### Información que aparece

Formulario dividido en dos partes claramente separadas:

- **Datos obligatorios** — tres campos.
- **Datos opcionales** — plegados por defecto, con la leyenda *"se pueden completar después"*.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← PACIENTE NUEVO                                                        │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌─── DATOS NECESARIOS ───────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │  Nombres *          [ Jorge Andrés                              ]  │  │
│  │  Apellidos *        [ Almeida Ruiz                              ]  │  │
│  │  Teléfono *         [ 096-XXX-XX03                              ]  │  │
│  │  Sucursal *         [ Ibarra Centro                           ▾ ]  │  │
│  │                                                                    │  │
│  │  ⚠  No se encontraron pacientes con datos similares.               │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─── DATOS ADICIONALES (opcionales, se pueden completar después) ─ ▾ ┐  │
│  │                                                                    │  │
│  │  Cédula             [                                           ]  │  │
│  │  Teléfono 2         [                                           ]  │  │
│  │  ☐ El teléfono principal tiene WhatsApp                            │  │
│  │  Correo             [                                           ]  │  │
│  │  Ciudad             [ Ibarra                                  ▾ ]  │  │
│  │                                                                    │  │
│  │  ¿Cómo conoció Proaudio?  [ Referido por un paciente          ▾ ]  │  │
│  │  ¿Quién lo refirió?       [ Rosa Cabascango (PAC-00412)       ▾ ]  │  │
│  │                                                                    │  │
│  │  Audióloga responsable    [ Carmen Villacís                   ▾ ]  │  │
│  │  Categoría                [ Sin asignar                       ▾ ]  │  │
│  │                                                                    │  │
│  │  Contacto alternativo     [                                     ]  │  │
│  │  Relación                 [                                     ]  │  │
│  │                                                                    │  │
│  │  Ubicación de ficha física[                                     ]  │  │
│  │  Notas                    [                                     ]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ☑  Agendar primera cita después de guardar                              │
│  ☑  Crear recordatorio de bienvenida                                     │
│                                                                          │
│                                   [ Cancelar ]   [ Guardar paciente ]    │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Guardar | Va a la ficha del nuevo paciente (pantalla 5) |
| Guardar con "agendar cita" marcado | Va al formulario de cita (pantalla 8) con el paciente precargado |
| Desplegar datos adicionales | Muestra los campos opcionales |
| Cancelar | Vuelve sin guardar |

### Alertas importantes

- **Aviso de posible duplicado** mientras se escribe el nombre (ver pantalla 4).
- Aviso si el teléfono ya existe en otra ficha.
- El campo "quién lo refirió" ofrece buscar entre pacientes existentes.

### Qué NO se construye todavía

- Validación real de cédula.
- Guardado real.
- Búsqueda real de duplicados.
- Carga de foto del paciente.
- Consentimiento o autorización de datos. **[V]** Puede ser legalmente necesario. → D-11.

### Qué preguntar al validar

1. **¿Estos tres campos obligatorios son suficientes?** ¿Falta alguno imprescindible?
2. ¿Cuándo se registra hoy al paciente: al llamar, al llegar o después de atenderlo?
3. ¿Qué opciones debe tener "¿cómo conoció Proaudio?"
4. ¿Se le pide firmar algo al paciente hoy?

---

# PANTALLA 8 — FORMULARIO DE CITA

### Objetivo

Agendar, reagendar o cancelar una cita, **siempre vinculada a una ficha de paciente** **[C, principio 11]**.

### Usuarios principales

Recepcionista (principal) · Audióloga.

### Boceto — crear cita

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← NUEVA CITA                                                            │
├──────────────────────────────────────────────────────────────────────────┤
│  Paciente *      🔍 [ Rosa Cabascango · PAC-00412              ] [ ✕ ]  │
│                  📞 099-XXX-XX12 · Cat. A · Últ. visita: 28 abr 2026     │
│                  🟠 Garantía vence en 12 días                            │
│                                                                          │
│  Fecha *         [ 01/08/2026 ]        Hora *   [ 09:00 ]                │
│  Duración *      [ 30 minutos     ▾ ]                                    │
│  Sucursal *      [ Ibarra Centro  ▾ ]                                    │
│  Profesional *   [ Carmen Villacís ▾ ]                                   │
│                                                                          │
│  Motivo *        [ Control periódico                              ▾ ]    │
│                  ┌──────────────────────────────────────────────────┐    │
│                  │ Primera consulta                                 │    │
│                  │ Control periódico                                │    │
│                  │ Audiometría                                      │    │
│                  │ Adaptación de audífono                           │    │
│                  │ Entrega de equipo                                │    │
│                  │ Mantenimiento                                    │    │
│                  │ Recepción de reparación                          │    │
│                  │ Otro                                             │    │
│                  └──────────────────────────────────────────────────┘    │
│                  ⚠ Lista provisional — debe validarse con Proaudio (D-02)│
│                                                                          │
│  Notas           [                                                    ]  │
│                                                                          │
│  ┌─── RECORDATORIOS ──────────────────────────────────────────────────┐  │
│  │  ☑  Recordar al paciente     [ 1 día antes  ▾ ]  Canal: [Llamada▾] │  │
│  │  ☑  Confirmar con el paciente[ 2 días antes ▾ ]  Resp: [M. Salgado]│  │
│  │  ☐  Recordatorio interno adicional                                 │  │
│  │                                                                    │  │
│  │  Estos recordatorios se pueden editar, posponer o cancelar         │  │
│  │  en cualquier momento.                                             │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                                     [ Cancelar ]   [ Guardar cita ]      │
└──────────────────────────────────────────────────────────────────────────┘
```

### Boceto — reagendar

```
┌──────────────────────────────────────────────────────┐
│  REAGENDAR CITA                                      │
│  Rosa Cabascango · 1 ago 2026 09:00                  │
│                                                      │
│  Nueva fecha  [ 08/08/2026 ]   Nueva hora [ 09:00 ]  │
│  Profesional  [ Carmen Villacís                  ▾ ] │
│                                                      │
│  Motivo del reagendamiento *                         │
│    ( ) Solicitado por el paciente                    │
│    ( ) Solicitado por Proaudio                       │
│    ( ) El paciente no pudo asistir                   │
│    ( ) Otro: ______________________                  │
│                                                      │
│  ℹ La cita original queda registrada en el historial.│
│    Nada se elimina.                                  │
│                                                      │
│               [ Cancelar ]   [ Confirmar ]           │
└──────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Buscar y seleccionar paciente | Carga sus datos y sus alertas |
| Crear paciente desde aquí | Pantalla 7 |
| Guardar | Vuelve a la agenda con la cita creada |
| Reagendar | Diálogo anterior; conserva la cita original |
| Cancelar cita | Diálogo que **exige motivo** |
| Marcar inasistencia | Cambia estado y ofrece crear seguimiento |

### Alertas importantes

- Se muestran las alertas del paciente **al seleccionarlo**, para aprovechar la llamada (ejemplo: "ya que llama, avísele que la garantía vence").
- Aviso de horario ocupado.
- Aviso si el paciente ya tiene otra cita próxima.

### Qué NO se construye todavía

- Verificación real de disponibilidad.
- Sincronización con Google Calendar.
- Envío del recordatorio.
- Citas recurrentes.
- Lista de espera.

### Qué preguntar al validar

1. **¿Cuáles son los motivos de cita reales?** La lista mostrada es provisional. → D-02.
2. ¿Cuánto dura cada tipo de cita?
3. ¿Con cuánta anticipación se confirma con el paciente?
4. ¿Qué motivos de cancelación se repiten más?

---

# PANTALLA 9 — REGISTRO DE ATENCIÓN

### Objetivo

Que la audióloga registre lo que hizo **en menos de dos minutos**, sin perder nada de lo anterior **[C, principio 13]**.

### Usuarios principales

Audióloga (usuaria exclusiva).

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← REGISTRAR ATENCIÓN                                                    │
│  Rosa Cabascango · PAC-00412 · 1 ago 2026 09:00 · Control periódico      │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌─── CONTEXTO (solo lectura) ────────────────────────────────────── ▾ ┐  │
│  │  Última atención: 28 abr 2026                                      │  │
│  │  Última indicación: "Continuar con uso diario. Limpiar el molde    │  │
│  │  cada semana. Volver a control en 3 meses."                        │  │
│  │  Equipo: Oticon Zircon 1 · D · 🟠 garantía vence 13 ago 2026        │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Tipo de atención *   [ Control periódico                           ▾ ]  │
│                       ⚠ Lista provisional — validar con Proaudio (D-23)  │
│                                                                          │
│  Observación de esta atención *                                          │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │                                                                    │  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│  ℹ Esta observación se agrega al historial. No reemplaza ninguna anterior│
│                                                                          │
│  Indicación al paciente                                                  │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  ┌─── OPCIONAL ─────────────────────────────────────────────────── ▾ ┐   │
│  │  ☐ Se realizó audiometría            [ + Adjuntar resultado ]     │   │
│  │  ☐ Se entregó o cambió equipo        [ Registrar equipo ]         │   │
│  │  ☐ Se recibió equipo para reparación                              │   │
│  │  ☐ Adjuntar documento                [ + Cargar ]                 │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─── ¿QUÉ SIGUE? ────────────────────────────────────────────────────┐  │
│  │  ( ) Agendar próxima cita ahora     →  [ 01/11/2026 ]              │  │
│  │  (•) Programar seguimiento           →  [ 3 meses ▾ ]              │  │
│  │      Tipo: [ Control periódico ▾ ]   Responsable: [ M. Salgado ▾ ] │  │
│  │  ( ) No requiere seguimiento                                       │  │
│  │                                                                    │  │
│  │  Próxima acción recomendada:                                       │  │
│  │  [ Control periódico en noviembre 2026                          ]  │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│                    [ Cancelar ]   [ Guardar y marcar como atendida ]     │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Guardar | Cita pasa a "Completada"; la atención entra en la línea de tiempo |
| Adjuntar documento | Pantalla 10 |
| Registrar equipo | Diálogo de audífono (marca, modelo, oído, serie) |
| Programar seguimiento | Crea un recordatorio automáticamente |
| Ver contexto | Despliega el resumen de la última atención |

### Alertas importantes

- Aviso al guardar si no se definió próxima acción: *"¿Seguro que este paciente no requiere seguimiento?"* — **es el punto donde se previene el abandono**.
- Recordatorio visible de la garantía por vencer, para que la audióloga lo mencione.
- Aviso si la última audiometría tiene más de 12 meses. **[V]** El plazo lo define Proaudio.

### Qué NO se construye todavía

- Guardado real.
- Registro estructurado de valores de audiometría (solo adjunto). → D-25.
- Plantillas de observación.
- Dictado por voz.
- Firma del paciente.

### Qué preguntar al validar — **crítico para la adopción**

1. **¿Cuánto tiempo tienen realmente para registrar entre paciente y paciente?** Si son 30 segundos, el formulario debe ser aún más corto.
2. ¿Qué campos deberían ser obligatorios? La propuesta es solo la observación.
3. ¿La distinción entre "observación" e "indicación al paciente" tiene sentido en la práctica?
4. ¿Cuáles son los tipos de atención reales? → D-23.
5. ¿Registran durante la atención o después?

---

# PANTALLA 10 — CARGA DE DOCUMENTO

### Objetivo

Incorporar a la ficha digital un documento de la cartilla física o un resultado de examen **[C]**, en el momento en que el paciente está presente.

### Usuarios principales

Recepcionista · Audióloga · (futuro) personal de digitalización.

### Boceto

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ← CARGAR DOCUMENTO                                                      │
│  Rosa Cabascango · PAC-00412                                             │
├──────────────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │                                                                    │  │
│  │            📄  Arrastre el archivo aquí                            │  │
│  │                        o                                           │  │
│  │            [ Seleccionar archivo ]   [ 📷 Tomar foto ]             │  │
│  │                                                                    │  │
│  │            Imágenes o PDF · hasta 10 MB                            │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Tipo de documento *  [ Cartilla física                             ▾ ]  │
│                       ┌─────────────────────────────────────────────┐    │
│                       │ Cartilla física                             │    │
│                       │ Resultado de audiometría                    │    │
│                       │ Certificado de garantía                     │    │
│                       │ Factura o comprobante                       │    │
│                       │ Examen externo                              │    │
│                       │ Orden médica                                │    │
│                       │ Otro                                        │    │
│                       └─────────────────────────────────────────────┘    │
│                       ⚠ Lista provisional — validar con Proaudio         │
│                                                                          │
│  Título *             [ Cartilla física — página 2                    ]  │
│  Fecha del documento  [ 13/08/2024 ]  (fecha del contenido, no de hoy)  │
│  Observaciones        [                                               ]  │
│                                                                          │
│  ┌─── ESTADO DE DIGITALIZACIÓN DE ESTA FICHA ─────────────────────────┐  │
│  │  Antes:    ████████████░░░░░░░░  60%                               │  │
│  │  Después:  ███████████████░░░░░  75%                               │  │
│  │                                                                    │  │
│  │  Documentos ya cargados:                                           │  │
│  │  ☑ Cartilla p.1    ☑ Audiometría 2025    ☑ Garantía                │  │
│  │  ☐ Cartilla p.2    ☐ Audiometría 2023    ☐ Factura                 │  │
│  └────────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│  Ubicación del archivo físico  [ Ibarra Centro · est. 4 · carpeta 128 ]  │
│  Estado del archivo físico     [ En archivo                         ▾ ]  │
│                                                                          │
│                                   [ Cancelar ]   [ Guardar documento ]   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Acciones disponibles

| Acción | Resultado |
|---|---|
| Seleccionar o fotografiar | Muestra vista previa |
| Guardar | Vuelve a la ficha con el documento agregado |
| Actualizar ubicación física | Modifica el dato en la ficha |
| Cargar otro | Repite el formulario |

### Alertas importantes

- Aviso si ya existe un documento del mismo tipo y fecha (**posible duplicado**).
- Muestra qué documentos faltan para completar la ficha.
- **[V]** La lista de documentos esperados **no existe todavía**; sin ella el porcentaje no puede calcularse. → D-22.

### Qué NO se construye todavía

- Carga real de archivos.
- Reconocimiento automático de texto en las imágenes.
- Visor de documentos.
- Cálculo real del porcentaje.
- Compresión o procesamiento de imágenes.
- Firma o validación digital.

### Qué preguntar al validar

1. **¿Qué documentos tiene una ficha física típica?** Sin esta lista no hay porcentaje posible.
2. ¿Escanearían o fotografiarían con el teléfono?
3. ¿Quién haría esta carga: recepción, la audióloga, o personal dedicado?
4. ¿Cuánto tiempo pueden dedicarle por paciente?

---

# GUÍA PARA LA SESIÓN DE VALIDACIÓN DEL PROTOTIPO

### Formato sugerido

| Aspecto | Recomendación |
|---|---|
| Duración | 60 a 90 minutos |
| Participantes | 1–2 audiólogas y 1–2 recepcionistas, **por separado** |
| Método | Que **ellas** manejen el prototipo, no quien lo presenta |
| Registro | Anotar dónde dudan, dónde se detienen, qué buscan y no encuentran |

### Tres tareas para pedirles (sin explicar cómo hacerlas)

1. *"Llegó una señora nueva que quiere una cita para la próxima semana. Regístrela y agéndela."*
2. *"Va a atender a Rosa Cabascango. ¿Qué necesita saber antes de que entre?"*
3. *"Tiene que llamar a los pacientes que no han venido en mucho tiempo. ¿Por dónde empieza?"*

### Qué observar

- **Dónde dudan.** Una duda es un error de diseño, no del usuario.
- **Qué buscan y no encuentran.** Eso falta.
- **Qué ignoran por completo.** Eso probablemente sobra.
- **Qué dicen que "no es así".** Ahí hay una inferencia equivocada de los documentos 2 y 4.

### Qué NO hacer en la sesión

- No defender el diseño.
- No explicar por qué algo está donde está.
- No prometer funcionalidades.
- No mostrar las fases futuras (genera expectativas).

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Las 10 pantallas requeridas | **Confirmado** (lista dada por Proaudio) |
| Que desde la cita se abre la ficha | **Confirmado** |
| Que nada se borra y hay línea de tiempo | **Confirmado** |
| Que los recordatorios se editan, posponen y cancelan | **Confirmado** |
| Campos mostrados (marca, modelo, oído, serie, ciudad, % digitalizado, ubicación física) | **Confirmado como necesidad** |
| **Diseño, disposición y orden de los elementos** | **Propuesta del analista** |
| **Todos los datos, nombres, códigos y fechas** | **Ficticios** |
| Listas de motivos, tipos de atención y tipos de documento | **Provisionales — deben validarse** |
| Sucursales, profesionales y su cantidad | **Ficticios — pendiente de confirmar** |
| Umbrales de alerta (12 meses, 30 días, 3 veces) | **Provisionales — pendientes de definición** |
