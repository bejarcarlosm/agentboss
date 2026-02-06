import Link from 'next/link';

export function FactoryFooter() {
  return (
    <footer className="border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-2">
              Agent<span className="text-[#2dd4bf]">Boss</span>
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed max-w-sm">
              Fabrica de software potenciada por agentes IA. Construimos tu proyecto mas rapido y mas economico que una fabrica tradicional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-bold mb-3">Fabrica</h4>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <Link href="/chat/product-owner" className="block hover:text-[#2dd4bf] transition-colors">
                Discovery gratis
              </Link>
              <Link href="/pipeline" className="block hover:text-[#2dd4bf] transition-colors">
                Pipeline
              </Link>
              <Link href="/login" className="block hover:text-[#2dd4bf] transition-colors">
                Admin
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold mb-3">Contacto</h4>
            <div className="space-y-2 text-sm text-[var(--muted)]">
              <a href="mailto:hola@agentboss.cl" className="block hover:text-[#2dd4bf] transition-colors">
                hola@agentboss.cl
              </a>
              <p>Santiago, Chile</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--muted)]">
          <p>
            &copy; 2026 AgentBoss by{' '}
            <a href="https://carlosbejar.cl" target="_blank" rel="noopener noreferrer" className="text-[#2dd4bf] hover:underline">
              Carlos Bejar
            </a>
          </p>
          <p className="text-xs">
            Fabrica de Software · Santiago, Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
