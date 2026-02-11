'use client';

import { useLocale } from 'next-intl';

const SERVICES_ES = [
  { icon: '🌐', title: 'Desarrollo Web', description: 'Aplicaciones web modernas con Next.js, React y TypeScript. Dashboards, plataformas SaaS, portales de clientes.' },
  { icon: '🧠', title: 'Agentes IA a Medida', description: 'Construimos agentes IA para tus procesos: Lia califica leads, Alex hace llamadas en frio, Julia es recepcionista y Dapti se adapta a lo que necesites.' },
  { icon: '🤖', title: 'Automatizaciones IA', description: 'Chatbots, extraccion de documentos, flujos automatizados. Integramos IA donde mas impacto genera.' },
  { icon: '🎨', title: 'Diseño UX/UI', description: 'Interfaces intuitivas y prototipos interactivos. Validamos ideas antes de construir para no desperdiciar recursos.' },
  { icon: '⚡', title: 'MVPs Rapidos', description: 'De la idea al producto funcional en semanas. Lanza rapido, valida con usuarios reales e itera.' },
  { icon: '🔧', title: 'Consultoria Tech', description: 'Auditoria de codigo, arquitectura de sistemas y optimizacion de procesos. Tu CTO o Director de IA bajo demanda, con traspaso completo de la fabrica de software a tu equipo de IT.' },
];

const SERVICES_EN = [
  { icon: '🌐', title: 'Web Development', description: 'Modern web applications with Next.js, React, and TypeScript. Dashboards, SaaS platforms, client portals.' },
  { icon: '🧠', title: 'Custom AI Agents', description: 'We build AI agents for your processes: Lia qualifies leads, Alex makes outbound cold calls, Julia is a receptionist, and Dapti adapts to whatever you need.' },
  { icon: '🤖', title: 'AI Automations', description: 'Chatbots, document extraction, automated workflows. We integrate AI where it generates the most impact.' },
  { icon: '🎨', title: 'UX/UI Design', description: 'Intuitive interfaces and interactive prototypes. We validate ideas before building to avoid wasting resources.' },
  { icon: '⚡', title: 'Rapid MVPs', description: 'From idea to working product in weeks. Launch fast, validate with real users, and iterate.' },
  { icon: '🔧', title: 'Tech Consulting', description: 'Code audits, system architecture, and process optimization. Your CTO or AI Director on demand, with full software factory handoff to your IT team.' },
];

export function ServicesSection() {
  const locale = useLocale();
  const SERVICES = locale === 'es' ? SERVICES_ES : SERVICES_EN;
  const t = locale === 'es'
    ? { heading: 'Soluciones para tu negocio', subheading: 'Todo lo que necesitas para digitalizar y escalar, con la velocidad de una fabrica potenciada por IA.' }
    : { heading: 'Solutions for your business', subheading: 'Everything you need to digitize and scale, with the speed of an AI-powered factory.' };

  return (
    <section id="services" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t.heading}
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:border-[#2dd4bf]/30 hover:-translate-y-0.5 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl block mb-4">{service.icon}</span>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
