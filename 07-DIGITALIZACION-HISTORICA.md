# Documento 7 — Estrategia de digitalización histórica

**Proyecto:** SISTEMA PROAUDIO
**Versión:** 1.0 (propuesta para validación)
**Fecha:** 1 de agosto de 2026

---

## La decisión más importante de este documento

> **No se digitalizan 21 años de archivo. Nunca — o al menos, no como proyecto.**

**[C]** Proaudio ya estableció el criterio: *"La empresa no desea digitalizar inmediatamente todos los datos históricos. Inicialmente se cargarán los datos mínimos necesarios y los empleados completarán las fichas conforme los pacientes regresen o la información sea requerida."*

Este documento desarrolla ese criterio en una estrategia operativa concreta.

### El cambio de enfoque

| Enfoque tradicional (no recomendado) | Enfoque propuesto |
|---|---|
| Digitalizar todo el archivo | Digitalizar **lo que se usa** |
| Proyecto con inicio y fin | **Proceso continuo** integrado a la operación |
| Personal dedicado durante meses | El equipo digitaliza **mientras trabaja** |
| Costo grande y concentrado | Costo pequeño y distribuido |
| El valor llega al final | El valor llega **desde el primer día** |
| Riesgo alto de abandono a medias | Cada paso ya es útil por sí mismo |

**Consecuencia natural:** las fichas de pacientes que nunca vuelven **nunca se digitalizan**, y eso está bien. Digitalizar la ficha de alguien que dejó de asistir en 2009 y no volverá no genera valor.

---

## Por qué es riesgoso intentar migrar todo desde el inicio

**[C, principio del encargo]** El propio encargo pide considerar este riesgo. Se desarrolla aquí.

| # | Riesgo | Explicación | Consecuencia probable |
|---|---|---|---|
| 1 | **Costo desproporcionado** | Escanear, clasificar y verificar miles de fichas requiere meses de trabajo | Se consume el presupuesto antes de tener un sistema funcionando |
| 2 | **Valor diferido** | El beneficio solo aparece cuando termina la migración | Meses sin resultados visibles; se pierde apoyo interno |
| 3 | **Digitalizar información obsoleta** | Buena parte del archivo corresponde a pacientes que no volverán | Se paga por datos que nadie consultará |
| 4 | **Errores masivos** | Un criterio equivocado de clasificación se replica en miles de fichas | Corregir cuesta más que el trabajo original |
| 5 | **Duplicados a escala** | Sin regla de identificación única, el mismo paciente entra varias veces | Base de datos contaminada desde el nacimiento |
| 6 | **Riesgo sobre el original** | Manipular masivamente documentos de hasta 21 años los daña o los extravía | Pérdida irreversible de información |
| 7 | **Interrupción de la operación** | El personal digitaliza en lugar de atender | Se pierden pacientes mientras se digitaliza para no perderlos |
| 8 | **Exposición de datos sensibles** | Miles de documentos de salud manipulados sin política definida | Riesgo legal y de confianza |
| 9 | **Migración antes de saber qué se necesita** | Se digitaliza según una estructura que después cambia | Hay que rehacer el trabajo |
| 10 | **Desmotivación** | Trabajo repetitivo, largo y sin resultado visible | El proyecto se abandona a medio camino |

> **Riesgo 9, en particular:** hoy **no se conoce** la lista de documentos que compone una ficha típica (D-22), ni el identificador único del paciente (D-01). Digitalizar antes de resolver esas dos preguntas es garantizar retrabajo.

---

# LA ESTRATEGIA: CINCO OLAS

```
   OLA 0  ──►  OLA 1  ──►  OLA 2  ──►  OLA 3  ──►  OLA 4
  Preparar    Citas       Activos     Garantías   Archivo
              próximas    y que       vigentes    histórico
                          regresan                (bajo demanda)

   F1-F2       F2          F2-F3       F3          F4 y en adelante
```

**Cada ola es útil por sí sola.** Si el proyecto se detuviera después de la Ola 1, lo hecho seguiría sirviendo.

---

## OLA 0 — Preparación (Fases 1 y 2)

**Objetivo:** dejar listo el terreno. **No se digitaliza nada todavía.**

### Actividades

| # | Actividad | Responsable | Resultado |
|---|---|---|---|
| 0.1 | Recorrer y describir el archivo físico | Analista + Proaudio | Cuántas fichas, cómo están organizadas, en qué estado, dónde |
| 0.2 | Fotografiar (sin datos de pacientes) los formatos de ficha existentes | Analista | Lista de tipos de documento reales |
| 0.3 | Definir la **lista de documentos esperados** por ficha | Proaudio | Base para el cálculo de "porcentaje digitalizado" → **D-22** |
| 0.4 | Definir el **identificador único** del paciente | Proaudio | Regla antiduplicados → **D-01** |
| 0.5 | Definir la nomenclatura de ubicación física | Proaudio | Ej.: "Sucursal · estante · carpeta" |
| 0.6 | Definir la política de protección de datos | Gerencia | Quién digitaliza, dónde se guarda, quién accede → **D-11** |
| 0.7 | Definir qué es un "paciente activo" | Gerencia | Criterio para la Ola 2 → **D-08** |
| 0.8 | Elegir el método de captura | Proaudio | Teléfono, escáner o ambos |
| 0.9 | Prueba piloto con **10 fichas ficticias o anonimizadas** | Equipo | Medir tiempo real por ficha |

### Criterio de salida de la Ola 0

- Se sabe cuántas fichas hay y cómo están organizadas.
- Existe una lista de documentos esperados.
- Existe una regla de identificación única.
- Se midió cuánto tarda digitalizar una ficha.
- La política de datos está escrita.

> **No se avanza a la Ola 1 sin estos cinco elementos.**

---

## OLA 1 — Pacientes con cita próxima (Fase 2)

**Objetivo:** que ningún paciente llegue a una cita sin ficha digital.

### Alcance

Todos los pacientes **con cita agendada** en los próximos **[V] 15 a 30 días**.

### Volumen estimado

**[V]** Desconocido. Con 60 citas semanales serían ~120 a 240 fichas por mes. **Cifra ficticia — debe recalcularse.**

### Qué se digitaliza

**Nivel mínimo (obligatorio):**

- Datos básicos: nombres, apellidos, teléfono, sucursal.
- Ubicación de la ficha física.
- Última visita registrada.
- Equipo en uso, si lo tiene: marca, modelo, oído, serie.
- Estado de la garantía, si aplica.

**Nivel deseable (si hay tiempo):**

- Última audiometría.
- Última indicación al paciente.

**No se digitaliza en esta ola:** el historial completo, las audiometrías antiguas, las facturas.

### Cuándo se hace

**Al confirmar la cita**, 2 a 3 días antes. La recepcionista saca la ficha física, registra el mínimo y la deja preparada.

### Beneficio inmediato

**El día de la cita, la audióloga ya tiene contexto en pantalla.** El valor se percibe de inmediato, lo que sostiene la motivación del equipo.

### Responsable

Recepcionista, como parte del flujo de confirmación de citas (automatización A-02).

---

## OLA 2 — Pacientes activos y que regresan (Fases 2 y 3)

**Objetivo:** completar la ficha de quienes efectivamente usan el servicio.

### Alcance

**Dos grupos:**

**Grupo A — Al momento de la visita.** Cada paciente que entra por la puerta sale con su ficha más completa que cuando entró. Es la **digitalización oportunista**, apoyada por la automatización A-12.

**Grupo B — Pacientes activos según criterio.** **[V]** Definición pendiente (D-08). Propuesta provisional: quien ha tenido al menos una atención en los últimos 24 meses.

### Qué se digitaliza

Se avanza hacia la ficha completa, en este orden de prioridad:

| Prioridad | Documento | Motivo |
|---|---|---|
| 1 | Última audiometría | Es la referencia clínica principal |
| 2 | Certificado o respaldo de garantía | Tiene consecuencias contractuales |
| 3 | Registro del equipo actual | Necesario para reparaciones y garantías |
| 4 | Últimas 2 o 3 atenciones | Contexto suficiente para atender |
| 5 | Audiometrías anteriores | Permite ver evolución |
| 6 | Resto de la cartilla | Completitud |
| 7 | Facturas y comprobantes | **[V]** ¿Se necesitan en el sistema? → D-24 |

### Regla operativa propuesta

> **"Cinco minutos por paciente."** Mientras el paciente está en consulta, alguien digitaliza cinco minutos de su ficha. No más. Si no se termina, queda para la próxima visita.

Esto evita que la digitalización compita con la atención (riesgo 7).

### Responsable

Recepcionista principalmente · audióloga cuando adjunta documentos de la atención.

---

## OLA 3 — Garantías vigentes (Fase 3)

**Objetivo:** que ninguna garantía vigente quede fuera del sistema.

### Por qué es una ola aparte

Una garantía vigente es un **compromiso activo de la empresa**. Si no está en el sistema:

- No se puede avisar de su vencimiento (automatización A-05).
- El paciente puede reclamar y no haber respaldo accesible.
- Se pierde una oportunidad de contacto valiosa.

**A diferencia de la ficha completa, esto sí tiene fecha límite: el día en que la garantía vence.**

### Alcance

Todos los equipos entregados dentro del período de garantía más largo que maneje Proaudio.

**[V]** Sin la respuesta a **D-05** (duración de las garantías), **no se puede definir el alcance de esta ola.** Si la garantía más larga es de 3 años, hay que revisar las entregas desde 2023.

### Qué se digitaliza

- Datos del equipo: marca, modelo, oído, serie **[C]**.
- Fecha de entrega.
- Tipo y duración de la garantía.
- Fecha de vencimiento.
- Documento de respaldo.

### Cómo identificar los casos

**[V]** Depende de cómo estén organizados los registros de venta o entrega. Si existe un libro, archivo o registro de ventas, es el punto de partida más eficiente. → *Pregunta P-GAR-08.*

### Responsable

**[V]** Podría requerir tiempo dedicado, no solo trabajo oportunista. A definir según el volumen.

---

## OLA 4 — Archivo histórico (Fase 4 y en adelante)

**Objetivo:** incorporar el resto **solo cuando se necesite**.

### Principio

> **Bajo demanda.** Una ficha histórica se digitaliza cuando alguien la busca, no antes.

### Disparadores

| Disparador | Acción |
|---|---|
| Un paciente antiguo regresa | Se digitaliza su ficha al momento (pasa a Ola 2) |
| Alguien consulta el archivo físico | Se aprovecha para digitalizar |
| Un requerimiento legal o administrativo | Se digitaliza lo solicitado |
| Hay tiempo disponible (temporada baja) | Se avanza por lotes priorizados |

### Priorización si se decide avanzar por lotes

| Prioridad | Grupo | Criterio |
|---|---|---|
| 1 | Inactivos de 1 a 2 años | Alta probabilidad de que regresen |
| 2 | Inactivos de 2 a 5 años | Probabilidad media |
| 3 | Pacientes con equipo registrado | Podrían necesitar servicio |
| 4 | Inactivos de más de 5 años | Baja probabilidad |
| 5 | Fichas sin datos de contacto | Muy poco recuperables |

### Qué probablemente nunca se digitalice

- Fichas de pacientes fallecidos.
- Fichas sin datos de contacto utilizables.
- Fichas de pacientes que expresaron no querer continuar.
- Documentación administrativa sin valor clínico ni legal.

**[V]** ¿Existe alguna obligación legal de conservar o digitalizar? → **D-11**.

---

# CONTROL DE DUPLICADOS

**El riesgo más serio de toda la digitalización.** Un paciente de 21 años de historia puede aparecer en el archivo como:

- "Rosa Cabascango" (ficha de 2005)
- "Rosa E. Cabascango" (ficha de 2014)
- "Cabascango Rosa Elena" (ficha de 2022)

*(nombres ficticios)*

### Medidas propuestas

| # | Medida | Fase |
|---|---|---|
| 1 | **Definir el identificador único antes de digitalizar** → D-01 | Ola 0 |
| 2 | Buscar **siempre** antes de crear una ficha | F2 |
| 3 | Búsqueda tolerante a variaciones de escritura | F2 |
| 4 | Aviso de posible duplicado al crear (ver pantalla 4) | F2 |
| 5 | Marcar como "posible duplicado" sin fusionar automáticamente | F2 |
| 6 | **Fusión solo manual, por rol autorizado, con registro** | F2 |
| 7 | **Al fusionar, nada se pierde:** ambas historias se conservan **[C, principio 13]** | F2 |
| 8 | Revisión periódica de posibles duplicados | F3 |

### Regla de oro

> **Ante la duda, no fusionar.** Dos fichas separadas son un problema menor. Dos pacientes distintos fusionados en una sola es un problema grave, potencialmente clínico.

---

# ESTADO DE DIGITALIZACIÓN

**[C]** El sistema debe mostrar qué porcentaje de la ficha física ha sido digitalizado.

### Problema a resolver primero

**No se puede calcular un porcentaje sin saber cuál es el total.** Se requiere la lista de documentos esperados por ficha. → **D-22**

### Dos opciones

**Opción A — Porcentaje calculado** *(requiere D-22 resuelta)*

Se define una lista de documentos esperados, por ejemplo:

| Documento esperado | Peso |
|---|---|
| Datos básicos completos | 20% |
| Ficha o cartilla principal | 20% |
| Última audiometría | 20% |
| Registro de equipo | 15% |
| Garantía | 15% |
| Documentos adicionales | 10% |

*(pesos ficticios, a modo de ejemplo)*

**Opción B — Estados simples** *(no requiere D-22)*

| Estado | Significado |
|---|---|
| Sin digitalizar | Solo existe en papel |
| Datos básicos | Nombre, contacto y ubicación física |
| Parcial | Hay documentos, falta información relevante |
| Completa para operar | Todo lo necesario para atender está en el sistema |
| Completa | Toda la ficha física está digitalizada |

> **Recomendación:** **empezar con la Opción B.** Es honesta, no exige decisiones prematuras y es igual de útil en la práctica. Migrar a porcentaje después, si Proaudio lo considera necesario.

---

# CONSERVACIÓN DE LA UBICACIÓN FÍSICA

**[C]** Requerimiento explícito: registrar temporalmente dónde se encuentra el archivo físico del paciente.

### Datos a registrar

| Campo | Ejemplo ficticio |
|---|---|
| Ubicación | "Ibarra Centro · estante 4 · carpeta 128" |
| Estado | En archivo · Prestada · En digitalización · No ubicada |
| Quién la tiene | Aud. Carmen Villacís *(ficticio)* |
| Desde cuándo | 28 jul 2026 |

### Control de préstamo propuesto

- Al sacar una ficha, se marca quién la tiene.
- Alerta si una ficha lleva más de **[V] X días** fuera del archivo.
- Al devolverla, se registra el regreso.

**Mitiga el riesgo R-10** (pérdida de fichas durante la digitalización).

### ¿Hasta cuándo se conserva este dato?

**[V]** Decisión pendiente. Propuesta: mientras exista el archivo físico. La palabra "temporalmente" del encargo sugiere que Proaudio prevé eliminarlo eventualmente, pero **no se ha definido cuándo ni si el papel se destruirá**. → **D-28**

> **Advertencia:** **este documento no recomienda destruir ningún documento físico.** Esa decisión tiene implicaciones legales que exceden el alcance de este análisis.

---

# VALIDACIÓN HUMANA

**La digitalización sin verificación produce datos poco confiables.**

### Niveles propuestos

| Nivel | Qué se verifica | Quién | Cuándo |
|---|---|---|---|
| **1 — Al cargar** | El documento corresponde al paciente correcto y está legible | Quien digitaliza | Siempre |
| **2 — Al usar** | La audióloga confirma que el dato coincide con la realidad | Audióloga | En la primera atención tras digitalizar |
| **3 — Muestreo** | Revisión aleatoria de fichas digitalizadas | Administrador | **[V]** Periodicidad a definir |

### Marca de confianza propuesta

| Marca | Significado |
|---|---|
| Sin verificar | Cargado, nadie lo ha revisado |
| Verificado por quien digitalizó | Nivel 1 |
| Confirmado en atención | Nivel 2 — máxima confianza |
| Con observaciones | Hay una duda registrada |

### Qué hacer con información ilegible o dudosa

1. **No inventar.** Si no se entiende, no se transcribe. **[C, principio 6]**
2. Cargar la imagen aunque no se pueda transcribir.
3. Marcar como "requiere revisión".
4. Consultar a la audióloga que la escribió, si sigue en la empresa.
5. Si no hay forma de aclararlo, dejar constancia de que el dato es incierto.

> **Un dato incierto marcado como incierto es útil. Un dato incierto presentado como cierto es peligroso**, especialmente en información de salud.

---

# QUIÉN HACE EL TRABAJO

| Opción | Ventajas | Desventajas |
|---|---|---|
| **A. El equipo actual, oportunistamente** *(recomendada para Olas 1 y 2)* | Sin costo adicional · conocen a los pacientes · verifican mientras cargan | Compite con la atención · avance lento |
| **B. Personal dedicado** *(posible para Olas 3 y 4)* | Avance rápido · no interrumpe la atención | Costo · no conoce el contexto · **acceso de terceros a datos de salud** → D-11 |
| **C. Servicio externo de digitalización** | Rápido y profesional | **Los documentos salen de la empresa** · costo · riesgo alto de protección de datos · no hay verificación de contenido |
| **D. Mixta** *(recomendada globalmente)* | Equilibrio entre costo, velocidad y control | Requiere coordinación |

### Recomendación

- **Olas 1 y 2:** equipo actual, integrado al flujo diario.
- **Ola 3:** tiempo dedicado, posiblemente con apoyo temporal.
- **Ola 4:** bajo demanda; personal dedicado solo si Proaudio lo decide y hay presupuesto.
- **Opción C:** no recomendada mientras no exista una política de protección de datos y un acuerdo de confidencialidad formal.

---

# INDICADORES DE AVANCE

Para saber si la estrategia funciona, sin necesidad de tableros complejos:

| Indicador | Cómo se mide | Meta preliminar |
|---|---|---|
| Fichas con datos básicos | Cuántos pacientes tienen nombre, teléfono y sucursal | 100% de los que tienen cita |
| Cobertura de citas próximas | % de citas de la semana con ficha digital | **[V]** Propuesta: 100% |
| Pacientes activos digitalizados | % del grupo definido como activo | **[V]** A definir |
| Garantías vigentes registradas | % de garantías activas en el sistema | **[V]** Propuesta: 100% antes de activar A-05 |
| Tiempo medio por ficha | Minutos de digitalización | Se mide en la Ola 0 |
| Fichas con marca de duplicado | Cuántas requieren revisión | Debe tender a cero |
| Fichas físicas fuera del archivo | Cuántas están prestadas | Debe tender a cero |

**[V]** Todas las metas son provisionales. Deben fijarse con Proaudio cuando se conozca el volumen real.

---

# QUÉ PUEDE SALIR MAL Y CÓMO EVITARLO

| Situación | Señal temprana | Respuesta |
|---|---|---|
| El equipo no alcanza a digitalizar | Fichas de citas próximas sin preparar | Reducir el mínimo exigido; posponer la Ola 2 |
| Se digitaliza mal por apuro | Documentos ilegibles o mal clasificados | Volver al nivel mínimo; reforzar la verificación |
| Aparecen muchos duplicados | Búsquedas con resultados repetidos | Detener la carga masiva; resolver D-01 primero |
| Se pierden fichas físicas | Fichas prestadas por semanas | Activar el control de préstamo; auditoría del archivo |
| El equipo se desmotiva | Baja en el ritmo de carga | Mostrar el avance logrado; celebrar hitos; reducir metas |
| Se descubre que el archivo es mucho mayor de lo estimado | Recuento de la Ola 0 | Replanificar; ampliar el alcance de la Ola 4 |
| Los documentos antiguos están deteriorados | Ilegibilidad frecuente | Priorizar los más frágiles; digitalizar aunque no se transcriba |

---

# LO QUE ESTE DOCUMENTO NO PUEDE DEFINIR TODAVÍA

| Elemento | Bloqueado por |
|---|---|
| Cuántas fichas hay | Recuento de la Ola 0 |
| Cuánto tiempo tomará cada ola | Medición de tiempo por ficha |
| Cuánto costará | Volumen + decisión sobre quién digitaliza |
| Qué documentos componen una ficha | **D-22** |
| Cuál es el identificador único | **D-01** |
| Qué es un paciente activo | **D-08** |
| Alcance de la Ola 3 | **D-05** |
| Si el papel se conserva o se destruye | **D-28** |
| Si hay obligaciones legales de conservación | **D-11** |

> **Ninguna de estas preguntas puede responderla el analista.** Todas requieren información de Proaudio.

---

## Anexo — Declaración de origen de la información

| Contenido | Estado |
|---|---|
| Que no se desea digitalizar todo inmediatamente | **Confirmado** |
| Que se cargarán datos mínimos y se completará conforme regresen los pacientes | **Confirmado** |
| Que debe mostrarse el porcentaje digitalizado | **Confirmado** |
| Que debe registrarse temporalmente la ubicación física | **Confirmado** |
| Que hay más de 21 años de archivo | **Confirmado** |
| **La estructura de cinco olas** | **Propuesta del analista** |
| **Los criterios de priorización** | **Propuesta del analista** |
| **Los niveles de validación humana** | **Propuesta del analista** |
| **Todos los volúmenes, tiempos y porcentajes** | **Ficticios o pendientes** |
| Tamaño, estado y organización del archivo | **Completamente desconocido** |
| Obligaciones legales de conservación | **Completamente desconocido** |
