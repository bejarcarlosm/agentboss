"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { getAgents, createDemoAgents, updateAgentStatus, deleteAgent } from "@/lib/agents-service"
import { Agent } from "@/lib/types"
import { AgentCard } from "@/components/agent-card"

export default function Home() {
  const router = useRouter()
  const [agents, setAgents] = useState<Agent[]>([])
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('agentboss-user')
    if (!storedUser) {
      router.push('/login')
      return
    }
    const parsed = JSON.parse(storedUser)
    setUser(parsed)

    // Create demo agents if none exist
    createDemoAgents(parsed.id)
    setAgents(getAgents(parsed.id))
  }, [router])

  function handleToggleStatus(id: string) {
    const agent = agents.find(a => a.id === id)
    if (!agent) return
    const newStatus = agent.status === 'active' ? 'paused' : 'active'
    updateAgentStatus(id, newStatus)
    setAgents(getAgents(user?.id))
  }

  function handleDelete(id: string) {
    deleteAgent(id)
    setAgents(getAgents(user?.id))
  }

  function handleLogout() {
    localStorage.removeItem('agentboss-user')
    localStorage.removeItem('agentboss-agents')
    router.push('/login')
  }

  if (!user) return null

  const activeCount = agents.filter(a => a.status === 'active').length

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              Agent<span className="text-[var(--primary)]">Boss</span>
            </h1>
            <p className="text-sm text-[var(--muted)]">
              {activeCount} agentes activos de {agents.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/agents/new" className="btn btn-primary">
              + Crear Agente
            </Link>
            <span className="text-sm text-[var(--muted)]">
              {user.name}
            </span>
            <button onClick={handleLogout} className="btn btn-ghost text-sm">
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Hero / Intro Section */}
      <section className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Crea, entrena y despliega <br />
            <span className="text-[var(--primary)]">agentes de IA</span> para tu negocio
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-8">
            Configura agentes de voz y texto en minutos. Sin codigo. Conecta con tus herramientas y automatiza conversaciones, ventas y soporte 24/7.
          </p>
          <div className="flex justify-center gap-3 mb-12">
            <Link href="/agents/new" className="btn btn-primary">
              Crear Agente
            </Link>
            <a href="#agents" className="btn btn-secondary">
              Ver Agentes
            </a>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--primary)]">5 min</div>
              <div className="text-sm text-[var(--muted)] mt-1">Tiempo de configuracion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--foreground)]">24/7</div>
              <div className="text-sm text-[var(--muted)] mt-1">Disponibilidad</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--success)]">Voz + Chat</div>
              <div className="text-sm text-[var(--muted)] mt-1">Multicanal integrado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="agents" className="max-w-7xl mx-auto px-6 py-10">
        {agents.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🤖</div>
            <h2 className="text-xl font-bold mb-2">No tienes agentes aun</h2>
            <p className="text-[var(--muted)] mb-6">Crea tu primer agente para empezar</p>
            <Link href="/agents/new" className="btn btn-primary">
              + Crear primer agente
            </Link>
          </div>
        ) : (
          <>
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--foreground)]">Tus Agentes</h2>
                <p className="text-sm text-[var(--muted)]">
                  Haz clic en &quot;Hablar&quot; para probar o &quot;Configurar&quot; para editar
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/agents/new" className="btn btn-secondary text-sm">
                  + Nuevo
                </Link>
              </div>
            </div>

            {/* Horizontal scroll carousel */}
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto carousel-scroll pb-4 snap-x snap-mandatory">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onToggleStatus={handleToggleStatus}
                    onDelete={handleDelete}
                  />
                ))}

                {/* "Create new" card */}
                <Link
                  href="/agents/new"
                  className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--secondary)] min-w-[260px] max-w-[290px] min-h-[420px] snap-start flex-shrink-0 transition-all hover:border-[var(--primary)] hover:bg-[#1a1f0a] group"
                >
                  <div className="w-16 h-16 rounded-full bg-[var(--background)] flex items-center justify-center text-3xl mb-4 group-hover:bg-[#252b12] transition-colors">
                    +
                  </div>
                  <span className="text-sm font-semibold text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors">
                    Crear Agente
                  </span>
                </Link>
              </div>

              {/* Fade edges */}
              <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[var(--background)] to-transparent pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[var(--background)] to-transparent pointer-events-none" />
            </div>

            {/* Stats section */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {agents.reduce((sum, a) => sum + (a.stats?.totalConversations || 0), 0)}
                </div>
                <div className="text-sm text-[var(--muted)] mt-1">Total Conversaciones</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold text-[var(--foreground)]">
                  {agents.reduce((sum, a) => sum + (a.stats?.totalMessages || 0), 0)}
                </div>
                <div className="text-sm text-[var(--muted)] mt-1">Total Mensajes</div>
              </div>
              <div className="card">
                <div className="text-3xl font-bold text-[var(--success)]">
                  {activeCount}/{agents.length}
                </div>
                <div className="text-sm text-[var(--muted)] mt-1">Agentes Activos</div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
