# Cambios solicitados — Prototipo PROAUDIO v0.2

**Para:** Claude Code
**De:** José González, tras revisar el prototipo v0.1
**Fecha:** 2 de agosto de 2026

---

## Cómo usar este documento

Es la lista de cambios a aplicar sobre el proyecto Next.js que ya existe en esta carpeta.
Está pensado para pegarse tal cual, o para referenciarlo con:

> «Lee `CAMBIOS-v0.2-PARA-CLAUDE-CODE.md` y aplica todos los cambios.»

Cada punto trae **qué hacer** y **cómo comprobar que quedó bien**. Si algo no se entiende o
entra en conflicto con otra cosa, **pregunta antes de decidir por tu cuenta**.

---

## 0. Contexto y reglas que NO deben romperse

El prototipo v0.1 funciona bien y la valoración del cliente es positiva. **Esto es una mejora
incremental, no una reescritura.** Mantén el estilo, la estructura de archivos y el tono actuales.

Siguen vigentes todas las reglas del proyecto:

1. **Sigue siendo un prototipo de validación.** Sin base de datos, sin autenticación, sin Google
   Calendar, sin WhatsApp, sin correo, sin llamadas a servidores. El estado vive en memoria y se
   reinicia al recargar.
2. **Datos de pacientes exclusivamente ficticios.** Teléfonos `099-000-000X`, documentos
   `DOC-FICT-00X`, series `SERIE-DEMO-00X`, correos `@prototipo.invalid`.
   *(Los nombres del personal sí son reales: ver puntos 11 y 12. Los pacientes NO.)*
3. **Nada se borra.** Las observaciones y los eventos se acumulan; las correcciones dejan rastro.
4. **Trazabilidad:** todo registro conserva autor y fecha.
5. **Las decisiones abiertas se etiquetan, no se inventan.** Se mantienen los avisos «Por validar»,
   «Criterio por definir», «Fase futura» y las referencias a las decisiones D-0X.
6. **Se conserva la franja permanente:** *PROTOTIPO DE VALIDACIÓN · DATOS FICTICIOS · NO UTILIZAR
   CON PACIENTES REALES.*

### Qué archivos tocar

- **Sí:** todo el proyecto Next.js (`app/`, `components/`, `lib/`, `public/`).
- **Sí:** `docs/ADDENDUM-PROTOTIPO-V0.1.md` y `docs/SUPUESTOS-Y-PENDIENTES.md` (ver punto 13).
- **No toques `PROTOTIPO PROAUDIO.html`.** Es una segunda versión del mismo prototipo, en un
  archivo único, que se regenera aparte a partir de esta. Déjala como está.
- **No toques los documentos `00-…` a `10-…`** salvo lo indicado en el punto 13.

---

## 1. Número de factura de compra

**Qué hacer.** Añadir el campo **«Nº de factura»** al registro de audífono. Es el caso más
frecuente, pero el criterio es «compra de lo que sea», así que:

- Campo `numeroFactura` (texto, **opcional**) en la entidad `Audifono`.
- Visible en la ficha del paciente, en el bloque *Equipos y garantías* y en la pestaña *Audífonos*.
- Editable desde el formulario de audífono del punto 8.
- El tipo de documento «Factura o comprobante» ya existe en el catálogo: **mantenerlo**, para poder
  adjuntar facturas de cualquier otra compra o servicio.

**Datos ficticios:** usar el formato `FACT-DEMO-00X` para que sea evidente que son inventados.

**Cómo comprobar:** en la ficha de un paciente con equipo se ve su número de factura; se puede
editar y el cambio se refleja al instante.

---

## 2. Editar TODOS los datos del paciente

**Qué hacer.** El modal actual «Editar datos básicos» solo permite teléfono, ciudad y notas.
Sustituirlo por un formulario completo que permita editar **todos** los campos de la ficha:

| Bloque | Campos editables |
|---|---|
| Identificación | Nombres, apellidos, cédula o documento, Nº de ficha física |
| Contacto | Teléfono principal, teléfono 2, **teléfono de familiar** (punto 5), correo, ciudad |
| Origen | Cómo conoció Proaudio, quién lo refirió |
| Asignación | Profesional responsable, categoría |
| Clínico operativo | Última indicación al paciente, próxima acción recomendada |
| Archivo | Estado de digitalización, ubicación de la ficha física |
| Fechas | Fecha de nacimiento, fecha de primera visita (punto 7) |
| Otros | Estado del paciente, notas administrativas |

**Reglas:**

- El **código interno (`PAC-…`) no es editable**: lo genera el sistema (decisión D-01 sigue abierta).
- Al guardar, **añadir un evento a la línea de tiempo** indicando qué campos cambiaron, con autor y
  fecha. Nada se sobrescribe en silencio.
- Usar el mismo diseño plegable del formulario de paciente nuevo: lo esencial visible, el resto
  desplegable. **El formulario no debe intimidar.**

**Cómo comprobar:** se puede cambiar cualquier dato de la ficha y el cambio queda registrado en la
línea de tiempo.

---

## 3. Una sola sucursal

**Qué hacer.** Proaudio opera **únicamente en Ibarra y tiene una sola sucursal**. Simplificar:

- Dejar **una sola sucursal** en los datos: `Proaudio Ibarra`. Eliminar «Sucursal Norte».
- **Quitar de la interfaz** todos los selectores y filtros de sucursal: agenda, lista de pacientes,
  formulario de paciente, formulario de cita.
- **Conservar el campo `sucursalId` en el modelo de datos**, con un único valor fijo. Así, si en el
  futuro se abre otra sucursal, no hay que rehacer la estructura. Simplemente no se muestra.
- Quitar también la mención a la sucursal en los textos donde estorbe (ej.: la ubicación de la
  ficha física puede quedar como «estante 4 · carpeta 128»).

**Importante:** esto **resuelve la decisión D-10** del Documento 10. Ver punto 13.

**Cómo comprobar:** no aparece ningún selector de sucursal en ninguna pantalla, y el prototipo
sigue funcionando con normalidad.

---

## 4. Abrir las citas pasadas desde la línea de tiempo

**Qué hacer.** Hoy la línea de tiempo es solo texto. Hacer que los eventos sean **consultables**:

- Los eventos de tipo **Cita** y **Reagendamiento** se pueden pulsar y abren el detalle de esa cita:
  fecha, hora, duración, profesional, motivo, estado, notas y motivo de cambio si lo hubiera.
- Los eventos de tipo **Atención** se pueden desplegar y muestran el registro completo:
  tipo de atención, observación, indicación al paciente, próxima acción y responsable.
- Los eventos de tipo **Documento** muestran el detalle del documento (sin visor: sigue siendo un
  prototipo).
- Indicar visualmente cuáles son pulsables (cursor y algún realce al pasar por encima).

**Regla:** desde la línea de tiempo **solo se consulta, no se edita**. El histórico es de lectura.

**Cómo comprobar:** en la ficha de Rosa Cabascango se puede pulsar la cita no atendida de hace un
año y ver su detalle completo, incluido el motivo registrado.

---

## 5. Tercer teléfono: «Teléfono de familiar»

**Qué hacer.** Añadir un tercer campo de teléfono al paciente:

- `telefonoFamiliar` (texto, opcional), etiquetado exactamente **«Teléfono de familiar»**.
- Aparece en: formulario de paciente nuevo (zona de datos opcionales), formulario de edición
  completa (punto 2) y ficha del paciente.
- El **buscador de pacientes debe encontrar también por este teléfono**, igual que ya hace con los
  otros dos.
- Junto al campo, un texto de ayuda pequeño: *«Muchos pacientes adultos mayores se contactan a
  través de un familiar. A quién debe dirigirse cada mensaje está por definir con Proaudio.»*

**Cómo comprobar:** se guarda un tercer teléfono y buscarlo en la lista de pacientes devuelve la
ficha correcta.

---

## 6. Más opciones de duración de cita

**Qué hacer.** Sustituir las tres opciones actuales (30, 45, 60) por:

**15 · 20 · 30 · 40 · 45 · 60 · 75 · 90 · 120 minutos**

- El valor por defecto sigue siendo **30 minutos**.
- Añadir debajo el aviso: *«⚠ Duraciones provisionales — deben validarse con Proaudio (D-02)»*,
  porque la duración real de cada tipo de cita sigue sin confirmarse.
- Comprobar que la vista de día de la agenda **sigue dibujándose bien** con citas de 15 minutos y
  de 120 minutos. Las franjas actuales son de 30 minutos: si una cita de 15 no se ve bien, ajusta
  la presentación (no hace falta cambiar la rejilla, basta con que la cita se lea con claridad).

**Cómo comprobar:** se agenda una cita de 15 minutos y otra de 120, y ambas se ven correctamente
en la agenda del día.

---

## 7. Fechas pasadas al registrar pacientes (y en todo el sistema)

Este es el cambio con más consecuencias. Léelo entero antes de tocar nada.

### 7.1 Lo que pide el cliente

- La fecha por defecto debe ser **el día real en que se está usando el prototipo**, no una fecha
  fija escrita en el código.
- Debe poder registrarse un **paciente antiguo** con su fecha real de primera visita.
- **No se permiten fechas futuras** en los campos que registran algo ya ocurrido.

### 7.2 Qué hacer

**a) La fecha del sistema pasa a ser la fecha real.**
Hoy `HOY` está fijado en `"2026-08-01"`. Sustituirlo por la fecha real del día en que se abre el
prototipo.

**b) Los datos de ejemplo pasan a ser relativos a esa fecha.**
Si solo cambias `HOY`, la demostración se rompe: las citas de ejemplo quedarían en el pasado y el
panel de inicio aparecería vacío en plena reunión.

La regla es: **cada fecha semilla se expresa como «HOY + N días», conservando exactamente la
distancia que hoy tiene respecto al 1 de agosto de 2026.**

Ejemplos:
- Las cuatro citas de hoy → `HOY + 0`
- La cita de Blanca Yépez (2026-08-02) → `HOY + 1`
- La última atención de Rosa (2026-04-28) → `HOY − 95`
- La última visita de Segundo Chalá (2025-05-15) → `HOY − 443`
- La entrega del equipo de Rosa (2024-08-13) → `HOY − 718`
- El vencimiento de su garantía (2026-08-13) → `HOY + 12`

Aplica el mismo criterio a **todas** las fechas de `lib/data.ts`: citas, atenciones, audífonos,
garantías, documentos, recordatorios, comunicaciones y eventos de la línea de tiempo.

**c) Los textos que mencionan fechas deben calcularse, no escribirse a mano.**
Hay frases con fechas incrustadas que quedarían falsas. Por ejemplo:

- `"Sin visita desde may 2025 (14 meses)"`
- `"La garantía del equipo (SERIE-DEMO-001) vence el 13 ago 2026"`
- `"Confirmar cita de mañana 2 ago 11:15"`
- `"Equipo listo desde el 30 jul"`
- `"Garantía del audífono vence el 13 ago 2026"`

Todas deben generarse a partir de la fecha calculada. **Ninguna fecha debe quedar escrita a mano en
un texto.**

**d) Límite de fechas futuras.**
Los campos que registran algo ya ocurrido **no admiten fechas posteriores a hoy**:
fecha de primera visita, fecha de nacimiento, fecha de entrega de equipo, fecha del documento,
fecha de la atención.

Los campos que **sí** admiten fechas futuras, porque planifican: fecha de la cita, fecha prevista
del recordatorio, fecha de vencimiento de garantía.

Impleméntalo con el atributo `max` del campo de fecha **y** con una validación al guardar, con un
mensaje claro: *«No se pueden registrar fechas futuras en este campo.»*

**e) Nuevo campo en el paciente.**
Añadir **«Fecha de primera visita»** (opcional, por defecto hoy, no admite futuro) al formulario de
paciente nuevo y al de edición completa. El evento «Ficha creada» de la línea de tiempo debe usar
esa fecha, no la de hoy, cuando se registre un paciente antiguo.

**f) Detalle opcional pero recomendable.**
Si la fecha real cae en domingo, la agenda de la demostración se verá vacía. Si es sencillo,
desplaza el «día de la demostración» al lunes siguiente cuando hoy sea domingo. Si complica el
código, déjalo y avísame.

**Cómo comprobar:**
1. El panel de inicio muestra 4 citas «de hoy» sea cual sea el día en que se abra.
2. Se registra un paciente con primera visita hace 3 años y la línea de tiempo lo refleja.
3. Intentar poner una fecha de primera visita del año que viene es rechazado con un mensaje claro.
4. No queda ninguna fecha escrita a mano dentro de un texto.

---

## 8. Poder registrar y editar audífonos desde la ficha

**Qué hacer.** Hoy los audífonos solo existen en los datos de ejemplo: no hay forma de añadirlos ni
editarlos. Hace falta, porque **puede llegar un paciente que ya usa un equipo comprado en otra
empresa**.

Añadir en la pestaña *Audífonos* de la ficha:

- Botón **«+ Registrar audífono»**.
- Botón **«Editar»** en cada equipo ya registrado.

Campos del formulario:

| Campo | Tipo | Obligatorio |
|---|---|---|
| Marca | Texto libre con sugerencias | Sí |
| Modelo | Texto | Sí |
| Oído | Derecho / Izquierdo / Ambos | Sí |
| Número de serie | Texto | No |
| Fecha de entrega o de inicio de uso | Fecha, sin futuro | Sí |
| Estado | En uso / En reparación / Devuelto / Dado de baja | Sí |
| **Nº de factura** | Texto | No |
| **Procedencia** | **Adquirido en Proaudio** / **Traído de otra empresa** | Sí |
| Garantía: fecha de inicio | Fecha | No |
| Garantía: fecha de vencimiento | Fecha | No |
| Observaciones | Texto | No |

**Reglas:**

- **«Procedencia» es un campo nuevo y necesario.** Si el equipo viene de otra empresa, la garantía
  probablemente no la cubre Proaudio. Cuando se elija «Traído de otra empresa», mostrar el aviso:
  *«El alcance de la garantía para equipos de otra procedencia está por definir (D-05).»*
- El estado de la garantía (Vigente / Por vencer / Vencida) se **calcula** a partir de la fecha de
  vencimiento y del día actual. Mantener el aviso de que las reglas reales siguen sin definirse.
- Si no se indica fecha de vencimiento, mostrar «Garantía sin registrar» en lugar de inventar una.
- Registrar y editar audífonos **deja evento en la línea de tiempo**, con autor y fecha.
- **Nunca borrar un audífono.** Para retirarlo, se cambia su estado a «Dado de baja». Los equipos
  dados de baja se siguen viendo en el historial, atenuados.

**Cómo comprobar:** se registra un equipo «traído de otra empresa» a un paciente nuevo, aparece en
su ficha con el aviso de garantía, y queda constancia en la línea de tiempo.

---

## 9. Sin cambios

El cliente está conforme con el funcionamiento general. **No rehagas lo que ya funciona.**

---

## 10. Logo de Proaudio

**Qué hacer.** El logo real ya está guardado en **`public/logo-proaudio.png`**
(1182 × 630 px, PNG con **fondo transparente**).

- Colocarlo en la cabecera, **sustituyendo el texto «PROAUDIO / Gestión de pacientes»**.
- Altura aproximada de 34–40 px, respetando la proporción (es apaisado, casi 2:1).
- Debe seguir funcionando como enlace al inicio.
- Añadir texto alternativo: `alt="Proaudio — Instituto integral de audición y lenguaje"`.
- En pantallas estrechas, que no desborde ni empuje el menú.
- Usar el componente de imagen de Next.js y, si es necesario, indicar ancho y alto para evitar
  saltos de maquetación.

**Sugerencia de color:** el azul del logo es más oscuro y más saturado que el verde azulado actual
(`--marca-700: #175757`). Si te parece que desentona, propón un color de marca acorde al logo,
**pero no lo cambies sin avisar**: preferimos verlo antes.

**Cómo comprobar:** el logo se ve nítido en la cabecera, sin recuadro blanco alrededor, y no
deforma el menú en una ventana estrecha.

---

## 11 y 12. Nombres reales del equipo

**Qué hacer.** Sustituir el personal ficticio por el equipo real de Proaudio:

| Antes (ficticio) | Ahora (real) | Rol |
|---|---|---|
| Aud. Carmen Villacís | **María Fernanda Torres** | Audióloga |
| Aud. Paola Terán | **Karla Chamba** | Audióloga |
| — | **Gonzalo Realpe** | Audiólogo |
| Mónica Salgado | **Amanda** | Recepcionista |
| Diego Peñafiel | *(mantener como administrador ficticio o eliminar — dime qué prefieres)* | Administrador |

**Detalles importantes:**

- **Ahora son tres profesionales que atienden, no dos.** La vista de día de la agenda pasa de dos
  columnas a tres. Comprueba que sigue leyéndose bien y que cada uno tiene su color.
- Reparte las citas de ejemplo entre los tres, para que la agenda no se vea desequilibrada.
- **Gonzalo Realpe es hombre.** Todo el prototipo dice «audióloga» en femenino. Cambiar a lenguaje
  neutro: **«profesional»**, «profesional que atiende», «profesional responsable». Donde haga falta
  el oficio, usar «audiólogo/a». Revisa también los textos de ayuda y los avisos.
- De **Amanda** no tenemos apellido: úsalo solo como nombre. Si hace falta una abreviatura para la
  agenda o el avatar, usa «Amanda» y la inicial «A».
- El saludo del panel de inicio pasa a **«Buenos días, Amanda»**.
- La usuaria simulada de la sesión pasa a ser **Amanda**, y su nombre es el que aparece como autor
  en los eventos que genere el prototipo.

**Aviso de privacidad:** estos son nombres de personas reales. **Los pacientes deben seguir siendo
ficticios sin excepción.** Si más adelante se publica el prototipo en internet, hay que decidir si
los nombres del personal se mantienen o se sustituyen.

**Cómo comprobar:** no queda ninguna mención a los nombres antiguos ni la palabra «audióloga» en
contextos que ahora incluyen a un hombre.

---

## 13. Actualizar la documentación del proyecto

Estos cambios afectan a decisiones que estaban registradas como abiertas. **Es importante dejarlo
por escrito**, o el análisis y el prototipo se van a contradecir.

**a) `docs/ADDENDUM-PROTOTIPO-V0.1.md`** → crear **`docs/ADDENDUM-PROTOTIPO-V0.2.md`** con los
cambios de esta ronda, manteniendo el mismo formato. El addendum v0.1 no se borra.

**b) `10-DECISIONES-PENDIENTES.md`** → mover a la tabla «Registro de decisiones resueltas»:

| ID | Decisión | Respuesta | Quién decidió | Fecha |
|---|---|---|---|---|
| **D-10** | Número y operación de las sucursales | **Una sola sucursal, en Ibarra.** No hay operación multisucursal | José González / Proaudio | 2 ago 2026 |

Marcar D-10 como ✅ Resuelta también en la tabla resumen del inicio del documento.

**c) `docs/SUPUESTOS-Y-PENDIENTES.md`** → actualizar con lo nuevo:

- El nombre del personal ya no es un supuesto: es real.
- Aparece un campo nuevo, **«Procedencia» del audífono**, que **abre una pregunta**: ¿cómo trata
  Proaudio las garantías y reparaciones de equipos comprados en otra empresa? Registrar como
  **pregunta pendiente asociada a D-05**.
- El «Nº de factura» se registra en el audífono, pero **queda abierto** si debe registrarse también
  en reparaciones y en otros servicios (relacionado con **D-24**, información económica).

**d) `README.md`** → actualizar la sección de recorridos si algún paso cambió de sitio.

**No hace falta que toques los documentos `00-…` a `09-…`.**

---

## 14. Antes de dar por terminado

Comprueba, en este orden:

- [ ] `npm run typecheck` sin errores.
- [ ] `npm run build` sin errores.
- [ ] Los tres recorridos del `README.md` funcionan de principio a fin.
- [ ] El panel de inicio muestra citas «de hoy» sea cual sea el día real en que se abra.
- [ ] No queda ninguna fecha escrita a mano dentro de un texto.
- [ ] No queda ningún nombre del personal antiguo ni ninguna «Sucursal Norte».
- [ ] No queda «audióloga» en femenino donde ahora hay un audiólogo.
- [ ] Ningún dato de paciente parece real.
- [ ] La franja «PROTOTIPO DE VALIDACIÓN…» sigue visible en todas las pantallas.
- [ ] Los avisos «Por validar», «Fase futura» y las referencias D-0X siguen en su sitio.
- [ ] Nada se borra: audífonos dados de baja, citas canceladas y observaciones antiguas siguen
      consultables.

**Al terminar, dime en una lista corta:**

1. Qué cambiaste.
2. Qué decidiste tú por falta de información (y por qué).
3. Qué no pudiste hacer o quedó a medias.
4. Qué preguntas nuevas surgieron para llevar a la reunión con Proaudio.

---

## Nota final

Si algún punto de esta lista choca con los principios del apartado 0 —por ejemplo, si para cumplir
un cambio hubiera que inventar un procedimiento clínico o comercial que Proaudio no ha descrito—
**detente y pregunta**. Vale más una duda que un dato inventado.
