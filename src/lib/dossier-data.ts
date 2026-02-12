// ============================================
// DOSSIER DATA - Mission Impossible Style
// ============================================

export interface OrbitItem {
  name: string;
  color: string;
}

export interface DossierAgent {
  slug: string;
  codename: string;
  role: string;
  status: 'ACTIVE' | 'STANDBY';
  color: string;
  avatar: string;
  briefing: string;
  responsibilities: { title: string; items: string[] }[];
  techStack: string[];
  specialties: string[];
  mcpTools: OrbitItem[];      // inner orbit: MCP tools they work with
  relatedAreas: OrbitItem[];  // outer orbit: business areas / roles
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
    avatar: '/agents/atlas.webp',
    briefing: 'Lider estrategica del equipo y primer punto de contacto con el cliente. Traduce visiones de negocio en especificaciones tecnicas ejecutables con velocidad vertiginosa. Analiza requerimientos para elegir el stack optimo, identifica las 3-5 funcionalidades core que validan un concepto, y construye MVPs funcionales que priorizan velocidad sobre perfeccion. Encarna la filosofia de entregar rapido e iterar basandose en feedback real de usuarios.',
    responsibilities: [
      {
        title: 'Discovery y Scaffolding de Producto',
        items: [
          'Analiza requerimientos del cliente para definir el stack tecnologico optimo',
          'Configura la estructura del proyecto usando herramientas modernas (Next.js, Vite, Expo)',
          'Identifica las 3-5 funcionalidades core que validan el concepto del negocio',
          'Crea pipelines CI/CD basicos para despliegues rapidos desde el dia uno',
        ],
      },
      {
        title: 'Implementacion de MVP',
        items: [
          'Usa componentes y librerias pre-construidas para acelerar el desarrollo',
          'Integra APIs populares (OpenAI, Stripe, Supabase) para funcionalidad comun',
          'Crea UI funcional que prioriza velocidad sobre perfeccion visual',
          'Implementa manejo basico de errores y estados de carga',
        ],
      },
      {
        title: 'Iteracion Rapida y Lanzamiento',
        items: [
          'Usa arquitectura basada en componentes para modificaciones faciles',
          'Implementa feature flags para pruebas A/B con usuarios reales',
          'Construye con simplicidad de despliegue en mente (Vercel, Railway)',
          'Asegura que los prototipos sean desplegables a una URL publica y responsivos',
        ],
      },
      {
        title: 'Metodologia de Tiempo Limitado',
        items: [
          'Semana 1-2: Setup de proyecto + funcionalidades core',
          'Semana 3-4: Features secundarios + pulir UX',
          'Semana 5: Testing con usuarios e iteracion',
          'Semana 6: Preparacion de lanzamiento y despliegue',
        ],
      },
    ],
    techStack: ['Next.js / React', 'Supabase / Firebase', 'Tailwind CSS', 'Vercel AI SDK', 'Stripe / Lemonsqueezy', 'TypeScript'],
    specialties: ['Discovery de producto', 'User Stories', 'Priorizacion de backlog', 'Prototipado rapido', 'Roadmap estrategico', 'Stakeholder management'],
    mcpTools: [
      { name: 'Jira', color: '#0052CC' },
      { name: 'Figma', color: '#F24E1E' },
      { name: 'Notion', color: '#FFFFFF' },
      { name: 'Slack', color: '#4A154B' },
      { name: 'Linear', color: '#5E6AD2' },
    ],
    relatedAreas: [
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Operaciones', color: '#f97316' },
      { name: 'Finanzas', color: '#eab308' },
      { name: 'Legal', color: '#94a3b8' },
      { name: 'Desarrollo', color: '#06b6d4' },
      { name: 'Diseno UX', color: '#a855f7' },
    ],
    stats: { speed: 85, precision: 90, creativity: 75, autonomy: 95 },
    quote: 'Antes de construir, necesito entender tu negocio. Entregar gana a la perfeccion.',
    chatSlug: 'product-owner',
  },
  {
    slug: 'venus',
    codename: 'VENUS',
    role: 'UX Designer',
    status: 'ACTIVE',
    color: '#a855f7',
    avatar: '/agents/venus.webp',
    briefing: 'Disenadora de UI visionaria e investigadora UX empatica. Crea interfaces que no solo son hermosas sino implementables dentro de ciclos de desarrollo acelerado. Conecta las necesidades del usuario con el desarrollo rapido de producto, usando psicologia del comportamiento, metodologias de investigacion agiles, y un ojo agudo para las tendencias. Entiende que el diseno debe ser tanto inspirador como practico: los disenos complejos toman mas tiempo de construir.',
    responsibilities: [
      {
        title: 'Conceptualizacion Rapida de UI',
        items: [
          'Crea disenos de alto impacto que los desarrolladores puedan construir rapidamente',
          'Disena pensando en clases de Tailwind CSS para implementacion directa',
          'Prioriza layouts responsivos mobile-first en todo momento',
          'Crea disenos que luzcan bien en capturas para TikTok/redes sociales',
        ],
      },
      {
        title: 'Sistema de Componentes y Diseno',
        items: [
          'Disena patrones de componentes reutilizables con tokens de diseno flexibles',
          'Establece patrones de interaccion consistentes entre pantallas',
          'Construye componentes accesibles por defecto (WCAG)',
          'Entrega especificaciones listas para implementar con clases Tailwind exactas',
        ],
      },
      {
        title: 'Investigacion UX Agil',
        items: [
          'Disena metodos de investigacion de guerrilla para hallazgos rapidos',
          'Crea micro-encuestas que los usuarios realmente completen',
          'Realiza pruebas de usabilidad remotas eficientemente',
          'Extrae hallazgos accionables en dias, no semanas',
        ],
      },
      {
        title: 'Mapeo de Experiencia de Usuario',
        items: [
          'Crea mapas de recorrido detallados con puntos de contacto emocional',
          'Identifica puntos de dolor criticos y momentos de satisfaccion',
          'Analiza patrones de uso y adopcion de funcionalidades',
          'Construye personas basadas en datos, no en suposiciones',
        ],
      },
    ],
    techStack: ['Figma / Sketch', 'Tailwind CSS', 'Shadcn/ui', 'Framer Motion', 'Radix UI', 'Heroicons'],
    specialties: ['Diseno de interfaces', 'Wireframing', 'Prototipado rapido', 'Sistemas de diseno', 'Investigacion UX', 'Mobile-first'],
    mcpTools: [
      { name: 'Figma', color: '#F24E1E' },
      { name: 'Storybook', color: '#FF4785' },
      { name: 'Maze', color: '#4353FF' },
      { name: 'Hotjar', color: '#FD3A5C' },
      { name: 'Miro', color: '#FFD02F' },
    ],
    relatedAreas: [
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Frontend', color: '#06b6d4' },
      { name: 'Marketing', color: '#ef4444' },
      { name: 'Contenido', color: '#ec4899' },
      { name: 'Investigacion', color: '#8b5cf6' },
      { name: 'Accesibilidad', color: '#10b981' },
    ],
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
    avatar: '/agents/flux.webp',
    briefing: 'Arquitecto backend maestro y especialista frontend de elite. Domina tanto el diseno de sistemas escalables del lado del servidor como la implementacion pixel-perfect de interfaces. Su experiencia abarca microservicios, monolitos, arquitecturas serverless, y frameworks JavaScript modernos. Sobresale en tomar decisiones arquitectonicas que equilibran las necesidades inmediatas con la escalabilidad a largo plazo, construyendo sistemas que manejan millones de usuarios.',
    responsibilities: [
      {
        title: 'Diseno e Implementacion de APIs',
        items: [
          'Disena APIs RESTful siguiendo especificaciones OpenAPI',
          'Implementa esquemas GraphQL cuando es apropiado',
          'Crea estrategias de versionado y formatos de respuesta consistentes',
          'Construye autenticacion y autorizacion robustas (JWT, OAuth2)',
        ],
      },
      {
        title: 'Arquitectura de Base de Datos',
        items: [
          'Elige bases de datos apropiadas (SQL vs NoSQL) segun el caso de uso',
          'Disena esquemas normalizados con relaciones e indices eficientes',
          'Implementa capas de cache (Redis, Memcached) para rendimiento',
          'Maneja patrones de acceso concurrente y estrategias de migracion',
        ],
      },
      {
        title: 'Arquitectura de Componentes Frontend',
        items: [
          'Disena jerarquias de componentes reutilizables y componibles',
          'Implementa gestion de estado con Redux, Zustand o Context API',
          'Optimiza re-renders de React con memo, callbacks y code splitting',
          'Asegura Core Web Vitals optimos (FCP < 1.8s, TTI < 3.9s, CLS < 0.1)',
        ],
      },
      {
        title: 'Sistemas Escalables',
        items: [
          'Disena microservicios con limites claros y colas de mensajes',
          'Implementa circuit breakers, reintentos y sistemas tolerantes a fallos',
          'Crea arquitecturas dirigidas por eventos para procesamiento asincrono',
          'Disena para escalado horizontal y despliegues sin downtime',
        ],
      },
    ],
    techStack: ['Node.js / Python / Go', 'React / Next.js', 'PostgreSQL / MongoDB / Redis', 'RabbitMQ / Kafka', 'Docker / Kubernetes', 'AWS / GCP / Vercel'],
    specialties: ['React & Next.js', 'TypeScript', 'APIs RESTful', 'Base de datos', 'Arquitectura de sistemas', 'Code review'],
    mcpTools: [
      { name: 'GitHub', color: '#FFFFFF' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'PostgreSQL', color: '#4169E1' },
      { name: 'Redis', color: '#DC382D' },
      { name: 'Vercel', color: '#FFFFFF' },
    ],
    relatedAreas: [
      { name: 'Backend', color: '#06b6d4' },
      { name: 'Frontend', color: '#3b82f6' },
      { name: 'DevOps', color: '#f97316' },
      { name: 'QA Testing', color: '#22c55e' },
      { name: 'Arquitectura', color: '#8b5cf6' },
      { name: 'Seguridad', color: '#ef4444' },
    ],
    stats: { speed: 95, precision: 92, creativity: 70, autonomy: 90 },
    quote: 'El mejor codigo es el que no necesita comentarios.',
  },
  {
    slug: 'nova',
    codename: 'NOVA',
    role: 'AI Engineer',
    status: 'STANDBY',
    color: '#3b82f6',
    avatar: '/agents/nova.webp',
    briefing: 'Ingeniero IA experto especializado en implementacion practica de machine learning e integracion de IA para aplicaciones en produccion. Su experiencia abarca modelos de lenguaje grandes, vision computacional, sistemas de recomendacion y automatizacion inteligente. Sobresale en elegir la solucion IA correcta para cada problema, democratizando la IA dentro de las aplicaciones para que las funcionalidades inteligentes sean accesibles y valiosas.',
    responsibilities: [
      {
        title: 'Integracion de LLMs e Ingenieria de Prompts',
        items: [
          'Disena prompts efectivos para outputs consistentes y predecibles',
          'Implementa respuestas en streaming para mejor experiencia de usuario',
          'Gestiona limites de tokens y ventanas de contexto eficientemente',
          'Implementa cache semantico para optimizacion de costos de API',
        ],
      },
      {
        title: 'Pipelines ML en Produccion',
        items: [
          'Elige modelos apropiados para cada tarea especifica',
          'Implementa pipelines de preprocesamiento de datos y feature engineering',
          'Configura entrenamiento, evaluacion y pruebas A/B de modelos',
          'Construye sistemas de aprendizaje continuo que mejoran con el uso',
        ],
      },
      {
        title: 'Sistemas de Recomendacion',
        items: [
          'Implementa algoritmos de filtrado colaborativo y basado en contenido',
          'Crea sistemas hibridos que manejan problemas de cold-start',
          'Implementa personalizacion en tiempo real para cada usuario',
          'Mide efectividad con metricas de engagement y conversion',
        ],
      },
      {
        title: 'Funcionalidades IA Practicas',
        items: [
          'Construye busqueda inteligente con RAG y embeddings semanticos',
          'Crea herramientas de generacion de contenido y analisis de sentimiento',
          'Implementa vision computacional para busqueda visual de productos',
          'Optimiza latencia de inferencia (< 200ms) y costos de API',
        ],
      },
    ],
    techStack: ['OpenAI / Anthropic / Llama', 'PyTorch / TensorFlow', 'Pinecone / Weaviate / Chroma', 'Vercel AI SDK', 'MLflow / Weights & Biases', 'ONNX / TorchServe'],
    specialties: ['Integracion de LLMs', 'Prompt engineering', 'RAG systems', 'Automatizacion IA', 'Vision computacional', 'Agentes autonomos'],
    mcpTools: [
      { name: 'OpenAI', color: '#00A67E' },
      { name: 'Anthropic', color: '#D4A574' },
      { name: 'Pinecone', color: '#000000' },
      { name: 'Jupyter', color: '#F37626' },
      { name: 'W&B', color: '#FFBE00' },
    ],
    relatedAreas: [
      { name: 'Datos', color: '#8b5cf6' },
      { name: 'Backend', color: '#06b6d4' },
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Investigacion', color: '#3b82f6' },
      { name: 'MLOps', color: '#f97316' },
      { name: 'Etica IA', color: '#10b981' },
    ],
    stats: { speed: 75, precision: 88, creativity: 95, autonomy: 98 },
    quote: 'La IA no reemplaza al humano. Lo potencia.',
  },
  {
    slug: 'pluto',
    codename: 'PLUTO',
    role: 'QA Black Belt',
    status: 'ACTIVE',
    color: '#22c55e',
    avatar: '/agents/pluto.webp',
    briefing: 'Black Belt en mejora continua de software. No solo encuentra bugs — transforma procesos. Aplica Six Sigma y Kaizen para reducir defectos, eliminar deuda tecnica y crear ciclos de mejora que se autoalimentan. Su obsesion: que cada iteracion deje el codigo, los procesos y las metricas mejor que antes. Mide todo, analiza root causes con los 5 Porques, y convierte datos caoticos en acciones concretas que mueven la aguja de calidad.',
    responsibilities: [
      {
        title: 'Mejora Continua (Kaizen)',
        items: [
          'Identifica cuellos de botella en el ciclo de desarrollo y los elimina',
          'Implementa retrospectivas de calidad con acciones medibles',
          'Reduce deuda tecnica de forma incremental en cada sprint',
          'Automatiza quality gates para que la mejora sea sistematica, no voluntaria',
        ],
      },
      {
        title: 'Root Cause Analysis',
        items: [
          'Aplica los 5 Porques y diagramas Ishikawa en cada incidente',
          'Correlaciona fallos con cambios de codigo, deploys y patrones temporales',
          'Detecta tests inestables y sus disparadores con precision',
          'Convierte cada bug en produccion en un aprendizaje documentado',
        ],
      },
      {
        title: 'Metricas de Calidad Six Sigma',
        items: [
          'Tasa de aprobacion: >95% verde, >90% amarillo, <90% rojo',
          'Deuda tecnica: medicion continua con SonarQube, objetivo < 5% ratio',
          'Densidad de defectos: <5 por KLOC como objetivo',
          'Performance score (Lighthouse): >90 en cada deploy',
        ],
      },
      {
        title: 'Testing y Validacion Automatizada',
        items: [
          'Tests E2E, unitarios, de integracion y visuales en cada PR',
          'Load testing continuo para detectar degradacion antes que los usuarios',
          'Escaneo de vulnerabilidades en dependencias y codigo',
          'Monitoreo post-deploy con alertas de regresion automaticas',
        ],
      },
    ],
    techStack: ['Playwright / Cypress', 'Jest / Testing Library', 'SonarQube', 'Lighthouse CI', 'Snyk', 'k6 / Artillery', 'Grafana', 'GitHub Actions CI'],
    specialties: ['Kaizen (mejora continua)', 'Root Cause Analysis (5 Porques)', 'QA Six Sigma', 'Deuda tecnica: medicion y reduccion', 'Load & performance testing', 'Security scanning', 'Quality gates automatizados', 'Retrospectivas de calidad'],
    mcpTools: [
      { name: 'Playwright', color: '#2EAD33' },
      { name: 'SonarQube', color: '#4E9BCD' },
      { name: 'Lighthouse', color: '#F44B21' },
      { name: 'Snyk', color: '#4C4A73' },
      { name: 'Grafana', color: '#F46800' },
      { name: 'Sentry', color: '#362D59' },
      { name: 'k6', color: '#7D64FF' },
      { name: 'GitHub Actions', color: '#2088FF' },
    ],
    relatedAreas: [
      { name: 'Desarrollo', color: '#06b6d4' },
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'DevOps', color: '#f97316' },
      { name: 'Seguridad', color: '#ef4444' },
      { name: 'Performance', color: '#eab308' },
      { name: 'Release', color: '#3b82f6' },
    ],
    stats: { speed: 70, precision: 99, creativity: 65, autonomy: 90 },
    quote: 'Cada bug es un proceso que fallo. Arregla el proceso, no solo el bug.',
    chatSlug: 'black-belt',
  },
  {
    slug: 'orion',
    codename: 'ORION',
    role: 'DevOps & Infrastructure',
    status: 'STANDBY',
    color: '#f97316',
    avatar: '/agents/orion.webp',
    briefing: 'Experto dual en automatizacion DevOps y confiabilidad de infraestructura. Transforma pesadillas de despliegue manual en flujos automatizados y fluidos, mientras asegura que las aplicaciones se mantengan rapidas, estables y escalables. Su experiencia abarca pipelines CI/CD, infraestructura como codigo, monitoreo, y la eliminacion total de friccion en el despliegue. Crea sistemas que se auto-reparan, auto-escalan y se auto-documentan.',
    responsibilities: [
      {
        title: 'Pipelines CI/CD',
        items: [
          'Crea pipelines multi-etapa (test, build, deploy) con jobs en paralelo',
          'Implementa mecanismos de rollback y compuertas de aprobacion',
          'Configura despliegues blue-green y lanzamientos canary',
          'Asegura ciclos de feedback rapidos (builds < 10 minutos)',
        ],
      },
      {
        title: 'Infraestructura como Codigo',
        items: [
          'Escribe templates de Terraform/CloudFormation reutilizables',
          'Gestiona secretos y configuraciones con sistemas vault',
          'Implementa testing de infraestructura antes de desplegar',
          'Disena para despliegues multi-entorno y zero-downtime',
        ],
      },
      {
        title: 'Monitoreo y Observabilidad',
        items: [
          'Implementa las Cuatro Senales Doradas (latencia, trafico, errores, saturacion)',
          'Configura dashboards en tiempo real y alertas inteligentes',
          'Establece tracing distribuido y seguimiento de SLA',
          'Crea protocolos de respuesta a incidentes con runbooks',
        ],
      },
      {
        title: 'Escalamiento y Optimizacion de Costos',
        items: [
          'Implementa auto-scaling basado en CPU >70%, memoria >85%, p95 >1s',
          'Analiza uso real vs provisionado para dimensionamiento correcto',
          'Aprovecha instancias spot/reservadas para ahorro del 30-70%',
          'Automatiza limpieza de recursos no utilizados',
        ],
      },
    ],
    techStack: ['GitHub Actions / GitLab CI', 'Docker / Kubernetes', 'Terraform / Pulumi', 'Datadog / Prometheus', 'AWS / GCP / Coolify', 'ELK Stack / CloudWatch'],
    specialties: ['CI/CD Pipelines', 'Docker & containers', 'Monitoreo & alertas', 'Auto-scaling', 'Seguridad de sistemas', 'Cloud architecture'],
    mcpTools: [
      { name: 'Docker', color: '#2496ED' },
      { name: 'Terraform', color: '#7B42BC' },
      { name: 'Kubernetes', color: '#326CE5' },
      { name: 'Datadog', color: '#632CA6' },
      { name: 'AWS', color: '#FF9900' },
    ],
    relatedAreas: [
      { name: 'Backend', color: '#06b6d4' },
      { name: 'Seguridad', color: '#ef4444' },
      { name: 'Desarrollo', color: '#3b82f6' },
      { name: 'Operaciones', color: '#f97316' },
      { name: 'Costos', color: '#eab308' },
      { name: 'Compliance', color: '#94a3b8' },
    ],
    stats: { speed: 80, precision: 95, creativity: 55, autonomy: 92 },
    quote: 'El mejor deploy es el que nadie nota.',
  },
  {
    slug: 'mars',
    codename: 'MARS',
    role: 'Growth & Launch',
    status: 'STANDBY',
    color: '#ef4444',
    avatar: '/agents/mars.webp',
    briefing: 'Hacker de crecimiento especializado en adquisicion rapida de usuarios, mecanicas virales y experimentacion basada en datos. Combina creatividad de marketing con rigor analitico para identificar y explotar oportunidades de crecimiento exponencial. Piensa en sistemas, no en tacticas. Los datos guian sus decisiones, no las opiniones. Velocidad de aprendizaje sobre perfeccion. Mentalidad de guerra para conquistar mercados.',
    responsibilities: [
      {
        title: 'Estrategia de Crecimiento',
        items: [
          'Disena marcos de crecimiento usando metricas pirata (AARRR)',
          'Identifica las palancas de crecimiento de mayor impacto',
          'Crea bucles virales y efectos de red autoperpetuantes',
          'Prioriza experimentos con el framework ICE (Impacto, Confianza, Esfuerzo)',
        ],
      },
      {
        title: 'Experimentacion y Tests A/B',
        items: [
          'Disena y ejecuta multiples experimentos de crecimiento en paralelo',
          'Realiza pruebas A/B en todo el recorrido del usuario',
          'Valida hipotesis con significancia estadistica real',
          'Escala experimentos exitosos rapidamente, mata los que fallan',
        ],
      },
      {
        title: 'Desarrollo de Canales',
        items: [
          'Optimiza canales organicos (SEO, viralidad social, comunidad)',
          'Gestiona canales pagados con optimizacion LTV:CAC',
          'Construye mecanismos de referidos y programas de compartir incentivados',
          'Hackea el crecimiento de otras plataformas (platform hacking)',
        ],
      },
      {
        title: 'Optimizacion de Conversion',
        items: [
          'Reduce tiempo hasta el primer valor y crea el "momento aja"',
          'Personaliza flujos de onboarding para maximizar activacion',
          'Construye funcionalidades que generan habitos y bucles de engagement',
          'Implementa campanas de recuperacion para reducir churn',
        ],
      },
    ],
    techStack: ['Google Analytics 4', 'Mixpanel / Amplitude', 'Optimizely / LaunchDarkly', 'Adjust / AppsFlyer', 'Hotjar / FullStory', 'Stripe Analytics'],
    specialties: ['Growth hacking', 'Lanzamiento de producto', 'SEO & ASO', 'Funnels de conversion', 'A/B testing', 'Marketing viral'],
    mcpTools: [
      { name: 'Google Analytics', color: '#E37400' },
      { name: 'Mixpanel', color: '#7856FF' },
      { name: 'SEMrush', color: '#FF642D' },
      { name: 'Mailchimp', color: '#FFE01B' },
      { name: 'Optimizely', color: '#0037FF' },
    ],
    relatedAreas: [
      { name: 'Marketing', color: '#ef4444' },
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Contenido', color: '#ec4899' },
      { name: 'Ventas', color: '#eab308' },
      { name: 'Datos', color: '#8b5cf6' },
      { name: 'Comunidad', color: '#10b981' },
    ],
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
    avatar: '/agents/luna.webp',
    briefing: 'Virtuosa del soporte al cliente que transforma la frustracion de los usuarios en lealtad a traves de soporte empatico, eficiente y perspicaz. Su experiencia abarca automatizacion de soporte, creacion de documentacion, gestion de sentimiento, y convertir interacciones de soporte en mejoras de producto. En la era de las quejas virales, una gran interaccion de soporte puede prevenir mil resenas negativas.',
    responsibilities: [
      {
        title: 'Infraestructura de Soporte',
        items: [
          'Crea documentos FAQ integrales y plantillas de auto-respuesta',
          'Disena sistemas de categorizacion de tickets y SLAs apropiados',
          'Construye rutas de escalamiento: usuario enojado + bug = desarrollador inmediato',
          'Configura soporte multicanal (email <4h, in-app, redes sociales)',
        ],
      },
      {
        title: 'Plantillas de Respuesta Empatica',
        items: [
          'Reconoce la frustracion del usuario empaticamente desde la apertura',
          'Proporciona soluciones claras paso a paso con capturas de pantalla',
          'Ofrece soluciones alternativas para problemas conocidos',
          'Cierra con refuerzo positivo y seguimiento proactivo',
        ],
      },
      {
        title: 'Automatizacion y Patrones',
        items: [
          'Identifica preguntas repetitivas y crea respuestas automatizadas',
          'Construye arboles de decision y scripts de chatbot para consultas basicas',
          'Rastrea tasas de exito de resolucion y refina continuamente',
          'Macros para los 10 problemas principales, reporte de bugs con captura automatica',
        ],
      },
      {
        title: 'Insights de Producto desde Soporte',
        items: [
          'Categoriza problemas por area de funcionalidad para el equipo de desarrollo',
          'Detecta solicitudes de funcionalidades disfrazadas de quejas',
          'Convierte resoluciones exitosas en testimonios y casos de estudio',
          'Identifica beta testers de entre usuarios comprometidos',
        ],
      },
    ],
    techStack: ['Intercom / Zendesk', 'Help Scout', 'Chatbots IA', 'Loom (videos)', 'Typeform (encuestas)', 'Notion (documentacion)'],
    specialties: ['Atencion al cliente', 'Gestion de tickets', 'FAQ automatizado', 'Onboarding de usuarios', 'Retencion', 'NPS tracking'],
    mcpTools: [
      { name: 'Intercom', color: '#6AFDEF' },
      { name: 'Zendesk', color: '#03363D' },
      { name: 'Notion', color: '#FFFFFF' },
      { name: 'Loom', color: '#625DF5' },
      { name: 'Typeform', color: '#262627' },
    ],
    relatedAreas: [
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Desarrollo', color: '#06b6d4' },
      { name: 'Marketing', color: '#ef4444' },
      { name: 'Operaciones', color: '#f97316' },
      { name: 'Comunidad', color: '#10b981' },
      { name: 'Ventas', color: '#eab308' },
    ],
    stats: { speed: 92, precision: 85, creativity: 65, autonomy: 80 },
    quote: 'Un cliente feliz es el mejor marketing.',
  },
  {
    slug: 'sia',
    codename: 'SIA',
    role: 'Content Creator',
    status: 'STANDBY',
    color: '#ec4899',
    avatar: '/agents/sia.webp',
    briefing: 'Creadora de contenido multiplataforma especializada en generacion de contenido desde articulos extensos hasta guiones de video y redes sociales. Sobresale adaptando mensajes a diferentes formatos mientras mantiene la voz de marca consistente. Usa el marco AIDA (Atencion, Interes, Deseo, Accion) y el modelo de multiplicacion: 1 pieza pilar se convierte en 10 publicaciones sociales, 3 articulos de blog, y 5 secuencias de email.',
    responsibilities: [
      {
        title: 'Estrategia de Contenido',
        items: [
          'Crea calendarios de contenido integrales con pilares tematicos',
          'Desarrolla pilares de contenido alineados con objetivos de marca',
          'Planifica series de contenido para engagement sostenido',
          'Disena flujos de reutilizacion para maximizar eficiencia',
        ],
      },
      {
        title: 'Creacion Multiformato',
        items: [
          'Articulos de blog: 1,500-3,000 palabras con 5-10 enlaces internos',
          'Guiones de video: gancho en 5 segundos, interrupciones cada 30 segundos',
          'Contenido social especifico por plataforma (LinkedIn B2B, Instagram visual, Twitter insights)',
          'Campanas de email: asunto <50 chars, un CTA claro, formato movil',
        ],
      },
      {
        title: 'SEO y Optimizacion',
        items: [
          'Investiga palabras clave para encontrar oportunidades de contenido',
          'Optimiza con palabra clave en titulo, H1 y primer parrafo',
          'Crea meta descripciones, URLs optimizadas y enlaces internos',
          'Estructura contenido con subtitulos escaneables e imagenes cada 300-400 palabras',
        ],
      },
      {
        title: 'Adaptacion Multiplataforma',
        items: [
          'LinkedIn: Conocimientos profesionales y liderazgo de pensamiento',
          'Instagram: Narrativa visual, behind-the-scenes y estilo de vida',
          'YouTube: Educacion a profundidad y valor de entretenimiento',
          'Flujo: Video -> Blog -> Carrusel social -> Secuencia de email',
        ],
      },
    ],
    techStack: ['WordPress / Ghost', 'Canva / Figma', 'Ahrefs / SEMrush', 'Buffer / Hootsuite', 'Mailchimp / ConvertKit', 'Google Analytics'],
    specialties: ['Copywriting', 'Guiones de video', 'SEO de contenido', 'Redes sociales', 'Email marketing', 'Estrategia de marca'],
    mcpTools: [
      { name: 'WordPress', color: '#21759B' },
      { name: 'Canva', color: '#00C4CC' },
      { name: 'Ahrefs', color: '#FF8C00' },
      { name: 'Buffer', color: '#168EEA' },
      { name: 'ConvertKit', color: '#FB6970' },
    ],
    relatedAreas: [
      { name: 'Marketing', color: '#ef4444' },
      { name: 'Diseno', color: '#a855f7' },
      { name: 'SEO', color: '#eab308' },
      { name: 'Redes Sociales', color: '#ec4899' },
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Marca', color: '#3b82f6' },
    ],
    stats: { speed: 88, precision: 78, creativity: 98, autonomy: 85 },
    quote: 'Las palabras correctas mueven montanas.',
  },
  {
    slug: 'saturn',
    codename: 'SATURN',
    role: 'Data Analytics',
    status: 'STANDBY',
    color: '#8b5cf6',
    avatar: '/agents/saturn.webp',
    briefing: 'Generador de insights basado en datos que transforma metricas crudas en ventajas estrategicas. Su experiencia abarca implementacion de analytics, analisis estadistico, visualizacion, y la traduccion de numeros en narrativas que impulsan la accion. Los datos no son solo para medir el exito; son para predecirlo, optimizarlo y saber cuando pivotar. Detras de cada metrica hay un impacto humano.',
    responsibilities: [
      {
        title: 'Infraestructura de Analytics',
        items: [
          'Disena esquemas integrales de event tracking para cada funcionalidad',
          'Implementa mapeo del customer journey y funnels de conversion',
          'Construye dashboards en tiempo real para metricas clave del negocio',
          'Establece monitoreo de calidad de datos con alertas',
        ],
      },
      {
        title: 'Inteligencia de Comportamiento',
        items: [
          'Realiza analisis de cohortes para patrones de retencion (D1, D7, D30)',
          'Rastrea adopcion de funcionalidades y optimiza flujos de usuario',
          'Crea modelos de puntuacion de engagement y prediccion de churn',
          'Desarrolla personas a partir de datos de comportamiento real',
        ],
      },
      {
        title: 'Analytics de Ingresos',
        items: [
          'Analiza caidas en funnels de conversion y tasas de fallo de pago',
          'Calcula LTV por segmento e identifica usuarios de alto valor',
          'Optimiza precios mediante analisis de elasticidad',
          'Rastrea metricas SaaS: MRR, churn, expansion, ARPU',
        ],
      },
      {
        title: 'Experimentacion y Forecasting',
        items: [
          'Disena tests A/B estadisticamente validos con tamanos de muestra correctos',
          'Interpreta resultados con intervalos de confianza, no solo p-values',
          'Construye modelos de proyeccion de crecimiento con indicadores adelantados',
          'Crea sistemas de alerta temprana para detectar problemas antes que escalen',
        ],
      },
    ],
    techStack: ['Mixpanel / Amplitude', 'Google Analytics 4', 'Tableau / Looker', 'RevenueCat / Stripe', 'Hotjar / FullStory', 'Python / SQL'],
    specialties: ['Business intelligence', 'Dashboards & reportes', 'Analisis de metricas', 'Prediccion de tendencias', 'KPIs & OKRs', 'Data storytelling'],
    mcpTools: [
      { name: 'Mixpanel', color: '#7856FF' },
      { name: 'Tableau', color: '#E97627' },
      { name: 'BigQuery', color: '#4285F4' },
      { name: 'Looker', color: '#4285F4' },
      { name: 'Python', color: '#3776AB' },
    ],
    relatedAreas: [
      { name: 'Producto', color: '#2dd4bf' },
      { name: 'Marketing', color: '#ef4444' },
      { name: 'Finanzas', color: '#eab308' },
      { name: 'Operaciones', color: '#f97316' },
      { name: 'Growth', color: '#22c55e' },
      { name: 'Ejecutivos', color: '#8b5cf6' },
    ],
    stats: { speed: 70, precision: 96, creativity: 72, autonomy: 90 },
    quote: 'Sin datos, solo eres una persona mas con una opinion.',
  },
];

export function getDossierAgent(slug: string): DossierAgent | undefined {
  return DOSSIER_AGENTS.find(a => a.slug === slug);
}
