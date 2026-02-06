'use client';

import { getFrontOfficeAgents, getBackOfficeAgents } from '@/lib/factory-service';
import { PipelineStage } from './pipeline-stage';

const STAGES = [
  {
    name: 'Discovery',
    description: 'Entendemos tu negocio, definimos requerimientos y diseñamos la experiencia.',
    color: '#2dd4bf',
    icon: '🔍',
    status: 'active' as const,
    agentFilter: 'front-office' as const,
  },
  {
    name: 'Development',
    description: 'Construimos tu software con el stack mas moderno y eficiente.',
    color: '#06b6d4',
    icon: '⚡',
    status: 'coming-soon' as const,
    agentFilter: 'back-office' as const,
  },
  {
    name: 'Deploy & Monitor',
    description: 'Desplegamos a produccion y monitoreamos 24/7.',
    color: '#f97316',
    icon: '🚀',
    status: 'coming-soon' as const,
    agentFilter: null,
  },
];

export function PipelineFlow() {
  const frontOffice = getFrontOfficeAgents();
  const backOffice = getBackOfficeAgents();

  function getAgentsForStage(filter: 'front-office' | 'back-office' | null) {
    if (filter === 'front-office') return frontOffice;
    if (filter === 'back-office') return backOffice;
    return [];
  }

  return (
    <div className="space-y-8">
      {/* Flow line */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {STAGES.map((stage, i) => (
          <div key={stage.name} className="flex items-center gap-2 flex-shrink-0">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: `${stage.color}20`, color: stage.color }}
            >
              <span>{stage.icon}</span>
              {stage.name}
            </div>
            {i < STAGES.length - 1 && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" className="flex-shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Stage details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STAGES.map(stage => (
          <PipelineStage
            key={stage.name}
            name={stage.name}
            description={stage.description}
            color={stage.color}
            icon={stage.icon}
            agents={getAgentsForStage(stage.agentFilter)}
            status={stage.status}
          />
        ))}
      </div>
    </div>
  );
}
