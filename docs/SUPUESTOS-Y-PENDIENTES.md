# Supuestos y pendientes del prototipo

**Versión:** v0.2 · **Fecha:** 2 de agosto de 2026
**Alcance:** este documento cubre únicamente el prototipo visual navegable.

Su propósito es que nadie confunda **lo que se decidió** con **lo que se supuso para poder
avanzar**. Todo lo listado aquí como supuesto es material de conversación, no una decisión tomada.

---

## 1. Supuestos usados para poder construir

Ninguno de estos supuestos ha sido confirmado por Proaudio. Se adoptaron para que las pantallas
existieran y pudieran discutirse.

| # | Supuesto adoptado | Por qué se adoptó | Decisión que lo cierra |
|---|---|---|---|
| S-01 | El paciente se identifica con un **código interno del sistema** (`PAC-00412`); cédula y número de ficha física son datos aparte y opcionales | Sin un identificador propio no se puede construir ninguna pantalla de paciente. Es además la opción menos destructiva si luego se decide otra cosa | D-01 |
| ~~S-02~~ | ~~Existen dos sucursales~~ | ✅ **Ya no es un supuesto.** Proaudio confirmó que hay **una sola sucursal, en Ibarra** | D-10 **resuelta** |
| ~~S-03~~ | ~~El equipo lo forman 2 audiólogas, 1 recepcionista y 1 administrador~~ | ✅ **Ya no es un supuesto.** Los nombres del personal son **reales**: María Fernanda Torres, Karla Chamba y Gonzalo Realpe (audiología) y Amanda (recepción). Ver S-17 | — |
| S-17 | **Diego Peñafiel** se mantiene como administrador ficticio | Hace falta un cuarto rol para poder demostrar la reasignación de tareas. Está marcado como ficticio en los datos | P-ROL-01 |
| S-18 | La **procedencia** de un audífono es *Adquirido en Proaudio* o *Traído de otra empresa* | Puede llegar un paciente que ya usa un equipo comprado en otro sitio, y eso cambia quién responde por la garantía | Nueva pregunta asociada a D-05 |
| S-19 | El **Nº de factura** se registra en el audífono | Es el caso más frecuente de compra. Queda abierto si debe registrarse también en reparaciones y otros servicios | D-24 |
| S-20 | Una garantía se considera **«por vencer» a 60 días** de su vencimiento | Hacía falta un umbral para calcular el estado. Es un valor provisional | D-05 |
| S-21 | Las **duraciones de cita** son 15, 20, 30, 40, 45, 60, 75, 90 y 120 minutos, con 30 por defecto | Se necesitaba un abanico razonable. La duración real por tipo de cita sigue sin confirmarse | D-02 |
| S-22 | El día de la demostración se calcula en **hora de Ecuador (UTC−5)** y, si cae en domingo, se corre al lunes | Así el servidor y el navegador coinciden siempre, y la agenda de ejemplo nunca sale vacía en una reunión | — |
| S-04 | Los **motivos de cita** son los 8 de la lista provisional | La agenda y el formulario de cita no funcionan sin una lista | D-02 |
| S-05 | Los **tipos de atención** son los 8 de la lista provisional | El registro de atención no funciona sin una lista | D-23 |
| S-06 | Los **tipos de documento** son los 7 de la lista provisional | La carga de documentos necesita clasificar | D-22 |
| S-07 | El mínimo para crear un paciente son **3 campos** + sucursal preseleccionada | Propuesta de diseño para que crear una ficha tome menos de un minuto | Validar en reunión |
| S-08 | La atención exige **solo la observación** como campo obligatorio, más definir la próxima acción o marcar explícitamente que no hace falta | El punto donde se previene el abandono es "¿qué sigue?"; obligar más campos haría que no se use | P-ATE-03, P-ATE-14 |
| S-09 | Las citas duran 30, 45 o 60 minutos | Se desconoce la duración real por tipo de cita | P-AGE-04 |
| S-10 | La agenda va de 08:00 a 17:00 en franjas de 30 minutos | Se desconocen los horarios reales de atención | P-AGE-06 |
| S-11 | Los **estados de cita** son los 6 confirmados en el encargo | Confirmado, no supuesto | — |
| S-12 | Cancelar, reagendar o marcar inasistencia **exige un motivo escrito** | Es el dato que permite entender por qué se pierden citas | D-07 |
| S-13 | La categoría del paciente **no afecta nada**: es solo un campo visible | Su significado se desconoce; implementarla con efectos sería inventar un criterio | D-04 |
| ~~S-14~~ | ~~La fecha de la demostración es sábado 1 de agosto de 2026~~ | ✅ **Ya no aplica.** La demostración usa la **fecha real** del día en que se abre; los datos de ejemplo se recalculan en relación a ella. Ver S-22 | — |
| S-15 | La usuaria de la sesión es **Amanda** (recepción) | No hay autenticación; hacía falta un autor para la trazabilidad de los registros | — |
| S-16 | Se usan **entre 8 y 9 pacientes ficticios** | Suficientes para probar búsqueda y filtros sin ruido | — |

---

## 2. Elementos etiquetados "Por validar" dentro del prototipo

Estos aparecen marcados **en la propia pantalla**, para que nadie los tome como definitivos durante
la reunión.

| Elemento | Cómo aparece en pantalla | Decisión |
|---|---|---|
| Paciente inactivo | "Sin visita desde may 2025 (14 meses) — **Regla temporal por validar con Proaudio**" | D-08 |
| Categoría S+, A, B | "Categoría A · **criterio por definir**" | D-04 |
| Garantías | "**Fechas y reglas ficticias para validación visual** (D-05 por definir)" | D-05 |
| Motivos de cita | "⚠ Lista provisional — debe validarse con Proaudio (D-02)" | D-02 |
| Tipos de atención | "⚠ Catálogo por validar con Proaudio (D-23)" | D-23 |
| Tipos de documento | "⚠ Lista provisional — validar con Proaudio" | D-22 |
| Cómo conoció Proaudio | "⚠ Lista provisional — por validar" | — |
| Carga de tareas | "La cantidad y priorización de tareas se configurará según la capacidad real del equipo" | D-03 + P-SEG-06 |
| Audiometría anual | "(plazo de ejemplo, por validar)" | D-03 |
| Conservación histórica | "Los eventos históricos no desaparecen silenciosamente…" | D-11, D-28 |
| Duraciones de cita | "⚠ Duraciones provisionales — deben validarse con Proaudio (D-02)" | D-02 |
| Marcas de audífono | "⚠ Marcas de ejemplo — por validar" | — |
| Equipo de otra procedencia | "El alcance de la garantía para equipos de otra procedencia está por definir (D-05)" | **D-05** |
| Teléfono de familiar | "A quién debe dirigirse cada mensaje está por definir con Proaudio" | P-MSG-04 |

---

## 3. Funcionalidades simuladas

Funcionan visualmente, pero **no hacen lo que aparentan**. Es importante decirlo en la reunión.

| Funcionalidad | Qué hace en realidad |
|---|---|
| Guardar cualquier cosa | Se guarda **solo en la memoria del navegador**. Se pierde al recargar la página |
| Adjuntar documento | Registra un nombre de archivo inventado. **Ningún archivo se sube ni se almacena** |
| Ver un documento | No hay visor. Se muestra "Visor no disponible en el prototipo" |
| Registrar contacto | Deja constancia escrita. **No realiza ninguna llamada** |
| Recordatorios "automáticos" | Están puestos a mano en los datos ficticios. **No hay ninguna regla ejecutándose** |
| Alertas de garantía | El estado (vigente / por vencer / vencida) **sí se calcula** a partir de la fecha de vencimiento, pero **las fechas son ficticias y las reglas reales no están definidas** (D-05) |
| Estado de digitalización | Etiqueta visual fija. **No se calcula nada** |
| Detección de duplicados | Compara texto de forma simple sobre 8 pacientes ficticios. No es una búsqueda tolerante real |
| Profesional que atiende | Fijo en "Aud. Carmen Villacís (simulado)". No hay sesión ni roles reales |
| Trazabilidad ("Registrado por") | El autor es siempre la usuaria simulada. No hay auditoría real |

---

## 4. Funcionalidades excluidas deliberadamente

| Excluido | Motivo |
|---|---|
| Base de datos (Supabase o cualquier otra) | Fuera del alcance del prototipo |
| Inicio de sesión, contraseñas, permisos por rol | Fuera del alcance; además D-12 a D-17 siguen abiertas |
| Google Calendar | Fase futura. D-06 abierta |
| WhatsApp y correo electrónico | Fase 3. Aparecen como botones etiquetados "Fase futura" |
| Almacenamiento de archivos | Fuera del alcance |
| Historia clínica electrónica completa | **Decisión explícita.** El registro de atención es un resumen operativo |
| Valores numéricos de audiometría | No se define ninguna estructura clínica. Se tratan como documento adjunto. D-25 |
| Módulo de reparaciones | El proceso de taller no ha sido descrito. Fase 5 |
| Inventario, precios, facturación, rentabilidad | Fases 5 y 6. D-24 |
| Indicadores gerenciales y tableros | Fase 6. El Inicio es deliberadamente operativo, no gerencial |
| Fusión de fichas duplicadas | Solo se muestra la advertencia. **La fusión nunca es automática** |
| Porcentajes de digitalización | Sustituidos por estados simples, según el addendum |
| Arrastrar y soltar citas en la agenda | Fuera del alcance visual de esta versión |
| Migración histórica masiva | No se realizará en las fases iniciales, según el addendum |

---

## 5. Decisiones que deben cerrarse antes del MVP

Orden sugerido de cierre. Las cinco primeras condicionan al resto.

| Orden | Decisión | Qué desbloquea | Quién decide |
|---|---|---|---|
| 1 | **D-11 · Marco de protección de datos** | Permiso ético y legal para cargar el primer dato real. **Nada real debe cargarse antes** | Gerencia + asesoría legal |
| 2 | **D-01 · Identificador único del paciente** | Toda la estructura de fichas y la prevención de duplicados | Gerencia + Recepción |
| 3 | **D-08 · Definición de paciente inactivo** | El objetivo central del proyecto y el volumen de trabajo que genera | Gerencia |
| 4 | **D-02 · Catálogo de motivos de cita** | Agenda, formularios y varias automatizaciones | Recepción + Audiólogas |
| 5 | **D-23 · Catálogo de tipos de atención** | El registro de atención, la pantalla más crítica para la adopción | Audiólogas |
| 6 | **Capacidad real de seguimiento** (P-SEG-06) | Cuántas tareas diarias puede absorber el equipo. Debe decidirse **junto con** D-03 | Recepción + Gerencia |
| 7 | **D-03 · Frecuencias y plazos de recordatorios** | Todas las automatizaciones | Audiólogas + Gerencia |
| 8 | **D-05 · Reglas de garantía** | Los avisos de vencimiento y la Ola 3 de digitalización | Gerencia + Audiólogas |
| ~~9~~ | ~~D-10 · Sucursales~~ | ✅ **Resuelta el 2 ago 2026:** una sola sucursal, en Ibarra | — |
| 10 | **D-04 · Significado de S+, A y B** | La categoría, o la decisión legítima de no implementarla | Gerencia |
| 11 | **D-22 · Qué documentos componen una ficha** | Si se mantiene el estado simple o se pasa a porcentaje | Gerencia + Recepción |
| 12 | **D-27 · Marca de "no desea ser contactado"** | Requisito previo indispensable para la Fase 3. Conviene tenerlo ya en Fase 2 | Gerencia |

---

## 5 bis. Preguntas nuevas que abre la versión 0.2

Surgieron al construir esta ronda de cambios. Conviene llevarlas a la próxima reunión.

| # | Pregunta | Por qué importa | Asociada a |
|---|---|---|---|
| N-01 | **¿Cómo trata Proaudio las garantías y reparaciones de equipos comprados en otra empresa?** ¿Los cubre? ¿Los repara? ¿Con qué condiciones? | El prototipo ya distingue la procedencia del equipo, pero no puede decidir el alcance de la cobertura | **D-05** |
| N-02 | **¿El número de factura debe registrarse también en reparaciones y en otros servicios**, o basta con el equipo? | Hoy solo se registra en el audífono | **D-24** |
| N-03 | **¿Cuál es la duración real de cada tipo de cita?** La lista de nueve duraciones es provisional | Afecta la agenda y la capacidad diaria | **D-02** |
| N-04 | **Si el prototipo se publica en internet, ¿se mantienen los nombres reales del personal o se sustituyen?** | Son datos de personas reales. Los pacientes seguirán siendo ficticios en cualquier caso | **D-11** |

---

## 6. Advertencia sobre este prototipo

Las pantallas construidas **son una propuesta del analista**, no un reflejo de cómo trabaja
Proaudio. La disposición, el orden de los bloques y los nombres de los campos son inferencias.

El valor de esta versión no está en lo que muestra, sino en las correcciones que provoque. Un
"nosotras eso lo hacemos al revés" durante la reunión vale más que cualquier pantalla que quede
como está.
