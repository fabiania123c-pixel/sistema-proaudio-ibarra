# ADDENDUM — Prototipo v0.2

**Proyecto:** SISTEMA PROAUDIO
**Fecha:** 2 de agosto de 2026
**Estado:** Vigente. Complementa al [addendum v0.1](ADDENDUM-PROTOTIPO-V0.1.md), que **sigue
válido en todo lo que este documento no corrige**. Cuando exista contradicción con los documentos
00 a 10, prevalecen los addendums.

---

## Propósito

Registrar los cambios acordados tras la revisión del prototipo v0.1. La valoración del cliente fue
positiva: esto es una **mejora incremental**, no un rediseño. Todas las reglas del proyecto siguen
vigentes (prototipo sin base de datos, datos de pacientes ficticios, nada se borra, trazabilidad,
decisiones abiertas etiquetadas).

---

## 1. Sucursal única — **cierra la decisión D-10**

Proaudio opera **únicamente en Ibarra, con una sola sucursal**. En consecuencia:

- Los datos contienen una sola sucursal: `Proaudio Ibarra`. Se elimina la ficticia «Sucursal Norte».
- **Desaparecen de la interfaz** todos los selectores y filtros de sucursal (agenda, lista de
  pacientes, formulario de paciente, formulario de cita).
- **Se conserva el campo `sucursalId` en el modelo de datos**, con un valor único y fijo, para no
  rehacer la estructura si en el futuro se abre otra sucursal. Simplemente no se muestra.
- La ubicación del archivo físico pierde el prefijo de sucursal: ahora es «Estante 4 · carpeta 128».

> **D-10 queda resuelta.** Ver el registro de decisiones resueltas del Documento 10.

## 2. Fechas relativas al día real

Antes, el prototipo estaba anclado al 1 de agosto de 2026. Ahora:

- El **día de la demostración es la fecha real** en que se abre el prototipo. Se calcula sobre el
  instante absoluto desplazado a UTC−5 (Ecuador no tiene horario de verano), de modo que servidor y
  navegador coinciden siempre.
- **Todas las fechas de ejemplo son relativas** a ese día, conservando exactamente la distancia que
  tenían respecto al 1 de agosto de 2026. La demostración se ve igual cualquier día que se abra.
- **Ninguna fecha queda escrita a mano dentro de un texto.** Frases como «vence el 13 ago 2026» o
  «sin visita hace 14 meses» se calculan.
- Si el día real cae en **domingo**, la demostración se muestra en el lunes siguiente para que la
  agenda no aparezca vacía, y se avisa en pantalla.

### Fechas futuras

Los campos que registran algo **ya ocurrido** no admiten fechas posteriores a hoy (atributo `max`
más validación al guardar, con el mensaje *«No se pueden registrar fechas futuras en este campo»*):
fecha de primera visita, fecha de nacimiento, fecha de entrega de equipo, fecha del documento,
fecha de la atención.

Sí admiten futuro los campos que **planifican**: fecha de la cita, fecha prevista del recordatorio
y fecha de vencimiento de garantía.

### Pacientes antiguos

Nuevo campo **«Fecha de primera visita»** (opcional, por defecto hoy, sin futuro). Cuando se
registra un paciente antiguo, el evento «Ficha creada» de la línea de tiempo se fecha con esa fecha
y deja constancia de que la ficha se incorporó al sistema más tarde.

## 3. Equipo real de Proaudio

El personal ficticio se sustituye por el equipo real:

| Antes (ficticio) | Ahora | Rol |
|---|---|---|
| Aud. Carmen Villacís | **María Fernanda Torres** | Audiología |
| Aud. Paola Terán | **Karla Chamba** | Audiología |
| — | **Gonzalo Realpe** | Audiología |
| Mónica Salgado | **Amanda** | Recepción |
| Diego Peñafiel | *(se mantiene, marcado como ficticio)* | Administración |

- Ahora son **tres profesionales que atienden**: la vista de día de la agenda pasa a tres columnas,
  cada una con su color, y las citas de ejemplo se reparten entre los tres.
- **Lenguaje neutro:** se sustituye «audióloga» por «profesional» en toda la interfaz, porque el
  equipo ya no es exclusivamente femenino.
- **Amanda** es la usuaria simulada de la sesión y figura como autora de los eventos que genera el
  prototipo.
- **Diego Peñafiel se conserva** como administrador, marcado en los datos con `ficticio: true`.
  Motivo: hace falta un cuarto rol para poder demostrar la reasignación de tareas.

> **Aviso de privacidad.** Estos son nombres de personas reales. **Los pacientes siguen siendo
> ficticios sin excepción.** Antes de publicar el prototipo en internet hay que decidir si los
> nombres del personal se mantienen o se sustituyen.

## 4. Audífonos: alta, edición y procedencia

Los audífonos ya no son solo datos de ejemplo: se pueden **registrar y editar** desde la ficha.

- Campo nuevo **«Nº de factura»** (opcional, formato ficticio `FACT-DEMO-00X`). Visible en el
  resumen de la ficha y en la pestaña *Audífonos*.
- Campo nuevo **«Procedencia»**: *Adquirido en Proaudio* / *Traído de otra empresa*. Es necesario
  porque puede llegar un paciente que ya usa un equipo comprado en otro sitio.
  Al elegir «Traído de otra empresa» se muestra el aviso:
  *«El alcance de la garantía para equipos de otra procedencia está por definir (D-05).»*
- El **estado de la garantía** (vigente / por vencer / vencida) se **calcula** a partir de la fecha
  de vencimiento y del día actual. Si no hay fecha, se muestra «Garantía sin registrar»: no se
  inventa ninguna.
- **Los equipos nunca se borran.** Para retirar uno se cambia su estado a «Dado de baja»; sigue
  visible en el historial, atenuado.
- Registrar o editar un equipo deja evento en la línea de tiempo, con autor y fecha.

El tipo de documento «Factura o comprobante» **se mantiene** en el catálogo, para poder adjuntar
facturas de cualquier otra compra o servicio.

## 5. Edición completa de la ficha del paciente

El antiguo modal «Editar datos básicos» (teléfono, ciudad y notas) se sustituye por un formulario
que permite editar **todos** los campos de la ficha, agrupados en bloques plegables para que no
intimide: identificación, contacto, origen y asignación, resumen clínico operativo, archivo físico,
fechas, estado y notas.

- El **código interno (`PAC-…`) no es editable**: lo genera el sistema (D-01 sigue abierta).
- Al guardar se añade a la línea de tiempo un evento que **detalla qué campos cambiaron**, con el
  valor anterior y el nuevo, autor y fecha. Nada se sobrescribe en silencio.

## 6. Tercer teléfono: «Teléfono de familiar»

Campo nuevo, opcional, con el texto de ayuda: *«Muchos pacientes adultos mayores se contactan a
través de un familiar. A quién debe dirigirse cada mensaje está por definir con Proaudio.»*

Aparece en el formulario de paciente nuevo, en el de edición y en la ficha. **El buscador encuentra
también por este número**, igual que por los otros dos.

## 7. Línea de tiempo consultable

Los eventos de tipo **Cita, Reagendamiento, Atención, Documento y Equipo** ahora se pueden pulsar y
abren el detalle completo del registro correspondiente. Los eventos consultables se distinguen
visualmente (cursor, realce al pasar por encima y una flecha).

> **Regla:** desde la línea de tiempo **solo se consulta, no se edita**. El histórico es de lectura.

## 8. Duraciones de cita

Las tres opciones anteriores (30, 45, 60) se sustituyen por:
**15 · 20 · 30 · 40 · 45 · 60 · 75 · 90 · 120 minutos**, con 30 como valor por defecto y el aviso
*«⚠ Duraciones provisionales — deben validarse con Proaudio (D-02)»*.

En la agenda cada cita muestra su **rango horario y su duración** (por ejemplo «14:00–14:15 · 15
min»), y la altura de la tarjeta acompaña a la duración, de modo que una cita de 15 minutos y una
de 120 se distinguen de un vistazo sin romper la rejilla de 30 minutos.

## 9. Logo

La cabecera muestra el logo real de Proaudio (`public/logo-proaudio.png`) en lugar del texto. Se
mantiene como enlace al inicio, con texto alternativo descriptivo, y no desborda en pantallas
estrechas.

**El color de marca no se ha cambiado.** El azul del logo es más oscuro y saturado que el verde
azulado actual (`marca-700: #175757`); se propone revisarlo, pero cualquier cambio se acordará
antes de aplicarlo.

---

## Lo que NO cambia

- Sigue sin haber base de datos, autenticación, Google Calendar, WhatsApp, correo ni llamadas a
  servidores. El estado vive en memoria y **se reinicia al recargar**.
- Los datos de pacientes siguen siendo **exclusivamente ficticios**.
- Nada se borra; las correcciones dejan rastro.
- Los avisos «Por validar», «Criterio por definir» y «Fase futura», y las referencias a las
  decisiones D-0X, siguen en su sitio.
- La franja permanente *PROTOTIPO DE VALIDACIÓN · DATOS FICTICIOS · NO UTILIZAR CON PACIENTES
  REALES* sigue visible en todas las pantallas.
- El registro de atención sigue siendo un **resumen operativo**, no una historia clínica.

## Preguntas nuevas que abre esta versión

1. **Garantías y reparaciones de equipos traídos de otra empresa:** ¿Proaudio los cubre? ¿Los
   repara? ¿Con qué condiciones? → asociada a **D-05**.
2. **Número de factura:** ¿debe registrarse también en reparaciones y en otros servicios, o basta
   con el equipo? → relacionada con **D-24** (información económica).
3. **Nombres del personal en un prototipo publicado:** si el prototipo se sube a internet, ¿se
   mantienen los nombres reales o se sustituyen?
4. **Duraciones reales por tipo de cita:** la lista de nueve duraciones es provisional → **D-02**.
