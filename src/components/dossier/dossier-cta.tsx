'use client';

import Link from 'next/link';
import type { DossierAgent } from '@/lib/dossier-data';

interface DossierCtaProps {
  agent: DossierAgent;
  locale: string;
}

export function DossierCta({ agent, locale }: DossierCtaProps) {
  const isEn = locale === 'en';

  if (agent.chatSlug) {
    return (
      <Link
        href={`/${locale}/chat/${agent.chatSlug}`}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-[var(--text-on-accent)] transition-all hover:-translate-y-0.5"
        style={{ background: agent.color }}
      >
        {isEn ? `Talk to ${agent.codename}` : `Hablar con ${agent.codename}`}
        <span>→</span>
      </Link>
    );
  }

  return (
    <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
      <p className="text-sm text-amber-300 mb-3">
        {isEn
          ? `To try our technology, request a diagnostic first.`
          : `Para probar nuestra tecnología, solicita un diagnóstico primero.`}
      </p>
      <Link
        href={`/${locale}/#team`}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2dd4bf] text-black font-bold text-sm hover:bg-[#5eead4] transition-all"
      >
        {isEn ? 'Request a diagnostic' : 'Solicita un diagnóstico'}
        <span>→</span>
      </Link>
    </div>
  );
}
