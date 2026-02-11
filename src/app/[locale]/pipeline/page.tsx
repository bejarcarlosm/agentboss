import Link from 'next/link';
import { PipelineFlow } from '@/components/pipeline/pipeline-flow';

export default function PipelinePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold">
            Agent<span className="text-[#2dd4bf]">Boss</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Inicio
            </Link>
            <Link href="/chat/product-owner" className="text-[var(--muted)] hover:text-[#2dd4bf] transition-colors">
              Hablar con Atlas
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Pipeline de la <span className="text-[#2dd4bf]">Fabrica</span>
          </h1>
          <p className="text-[var(--muted)] max-w-2xl">
            Asi funciona nuestra linea de ensamblaje. Cada etapa tiene agentes especializados que trabajan en tu proyecto.
          </p>
        </div>

        <PipelineFlow />
      </main>
    </div>
  );
}
