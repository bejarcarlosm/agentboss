'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DOSSIER_AGENTS } from '@/lib/dossier-data';

// Simulates a speech waveform: bursts of activity, pauses, varying intensity
const WAVEFORM = [
  12, 28, 45, 70, 85, 95, 80, 60, 90, 75, 50, 30, 15, 8,
  5, 4, 5, 6, 5,
  10, 25, 55, 80, 100, 90, 70, 95, 85, 65, 40, 20, 10,
  4, 5, 3, 5,
  8, 20, 40, 65, 85, 75, 90, 100, 88, 70, 92, 80, 60, 45, 75, 55, 30, 15, 8,
  5, 4, 6, 4, 5,
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
  return (
    <section id="team" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Dossier Clasificado
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Nuestro equipo de agentes IA
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Cada agente es un especialista. Juntos cubren todo el ciclo de desarrollo — desde la idea hasta el lanzamiento. Haz click para ver su expediente.
          </p>
        </div>

        <LargeSoundWave />

        {/* Agent grid - dossier style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {DOSSIER_AGENTS.map((agent) => (
            <Link
              key={agent.slug}
              href={`/dossier/${agent.slug}`}
              className="group relative flex flex-col items-center text-center p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:-translate-y-1 hover:border-transparent"
              style={{
                // @ts-expect-error css custom property
                '--hover-color': agent.color,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = agent.color;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${agent.color}15`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.boxShadow = '';
              }}
            >
              {/* Avatar */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 mb-3 transition-shadow group-hover:shadow-lg"
                style={{ borderColor: agent.color }}
              >
                <Image
                  src={agent.avatar}
                  alt={agent.codename}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <span className="font-bold text-sm" style={{ color: agent.color }}>
                {agent.codename}
              </span>
              <span className="text-[10px] text-[var(--muted)] mt-0.5">
                {agent.role}
              </span>

              {/* Status dot */}
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${agent.status === 'ACTIVE' ? 'animate-pulse' : ''}`}
                  style={{ background: agent.status === 'ACTIVE' ? agent.color : 'var(--muted)' }}
                />
                <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--muted)]">
                  {agent.status === 'ACTIVE' ? 'Activo' : 'Standby'}
                </span>
              </div>

              {/* Hover: "Ver dossier" */}
              <span className="absolute bottom-1 text-[8px] font-mono uppercase tracking-widest text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                Ver dossier →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
