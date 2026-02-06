// ============================================
// TIPOS PRINCIPALES - AgentBoss
// ============================================

// === USUARIO ===
export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

// === AGENTE ===
export type AgentStatus = 'draft' | 'active' | 'paused';
export type AgentType = 'voice' | 'chat' | 'both';

export interface Agent {
  id: string;
  userId: string;
  name: string;
  description: string;
  type: AgentType;
  status: AgentStatus;

  // Configuración de personalidad
  personality: {
    systemPrompt: string;
    tone: 'formal' | 'casual' | 'friendly' | 'professional';
    language: string;
  };

  // Configuración de voz (para type: 'voice' o 'both')
  voice?: {
    provider: 'nvidia' | 'elevenlabs' | 'openai';
    voiceId: string;
    voiceName: string;
    speed: number;
    pitch: number;
  };

  // Configuración de LLM
  llm: {
    provider: 'openai' | 'anthropic';
    model: string;
    temperature: number;
    maxTokens: number;
  };

  // Estadísticas
  stats: {
    totalConversations: number;
    totalMessages: number;
    avgResponseTime: number;
  };

  // Agent Card fields (visual)
  avatar?: string;
  color?: string;
  role?: string;
  currentTask?: string;
  functionCall?: string;
  capabilities?: string[];

  createdAt: string;
  updatedAt: string;
}

// === CONVERSACIÓN ===
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  audioUrl?: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  agentId: string;
  userId?: string;
  messages: Message[];
  startedAt: string;
  endedAt?: string;
  metadata?: Record<string, unknown>;
}

// === VOCES DISPONIBLES ===
export interface Voice {
  id: string;
  name: string;
  provider: 'nvidia' | 'elevenlabs' | 'openai';
  language: string;
  gender: 'male' | 'female' | 'neutral';
  previewUrl?: string;
  description?: string;
}

// === API RESPONSES ===
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// === CONFIGURACIÓN DE PROVEEDORES ===
export const VOICE_PROVIDERS: Record<string, { name: string; description: string; models: string[] }> = {
  nvidia: {
    name: 'NVIDIA Riva',
    description: 'Alta calidad, baja latencia, económico',
    models: ['fastpitch-hifigan'],
  },
  elevenlabs: {
    name: 'ElevenLabs',
    description: 'Voces ultra realistas',
    models: ['eleven_multilingual_v2', 'eleven_turbo_v2'],
  },
  openai: {
    name: 'OpenAI TTS',
    description: 'Buena calidad, fácil integración',
    models: ['tts-1', 'tts-1-hd'],
  },
};

export const LLM_PROVIDERS: Record<string, { name: string; models: string[] }> = {
  openai: {
    name: 'OpenAI',
    models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  },
  anthropic: {
    name: 'Anthropic',
    models: ['claude-3-5-sonnet', 'claude-3-haiku'],
  },
};

export const LANGUAGES = [
  { code: 'es', name: 'Español' },
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Português' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
] as const;

export const TONES = [
  { id: 'formal', name: 'Formal', description: 'Profesional y respetuoso' },
  { id: 'casual', name: 'Casual', description: 'Relajado y amigable' },
  { id: 'friendly', name: 'Amigable', description: 'Cálido y cercano' },
  { id: 'professional', name: 'Profesional', description: 'Ejecutivo y directo' },
] as const;
