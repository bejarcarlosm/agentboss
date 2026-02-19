import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="text-primary">Agent</span>Boss
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicios" className="text-sm text-foreground hover:text-primary transition-colors">
            Servicios
          </a>
          <a href="#casos" className="text-sm text-foreground hover:text-primary transition-colors">
            Casos de Éxito
          </a>
          <a href="#contacto" className="text-sm text-foreground hover:text-primary transition-colors">
            Contacto
          </a>
          <Button size="sm" className="rounded-full" asChild>
            <a href="#contacto">Comenzar Proyecto</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="#servicios"
              className="text-sm text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </a>
            <a
              href="#casos"
              className="text-sm text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Casos de Éxito
            </a>
            <a
              href="#contacto"
              className="text-sm text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
