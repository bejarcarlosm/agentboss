'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { DynamicOrb } from '@/components/ui/dynamic-orb';

const PLANETS_DATA = [
  { id: 'pluto', color: '#22c55e', name: 'Pluto', role_es: 'QA', role_en: 'QA', avatar: '/agents/pluto.jpg', cssClass: 'planet-pluto', delay: undefined, dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'mars', color: '#ef4444', name: 'Mars', role_es: 'Growth', role_en: 'Growth', avatar: '/agents/mars.jpg', cssClass: 'planet-mars', delay: '-8s', dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'flux', color: '#06b6d4', name: 'Flux', role_es: 'Dev', role_en: 'Dev', avatar: '/agents/flux.jpg', cssClass: 'planet-flux', delay: '-5s', dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'orion', color: '#f97316', name: 'Orion', role_es: 'Infra', role_en: 'Infra', avatar: '/agents/orion.jpg', cssClass: 'planet-orion', delay: '-14s', dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'venus', color: '#a855f7', name: 'Venus', role_es: 'UX', role_en: 'UX', avatar: '/agents/venus.jpg', cssClass: 'planet-venus', delay: '-10s', dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'nova', color: '#3b82f6', name: 'Nova', role_es: 'IA', role_en: 'AI', avatar: '/agents/nova.jpg', cssClass: 'planet-nova', delay: '-20s', dotSize: 'w-2 h-2', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'atlas', color: '#2dd4bf', name: 'Atlas', role_es: 'PO', role_en: 'PO', avatar: '/agents/atlas.jpg', cssClass: 'planet-atlas', delay: '-26.67s', dotSize: 'w-2.5 h-2.5', textSize: 'text-[9px]', orbit: 'inner' },
  { id: 'luna', color: '#10b981', name: 'Luna', role_es: 'Soporte', role_en: 'Support', avatar: '/agents/luna.jpg', cssClass: 'planet-luna', delay: '-16s', dotSize: 'w-1.5 h-1.5', textSize: 'text-[8px]', orbit: 'outer' },
  { id: 'sia', color: '#ec4899', name: 'Sia', role_es: 'Contenido', role_en: 'Content', avatar: '/agents/sia.jpg', cssClass: 'planet-sia', delay: '-30s', dotSize: 'w-1.5 h-1.5', textSize: 'text-[8px]', orbit: 'outer' },
  { id: 'saturn', color: '#8b5cf6', name: 'Saturn', role_es: 'Analytics', role_en: 'Analytics', avatar: '/agents/saturn.jpg', cssClass: 'planet-saturn', delay: '-40s', dotSize: 'w-1.5 h-1.5', textSize: 'text-[8px]', orbit: 'outer' },
] as const;

interface PlanetProps {
  href: string;
  color: string;
  name: string;
  role: string;
  avatar: string;
  dotSize?: string;
  textSize?: string;
  isOuter?: boolean;
  isSpotlight?: boolean;
}

function Planet({ href, color, name, role, avatar, dotSize = 'w-2 h-2', textSize = 'text-[9px]', isOuter = false, isSpotlight = false }: PlanetProps) {

  return (
    <Link href={href} className="group/planet relative flex items-center gap-1.5 hover:scale-110 transition-transform">
      {/* Avatar - shown on hover OR when spotlight is active */}
      <div className="absolute -top-[9rem] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <Image
          src={avatar}
          alt={name}
          width={128}
          height={128}
          className={`w-32 h-32 rounded-full object-cover border-2 transition-all duration-300 shadow-lg cursor-pointer ${
            isSpotlight
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-75 pointer-events-none group-hover/planet:opacity-100 group-hover/planet:scale-100 group-hover/planet:pointer-events-auto'
          }`}
          style={{ borderColor: color, boxShadow: isSpotlight ? `0 0 16px ${color}60` : `0 0 12px ${color}40` }}
        />
      </div>
      <span className={`${dotSize} rounded-full flex-shrink-0`} style={{ background: color, boxShadow: `0 0 8px ${color}99` }} />
      <span className={`px-1.5 py-0.5 rounded-full border ${textSize} font-semibold whitespace-nowrap ${isOuter ? 'opacity-80' : ''}`} style={{ background: `${color}10`, borderColor: `${color}20`, color: color }}>
        {name} · {role}
      </span>
    </Link>
  );
}

export function FactoryHero() {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const locale = useLocale();

  const t = locale === 'es' ? {
    badge: 'Fabrica de Software potenciada por IA',
    headline: 'Construimos tu software',
    headlineHighlight: 'en semanas, no meses',
    description: 'Tu equipo de desarrollo potenciado por agentes IA. Creamos las apps, automatizaciones y sistemas que tu negocio necesita —',
    descriptionHighlight: '3x mas features en menos tiempo',
    descriptionEnd: 'que una fabrica tradicional.',
    subtext: 'Discovery gratuito · Sin compromiso · Precio fijo por MVP',
    ctaPrimary: 'Iniciar discovery gratis',
    ctaSecondary: 'Como funciona',
    speedLabel: 'Mas rapido que desarrollo tradicional',
    featuresLabel: 'Mas features por sprint',
    mvpLabel: 'Semanas para tu MVP',
    agentsLabel: 'Agentes IA especializados',
  } : {
    badge: 'AI-Powered Software Factory',
    headline: 'We build your software',
    headlineHighlight: 'in weeks, not months',
    description: 'Your development team powered by AI agents. We create the apps, automations, and systems your business needs —',
    descriptionHighlight: '3x more features in less time',
    descriptionEnd: 'than a traditional factory.',
    subtext: 'Free discovery · No commitment · Fixed price per MVP',
    ctaPrimary: 'Start free discovery',
    ctaSecondary: 'How it works',
    speedLabel: 'Faster than traditional development',
    featuresLabel: 'More features per sprint',
    mvpLabel: 'Weeks to your MVP',
    agentsLabel: 'Specialized AI agents',
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotlightIndex(prev => (prev + 1) % PLANETS_DATA.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
              {t.badge}
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t.headline}{' '}
              <span className="text-[#2dd4bf]">{t.headlineHighlight}</span>
            </h1>

            {/* Value prop */}
            <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
              {t.description}{' '}
              <span className="text-[var(--foreground)] font-semibold">{t.descriptionHighlight}</span> {t.descriptionEnd}
            </p>

            <p className="text-sm text-[var(--muted)] mb-8">
              {t.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/chat/product-owner`}
                className="btn text-base px-6 py-3 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)]"
              >
                {t.ctaPrimary}
              </Link>
              <a
                href="#process"
                className="btn btn-secondary text-base px-6 py-3"
              >
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Right: Planetary System */}
          <div className="flex-shrink-0 relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] planetary-system">
            {/* Static orbit path guides */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-[160px] h-[160px] md:w-[250px] md:h-[250px] rounded-full border border-[var(--orbit-line)]" />
              <div className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-[var(--orbit-line-dashed)]" />
              <div className="absolute w-[240px] h-[240px] md:w-[390px] md:h-[390px] rounded-full border border-[var(--orbit-line-dashed)]" />
              <div className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] rounded-full border border-dotted border-[var(--orbit-line-dashed)]" />
            </div>

            {/* Orbiting planets */}
            <div className="absolute inset-0 flex items-center justify-center">
              {PLANETS_DATA.map((planet, i) => (
                <div
                  key={planet.id}
                  className={`absolute ${planet.cssClass}`}
                  style={planet.delay ? { animationDelay: planet.delay } : undefined}
                >
                  <Planet
                    href={`/${locale}/dossier/${planet.id}`}
                    color={planet.color}
                    name={planet.name}
                    role={locale === 'es' ? planet.role_es : planet.role_en}
                    avatar={planet.avatar}
                    dotSize={planet.dotSize}
                    textSize={planet.textSize}
                    isOuter={planet.orbit === 'outer'}
                    isSpotlight={spotlightIndex === i}
                  />
                </div>
              ))}
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
            <div className="text-sm text-[var(--muted)] mt-1">{t.speedLabel}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#2dd4bf]">3x</div>
            <div className="text-sm text-[var(--muted)] mt-1">{t.featuresLabel}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[var(--foreground)]">1-4</div>
            <div className="text-sm text-[var(--muted)] mt-1">{t.mvpLabel}</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-[#22c55e]">36</div>
            <div className="text-sm text-[var(--muted)] mt-1">{t.agentsLabel}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
