import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BlogPostData {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  content: JSX.Element;
}

const blogPostsContent: Record<string, BlogPostData> = {
  "niveles-madurez-ai": {
    id: "niveles-madurez-ai",
    title: "Los 5 Niveles de Madurez en IA: ¿Dónde Está Tu Empresa?",
    date: "2025-12-28",
    category: "Marcos de Trabajo",
    readTime: "10 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            En 2026, la diferencia entre empresas que prosperan y las que se estancan no será{" "}
            <span className="font-bold text-primary">si usan IA</span>, sino{" "}
            <span className="font-bold text-primary">cómo la usan</span>. Este marco de 5 niveles de madurez te ayuda a entender dónde estás y qué viene después.
          </p>
        </div>

        {/* Introducción */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          El Modelo AIMM: Un Marco para Pensar sobre IA y Trabajo
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Daniel Miessler creó el <span className="font-semibold">AI Maturity Model (AIMM)</span> para mapear cómo evoluciona la relación entre humanos e IA en el trabajo. No es un camino que todas las empresas seguirán a la misma velocidad, pero sí describe una progresión clara desde trabajo completamente manual hasta sistemas donde la IA gestiona la mayoría de las operaciones.
        </p>

        <p className="text-lg text-foreground/80 leading-relaxed mb-12">
          Este modelo no es una predicción rígida de fechas, sino una forma de pensar sobre la madurez organizacional en IA. Algunas industrias ya están en Nivel 3, mientras otras apenas empiezan el Nivel 1.
        </p>

        {/* Nivel 0: Natural */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">0</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Natural</h3>
              <p className="text-sm text-muted-foreground">→ 2022 | Trabajo centrado en el humano</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            El humano hace todo el trabajo completamente por su cuenta, sin ninguna asistencia de IA.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-3">Características:</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>• Procesos completamente manuales</li>
              <li>• Conocimiento almacenado en cabezas de empleados y documentos estáticos</li>
              <li>• Escalabilidad limitada por horas humanas disponibles</li>
              <li>• Herramientas básicas: Excel, email, documentos</li>
            </ul>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <p className="text-base text-foreground/70 italic">
              <span className="font-semibold text-foreground">Ejemplo:</span> Un broker logístico en 2021 copiando manualmente datos de Bills of Lading a Excel, enviando cotizaciones por email, actualizando planillas de seguimiento a mano. Sin automatización, sin IA.
            </p>
          </div>
        </div>

        {/* Nivel 1: Chatbots */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Chatbots</h3>
              <p className="text-sm text-muted-foreground">2023 | Trabajo centrado en el humano + IA consultiva</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            El humano pregunta y obtiene respuestas útiles de un sistema tipo chatbot de IA. La IA es un <span className="font-semibold">consultor</span>, no un ejecutor.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-3">Características:</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>• ChatGPT, Claude, Gemini como asistentes</li>
              <li>• La IA explica, sugiere, redacta borradores</li>
              <li>• El humano sigue haciendo todo el trabajo de ejecución</li>
              <li>• Útil para: escribir emails, resumir documentos, generar ideas</li>
            </ul>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-yellow-700 dark:text-yellow-500 mb-3">⚠️ La Trampa del Nivel 1:</h4>
            <p className="text-foreground/70">
              Muchas empresas piensan que "ya usan IA" porque tienen acceso a ChatGPT. Pero si la IA solo responde preguntas y tú haces todo el trabajo, sigues en Nivel 1. <span className="font-semibold">La IA como calculadora científica cara.</span>
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <p className="text-base text-foreground/70 italic">
              <span className="font-semibold text-foreground">Ejemplo:</span> El mismo broker ahora usa ChatGPT para redactar emails más profesionales y resumir PDFs largos. Ahorra tiempo, pero sigue copiando datos manualmente y ejecutando todas las tareas.
            </p>
          </div>
        </div>

        {/* Nivel 2: Agentic */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-primary/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Agentic</h3>
              <p className="text-sm text-muted-foreground">2025-2027? | Transición crítica</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Las plataformas agénticas <span className="font-semibold">magnifican la efectividad de las personas</span> al aprender las tareas, el contexto y las herramientas. La IA ya no solo aconseja: <span className="font-bold text-primary">ejecuta</span>.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-3">Características:</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>• Los agentes tienen acceso a herramientas específicas (APIs, bases de datos, archivos)</li>
              <li>• Entienden contexto y pueden tomar decisiones dentro de límites definidos</li>
              <li>• Completan tareas de principio a fin bajo supervisión humana</li>
              <li>• El humano delega tareas concretas, no solo pregunta</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg p-6 mb-6 border border-primary/20">
            <h4 className="font-bold text-primary mb-3">🎯 El Salto Cuántico:</h4>
            <p className="text-foreground/80 leading-relaxed">
              Este es el nivel donde <span className="font-bold">la productividad se multiplica exponencialmente</span>. Un empleado supervisando 5 agentes puede hacer el trabajo que antes requería un equipo de 10 personas. Pero el rollout es desigual: algunas industrias avanzan rápido (tech, logística), otras van despacio (legal, salud).
            </p>
          </div>

          <div className="border-l-4 border-primary pl-6">
            <p className="text-base text-foreground/70 italic mb-3">
              <span className="font-semibold text-foreground">Ejemplo: AIForwarding en BKLOG</span>
            </p>
            <p className="text-sm text-foreground/60">
              Mercury (agente) recibe un Bill of Lading en PDF. Lo lee, extrae los datos críticos, los normaliza según el formato de la naviera (MSC, Maersk, COSCO), llena la matriz Excel y notifica "Listo, booking EBKG14799005 procesado". De 60 minutos manuales a 2 minutos automáticos. El operador humano solo revisa y aprueba.
            </p>
          </div>
        </div>

        {/* Nivel 3: Workflows */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-600">3</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Workflows</h3>
              <p className="text-sm text-muted-foreground">2027? | Trabajo centrado en IA</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            La mayoría del trabajo se descompone en tareas y pipelines automatizables que pueden ser ejecutados consistentemente por IA. Los humanos diseñan, supervisan y ajustan los workflows, pero ya no ejecutan.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-3">Características:</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>• Flujos de trabajo completos operan autónomamente</li>
              <li>• Múltiples agentes coordinados ejecutan procesos complejos</li>
              <li>• Intervención humana solo en excepciones y decisiones estratégicas</li>
              <li>• La empresa opera como una "línea de ensamblaje digital"</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-6">
            <p className="text-base text-foreground/70 italic">
              <span className="font-semibold text-foreground">Ejemplo:</span> Un broker logístico donde TODO el proceso desde cotización → booking → seguimiento → facturación corre automáticamente. El humano solo interviene cuando un cliente tiene una solicitud especial o cuando hay una excepción en customs.
            </p>
          </div>
        </div>

        {/* Nivel 4: Managed */}
        <div className="bg-muted/30 rounded-xl p-8 mb-12 border border-border/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-600">4</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">Managed</h3>
              <p className="text-sm text-muted-foreground">2030? | Trabajo centrado en IA + Gobernanza continua</p>
            </div>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            La IA captura el estado actual y deseado de la organización, y continuamente hace ajustes para optimizar operaciones. El sistema se auto-gestiona dentro de parámetros definidos.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-3">Características:</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>• La IA monitorea KPIs y ajusta estrategias automáticamente</li>
              <li>• Predicción proactiva de problemas y oportunidades</li>
              <li>• Aprendizaje continuo del sistema basado en resultados</li>
              <li>• Humanos definen visión y objetivos, IA ejecuta y optimiza</li>
            </ul>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <p className="text-foreground/70 leading-relaxed">
              <span className="font-semibold text-foreground">Nota:</span> Este nivel suena futurista, pero ya existe en dominios específicos: trading algorítmico, optimización de supply chains en tiempo real, gestión dinámica de precios en ecommerce. La diferencia es que en 2030 esto será la norma, no la excepción.
            </p>
          </div>
        </div>

        {/* ¿Dónde está tu empresa? */}
        <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            ¿Dónde Está Tu Empresa?
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-primary mb-2">Si estás en Nivel 0-1:</h3>
              <p className="text-foreground/70">
                No estás solo. La mayoría de las empresas todavía operan aquí. Pero la brecha con competidores en Nivel 2 se amplía rápidamente. <span className="font-semibold">El primer paso es identificar UN proceso crítico y llevarlo a Nivel 2 (Agentic)</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-primary mb-2">Si estás en Nivel 2:</h3>
              <p className="text-foreground/70">
                Estás en la vanguardia. Ahora el desafío es escalar: de 1-2 agentes a sistemas completos (Nivel 3). Esto requiere cambio cultural, no solo tecnología. <span className="font-semibold">Necesitas un Director de IA que orqueste la transición</span>.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-primary mb-2">Si estás en Nivel 3-4:</h3>
              <p className="text-foreground/70">
                Probablemente eres una empresa tech o tienes recursos significativos dedicados a IA. El reto ahora es governance: asegurar que los sistemas autónomos operen de forma ética, segura y alineada con objetivos empresariales.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusión */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            La Velocidad Importa
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            En 2026, la ventaja competitiva no vendrá de <span className="font-semibold">usar IA</span>, sino de <span className="font-bold text-primary">saber orquestarla</span>.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Empresas en Nivel 2 operan con 10x la productividad de las que están en Nivel 0-1. No es una diferencia marginal. Es exponencial.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed">
            La pregunta no es "¿debería usar IA?" sino <span className="font-bold text-primary">"¿En qué nivel estoy y cómo subo al siguiente?"</span>
          </p>
        </div>
      </>
    ),
  },

  "infraestructura-personal-ai": {
    id: "infraestructura-personal-ai",
    title: "Infraestructura Personal de IA: Más Allá de ChatGPT",
    date: "2026-01-05",
    category: "Infraestructura AI",
    readTime: "8 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            La mayoría usa ChatGPT como una <span className="font-semibold text-foreground/70">calculadora científica cara</span>: preguntan, reciben una respuesta, copian y pegan. <span className="font-bold text-primary">Esto no es infraestructura personal de IA.</span>
          </p>
        </div>

        {/* El Problema */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          El Problema con "Solo Usar ChatGPT"
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Cuando Daniel Miessler habla de <span className="font-semibold">Personal AI Infrastructure</span>, no se refiere a tener una suscripción Pro de ChatGPT. Se refiere a construir un <span className="font-bold text-primary">sistema completo de agentes especializados</span> que trabajan para ti 24/7, anclados a tu contexto personal y profesional.
        </p>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-yellow-700 dark:text-yellow-500 mb-4">⚠️ La Trampa de ChatGPT</h3>
          <div className="space-y-3 text-foreground/70">
            <p>• <span className="font-semibold text-foreground">Sin memoria persistente:</span> Cada conversación empieza desde cero</p>
            <p>• <span className="font-semibold text-foreground">Sin acceso a tus sistemas:</span> No puede leer tus emails, actualizar tu CRM, procesar documentos</p>
            <p>• <span className="font-semibold text-foreground">Solo responde cuando preguntas:</span> Es reactivo, no proactivo</p>
            <p>• <span className="font-semibold text-foreground">General, no especializado:</span> Intenta ser bueno en todo, maestro en nada</p>
          </div>
        </div>

        {/* ¿Qué es Infraestructura Personal de IA? */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          ¿Qué es una Verdadera Infraestructura Personal de IA?
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-8">
          Una infraestructura personal de IA es un <span className="font-bold text-primary">ecosistema de agentes especializados</span> que conocen tu contexto, tienen acceso a tus herramientas, y trabajan continuamente en segundo plano. No es un asistente genérico, es tu equipo digital personal.
        </p>

        {/* Los 3 Pilares */}
        <div className="space-y-8 mb-12">
          <div className="bg-muted/30 rounded-xl p-8 border border-border/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Agentes Especializados (no generalistas)</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  En lugar de "un ChatGPT para todo", tienes múltiples agentes, cada uno experto en un dominio específico:
                </p>
                <ul className="space-y-2 text-foreground/60 ml-4">
                  <li>• <span className="font-semibold text-foreground">Agente Email:</span> Monitorea bandeja, prioriza urgentes, redacta respuestas contextuales</li>
                  <li>• <span className="font-semibold text-foreground">Agente Research:</span> Rastrea tendencias de tu industria, envía resúmenes diarios</li>
                  <li>• <span className="font-semibold text-foreground">Agente Calendar:</span> Optimiza agenda, prepara briefings pre-reunión</li>
                  <li>• <span className="font-semibold text-foreground">Agente Sales:</span> Califica leads, actualiza CRM, sugiere follow-ups</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-8 border border-border/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Anclada a TU Contexto</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  Los agentes conocen tu negocio, tus objetivos, tu estilo de comunicación, tus contactos clave. No empiezan desde cero cada vez.
                </p>
                <div className="bg-background/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground/60 italic">
                    <span className="font-semibold text-foreground">Ejemplo:</span> Tu agente de email sabe que los mensajes de "Angela" (tu cliente más grande) son prioridad máxima. Sabe que tu tono con clientes es formal pero cercano. Sabe que los viernes no agendas reuniones después de las 3pm. Todo esto lo aprendió de tu historial, preferencias y feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-8 border border-border/50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Operación Continua (no solo bajo demanda)</h3>
                <p className="text-foreground/70 leading-relaxed mb-4">
                  Los agentes trabajan 24/7, incluso cuando duermes. Son proactivos, no solo reactivos.
                </p>
                <div className="bg-background/50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-foreground/60">
                    <span className="font-semibold text-foreground">Escenario:</span> Mientras duermes, tu agente de research detecta que un competidor lanzó un producto nuevo. Analiza la estrategia, compara con tu oferta, y te envía un brief a las 7am con recomendaciones de cómo responder. Cuando despiertas, ya tienes la inteligencia que necesitas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Caso Real */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Caso Real: De Emprendedor Solo a Equipo Digital</h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <h3 className="font-bold text-foreground">Antes (Solo ChatGPT):</h3>
              </div>
              <p className="text-foreground/70 pl-5">
                Emprendedor con 8 horas/día para: prospección, ventas, desarrollo de producto, marketing, operaciones. <span className="text-red-500 font-semibold">Imposible escalar</span>. ChatGPT ayuda a redactar emails más rápido, pero sigue haciendo todo manualmente.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <h3 className="font-bold text-foreground">Después (Infraestructura Personal de IA):</h3>
              </div>
              <ul className="text-foreground/70 space-y-2 pl-5">
                <li>• <span className="font-semibold text-foreground">Agente Lead Gen:</span> Rastrea LinkedIn/Twitter por leads que cumplen ICP, los agrega al CRM</li>
                <li>• <span className="font-semibold text-foreground">Agente Outreach:</span> Envía secuencias personalizadas, hace follow-up automático</li>
                <li>• <span className="font-semibold text-foreground">Agente Content:</span> Genera borradores de posts basados en trending topics</li>
                <li>• <span className="font-semibold text-foreground">Agente Analytics:</span> Monitorea métricas, alerta cuando algo cae fuera de rango</li>
              </ul>
              <p className="text-success font-semibold mt-4 pl-5">
                Resultado: El emprendedor se enfoca en 2 cosas (ventas estratégicas y desarrollo de producto). Los agentes manejan el resto.
              </p>
            </div>
          </div>
        </div>

        {/* Cómo Empezar */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Cómo Empezar a Construir Tu Infraestructura Personal
        </h2>

        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Identifica tu cuello de botella más grande</h3>
              <p className="text-foreground/70">
                ¿Qué tarea repetitiva te consume más tiempo? ¿Email? ¿Prospección? ¿Investigación? Empieza ahí. No intentes automatizar todo a la vez.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Construye UN agente especializado primero</h3>
              <p className="text-foreground/70">
                No necesitas 10 agentes desde el día 1. Empieza con uno que resuelva ese cuello de botella. Perfecciónalo. Luego escala.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">3</div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Dale contexto rico desde el inicio</h3>
              <p className="text-foreground/70">
                Documenta tus preferencias, objetivos, estilo. Mientras más contexto tenga el agente, mejor funcionará. Esto no es opcional.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">4</div>
            <div>
              <h3 className="font-bold text-foreground mb-2">Itera basado en feedback real</h3>
              <p className="text-foreground/70">
                Los agentes mejoran con uso. No esperes perfección desde el día 1. Ajusta, refina, optimiza continuamente.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusión */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            El Futuro es Personal
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            En 2026, la ventaja competitiva no será tener acceso a IA (todos lo tienen). Será tener <span className="font-bold text-primary">tu propia infraestructura de IA</span>, personalizada, especializada, y trabajando incansablemente para ti.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            ChatGPT es un excelente punto de partida. Pero quedarse ahí es como tener una calculadora y pensar que ya tienes un departamento de finanzas.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed">
            La pregunta no es "¿debería usar IA?" sino <span className="font-bold text-primary">"¿Cuándo empiezo a construir mi infraestructura personal?"</span>
          </p>
        </div>
      </>
    ),
  },

  "caso-bklog-aiforwarding": {
    id: "caso-bklog-aiforwarding",
    title: "Caso BKLOG: De 60 Minutos a 2 Minutos por BL",
    date: "2026-01-03",
    category: "Casos de Estudio",
    readTime: "12 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            Cómo un broker logístico chileno <span className="font-bold text-primary">ahorró 40 horas mensuales</span> automatizando el procesamiento de Bills of Lading con un sistema de agentes de IA. Un caso real de Nivel 1 (Chatbots) a Nivel 2 (Agentic).
          </p>
        </div>

        {/* Contexto */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          El Contexto: BKLOG
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          BKLOG es un broker logístico chileno especializado en comercio exterior. Como intermediario entre importadores/exportadores y navieras, su trabajo crítico incluye procesar <span className="font-semibold">Bills of Lading (BL)</span> - el documento legal que confirma el embarque de mercancía.
        </p>

        <div className="bg-muted/30 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-primary mb-3">¿Qué es un Bill of Lading (BL)?</h3>
          <p className="text-foreground/70 text-sm">
            Un BL es el documento más importante en comercio exterior marítimo. Contiene: datos del shipper, consignee, descripción de mercancía, puerto de origen/destino, número de contenedores, fecha de embarque, etc. Cada naviera (MSC, Maersk, Hapag-Lloyd, COSCO) tiene su propio formato de matriz Excel donde el broker debe copiar estos datos para generar el booking.
          </p>
        </div>

        {/* El Problema */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          El Problema: Trabajo Manual Repetitivo
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Antes de AIForwarding, el proceso era completamente manual:
        </p>

        <div className="space-y-4 mb-12">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <div>
              <p className="text-foreground/80">
                <span className="font-semibold text-foreground">Paso 1:</span> Cliente envía BL en PDF (puede ser 2-15 páginas, en inglés)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <div>
              <p className="text-foreground/80">
                <span className="font-semibold text-foreground">Paso 2:</span> Operador abre el PDF, busca manualmente cada campo crítico
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <div>
              <p className="text-foreground/80">
                <span className="font-semibold text-foreground">Paso 3:</span> Identifica la naviera (MSC, Maersk, COSCO, etc.) y descarga la matriz Excel correspondiente
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <div>
              <p className="text-foreground/80">
                <span className="font-semibold text-foreground">Paso 4:</span> Copia manualmente cada dato del BL a las celdas específicas de la matriz (cada naviera tiene formato diferente)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
            <div>
              <p className="text-foreground/80">
                <span className="font-semibold text-foreground">Paso 5:</span> Valida que no haya errores de tipeo (crítico: un error en número de contenedor puede costar miles de dólares)
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-12">
          <h3 className="font-bold text-red-700 dark:text-red-400 mb-4">⏱️ Tiempo Total: 30-60 minutos por BL</h3>
          <div className="space-y-2 text-foreground/70 text-sm">
            <p>• BKLOG procesa ~50 BLs mensuales</p>
            <p>• Promedio 45 minutos por BL = <span className="font-bold text-foreground">37.5 horas/mes de trabajo operativo puro</span></p>
            <p>• Propenso a errores humanos (cansancio, distracción)</p>
            <p>• Escala linealmente (más BLs = más horas humanas necesarias)</p>
          </div>
        </div>

        {/* La Solución */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          La Solución: AIForwarding
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          AIForwarding es un sistema de agentes de IA construido específicamente para automatizar el procesamiento de BLs. No es un chatbot. Es un <span className="font-bold text-primary">agente agentic</span> que ejecuta tareas de principio a fin.
        </p>

        {/* Arquitectura */}
        <div className="bg-muted/30 rounded-xl p-8 mb-12 border border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-6">Arquitectura del Sistema</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-2">1. Agente Mercury (Extracción)</h4>
              <p className="text-foreground/70 text-sm mb-3">
                Recibe el PDF del BL, usa OCR + LLM para extraer datos estructurados. Sabe identificar campos clave incluso si el formato varía.
              </p>
              <div className="bg-background/50 rounded-lg p-3">
                <code className="text-xs text-foreground/60">
                  extract_bl(naviera='MSC', pdf_path='BL_12345.pdf')
                  <br />→ Returns: {'{'} shipper, consignee, vessel, voyage, containers, etc. {'}'}
                </code>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-2">2. Agente Normalizer (Validación y Normalización)</h4>
              <p className="text-foreground/70 text-sm mb-3">
                Valida que los datos extraídos sean coherentes. Normaliza formatos (fechas, códigos de puerto, etc.) según estándar de cada naviera.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-2">3. Agente Matrix Filler (Generación de Matriz)</h4>
              <p className="text-foreground/70 text-sm mb-3">
                Conoce el formato de matriz Excel de cada naviera. Llena automáticamente cada celda en la posición correcta. Genera el archivo listo para enviar.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-2">4. Sistema de Supervisión Humana</h4>
              <p className="text-foreground/70 text-sm">
                El operador humano recibe la matriz pre-llenada, revisa en 2 minutos, aprueba o corrige si hay excepción. El sistema aprende de las correcciones.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Resultados Cuantificables
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl p-6 border border-red-500/30">
            <div className="text-4xl font-bold text-red-600 mb-2">60 min</div>
            <div className="text-sm text-foreground/60 mb-4">Tiempo promedio por BL (antes)</div>
            <ul className="text-xs text-foreground/50 space-y-1">
              <li>• Trabajo 100% manual</li>
              <li>• Propenso a errores</li>
              <li>• No escalable</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-success/10 to-emerald-600/10 rounded-xl p-6 border border-success/30">
            <div className="text-4xl font-bold text-success mb-2">2 min</div>
            <div className="text-sm text-foreground/60 mb-4">Tiempo promedio por BL (después)</div>
            <ul className="text-xs text-foreground/50 space-y-1">
              <li>• Extracción automática</li>
              <li>• Revisión humana rápida</li>
              <li>• Escala sin costo marginal</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-xl p-8 mb-12 border border-cyan-500/30">
          <h3 className="text-2xl font-bold text-foreground mb-6">Impacto Total</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <span className="text-foreground/70">BLs procesados mensualmente</span>
              <span className="font-bold text-foreground">50</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <span className="text-foreground/70">Tiempo ahorrado por BL</span>
              <span className="font-bold text-success">58 minutos</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <span className="text-foreground/70">Total horas ahorradas/mes</span>
              <span className="font-bold text-success text-2xl">40 horas</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-border/30">
              <span className="text-foreground/70">Reducción de errores</span>
              <span className="font-bold text-success">~85%</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-foreground/70">ROI del proyecto</span>
              <span className="font-bold text-primary text-xl">Positivo en 2 meses</span>
            </div>
          </div>
        </div>

        {/* Lecciones Aprendidas */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Lecciones Aprendidas
        </h2>

        <div className="space-y-6 mb-12">
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">1. Empezar con UN proceso crítico</h3>
            <p className="text-foreground/70 text-sm">
              BKLOG no intentó automatizar todo a la vez. Identificaron el cuello de botella más grande (procesamiento de BLs) y empezaron ahí. Luego escalarán a otras tareas.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">2. Supervisión humana es crítica (al inicio)</h3>
            <p className="text-foreground/70 text-sm">
              Los primeros 2 meses, el operador revisaba cada matriz generada. El sistema aprendió de las correcciones. Ahora la tasa de error es menor al 5% y solo requiere revisión ligera.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">3. El ROI no es solo tiempo ahorrado</h3>
            <p className="text-foreground/70 text-sm">
              Sí, ahorraron 40 horas/mes. Pero el beneficio real es que el operador humano ahora se enfoca en <span className="font-semibold text-foreground">negociación comercial y atención al cliente</span> - tareas de alto valor. Los agentes manejan lo operativo.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">4. La especialización importa</h3>
            <p className="text-foreground/70 text-sm">
              AIForwarding NO es un chatbot genérico. Es un sistema especializado que conoce formatos de navieras, códigos de puerto, validaciones específicas de logística. Esa especialización es lo que genera valor real.
            </p>
          </div>
        </div>

        {/* Conclusión */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            ¿Es Esto Escalable a Tu Industria?
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Si en tu operación hay <span className="font-bold text-primary">tareas repetitivas con reglas claras</span> (procesar facturas, calificar leads, generar reportes, actualizar bases de datos), la respuesta es sí.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            No necesitas ser una empresa tech. BKLOG es un broker logístico tradicional. Lo que necesitas es:
          </p>

          <ul className="space-y-3 mb-6 pl-6">
            <li className="text-foreground/70">• Identificar el cuello de botella más costoso</li>
            <li className="text-foreground/70">• Construir (o contratar a alguien que construya) un agente especializado</li>
            <li className="text-foreground/70">• Iterar basado en feedback real</li>
            <li className="text-foreground/70">• Escalar una vez que funciona</li>
          </ul>

          <p className="text-lg text-foreground/80 leading-relaxed">
            BKLOG pasó de Nivel 1 (usando ChatGPT para redactar emails) a Nivel 2 (agentes ejecutando procesos completos). El salto en productividad es <span className="font-bold text-primary">exponencial, no lineal</span>.
          </p>
        </div>
      </>
    ),
  },

  "agentes-vs-automatizacion": {
    id: "agentes-vs-automatizacion",
    title: "Agentes vs Automatización: La Diferencia que Nadie Explica",
    date: "2025-12-20",
    category: "Fundamentos de IA",
    readTime: "6 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground/70">La automatización ejecuta instrucciones.</span><br />
            <span className="font-bold text-primary">Los agentes toman decisiones.</span><br />
            <span className="text-foreground/60">Entender esta diferencia es fundamental para saber cuándo usar cada uno.</span>
          </p>
        </div>

        {/* El Problema */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          El Problema: Confundir Agentes con Automatización
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Muchas empresas dicen "tenemos agentes de IA" cuando en realidad tienen scripts de automatización tradicional. La diferencia no es semántica. Es fundamental. Y determina si obtienes <span className="font-semibold">mejoras incrementales</span> o <span className="font-bold text-primary">saltos exponenciales</span> en productividad.
        </p>

        {/* Comparación */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-muted/30 rounded-xl p-8 border border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-2xl">🔧</span>
              </div>
              Automatización Tradicional
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Cómo funciona:</h4>
                <p className="text-sm text-foreground/70">
                  Si [condición exacta], entonces [acción específica]. Reglas fijas, flujo predefinido.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Ejemplo:</h4>
                <div className="bg-background/50 rounded-lg p-3 text-xs text-foreground/60">
                  Si email contiene "factura" Y remitente es "@proveedor.com"<br />
                  → Mover a carpeta "Facturas"<br />
                  → Marcar como importante
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Limitaciones:</h4>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• No maneja ambigüedad</li>
                  <li>• Reglas rígidas (si cambias proceso, reescribes código)</li>
                  <li>• No aprende de contexto</li>
                  <li>• Falla con inputs inesperados</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-xl p-8 border border-primary/30">
            <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              Agentes de IA
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-primary mb-2">Cómo funciona:</h4>
                <p className="text-sm text-foreground/70">
                  Dado [objetivo] y [contexto], el agente decide qué acciones tomar para lograrlo. Razonamiento, no reglas.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Ejemplo:</h4>
                <div className="bg-background/50 rounded-lg p-3 text-xs text-foreground/60">
                  Objetivo: "Gestionar facturas entrantes"<br />
                  → Agente lee email, entiende contexto<br />
                  → Decide: ¿Es urgente? ¿Duplicada? ¿Monto correcto?<br />
                  → Ejecuta acciones apropiadas según caso
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-primary mb-2">Ventajas:</h4>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• Maneja ambigüedad y casos edge</li>
                  <li>• Se adapta a contexto cambiante</li>
                  <li>• Aprende de patrones</li>
                  <li>• Puede razonar sobre situaciones nuevas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* La Diferencia Clave */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          La Diferencia Clave: Razonamiento vs Reglas
        </h2>

        <div className="bg-muted/30 rounded-xl p-8 mb-12 border border-border/50">
          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            La automatización tradicional es <span className="font-semibold">determinística</span>: dado el mismo input, siempre ejecuta la misma acción.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            Los agentes son <span className="font-semibold text-primary">contextuales</span>: dado el mismo input pero diferente contexto, pueden tomar decisiones diferentes.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mt-6">
            <h4 className="font-bold text-foreground mb-3">Ejemplo Concreto:</h4>
            <p className="text-sm text-foreground/70 mb-4">
              Llega un email: "Necesito la factura de diciembre urgente"
            </p>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-blue-600 mb-1">Automatización tradicional:</p>
                <p className="text-xs text-foreground/60">
                  No sabe qué hacer (no coincide con regla "email contiene palabra 'factura' Y remitente es proveedor"). Deja el email sin procesar.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-primary mb-1">Agente de IA:</p>
                <p className="text-xs text-foreground/60">
                  Entiende la intención ("solicitud de factura"). Busca en el sistema facturas de diciembre. Identifica al remitente. Decide si puede enviarla automáticamente o requiere aprobación humana (depende del contexto: ¿es cliente autorizado? ¿factura confidencial?). Ejecuta la acción apropiada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cuándo Usar Cada Uno */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          ¿Cuándo Usar Automatización vs Agentes?
        </h2>

        <div className="space-y-6 mb-12">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-4">✅ Usa Automatización Tradicional cuando:</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li>• El proceso es completamente predecible (mismos pasos, siempre)</li>
              <li>• No hay ambigüedad en inputs</li>
              <li>• Las reglas NUNCA cambian</li>
              <li>• Necesitas máxima velocidad (los agentes son más lentos)</li>
              <li>• El costo de error es muy alto (automatización es más determinística)</li>
            </ul>
            <p className="text-xs text-foreground/50 mt-4 italic">
              Ejemplo: Backup automático de base de datos cada noche a las 2am. No necesitas un agente que "decida" si hacer backup o no. Siempre debe ejecutarse.
            </p>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
            <h3 className="font-bold text-primary mb-4">🤖 Usa Agentes de IA cuando:</h3>
            <ul className="space-y-2 text-foreground/70 text-sm">
              <li>• El proceso requiere <span className="font-semibold text-foreground">juicio contextual</span></li>
              <li>• Hay variabilidad en inputs (diferentes formatos, estilos, idiomas)</li>
              <li>• Las reglas son difusas o cambian frecuentemente</li>
              <li>• Necesitas manejar excepciones inteligentemente</li>
              <li>• El valor está en la decisión, no solo en la ejecución</li>
            </ul>
            <p className="text-xs text-foreground/50 mt-4 italic">
              Ejemplo: Calificación de leads. Cada lead es diferente. Requiere entender contexto (industria, tamaño, timing, señales de intención). Un agente puede razonar sobre el lead completo y decidir prioridad. Una regla fija ("si título contiene CEO → lead caliente") es demasiado simplista.
            </p>
          </div>
        </div>

        {/* El Futuro */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">El Futuro: Híbridos</h2>

          <p className="text-foreground/80 leading-relaxed mb-4">
            Los sistemas más poderosos combinan ambos:
          </p>

          <ul className="space-y-3 text-foreground/70">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span><span className="font-semibold text-foreground">Agentes para decisiones complejas</span> (qué hacer, cuándo hacerlo, cómo priorizarlo)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">•</span>
              <span><span className="font-semibold text-foreground">Automatización para ejecución confiable</span> (una vez decidido, ejecutar rápido y sin errores)</span>
            </li>
          </ul>

          <div className="bg-background/50 rounded-lg p-4 mt-6">
            <p className="text-sm text-foreground/60 italic">
              <span className="font-semibold text-foreground">Ejemplo:</span> En AIForwarding (BKLOG), el agente Mercury decide qué datos extraer del BL y cómo normalizarlos (decisión contextual). Luego un script automatizado llena la matriz Excel en las celdas exactas (ejecución predecible). El agente piensa, la automatización ejecuta.
            </p>
          </div>
        </div>

        {/* Conclusión */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            La Pregunta Correcta
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            No es "¿debería automatizar o usar agentes?" La pregunta correcta es:
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
            <p className="text-xl font-bold text-primary text-center">
              "¿Esta tarea requiere juicio contextual o solo ejecución determinística?"
            </p>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mt-8">
            Si requiere juicio → agente.<br />
            Si es ejecución pura → automatización.<br />
            Si es híbrido → combina ambos.
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mt-6">
            El futuro no es uno u otro. Es saber <span className="font-bold text-primary">cuándo usar cada herramienta</span> para construir sistemas que realmente escalan.
          </p>
        </div>
      </>
    ),
  },

  "seguridad-ia-confianza-cero": {
    id: "seguridad-ia-confianza-cero",
    title: "Seguridad en la Era de IA: Del Perímetro a la Confianza Cero",
    date: "2026-01-06",
    category: "Ciberseguridad",
    readTime: "10 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-8 mb-12 border border-red-500/30">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground/70">La seguridad tradicional asume que los atacantes están afuera.</span><br />
            <span className="font-bold text-primary">La realidad: ya están dentro.</span><br />
            <span className="text-foreground/60">El único modelo de seguridad que funciona es asumir que todo está comprometido.</span>
          </p>
        </div>

        {/* El Problema con el Perímetro */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          La Falacia del Perímetro
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Durante décadas, la seguridad corporativa se construyó sobre una premisa simple: <span className="font-semibold">"Construye un muro alto. Mantén a los malos afuera. Confía en todo lo que está adentro."</span>
        </p>

        <p className="text-lg text-foreground/80 leading-relaxed mb-12">
          Este modelo falló espectacularmente. ¿Por qué? Porque los atacantes no escalan muros. <span className="font-bold text-primary">Usan la puerta de entrada</span>. Un phishing exitoso, una contraseña débil, un empleado descontento. Una vez dentro del perímetro, tienen acceso completo.
        </p>

        {/* Casos Reales */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 mb-12">
          <h3 className="text-xl font-bold text-foreground mb-6">Brechas que Cambiaron las Reglas</h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">SolarWinds (2020)</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Atacantes comprometieron actualizaciones de software legítimas. 18,000 organizaciones instalaron <span className="font-semibold text-foreground">voluntariamente</span> el malware. El perímetro era irrelevante.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Target (2013)</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Los atacantes entraron a través de un proveedor de HVAC (aire acondicionado) con acceso a la red. Una vez dentro, se movieron lateralmente hasta los sistemas de punto de venta. 40 millones de tarjetas comprometidas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">Colonial Pipeline (2021)</h4>
              <p className="text-foreground/70 text-sm leading-relaxed">
                Una sola contraseña comprometida en una VPN sin MFA. Resultado: ransomware que paralizó el 45% del suministro de combustible de la costa este de EE.UU. El perímetro no importó.
              </p>
            </div>
          </div>
        </div>

        {/* Zero Trust */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Zero Trust: Never Trust, Always Verify
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Daniel Miessler resume Zero Trust en una frase: <span className="font-bold text-primary">"Asume brecha. Verifica todo. Limita el daño."</span>
        </p>

        <div className="bg-muted/30 rounded-xl p-8 mb-12 border border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-6">Los 3 Principios de Zero Trust</h3>

          <div className="space-y-6">
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Verify Explicitly</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    Autenticación continua. No basta con iniciar sesión una vez. Cada solicitud se verifica: identidad, dispositivo, ubicación, comportamiento, contexto. MFA obligatorio. Sin excepciones.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Least Privilege Access</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    Acceso mínimo necesario, justo a tiempo. Un empleado de marketing no necesita acceso a la base de datos de producción. Un agente de IA procesando facturas no necesita acceso a nóminas. Segmenta. Limita. Audita.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Assume Breach</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    Diseña como si el atacante ya estuviera dentro. Microsegmentación: incluso si comprometen un sistema, no pueden moverse lateralmente. Monitoreo constante de anomalías. Plan de respuesta a incidentes pre-aprobado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IA y Seguridad */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          IA: El Arma de Doble Filo
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          La IA está transformando tanto el ataque como la defensa. El problema: <span className="font-bold text-primary">los atacantes se mueven más rápido</span>.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-2xl">⚔️</span>
              Ofensiva (Atacantes)
            </h3>

            <ul className="space-y-3 text-foreground/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><span className="font-semibold text-foreground">Phishing generado por IA:</span> Emails indistinguibles de legítimos, personalizados, en tiempo real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><span className="font-semibold text-foreground">Deepfakes:</span> Llamadas de "tu CEO" pidiendo transferencias urgentes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><span className="font-semibold text-foreground">Malware polimórfico:</span> Código que muta automáticamente para evadir detección</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span><span className="font-semibold text-foreground">Reconocimiento automatizado:</span> Bots que escanean millones de objetivos buscando vulnerabilidades</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <span className="text-2xl">🛡️</span>
              Defensiva (Blue Team)
            </h3>

            <ul className="space-y-3 text-foreground/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Detección de anomalías:</span> Identificar patrones sospechosos en tiempo real</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Análisis de amenazas:</span> Correlacionar billones de eventos para encontrar ataques coordinados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Respuesta automatizada:</span> Aislar sistemas comprometidos en segundos, no horas</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Vulnerability assessment:</span> Escaneo continuo de infraestructura buscando debilidades</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Caso Real */}
        <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Caso Real: Uranus (Agente de Ciberseguridad)</h2>

          <p className="text-foreground/80 leading-relaxed mb-6">
            Uranus es un agente de IA especializado en auditorías de seguridad continuas. Así opera:
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
              <p className="text-foreground/70 text-sm">
                <span className="font-semibold text-foreground">Escaneo automatizado:</span> Cada 24h escanea todos los servicios expuestos (APIs, web, DB) buscando vulnerabilidades conocidas
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
              <p className="text-foreground/70 text-sm">
                <span className="font-semibold text-foreground">Validación de configuraciones:</span> Verifica que MFA esté habilitado, políticas de contraseñas cumplan estándares, logs estén activados
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
              <p className="text-foreground/70 text-sm">
                <span className="font-semibold text-foreground">Threat intelligence:</span> Compara hashes de archivos ejecutables contra bases de malware conocido
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
              <p className="text-foreground/70 text-sm">
                <span className="font-semibold text-foreground">Reportes accionables:</span> No solo lista vulnerabilidades. Prioriza por criticidad y genera tickets con pasos de remediación
              </p>
            </div>
          </div>

          <div className="bg-background/50 rounded-lg p-4">
            <p className="text-sm text-foreground/60 italic">
              <span className="font-semibold text-foreground">Resultado:</span> De auditorías manuales trimestrales (que tomaban 2-3 días) a monitoreo continuo 24/7. Vulnerabilidades críticas detectadas en minutos, no meses.
            </p>
          </div>
        </div>

        {/* Guía Práctica */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Cómo Implementar Zero Trust (Sin Romper Todo)
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-8">
          No necesitas reemplazar toda tu infraestructura. Empieza con victorias rápidas:
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">1. MFA en TODO (sin excepciones)</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Si solo haces UNA cosa, que sea esto. MFA bloquea el 99.9% de ataques de credenciales comprometidas. Email, VPN, admin panels, servicios cloud. Todo. Usa hardware keys (YubiKey) para cuentas críticas.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">2. Inventario de accesos privilegiados</h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              ¿Quién tiene acceso de admin a qué sistemas? La mayoría de empresas no lo sabe. Empieza auditando:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4">
              <li>• Cuentas con permisos de superusuario en servidores/cloud</li>
              <li>• Acceso a bases de datos de producción</li>
              <li>• Capacidad de ejecutar código en producción</li>
              <li>• Acceso a repositorios de código crítico</li>
            </ul>
            <p className="text-foreground/70 text-sm leading-relaxed mt-3">
              Revoca lo que no se usa. Limita lo que queda. Audita mensualmente.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">3. Logging y Monitoring (antes de que lo necesites)</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              No puedes defender lo que no puedes ver. Implementa logging centralizado de:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4 mt-2 mb-3">
              <li>• Autenticaciones exitosas y fallidas</li>
              <li>• Cambios en permisos/configuraciones</li>
              <li>• Acceso a datos sensibles</li>
              <li>• Ejecución de comandos privilegiados</li>
            </ul>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Retención: mínimo 90 días. Idealmente 1 año. Los atacantes sofisticados se mueven despacio.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">4. Segmenta tus agentes de IA</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Si tienes agentes de IA procesando datos, aplica Zero Trust:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4 mt-2">
              <li>• Un agente procesando facturas no necesita acceso a nóminas</li>
              <li>• Un agente de marketing no necesita acceso a datos financieros</li>
              <li>• Credenciales de solo lectura cuando sea posible</li>
              <li>• API keys rotadas mensualmente</li>
              <li>• Rate limiting para prevenir exfiltración masiva</li>
            </ul>
          </div>
        </div>

        {/* Conclusión */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            La Seguridad es un Proceso, No un Producto
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            No existe "seguridad completa". Daniel Miessler lo dice claramente: <span className="font-bold text-primary">"Security is a process of continuous improvement, not a product you buy and install."</span>
          </p>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            En 2026, la pregunta no es "¿cómo prevengo todas las brechas?" (imposible). La pregunta es:
          </p>

          <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-6">
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>¿Cómo <span className="font-bold">detecto</span> brechas rápidamente?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>¿Cómo <span className="font-bold">limito</span> el daño cuando ocurren?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>¿Cómo <span className="font-bold">recupero</span> operaciones críticas en horas, no semanas?</span>
              </li>
            </ul>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed">
            Zero Trust no es paranoia. Es realismo. Los atacantes ya están dentro. La única defensa real es <span className="font-bold text-primary">asumir brecha, verificar todo, y limitar el daño</span>.
          </p>
        </div>
      </>
    ),
  },

  "filosofia-unix-scaffolding-ai": {
    id: "filosofia-unix-scaffolding-ai",
    title: "Filosofía UNIX y Scaffolding: Cómo Construir Sistemas de IA que Escalan",
    date: "2026-01-04",
    category: "Arquitectura de IA",
    readTime: "8 min",
    content: (
      <>
        {/* Header visual */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed">
            La mayoría de sistemas de IA fallan no porque la tecnología sea mala, sino porque{" "}
            <span className="font-bold text-primary">intentan hacer demasiado a la vez</span>. La Filosofía UNIX y el concepto de Scaffolding nos enseñan cómo construir sistemas que realmente funcionan y escalan.
          </p>
        </div>

        {/* Introducción */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          La Falacia del "Agente Todoterreno"
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-6">
          Cuando las empresas empiezan con IA, el error más común es intentar construir <span className="font-semibold text-foreground">"un agente que haga todo"</span>. Un sistema que procese documentos, responda emails, gestione clientes, cotice servicios, y además haga café.
        </p>

        <p className="text-lg text-foreground/80 leading-relaxed mb-12">
          Esto <span className="font-bold text-red-500">nunca funciona</span>. La complejidad crece exponencialmente. Los errores se multiplican. El mantenimiento se vuelve imposible. Y al final, terminas con un sistema que hace muchas cosas mal en lugar de pocas cosas bien.
        </p>

        {/* Filosofía UNIX */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-border/50">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Filosofía UNIX: "Haz Una Cosa y Hazla Bien"
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            En los años 70, los creadores de UNIX establecieron principios que siguen siendo válidos 50 años después:
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-4">Los Principios UNIX:</h4>
            <ul className="space-y-3 text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Haz una cosa y hazla bien:</span> Cada programa debe hacer una tarea específica. Hacerla correctamente. No intentar ser todo para todos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Construye para ser conectado:</span> Diseña sistemas que puedan trabajar juntos. La salida de uno es la entrada de otro.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Simplicidad sobre complejidad:</span> Elige la solución simple. Cuando tengas duda, elimina en lugar de añadir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><span className="font-semibold text-foreground">Texto plano como interfaz universal:</span> Usa formatos estándar que cualquiera pueda leer y procesar.</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-6 border border-primary/20">
            <h4 className="font-bold text-foreground mb-3">Aplicado a Agentes de IA:</h4>
            <p className="text-foreground/80 leading-relaxed mb-4">
              En lugar de <span className="font-semibold">"un agente que gestione toda la logística"</span>, construyes:
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>• <span className="font-semibold text-foreground">Mercury:</span> Solo extrae datos de Bills of Lading. Nada más.</li>
              <li>• <span className="font-semibold text-foreground">Venus:</span> Solo cotiza rutas. Nada más.</li>
              <li>• <span className="font-semibold text-foreground">Neptune:</span> Solo predice demanda. Nada más.</li>
              <li>• <span className="font-semibold text-foreground">Jupiter:</span> Solo sincroniza tracking con APIs. Nada más.</li>
            </ul>
            <p className="text-foreground/80 leading-relaxed mt-4">
              Cada uno hace <span className="font-bold text-primary">una cosa perfectamente</span>. Luego los conectas en workflows que procesan operaciones completas.
            </p>
          </div>
        </div>

        {/* Caso Real: AIForwarding */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-8 mb-12 border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Caso Real: BKLOG y la Filosofía UNIX</h2>

          <p className="text-foreground/80 leading-relaxed mb-6">
            Cuando Carlos empezó con BKLOG (broker logístico), la tentación era construir "un sistema que haga todo el trabajo del broker". Eso hubiera sido un desastre.
          </p>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Enfoque Equivocado (Todoterreno):</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Construir un mega-agente que procese BLs, cotice rutas, gestione clientes, genere facturas, y haga seguimiento. Resultado: 6 meses de desarrollo, sistema inmanejable, nadie lo usa.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-success rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Enfoque UNIX (Especializado):</p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Empezar con <span className="font-bold text-foreground">una tarea</span>: extracción de BLs. Construir Mercury. Hacerlo perfecto. <span className="text-success font-bold">Resultado: 2 semanas de desarrollo, en producción, ahorrando 40h/mes.</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-background/50 rounded-lg p-4">
            <p className="text-sm text-foreground/70 italic">
              <span className="font-semibold text-foreground">Lección:</span> Mercury no sabe cotizar rutas. No gestiona clientes. No genera facturas. Solo extrae datos de BLs. Y por eso <span className="font-bold text-foreground">funciona perfectamente</span>.
            </p>
          </div>
        </div>

        {/* Scaffolding */}
        <div className="bg-muted/30 rounded-xl p-8 mb-10 border border-border/50">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
            Scaffolding: Construye Rápido, Mejora Después
          </h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            <span className="font-semibold text-foreground">Scaffolding</span> (andamiaje en español) es el concepto de construir <span className="font-bold text-primary">estructuras temporales</span> que te permiten llegar a tu objetivo más rápido, sabiendo que después las reemplazarás.
          </p>

          <div className="bg-background/50 rounded-lg p-6 mb-6">
            <h4 className="font-bold text-primary mb-4">El Proceso de Scaffolding:</h4>
            <ol className="space-y-3 text-foreground/80 list-decimal list-inside">
              <li>
                <span className="font-semibold text-foreground">Construye lo mínimo que funcione</span> - No la solución perfecta, sino la que resuelve el problema hoy
              </li>
              <li>
                <span className="font-semibold text-foreground">Usa herramientas temporales</span> - APIs de terceros, scripts manuales, procesos semi-automatizados
              </li>
              <li>
                <span className="font-semibold text-foreground">Aprende de la realidad</span> - Descubre qué partes realmente importan cuando el sistema está en uso
              </li>
              <li>
                <span className="font-semibold text-foreground">Reemplaza incrementalmente</span> - Cambia una pieza a la vez por soluciones permanentes
              </li>
              <li>
                <span className="font-semibold text-foreground">Remueve el andamiaje</span> - Elimina lo que ya no necesitas sin miedo
              </li>
            </ol>
          </div>

          <div className="border-l-4 border-primary pl-6 mb-6">
            <p className="text-base text-foreground/70 italic mb-3">
              <span className="font-semibold text-foreground">Analogía de construcción:</span>
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Cuando construyes un edificio, usas andamios para llegar a lugares altos. Los andamios NO son parte del edificio final. Una vez terminado, los quitas. Nadie construye el edificio perfecto desde el primer día. El andamiaje te permite <span className="font-semibold text-foreground">progresar rápido</span> sin comprometerte a decisiones permanentes.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-6 border border-primary/20">
            <h4 className="font-bold text-foreground mb-3">Ejemplo Real: Mercury v1 vs Mercury v2</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Mercury v1 (Scaffolding):</p>
                <ul className="text-xs text-foreground/60 space-y-1 ml-4">
                  <li>• Subida manual de PDFs</li>
                  <li>• Procesamiento con Claude API directamente</li>
                  <li>• Exportación manual a Excel</li>
                  <li>• Revisión humana de cada resultado</li>
                  <li>• <span className="font-bold text-foreground">Tiempo: 2 semanas de desarrollo</span></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Mercury v2 (Producción):</p>
                <ul className="text-xs text-foreground/60 space-y-1 ml-4">
                  <li>• Integración con email (recibe BLs automáticamente)</li>
                  <li>• Pipeline de procesamiento con validaciones</li>
                  <li>• Auto-exportación a matriz de naviera correcta</li>
                  <li>• Revisión solo de casos ambiguos</li>
                  <li>• <span className="font-bold text-foreground">Tiempo: 3 semanas adicionales, basado en aprendizajes de v1</span></li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-foreground/70 mt-4 italic">
              Sin el andamiaje de v1, no sabríamos qué construir en v2. El andamiaje nos enseñó qué realmente importaba.
            </p>
          </div>
        </div>

        {/* Guía Práctica */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
          Cómo Aplicar Esto a Tu Proyecto de IA
        </h2>

        <p className="text-lg text-foreground/80 leading-relaxed mb-8">
          No necesitas empezar con la arquitectura perfecta. Necesitas empezar con <span className="font-bold text-primary">una victoria rápida</span>:
        </p>

        <div className="space-y-6 mb-12">
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">1. Identifica UNA tarea específica</h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              No "automatizar ventas". Eso es demasiado amplio. Mejor:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4">
              <li>• "Extraer datos de facturas PDF a planilla Excel"</li>
              <li>• "Responder consultas frecuentes de clientes"</li>
              <li>• "Clasificar tickets de soporte por urgencia"</li>
              <li>• "Generar resúmenes de reuniones desde transcripciones"</li>
            </ul>
            <p className="text-foreground/70 text-sm leading-relaxed mt-3">
              <span className="font-bold text-foreground">Test de especificidad:</span> Si no puedes explicar la tarea en una frase simple, está demasiado amplia.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">2. Construye la versión andamiaje (2 semanas máximo)</h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              No arquitectura escalable. No pipelines complejos. Solo lo mínimo:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4">
              <li>• Scripts simples, no sistemas completos</li>
              <li>• APIs de terceros (Claude, OpenAI), no modelos propios</li>
              <li>• Intervención manual donde sea necesario</li>
              <li>• Guardar datos en CSVs/JSON, no bases de datos complejas</li>
            </ul>
            <p className="text-foreground/70 text-sm leading-relaxed mt-3">
              El objetivo es <span className="font-bold text-foreground">probar que funciona</span>, no que sea perfecto.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">3. Usa en producción (aunque sea tosco)</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              No esperes a que esté "listo". Ponlo a trabajar. Aprenderás más en una semana de uso real que en un mes de planificación. Monitorea errores, recolecta feedback, identifica cuellos de botella.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">4. Reemplaza incrementalmente</h3>
            <p className="text-foreground/70 text-sm leading-relaxed mb-3">
              Ahora que sabes qué funciona, mejora las partes críticas:
            </p>
            <ul className="text-xs text-foreground/60 space-y-1 ml-4">
              <li>• ¿El procesamiento es lento? Optimiza solo esa parte</li>
              <li>• ¿Los errores son frecuentes? Añade validaciones específicas</li>
              <li>• ¿La intervención manual es repetitiva? Automatiza ese paso</li>
            </ul>
            <p className="text-foreground/70 text-sm leading-relaxed mt-3">
              Cambia una cosa a la vez. Mantén el resto funcionando.
            </p>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <h3 className="font-bold text-primary mb-3">5. Elimina el andamiaje sin miedo</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Cuando tengas la versión mejorada, <span className="font-bold text-foreground">borra</span> el código viejo. No lo comentes "por si acaso". No lo mantengas "como backup". Bórralo. El andamiaje cumplió su propósito. Ya no lo necesitas.
            </p>
          </div>
        </div>

        {/* Errores Comunes */}
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-8 mb-12 border border-red-500/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Errores Comunes que Debes Evitar</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="font-semibold text-foreground mb-1">Síndrome del "Primero Perfecto"</p>
                <p className="text-sm text-foreground/70">
                  Pasar meses diseñando la arquitectura ideal antes de escribir una línea de código. <span className="font-bold text-foreground">Resultado:</span> Nunca llegar a producción porque siempre hay "una cosa más" que mejorar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="font-semibold text-foreground mb-1">Enamorarse del Andamiaje</p>
                <p className="text-sm text-foreground/70">
                  Mantener código temporal "porque funciona". El andamiaje se convierte en deuda técnica. <span className="font-bold text-foreground">Solución:</span> Establece una fecha límite para reemplazar o eliminar cada pieza temporal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="font-semibold text-foreground mb-1">Construir para Casos Hipotéticos</p>
                <p className="text-sm text-foreground/70">
                  "¿Y si algún día necesitamos procesar 1M de documentos?" cuando hoy procesas 50 al mes. <span className="font-bold text-foreground">Regla:</span> Solo resuelve problemas que existen hoy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
              <div>
                <p className="font-semibold text-foreground mb-1">Ignorar la Modularidad UNIX</p>
                <p className="text-sm text-foreground/70">
                  Construir un monolito que hace 15 cosas mediocre en lugar de 3 agentes especializados que hacen 3 cosas perfectamente. <span className="font-bold text-foreground">Recuerda:</span> Un agente, una responsabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusión */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 border border-primary/20">
          <h2 className="text-2xl font-semibold text-foreground mb-6">El Camino Real Hacia Sistemas de IA que Funcionan</h2>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6">
            La Filosofía UNIX y Scaffolding no son solo conceptos técnicos. Son <span className="font-bold text-primary">mentalidades</span> que determinan si tu proyecto de IA termina siendo:
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-success font-bold">✓</span>
              <span className="text-foreground/80">Un conjunto de agentes especializados que trabajan 24/7 ahorrando horas reales</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">✗</span>
              <span className="text-foreground/80">Un sistema complejo que nadie entiende y que termina abandonado</span>
            </li>
          </ul>

          <div className="bg-background/50 rounded-lg p-6">
            <p className="text-foreground/80 leading-relaxed mb-4">
              <span className="font-bold text-foreground">Los principios son simples:</span>
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>• Haz una cosa y hazla bien (UNIX)</li>
              <li>• Empieza con andamiaje, mejora después (Scaffolding)</li>
              <li>• Conecta piezas simples en workflows complejos (Composabilidad)</li>
              <li>• Elimina sin miedo lo que ya no necesitas (Simplicidad)</li>
            </ul>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mt-6">
            La próxima vez que quieras construir "un agente que haga todo", recuerda a Mercury: <span className="font-bold text-primary">hace una cosa, la hace perfecta, y por eso funciona</span>.
          </p>
        </div>
      </>
    ),
  },
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPostsContent[id] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl pt-32 pb-20">
          <h1 className="text-4xl font-medium text-foreground mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft size={20} />
            Volver al blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          {/* Back to blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Volver a Pensamientos
          </Link>

          {/* Article header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('es-CL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-medium text-foreground leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            {post.content}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
