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

          {/* Right: Orb */}
          <div className="flex-shrink-0 relative">
            <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full orb-hero-glow animate-float">
              <DynamicOrb agentState={null} colors={['#2dd4bf', '#0f766e']} />
            </div>
            {/* Floating agent labels around orb */}
            <div className="absolute -top-2 -right-4 px-2.5 py-1 rounded-full bg-[#2dd4bf]/10 border border-[#2dd4bf]/20 text-[10px] font-semibold text-[#2dd4bf] animate-float" style={{ animationDelay: '0.5s' }}>
              Atlas · PO
            </div>
            <div className="absolute top-1/2 -left-8 px-2.5 py-1 rounded-full bg-[#a855f7]/10 border border-[#a855f7]/20 text-[10px] font-semibold text-[#a855f7] animate-float" style={{ animationDelay: '1s' }}>
              Venus · UX
            </div>
            <div className="absolute -bottom-2 right-4 px-2.5 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[10px] font-semibold text-[#22c55e] animate-float" style={{ animationDelay: '1.5s' }}>
              Pluto · QA
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
