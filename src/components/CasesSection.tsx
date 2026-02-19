import { motion } from "framer-motion";
import { ArrowRight, TrendingDown, Clock, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CasesSection = () => {
  const mainCase = {
    company: "BKLOG",
    industry: "Logística Internacional",
    logo: "🚢",
    tagline: "De 60 minutos a 2 minutos por documento",
    problem: "Operadores gastaban 30-60 minutos copiando manualmente datos de Bills of Lading (BLs) a matrices Excel específicas de cada naviera (Hapag-Lloyd, MSC, Maersk, COSCO).",
    solution: "Desarrollamos AIForwarding: un sistema con agentes especializados que automáticamente lee PDFs, extrae datos, normaliza campos según el formato de cada naviera y exporta Excel listo para booking.",
    results: [
      { icon: Clock, label: "Tiempo por BL", before: "60 min", after: "2 min", improvement: "97% reducción" },
      { icon: TrendingDown, label: "Ahorro mensual", before: "50 horas", after: "1.7 horas", improvement: "40 horas ahorradas" },
      { icon: CheckCircle, label: "Precisión", before: "Manual", after: "Automatizada", improvement: "0 errores" },
      { icon: Users, label: "Equipo liberado", before: "Operativo", after: "Estratégico", improvement: "Enfoque comercial" }
    ],
    techStack: ["Python + FastAPI", "Claude AI", "OCR Avanzado", "Excel Automation"],
    testimonial: {
      quote: "AIForwarding transformó completamente nuestras operaciones. Lo que antes tomaba una hora ahora toma 2 minutos. Mi equipo puede enfocarse en negociación comercial en lugar de copiar datos.",
      author: "Gerente de Operaciones",
      company: "BKLOG"
    }
  };

  const upcomingCases = [
    {
      industry: "Legal",
      icon: "⚖️",
      title: "Análisis de contratos",
      description: "Extracción automática de cláusulas y términos clave"
    },
    {
      industry: "Inmobiliaria",
      icon: "🏢",
      title: "Gestión de propiedades",
      description: "Procesamiento de documentación y due diligence"
    },
    {
      industry: "Ciberseguridad",
      icon: "🔒",
      title: "Monitoreo de amenazas",
      description: "Detección y respuesta automatizada a incidentes"
    }
  ];

  return (
    <section id="casos" className="py-20 md:py-32 bg-background">
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
            Casos de Éxito
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Resultados reales de empresas que transformaron sus operaciones con agentes de IA
          </p>
        </motion.div>

        {/* Main Case Study - BKLOG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl p-8 md:p-12 border border-border/50 mb-12"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{mainCase.logo}</div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">{mainCase.company}</h3>
                <p className="text-foreground/60">{mainCase.industry}</p>
              </div>
            </div>
            <div className="bg-primary/10 px-6 py-3 rounded-full border border-primary/20">
              <span className="text-primary font-semibold">{mainCase.tagline}</span>
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <span className="text-red-500 font-bold">P</span>
                </div>
                <h4 className="text-xl font-bold text-foreground">Problema</h4>
              </div>
              <p className="text-foreground/70 leading-relaxed">{mainCase.problem}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="text-success font-bold">S</span>
                </div>
                <h4 className="text-xl font-bold text-foreground">Solución</h4>
              </div>
              <p className="text-foreground/70 leading-relaxed">{mainCase.solution}</p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {mainCase.results.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 border border-border/30"
              >
                <result.icon className="w-8 h-8 text-primary mb-4" />
                <div className="text-sm text-foreground/60 mb-2">{result.label}</div>
                <div className="space-y-1 mb-3">
                  <div className="text-xs text-red-500 line-through">{result.before}</div>
                  <div className="text-2xl font-bold text-success">{result.after}</div>
                </div>
                <div className="text-xs text-primary font-medium">{result.improvement}</div>
              </motion.div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="bg-background/50 rounded-xl p-6 mb-8">
            <h4 className="text-sm font-semibold text-foreground/60 mb-4">TECNOLOGÍAS UTILIZADAS</h4>
            <div className="flex flex-wrap gap-3">
              {mainCase.techStack.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-xl p-6 md:p-8 border border-primary/10">
            <div className="text-4xl text-primary mb-4">"</div>
            <p className="text-lg text-foreground/80 leading-relaxed mb-6 italic">
              {mainCase.testimonial.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">B</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">{mainCase.testimonial.author}</div>
                <div className="text-sm text-foreground/60">{mainCase.testimonial.company}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Próximos Casos
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingCases.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-muted/30 rounded-xl p-6 border border-border/30 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-sm text-primary font-medium mb-2">{item.industry}</div>
                <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-foreground/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" className="rounded-full px-8 py-6" asChild>
              <a href="#contacto" className="inline-flex items-center gap-2">
                ¿Tu empresa podría ser el próximo caso?
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;
