import { motion } from "framer-motion";

const pasos = [
  {
    numero: "01",
    titulo: "Diagnóstico Estratégico con Backbelt",
    descripcion: "Tu experiencia comienza directamente con la tecnología. Realizarás sesiones con Backbelt, el Agente de IA especializado en procesos. En estas reuniones, Backbelt analizará tus operaciones, identificará cuellos de botella y recopilará cada requisito necesario para tu proyecto de automatización."
  },
  {
    numero: "02",
    titulo: "Diseño de Arquitectura y Flujos",
    descripcion: "Una vez procesada la información, el sistema construye un Plan de Implementación detallado. Con el mapeo completo de los flujos generados por el agente recibirás un \"approach\" de la solución. Este documento define la arquitectura técnica y cómo los agentes se integrarán en tu flujo de trabajo para maximizar la rentabilidad."
  },
  {
    numero: "03",
    titulo: "Sesión de Validación y Presupuesto",
    descripcion: "Se realiza una reunión personal para auditar el plan generado por la IA. Se ajustan los detalles para asegurar que la solución impacte donde más se necesita. Si la estrategia genera valor y se decide avanzar, se entrega la propuesta económica y el cierre del contrato en esa misma sesión."
  },
  {
    numero: "04",
    titulo: "Desarrollo y Entrenamiento a Medida",
    descripcion: "Con el plan aprobado, inicia la fase de construcción. Se configuran, programan y entrenan los agentes utilizando datos específicos y fuentes de conocimiento. El objetivo es un sistema preciso, seguro y totalmente alineado con la cultura y objetivos de la empresa."
  },
  {
    numero: "05",
    titulo: "Despliegue y Soporte Post-Entrega",
    descripcion: "En colaboración con AgentBoss.cl, se entrega el ecosistema de IA listo para operar. Para garantizar una transición impecable, se incluye un mes de soporte gratuito. Durante este tiempo, se realiza el fine-tuning (ajuste fino) de los agentes y se resuelve cualquier duda para asegurar que el equipo adopte la tecnología con éxito.",
    link: "https://agentboss.cl"
  }
];

const ComoFuncionaSection = () => {
  return (
    <section id="proceso" className="py-16 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-24"
        >
          <span className="text-primary/80 text-sm tracking-[0.3em] uppercase font-medium">
            Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-4 md:mb-6">
            Cómo funciona
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 text-justify">
            En conjunto con la consultoría de <a href="https://agentboss.cl" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">Agentboss.cl</a>, se ha consolidado un enfoque híbrido que sincroniza la analítica avanzada de la inteligencia artificial con el pensamiento estratégico humano para maximizar la efectividad en la toma de decisiones.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent transform md:-translate-x-1/2" />

          {pasos.map((paso, index) => (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-start gap-8 mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Number circle */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-primary font-bold text-lg">{paso.numero}</span>
                </div>
              </div>

              {/* Content card */}
              <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-300"
                >
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                    {paso.titulo}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {paso.link ? (
                      <>
                        En colaboración con <a href={paso.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">AgentBoss.cl</a>, {paso.descripcion.replace("En colaboración con AgentBoss.cl, ", "")}
                      </>
                    ) : (
                      paso.descripcion
                    )}
                  </p>
                </motion.div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-4rem)]" />
            </motion.div>
          ))}

          {/* End dot */}
          <div className="absolute left-4 sm:left-8 md:left-1/2 bottom-0 transform -translate-x-1/2">
            <div className="w-4 h-4 rounded-full bg-primary/50 shadow-lg shadow-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;
