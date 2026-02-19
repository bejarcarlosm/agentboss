'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { FactoryAgent } from '@/lib/factory-types';
import { useVoiceChatStreaming } from '@/hooks/use-voice-chat-streaming';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Mic, ArrowUp, Loader2, ArrowLeft, X } from 'lucide-react';
import { WhatsAppGate } from '@/components/chat/whatsapp-gate';
import { cn } from '@/lib/utils';

const GATE_KEY = 'agentboss_gate_passed';

function isGatePassed(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(GATE_KEY) === 'true';
}

function markGatePassed() {
  localStorage.setItem(GATE_KEY, 'true');
}

const Orb = dynamic(
  () => import('@/components/ui/orb').then(mod => ({ default: mod.Orb })),
  { ssr: false }
);

interface VoiceChatInterfaceProps {
  agent: FactoryAgent;
  isLiveMode: boolean;
}

function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline font-medium hover:opacity-80 break-all">
        {part}
      </a>
    ) : part
  );
}

export function VoiceChatInterface({ agent, isLiveMode }: VoiceChatInterfaceProps) {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WhatsApp gate state
  const [gatePassed, setGatePassed] = useState(() => isGatePassed());

  const {
    state,
    messages,
    currentTranscript,
    error,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendMessage,
    sendTextMessage,
    isRecording,
    analyser,
    readyToSend,
    demoTimeoutReached,
    rateLimitReached,
    remainingMessages,
  } = useVoiceChatStreaming(isLiveMode);

  const handleGateSubmit = () => {
    setGatePassed(true);
    markGatePassed();
  };

  const agentNameMap: Record<string, string> = {
    'product-owner': 'Atlas',
    'ux-designer': 'Venus',
    'black-belt': 'Pluto',
    'developer': 'Earth',
    'infrastructure': 'Uranus',
  };

  const greeting = 'Hola!';

  const agentWelcome: Record<string, string> = {
    'product-owner': `${greeting} Soy Atlas, Product Owner de AgentBoss. Mi trabajo es entender tu negocio y traducir tus ideas en software funcional. Trabajo bajo la supervision del lider de proyecto humano de AgentBoss.\n\nCuentame sobre tu negocio — que problema quieres resolver con tecnologia?`,
    'ux-designer': `${greeting} Soy Venus, disenadora UX/UI de AgentBoss. Me encargo de que tu producto se vea y se sienta increible para tus usuarios.\n\nQue tipo de producto digital necesitas? Ya tienes algo o partimos de cero?`,
    'black-belt': `${greeting} Soy Pluto, Black Belt de QA en AgentBoss. Mi mision es asegurar que todo funcione perfecto antes de que llegue a tus usuarios.\n\nTienes un producto existente que quieres mejorar o es una idea nueva?`,
    'developer': `${greeting} Soy Earth, Developer de AgentBoss. Me encargo de construir el codigo que hace realidad las ideas.\n\nQue tipo de solucion tecnica estas buscando? App, plataforma web, automatizacion?`,
    'infrastructure': `${greeting} Soy Uranus, experto en infraestructura de AgentBoss. Me aseguro de que todo funcione en produccion de forma rapida y confiable.\n\nYa tienes infraestructura montada o necesitas partir de cero?`,
  };

  useEffect(() => {
    if (!gatePassed) return;
    const agentName = agentNameMap[agent.slug] || agent.name;
    connect(agentName.toLowerCase());
    return () => { disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.slug, gatePassed]);

  // Dismiss welcome on first interaction
  useEffect(() => {
    if (isRecording || messages.length > 0) setWelcomeDismissed(true);
  }, [isRecording, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

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

  const isActive = state === 'connected' || state === 'recording' || state === 'processing' || state === 'speaking';

  const handleSendText = () => {
    if (textInput.trim() && !rateLimitReached) {
      sendTextMessage(textInput);
      setTextInput('');
    }
  };

  const statusText = rateLimitReached
    ? 'Limite de demo alcanzado'
    : isRecording
    ? 'Escuchando...'
    : state === 'processing'
    ? `${agent.name} esta pensando...`
    : state === 'speaking'
    ? `${agent.name} esta respondiendo...`
    : state === 'connecting'
    ? `Conectando con ${agent.name}...`
    : 'Toca el microfono para hablar';

  if (!gatePassed) {
    return <WhatsAppGate agent={agent} onSubmit={handleGateSubmit} />;
  }

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
      {demoTimeoutReached && (
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
                {linkifyText(msg.content)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Orb + Waveform + Send button area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto px-4">
        {/* Welcome - shown when no messages */}
        {!welcomeDismissed && messages.length === 0 && state !== 'connecting' && agentWelcome[agent.slug] && (
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

        {state === 'connecting' ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: agent.color }} />
            <span className="text-sm text-[var(--muted)]">Conectando con {agent.name}...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            {/* Send button - appears ABOVE the orb on silence */}
            {isRecording && readyToSend && currentTranscript.trim() && (
              <button
                onClick={() => sendMessage()}
                className="px-6 py-2.5 rounded-full text-[var(--text-on-accent)] text-sm font-semibold transition-all hover:scale-105 hover:brightness-110 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300"
                style={{ background: agent.color, boxShadow: `0 0 20px ${agent.color}40` }}
              >
                <ArrowUp className="w-4 h-4" />
                Enviar
              </button>
            )}

            {/* Orb - always visible, clickable to start recording */}
            <div className="relative">
              {/* Waveform ring around orb when recording */}
              {isRecording && analyser && (
                <div className="absolute -inset-6 z-0">
                  <AudioWaveform analyser={analyser} color={agent.color} />
                </div>
              )}

              <div
                className={cn(
                  'relative z-10 transition-transform duration-200',
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
            </div>

            {/* Real-time transcript below orb */}
            {isRecording && currentTranscript && (
              <div className="max-w-sm text-center animate-in fade-in duration-200">
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  {currentTranscript}
                  {!readyToSend && <span className="animate-pulse">|</span>}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="mx-4 mb-4 space-y-2">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5">
          <div className="flex items-center gap-2">
            {/* Mic button */}
            <button
              onClick={() => {
                if (!isRecording && state === 'connected' && !rateLimitReached) {
                  startRecording();
                }
              }}
              disabled={isRecording || state === 'processing' || state === 'speaking' || rateLimitReached || !isActive}
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

        {/* Text input */}
        {!isRecording && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-2 p-2.5">
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
              disabled={rateLimitReached || !isActive || state === 'processing' || state === 'speaking'}
            />
            <button
              onClick={handleSendText}
              disabled={!textInput.trim() || rateLimitReached || !isActive || state === 'processing' || state === 'speaking'}
              className="p-2 rounded-lg text-[var(--text-on-accent)] disabled:opacity-30 transition-all hover:scale-105 flex-shrink-0"
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
