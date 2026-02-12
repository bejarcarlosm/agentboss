'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

const STEPS_ES = [
  { number: '01', title: 'Diagnóstico con IA', description: 'Hablas con nuestros agentes Atlas (PO), Venus (UX) y Pluto (QA). Ellos entienden tu negocio, definen requerimientos y diseñan la solución. Sin reuniones interminables.', agents: ['Atlas', 'Venus', 'Pluto'], color: '#2dd4bf', duration: '1-2 días', badge: 'Gratis' },
  { number: '02', title: 'Diseño y Prototipo', description: 'Creamos wireframes (bocetos) y prototipos interactivos para que valides la solución antes de escribir una línea de código. Iteramos hasta que estés conforme.', agents: ['Venus'], color: '#a855f7', duration: '2-3 días', badge: null },
  { number: '03', title: 'Desarrollo Acelerado', description: 'Nuestro equipo construye tu software con la tecnología más moderna: Next.js, React, Supabase, TypeScript. Los agentes IA aceleran cada fase del desarrollo.', agents: ['Earth'], color: '#06b6d4', duration: '1-3 semanas', badge: null },
  { number: '04', title: 'QA y Pruebas', description: 'Control de calidad automatizado y manual. Pruebas completas, revisión de código y rendimiento. Nada llega a producción sin pasar por Pluto.', agents: ['Pluto'], color: '#22c55e', duration: '2-3 días', badge: null },
  { number: '05', title: 'Despliegue y Soporte', description: 'Desplegamos en producción, configuramos monitoreo y te entregamos todo documentado. Soporte post-lanzamiento incluido.', agents: ['Uranus'], color: '#f97316', duration: '1 día', badge: null },
];

const STEPS_EN = [
  { number: '01', title: 'AI Discovery', description: 'Talk to our agents Atlas (PO), Venus (UX), and Pluto (QA). They understand your business, define requirements, and design the solution. No endless meetings.', agents: ['Atlas', 'Venus', 'Pluto'], color: '#2dd4bf', duration: '1-2 days', badge: 'Free' },
  { number: '02', title: 'Design & Prototype', description: 'We create wireframes and interactive prototypes so you can validate the solution before writing a single line of code. We iterate until you are satisfied.', agents: ['Venus'], color: '#a855f7', duration: '2-3 days', badge: null },
  { number: '03', title: 'Accelerated Development', description: 'Our team builds your software with the most modern stack: Next.js, React, Supabase, TypeScript. AI agents accelerate every phase of development.', agents: ['Earth'], color: '#06b6d4', duration: '1-3 weeks', badge: null },
  { number: '04', title: 'QA & Testing', description: 'Automated and manual quality control. End-to-end tests, code review, performance. Nothing reaches production without passing through Pluto.', agents: ['Pluto'], color: '#22c55e', duration: '2-3 days', badge: null },
  { number: '05', title: 'Deploy & Support', description: 'We deploy to production, set up monitoring, and deliver everything documented. Post-launch support included.', agents: ['Uranus'], color: '#f97316', duration: '1 day', badge: null },
];

export function ProcessSection() {
  const locale = useLocale();
  const STEPS = locale === 'es' ? STEPS_ES : STEPS_EN;
  const t = locale === 'es'
    ? { heading: '¿Cómo construimos?', subheading: 'El mismo proceso profesional de una fábrica de software, pero acelerado por agentes IA en cada etapa.', ctaText: 'El paso 1 es gratis y sin compromiso. Habla con Atlas para empezar.', ctaButton: 'Empezar diagnóstico gratis' }
    : { heading: 'We build at', subheading: 'The same professional process of a software factory, but accelerated by AI agents at every stage.', ctaText: 'Step 1 is free and no commitment. Talk to Atlas to get started.', ctaButton: 'Start free discovery' };

  return (
    <section id="process" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t.heading} <span className="text-[#2dd4bf]">⚡ {locale === 'es' ? 'IA' : 'AI'}</span> {locale === 'es' ? '' : 'speed'}
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex gap-5 p-5 md:p-6 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:border-opacity-50 fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = step.color;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
              }}
            >
              {/* Number */}
              <div
                className="text-3xl md:text-4xl font-bold flex-shrink-0 w-14 text-right opacity-20"
                style={{ color: step.color }}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  {step.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[#22c55e] uppercase">
                      {step.badge}
                    </span>
                  )}
                  <span className="text-xs text-[var(--muted)]">~{step.duration}</span>
                </div>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {step.agents.map(name => (
                    <span
                      key={name}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${step.color}15`, color: step.color }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA after process */}
        <div className="text-center mt-10">
          <p className="text-sm text-[var(--muted)] mb-4">
            {t.ctaText}
          </p>
          <Link
            href={`/${locale}/chat/product-owner`}
            className="btn text-sm px-5 py-2.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all"
          >
            {t.ctaButton}
          </Link>
        </div>
      </div>
    </section>
  );
}
