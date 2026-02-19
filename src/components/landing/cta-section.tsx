'use client';

import { useDiagnosticModal } from './diagnostic-modal-provider';

export function CtaSection({ locale }: { locale: string }) {
  const { openModal } = useDiagnosticModal();
  const t = locale === 'es'
    ? { heading: 'Listo para construir?', description: 'Empieza con un diagnostico gratuito. Hablemos sobre tu proyecto y en minutos tendras un primer resumen.', subtext: 'Sin compromiso · Sin tarjeta de credito · Resultado inmediato', ctaPrimary: 'Solicitar Diagnostico', ctaSecondary: 'Contactar' }
    : { heading: 'Ready to build?', description: 'Start with a free discovery. Let\'s talk about your project and in minutes you\'ll have a first brief.', subtext: 'No commitment · No credit card · Instant results', ctaPrimary: 'Request Discovery', ctaSecondary: 'Contact us' };

  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.heading}
          </h2>
          <p className="text-lg text-[var(--muted)] mb-3">
            {t.description}
          </p>
          <p className="text-sm text-[var(--muted)] mb-8">
            {t.subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openModal}
              className="btn text-base px-8 py-3.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)]"
            >
              {t.ctaPrimary}
            </button>
            <a
              href="mailto:hola@agentboss.cl"
              className="btn btn-secondary text-base px-8 py-3.5"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
