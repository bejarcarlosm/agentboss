'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { FactoryAgent } from '@/lib/factory-types';
import { useVoiceChatStreaming } from '@/hooks/use-voice-chat-streaming';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Mic, Keyboard, ChevronDown, ArrowUp, Loader2, ArrowLeft } from 'lucide-react';
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
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [textInput, setTextInput] = useState('');

  const {
    state,
    messages,
    currentTranscript,
    error,
    connect,
    disconnect,
    startRecording,
    sendMessage,
    sendTextMessage,
    isRecording,
    analyser,
    demoTimeoutReached,
    rateLimitReached,
    remainingMessages,
  } = useVoiceChatStreaming(isLiveMode);

  // Map agent slug to agent name for backend
  const agentNameMap: Record<string, string> = {
    'product-owner': 'Atlas',
    'ux-designer': 'Venus',
    'black-belt': 'Pluto',
    'developer': 'Earth',
    'infrastructure': 'Uranus',
  };

  useEffect(() => {
    const agentName = agentNameMap[agent.slug] || agent.name;
    connect(agentName.toLowerCase());
    return () => { disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.slug]);

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

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
        <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-[var(--muted)]" />
        </button>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ background: `${agent.color}20`, color: agent.color }}
        >
          {agent.avatar.includes('/') ? agent.name[0] : agent.avatar}
        </div>
        <div className="flex-1">
          <h1 className="font-semibold text-sm">{agent.name}</h1>
          <p className="text-xs text-[var(--muted)]">{agent.role}</p>
        </div>
        {!isLiveMode && (
          <div className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-400">
            {remainingMessages} msgs restantes
          </div>
        )}
        {isLiveMode && (
          <div className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">
            LIVE
          </div>
        )}
      </div>

      {/* Connection State */}
      {state === 'connecting' && (
        <div className="flex items-center justify-center gap-3 p-6">
          <Loader2 className="h-5 w-5 animate-spin" style={{ color: agent.color }} />
          <span className="text-[var(--muted)]">Conectando con {agent.name}...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-4 mt-4 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-center">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Rate Limit */}
      {rateLimitReached && (
        <div className="mx-4 mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 text-center">
          <p className="text-amber-400 text-sm font-medium">
            Has alcanzado el limite de la demo. Contactanos en hola@agentboss.cl para acceso completo.
          </p>
        </div>
      )}

      {/* Demo Timeout */}
      {demoTimeoutReached && (
        <div className="mx-4 mt-4 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4 text-center">
          <p className="text-amber-400 text-sm">Tiempo de grabacion agotado. Presiona el microfono para grabar de nuevo.</p>
        </div>
      )}

      {/* Main Content */}
      {(state === 'connected' || state === 'recording' || state === 'processing' || state === 'speaking') && (
        <div className="flex-1 flex flex-col">
          {/* Live Transcript */}
          {currentTranscript && (
            <div className="mx-4 mt-4 rounded-lg p-3 border" style={{ borderColor: `${agent.color}30`, background: `${agent.color}08` }}>
              <p className="text-xs font-medium mb-1" style={{ color: agent.color }}>Transcripcion en vivo</p>
              <p className="text-sm text-[var(--foreground)]">{currentTranscript}</p>
              {isRecording && (
                <button
                  onClick={sendMessage}
                  className="mt-2 text-xs px-3 py-1.5 rounded-md text-white transition-transform hover:scale-105"
                  style={{ background: agent.color }}
                >
                  <ArrowUp className="w-3 h-3 inline mr-1" />
                  Enviar mensaje
                </button>
              )}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && (
            <div className="mx-4 mt-4 max-h-48 overflow-y-auto rounded-lg bg-[#0a0a0a] p-3 space-y-2 border border-[var(--border)]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={cn(
                    'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                    msg.role === 'user'
                      ? 'text-white'
                      : 'bg-[#1a1a1a] text-[var(--foreground)]'
                  )} style={msg.role === 'user' ? { background: agent.color } : undefined}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Orb / Waveform */}
          <div className="flex-1 flex items-center justify-center">
            {isRecording && analyser ? (
              <div className="w-full max-w-md px-8">
                <AudioWaveform analyser={analyser} color={agent.color} />
              </div>
            ) : (
              <div
                className={cn(
                  'transition-transform duration-200',
                  state === 'connected' && !isRecording && 'cursor-pointer hover:scale-110 active:scale-95'
                )}
                onClick={() => {
                  if (state === 'connected' && !isRecording && !rateLimitReached) {
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

          {/* Input Bar */}
          <div className="mx-4 mb-4 rounded-xl border border-[var(--border)] bg-[#0a0a0a] overflow-hidden">
            {/* Text Input (collapsible) */}
            <div className={cn(
              'overflow-hidden transition-all duration-300',
              keyboardOpen ? 'max-h-[120px]' : 'max-h-0'
            )}>
              <div className="flex gap-2 p-3">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (textInput.trim()) {
                        sendTextMessage(textInput);
                        setTextInput('');
                      }
                    }
                  }}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 min-h-[80px] resize-none bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none"
                  disabled={rateLimitReached || (state !== 'connected' && state !== 'recording')}
                />
                <button
                  onClick={() => {
                    if (textInput.trim()) {
                      sendTextMessage(textInput);
                      setTextInput('');
                    }
                  }}
                  disabled={!textInput.trim() || rateLimitReached}
                  className="self-end p-2 rounded-lg text-white disabled:opacity-30 transition-all hover:scale-105"
                  style={{ background: agent.color }}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {keyboardOpen && <div className="border-t border-[var(--border)]" />}

            {/* Controls */}
            <div className="flex items-center justify-between gap-2 p-3">
              {/* Mic Button */}
              <button
                onClick={startRecording}
                disabled={state === 'processing' || state === 'speaking' || isRecording || rateLimitReached}
                className={cn(
                  'p-2.5 rounded-lg transition-all',
                  isRecording && 'bg-red-500/20 text-red-400',
                  !isRecording && state === 'connected' && !rateLimitReached && 'text-white hover:scale-105'
                )}
                style={!isRecording && state === 'connected' && !rateLimitReached ? { background: agent.color } : undefined}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* Keyboard Toggle */}
              <button
                onClick={() => setKeyboardOpen(v => !v)}
                className="p-2.5 rounded-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-all relative"
                disabled={state !== 'connected' && state !== 'recording'}
              >
                <Keyboard className={cn(
                  'w-5 h-5 transition-all duration-200',
                  keyboardOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                )} />
                <ChevronDown className={cn(
                  'w-5 h-5 absolute inset-0 m-auto transition-all duration-200',
                  keyboardOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                )} />
              </button>

              {/* Status */}
              <div
                className={cn(
                  'flex-1 text-center',
                  !isRecording && !keyboardOpen && state === 'connected' && !rateLimitReached && 'cursor-pointer'
                )}
                onClick={() => {
                  if (!isRecording && !keyboardOpen && state === 'connected' && !rateLimitReached) {
                    startRecording();
                  }
                }}
              >
                <p className="text-xs text-[var(--muted)]">
                  {rateLimitReached
                    ? 'Limite de demo alcanzado'
                    : isRecording
                    ? 'Hablando... click "Enviar mensaje" cuando termines'
                    : state === 'processing'
                    ? 'Procesando...'
                    : state === 'speaking'
                    ? `${agent.name} esta respondiendo...`
                    : keyboardOpen
                    ? 'Escribe tu mensaje'
                    : 'Toca el microfono o el orbe para hablar'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
