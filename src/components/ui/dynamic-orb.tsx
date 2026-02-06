'use client';

import dynamic from 'next/dynamic';
import type { AgentState } from './orb';

const Orb = dynamic(
  () => import('./orb').then((mod) => ({ default: mod.Orb })),
  {
    ssr: false,
    loading: () => <div className="voice-orb w-full h-full" />,
  }
);

type DynamicOrbProps = {
  agentState?: AgentState;
  className?: string;
  colors?: [string, string];
};

export function DynamicOrb({
  agentState = null,
  className,
  colors,
}: DynamicOrbProps) {
  return (
    <Orb
      agentState={agentState}
      className={className}
      colors={colors}
    />
  );
}
