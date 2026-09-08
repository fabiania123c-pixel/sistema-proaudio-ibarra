# Guía de la reunión de validación del prototipo

**Duración máxima: 30 minutos.** Si sobra tiempo, se usa para preguntas abiertas, no para mostrar
más pantallas.

**Participantes sugeridos:** una audióloga y una recepcionista, **por separado** si es posible. Las
respuestas cambian cuando están juntas.

**Materiales:** el prototipo abierto en `http://localhost:3000`, esta guía impresa y algo para
escribir.

---

## Reglas para quien conduce

1. **Que manejen ellas el ratón.** Quien presenta no toca el teclado.
2. **No explicar antes de tiempo.** Se da la tarea y se calla. La duda es el dato más valioso.
3. **No defender el diseño.** Si algo no se entiende, está mal hecho, no mal mirado.
4. **No prometer funcionalidades.** Ni plazos, ni "eso lo agregamos".
5. **Anotar frases literales.** "No, nosotras eso lo hacemos al revés" vale más que un resumen.
6. **Recordar en voz alta** que los datos son ficticios y que nada de lo que hagan se guarda.

---

## Minuto 0–2 · Introducción

Leer o parafrasear:

> "Esto **no es el sistema**. Es un dibujo que se puede tocar, hecho para que ustedes nos digan si
> vamos bien o mal. Todos los pacientes que van a ver son inventados: Rosa Cabascango no existe.
> Nada de lo que hagan se guarda; si recargamos la página, todo vuelve a como estaba.
>
> No hay forma de romperlo y no hay respuestas equivocadas. Lo que necesitamos saber es qué les
> serviría, qué les estorbaría y qué entendimos mal. Si algo no se entiende, el problema es
> nuestro, no de ustedes."

Aclarar además: **muchas cosas están marcadas "Por validar"** porque todavía no sabemos la
respuesta. Esas marcas son preguntas para ellas.

---

## Minuto 2–10 · Flujo A — Buscar, crear y agendar

**Consigna (leer tal cual, sin explicar cómo):**

> *"Llega una señora nueva al mostrador y quiere una cita para la próxima semana. Regístrela y
> agéndela."*

**Qué observar sin interrumpir:**

- ¿Por dónde empiezan? ¿Buscan primero o crean directamente?
- ¿Qué dato usan para buscar: nombre, apellido, teléfono, cédula?
- ¿Qué hacen cuando aparece el aviso de posible duplicado?
- ¿Los tres campos obligatorios les parecen pocos, justos o insuficientes?
- ¿Abren los datos opcionales? ¿Cuáles llenarían de verdad?
- Al agendar: ¿reconocen los motivos de la lista? ¿Falta alguno? ¿Sobra alguno?

**Preguntas al terminar:**

1. ¿Así registran hoy a alguien nuevo, o de otra manera?
2. ¿En qué momento se crea la ficha hoy: al llamar, al llegar, o después de atender?
3. ¿Cómo saben hoy si una persona ya vino antes?
4. ¿Qué campo de este formulario **nunca** llenarían?

---

## Minuto 10–19 · Flujo B — Atender y definir qué sigue

**Consigna:**

> *"Va a atender a Rosa Cabascango, que tiene cita a las nueve. ¿Qué necesita saber antes de que
> entre? Búsquelo."*

Dejar que naveguen. Después:

> *"Ya la atendió. Registre lo que hizo."*

**Qué observar:**

- ¿Encuentran la información de contexto o la buscan en otro lado?
- ¿Miran la garantía por vencer? ¿Les parece útil que aparezca ahí?
- ¿Cuánto tardan en llenar el registro de atención?
- ¿Entienden la diferencia entre "observación" e "indicación al paciente"?
- ¿Qué hacen con el bloque "¿Qué sigue?" — lo llenan o lo saltan?

**Preguntas al terminar:**

1. **¿Cuánto tiempo tienen realmente entre un paciente y otro para escribir?**
2. ¿Registran durante la atención o después?
3. ¿Este formulario les quitaría o les daría tiempo, comparado con el papel?
4. ¿Cuáles son los tipos de atención reales? La lista que ven es provisional.
5. Si solo pudieran llenar **un** campo obligatorio, ¿cuál debería ser?

---

## Minuto 19–26 · Flujo C — Gestionar un seguimiento

**Consigna:**

> *"Tiene que llamar a los pacientes que no han venido en mucho tiempo. ¿Por dónde empieza?"*

**Qué observar:**

- ¿Van a Recordatorios o buscan en otro lado?
- ¿Entienden la diferencia entre las cuatro pestañas?
- ¿Distinguen una tarea de recepción de una alerta para audióloga?
- Al registrar el contacto, ¿encuentran el resultado que necesitan?
- ¿Usan Posponer, Reasignar o Cancelar de forma espontánea?

**Preguntas al terminar:**

1. **¿Hoy hacen este seguimiento, o sería algo nuevo?** *(La respuesta cambia el tamaño del
   proyecto.)*
2. **¿Cuántas llamadas de seguimiento puede hacer una persona en un día, además de su trabajo
   normal?**
3. ¿A partir de cuánto tiempo consideran que perdieron a un paciente? En el prototipo se muestran
   14 meses, pero es un ejemplo, no una decisión.
4. ¿Qué resultado de contacto falta en la lista?
5. ¿Hay pacientes a los que **no** convendría contactar? ¿Por qué?

---

## Minuto 26–30 · Preguntas de cierre

1. Si mañana existiera esto, **¿lo usarían?** ¿Qué se lo impediría?
2. ¿Qué es lo primero que quitarían?
3. ¿Qué falta que sea imprescindible?
4. ¿Qué parte no representa cómo trabajan ustedes?

---

# HOJA DE REGISTRO

*Llenar durante o inmediatamente después de la reunión, con frases literales cuando sea posible.*

**Fecha:** ______________  **Participantes:** ______________________  **Rol:** ______________

### Qué entendieron sin ayuda

<br><br><br>

### Qué NO entendieron (dónde dudaron, dónde se detuvieron)

<br><br><br>

### Qué faltó (qué buscaron y no encontraron)

<br><br><br>

### Qué sobró (qué ignoraron por completo)

<br><br><br>

### Qué harían de otra manera

<br><br><br>

### Qué campo NUNCA llenarían

<br><br><br>

### Qué tarea seguiría dependiendo del papel

<br><br><br>

### Qué proceso no quedó bien representado

*(Esto corrige una inferencia equivocada de los documentos 02 y 04.)*

<br><br><br>

---

### Decisiones que esta reunión ayudó a cerrar

| Decisión | Respuesta obtenida | ¿Cerrada? |
|---|---|---|
| D-01 · Identificador único del paciente | | |
| D-02 · Motivos de cita reales | | |
| D-04 · Qué significan S+, A y B | | |
| D-05 · Reglas de garantía | | |
| D-08 · Cuándo se considera perdido a un paciente | | |
| D-22 · Qué documentos tiene una ficha física | | |
| D-23 · Tipos de atención reales | | |
| Capacidad real de contactos por día | | |

### Compromisos y siguiente paso

<br><br><br>
