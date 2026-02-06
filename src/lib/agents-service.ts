// Servicio para gestión de agentes
// Por ahora usa localStorage, luego migrar a Supabase

import { Agent, AgentType, AgentStatus } from './types';

const STORAGE_KEY = 'agentboss-agents';

// ============================================
// HELPERS
// ============================================

function generateId(): string {
  return `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getStorage(): Agent[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveStorage(agents: Agent[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents));
}

// ============================================
// CRUD OPERATIONS
// ============================================

export function getAgents(userId?: string): Agent[] {
  const agents = getStorage();
  if (userId) {
    return agents.filter(a => a.userId === userId);
  }
  return agents;
}

export function getAgentById(id: string): Agent | undefined {
  return getStorage().find(a => a.id === id);
}

export function createAgent(data: {
  userId: string;
  name: string;
  description: string;
  type: AgentType;
  personality: Agent['personality'];
  voice?: Agent['voice'];
  llm: Agent['llm'];
}): Agent {
  const agents = getStorage();

  const newAgent: Agent = {
    id: generateId(),
    userId: data.userId,
    name: data.name,
    description: data.description,
    type: data.type,
    status: 'draft',
    personality: data.personality,
    voice: data.voice,
    llm: data.llm,
    stats: {
      totalConversations: 0,
      totalMessages: 0,
      avgResponseTime: 0,
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  agents.push(newAgent);
  saveStorage(agents);

  return newAgent;
}

export function updateAgent(id: string, updates: Partial<Agent>): Agent | null {
  const agents = getStorage();
  const index = agents.findIndex(a => a.id === id);

  if (index === -1) return null;

  agents[index] = {
    ...agents[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  saveStorage(agents);
  return agents[index];
}

export function deleteAgent(id: string): boolean {
  const agents = getStorage();
  const index = agents.findIndex(a => a.id === id);

  if (index === -1) return false;

  agents.splice(index, 1);
  saveStorage(agents);

  return true;
}

export function updateAgentStatus(id: string, status: AgentStatus): Agent | null {
  return updateAgent(id, { status });
}

// ============================================
// AGENT CARD COLORS
// ============================================

export function getAgentColor(id: string): string {
  const colors: Record<string, string> = {
    mercury: "from-blue-600 to-cyan-500",
    venus: "from-pink-500 to-rose-400",
    neptune: "from-indigo-600 to-blue-500",
    atlas: "from-amber-500 to-orange-400",
    saturn: "from-purple-600 to-violet-500",
    mars: "from-red-500 to-orange-500",
    earth: "from-emerald-500 to-green-400",
    uranus: "from-teal-500 to-cyan-400",
    pluto: "from-slate-500 to-zinc-400",
  };
  return colors[id] ?? "from-gray-500 to-gray-400";
}

// ============================================
// DEMO DATA - 9 themed agents
// ============================================

export function createDemoAgents(userId: string): void {
  const existing = getAgents(userId);
  if (existing.length > 0) return;

  const demoAgents: Omit<Agent, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      userId,
      name: 'Mercury',
      description: 'Extracción inteligente de BLs y documentos navieros',
      type: 'voice',
      status: 'active',
      personality: { systemPrompt: 'Eres un agente experto en extracción de BLs navieros. Procesas documentos de MSC, Hapag-Lloyd y otras navieras.', tone: 'professional', language: 'es' },
      voice: { provider: 'nvidia', voiceId: 'es-male-1', voiceName: 'Carlos', speed: 1.0, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4o-mini', temperature: 0.3, maxTokens: 500 },
      stats: { totalConversations: 127, totalMessages: 1543, avgResponseTime: 1.2 },
      avatar: '/agents/mercury.jpg',
      role: 'BKLOG · Logística',
      currentTask: 'Procesando BL de MSC...',
      functionCall: "extract_bl(naviera='MSC', format='AGUNSA')",
      capabilities: ['Extraer datos de BL', 'Procesar documentos', 'Validar navieras', 'Actualizar sistema'],
    },
    {
      userId,
      name: 'Venus',
      description: 'Cotizaciones automáticas de rutas marítimas',
      type: 'voice',
      status: 'active',
      personality: { systemPrompt: 'Eres un agente especializado en cotizaciones de rutas marítimas internacionales.', tone: 'friendly', language: 'es' },
      voice: { provider: 'elevenlabs', voiceId: 'es-female-1', voiceName: 'María', speed: 1.0, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4o', temperature: 0.5, maxTokens: 800 },
      stats: { totalConversations: 89, totalMessages: 892, avgResponseTime: 1.5 },
      avatar: '/agents/venus.jpg',
      role: 'BKLOG · Cotizaciones',
      currentTask: 'Cotizando ruta Asia-LATAM...',
      functionCall: "quote_route(origin='CLSAI', dest='KRPUS')",
      capabilities: ['Cotizar rutas', 'Comparar tarifas', 'Agendar bookings', 'Notificar clientes'],
    },
    {
      userId,
      name: 'Neptune',
      description: 'Predicción de demanda y análisis supply chain',
      type: 'chat',
      status: 'paused',
      personality: { systemPrompt: 'Eres un analista de supply chain. Predices demanda y optimizas cadenas de suministro.', tone: 'formal', language: 'es' },
      llm: { provider: 'anthropic', model: 'claude-3-5-sonnet', temperature: 0.4, maxTokens: 1000 },
      stats: { totalConversations: 45, totalMessages: 320, avgResponseTime: 2.1 },
      avatar: '/agents/neptune.jpg',
      role: 'BKLOG · Supply Chain',
      functionCall: "forecast_demand(period='Q1_2026')",
      capabilities: ['Predecir demanda', 'Optimizar rutas', 'Analizar inventario', 'Generar reportes'],
    },
    {
      userId,
      name: 'Atlas',
      description: 'Diagnóstico y optimización de procesos operativos',
      type: 'both',
      status: 'active',
      personality: { systemPrompt: 'Eres un consultor de procesos. Diagnosticas ineficiencias y propones mejoras operativas.', tone: 'professional', language: 'es' },
      voice: { provider: 'openai', voiceId: 'es-male-2', voiceName: 'Diego', speed: 1.0, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4o', temperature: 0.6, maxTokens: 1000 },
      stats: { totalConversations: 67, totalMessages: 534, avgResponseTime: 1.8 },
      avatar: '/agents/atlas.jpg',
      role: 'Optimización de Procesos',
      currentTask: 'Analizando flujo Simian...',
      functionCall: "diagnose_process(client='simian')",
      capabilities: ['Diagnosticar procesos', 'Proponer mejoras', 'Medir KPIs', 'Automatizar flujos'],
    },
    {
      userId,
      name: 'Saturn',
      description: 'Gestión de contratos y documentación legal',
      type: 'chat',
      status: 'paused',
      personality: { systemPrompt: 'Eres un asistente legal para gestión de contratos y documentación empresarial.', tone: 'formal', language: 'es' },
      llm: { provider: 'anthropic', model: 'claude-3-5-sonnet', temperature: 0.3, maxTokens: 1500 },
      stats: { totalConversations: 23, totalMessages: 189, avgResponseTime: 2.5 },
      avatar: '/agents/saturn.jpg',
      role: 'Vergara y Compañía',
      functionCall: "generate_contract(type='lease')",
      capabilities: ['Generar contratos', 'Revisar cláusulas', 'Gestionar firmas', 'Archivar documentos'],
    },
    {
      userId,
      name: 'Mars',
      description: 'Calificación de leads y pipeline de ventas',
      type: 'voice',
      status: 'active',
      personality: { systemPrompt: 'Eres un agente de ventas. Calificas leads y gestionas el pipeline comercial.', tone: 'friendly', language: 'es' },
      voice: { provider: 'nvidia', voiceId: 'es-female-2', voiceName: 'Sofía', speed: 1.1, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4o-mini', temperature: 0.7, maxTokens: 500 },
      stats: { totalConversations: 156, totalMessages: 2100, avgResponseTime: 0.9 },
      avatar: '/agents/mars.jpg',
      role: 'Simian Brokers',
      currentTask: 'Calificando 12 leads nuevos...',
      functionCall: "qualify_leads(source='portal')",
      capabilities: ['Calificar leads', 'Enviar follow-ups', 'Agendar reuniones', 'Actualizar CRM'],
    },
    {
      userId,
      name: 'Earth',
      description: 'Deploy y monitoreo de infraestructura',
      type: 'both',
      status: 'active',
      personality: { systemPrompt: 'Eres un DevOps engineer. Gestionas deploys, monitoreo y infraestructura de servidores.', tone: 'casual', language: 'es' },
      voice: { provider: 'openai', voiceId: 'en-male-1', voiceName: 'James', speed: 1.0, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4o', temperature: 0.3, maxTokens: 800 },
      stats: { totalConversations: 234, totalMessages: 3400, avgResponseTime: 0.8 },
      avatar: '/agents/earth.jpg',
      role: 'Infraestructura',
      currentTask: 'Deploying forwarding-ocr v2.1...',
      functionCall: "deploy(service='forwarding-ocr')",
      capabilities: ['Deployar servicios', 'Monitorear uptime', 'Escalar recursos', 'Alertar incidentes'],
    },
    {
      userId,
      name: 'Uranus',
      description: 'Escaneo de seguridad y hardening de sistemas',
      type: 'chat',
      status: 'paused',
      personality: { systemPrompt: 'Eres un experto en ciberseguridad. Escaneas vulnerabilidades y aplicas hardening.', tone: 'professional', language: 'es' },
      llm: { provider: 'anthropic', model: 'claude-3-5-sonnet', temperature: 0.2, maxTokens: 1000 },
      stats: { totalConversations: 34, totalMessages: 267, avgResponseTime: 3.2 },
      avatar: '/agents/uranus.jpg',
      role: 'Ciberseguridad',
      functionCall: "security_scan(targets=['api','web'])",
      capabilities: ['Escanear vulnerabilidades', 'Aplicar hardening', 'Auditar accesos', 'Generar informes'],
    },
    {
      userId,
      name: 'Pluto',
      description: 'Consultoría y análisis de workflows empresariales',
      type: 'both',
      status: 'paused',
      personality: { systemPrompt: 'Eres un consultor empresarial. Analizas workflows y propones estrategias de mejora.', tone: 'professional', language: 'es' },
      voice: { provider: 'elevenlabs', voiceId: 'es-male-3', voiceName: 'Andrés', speed: 0.9, pitch: 1.0 },
      llm: { provider: 'openai', model: 'gpt-4-turbo', temperature: 0.5, maxTokens: 1200 },
      stats: { totalConversations: 12, totalMessages: 98, avgResponseTime: 2.8 },
      avatar: '/agents/pluto.jpg',
      role: 'Consultoría',
      functionCall: "analyze_workflow(client='simian')",
      capabilities: ['Analizar workflows', 'Proponer estrategias', 'Mapear procesos', 'Optimizar costos'],
    },
  ];

  demoAgents.forEach(agent => {
    const agents = getStorage();
    agents.push({
      ...agent,
      id: agent.name.toLowerCase(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Agent);
    saveStorage(agents);
  });
}
