'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DOSSIER_AGENTS } from '@/lib/dossier-data';
import { useDiagnosticModal } from './diagnostic-modal-provider';

const FEATURED_SLUGS = ['atlas', 'venus', 'flux', 'pluto'];

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

function AgentCard({ agent, locale, t }: { agent: typeof DOSSIER_AGENTS[number]; locale: string; t: { active: string; standby: string; viewDossier: string } }) {
  return (
    <Link
      href={`/${locale}/dossier/${agent.slug}`}
      className="group relative flex flex-col items-center text-center p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:-translate-y-1 hover:border-transparent"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = agent.color;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${agent.color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 mb-3 transition-shadow group-hover:shadow-lg"
        style={{ borderColor: agent.color }}
      >
        <Image
          src={agent.avatar}
          alt={agent.codename}
          width={80}
          height={80}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="font-bold text-sm" style={{ color: agent.color }}>
        {agent.codename}
      </span>
      <span className="text-[10px] text-[var(--muted)] mt-0.5">
        {agent.role}
      </span>

      <div className="flex items-center gap-1 mt-2">
        <span
          className={`w-1.5 h-1.5 rounded-full ${agent.status === 'ACTIVE' ? 'animate-pulse' : ''}`}
          style={{ background: agent.status === 'ACTIVE' ? agent.color : 'var(--muted)' }}
        />
        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--muted)]">
          {agent.status === 'ACTIVE' ? t.active : t.standby}
        </span>
      </div>

      <span className="absolute bottom-1 text-[8px] font-mono uppercase tracking-widest text-[var(--muted)] opacity-0 group-hover:opacity-100 transition-opacity">
        {t.viewDossier}
      </span>
    </Link>
  );
}

export function AgentShowcase({ locale }: { locale: string }) {
  const [showAll, setShowAll] = useState(false);
  const { openModal } = useDiagnosticModal();

  const t = locale === 'es'
    ? { badge: 'Dossier Clasificado', heading: 'Nuestro equipo de agentes IA', subheading: 'Cada agente es un especialista. Juntos cubren todo el ciclo de desarrollo — desde la idea hasta el lanzamiento. Haz click para ver su expediente.', declassified: '10/36 agentes desclasificados', active: 'Activo', standby: 'Standby', viewDossier: 'Ver dossier →', showMore: 'Conoce al resto del equipo', showLess: 'Ocultar', cta: 'Solicita un diagn\u00f3stico' }
    : { badge: 'Classified Dossier', heading: 'Our team of AI agents', subheading: 'Each agent is a specialist. Together they cover the entire development cycle — from idea to launch. Click to view their dossier.', declassified: '10/36 agents declassified', active: 'Active', standby: 'Standby', viewDossier: 'View dossier →', showMore: 'Meet the rest of the team', showLess: 'Hide', cta: 'Request a diagnostic' };

  const featuredAgents = DOSSIER_AGENTS.filter(a => FEATURED_SLUGS.includes(a.slug));
  const remainingAgents = DOSSIER_AGENTS.filter(a => !FEATURED_SLUGS.includes(a.slug));

  return (
    <section id="team" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {t.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {t.heading}
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <LargeSoundWave />

        {/* Featured agents (4) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} locale={locale} t={t} />
          ))}
        </div>

        {/* Remaining agents (expandable) */}
        {showAll && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-4">
            {remainingAgents.map((agent) => (
              <AgentCard key={agent.slug} agent={agent} locale={locale} t={t} />
            ))}
          </div>
        )}

        <div className="flex flex-col items-center gap-4 mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 rounded-full border border-[var(--border)] bg-[var(--secondary)] hover:border-[#2dd4bf]/50 transition-all text-sm text-[var(--muted)] hover:text-[#2dd4bf]"
          >
            {showAll ? t.showLess : `${t.showMore} (+${remainingAgents.length})`}
          </button>

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
