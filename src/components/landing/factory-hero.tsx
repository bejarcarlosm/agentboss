'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DynamicOrb } from '@/components/ui/dynamic-orb';

interface PlanetProps {
  href: string;
  color: string;
  name: string;
  role: string;
  avatar: string;
  dotSize?: string;
  textSize?: string;
  opacity?: string;
}

function Planet({ href, color, name, role, avatar, dotSize = 'w-2 h-2', textSize = 'text-[9px]', opacity = '' }: PlanetProps) {
  return (
    <Link href={href} className="group/planet relative flex items-center gap-1.5 hover:scale-110 transition-transform">
      {/* Avatar tooltip on hover */}
      <Image
        src={avatar}
        alt={name}
        width={32}
        height={32}
        className="w-8 h-8 rounded-full object-cover border-2 opacity-0 group-hover/planet:opacity-100 scale-75 group-hover/planet:scale-100 transition-all duration-200 absolute -top-10 left-1/2 -translate-x-1/2 shadow-lg pointer-events-none"
        style={{ borderColor: color, boxShadow: `0 0 12px ${color}40` }}
      />
      <span className={`${dotSize} rounded-full flex-shrink-0`} style={{ background: color, boxShadow: `0 0 8px ${color}99` }} />
      <span className={`px-1.5 py-0.5 rounded-full border ${textSize} font-semibold whitespace-nowrap ${opacity}`} style={{ background: `${color}10`, borderColor: `${color}20`, color: color }}>
        {name} · {role}
      </span>
    </Link>
  );
}

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
              <span className="text-[var(--foreground)] font-semibold">3x mas features en menos tiempo</span> que una fabrica tradicional.
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
                <Planet href="/dossier/pluto" color="#22c55e" name="Pluto" role="QA" avatar="/agents/pluto.jpg" />
              </div>

              {/* Mars Growth - 22s */}
              <div className="absolute planet-mars" style={{ animationDelay: '-8s' }}>
                <Planet href="/dossier/mars" color="#ef4444" name="Mars" role="Growth" avatar="/agents/mars.jpg" />
              </div>

              {/* Flux Dev - 25s */}
              <div className="absolute planet-flux" style={{ animationDelay: '-5s' }}>
                <Planet href="/dossier/flux" color="#06b6d4" name="Flux" role="Dev" avatar="/agents/flux.jpg" />
              </div>

              {/* Orion Infra - 28s */}
              <div className="absolute planet-orion" style={{ animationDelay: '-14s' }}>
                <Planet href="/dossier/orion" color="#f97316" name="Orion" role="Infra" avatar="/agents/orion.jpg" />
              </div>

              {/* Venus UX - 30s */}
              <div className="absolute planet-venus" style={{ animationDelay: '-10s' }}>
                <Planet href="/dossier/venus" color="#a855f7" name="Venus" role="UX" avatar="/agents/venus.jpg" />
              </div>

              {/* Nova AI - 35s */}
              <div className="absolute planet-nova" style={{ animationDelay: '-20s' }}>
                <Planet href="/dossier/nova" color="#3b82f6" name="Nova" role="AI" avatar="/agents/nova.jpg" />
              </div>

              {/* Atlas PO - 40s */}
              <div className="absolute planet-atlas" style={{ animationDelay: '-26.67s' }}>
                <Planet href="/dossier/atlas" color="#2dd4bf" name="Atlas" role="PO" avatar="/agents/atlas.jpg" dotSize="w-2.5 h-2.5" />
              </div>

              {/* === Business orbit (far, slow) === */}

              {/* Luna Support - 48s */}
              <div className="absolute planet-luna" style={{ animationDelay: '-16s' }}>
                <Planet href="/dossier/luna" color="#10b981" name="Luna" role="Soporte" avatar="/agents/luna.jpg" dotSize="w-1.5 h-1.5" textSize="text-[8px]" opacity="opacity-80" />
              </div>

              {/* Sia Content - 52s */}
              <div className="absolute planet-sia" style={{ animationDelay: '-30s' }}>
                <Planet href="/dossier/sia" color="#ec4899" name="Sia" role="Contenido" avatar="/agents/sia.jpg" dotSize="w-1.5 h-1.5" textSize="text-[8px]" opacity="opacity-80" />
              </div>

              {/* Saturn Analytics - 56s */}
              <div className="absolute planet-saturn" style={{ animationDelay: '-40s' }}>
                <Planet href="/dossier/saturn" color="#8b5cf6" name="Saturn" role="Analytics" avatar="/agents/saturn.jpg" dotSize="w-1.5 h-1.5" textSize="text-[8px]" opacity="opacity-80" />
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
            <div className="text-3xl md:text-4xl font-bold text-[#2dd4bf]">3x</div>
            <div className="text-sm text-[var(--muted)] mt-1">Mas features por sprint</div>
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
