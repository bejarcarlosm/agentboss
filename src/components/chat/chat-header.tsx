'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { FactoryAgent } from '@/lib/factory-types';

interface ChatHeaderProps {
  agent: FactoryAgent;
}

export function ChatHeader({ agent }: ChatHeaderProps) {
  return (
    <header className="flex items-center gap-4 px-5 py-4 border-b border-[var(--border)] bg-[var(--background)]">
      <Link
        href="/"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </Link>

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
        <h1 className="text-base font-bold truncate" style={{ color: agent.color }}>
          {agent.name}
        </h1>
        <p className="text-xs text-[var(--muted)] truncate">{agent.role}</p>
      </div>

      {agent.status === 'coming-soon' && (
        <span className="badge badge-warning text-[10px]">Coming Soon</span>
      )}

      {agent.status === 'active' && (
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: agent.color }} />
          <span className="text-xs text-[var(--muted)]">Online</span>
        </div>
      )}
    </header>
  );
}
