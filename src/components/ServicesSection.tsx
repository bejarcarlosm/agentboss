import { motion } from "framer-motion";
import { Smartphone, Globe, Bot, Zap, Database, Shield } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Aplicaciones Web",
      description: "Plataformas web empresariales con agentes integrados que automatizan procesos, gestionan datos y optimizan operaciones en tiempo real.",
      features: [
        "Dashboards inteligentes",
        "Automatización de flujos",
        "Integración con sistemas legacy",
        "Escalabilidad garantizada"
      ]
    },
    {
      icon: Smartphone,
      title: "Aplicaciones Móviles",
      description: "Apps nativas y cross-platform potenciadas por IA que aprenden del comportamiento del usuario y automatizan tareas recurrentes.",
      features: [
        "iOS y Android",
        "Notificaciones inteligentes",
        "Offline-first",
        "Sincronización automática"
      ]
    },
    {
      icon: Bot,
      title: "Sistemas de Agentes",
      description: "Arquitecturas de agentes especializados que trabajan 24/7 procesando documentos, extrayendo datos y ejecutando tareas operativas.",
      features: [
        "Procesamiento de documentos",
        "Extracción de datos",
        "Validación automática",
        "Integración multi-sistema"
      ]
    },
    {
      icon: Zap,
      title: "Prototipos y MVPs",
      description: "Validación rápida de ideas con prototipos funcionales que incluyen capacidades de IA desde el día uno.",
      features: [
        "Desarrollo acelerado",
        "Iteración rápida",
        "Feedback en tiempo real",
        "Escalable a producción"
      ]
    }
  ];

  const techStack = [
    { icon: Database, name: "Python + FastAPI", category: "Backend" },
    { icon: Globe, name: "React + TypeScript", category: "Frontend" },
    { icon: Bot, name: "Claude + OpenAI", category: "AI/ML" },
    { icon: Shield, name: "Docker + Kubernetes", category: "DevOps" }
  ];

  return (
    <section id="servicios" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Servicios de Desarrollo
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-6">
            Software empresarial con agentes de IA integrados desde el primer día
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-foreground/60">Led by</span>
            <a
              href="https://carlosbejar.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 hover:bg-primary/20 transition-all duration-300 group"
            >
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary group-hover:text-primary/90">
                Carlos Bejar - AI Adoption Director
              </span>
            </a>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                </div>
              </div>

              <p className="text-foreground/70 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-foreground/60">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 md:p-12 border border-border/50"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Stack Tecnológico
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 border border-border/30 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="inline-flex p-3 bg-primary/10 rounded-lg mb-4">
                  <tech.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-sm text-primary font-medium mb-1">
                  {tech.category}
                </div>
                <div className="text-base font-semibold text-foreground">
                  {tech.name}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-foreground/60 text-sm">
              Arquitectura moderna, escalable y lista para producción desde el día uno
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
