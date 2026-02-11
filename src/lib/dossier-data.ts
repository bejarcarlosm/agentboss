// ============================================
// DOSSIER DATA - Mission Impossible Style
// ============================================

export interface DossierAgent {
  slug: string;
  codename: string;
  role: string;
  status: 'ACTIVE' | 'STANDBY';
  color: string;
  avatar: string;
  briefing: string;
  specialties: string[];
  stats: {
    speed: number;      // 1-100
    precision: number;
    creativity: number;
    autonomy: number;
  };
  quote: string;
  chatSlug?: string; // if has active chat
}

export const DOSSIER_AGENTS: DossierAgent[] = [
  {
    slug: 'atlas',
    codename: 'ATLAS',
    role: 'Product Owner',
    status: 'ACTIVE',
    color: '#2dd4bf',
    avatar: '/agents/atlas.jpg',
    briefing: 'Lider estrategica del equipo. Traduce visiones de negocio en especificaciones tecnicas ejecutables. Experta en user stories, BPM y priorizacion de backlog. Primer punto de contacto con el cliente.',
    specialties: ['Discovery de producto', 'User Stories', 'Priorizacion de backlog', 'Analisis de negocio', 'Roadmap estrategico', 'Stakeholder management'],
    stats: { speed: 85, precision: 90, creativity: 75, autonomy: 95 },
    quote: 'Antes de construir, necesito entender tu negocio.',
    chatSlug: 'product-owner',
  },
  {
    slug: 'venus',
    codename: 'VENUS',
    role: 'UX Designer',
    status: 'ACTIVE',
    color: '#a855f7',
    avatar: '/agents/venus.jpg',
    briefing: 'Especialista en experiencia de usuario e interfaces. Transforma requerimientos en disenos intuitivos y atractivos. Domina wireframing, prototipado rapido y sistemas de diseno.',
    specialties: ['Diseno de interfaces', 'Wireframing', 'Prototipado rapido', 'Sistemas de diseno', 'Accesibilidad', 'Mobile-first'],
    stats: { speed: 80, precision: 85, creativity: 98, autonomy: 80 },
    quote: 'La belleza sin usabilidad es decoracion. La usabilidad sin belleza es ingenieria.',
    chatSlug: 'ux-designer',
  },
  {
    slug: 'flux',
    codename: 'FLUX',
    role: 'Full-Stack Developer',
    status: 'STANDBY',
    color: '#06b6d4',
    avatar: '/agents/flux.jpg',
    briefing: 'Desarrollador de elite. Construye aplicaciones completas desde el frontend hasta el backend. Especialista en React, Next.js, TypeScript y arquitecturas escalables. Velocidad de ejecucion sin precedentes.',
    specialties: ['React & Next.js', 'TypeScript', 'APIs RESTful', 'Base de datos', 'Arquitectura de sistemas', 'Code review'],
    stats: { speed: 95, precision: 92, creativity: 70, autonomy: 90 },
    quote: 'El mejor codigo es el que no necesita comentarios.',
  },
  {
    slug: 'nova',
    codename: 'NOVA',
    role: 'AI Engineer',
    status: 'STANDBY',
    color: '#3b82f6',
    avatar: '/agents/nova.jpg',
    briefing: 'Ingeniero de inteligencia artificial. Integra modelos de lenguaje, sistemas de recomendacion y automatizacion inteligente en las aplicaciones. El diferenciador clave de la fabrica.',
    specialties: ['Integracion de LLMs', 'Prompt engineering', 'RAG systems', 'Automatizacion IA', 'Vision computacional', 'Agentes autonomos'],
    stats: { speed: 75, precision: 88, creativity: 95, autonomy: 98 },
    quote: 'La IA no reemplaza al humano. Lo potencia.',
  },
  {
    slug: 'pluto',
    codename: 'PLUTO',
    role: 'QA Black Belt',
    status: 'ACTIVE',
    color: '#22c55e',
    avatar: '/agents/pluto.jpg',
    briefing: 'Cazador de bugs implacable. Aplica metodologias Six Sigma y testing exhaustivo para garantizar calidad. Ningun defecto escapa de su radar. Especialista en testing automatizado.',
    specialties: ['Testing automatizado', 'QA Six Sigma', 'Testing de APIs', 'Performance testing', 'Security testing', 'Analisis de cobertura'],
    stats: { speed: 70, precision: 99, creativity: 60, autonomy: 85 },
    quote: 'Si no esta testeado, no existe.',
    chatSlug: 'black-belt',
  },
  {
    slug: 'orion',
    codename: 'ORION',
    role: 'DevOps & Infrastructure',
    status: 'STANDBY',
    color: '#f97316',
    avatar: '/agents/orion.jpg',
    briefing: 'Guardian de la infraestructura. Gestiona deployments, monitoreo, escalamiento y seguridad de los sistemas en produccion. Mantiene todo funcionando 24/7 sin interrupcion.',
    specialties: ['CI/CD Pipelines', 'Docker & containers', 'Monitoreo & alertas', 'Auto-scaling', 'Seguridad de sistemas', 'Cloud architecture'],
    stats: { speed: 80, precision: 95, creativity: 55, autonomy: 92 },
    quote: 'El mejor deploy es el que nadie nota.',
  },
  {
    slug: 'mars',
    codename: 'MARS',
    role: 'Growth & Launch',
    status: 'STANDBY',
    color: '#ef4444',
    avatar: '/agents/mars.jpg',
    briefing: 'Estratega de crecimiento agresivo. Diseña lanzamientos, optimiza conversion, ejecuta growth hacking y escala productos. Mentalidad de guerra para conquistar mercados.',
    specialties: ['Growth hacking', 'Lanzamiento de producto', 'SEO & ASO', 'Funnels de conversion', 'A/B testing', 'Marketing de contenido'],
    stats: { speed: 90, precision: 75, creativity: 92, autonomy: 88 },
    quote: 'No construyas y esperes. Lanza y conquista.',
  },
  // === Business orbit ===
  {
    slug: 'luna',
    codename: 'LUNA',
    role: 'Customer Support',
    status: 'STANDBY',
    color: '#10b981',
    avatar: '/agents/luna.jpg',
    briefing: 'Agente de soporte al cliente con empatia infinita. Resuelve dudas, gestiona tickets y mantiene a los usuarios felices. Primera linea de defensa para la retencion de clientes.',
    specialties: ['Atencion al cliente', 'Gestion de tickets', 'FAQ automatizado', 'Onboarding de usuarios', 'Retencion', 'NPS tracking'],
    stats: { speed: 92, precision: 85, creativity: 65, autonomy: 80 },
    quote: 'Un cliente feliz es el mejor marketing.',
  },
  {
    slug: 'sia',
    codename: 'SIA',
    role: 'Content Creator',
    status: 'STANDBY',
    color: '#ec4899',
    avatar: '/agents/sia.jpg',
    briefing: 'Creadora de contenido multiplataforma. Escribe copy, genera guiones de video, diseña estrategias de contenido y mantiene la voz de marca consistente en todos los canales.',
    specialties: ['Copywriting', 'Guiones de video', 'SEO de contenido', 'Redes sociales', 'Email marketing', 'Estrategia de marca'],
    stats: { speed: 88, precision: 78, creativity: 98, autonomy: 85 },
    quote: 'Las palabras correctas mueven montanas.',
  },
  {
    slug: 'saturn',
    codename: 'SATURN',
    role: 'Data Analytics',
    status: 'STANDBY',
    color: '#8b5cf6',
    avatar: '/agents/saturn.jpg',
    briefing: 'Analista de datos obsesionado con las metricas. Transforma datos crudos en insights accionables, construye dashboards y detecta patrones que impulsan decisiones de negocio.',
    specialties: ['Business intelligence', 'Dashboards & reportes', 'Analisis de metricas', 'Prediccion de tendencias', 'KPIs & OKRs', 'Data storytelling'],
    stats: { speed: 70, precision: 96, creativity: 72, autonomy: 90 },
    quote: 'Sin datos, solo eres una persona mas con una opinion.',
  },
];

export function getDossierAgent(slug: string): DossierAgent | undefined {
  return DOSSIER_AGENTS.find(a => a.slug === slug);
}
