'use client';

import { useLocale } from 'next-intl';

const COMPARISONS_ES = [
  { label: 'Diagnóstico', traditional: '2-4 semanas', agentboss: '1-2 días' },
  { label: 'Tiempo a MVP (producto mínimo)', traditional: '8-16 semanas', agentboss: '1-4 semanas' },
  { label: 'Funcionalidades por ciclo', traditional: '3-5', agentboss: '10-15' },
  { label: 'Disponibilidad', traditional: 'Horario oficina', agentboss: '24/7' },
  { label: 'Costo diagnóstico', traditional: 'Cobrado', agentboss: 'Gratis' },
  { label: 'Iteraciones', traditional: 'Limitadas por contrato', agentboss: 'Ilimitadas en diagnóstico' },
];

const COMPARISONS_EN = [
  { label: 'Discovery', traditional: '2-4 weeks', agentboss: '1-2 days' },
  { label: 'Time to MVP', traditional: '8-16 weeks', agentboss: '1-4 weeks' },
  { label: 'Features per sprint', traditional: '3-5 features', agentboss: '10-15 features' },
  { label: 'Availability', traditional: 'Office hours', agentboss: '24/7' },
  { label: 'Discovery cost', traditional: 'Charged', agentboss: 'Free' },
  { label: 'Iterations', traditional: 'Limited by contract', agentboss: 'Unlimited in discovery' },
];

export function ValueProps() {
  const locale = useLocale();
  const COMPARISONS = locale === 'es' ? COMPARISONS_ES : COMPARISONS_EN;
  const t = locale === 'es'
    ? { heading: 'Fábrica tradicional vs', subheading: 'Mismo presupuesto. 3x más funcionalidades entregadas.', traditional: 'Fábrica Tradicional' }
    : { heading: 'Traditional factory vs', subheading: 'Same budget. 3x more features delivered.', traditional: 'Traditional Factory' };

  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t.heading} <span className="text-[#2dd4bf]">AgentBoss</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--border)] overflow-hidden">
          <div className="grid grid-cols-3 text-sm font-bold">
            <div className="p-4 bg-[var(--secondary)]" />
            <div className="p-4 bg-[var(--secondary)] text-center text-[var(--muted)]">{t.traditional}</div>
            <div className="p-4 bg-[#2dd4bf]/10 text-center text-[#2dd4bf]">AgentBoss</div>
          </div>

          {COMPARISONS.map((row, i) => (
            <div key={row.label} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? '' : 'bg-[var(--secondary)]/30'}`}>
              <div className="p-4 font-medium border-t border-[var(--border)]">{row.label}</div>
              <div className="p-4 text-center text-[var(--muted)] border-t border-[var(--border)]">{row.traditional}</div>
              <div className="p-4 text-center font-semibold text-[#2dd4bf] border-t border-[var(--border)] bg-[#2dd4bf]/5">{row.agentboss}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
