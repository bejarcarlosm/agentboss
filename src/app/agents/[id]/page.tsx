'use client';

import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Agent, VOICE_PROVIDERS, LLM_PROVIDERS, TONES, LANGUAGES } from '@/lib/types';
import { getAgentById, updateAgent, updateAgentStatus } from '@/lib/agents-service';
import { DynamicOrb } from '@/components/ui/dynamic-orb';

export default function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'test' ? 'test' : 'config';
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'test' | 'embed'>(initialTab);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const foundAgent = getAgentById(id);
    if (!foundAgent) {
      router.push('/');
      return;
    }
    setAgent(foundAgent);
    setLoading(false);
  }, [id, router]);

  const handleUpdate = (field: string, value: unknown) => {
    if (!agent) return;

    const updatedAgent = updateAgent(agent.id, {
      [field]: value,
    });

    if (updatedAgent) {
      setAgent(updatedAgent);
    }
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 500);
  };

  const handleStatusToggle = () => {
    if (!agent) return;
    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    const updated = updateAgentStatus(agent.id, newStatus);
    if (updated) setAgent(updated);
  };

  if (loading || !agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="voice-orb animate-pulse-glow" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="btn btn-ghost text-sm">
              ← Volver
            </Link>
            <div>
              <h1 className="text-xl font-bold">
                {agent.name}
              </h1>
              <span className={`badge ${
                agent.status === 'active' ? 'badge-success' :
                agent.status === 'paused' ? 'badge-warning' : 'badge-primary'
              }`}>
                {agent.status === 'active' ? 'Activo' :
                 agent.status === 'paused' ? 'Pausado' : 'Borrador'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStatusToggle}
              className={`btn ${agent.status === 'active' ? 'btn-secondary' : 'btn-primary'}`}
            >
              {agent.status === 'active' ? 'Pausar' : 'Activar'}
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: 'config', label: 'Configuracion' },
              { id: 'test', label: 'Probar' },
              { id: 'embed', label: 'Integrar' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-3 font-medium transition-all border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[var(--primary)] text-[var(--primary)]'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Config Tab */}
        {activeTab === 'config' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Informacion Basica</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">Nombre</label>
                  <input
                    type="text"
                    value={agent.name}
                    onChange={(e) => handleUpdate('name', e.target.value)}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Descripcion</label>
                  <textarea
                    value={agent.description}
                    onChange={(e) => handleUpdate('description', e.target.value)}
                    className="input min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Personality */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Personalidad</h3>
              <div className="space-y-4">
                <div>
                  <label className="label">System Prompt</label>
                  <textarea
                    value={agent.personality.systemPrompt}
                    onChange={(e) => handleUpdate('personality', { ...agent.personality, systemPrompt: e.target.value })}
                    className="input min-h-[120px] resize-none font-mono text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Tono</label>
                    <select
                      value={agent.personality.tone}
                      onChange={(e) => handleUpdate('personality', { ...agent.personality, tone: e.target.value })}
                      className="input"
                    >
                      {TONES.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Idioma</label>
                    <select
                      value={agent.personality.language}
                      onChange={(e) => handleUpdate('personality', { ...agent.personality, language: e.target.value })}
                      className="input"
                    >
                      {LANGUAGES.map((l) => (
                        <option key={l.code} value={l.code}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice */}
            {agent.voice && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Voz</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-[var(--background)] rounded-lg">
                    <div className="voice-orb w-12 h-12" />
                    <div className="flex-1">
                      <div className="font-semibold">{agent.voice.voiceName}</div>
                      <div className="text-sm text-[var(--muted)]">
                        {VOICE_PROVIDERS[agent.voice.provider]?.name ?? agent.voice.provider}
                      </div>
                    </div>
                    <button className="btn btn-secondary text-sm">
                      Preview
                    </button>
                  </div>
                  <div>
                    <label className="label">Velocidad: {agent.voice.speed}x</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={agent.voice.speed}
                      onChange={(e) => handleUpdate('voice', { ...agent.voice, speed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LLM */}
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Modelo de IA</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Proveedor</label>
                    <select
                      value={agent.llm.provider}
                      onChange={(e) => handleUpdate('llm', { ...agent.llm, provider: e.target.value })}
                      className="input"
                    >
                      {Object.entries(LLM_PROVIDERS).map(([id, p]) => (
                        <option key={id} value={id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label">Modelo</label>
                    <select
                      value={agent.llm.model}
                      onChange={(e) => handleUpdate('llm', { ...agent.llm, model: e.target.value })}
                      className="input"
                    >
                      {LLM_PROVIDERS[agent.llm.provider]?.models.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Temperatura: {agent.llm.temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={agent.llm.temperature}
                    onChange={(e) => handleUpdate('llm', { ...agent.llm, temperature: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Tab - Atlas-style voice chat */}
        {activeTab === 'test' && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Landing card - before connecting */}
            {!isListening && (
              <div className="rounded-2xl border border-[#1a3a3a] bg-[var(--secondary)] p-8 text-center">
                {/* Avatar with teal ring */}
                <div className="relative w-28 h-28 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#2dd4bf]" />
                  {agent.avatar ? (
                    <Image
                      src={agent.avatar}
                      alt={agent.name}
                      fill
                      className="rounded-full object-cover p-1"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center text-4xl">
                      🤖
                    </div>
                  )}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#2dd4bf] text-[#0a0a0a] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Demo
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-3">
                  Conecta con {agent.name}, uno de los agentes inteligentes de{' '}
                  <span className="text-[var(--primary)]">AgentBoss</span>.
                </h2>
                <p className="text-[var(--muted)] mb-8 max-w-md mx-auto">
                  {agent.description}
                </p>

                {/* Sound wave visualization */}
                <div className="flex items-center justify-center gap-[3px] h-6 mb-6">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-[#2dd4bf]/40"
                      style={{
                        height: `${4 + Math.random() * 16}px`,
                      }}
                    />
                  ))}
                </div>

                {/* Input preview */}
                <div className="flex items-center gap-3 border border-[var(--border)] rounded-xl px-4 py-3 mb-6 bg-[var(--background)]">
                  <span className="text-[var(--muted)] text-sm flex-1 text-left">
                    Preguntame sobre {agent.role?.toLowerCase() || 'lo que necesites'}...
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#2dd4bf] flex-shrink-0">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" fill="currentColor"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>

                {/* Connect button */}
                <button
                  onClick={() => setIsListening(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2dd4bf] text-[#0a0a0a] font-bold text-sm hover:bg-[#5eead4] transition-all hover:shadow-lg hover:shadow-[#2dd4bf]/20"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" fill="currentColor"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Conectar con {agent.name}
                </button>
              </div>
            )}

            {/* Chat modal - after connecting */}
            {isListening && (
              <div className="rounded-2xl border border-[#2dd4bf]/30 bg-[var(--secondary)] shadow-[0_0_30px_rgba(45,212,191,0.08)] overflow-hidden">
                {/* Header with avatar */}
                <div className="flex items-center gap-4 p-5 border-b border-[var(--border)]">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border-2 border-[#2dd4bf]" />
                    {agent.avatar ? (
                      <Image
                        src={agent.avatar}
                        alt={agent.name}
                        fill
                        className="rounded-full object-cover p-0.5"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-[var(--background)] flex items-center justify-center text-2xl">
                        🤖
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{agent.name}</h3>
                    <p className="text-sm text-[var(--muted)]">{agent.role}</p>
                  </div>
                  <button
                    onClick={() => setIsListening(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Chat area */}
                <div className="p-5 min-h-[200px] space-y-4">
                  {/* Agent greeting */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#2dd4bf]/20 flex items-center justify-center text-xs flex-shrink-0">
                      🤖
                    </div>
                    <div className="bg-[var(--background)] rounded-xl rounded-tl-none px-4 py-3 text-sm max-w-[80%]">
                      Hola! Soy {agent.name}. {agent.description} En que puedo ayudarte?
                    </div>
                  </div>
                </div>

                {/* Input area */}
                <div className="p-4 border-t border-[var(--border)]">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 border border-[var(--border)] rounded-xl bg-[var(--background)] px-4 py-3">
                      <textarea
                        placeholder="Escribe tu email, nombre o mensaje..."
                        className="w-full bg-transparent text-sm resize-none outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]"
                        rows={2}
                      />
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-[#2dd4bf] flex items-center justify-center text-[#0a0a0a] hover:bg-[#5eead4] transition-colors flex-shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 19V5m0 0l-7 7m7-7l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>

                  {/* Mic bar */}
                  <div className="flex items-center gap-3 mt-3">
                    <button className="w-8 h-8 rounded-lg bg-[#2dd4bf]/20 flex items-center justify-center text-[#2dd4bf] hover:bg-[#2dd4bf]/30 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z"/>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                        <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <span className="text-xs text-[var(--muted)]">
                      Habla tu mensaje y haz click en enviar cuando termines
                    </span>
                  </div>
                </div>

                {/* Sound wave footer */}
                <div className="flex items-center justify-center gap-[2px] h-8 px-5 pb-4">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full bg-[#2dd4bf] sound-wave"
                      style={{
                        animationDelay: `${i * 0.05}s`,
                        height: '4px',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Embed Tab */}
        {activeTab === 'embed' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Widget para tu sitio web</h3>
              <p className="text-[var(--muted)] mb-4">
                Copia este codigo y pegalo antes de la etiqueta &lt;/body&gt; de tu sitio.
              </p>
              <div className="bg-[var(--background)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code className="text-[var(--primary)]">
{`<script src="https://agentboss.cl/widget.js"></script>
<script>
  AgentBoss.init({
    agentId: "${agent.id}",
    position: "bottom-right",
    theme: "dark"
  });
</script>`}
                </code>
              </div>
              <button className="btn btn-secondary mt-4">
                Copiar codigo
              </button>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">API Endpoint</h3>
              <p className="text-[var(--muted)] mb-4">
                Usa esta URL para integrar el agente via API.
              </p>
              <div className="bg-[var(--background)] p-4 rounded-lg font-mono text-sm">
                <code className="text-[var(--primary)]">
                  POST https://api.agentboss.cl/v1/agents/{agent.id}/chat
                </code>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Estadisticas</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-[var(--primary)]">
                    {agent.stats.totalConversations}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Conversaciones</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {agent.stats.totalMessages}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Mensajes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[var(--success)]">
                    {agent.stats.avgResponseTime}s
                  </div>
                  <div className="text-sm text-[var(--muted)]">Tiempo resp.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
