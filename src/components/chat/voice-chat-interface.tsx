'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import type { FactoryAgent } from '@/lib/factory-types';
import { useVoiceChatStreaming } from '@/hooks/use-voice-chat-streaming';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Mic, MicOff, Keyboard, ArrowUp, Loader2, ArrowLeft, X } from 'lucide-react';
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
    error,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendMessage,
    sendTextMessage,
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

  useEffect(() => {
    const agentName = agentNameMap[agent.slug] || agent.name;
    connect(agentName.toLowerCase());
    return () => { disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.slug]);

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
    ? 'Escuchando... toca para enviar'
    : state === 'processing'
    ? `${agent.name} esta pensando...`
    : state === 'speaking'
    ? `${agent.name} esta respondiendo...`
    : state === 'connecting'
    ? `Conectando con ${agent.name}...`
    : 'Click para empezar a hablar con el agente';

  return (
    <div className="flex flex-col h-screen bg-[var(--background)]">
      {/* Header - Inspired by carlosbejar.cl: large avatar + name + role */}
      <div className="flex items-center gap-4 px-5 py-4 border-b border-[var(--border)]">
        <button onClick={() => router.back()} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
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
          <p className="text-amber-400 text-sm">Tiempo de grabacion agotado. Presiona el microfono para grabar de nuevo.</p>
        </div>
      )}

      {/* Messages area */}
      {messages.length > 0 && (
        <div className="flex-shrink-0 max-h-[40vh] overflow-y-auto mx-4 mt-3 space-y-2 rounded-lg bg-[#0a0a0a] border border-[var(--border)] p-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={cn(
                'max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'text-white'
                  : 'bg-[#1a1a1a] text-[var(--foreground)]'
              )} style={msg.role === 'user' ? { background: agent.color } : undefined}>
                {msg.content}
              </div>
            </div>
          ))}
          {currentTranscript && (
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed text-white/70 italic" style={{ background: `${agent.color}80` }}>
                {currentTranscript}...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Live transcript when no messages yet */}
      {currentTranscript && messages.length === 0 && (
        <div className="mx-4 mt-3 rounded-lg p-3 border" style={{ borderColor: `${agent.color}30`, background: `${agent.color}08` }}>
          <p className="text-sm text-[var(--foreground)] italic">{currentTranscript}...</p>
        </div>
      )}

      {/* Orb / Waveform - centered in remaining space */}
      <div className="flex-1 flex items-center justify-center">
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
              isActive && !isRecording && !rateLimitReached && 'cursor-pointer hover:scale-110 active:scale-95'
            )}
            onClick={() => {
              if (isActive && !isRecording && !rateLimitReached && state === 'connected') {
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

      {/* Bottom controls - Inspired by carlosbejar.cl */}
      <div className="mx-4 mb-4 space-y-2">
        {/* Control bar: mic + send + status */}
        <div className="rounded-xl border border-[var(--border)] bg-[#0a0a0a] p-2.5">
          <div className="flex items-center gap-2">
            {/* Mic button - start recording */}
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
                  ? 'bg-red-500/20 text-red-400 animate-pulse'
                  : state === 'connected' && !rateLimitReached
                  ? 'text-white hover:scale-105'
                  : 'text-[var(--muted)] opacity-50'
              )}
              style={!isRecording && state === 'connected' && !rateLimitReached ? { background: agent.color } : undefined}
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Status text */}
            <p className="flex-1 text-xs text-[var(--muted)] text-center">
              {statusText}
            </p>

            {/* Send button - visible during recording */}
            {isRecording && (
              <button
                onClick={() => sendMessage()}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium transition-all hover:bg-red-600 hover:scale-105 flex-shrink-0 flex items-center gap-1.5"
              >
                <ArrowUp className="w-4 h-4" />
                Enviar
              </button>
            )}

            {/* Stop button - visible during recording */}
            {isRecording && (
              <button
                onClick={() => stopRecording()}
                className="p-2.5 rounded-lg text-[var(--muted)] hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
                title="Cancelar grabacion"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Text input - always visible */}
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
            disabled={rateLimitReached || !isActive}
          />
          <button
            onClick={handleSendText}
            disabled={!textInput.trim() || rateLimitReached || !isActive}
            className="p-2 rounded-lg text-white disabled:opacity-30 transition-all hover:scale-105 flex-shrink-0"
            style={{ background: agent.color }}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
