import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  console.warn(
    "[Supabase] Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
  );
}

// createClient exige una URL con formato válido incluso si nunca se llega a usar
// (por ejemplo durante el build o el prerender de Next.js). Si no hay credenciales
// reales, usamos un placeholder que nunca se contacta de verdad: store.tsx ya
// evita cualquier llamada real cuando NEXT_PUBLIC_SUPABASE_URL no está configurada.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anonKey || "placeholder-anon-key",
  {
    auth: {
      // persistSession: false -> la sesión NO se guarda en el navegador.
      // Cada vez que se recarga la página, hay que volver a iniciar sesión.
      // Ojo: esto aplica para TODOS, no solo para pruebas tuyas.
      persistSession: false,
    },
  }
);