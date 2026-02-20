'use client';

import { useDiagnosticModal } from './diagnostic-modal-provider';

const CONTENT_ES = {
  badge: 'Caso Real',
  heading: 'En AgentBoss no solo desarrollamos software — rediseñamos cómo opera tu negocio.',
  intro: 'Cuando BKLog, un broker logístico, nos pidió un sistema de facturación, podríamos haber entregado un formulario y listo. Pero al entender su operación encontramos algo más profundo: un proceso roto que les costaba plata, tiempo y tranquilidad.',
  painPoints: [
    { icon: '💸', title: 'Plata invisible', description: 'Servicios completados que nunca se facturaron. No por negligencia — por volumen. Cuando manejas cientos de embarques al mes, es imposible rastrear de memoria qué cobraste y qué no. Ingreso ganado que nunca llegó a caja.' },
    { icon: '⏰', title: 'Horas quemadas', description: 'Cada factura requería abrir planillas, buscar datos del BL, copiar cliente, monto, naviera, verificar que no estuviera duplicada. Trabajo manual repetitivo que consumía horas de personas que deberían estar cerrando negocios.' },
    { icon: '😰', title: 'Estrés de auditoría', description: 'Fin de mes llegaba con la pregunta de siempre: "¿estamos al día?" Y nadie podía responder con certeza. La información vivía fragmentada entre planillas, correos y la memoria del equipo.' },
  ],
  solutionHeading: 'La solución',
  solutionText: 'Un sistema que cruza automáticamente operaciones contra facturas emitidas, muestra los pendientes en tiempo real y genera la factura completa con un click. Cero olvidos, cero copiar-pegar, certeza total del estado de cobranza.',
  closing: 'Eso es AgentBoss. No entregamos tecnología por entregarte tecnología. Entendemos tu operación, identificamos dónde duele, y construimos la solución que elimina el problema de raíz. Hoy en logística, mañana en tu industria.',
  cta: 'Solicita un diagnóstico',
};

const CONTENT_EN = {
  badge: 'Real Case',
  heading: 'At AgentBoss we don\'t just build software — we redesign how your business operates.',
  intro: 'When BKLog, a logistics broker, asked us for a billing system, we could have delivered a form and called it done. But by understanding their operation we found something deeper: a broken process costing them money, time, and peace of mind.',
  painPoints: [
    { icon: '💸', title: 'Invisible money', description: 'Completed services that were never invoiced. Not due to negligence — due to volume. When you handle hundreds of shipments per month, it\'s impossible to track from memory what you billed and what you didn\'t. Earned revenue that never reached the register.' },
    { icon: '⏰', title: 'Burned hours', description: 'Every invoice required opening spreadsheets, looking up BL data, copying client, amount, carrier, verifying it wasn\'t duplicated. Repetitive manual work consuming hours from people who should be closing deals.' },
    { icon: '😰', title: 'Audit stress', description: 'End of month arrived with the same question: "are we up to date?" And nobody could answer with certainty. Information lived fragmented across spreadsheets, emails, and the team\'s memory.' },
  ],
  solutionHeading: 'The solution',
  solutionText: 'A system that automatically cross-references operations against issued invoices, shows pending items in real time, and generates the complete invoice with one click. Zero oversights, zero copy-paste, total certainty of billing status.',
  closing: 'That\'s AgentBoss. We don\'t deliver technology for the sake of it. We understand your operation, identify where it hurts, and build the solution that eliminates the problem at its root. Today in logistics, tomorrow in your industry.',
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

        <p className="text-sm text-[var(--muted)] leading-relaxed text-center max-w-3xl mx-auto mt-8 italic">
          {c.closing}
        </p>

        <div className="text-center mt-6">
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
