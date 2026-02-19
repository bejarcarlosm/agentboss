import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Casos de Éxito", href: "#casos" },
    { label: "Contacto", href: "#contacto" },
  ];

  const contactInfo = [
    { icon: Mail, label: "contacto@agentboss.cl" },
    { icon: Phone, label: "+56 9 3273 7570" },
    { icon: MapPin, label: "Chile" },
  ];

  return (
    <footer id="contacto" className="bg-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* CTA Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">Agent</span>
              <span className="text-3xl font-bold text-background">Boss</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-background leading-tight font-bold">
              ¿Listo para transformar tus operaciones?
            </h2>
            <p className="text-background/70 text-lg leading-relaxed">
              Agenda una consultoría gratuita y descubre cómo los agentes de IA pueden automatizar tus procesos empresariales.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 bg-background text-foreground border-background hover:bg-background/90 transition-all duration-300"
              asChild
            >
              <a href="https://wa.me/56932737570?text=Hola,%20vengo%20de%20AgentBoss.cl%20y%20quiero%20información%20sobre%20desarrollo%20con%20agentes%20de%20IA" target="_blank" rel="noopener noreferrer">
                Comenzar Proyecto
              </a>
            </Button>
          </div>

          {/* Contact & Links */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Navigation */}
            <div>
              <h3 className="text-background font-semibold mb-4">Navegación</h3>
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-background font-semibold mb-4">Contacto</h3>
              <div className="flex flex-col gap-3">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-background/70">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © 2026 AgentBoss.cl - Todos los derechos reservados
          </p>
          <p className="text-background/50 text-sm">
            Desarrollado con agentes de IA | By{" "}
            <a href="https://carlosbejar.cl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Carlos Bejar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
