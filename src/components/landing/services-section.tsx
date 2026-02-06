const SERVICES = [
  {
    icon: '🌐',
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas con Next.js, React y TypeScript. Dashboards, plataformas SaaS, portales de clientes.',
  },
  {
    icon: '📱',
    title: 'Apps Moviles',
    description: 'Apps responsive que funcionan en cualquier dispositivo. PWA y aplicaciones nativas con React Native.',
  },
  {
    icon: '🤖',
    title: 'Automatizaciones IA',
    description: 'Chatbots, extraccion de documentos, flujos automatizados. Integramos IA donde mas impacto genera.',
  },
  {
    icon: '🎨',
    title: 'Diseño UX/UI',
    description: 'Interfaces intuitivas y prototipos interactivos. Validamos ideas antes de construir para no desperdiciar recursos.',
  },
  {
    icon: '⚡',
    title: 'MVPs Rapidos',
    description: 'De la idea al producto funcional en semanas. Lanza rapido, valida con usuarios reales e itera.',
  },
  {
    icon: '🔧',
    title: 'Consultoria Tech',
    description: 'Auditoria de codigo, arquitectura de sistemas, optimizacion de procesos. Tu CTO fractional bajo demanda.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Soluciones para tu negocio
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto">
            Todo lo que necesitas para digitalizar y escalar, con la velocidad de una fabrica potenciada por IA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:border-[#2dd4bf]/30 hover:-translate-y-0.5 fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl block mb-4">{service.icon}</span>
              <h3 className="text-lg font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
