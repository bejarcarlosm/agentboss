import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import industryData from "@/assets/industry-data.jpg";
import industryManufacturing from "@/assets/industry-manufacturing.jpg";
import industryTelecom from "@/assets/industry-telecom.jpg";
import industryLogistics from "@/assets/industry-logistics.jpg";
import logoConsalud from "@/assets/logo-consalud.png";
import logoUnilever from "@/assets/logo-unilever.png";
import logoMovistar from "@/assets/logo-movistar.svg";
import logoMaersk from "@/assets/logo-maersk.svg";
const pilares = [{
  titulo: "Estrategia & Datos",
  año: "2004",
  descripcion: "Lideró la inteligencia de negocios como Jefe de Proyectos BI en la industria de Seguros (Isapre Consalud), transformando datos en decisiones críticas.",
  image: industryData,
  logo: logoConsalud,
  logoSize: "h-12"
}, {
  titulo: "Estructura & Procesos",
  año: "2013",
  descripcion: "En el sector de Manufactura (Unilever), dirigió la implementación de SAP APO (Advanced Planning & Optimization) para la planificación de demanda, optimizando la cadena de suministro de la compañía.",
  image: industryManufacturing,
  logo: logoUnilever,
  logoSize: "h-12"
}, {
  titulo: "Escala & Marketing",
  año: "2016",
  descripcion: "En Telecomunicaciones (Telefónica), lideró campañas masivas de marketing, gestionando el crecimiento y la lealtad en mercados de alta competencia.",
  image: industryTelecom,
  logo: logoMovistar,
  logoSize: "h-20"
}, {
  titulo: "Innovación & Logística",
  año: "2022",
  descripcion: "Como especialista en automatización y Product Owner en Maersk, diseñó el futuro de la logística liderando innovaciones en sistemas TMS.",
  image: industryLogistics,
  logo: logoMaersk,
  logoSize: "h-16"
}];
const FundamentosSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return <section id="trayectoria" className="py-12 md:py-16 relative overflow-hidden bg-background">
      {/* Background decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header de la sección */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true
      }} className="text-center mb-10">
          <span className="inline-block px-4 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 tracking-wider uppercase py-[4px]">
            Trayectoria Profesional
          </span>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
            <span className="text-foreground">
              Más de 20 años impulsando la transformación digital,
            </span>
            <br />
            <span className="italic font-light">
              <span className="text-cyan-400">diseñando hoy las soluciones </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">que definirán el mañana.</span>
            </span>
          </h2>
        </motion.div>

        {/* Grid de pilares */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pilares.map((pilar, index) => (
            <motion.div 
              key={pilar.titulo} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <motion.div 
                className="relative rounded-2xl border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                animate={{ 
                  height: expandedIndex === index ? "auto" : "320px"
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Imagen de fondo que ocupa todo */}
                <div className="absolute inset-0">
                  <motion.img 
                    src={pilar.image} 
                    alt={pilar.titulo} 
                    loading="lazy"
                    width={412}
                    height={280}
                    className="w-full h-full object-cover"
                    animate={{ 
                      scale: expandedIndex === index ? 1.1 : 1 
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  {/* Overlay oscuro para legibilidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                
                {/* Contenido superpuesto */}
                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end min-h-[320px]">
                  {/* Logo de la empresa + Año */}
                  <div className={`${pilar.logoSize} mb-3 flex items-center justify-between gap-2`}>
                    <img 
                      src={pilar.logo} 
                      alt={`Logo ${pilar.titulo}`} 
                      loading="lazy"
                      className={`h-full object-contain drop-shadow-lg transition-all duration-300 hover:scale-110 brightness-0 invert ${index === 2 ? 'max-w-[220px] md:max-w-[260px]' : index === 3 ? 'max-w-[140px] md:max-w-[160px]' : 'max-w-[100px] md:max-w-[120px]'}`}
                    />
                    <div className="px-2 md:px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-[10px] md:text-xs font-semibold shadow-lg shrink-0">
                      {pilar.año}
                    </div>
                  </div>
                  
                  {/* Título del pilar */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-futuristic tracking-wide uppercase drop-shadow-lg">
                    {pilar.titulo}
                  </h3>
                  
                  {/* Descripción - solo visible al hacer click */}
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/90 leading-relaxed text-base md:text-lg overflow-hidden drop-shadow-md"
                      >
                        {pilar.descripcion}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Indicador de click */}
                <div className="absolute top-3 right-3 z-20">
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-sm font-bold">+</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Línea decorativa inferior */}
      <motion.div initial={{
        scaleX: 0
      }} whileInView={{
        scaleX: 1
      }} transition={{
        duration: 1,
        delay: 0.5
      }} viewport={{
        once: true
      }} className="mt-6 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent max-w-2xl mx-auto" />
      </div>
    </section>;
};
export default FundamentosSection;