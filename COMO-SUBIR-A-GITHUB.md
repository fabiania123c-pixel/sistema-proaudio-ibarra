# Cómo subir el proyecto a GitHub

**Para:** José González
**Tiempo estimado:** 20 minutos la primera vez · 30 segundos cada vez siguiente

---

## Por qué GitHub y no otra cosa

Drive y OneDrive guardan archivos. GitHub guarda **la historia de los archivos**: quién cambió qué, cuándo y por qué, con la posibilidad de volver atrás en cualquier momento. Para trabajar con un ingeniero, es el estándar.

Además resuelve tu preocupación original: tu primo puede editar su copia sin tocar la tuya, y cuando quiera proponerte un cambio, tú decides si lo aceptas.

---

## Antes de empezar: lo único que puede salir mal

Tu carpeta tiene **52 archivos de trabajo**… y una carpeta `node_modules` con 333 paquetes dentro, que son decenas de miles de archivos.

> **`node_modules` NUNCA se sube.** Es material que la computadora regenera sola con un comando. Subirla tarda horas y no sirve para nada.

Ya dejé preparado el archivo `.gitignore`, que es la lista de lo que debe quedarse fuera. **Si sigues los pasos de abajo, esto se resuelve solo.** Solo tienes que hacer una comprobación en el paso 5.

---

## Paso 1 · Crear una cuenta en GitHub

1. Entra en **[github.com](https://github.com)** y pulsa **Sign up**.
2. Usa tu correo, elige un nombre de usuario y una contraseña.
3. Confirma el correo que te llegará.
4. Cuando pregunte por un plan, elige el **gratuito (Free)**. Alcanza de sobra: incluye repositorios privados ilimitados.

---

## Paso 2 · Instalar GitHub Desktop

Es un programa con ventanas y botones. **No vas a escribir ni un comando.**

1. Entra en **[desktop.github.com](https://desktop.github.com)** y descarga la versión para Windows.
2. Instálalo aceptando las opciones por defecto.
3. Al abrirlo te pedirá iniciar sesión: usa la cuenta del paso 1.
4. Cuando pregunte por tu nombre y correo para firmar los cambios, acepta lo que propone.

> **¿Por qué este programa y no subir los archivos desde la web?**
> Porque respeta automáticamente la lista de exclusiones. Con la web tendrías que ir seleccionando carpeta por carpeta cada vez, y hay un límite de 100 archivos por subida. Con GitHub Desktop, cada actualización futura son dos clics.

---

## Paso 3 · Añadir tu carpeta

1. En GitHub Desktop: menú **File → Add local repository**.
2. Pulsa **Choose…** y busca:
   `C:\Users\josea\OneDrive\Documentos\Claude\Projects\SISTEMA PROAUDIO`
3. Aparecerá un aviso: *"This directory does not appear to be a Git repository"*. Es normal — todavía no lo es. Pulsa el enlace azul **create a repository**.
4. En la ventana que se abre:

   | Campo | Qué poner |
   |---|---|
   | **Name** | `sistema-proaudio` |
   | **Description** | `Prototipo y análisis funcional — Proaudio Ibarra` |
   | **Git ignore** | **None** ← importante |
   | **License** | None |

   > **Ojo con "Git ignore":** debe quedar en **None**. Ya tienes tu propio archivo de exclusiones preparado; si eliges una plantilla, la sobrescribe.

5. Pulsa **Create repository**.

---

## Paso 4 · Comprobar qué se va a subir

Esta es la comprobación importante. En la columna izquierda verás la lista de archivos.

✅ **Debe haber unos 52 archivos**, entre ellos:

- Los documentos `00-…` a `10-…`
- Las carpetas `app`, `components`, `lib`, `docs`, `public`
- `PROTOTIPO PROAUDIO.html`
- `package.json`, `tsconfig.json`

❌ **NO debe aparecer:**

- `node_modules`
- `.next`
- Ningún archivo `.zip`

> Si ves `node_modules` en la lista, **detente y avísame**. Significa que el archivo de exclusiones no se está aplicando y hay que corregirlo antes de continuar.

---

## Paso 5 · Guardar el primer punto de la historia

1. Abajo a la izquierda, en el recuadro **Summary**, escribe:

   ```
   Versión 0.2 del prototipo y documentación completa
   ```

2. Pulsa el botón azul **Commit to main**.

Acabas de guardar una fotografía del proyecto. A partir de ahora siempre podrás volver a este punto.

---

## Paso 6 · Publicarlo

1. Arriba aparecerá el botón **Publish repository**. Púlsalo.
2. En la ventana:
   - **Name:** `sistema-proaudio`
   - ☑ **Keep this code private** ← **déjalo marcado**
3. Pulsa **Publish repository**.

Espera unos segundos. Ya está en internet, en privado, visible solo para ti.

---

## Paso 7 · Invitar a tu primo

1. Entra en **github.com** y abre tu repositorio.
2. Pestaña **Settings** (arriba a la derecha).
3. En el menú lateral: **Collaborators**.
4. Pulsa **Add people** y escribe su usuario de GitHub o su correo.
5. Le llegará una invitación. Cuando la acepte, tendrá acceso completo.

---

## Y a partir de ahora: cada actualización, 30 segundos

Cada vez que Claude Code o yo cambiemos algo:

1. Abre **GitHub Desktop**.
2. Verás los archivos modificados en la izquierda.
3. Escribe en **Summary** qué cambió (ej.: `Logo y equipo real de Proaudio`).
4. **Commit to main** → **Push origin**.

Listo. Tu primo verá los cambios al instante, y tú tienes un punto de retorno por si algo sale mal.

---

## Preguntas que te van a surgir

**¿Y si me equivoco y subo algo que no debía?**
Se puede corregir. Nada es irreversible mientras el repositorio sea privado.

**¿Puedo dejar de usar las copias en ZIP?**
Sí. El historial de GitHub las reemplaza con ventaja. Guarda la que ya tienes por si acaso y no hagas más.

**¿Esto publica el prototipo en internet para que se vea funcionando?**
No. GitHub guarda el código, no lo ejecuta. Para que se vea funcionando hace falta un servicio como Vercel — es un paso posterior, y antes hay que decidir si los nombres reales del equipo pueden ser públicos (decisión **D-11**).

**Mi carpeta está dentro de OneDrive. ¿Hay problema?**
Normalmente no. Si algún día ves archivos raros con nombres tipo *"copia en conflicto"*, es OneDrive y GitHub pisándose. Si pasa, avísame y movemos el proyecto fuera de OneDrive: GitHub ya haría de respaldo.

**¿Tengo que pagar algo?**
No. La cuenta gratuita incluye repositorios privados ilimitados con colaboradores.

---

## Si prefieres no instalar nada

Se puede hacer desde la web, pero **no lo recomiendo**: tendrías que subir carpeta por carpeta con cuidado de no incluir `node_modules`, hay un límite de 100 archivos por subida, y cada actualización futura sería igual de laboriosa. Con GitHub Desktop es un botón.
