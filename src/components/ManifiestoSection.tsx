import { motion } from "framer-motion";

const ManifiestoSection = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-background via-secondary/30 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-6">
              MANIFIESTO
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
              El Manifiesto de
              <span className="block bg-gradient-to-r from-foreground via-foreground/80 to-foreground bg-clip-text">
                Autonomía
              </span>
            </h2>
          </motion.div>
          
          {/* Main Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl text-foreground/90 leading-relaxed font-light max-w-3xl mx-auto">
              El código de{" "}
              <span className="font-semibold text-foreground relative inline-block">
                Carlos
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/50" />
              </span>{" "}
              es tu código. No licencias. Él se encarga de transferir el conocimiento a tus equipos.
            </p>
          </motion.div>

          {/* Secondary Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-2xl mx-auto">
              La infraestructura es tuya: el sistema queda listo para operar bajo tu control total o para seguir evolucionando según las necesidades de tu negocio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManifiestoSection;