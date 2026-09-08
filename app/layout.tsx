import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import Header from "@/components/Header";
import AuthGate from "@/components/AuthGate";

export const metadata: Metadata = {
  title: "PROAUDIO — Gestión de pacientes",
  description: "Sistema de gestión de pacientes de Proaudio Ibarra.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthGate>
          <StoreProvider>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
          </StoreProvider>
        </AuthGate>
      </body>
    </html>
  );
}