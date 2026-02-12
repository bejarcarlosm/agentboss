'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export function CtaSection() {
  const locale = useLocale();
  const t = locale === 'es'
    ? { heading: '¿Listo para construir?', description: 'Empieza con un diagnóstico gratuito. Habla con Atlas, nuestro Product Owner IA, y en minutos tendrás un primer resumen de tu proyecto.', subtext: 'Sin compromiso · Sin tarjeta de crédito · Resultado inmediato', ctaPrimary: 'Iniciar diagnóstico gratis', ctaSecondary: 'Contactar' }
    : { heading: 'Ready to build?', description: 'Start with a free discovery. Talk to Atlas, our AI Product Owner, and in minutes you\'ll have a first brief of your project.', subtext: 'No commitment · No credit card · Instant results', ctaPrimary: 'Start free discovery', ctaSecondary: 'Contact us' };

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
            <Link
              href={`/${locale}/chat/product-owner`}
              className="btn text-base px-8 py-3.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)]"
            >
              {t.ctaPrimary}
            </Link>
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
