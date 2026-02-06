'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AgentType, VOICE_PROVIDERS, LLM_PROVIDERS, LANGUAGES, TONES } from '@/lib/types';
import { createAgent } from '@/lib/agents-service';

export default function NewAgentPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'voice' as AgentType,
    // Personality
    systemPrompt: '',
    tone: 'friendly' as const,
    language: 'es',
    // Voice
    voiceProvider: 'nvidia' as const,
    voiceId: 'es-female-1',
    voiceName: 'Maria',
    speed: 1.0,
    pitch: 1.0,
    // LLM
    llmProvider: 'openai' as const,
    llmModel: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 500,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('agentboss-user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!user) return;

    setLoading(true);

    const agent = createAgent({
      userId: user.id,
      name: formData.name,
      description: formData.description,
      type: formData.type,
      personality: {
        systemPrompt: formData.systemPrompt,
        tone: formData.tone,
        language: formData.language,
      },
      voice: formData.type !== 'chat' ? {
        provider: formData.voiceProvider,
        voiceId: formData.voiceId,
        voiceName: formData.voiceName,
        speed: formData.speed,
        pitch: formData.pitch,
      } : undefined,
      llm: {
        provider: formData.llmProvider,
        model: formData.llmModel,
        temperature: formData.temperature,
        maxTokens: formData.maxTokens,
      },
    });

    setTimeout(() => {
      router.push(`/agents/${agent.id}`);
    }, 500);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.length > 0 && formData.description.length > 0;
      case 2:
        return formData.systemPrompt.length > 0;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-[var(--border)] bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="btn btn-ghost text-sm">
              ← Volver
            </Link>
            <h1 className="text-xl font-bold">Crear Agente</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            Paso {step} de 4
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all ${
                s <= step ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="card">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Informacion Basica</h2>
                <p className="text-[var(--muted)]">Define el nombre y proposito de tu agente</p>
              </div>

              <div>
                <label className="label">Nombre del Agente</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="input"
                  placeholder="Ej: Asistente de Ventas"
                />
              </div>

              <div>
                <label className="label">Descripcion</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="input min-h-[100px] resize-none"
                  placeholder="Que hara este agente?"
                />
              </div>

              <div>
                <label className="label">Tipo de Agente</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'voice', name: 'Voz', desc: 'Solo voz' },
                    { id: 'chat', name: 'Chat', desc: 'Solo texto' },
                    { id: 'both', name: 'Ambos', desc: 'Voz y texto' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleChange('type', type.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-center ${
                        formData.type === type.id
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                          : 'border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="font-semibold">{type.name}</div>
                      <div className="text-sm text-[var(--muted)]">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personality */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Personalidad</h2>
                <p className="text-[var(--muted)]">Define como se comportara tu agente</p>
              </div>

              <div>
                <label className="label">Instrucciones del Sistema (System Prompt)</label>
                <textarea
                  value={formData.systemPrompt}
                  onChange={(e) => handleChange('systemPrompt', e.target.value)}
                  className="input min-h-[150px] resize-none font-mono text-sm"
                  placeholder="Eres un asistente amable que ayuda a los clientes con sus consultas..."
                />
                <p className="text-sm text-[var(--muted)] mt-2">
                  Describe en detalle como debe comportarse el agente, que puede hacer y que no.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Tono</label>
                  <select
                    value={formData.tone}
                    onChange={(e) => handleChange('tone', e.target.value)}
                    className="input"
                  >
                    {TONES.map((tone) => (
                      <option key={tone.id} value={tone.id}>
                        {tone.name} - {tone.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Idioma</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="input"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Voice */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Configuracion de Voz</h2>
                <p className="text-[var(--muted)]">Elige la voz de tu agente</p>
              </div>

              {formData.type === 'chat' ? (
                <div className="text-center py-12">
                  <p className="text-[var(--muted)]">
                    Este agente es solo de texto, no necesita configuracion de voz.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="label">Proveedor de Voz</label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(VOICE_PROVIDERS).map(([id, provider]) => (
                        <button
                          key={id}
                          onClick={() => handleChange('voiceProvider', id)}
                          className={`p-4 rounded-lg border-2 transition-all text-left ${
                            formData.voiceProvider === id
                              ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                              : 'border-[var(--border)] hover:border-[var(--muted)]'
                          }`}
                        >
                          <div className="font-semibold">{provider.name}</div>
                          <div className="text-sm text-[var(--muted)]">{provider.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Voz</label>
                      <select
                        value={formData.voiceId}
                        onChange={(e) => {
                          const [id, name] = e.target.value.split('|');
                          handleChange('voiceId', id);
                          handleChange('voiceName', name);
                        }}
                        className="input"
                      >
                        <option value="es-female-1|Maria">Maria (Espanol, Femenina)</option>
                        <option value="es-male-1|Carlos">Carlos (Espanol, Masculino)</option>
                        <option value="es-female-2|Sofia">Sofia (Espanol, Femenina)</option>
                        <option value="en-female-1|Sarah">Sarah (English, Female)</option>
                        <option value="en-male-1|James">James (English, Male)</option>
                      </select>
                    </div>

                    <div>
                      <label className="label">Velocidad: {formData.speed}x</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={formData.speed}
                        onChange={(e) => handleChange('speed', parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Voice Preview */}
                  <div className="flex items-center gap-4 p-4 bg-[var(--background)] rounded-lg">
                    <div className="voice-orb w-16 h-16" />
                    <div className="flex-1">
                      <div className="font-semibold">{formData.voiceName}</div>
                      <div className="text-sm text-[var(--muted)]">
                        {VOICE_PROVIDERS[formData.voiceProvider].name} - {formData.speed}x velocidad
                      </div>
                    </div>
                    <button className="btn btn-secondary">
                      Escuchar preview
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 4: LLM */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Modelo de IA</h2>
                <p className="text-[var(--muted)]">Configura el cerebro de tu agente</p>
              </div>

              <div>
                <label className="label">Proveedor</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(LLM_PROVIDERS).map(([id, provider]) => (
                    <button
                      key={id}
                      onClick={() => {
                        handleChange('llmProvider', id);
                        handleChange('llmModel', provider.models[0]);
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        formData.llmProvider === id
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                          : 'border-[var(--border)] hover:border-[var(--muted)]'
                      }`}
                    >
                      <div className="font-semibold">{provider.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Modelo</label>
                <select
                  value={formData.llmModel}
                  onChange={(e) => handleChange('llmModel', e.target.value)}
                  className="input"
                >
                  {LLM_PROVIDERS[formData.llmProvider].models.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Temperatura: {formData.temperature}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Menor = mas preciso, Mayor = mas creativo
                  </p>
                </div>

                <div>
                  <label className="label">Max Tokens: {formData.maxTokens}</label>
                  <input
                    type="range"
                    min="100"
                    max="2000"
                    step="100"
                    value={formData.maxTokens}
                    onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Longitud maxima de respuesta
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 bg-[var(--background)] rounded-lg border border-[var(--border-accent)]">
                <h3 className="font-semibold mb-3 text-[var(--primary)]">Resumen del Agente</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-[var(--muted)]">Nombre:</span> {formData.name}</div>
                  <div><span className="text-[var(--muted)]">Tipo:</span> {formData.type}</div>
                  <div><span className="text-[var(--muted)]">Voz:</span> {formData.voiceName}</div>
                  <div><span className="text-[var(--muted)]">Modelo:</span> {formData.llmModel}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6 mt-6 border-t border-[var(--border)]">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className="btn btn-secondary"
              disabled={step === 1}
            >
              ← Anterior
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="btn btn-primary"
                disabled={!isStepValid()}
              >
                Siguiente →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Agente'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
