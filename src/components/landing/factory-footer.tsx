'use client';

import Link from 'next/link';
import { useDiagnosticModal } from './diagnostic-modal-provider';

export function FactoryFooter({ locale }: { locale: string }) {
  const { openModal } = useDiagnosticModal();
  const t = locale === 'es'
    ? { tagline: 'Fabrica de software potenciada por agentes IA. 3x mas funcionalidades en menos tiempo que una fabrica tradicional.', factory: 'Fabrica', contact: 'Contacto', discovery: 'Solicitar Diagnostico', copyright: 'Fabrica de Software · Santiago, Chile' }
    : { tagline: 'AI-powered software factory. 3x more features in less time than a traditional factory.', factory: 'Factory', contact: 'Contact', discovery: 'Request Discovery', copyright: 'Software Factory · Santiago, Chile' };

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2">
              Agent<span className="text-[#2dd4bf]">Boss</span>
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              {t.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3">{t.factory}</h4>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <button onClick={openModal} className="block hover:text-[#2dd4bf] transition-colors text-left">
                {t.discovery}
              </button>
              <Link href={`/${locale}/pipeline`} className="block hover:text-[#2dd4bf] transition-colors">
                Pipeline
              </Link>
              <Link href={`/${locale}/login`} className="block hover:text-[#2dd4bf] transition-colors">
                Admin
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-3">{t.contact}</h4>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <a href="mailto:hola@agentboss.cl" className="block hover:text-[#2dd4bf] transition-colors">
                hola@agentboss.cl
              </a>
              <p>Santiago, Chile</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
          <p>
            &copy; 2026 AgentBoss
          </p>
          <p className="text-xs">
            {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
