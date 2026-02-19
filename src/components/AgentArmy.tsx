import agentBackbelt from "@/assets/agent-backbelt.jpg";
import agentAtlas from "@/assets/agent-atlas.jpg";
import agentFlux from "@/assets/agent-flux.jpg";
import agentJimmy from "@/assets/agent-jimmy.jpg";
import agentCarol from "@/assets/agent-carol.jpg";
import agentArthur from "@/assets/agent-arthur.jpg";
import agentSia from "@/assets/agent-sia.jpg";
import agentSentinel from "@/assets/agent-sentinel.jpg";
import agentLuna from "@/assets/agent-luna.jpg";

interface Agent {
  name: string;
  role: string;
  description: string;
  status: "Active" | "Inactive";
  avatar: string;
  currentTask: string;
  functionCall: string;
}

const agents: Agent[] = [
  {
    name: "Mercury",
    role: "BKLOG | Logística",
    description: "Extrae automáticamente datos de Bills of Lading. De 60 min de trabajo manual a 2 min. Mensajero veloz que procesa documentos.",
    status: "Active",
    avatar: agentBackbelt,
    currentTask: "Procesando BL de MSC Lome V - Booking EBKG14799005...",
    functionCall: "extract_bl(naviera='MSC', format='AGUNSA')",
  },
  {
    name: "Venus",
    role: "BKLOG | Cotizaciones",
    description: "Cotiza rutas aéreas, marítimas y terrestres consultando múltiples carriers. Atrae clientes con respuestas instantáneas.",
    status: "Active",
    avatar: agentCarol,
    currentTask: "Cotizando Santiago-Busan vía marítima reefer 40'...",
    functionCall: "quote_route(origin='CLSAI', dest='KRPUS', type='reefer')",
  },
  {
    name: "Neptune",
    role: "BKLOG | Supply Chain",
    description: "Predicción de demanda de contenedores. Gobierna los flujos y corrientes de la cadena de suministro.",
    status: "Active",
    avatar: agentFlux,
    currentTask: "Analizando demanda Q1 2026 para contenedores refrigerados...",
    functionCall: "forecast_demand(period='Q1_2026', type='reefer')",
  },
  {
    name: "Jupiter",
    role: "BKLOG | Integración",
    description: "Consume APIs de múltiples navieras para tracking automático. Expande conexiones como el gigante gaseoso.",
    status: "Active",
    avatar: agentAtlas,
    currentTask: "Sincronizando tracking de 12 contenedores en tránsito...",
    functionCall: "sync_tracking(carriers=['MSC','HLCU','MAEU'])",
  },
  {
    name: "Saturn",
    role: "Vergara y Compañía",
    description: "Automatiza consultas legales y generación de documentos. Estructura, reglas y governance como sus anillos ordenados.",
    status: "Active",
    avatar: agentLuna,
    currentTask: "Generando borrador de contrato de arrendamiento...",
    functionCall: "generate_contract(type='lease', client_id='VC_4521')",
  },
  {
    name: "Mars",
    role: "Simian Brokers",
    description: "Calificación de leads inmobiliarios y matchmaking. Conquista territorio en el mercado inmobiliario.",
    status: "Active",
    avatar: agentSia,
    currentTask: "Evaluando 8 leads nuevos y matching con propiedades...",
    functionCall: "qualify_leads(source='portal', match=true)",
  },
  {
    name: "Earth",
    role: "Infraestructura",
    description: "Gestión de servidores VPS y despliegue en Coolify. Base sólida y fundación de todo el sistema.",
    status: "Active",
    avatar: agentJimmy,
    currentTask: "Desplegando AIForwarding v2.1 a producción...",
    functionCall: "deploy(service='forwarding-ocr', env='prod')",
  },
  {
    name: "Uranus",
    role: "Ciberseguridad",
    description: "Auditorías de seguridad y detección de vulnerabilidades. Guardian innovador que protege el perímetro.",
    status: "Active",
    avatar: agentSentinel,
    currentTask: "Escaneando 4 servicios activos en VPS...",
    functionCall: "security_scan(targets=['api','web','db'], depth='full')",
  },
  {
    name: "Pluto",
    role: "Consultoría",
    description: "Diagnóstico profundo de procesos empresariales. Transformación radical desde los confines del sistema.",
    status: "Active",
    avatar: agentArthur,
    currentTask: "Analizando flujo de trabajo de broker inmobiliario...",
    functionCall: "analyze_workflow(client='simian', focus='lead_mgmt')",
  },
];

const AudioWave = () => (
  <div className="flex items-center gap-0.5 h-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="w-0.5 bg-success rounded-full animate-sound-wave"
        style={{
          height: '100%',
          animationDelay: `${i * 0.15}s`,
        }}
      />
    ))}
  </div>
);

const AgentArmy = () => {
  return (
    <section className="py-12 md:py-16 bg-foreground">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-background mb-4">
            Proyectos en Acción
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Director de IA activo en Logística, Legal, Inmobiliaria y Ciberseguridad. Cada agente está diseñado para resolver problemas específicos de cada industria, operando 24/7 bajo supervisión humana.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {agents.map((agent, index) => (
            <div 
              key={agent.name} 
              className={`relative rounded-xl overflow-hidden group cursor-pointer aspect-[3/4] ${
                index === agents.length - 1 ? 'col-span-2 md:col-span-1 max-w-[50%] mx-auto md:max-w-none' : ''
              }`}
            >
              {/* Avatar Image */}
              <img 
                src={agent.avatar} 
                alt={agent.name}
                loading="lazy"
                width={201}
                height={268}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Blue Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/60 to-blue-600/30"></div>
              
              {/* Status Indicator with Audio Wave */}
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <AudioWave />
                  <span className="text-xs text-white/90 font-medium">Speaking</span>
                </div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3">
                {/* Function Call Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                  <span className="text-success text-xs">@</span>
                  <code className="text-xs text-white/90 font-mono">{agent.functionCall}</code>
                </div>
                
                {/* Current Task */}
                <p className="text-white/90 text-sm leading-relaxed">
                  {agent.currentTask}
                </p>
                
                {/* Agent Info */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <p className="text-xs text-cyan-300 font-medium">{agent.role}</p>
                  </div>
                  <AudioWave />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentArmy;
