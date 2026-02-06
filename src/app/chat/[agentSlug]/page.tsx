'use client';

import { use } from 'react';
import Link from 'next/link';
import { getFactoryAgent } from '@/lib/factory-service';
import { ChatInterface } from '@/components/chat/chat-interface';

export default function ChatPage({ params }: { params: Promise<{ agentSlug: string }> }) {
  const { agentSlug } = use(params);
  const agent = getFactoryAgent(agentSlug);

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h1 className="text-xl font-bold mb-2">Agente no encontrado</h1>
          <p className="text-[var(--muted)] mb-6">El agente &quot;{agentSlug}&quot; no existe en la fabrica.</p>
          <Link href="/" className="btn btn-primary">
            Volver a la fabrica
          </Link>
        </div>
      </div>
    );
  }

  return <ChatInterface agent={agent} />;
}
