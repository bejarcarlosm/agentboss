'use client';

import { useDiagnosticModal } from './diagnostic-modal-provider';

const CONTENT_ES = {
  badge: 'Caso Real',
  heading: 'BKLog: Broker logístico transformado con IA',
  intro: 'Un broker logístico en Chile procesaba documentos manualmente, perdía horas en tareas repetitivas y no podía escalar sin contratar más gente.',
  painPoints: [
    { icon: '📄', title: 'Extracción manual de BLs', description: 'Cada Bill of Lading se revisaba a mano, copiando datos uno por uno al sistema. Errores frecuentes y horas perdidas.' },
    { icon: '🔁', title: 'Procesos repetitivos sin automatizar', description: 'Seguimiento de embarques, notificaciones a clientes y coordinación con navieras: todo manual, todo lento.' },
    { icon: '📈', title: 'Imposible escalar sin más personal', description: 'Cada nuevo cliente significaba más carga operativa. El crecimiento estaba limitado por la capacidad humana.' },
  ],
  solutionHeading: 'La solución',
  solutionText: 'Implementamos un sistema de extracción automática de documentos con IA (Gemini Vision), integración directa con navieras vía API, y flujos automatizados que eliminaron el 80% del trabajo manual. El equipo ahora se enfoca en vender y atender clientes, no en copiar datos.',
  cta: 'Solicita un diagnóstico',
};

const CONTENT_EN = {
  badge: 'Real Case',
  heading: 'BKLog: Logistics broker transformed with AI',
  intro: 'A logistics broker in Chile was processing documents manually, losing hours on repetitive tasks, and unable to scale without hiring more people.',
  painPoints: [
    { icon: '📄', title: 'Manual BL extraction', description: 'Every Bill of Lading was reviewed by hand, copying data one by one into the system. Frequent errors and wasted hours.' },
    { icon: '🔁', title: 'Repetitive processes without automation', description: 'Shipment tracking, client notifications, and carrier coordination: all manual, all slow.' },
    { icon: '📈', title: 'Impossible to scale without more staff', description: 'Every new client meant more operational burden. Growth was limited by human capacity.' },
  ],
  solutionHeading: 'The solution',
  solutionText: 'We implemented an AI-powered document extraction system (Gemini Vision), direct carrier API integration, and automated workflows that eliminated 80% of manual work. The team now focuses on selling and serving clients, not copying data.',
  cta: 'Request a diagnostic',
};

export function CaseStudySection({ locale }: { locale: string }) {
  const { openModal } = useDiagnosticModal();
  const c = locale === 'es' ? CONTENT_ES : CONTENT_EN;

  return (
    <section className="border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/5 text-[#2dd4bf] text-xs font-semibold mb-4">
            {c.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {c.heading}
          </h2>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            {c.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {c.painPoints.map((point) => (
            <div
              key={point.title}
              className="p-6 rounded-2xl border border-red-500/15 bg-red-500/5"
            >
              <span className="text-2xl block mb-3">{point.icon}</span>
              <h3 className="font-bold mb-2 text-red-400">{point.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border border-[#2dd4bf]/20 bg-[#2dd4bf]/5">
          <h3 className="font-bold text-lg text-[#2dd4bf] mb-3">{c.solutionHeading}</h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed">
            {c.solutionText}
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={openModal}
            className="px-6 py-2.5 rounded-full bg-[#2dd4bf] text-black font-semibold text-sm hover:bg-[#2dd4bf]/90 transition-all hover:scale-105"
          >
            {c.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
