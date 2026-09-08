# ADDENDUM — Prototipo v0.1

**Proyecto:** SISTEMA PROAUDIO
**Fecha:** 1 de agosto de 2026
**Estado:** Vigente. Cuando exista contradicción entre este addendum y los documentos 00 a 10, **este addendum prevalece para el prototipo v0.1**.

---

## Propósito

Este documento registra las correcciones y decisiones acordadas antes de construir el prototipo visual navegable v0.1. No modifica los documentos originales: los complementa y, en los puntos listados abajo, los corrige.

---

## 1. Origen de la información

**Corrección.** No debe afirmarse que no existió ninguna entrevista. La descripción correcta es:

> "Los documentos se elaboraron a partir de las notas suministradas por José González sobre una reunión inicial con las audiólogas de Proaudio. Todavía no se ha realizado una observación presencial estructurada, una revisión completa de formatos, un análisis directo de Google Calendar ni entrevistas separadas por rol."

Esto reemplaza las frases de los documentos 00, 01 y 02 que indican que la información proviene únicamente de un encargo escrito sin contacto alguno con el equipo.

## 2. Archivo histórico

**Corrección.** No se utiliza como principio la frase "No se digitalizan 21 años. Nunca." La posición correcta es:

> "No se realizará una migración histórica masiva en las fases iniciales. Se priorizarán los pacientes activos, las citas próximas, las garantías vigentes y los documentos necesarios para operar. Cuando el sistema se estabilice, Proaudio decidirá si resulta útil, viable o legalmente necesario completar el archivo histórico restante."

## 3. Identificador del paciente

Para el prototipo:

- Cada paciente tiene un **código interno generado por el sistema** (ejemplo: `PAC-00412`).
- La cédula o documento es **opcional**.
- El número de ficha física es un **dato separado**, no el identificador.
- Nombre, teléfono, documento y fecha de nacimiento pueden ayudar a **detectar posibles duplicados**.
- La fusión de fichas **nunca es automática**. Ante una posible coincidencia, el sistema únicamente muestra una **advertencia**.

No se presenta la cédula, el teléfono ni el número de ficha física como identificador universal definitivo. La decisión D-01 sigue abierta.

## 4. Paciente inactivo

La definición temporal de "paciente inactivo" **sigue pendiente** (D-08). El prototipo muestra un ejemplo ficticio de paciente sin visitar Proaudio durante 14 meses, acompañado siempre de la etiqueta:

> "Regla temporal por validar con Proaudio."

No se implementa una regla real ni se afirma que 12 o 14 meses sea el criterio definitivo.

## 5. Categorías S+, A y B

Su significado **sigue pendiente** (D-04). En el prototipo:

- El campo "Categoría" se muestra visualmente en la ficha.
- Aparece etiquetado como **"Criterio por definir"**.
- No afecta prioridades, recordatorios ni permisos.
- No se calcula automáticamente.
- Se omite de los flujos principales cuando añade ruido.

## 6. Garantías

Las reglas reales de duración y cobertura **están pendientes** (D-05). El prototipo muestra: equipo, marca, modelo, número de serie, fecha ficticia de inicio, fecha ficticia de vencimiento y una alerta visual de ejemplo, siempre con la indicación:

> "Fechas y reglas ficticias para validación visual."

No se implementan cálculos comerciales o legales definitivos.

## 7. Digitalización de documentos

**Corrección.** No se utilizan porcentajes de digitalización. Se usan estados simples, meramente visuales en esta versión:

1. Sin digitalizar
2. Datos básicos
3. Parcial
4. Completa para operar
5. Completa

Esto adopta la "Opción B" recomendada en el Documento 7 y deja la decisión D-22 abierta.

## 8. Capacidad de seguimiento

**Corrección.** El escenario de 46 tareas diarias del Documento 6 **no es un dato de Proaudio** y no se muestra como cifra real. El Centro de Recordatorios del prototipo incluye la advertencia conceptual:

> "La cantidad y priorización de tareas se configurará según la capacidad real del equipo."

## 9. Conservación histórica

**Corrección.** Se evita la frase absoluta "nada se borra". El principio correcto es:

> "Los eventos históricos no desaparecen silenciosamente. Las correcciones, anulaciones o eliminaciones autorizadas deben dejar trazabilidad y sujetarse a las reglas legales y operativas que posteriormente defina Proaudio."

## 10. Decisiones abiertas

Las decisiones pendientes **no bloquean el prototipo**. Cuando un elemento depende de una decisión no resuelta:

- Se usan datos ficticios razonables.
- Se etiqueta claramente como **"Por validar"**.
- No se presenta como decisión definitiva.
- No se detiene la construcción de las demás pantallas.

---

## Naturaleza del prototipo v0.1

- Datos exclusivamente ficticios (teléfonos `099-000-000X`, documentos `DOC-FICT-00X`, series `SERIE-DEMO-00X`, correos `@prototipo.invalid`).
- Sin base de datos, sin autenticación, sin Google Calendar, sin WhatsApp, sin correo, sin almacenamiento de archivos, sin llamadas a APIs externas.
- El estado vive solo en la memoria del navegador y **se reinicia al recargar la página**.
- Muestra permanentemente la indicación: "PROTOTIPO DE VALIDACIÓN · DATOS FICTICIOS · NO UTILIZAR CON PACIENTES REALES".
- Las integraciones futuras aparecen desactivadas o etiquetadas "Fase futura"; nunca se finge que existe una integración real.
