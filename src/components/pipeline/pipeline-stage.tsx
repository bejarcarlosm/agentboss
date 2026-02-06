'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { FactoryAgent } from '@/lib/factory-types';

interface PipelineStageProps {
  name: string;
  description: string;
  color: string;
  icon: string;
  agents: FactoryAgent[];
  status: 'active' | 'coming-soon';
}

export function PipelineStage({ name, description, color, icon, agents, status }: PipelineStageProps) {
  return (
    <div
      className="rounded-2xl border border-[var(--border)] p-6 transition-all hover:border-opacity-50"
      style={{ background: `${color}05` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h3 className="text-xl font-bold" style={{ color }}>
            {name}
          </h3>
          {status === 'coming-soon' && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--warning)]/10 text-[var(--warning)]">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-[var(--muted)] mb-6">{description}</p>

      <div className="space-y-3">
        {agents.map(agent => (
          <Link
            key={agent.id}
            href={agent.status === 'active' ? `/chat/${agent.slug}` : '#'}
            className={`flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--background)] transition-all ${
              agent.status === 'active' ? 'hover:border-opacity-50 cursor-pointer' : 'opacity-50'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 flex-shrink-0"
              style={{ borderColor: agent.color }}
            >
              <Image
                src={agent.avatar}
                alt={agent.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold" style={{ color: agent.color }}>
                {agent.name}
              </div>
              <div className="text-xs text-[var(--muted)] truncate">{agent.role}</div>
            </div>
            {agent.status === 'active' && (
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: agent.color }} />
                <span className="text-[10px] text-[var(--muted)]">Online</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
