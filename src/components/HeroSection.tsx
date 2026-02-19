import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bot, Zap, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Desarrollo con IA Agéntica</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Software empresarial
              <span className="block bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mt-2">
                potenciado por agentes inteligentes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-foreground/70 leading-relaxed">
              No solo construimos apps. Creamos{" "}
              <span className="font-semibold text-foreground">sistemas de agentes de IA</span> que automatizan tus operaciones empresariales{" "}
              <span className="font-bold text-primary">24/7</span>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">97%</div>
                <div className="text-sm text-foreground/60">Reducción de tiempo</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-foreground/60">Operación continua</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">0</div>
                <div className="text-sm text-foreground/60">Errores humanos</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 py-6 text-base" asChild>
                <a href="#contacto">
                  Comenzar Proyecto
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-base" asChild>
                <a href="#casos">
                  Ver Casos de Éxito
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-border/50">
              <p className="text-sm text-foreground/50 mb-3">Confiado por empresas en:</p>
              <div className="flex flex-wrap gap-6 text-sm font-medium text-foreground/70">
                <span>🚢 Logística</span>
                <span>⚖️ Legal</span>
                <span>🏢 Inmobiliaria</span>
                <span>🔒 Ciberseguridad</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl p-8 border border-border/50 backdrop-blur-sm">
              {/* Code-like visualization */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-blue-400">//</span>
                  <span>De 60 minutos a 2 minutos</span>
                </div>

                <div className="bg-background/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-foreground">Agent.process()</span>
                  </div>
                  <div className="pl-6 text-muted-foreground space-y-1">
                    <div>✓ Leer documento PDF</div>
                    <div>✓ Extraer datos relevantes</div>
                    <div>✓ Validar información</div>
                    <div>✓ Llenar matriz Excel</div>
                    <div>✓ Notificar completado</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-success">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-semibold">Task completed in 2 minutes</span>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center font-bold shadow-lg">
                AI
              </div>

              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold shadow-lg animate-pulse">
                24/7
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -z-10 top-10 right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -z-10 bottom-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;