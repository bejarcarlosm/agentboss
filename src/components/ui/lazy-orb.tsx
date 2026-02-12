'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { AgentState } from './orb';

const Orb = dynamic(
  () => import('./orb').then((mod) => ({ default: mod.Orb })),
  { ssr: false, loading: () => null }
);

type LazyOrbProps = {
  agentState?: AgentState;
  className?: string;
  colors?: [string, string];
  delay?: number;
};

export function LazyOrb({
  agentState = null,
  className,
  colors = ['#2dd4bf', '#0f766e'],
  delay = 2000,
}: LazyOrbProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  return (
    <div className={className ?? 'relative h-full w-full'}>
      {/* CSS placeholder glow - always visible, fades out when orb loads */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-1000 ${ready ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: `radial-gradient(circle, ${colors[0]}40 0%, ${colors[1]}20 50%, transparent 70%)`,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      {/* Real orb - loads after delay */}
      {ready && (
        <div className="animate-fade-in">
          <Orb agentState={agentState} className="h-full w-full" colors={colors} />
        </div>
      )}
    </div>
  );
}
