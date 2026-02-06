import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AgentBoss | AI Software Factory",
  description: "Tu equipo de agentes IA que hace discovery, diseño y desarrollo de software. Habla con Atlas, Venus y Pluto para construir tu proyecto.",
  keywords: ["AI software factory", "agentes IA", "product owner", "UX design", "software development", "MVP"],
  authors: [{ name: "Carlos Bejar" }],
  openGraph: {
    title: "AgentBoss | AI Software Factory",
    description: "Tu equipo de agentes IA que hace discovery, diseño y desarrollo de software.",
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
