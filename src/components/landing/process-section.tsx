'use client';

import Link from 'next/link';

const STEPS = [
  {
    number: '01',
    title: 'Discovery con IA',
    description: 'Hablas con nuestros agentes Atlas (PO), Venus (UX) y Pluto (QA). Ellos entienden tu negocio, definen requerimientos y diseñan la solucion. Sin reuniones interminables.',
    agents: ['Atlas', 'Venus', 'Pluto'],
    color: '#2dd4bf',
    duration: '1-2 dias',
    badge: 'Gratis',
  },
  {
    number: '02',
    title: 'Diseño y Prototipo',
    description: 'Creamos wireframes y prototipos interactivos para que valides la solucion antes de escribir una linea de codigo. Iteramos hasta que estes conforme.',
    agents: ['Venus'],
    color: '#a855f7',
    duration: '2-3 dias',
    badge: null,
  },
  {
    number: '03',
    title: 'Desarrollo Acelerado',
    description: 'Nuestro equipo construye tu software con el stack mas moderno: Next.js, React, Supabase, TypeScript. Los agentes IA aceleran cada fase del desarrollo.',
    agents: ['Earth'],
    color: '#06b6d4',
    duration: '1-3 semanas',
    badge: null,
  },
  {
    number: '04',
    title: 'QA y Testing',
    description: 'Control de calidad automatizado y manual. Tests end-to-end, revision de codigo, performance. Nada llega a produccion sin pasar por Pluto.',
    agents: ['Pluto'],
    color: '#22c55e',
    duration: '2-3 dias',
    badge: null,
  },
  {
    number: '05',
    title: 'Deploy y Soporte',
    description: 'Desplegamos en produccion, configuramos monitoreo y te entregamos todo documentado. Soporte post-launch incluido.',
    agents: ['Uranus'],
    color: '#f97316',
    duration: '1 dia',
    badge: null,
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Construimos a velocidad <span className="text-[#2dd4bf]">⚡ IA</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            El mismo proceso profesional de una fabrica de software, pero acelerado por agentes IA en cada etapa.
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
            El paso 1 es gratis y sin compromiso. Habla con Atlas para empezar.
          </p>
          <Link
            href="/chat/product-owner"
            className="btn text-sm px-5 py-2.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all"
          >
            Empezar discovery gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
