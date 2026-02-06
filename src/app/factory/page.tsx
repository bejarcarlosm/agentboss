'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAllAgents } from '@/lib/factory-service';

export default function FactoryDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const agents = getAllAgents();

  useEffect(() => {
    const storedUser = localStorage.getItem('agentboss-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('agentboss-user');
    router.push('/login');
  }

  if (!user) return null;

  const activeAgents = agents.filter(a => a.status === 'active');
  const comingSoonAgents = agents.filter(a => a.status === 'coming-soon');

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/" className="text-lg font-bold">
              Agent<span className="text-[#2dd4bf]">Boss</span>
            </Link>
            <span className="text-xs text-[var(--muted)] ml-2">Factory Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--muted)]">{user.name}</span>
            <button onClick={handleLogout} className="btn btn-ghost text-sm">
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Factory Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="card">
            <div className="text-3xl font-bold text-[#2dd4bf]">{agents.length}</div>
            <div className="text-sm text-[var(--muted)] mt-1">Total Agentes</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-[#22c55e]">{activeAgents.length}</div>
            <div className="text-sm text-[var(--muted)] mt-1">Activos</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-[var(--warning)]">{comingSoonAgents.length}</div>
            <div className="text-sm text-[var(--muted)] mt-1">Coming Soon</div>
          </div>
          <div className="card">
            <div className="text-3xl font-bold text-[#a855f7]">3</div>
            <div className="text-sm text-[var(--muted)] mt-1">Fases Pipeline</div>
          </div>
        </div>

        {/* Agents Table */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Agentes de la Fabrica</h2>
        </div>

        <div className="space-y-3">
          {agents.map(agent => (
            <div
              key={agent.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--secondary)] transition-all hover:border-opacity-50"
            >
              <div
                className="w-12 h-12 rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: agent.color }}
              >
                <Image
                  src={agent.avatar}
                  alt={agent.name}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ color: agent.color }}>
                    {agent.name}
                  </span>
                  <span className="text-xs text-[var(--muted)]">— {agent.role}</span>
                </div>
                <p className="text-sm text-[var(--muted)] truncate">{agent.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`badge text-[10px] ${
                    agent.status === 'active' ? 'badge-success' : 'badge-warning'
                  }`}
                >
                  {agent.status === 'active' ? 'Activo' : 'Coming Soon'}
                </span>
                <span className="badge badge-primary text-[10px]">
                  {agent.category === 'front-office' ? 'Front-Office' : 'Back-Office'}
                </span>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                {agent.status === 'active' && (
                  <Link
                    href={`/chat/${agent.slug}`}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                    style={{ background: `${agent.color}20`, color: agent.color }}
                  >
                    Chat
                  </Link>
                )}
                <Link
                  href={`/agents/${agent.id}`}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--background)] text-[var(--muted)] border border-[var(--border)] hover:text-[var(--foreground)] transition-colors"
                >
                  Config
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/"
            className="card text-center hover:border-[#2dd4bf] transition-colors"
          >
            <div className="text-2xl mb-2">🏠</div>
            <div className="font-bold">Landing Publica</div>
            <div className="text-xs text-[var(--muted)]">Ver como se ve para clientes</div>
          </Link>
          <Link
            href="/pipeline"
            className="card text-center hover:border-[#2dd4bf] transition-colors"
          >
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-bold">Pipeline</div>
            <div className="text-xs text-[var(--muted)]">Ver flujo completo</div>
          </Link>
          <Link
            href="/chat/product-owner"
            className="card text-center hover:border-[#2dd4bf] transition-colors"
          >
            <div className="text-2xl mb-2">💬</div>
            <div className="font-bold">Test Chat</div>
            <div className="text-xs text-[var(--muted)]">Probar conversacion con Atlas</div>
          </Link>
        </div>
      </main>
    </div>
  );
}
