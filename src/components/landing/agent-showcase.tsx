'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DOSSIER_AGENTS } from '@/lib/dossier-data';

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

export function AgentShowcase({ locale }: { locale: string }) {
  const t = locale === 'es'
    ? { badge: 'Dossier Clasificado', heading: 'Nuestro equipo de agentes IA', subheading: 'Cada agente es un especialista. Juntos cubren todo el ciclo de desarrollo — desde la idea hasta el lanzamiento. Haz click para ver su expediente.', declassified: '10/36 agentes desclasificados', active: 'Activo', standby: 'Standby', viewDossier: 'Ver dossier →' }
    : { badge: 'Classified Dossier', heading: 'Our team of AI agents', subheading: 'Each agent is a specialist. Together they cover the entire development cycle — from idea to launch. Click to view their dossier.', declassified: '10/36 agents declassified', active: 'Active', standby: 'Standby', viewDossier: 'View dossier →' };

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
          <p className="text-sm font-mono text-[#2dd4bf] mt-3 tracking-wider">
            {t.declassified}
          </p>
        </div>

        <LargeSoundWave />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-4">
          {DOSSIER_AGENTS.map((agent) => (
            <Link
              key={agent.slug}
              href={`/${locale}/dossier/${agent.slug}`}
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
          ))}
        </div>

        {/* Remaining classified agents */}
        <div className="mt-10 pt-8 border-t border-[var(--border)]">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] text-center mb-4">
            {locale === 'es' ? 'El resto del equipo tras bambalinas' : 'The rest of the team behind the scenes'}
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 max-w-3xl mx-auto">
            {[
              'Frontend Dev', 'Mobile Builder', 'Rapid Prototyper', 'Test Writer',
              'Feedback Synthesizer', 'Sprint Prioritizer', 'Trend Researcher',
              'App Store Optimizer', 'Instagram Curator', 'Reddit Community',
              'TikTok Strategist', 'Twitter Engager', 'Brand Guardian',
              'UX Researcher', 'Visual Storyteller', 'Fun Injector',
              'Experiment Tracker', 'Project Launcher', 'Studio Producer',
              'Finance Tracker', 'Infra Maintainer', 'Legal Checker',
              'API Tester', 'Performance Benchmarker', 'Tool Evaluator',
              'Workflow Optimizer',
            ].map(name => (
              <span key={name} className="text-[10px] text-[var(--muted)] opacity-50">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
