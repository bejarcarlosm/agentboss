'use client';

import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
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

        {/* Test Tab */}
        {activeTab === 'test' && (
          <div className="max-w-2xl mx-auto">
            <div className="card text-center py-12">
              <div
                className="w-[180px] h-[180px] mx-auto mb-6 cursor-pointer"
                onClick={() => setIsListening(!isListening)}
              >
                <DynamicOrb
                  agentState={isListening ? 'listening' : null}
                  colors={["#c8e64c", "#4a5520"]}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {isListening ? 'Escuchando...' : 'Habla con tu agente'}
              </h2>
              <p className="text-[var(--muted)] mb-6">
                {isListening
                  ? 'Di algo y el agente te respondera'
                  : 'Haz clic en el orbe para comenzar'
                }
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsListening(!isListening)}
                  className={`btn ${isListening ? 'btn-secondary' : 'btn-primary'}`}
                >
                  {isListening ? 'Detener' : 'Iniciar conversacion'}
                </button>
              </div>

              {/* Demo conversation */}
              <div className="mt-8 text-left space-y-3">
                <div className="p-3 bg-[var(--background)] rounded-lg">
                  <div className="text-xs text-[var(--muted)] mb-1">Tu</div>
                  <div>Hola, como estas?</div>
                </div>
                <div className="p-3 bg-[var(--primary)]/10 rounded-lg border border-[var(--border-accent)]">
                  <div className="text-xs text-[var(--primary)] mb-1">{agent.name}</div>
                  <div>Hola! Estoy muy bien, gracias por preguntar. En que puedo ayudarte hoy?</div>
                </div>
              </div>
            </div>
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
