'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { FactoryAgent } from '@/lib/factory-types';
import { useVoiceChatStreaming } from '@/hooks/use-voice-chat-streaming';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Mic, ArrowUp, Loader2, ArrowLeft, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Orb = dynamic(
  () => import('@/components/ui/orb').then(mod => ({ default: mod.Orb })),
  { ssr: false }
);

interface VoiceChatInterfaceProps {
  agent: FactoryAgent;
  isLiveMode: boolean;
}

export function VoiceChatInterface({ agent, isLiveMode }: VoiceChatInterfaceProps) {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    state,
    messages,
    currentTranscript,
    pendingTranscription,
    error,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendMessage,
    sendTextMessage,
    confirmSend,
    cancelTranscription,
    isRecording,
    analyser,
    demoTimeoutReached,
    rateLimitReached,
    remainingMessages,
  } = useVoiceChatStreaming(isLiveMode);

  const agentNameMap: Record<string, string> = {
    'product-owner': 'Atlas',
    'ux-designer': 'Venus',
    'black-belt': 'Pluto',
    'developer': 'Earth',
    'infrastructure': 'Uranus',
  };

  // Agent welcome presentations
  const agentWelcome: Record<string, string> = {
    'product-owner': `Hola! Soy Atlas, Product Owner de AgentBoss. Mi trabajo es entender tu negocio y traducir tus ideas en software funcional. Trabajo siempre bajo la supervision del lider de proyecto humano de AgentBoss — el toma las decisiones finales, yo ejecuto.\n\nToca el orbe o escribe para empezar a conversar. Te puedo ayudar con discovery de producto, user stories y planificacion de tu MVP.`,
    'ux-designer': `Hola! Soy Venus, disenadora UX/UI de AgentBoss. Me encargo de que tu producto se vea y se sienta increible para tus usuarios. Todo lo que hago esta supervisado por el lider de proyecto humano de AgentBoss.\n\nToca el orbe o escribe para conversar. Te ayudo con wireframes, flujos de usuario y diseno de interfaces.`,
    'black-belt': `Hola! Soy Pluto, Black Belt de QA en AgentBoss. Mi mision es asegurar que todo funcione perfecto antes de que llegue a tus usuarios. Siempre trabajo bajo la supervision del lider de proyecto humano de AgentBoss.\n\nToca el orbe o escribe para conversar. Puedo ayudarte con estrategia de testing, criterios de calidad y validacion de producto.`,
    'developer': `Hola! Soy Earth, Developer de AgentBoss. Me encargo de construir el codigo que hace realidad las ideas. Trabajo bajo la supervision del lider de proyecto humano de AgentBoss.\n\nToca el orbe o escribe para conversar. Te ayudo con arquitectura, implementacion y decisiones tecnicas.`,
    'infrastructure': `Hola! Soy Uranus, experto en infraestructura de AgentBoss. Me aseguro de que todo funcione en produccion de forma rapida y confiable. Siempre bajo la supervision del lider de proyecto humano de AgentBoss.\n\nToca el orbe o escribe para conversar. Te ayudo con deploy, hosting y escalabilidad.`,
  };

  useEffect(() => {
    const agentName = agentNameMap[agent.slug] || agent.name;
    connect(agentName.toLowerCase());
    return () => { disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.slug]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript, pendingTranscription]);

  const orbState = state === 'processing' ? 'thinking' as const
    : state === 'speaking' ? 'talking' as const
    : isRecording ? 'listening' as const
    : null;

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const rgb = hexToRgb(agent.color);
  const color2 = `#${Math.min(255, rgb.r + 40).toString(16).padStart(2, '0')}${Math.min(255, rgb.g + 40).toString(16).padStart(2, '0')}${Math.min(255, rgb.b + 40).toString(16).padStart(2, '0')}`;

  const isActive = state === 'connected' || state === 'recording' || state === 'processing' || state === 'speaking' || state === 'review' || state === 'transcribing';

  const handleSendText = () => {
    if (textInput.trim() && !rateLimitReached) {
      sendTextMessage(textInput);
      setTextInput('');
    }
  };

  const statusText = rateLimitReached
    ? 'Limite de demo alcanzado'
    : state === 'review'
    ? 'Revisa tu mensaje y envialo'
    : state === 'transcribing'
    ? 'Transcribiendo tu mensaje...'
    : isRecording
    ? 'Escuchando...'
    : state === 'processing'
    ? `${agent.name} esta pensando...`
    : state === 'speaking'
    ? `${agent.name} esta respondiendo...`
    : state === 'connecting'
    ? `Conectando con ${agent.name}...`
    : 'Toca el microfono para hablar';

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-[var(--border)]">
        <button onClick={() => router.back()} className="p-1.5 hover:bg-[var(--foreground)]/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-[var(--muted)]" />
        </button>
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-14 h-14 rounded-full object-cover border-2"
          style={{ borderColor: agent.color }}
        />
        <div className="flex-1">
          <h1 className="font-bold text-lg">{agent.name}</h1>
          <p className="text-sm text-[var(--muted)]">{agent.role}</p>
        </div>
        {!isLiveMode && (
          <div className="text-xs px-2.5 py-1 rounded-full border font-medium" style={{ borderColor: `${agent.color}40`, color: agent.color }}>
            {remainingMessages} msgs
          </div>
        )}
        {isLiveMode && (
          <div className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-medium">
            LIVE
          </div>
        )}
      </div>

      {/* Alerts */}
      {error && (
        <div className="mx-4 mt-3 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
      {rateLimitReached && !error && (
        <div className="mx-4 mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
          <p className="text-amber-400 text-sm font-medium">
            Has alcanzado el limite de la demo. Contactanos en hola@agentboss.cl para acceso completo.
          </p>
        </div>
      )}
      {demoTimeoutReached && state !== 'review' && state !== 'transcribing' && (
        <div className="mx-4 mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
          <p className="text-amber-400 text-sm">Tiempo de grabacion agotado.</p>
        </div>
      )}

      {/* Messages area */}
      {messages.length > 0 && (
        <div className="flex-shrink-0 max-h-[40vh] overflow-y-auto mx-4 mt-3 space-y-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] p-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={cn(
                'max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'text-[var(--text-on-accent)]'
                  : 'bg-[var(--surface-elevated)] text-[var(--foreground)]'
              )} style={msg.role === 'user' ? { background: agent.color } : undefined}>
                {msg.content}
              </div>
            </div>
          ))}
          {/* Show current transcript while recording (not in review) */}
          {currentTranscript && state === 'recording' && (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed text-[var(--foreground)]/70 italic" style={{ background: `${agent.color}80` }}>
                {currentTranscript}...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Pending transcription review */}
      {pendingTranscription && state === 'review' && (
        <div className="mx-4 mt-3 rounded-xl p-4 border-2 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ borderColor: agent.color, background: `${agent.color}10` }}>
          <p className="text-xs font-medium mb-2" style={{ color: agent.color }}>Tu mensaje:</p>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">{pendingTranscription}</p>
        </div>
      )}

      {/* Transcribing indicator */}
      {state === 'transcribing' && (
        <div className="mx-4 mt-3 rounded-xl p-4 border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" style={{ color: agent.color }} />
          <span className="text-sm text-[var(--muted)]">Transcribiendo...</span>
        </div>
      )}

      {/* Agent welcome + Orb area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto px-4">
        {/* Welcome presentation - shown when connected and no messages yet */}
        {messages.length === 0 && state !== 'connecting' && state !== 'recording' && state !== 'transcribing' && agentWelcome[agent.slug] && (
          <div className="max-w-sm w-full rounded-xl p-4 bg-[var(--surface)] border border-[var(--border)]">
            <div className="flex items-start gap-3">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-8 h-8 rounded-full object-cover border flex-shrink-0"
                style={{ borderColor: agent.color }}
              />
              <div>
                <p className="text-xs font-semibold mb-1.5" style={{ color: agent.color }}>{agent.name}</p>
                <p className="text-xs text-[var(--muted)] leading-relaxed whitespace-pre-line">{agentWelcome[agent.slug]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Orb / Waveform */}
        {state === 'connecting' ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: agent.color }} />
            <span className="text-sm text-[var(--muted)]">Conectando con {agent.name}...</span>
          </div>
        ) : isRecording && analyser ? (
          <div className="w-full max-w-md px-8">
            <AudioWaveform analyser={analyser} color={agent.color} />
          </div>
        ) : (
          <div
            className={cn(
              'transition-transform duration-200',
              state === 'connected' && !rateLimitReached && 'cursor-pointer hover:scale-110 active:scale-95'
            )}
            onClick={() => {
              if (state === 'connected' && !rateLimitReached) {
                startRecording();
              }
            }}
          >
            <Orb
              agentState={orbState}
              colors={[agent.color, color2] as [string, string]}
              className="h-40 w-40"
            />
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="mx-4 mb-4 space-y-2">
        {/* Review controls - shown when transcription is ready */}
        {state === 'review' && pendingTranscription && (
          <div className="rounded-xl border-2 p-3 animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ borderColor: agent.color, background: `${agent.color}08` }}>
            <div className="flex items-center gap-2">
              {/* Re-record button */}
              <button
                onClick={() => {
                  cancelTranscription();
                  // Small delay to let state settle, then start recording
                  setTimeout(() => startRecording(), 100);
                }}
                className="p-2.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all flex-shrink-0 flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-xs">Regrabar</span>
              </button>

              {/* Status text */}
              <p className="flex-1 text-xs text-center font-medium" style={{ color: agent.color }}>
                Ahora puedes enviar tu mensaje
              </p>

              {/* Send button - agent color */}
              <button
                onClick={() => confirmSend()}
                className="px-5 py-2.5 rounded-lg text-[var(--text-on-accent)] text-sm font-medium transition-all hover:scale-105 hover:brightness-110 flex-shrink-0 flex items-center gap-1.5"
                style={{ background: agent.color }}
              >
                <ArrowUp className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </div>
        )}

        {/* Recording controls */}
        {state !== 'review' && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5">
            <div className="flex items-center gap-2">
              {/* Mic button */}
              <button
                onClick={() => {
                  if (!isRecording && state === 'connected' && !rateLimitReached) {
                    startRecording();
                  }
                }}
                disabled={isRecording || state === 'processing' || state === 'speaking' || state === 'transcribing' || rateLimitReached || !isActive}
                className={cn(
                  'p-2.5 rounded-lg transition-all flex-shrink-0',
                  isRecording
                    ? 'animate-pulse'
                    : state === 'connected' && !rateLimitReached
                    ? 'text-[var(--text-on-accent)] hover:scale-105'
                    : 'text-[var(--muted)] opacity-50'
                )}
                style={
                  isRecording
                    ? { background: `${agent.color}30`, color: agent.color }
                    : state === 'connected' && !rateLimitReached
                    ? { background: agent.color }
                    : undefined
                }
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Status text */}
              <p className="flex-1 text-xs text-[var(--muted)] text-center">
                {statusText}
              </p>

              {/* Send button while recording - agent color */}
              {isRecording && (
                <button
                  onClick={() => sendMessage()}
                  className="px-4 py-2 rounded-lg text-[var(--text-on-accent)] text-sm font-medium transition-all hover:scale-105 hover:brightness-110 flex-shrink-0 flex items-center gap-1.5"
                  style={{ background: agent.color }}
                >
                  <ArrowUp className="w-4 h-4" />
                  Listo
                </button>
              )}

              {/* Cancel recording */}
              {isRecording && (
                <button
                  onClick={() => stopRecording()}
                  className="p-2.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--foreground)]/10 transition-all flex-shrink-0"
                  title="Cancelar grabacion"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Text input - hidden during review */}
        {state !== 'review' && (
          <div className="rounded-xl border border-[var(--border)] bg-[#0a0a0a] flex items-center gap-2 p-2.5">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendText();
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none"
              disabled={rateLimitReached || !isActive || isRecording || state === 'transcribing'}
            />
            <button
              onClick={handleSendText}
              disabled={!textInput.trim() || rateLimitReached || !isActive || isRecording || state === 'transcribing'}
              className="p-2 rounded-lg text-white disabled:opacity-30 transition-all hover:scale-105 flex-shrink-0"
              style={{ background: agent.color }}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
