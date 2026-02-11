'use client';

import Link from 'next/link';
import { DynamicOrb } from '@/components/ui/dynamic-orb';

export function FactoryHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] wave-gradient">
      {/* Wave gradient glow overlay */}
      <div className="absolute inset-0 wave-gradient-glow pointer-events-none" />

      {/* Radial glow behind orb */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#2dd4bf]/5 blur-[100px] pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left: Copy */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 text-[#2dd4bf] text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2dd4bf] animate-pulse" />
              Fabrica de Software potenciada por IA
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Construimos tu software{' '}
              <span className="text-[#2dd4bf]">en semanas, no meses</span>
            </h1>

            {/* Value prop */}
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
              Tu equipo de desarrollo potenciado por agentes IA. Creamos las apps, automatizaciones y sistemas que tu negocio necesita —{' '}
              <span className="text-[var(--foreground)] font-semibold">mas rapido y mas economico</span> que una fabrica tradicional.
            </p>

            <p className="text-sm text-[var(--muted)] mb-8">
              Discovery gratuito · Sin compromiso · Precio fijo por MVP
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/chat/product-owner"
                className="btn text-base px-6 py-3 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)]"
              >
                Iniciar discovery gratis
              </Link>
              <a
                href="#process"
                className="btn btn-secondary text-base px-6 py-3"
              >
                Como funciona
              </a>
            </div>
          </div>

          {/* Right: Planetary System */}
          <div className="flex-shrink-0 relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] planetary-system">
            {/* Static orbit path guides */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[160px] h-[160px] md:w-[250px] md:h-[250px] rounded-full border border-white/[0.04]" />
              <div className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-white/[0.03]" />
              <div className="absolute w-[240px] h-[240px] md:w-[390px] md:h-[390px] rounded-full border border-white/[0.02]" />
              <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-dotted border-white/[0.015]" />
            </div>

            {/* Orbiting planets - all clickable to dossier */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Pluto QA - 20s */}
              <div className="absolute planet-pluto">
                <Link href="/dossier/pluto" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[9px] font-semibold text-[#22c55e] whitespace-nowrap">
                    Pluto · QA
                  </span>
                </Link>
              </div>

              {/* Mars Growth - 22s */}
              <div className="absolute planet-mars" style={{ animationDelay: '-8s' }}>
                <Link href="/dossier/mars" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ef4444]/10 border border-[#ef4444]/20 text-[9px] font-semibold text-[#ef4444] whitespace-nowrap">
                    Mars · Growth
                  </span>
                </Link>
              </div>

              {/* Flux Dev - 25s */}
              <div className="absolute planet-flux" style={{ animationDelay: '-5s' }}>
                <Link href="/dossier/flux" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#06b6d4] shadow-[0_0_8px_rgba(6,182,212,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/20 text-[9px] font-semibold text-[#06b6d4] whitespace-nowrap">
                    Flux · Dev
                  </span>
                </Link>
              </div>

              {/* Orion Infra - 28s */}
              <div className="absolute planet-orion" style={{ animationDelay: '-14s' }}>
                <Link href="/dossier/orion" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#f97316] shadow-[0_0_8px_rgba(249,115,22,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20 text-[9px] font-semibold text-[#f97316] whitespace-nowrap">
                    Orion · Infra
                  </span>
                </Link>
              </div>

              {/* Venus UX - 30s */}
              <div className="absolute planet-venus" style={{ animationDelay: '-10s' }}>
                <Link href="/dossier/venus" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[9px] font-semibold text-[#a855f7] whitespace-nowrap">
                    Venus · UX
                  </span>
                </Link>
              </div>

              {/* Nova AI - 35s */}
              <div className="absolute planet-nova" style={{ animationDelay: '-20s' }}>
                <Link href="/dossier/nova" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[9px] font-semibold text-[#3b82f6] whitespace-nowrap">
                    Nova · AI
                  </span>
                </Link>
              </div>

              {/* Atlas PO - 40s */}
              <div className="absolute planet-atlas" style={{ animationDelay: '-26.67s' }}>
                <Link href="/dossier/atlas" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2dd4bf] shadow-[0_0_10px_rgba(45,212,191,0.6)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[9px] font-semibold text-[#2dd4bf] whitespace-nowrap">
                    Atlas · PO
                  </span>
                </Link>
              </div>

              {/* === Business orbit (far, slow) === */}

              {/* Luna Support - 48s */}
              <div className="absolute planet-luna" style={{ animationDelay: '-16s' }}>
                <Link href="/dossier/luna" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_6px_rgba(16,185,129,0.5)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/15 text-[8px] font-semibold text-[#10b981]/80 whitespace-nowrap">
                    Luna · Soporte
                  </span>
                </Link>
              </div>

              {/* Sia Content - 52s */}
              <div className="absolute planet-sia" style={{ animationDelay: '-30s' }}>
                <Link href="/dossier/sia" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ec4899] shadow-[0_0_6px_rgba(236,72,153,0.5)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#ec4899]/10 border border-[#ec4899]/15 text-[8px] font-semibold text-[#ec4899]/80 whitespace-nowrap">
                    Sia · Contenido
                  </span>
                </Link>
              </div>

              {/* Saturn Analytics - 56s */}
              <div className="absolute planet-saturn" style={{ animationDelay: '-40s' }}>
                <Link href="/dossier/saturn" className="flex items-center gap-1.5 hover:scale-110 transition-transform">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] shadow-[0_0_6px_rgba(139,92,246,0.5)] flex-shrink-0" />
                  <span className="px-1.5 py-0.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/15 text-[8px] font-semibold text-[#8b5cf6]/80 whitespace-nowrap">
                    Saturn · Analytics
                  </span>
                </Link>
              </div>
            </div>

            {/* Central Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] md:w-[140px] md:h-[140px] rounded-full orb-hero-glow">
              <DynamicOrb agentState={null} colors={['#2dd4bf', '#0f766e']} />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 mt-12 border-t border-[var(--border)]">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">10x</div>
            <div className="text-sm text-[var(--muted)] mt-1">Mas rapido que desarrollo tradicional</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#2dd4bf]">70%</div>
            <div className="text-sm text-[var(--muted)] mt-1">Ahorro vs fabrica tradicional</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">1-4</div>
            <div className="text-sm text-[var(--muted)] mt-1">Semanas para tu MVP</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#22c55e]">5</div>
            <div className="text-sm text-[var(--muted)] mt-1">Agentes IA especializados</div>
          </div>
        </div>
      </div>
    </section>
  );
}
