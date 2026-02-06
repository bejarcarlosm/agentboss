import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgentBoss | Fábrica de Agentes IA",
  description: "Crea, configura y despliega agentes de voz e inteligencia artificial para tu negocio.",
  keywords: ["agentes IA", "voice AI", "chatbot", "automatización", "inteligencia artificial"],
  authors: [{ name: "Carlos Bejar" }],
  openGraph: {
    title: "AgentBoss | Fábrica de Agentes IA",
    description: "Crea, configura y despliega agentes de voz e inteligencia artificial para tu negocio.",
    type: "website",
    locale: "es_CL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${rajdhani.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
