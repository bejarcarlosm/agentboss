import { motion } from "framer-motion";

const QueEsUnAgenteSection = () => {
  return (
    <section id="agentes" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Agent Definition */}
          <motion.div
            id="definicion-agente"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-muted/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 mb-8 md:mb-10 border border-border/50 scroll-mt-20"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6">
              ¿Qué es un <span className="text-primary">Agente de IA</span>?
            </h3>

            <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              Piensa en la diferencia entre un consultor y un empleado:
            </p>

            <div className="space-y-4 mb-6 pl-4">
              <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
                <span className="font-bold text-primary">ChatGPT es un consultor:</span> Le preguntas "¿Cómo proceso este documento?" y te explica los pasos. Tú haces el trabajo.
              </p>

              <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
                <span className="font-bold text-primary">Un agente es un empleado:</span> Le dices "Procesa este documento" y él lo hace. Lee el PDF, extrae los datos, llena el Excel, te notifica cuando terminó.
              </p>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-5 sm:p-6 border border-primary/20 mb-6">
              <p className="text-base sm:text-lg md:text-xl text-foreground font-semibold leading-relaxed">
                La diferencia está en la acción.
              </p>
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mt-3">
                Un agente de IA no solo piensa y responde. <span className="font-bold text-foreground">Ejecuta.</span> Tiene acceso a tus sistemas, conoce tus procesos, y puede completar tareas de principio a fin sin que tengas que estar supervisando cada paso.
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-5 sm:p-6 border border-border/30 mb-6">
              <h4 className="text-primary font-bold text-base sm:text-lg mb-4">Ejemplo real con BKLOG:</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Antes:</span> "ChatGPT, ¿qué datos necesito del BL?" → ChatGPT te lista los campos → Tú abres el PDF → Buscas cada dato → Lo copias al Excel → <span className="text-red-500 font-bold">60 minutos</span>
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Ahora con Mercury:</span> "Procesa este BL" → Lee el PDF → Extrae los datos → Llena la matriz Excel → Te notifica "Listo" → <span className="text-success font-bold">2 minutos</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-foreground/70 leading-relaxed italic border-t border-border/50 pt-6">
              <span className="font-semibold text-foreground">En resumen:</span> Los agentes transforman la IA de una herramienta que te ayuda a pensar en una herramienta que <span className="text-primary font-medium">trabaja para ti</span>.
            </p>
          </motion.div>

          {/* Header */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-6 md:mb-8 text-center">
            ¿Por qué necesitas un Director de Inteligencia Artificial?
          </h2>

          {/* Para Empresas */}
          <div className="bg-muted/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 mb-8 md:mb-10 border border-border/50">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="text-primary">Para Empresas</span>
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6">
              Un <span className="font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">Director de Inteligencia Artificial</span> no se limita a implementar nuevas tecnologías. Lidera un cambio profundo en la cultura corporativa, transformando los flujos de trabajo tradicionales en procesos donde la IA es el motor principal —operando de forma inteligente y eficiente <span className="font-bold">24/7</span>.
            </p>

            <div className="mb-6">
              <h3 className="text-primary font-bold text-lg sm:text-xl mb-4">Cuatro pilares estratégicos:</h3>
              <ol className="space-y-4 text-base sm:text-lg md:text-xl text-foreground/80 list-decimal list-inside">
                <li><span className="font-semibold text-foreground">Del "Añadido" al "AI-First":</span> Transforma la mentalidad de usar IA como complemento a convertirla en el núcleo de tus operaciones.</li>
                <li><span className="font-semibold text-foreground">Línea de Ensamblaje Digital:</span> Diseña sistemas de agentes que conectan funciones antes aisladas (operaciones, servicio al cliente, logística) en una secuencia integrada y automatizada.</li>
                <li><span className="font-semibold text-foreground">Jefe de la Fuerza Laboral Digital:</span> Define cómo cada empleado se convierte en supervisor de agentes, delegando tareas mundanas para enfocarse en decisiones estratégicas.</li>
                <li><span className="font-semibold text-foreground">Gobernanza y Seguridad:</span> Establece los marcos para que los agentes operen bajo control humano, asegurando decisiones éticas, seguras y ancladas en los datos reales de tu empresa.</li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-5 sm:p-6 border border-primary/20 mt-6">
              <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed">
                <span className="font-bold">En 2026, la ventaja competitiva no vendrá de usar IA, sino de saber orquestarla.</span> Como Director de IA, el objetivo de Carlos es liberar el talento humano de lo repetitivo, construyendo una <span className="font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">'línea de ensamblaje digital'</span> donde agentes y personas colaboran de forma segura para escalar el valor del negocio de manera exponencial.
              </p>
            </div>

            {/* Caso de uso real: AIForwarding */}
            <div className="bg-muted/50 rounded-xl p-5 sm:p-6 md:p-8 mt-6 border border-border/30">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                <div>
                  <h4 className="text-primary font-bold text-base sm:text-lg mb-2">Caso real: BKLOG - Broker Logístico</h4>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Problema:</span> Operadores copiaban manualmente datos de Bills of Lading (BLs) a matrices Excel de navieras (Hapag-Lloyd, MSC, Maersk, COSCO). <span className="text-primary font-medium">30-60 minutos por documento.</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className="w-2 h-2 bg-success rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Solución AIForwarding:</span> Sistema con agentes de IA que extraen automáticamente datos de PDFs, normalizan campos según formato de cada naviera, y exportan Excel listo para booking. <span className="text-success font-medium">2 minutos por documento.</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 shrink-0"></div>
                <div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Impacto:</span> Con 50 BLs mensuales, BKLOG ahorra <span className="font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">40 horas/mes de trabajo operativo</span>, liberando al equipo para enfocarse en negociación comercial y atención al cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Para Profesionales y Emprendedores */}
          <div className="bg-muted/30 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 mb-8 md:mb-10 border border-border/50">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="text-primary">Para Profesionales y Emprendedores</span>
            </h3>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 leading-relaxed mb-6">
              La mayoría de las personas usa ChatGPT como una <span className="font-semibold text-foreground/70">calculadora científica cara</span>: preguntan, reciben una respuesta, copian y pegan. <span className="font-bold text-primary">Esto no es infraestructura personal de IA.</span>
            </p>

            <div className="mb-6">
              <h4 className="text-primary font-bold text-lg sm:text-xl mb-4">Una verdadera infraestructura personal de IA:</h4>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
                      <span className="font-semibold text-foreground">Agentes Especializados 24/7:</span> No es "un ChatGPT para todo". Son múltiples agentes específicos trabajando continuamente en tus tareas:
                    </p>
                    <ul className="mt-3 ml-6 space-y-2 text-sm sm:text-base text-foreground/70">
                      <li>• Un agente monitoreando tus emails y priorizando lo urgente</li>
                      <li>• Otro analizando tendencias de tu industria y enviándote resúmenes</li>
                      <li>• Otro gestionando tu calendario y preparando briefings para reuniones</li>
                      <li>• Otro rastreando oportunidades de negocio basadas en tus criterios</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
                      <span className="font-semibold text-foreground">Anclada a TU Contexto:</span> Los agentes conocen tu negocio, tus objetivos, tu estilo de trabajo, tus contactos, tu conocimiento acumulado. No empiezan desde cero cada vez.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                  <div>
                    <p className="text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed">
                      <span className="font-semibold text-foreground">Multiplica tu Capacidad Sin Límites:</span> No se trata de "ahorrar tiempo". Se trata de <span className="font-bold text-primary">poder hacer cosas que antes eran imposibles</span> porque requerían un equipo completo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-5 sm:p-6 border border-primary/20 mt-6 mb-6">
              <h4 className="text-primary font-bold text-base sm:text-lg mb-4">Ejemplo real:</h4>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Antes:</span> Como emprendedor solo, tienes <span className="text-red-500 font-bold">8 horas</span> para ventas, operaciones, marketing y desarrollo. Imposible escalar.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-success rounded-full mt-2 shrink-0"></div>
                  <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                    <span className="font-semibold text-foreground">Con infraestructura personal:</span> Tus agentes manejan prospección, seguimiento, análisis de competencia, generación de contenido. Tú te enfocas en <span className="text-success font-bold">decisiones estratégicas y relaciones clave</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-cyan-500/10 rounded-xl p-5 sm:p-6 border border-primary/20">
              <p className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed">
                <span className="font-bold">El resultado:</span> No es "hacer lo mismo más rápido". Es <span className="font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">escalar tu capacidad individual al nivel de un equipo completo</span>, sin contratar a nadie.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QueEsUnAgenteSection;
