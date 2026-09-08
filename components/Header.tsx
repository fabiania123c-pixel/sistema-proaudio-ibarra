"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Home, CalendarDays, BellRing, Users, LogOut } from "lucide-react";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";

const LINKS = [
  { href: "/", texto: "Inicio", icono: Home },
  { href: "/agenda", texto: "Agenda", icono: CalendarDays },
  { href: "/recordatorios", texto: "Recordatorios", icono: BellRing },
  { href: "/pacientes", texto: "Pacientes", icono: Users },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const { hoy, recordatorios } = useStore();
  const [correoUsuario, setCorreoUsuario] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!activo) return;
      if (error) console.error("[Auth] Error obteniendo sesión:", error.message);
      setCorreoUsuario(data.session?.user?.email ?? null);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_evento, session) => {
      setCorreoUsuario(session?.user?.email ?? null);
    });

    return () => {
      activo = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // La pantalla de login es independiente: no debe mostrar el menú de la app.
  if (pathname === "/login") return null;

  const pendientesHoy = recordatorios.filter(
    (r) => r.estado === "Pendiente" && r.fecha <= hoy
  ).length;

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
        <Link href="/" className="shrink-0" aria-label="Ir al inicio">
          <Image
            src="/logo-proaudio.png"
            alt="Proaudio — Instituto integral de audición y lenguaje"
            width={1182}
            height={630}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="flex flex-1 flex-wrap items-center gap-1">
          {LINKS.map(({ href, texto, icono: Icono }) => {
            const activo = href === "/" ? pathname === "/" : pathname.startsWith(href);
            const mostrarBadge = href === "/recordatorios" && pendientesHoy > 0;
            return (
              <Link
                key={href}
                href={href}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  activo
                    ? "bg-marca-50 text-marca-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                <Icono size={16} /> {texto}
                {mostrarBadge && (
                  <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold text-white">
                    {pendientesHoy}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/pacientes?q=${encodeURIComponent(q)}`);
          }}
          className="relative"
        >
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar paciente…"
            className="w-44 rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-marca-600 focus:outline-none focus:ring-1 focus:ring-marca-600 lg:w-56"
            aria-label="Buscar paciente"
          />
        </form>

        <div className="hidden items-center gap-3 text-right sm:flex">
          <div>
            <div className="text-sm font-semibold text-slate-700">
              {correoUsuario ?? "Sin sesión"}
            </div>
            <div className="text-[11px] text-slate-400">Sesión iniciada</div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-marca-100 text-sm font-bold text-marca-700">
            {correoUsuario ? correoUsuario[0].toUpperCase() : "?"}
          </div>
          <button
            onClick={cerrarSesion}
            title="Cerrar sesión"
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}