import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { DOSSIER_AGENTS, getDossierAgent } from '@/lib/dossier-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DOSSIER_AGENTS.map(a => ({ slug: a.slug }));
}

export default async function DossierPage({ params }: Props) {
  const { slug } = await params;
  const agent = getDossierAgent(slug);
  if (!agent) notFound();

  // Find prev/next agents for navigation
  const idx = DOSSIER_AGENTS.findIndex(a => a.slug === slug);
  const prev = DOSSIER_AGENTS[idx - 1];
  const next = DOSSIER_AGENTS[idx + 1];

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Scan lines overlay */}
      <div className="dossier-scanlines" />

      {/* Top bar */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/#team" className="text-xs text-[var(--muted)] hover:text-white transition-colors">
            ← Volver al equipo
          </Link>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest">
              Classified
            </span>
          </div>
          <div className="text-[10px] font-mono text-[var(--muted)]">
            AGENTBOSS // DOSSIER {String(idx + 1).padStart(3, '0')}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16 relative z-10">
        {/* CLASSIFIED watermark */}
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 text-[120px] md:text-[180px] font-black text-white/[0.02] uppercase tracking-widest select-none pointer-events-none -rotate-12"
        >
          Classified
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14">
          {/* Left: Photo + status */}
          <div>
            {/* Agent photo */}
            <div className="relative mb-6">
              <div
                className="w-full aspect-[3/4] rounded-lg overflow-hidden border-2 dossier-photo-glow"
                style={{ borderColor: agent.color }}
              >
                <Image
                  src={agent.avatar}
                  alt={agent.codename}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-3 left-4 right-4 flex justify-center">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    agent.status === 'ACTIVE'
                      ? 'bg-green-500/10 text-green-400 border-green-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {agent.status === 'ACTIVE' ? 'Operativo' : 'En Espera'}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="space-y-3 mt-8">
              {Object.entries(agent.stats).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--muted)]">
                      {key === 'speed' ? 'Velocidad' : key === 'precision' ? 'Precision' : key === 'creativity' ? 'Creatividad' : 'Autonomia'}
                    </span>
                    <span className="text-[10px] font-mono" style={{ color: agent.color }}>
                      {value}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${value}%`, background: agent.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Dossier info */}
          <div>
            {/* Codename */}
            <div className="mb-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">
                Codename
              </span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-2"
              style={{ color: agent.color }}
            >
              {agent.codename}
            </h1>

            {/* Role */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-lg text-[var(--foreground)] font-semibold">
                {agent.role}
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            {/* Briefing */}
            <div className="mb-8">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] mb-3">
                Briefing
              </h2>
              <p className="text-[var(--muted)] leading-relaxed text-sm border-l-2 pl-4" style={{ borderColor: agent.color }}>
                {agent.briefing}
              </p>
            </div>

            {/* Quote */}
            <div className="mb-8 p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <p className="text-sm italic text-[var(--foreground)]">
                &ldquo;{agent.quote}&rdquo;
              </p>
            </div>

            {/* Specialties */}
            <div className="mb-10">
              <h2 className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] mb-3">
                Especialidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {agent.specialties.map(s => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-md text-xs font-medium border"
                    style={{
                      borderColor: `${agent.color}30`,
                      color: agent.color,
                      background: `${agent.color}08`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            {agent.chatSlug ? (
              <Link
                href={`/chat/${agent.chatSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-[#0a0a0a] transition-all hover:-translate-y-0.5"
                style={{ background: agent.color }}
              >
                Hablar con {agent.codename}
                <span>→</span>
              </Link>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm border border-amber-500/30 text-amber-400 opacity-60 cursor-not-allowed">
                Proximamente disponible
              </div>
            )}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/5">
          {prev ? (
            <Link href={`/dossier/${prev.slug}`} className="group flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors">
              <span>←</span>
              <span className="font-bold" style={{ color: prev.color }}>{prev.codename}</span>
            </Link>
          ) : <div />}

          {/* Dots nav */}
          <div className="flex items-center gap-2">
            {DOSSIER_AGENTS.map(a => (
              <Link
                key={a.slug}
                href={`/dossier/${a.slug}`}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: a.slug === slug ? a.color : 'rgba(255,255,255,0.1)',
                  boxShadow: a.slug === slug ? `0 0 8px ${a.color}60` : 'none',
                }}
              />
            ))}
          </div>

          {next ? (
            <Link href={`/dossier/${next.slug}`} className="group flex items-center gap-2 text-sm text-[var(--muted)] hover:text-white transition-colors">
              <span className="font-bold" style={{ color: next.color }}>{next.codename}</span>
              <span>→</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
