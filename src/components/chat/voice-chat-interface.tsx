'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import type { FactoryAgent } from '@/lib/factory-types';
import { useVoiceChatStreaming } from '@/hooks/use-voice-chat-streaming';
import { AudioWaveform } from '@/components/ui/audio-waveform';
import { Mic, ArrowUp, Loader2, ArrowLeft, X, Sun, Moon, Keyboard } from 'lucide-react';
import { WhatsAppGate } from '@/components/chat/whatsapp-gate';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

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
  skipGate?: boolean;
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

export function VoiceChatInterface({ agent, isLiveMode, skipGate }: VoiceChatInterfaceProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [inputMode, setInputMode] = useState<'voice' | 'text' | 'both'>('both');
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // WhatsApp gate state — skipGate bypasses it (boss routes)
  const [gatePassed] = useState(() => {
    const passed = skipGate || isGatePassed();
    if (passed) markGatePassed();
    return passed;
  });

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

  const agentNameMap: Record<string, string> = {
    'product-owner': 'Atlas',
    'ux-designer': 'Venus',
    'black-belt': 'Pluto',
    'developer': 'Earth',
    'infrastructure': 'Uranus',
  };

  const agentWelcome: Record<string, string> = {
    'product-owner': `Hi! I'm Atlas, Product Owner at AgentBoss. My job is to understand your business and turn your ideas into working software. I work under the supervision of AgentBoss's human project leader.\n\nTell me about your business — what problem do you want to solve with technology?`,
    'ux-designer': `Hi! I'm Venus, UX/UI Designer at AgentBoss. I make sure your product looks and feels amazing for your users.\n\nWhat kind of digital product do you need? Do you already have something or are we starting from scratch?`,
    'black-belt': `Hi! I'm Pluto, QA Black Belt at AgentBoss. My mission is to make sure everything works perfectly before it reaches your users.\n\nDo you have an existing product you want to improve, or is it a new idea?`,
    'developer': `Hi! I'm Earth, Developer at AgentBoss. I build the code that brings ideas to life.\n\nWhat kind of technical solution are you looking for? App, web platform, automation?`,
    'infrastructure': `Hi! I'm Uranus, Infrastructure Expert at AgentBoss. I make sure everything runs fast and reliably in production.\n\nDo you already have infrastructure set up, or do we need to start from scratch?`,
  };

  useEffect(() => {
    if (!gatePassed) return;
    const agentName = agentNameMap[agent.slug] || agent.name;
    connect(agentName.toLowerCase());
    return () => { disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.slug, gatePassed]);

  // Stop recording if user switches to text mode
  useEffect(() => {
    if (isRecording && inputMode === 'text') stopRecording();
  }, [inputMode, isRecording, stopRecording]);

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
      sendTextMessage(textInput, inputMode);
      setTextInput('');
    }
  };

  const statusText = rateLimitReached
    ? 'Demo limit reached'
    : isRecording
    ? 'Listening...'
    : state === 'processing'
    ? `${agent.name} is thinking...`
    : state === 'speaking'
    ? `${agent.name} is responding...`
    : state === 'connecting'
    ? `Connecting to ${agent.name}...`
    : 'Tap the mic or type your message';

  if (!gatePassed) {
    return <WhatsAppGate agent={agent} />;
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

        {/* Mode selector */}
        <div className="flex items-center rounded-lg border border-[var(--border)] overflow-hidden">
          {([
            { mode: 'voice' as const, icon: <Mic className="w-3.5 h-3.5" />, title: 'Voice only' },
            { mode: 'text' as const, icon: <Keyboard className="w-3.5 h-3.5" />, title: 'Text only' },
            { mode: 'both' as const, icon: <><Mic className="w-3 h-3" /><Keyboard className="w-3 h-3" /></>, title: 'Voice + Text' },
          ]).map(({ mode, icon, title }) => (
            <button
              key={mode}
              onClick={() => setInputMode(mode)}
              className={cn(
                'flex items-center gap-0.5 px-2 py-1.5 transition-colors text-xs',
                inputMode === mode ? 'text-white' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
              )}
              style={inputMode === mode ? { background: agent.color } : undefined}
              title={title}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg hover:bg-[var(--foreground)]/5 transition-colors"
            title={resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4 text-[var(--muted)]" /> : <Moon className="w-4 h-4 text-[var(--muted)]" />}
          </button>
        )}

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
            Demo limit reached. Contact us at hola@agentboss.cl for full access.
          </p>
        </div>
      )}
      {demoTimeoutReached && (
        <div className="mx-4 mt-3 rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-center">
          <p className="text-amber-400 text-sm">Recording time limit reached.</p>
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
                {msg.role === 'assistant' && inputMode === 'text' ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none [&_table]:text-xs [&_th]:px-2 [&_th]:py-1 [&_td]:px-2 [&_td]:py-1 [&_table]:border-collapse [&_th]:border [&_th]:border-[var(--border)] [&_td]:border [&_td]:border-[var(--border)] [&_th]:bg-[var(--surface)] [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_h3]:text-sm [&_h3]:mt-2 [&_h3]:mb-1">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  linkifyText(msg.content)
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Orb + Waveform area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 overflow-y-auto px-4">
        {/* Welcome */}
        {!welcomeDismissed && messages.length === 0 && state !== 'connecting' && agentWelcome[agent.slug] && (
          <div className="max-w-sm md:max-w-lg w-full space-y-3">
            <div className="rounded-xl p-4 md:p-6 bg-[var(--surface)] border border-[var(--border)]">
              <div className="flex items-start gap-3 md:gap-4">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border flex-shrink-0"
                  style={{ borderColor: agent.color }}
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold mb-1.5" style={{ color: agent.color }}>{agent.name}</p>
                  <p className="text-xs md:text-sm text-[var(--muted)] leading-relaxed whitespace-pre-line">{agentWelcome[agent.slug]}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-3">
          {state === 'connecting' && (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" style={{ color: agent.color }} />
              <span className="text-sm text-[var(--muted)]">Connecting...</span>
            </div>
          )}

          {/* Orb - hidden in text mode */}
          {inputMode !== 'text' && (
            <div className="relative">
              {isRecording && analyser && (
                <div className="absolute -inset-6 z-0">
                  <AudioWaveform analyser={analyser} color={agent.color} />
                </div>
              )}

              <div
                className={cn(
                  'relative z-10 transition-transform duration-200',
                  state === 'connected' && !rateLimitReached && 'cursor-pointer hover:scale-110 active:scale-95',
                  state === 'connecting' && 'opacity-50',
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
          )}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="mx-4 mb-4 space-y-2">
        {/* Status text */}
        {(state === 'processing' || state === 'speaking' || isRecording) && (
          <p className="text-xs text-[var(--muted)] text-center">
            {statusText}
          </p>
        )}

        {/* Unified input bar */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center gap-2 p-2.5">
          {/* Mic button - hidden in text mode */}
          {inputMode !== 'text' && (
            <button
              onClick={() => {
                if (isRecording) {
                  stopRecording();
                } else if (state === 'connected' && !rateLimitReached) {
                  startRecording();
                }
              }}
              disabled={state === 'processing' || state === 'speaking' || rateLimitReached || !isActive}
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
              title={isRecording ? 'Stop recording' : 'Record voice'}
            >
              {isRecording ? <X className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}

          {/* Text input - shows transcript in voice mode, editable in text/both */}
          <input
            type="text"
            value={inputMode === 'voice' ? currentTranscript : (isRecording ? currentTranscript : textInput)}
            onChange={(e) => { if (!isRecording && inputMode !== 'voice') setTextInput(e.target.value); }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isRecording && inputMode !== 'voice') {
                e.preventDefault();
                handleSendText();
              }
            }}
            placeholder={
              inputMode === 'voice'
                ? 'Tap the mic to speak...'
                : inputMode === 'text'
                ? 'Type your message...'
                : isRecording
                ? 'Listening...'
                : 'Type or tap the mic...'
            }
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none"
            disabled={rateLimitReached || !isActive || state === 'processing' || state === 'speaking'}
            readOnly={isRecording || inputMode === 'voice'}
          />

          {/* Send button */}
          <button
            onClick={() => {
              if (isRecording && readyToSend && currentTranscript.trim()) {
                sendMessage();
              } else if (!isRecording && inputMode !== 'voice') {
                handleSendText();
              }
            }}
            disabled={
              isRecording
                ? !readyToSend || !currentTranscript.trim()
                : inputMode === 'voice'
                ? true
                : !textInput.trim() || rateLimitReached || !isActive || state === 'processing' || state === 'speaking'
            }
            className="p-2 rounded-lg text-[var(--text-on-accent)] disabled:opacity-30 transition-all hover:scale-105 flex-shrink-0"
            style={{ background: agent.color }}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
