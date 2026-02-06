import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Listo para construir?
          </h2>
          <p className="text-lg text-[var(--muted)] mb-3">
            Empieza con un discovery gratuito. Habla con Atlas, nuestro Product Owner IA, y en minutos tendras un primer brief de tu proyecto.
          </p>
          <p className="text-sm text-[var(--muted)] mb-8">
            Sin compromiso · Sin tarjeta de credito · Resultado inmediato
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/chat/product-owner"
              className="btn text-base px-8 py-3.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(45,212,191,0.3)]"
            >
              Iniciar discovery gratis
            </Link>
            <a
              href="mailto:hola@agentboss.cl"
              className="btn btn-secondary text-base px-8 py-3.5"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
