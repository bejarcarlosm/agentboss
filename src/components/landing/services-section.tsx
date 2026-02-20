'use client';

import { useDiagnosticModal } from './diagnostic-modal-provider';

const SERVICES_ES = [
  { icon: '🌐', title: 'Desarrollo Web & Apps', description: 'Aplicaciones web modernas con Next.js, React y TypeScript. Dashboards, plataformas SaaS, portales de clientes.' },
  { icon: '🤖', title: 'Agentes IA y Automatizaciones', description: 'Construimos agentes IA para tus procesos: Lia califica leads, Alex hace llamadas en frío, Julia es recepcionista y Dapti se adapta a lo que necesites. Chatbots, extracción de documentos y flujos automatizados donde más impacto genera.' },
  { icon: '🔧', title: 'Consultoría Tech (SaaS llave en mano)', description: 'Te entregamos la fábrica de software completa: auditoría, arquitectura, desarrollo y traspaso a tu equipo de IT. Tu CTO o Director de IA bajo demanda.', link: 'https://carlosbejar.cl', linkLabel: 'Carlos Bejar — Director de Implementación de IA' },
];

const SERVICES_EN = [
  { icon: '🌐', title: 'Web & App Development', description: 'Modern web applications with Next.js, React, and TypeScript. Dashboards, SaaS platforms, client portals.' },
  { icon: '🤖', title: 'AI Agents & Automations', description: 'We build AI agents for your processes: Lia qualifies leads, Alex makes outbound cold calls, Julia is a receptionist, and Dapti adapts to whatever you need. Chatbots, document extraction, and automated workflows where they generate the most impact.' },
  { icon: '🔧', title: 'Tech Consulting (Turnkey SaaS)', description: 'We deliver the complete software factory: audit, architecture, development, and full handoff to your IT team. Your CTO or AI Director on demand.', link: 'https://carlosbejar.cl', linkLabel: 'Carlos Bejar — AI Implementation Director' },
];

export function ServicesSection({ locale }: { locale: string }) {
  const { openModal } = useDiagnosticModal();
  const SERVICES = locale === 'es' ? SERVICES_ES : SERVICES_EN;
  const t = locale === 'es'
    ? { heading: 'Soluciones para tu negocio', subheading: 'Todo lo que necesitas para digitalizar y escalar, con la velocidad de una fábrica potenciada por IA.', cta: 'Solicita un diagnóstico' }
    : { heading: 'Solutions for your business', subheading: 'Everything you need to digitize and scale, with the speed of an AI-powered factory.', cta: 'Request a diagnostic' };

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
              {'link' in service && service.link && (
                <a
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] hover:border-[#2dd4bf]/50 transition-all text-sm"
                >
                  <span className="text-[#2dd4bf]">{service.linkLabel}</span>
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={openModal}
            className="px-6 py-2.5 rounded-full bg-[#2dd4bf] text-black font-semibold text-sm hover:bg-[#2dd4bf]/90 transition-all hover:scale-105"
          >
            {t.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
