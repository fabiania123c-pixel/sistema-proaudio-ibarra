"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

/**
 * Bloquea toda la app hasta que haya sesión iniciada en Supabase Auth.
 * Sin sesión, redirige a /login. La página /login queda siempre visible
 * (si no, nadie podría llegar a ella para iniciar sesión).
 */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [listo, setListo] = useState(false);
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    let activo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!activo) return;
      const haySesion = !!data.session;
      setAutenticado(haySesion);
      setListo(true);
      if (!haySesion && pathname !== "/login") {
        router.replace("/login");
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evento, session) => {
      setAutenticado(!!session);
      if (!session && pathname !== "/login") router.replace("/login");
    });
    return () => {
      activo = false;
      sub.subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (pathname === "/login") return <>{children}</>;
  if (!listo) return null;
  if (!autenticado) return null;
  return <>{children}</>;
}