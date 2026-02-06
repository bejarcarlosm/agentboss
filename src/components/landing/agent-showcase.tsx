'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getAllAgents } from '@/lib/factory-service';

// Simulates a speech waveform: bursts of activity, pauses, varying intensity
const WAVEFORM = [
  // "Hola, soy Atlas..." (burst)
  12, 28, 45, 70, 85, 95, 80, 60, 90, 75, 50, 30, 15, 8,
  // pause
  5, 4, 5, 6, 5,
  // "...tu Product Owner" (second phrase)
  10, 25, 55, 80, 100, 90, 70, 95, 85, 65, 40, 20, 10,
  // pause
  4, 5, 3, 5,
  // "Necesito entender tu negocio" (longer phrase)
  8, 20, 40, 65, 85, 75, 90, 100, 88, 70, 92, 80, 60, 45, 75, 55, 30, 15, 8,
  // pause
  5, 4, 6, 4, 5,
  // "Cuéntame..." (trailing off)
  10, 30, 50, 70, 60, 80, 65, 45, 25, 12, 6, 4,
];

function LargeSoundWave() {
  return (
    <div
      className="flex items-center justify-center gap-[2px] md:gap-[3px] h-16 md:h-24 w-full mb-10 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      {WAVEFORM.map((height, i) => (
        <span
          key={i}
          className="w-[3px] md:w-[4px] rounded-full bg-[#2dd4bf] flex-shrink-0 transition-all"
          style={{
            height: `${Math.max(height, 4)}%`,
            opacity: 0.3 + (height / 100) * 0.7,
          }}
        />
      ))}
    </div>
  );
}

export function AgentShowcase() {
  const agents = getAllAgents();
  const frontOffice = agents.filter(a => a.category === 'front-office');
  const backOffice = agents.filter(a => a.category === 'back-office');

  return (
    <section id="team" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Nuestro equipo de agentes IA
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Cada agente es un especialista. Juntos cubren todo el ciclo de desarrollo de software, desde la idea hasta produccion.
          </p>
        </div>

        {/* Large sound wave — same style as agents/[id] test tab */}
        <LargeSoundWave />

        {/* Front-Office */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-4">
            Discovery — Hablan contigo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {frontOffice.map(agent => (
              <Link
                key={agent.id}
                href={`/chat/${agent.slug}`}
                className="group flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:-translate-y-0.5"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = agent.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '';
                }}
              >
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
                  style={{ borderColor: agent.color }}
                >
                  <Image src={agent.avatar} alt={agent.name} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: agent.color }}>{agent.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: agent.color }} />
                  </div>
                  <p className="text-xs text-[var(--muted)]">{agent.role}</p>
                </div>
                <span className="text-xs text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  Hablar →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Back-Office */}
        <div>
          <h3 className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-4">
            Ejecucion — Construyen tu proyecto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backOffice.map(agent => (
              <div
                key={agent.id}
                className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)] opacity-60"
              >
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
                  style={{ borderColor: agent.color }}
                >
                  <Image src={agent.avatar} alt={agent.name} width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm" style={{ color: agent.color }}>{agent.name}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-[var(--muted)]">{agent.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
