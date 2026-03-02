'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { submitLeadAction } from '@/app/actions/submit-lead';

interface DiagnosticFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROLE_OPTIONS_ES = [
  'CEO / Fundador',
  'CTO / Tech Lead',
  'Gerente / Director',
  'Emprendedor',
  'Otro',
];

const ROLE_OPTIONS_EN = [
  'CEO / Founder',
  'CTO / Tech Lead',
  'Manager / Director',
  'Entrepreneur',
  'Other',
];

export function DiagnosticFormModal({ isOpen, onClose }: DiagnosticFormModalProps) {
  const locale = useLocale();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const roleOptions = locale === 'es' ? ROLE_OPTIONS_ES : ROLE_OPTIONS_EN;

  const t = locale === 'es' ? {
    title: 'Solicitar Diagnostico',
    subtitle: 'Completá el formulario y te contactamos en menos de 24 horas.',
    fullName: 'Nombre completo',
    whatsapp: 'Numero de WhatsApp',
    whatsappPlaceholder: '+56 9 1234 5678',
    company: 'Nombre de la empresa',
    website: 'Sitio web o redes sociales',
    websitePlaceholder: 'https://... o @usuario',
    description: 'Descripcion del proyecto o idea',
    descriptionPlaceholder: 'Cuéntanos qué necesitas construir, qué problema quieres resolver...',
    role: 'Como te identificas?',
    selectRole: 'Selecciona una opcion',
    submit: 'Enviar solicitud',
    submitting: 'Enviando...',
    successTitle: 'Solicitud enviada!',
    successMessage: 'Te contactaremos en menos de 24 horas por WhatsApp.',
    close: 'Cerrar',
    required: 'Este campo es obligatorio',
    budgetQuestion: 'Los proyectos de software van desde 7.000 a 20.000 USD. ¿Su empresa puede invertir el monto total o prefiere pagos en cuotas?',
    budgetOptions: [
      'Si, mi empresa podria invertir esos valores.',
      'Podria abonar cuotas para el desarrollo.',
      'No puedo invertir en mi proyecto.',
    ],
    selectBudget: 'Selecciona una opcion',
  } : {
    title: 'Request Discovery',
    subtitle: 'Fill out the form and we\'ll contact you within 24 hours.',
    fullName: 'Full name',
    whatsapp: 'WhatsApp number',
    whatsappPlaceholder: '+1 555 123 4567',
    company: 'Company name',
    website: 'Website or social media',
    websitePlaceholder: 'https://... or @username',
    description: 'Project or idea description',
    descriptionPlaceholder: 'Tell us what you need to build, what problem you want to solve...',
    role: 'How do you identify?',
    selectRole: 'Select an option',
    submit: 'Submit request',
    submitting: 'Submitting...',
    successTitle: 'Request sent!',
    successMessage: 'We\'ll contact you within 24 hours via WhatsApp.',
    close: 'Close',
    required: 'This field is required',
    budgetQuestion: 'Software projects range from $7,000 to $20,000 USD. Can your company invest the full amount or do you prefer installments?',
    budgetOptions: [
      'Yes, my company could invest those amounts.',
      'I could pay in installments.',
      'I cannot invest in my project.',
    ],
    selectBudget: 'Select an option',
  };

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const leadData = {
      name: formData.get('full_name') as string,
      phone: formData.get('whatsapp') as string,
      company_name: formData.get('company_name') as string,
      website: (formData.get('website') as string) || null,
      project_description: formData.get('project_description') as string,
      role_type: formData.get('role_type') as string,
      budget_capacity: formData.get('budget_capacity') as string,
      source: 'diagnostic_form',
      agent_slug: 'product-owner',
    };

    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert(leadData);

      if (dbError) throw dbError;

      // Send email notification (fire and forget - don't block UI)
      submitLeadAction(leadData).catch(console.error);

      localStorage.setItem('agentboss_gate_passed', 'true');
      setSubmitted(true);
    } catch {
      setError(locale === 'es'
        ? 'Error al enviar. Intenta de nuevo o escríbenos a hola@agentboss.cl'
        : 'Error submitting. Try again or email us at hola@agentboss.cl');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-[var(--secondary)] transition-colors z-10"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-8">
          {submitted ? (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">{t.successTitle}</h3>
              <p className="text-[var(--muted)] mb-6">{t.successMessage}</p>
              <button
                onClick={onClose}
                className="btn px-6 py-2.5 bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all"
              >
                {t.close}
              </button>
            </div>
          ) : (
            /* Form */
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">{t.title}</h2>
                <p className="text-sm text-[var(--muted)]">{t.subtitle}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium mb-1.5">
                    {t.fullName} *
                  </label>
                  <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-1.5">
                    {t.whatsapp} *
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    required
                    placeholder={t.whatsappPlaceholder}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company_name" className="block text-sm font-medium mb-1.5">
                    {t.company} *
                  </label>
                  <input
                    id="company_name"
                    name="company_name"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  />
                </div>

                {/* Website (optional) */}
                <div>
                  <label htmlFor="website" className="block text-sm font-medium mb-1.5">
                    {t.website}
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    placeholder={t.websitePlaceholder}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  />
                </div>

                {/* Project description */}
                <div>
                  <label htmlFor="project_description" className="block text-sm font-medium mb-1.5">
                    {t.description} *
                  </label>
                  <textarea
                    id="project_description"
                    name="project_description"
                    required
                    rows={3}
                    placeholder={t.descriptionPlaceholder}
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all resize-none"
                  />
                </div>

                {/* Role dropdown */}
                <div>
                  <label htmlFor="role_type" className="block text-sm font-medium mb-1.5">
                    {t.role} *
                  </label>
                  <select
                    id="role_type"
                    name="role_type"
                    required
                    defaultValue=""
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  >
                    <option value="" disabled>{t.selectRole}</option>
                    {roleOptions.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {/* Budget capacity */}
                <div>
                  <label htmlFor="budget_capacity" className="block text-sm font-medium mb-1.5">
                    {t.budgetQuestion} *
                  </label>
                  <select
                    id="budget_capacity"
                    name="budget_capacity"
                    required
                    defaultValue=""
                    className="w-full px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]/50 focus:border-[#2dd4bf] transition-all"
                  >
                    <option value="" disabled>{t.selectBudget}</option>
                    {t.budgetOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-[#2dd4bf] text-[#0a0a0a] font-bold hover:bg-[#5eead4] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.submitting : t.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
