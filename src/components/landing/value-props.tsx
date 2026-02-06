export function ValueProps() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Fabrica tradicional vs <span className="text-[#2dd4bf]">AgentBoss</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Mismo resultado profesional. Fraccion del tiempo y costo.
          </p>
        </div>

        {/* Comparison table */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-[var(--border)] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 text-sm font-bold">
            <div className="p-4 bg-[var(--secondary)]" />
            <div className="p-4 bg-[var(--secondary)] text-center text-[var(--muted)]">Fabrica Tradicional</div>
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

const COMPARISONS = [
  { label: 'Discovery', traditional: '2-4 semanas', agentboss: '1-2 dias' },
  { label: 'Tiempo a MVP', traditional: '8-16 semanas', agentboss: '1-4 semanas' },
  { label: 'Costo promedio MVP', traditional: '$15,000 - $50,000', agentboss: '$3,000 - $10,000' },
  { label: 'Disponibilidad', traditional: 'Horario oficina', agentboss: '24/7' },
  { label: 'Costo discovery', traditional: 'Cobrado', agentboss: 'Gratis' },
  { label: 'Iteraciones', traditional: 'Limitadas por contrato', agentboss: 'Ilimitadas en discovery' },
];
