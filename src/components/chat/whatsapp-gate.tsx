'use client';

import { useState } from 'react';
import type { FactoryAgent } from '@/lib/factory-types';
import { DiagnosticFormModal } from '@/components/landing/diagnostic-form-modal';

interface DiagnosticGateProps {
  agent: FactoryAgent;
}

export function WhatsAppGate({ agent }: DiagnosticGateProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-6">
          <div className="flex flex-col items-center text-center space-y-3">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{ borderColor: agent.color }}
            />
            <div>
              <h2 className="text-lg font-bold" style={{ color: agent.color }}>
                {agent.name}
              </h2>
              <p className="text-sm text-[var(--muted)]">{agent.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-[var(--muted)] leading-relaxed text-center">
              Para probar nuestra tecnología, primero completa el formulario de diagnóstico. Es gratis y sin compromiso.
            </p>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-black font-semibold text-sm transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] bg-[#2dd4bf]"
            >
              Solicita un diagnóstico
            </button>
          </div>
        </div>
      </div>

      <DiagnosticFormModal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          // If they completed the form, reload to pass the gate
          if (localStorage.getItem('agentboss_gate_passed') === 'true') {
            window.location.reload();
          }
        }}
      />
    </div>
  );
}
