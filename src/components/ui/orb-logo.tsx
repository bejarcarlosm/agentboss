'use client';

import dynamic from 'next/dynamic';

const Orb = dynamic(
  () => import('@/components/ui/orb').then(mod => ({ default: mod.Orb })),
  { ssr: false, loading: () => <div className="w-8 h-8 rounded-full bg-[#2dd4bf]/20" /> }
);

export function OrbLogo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size }} className="flex-shrink-0">
      <Orb
        colors={['#2dd4bf', '#06b6d4']}
        seed={42}
        agentState={null}
        className="h-full w-full"
      />
    </div>
  );
}
