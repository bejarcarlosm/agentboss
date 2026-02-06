'use client';

const STAGES = [
  {
    name: 'Discovery',
    description: 'Atlas, Venus y Pluto entienden tu negocio',
    color: '#2dd4bf',
    icon: '🔍',
    agents: ['Atlas', 'Venus', 'Pluto'],
    status: 'active' as const,
  },
  {
    name: 'Development',
    description: 'Earth construye tu software',
    color: '#06b6d4',
    icon: '⚡',
    agents: ['Earth'],
    status: 'coming-soon' as const,
  },
  {
    name: 'Deploy',
    description: 'Uranus lo lleva a produccion',
    color: '#f97316',
    icon: '🚀',
    agents: ['Uranus'],
    status: 'coming-soon' as const,
  },
];

export function PipelinePreview() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            La linea de <span className="text-[var(--foreground)]">ensamblaje</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Como una fabrica de autos, pero para software. Cada fase tiene agentes especializados.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-0">
          {STAGES.map((stage, i) => (
            <div key={stage.name} className="flex-1 flex items-stretch">
              <div
                className="flex-1 rounded-2xl md:rounded-none md:first:rounded-l-2xl md:last:rounded-r-2xl border border-[var(--border)] p-6 relative"
                style={{
                  background: `${stage.color}08`,
                }}
              >
                <div className="text-3xl mb-3">{stage.icon}</div>
                <h3 className="text-lg font-bold mb-1" style={{ color: stage.color }}>
                  {stage.name}
                </h3>
                <p className="text-sm text-[var(--muted)] mb-3">{stage.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {stage.agents.map(name => (
                    <span
                      key={name}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background: `${stage.color}20`,
                        color: stage.color,
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>

                {stage.status === 'coming-soon' && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
                    Soon
                  </span>
                )}
              </div>

              {/* Arrow connector (not on last) */}
              {i < STAGES.length - 1 && (
                <div className="hidden md:flex items-center justify-center w-8 text-[var(--muted)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
