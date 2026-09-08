"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    const { error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
    setCargando(false);
    if (error) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="mx-auto mt-24 max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="mb-1 text-xl font-bold text-slate-800">Proaudio Ibarra</h1>
      <p className="mb-6 text-sm text-slate-500">Inicia sesión para continuar.</p>
      <form onSubmit={iniciarSesion} className="space-y-4">
        <div>
          <label className="etiqueta">Correo</label>
          <input
            type="email"
            required
            className="campo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div>
          <label className="etiqueta">Contraseña</label>
          <input
            type="password"
            required
            className="campo"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="btn-primario w-full justify-center" disabled={cargando}>
          {cargando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}