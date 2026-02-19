import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "seguridad-ia-confianza-cero",
    title: "Seguridad en la Era de IA: Del Perímetro a la Confianza Cero",
    date: "2026-01-06",
    excerpt: "La seguridad tradicional falló. Los atacantes ya están dentro. La única defensa real es asumir que todo está comprometido y verificar constantemente.",
    category: "Ciberseguridad",
    readTime: "10 min"
  },
  {
    id: "infraestructura-personal-ai",
    title: "Infraestructura Personal de IA: Más Allá de ChatGPT",
    date: "2026-01-05",
    excerpt: "La mayoría usa ChatGPT como una calculadora científica cara. El verdadero poder está en construir tu propio sistema de agentes especializados que trabajan para ti 24/7.",
    category: "Infraestructura AI",
    readTime: "8 min"
  },
  {
    id: "filosofia-unix-scaffolding-ai",
    title: "Filosofía UNIX y Scaffolding: Cómo Construir Sistemas de IA que Escalan",
    date: "2026-01-04",
    excerpt: "La mayoría de sistemas de IA fallan porque intentan hacer demasiado a la vez. La Filosofía UNIX y el Scaffolding nos enseñan cómo construir agentes especializados que realmente funcionan.",
    category: "Arquitectura de IA",
    readTime: "8 min"
  },
  {
    id: "caso-bklog-aiforwarding",
    title: "Caso BKLOG: De 60 Minutos a 2 Minutos por BL",
    date: "2026-01-03",
    excerpt: "Cómo AIForwarding transformó las operaciones de un broker logístico, ahorrando 40 horas mensuales y liberando al equipo para trabajo estratégico.",
    category: "Casos de Estudio",
    readTime: "12 min"
  },
  {
    id: "niveles-madurez-ai",
    title: "Los 5 Niveles de Madurez en IA: ¿Dónde Está Tu Empresa?",
    date: "2025-12-28",
    excerpt: "Un marco práctico (AIMM de Daniel Miessler) para evaluar el progreso de tu organización desde trabajo manual hasta sistemas completamente autónomos.",
    category: "Marcos de Trabajo",
    readTime: "10 min"
  },
  {
    id: "agentes-vs-automatizacion",
    title: "Agentes vs Automatización: La Diferencia que Nadie Explica",
    date: "2025-12-20",
    excerpt: "La automatización ejecuta instrucciones. Los agentes toman decisiones. Entender esta diferencia es fundamental para saber cuándo usar cada uno.",
    category: "Fundamentos de IA",
    readTime: "6 min"
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header minimalista */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-foreground">
              Pensamientos
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Ideas sobre AI, automatización, infraestructura personal y el futuro del trabajo.
            </p>
          </div>
        </div>
      </section>

      {/* Lista de posts - diseño minimalista */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <div className="space-y-12">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="group border-b border-border/50 pb-8 last:border-0"
              >
                <Link to={`/blog/${post.id}`} className="block space-y-3">
                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('es-CL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-medium text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-lg text-foreground/70 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
                  <div className="pt-2">
                    <span className="text-sm font-medium text-primary group-hover:underline underline-offset-4">
                      Leer más →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Coming soon message */}
          <div className="mt-16 pt-16 border-t border-border/30">
            <p className="text-center text-muted-foreground italic">
              Más artículos próximamente. Siguiendo la filosofía de{" "}
              <a
                href="https://danielmiessler.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline underline-offset-4"
              >
                Daniel Miessler
              </a>
              : contenido sobre infraestructura personal de IA, frameworks y casos reales.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
