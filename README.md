# AgentBoss — AI Software Factory

Fabrica de software potenciada por agentes IA. Tres agentes hacen discovery con el cliente, dos mas construyen y despliegan. Mas rapido y mas economico que una fabrica tradicional.

## Que es AgentBoss?

AgentBoss es una **fabrica de software liderada por agentes IA**. En vez de llenar formularios o tener reuniones interminables, los clientes conversan directamente con agentes especializados que entienden su negocio y traducen sus ideas en un plan de accion.

### El Equipo

| Agente | Rol | Area | Status |
|--------|-----|------|--------|
| **Atlas** | Product Owner | Discovery | Activo |
| **Venus** | UX/UI Designer | Discovery | Activo |
| **Pluto** | Black Belt / QA | Discovery | Activo |
| **Earth** | Full-Stack Developer | Ejecucion | Coming Soon |
| **Uranus** | Infrastructure Engineer | Deploy | Coming Soon |

### Pipeline

```
Discovery (Atlas + Venus + Pluto)  →  Development (Earth)  →  Deploy (Uranus)
         1-2 dias                        1-3 semanas              1 dia
```

## Como Funciona

1. El cliente entra a la landing y hace clic en **"Iniciar discovery gratis"**
2. Habla con **Atlas** (Product Owner) — define requerimientos via chat pre-scripted
3. Atlas lo conecta con **Venus** (UX) para diseño y flujos
4. **Pluto** (QA) asegura calidad y procesos
5. Cuando las definiciones estan listas, el equipo de desarrollo ejecuta

### Sistema de Conversacion

Cada agente tiene un **arbol de dialogo** con nodos y chips clickeables:

- Mensajes con variantes random (se siente vivo)
- Chips de preguntas sugeridas para guiar la conversacion
- Typing indicator con delay natural (400-800ms)
- Handoff entre agentes ("Hablar con Venus" navega a `/chat/ux-designer`)
- Input de texto libre para capturar datos del cliente

## Tech Stack

| Capa | Tecnologia |
|------|------------|
| Framework | Next.js 16 + React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| 3D | Three.js (react-three-fiber) |
| Estado | localStorage (migrando a Supabase) |
| Font | Rajdhani (Google Fonts) |
| Deploy | Vercel |

## Rutas

| Ruta | Descripcion | Acceso |
|------|-------------|--------|
| `/` | Landing publica de la fabrica | Publico |
| `/chat/[agentSlug]` | Chat con un agente | Publico |
| `/pipeline` | Visualizacion del pipeline | Publico |
| `/login` | Login para admin | Publico |
| `/factory` | Dashboard admin | Auth requerida |
| `/agents/[id]` | Configuracion de agente | Auth requerida |

### Slugs de agentes

- `/chat/product-owner` — Atlas
- `/chat/ux-designer` — Venus
- `/chat/black-belt` — Pluto
- `/chat/developer` — Earth (coming soon)
- `/chat/infrastructure` — Uranus (coming soon)

## Quick Start

```bash
# Clonar
git clone https://github.com/bejarcarlosm/agentboss.git
cd agentboss

# Instalar
npm install

# Desarrollo
npm run dev
```

Abre http://localhost:3000 para ver la landing.

## Estructura

```
src/
├── app/
│   ├── page.tsx                    # Landing publica
│   ├── layout.tsx                  # Root layout + metadata
│   ├── globals.css                 # Theme + animaciones
│   ├── login/page.tsx              # Login admin
│   ├── factory/page.tsx            # Dashboard admin
│   ├── pipeline/page.tsx           # Pipeline visual
│   ├── chat/[agentSlug]/page.tsx   # Chat con agente
│   └── agents/[id]/page.tsx        # Config de agente (admin)
│
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx      # Orquestador del chat
│   │   ├── chat-message.tsx        # Burbuja de mensaje
│   │   ├── suggested-chips.tsx     # Chips clickeables
│   │   ├── chat-header.tsx         # Header con avatar
│   │   └── chat-input.tsx          # Input + boton enviar
│   ├── landing/
│   │   ├── factory-navbar.tsx      # Navbar sticky
│   │   ├── factory-hero.tsx        # Hero con orb + wave gradient
│   │   ├── services-section.tsx    # 6 servicios
│   │   ├── process-section.tsx     # 5 pasos del proceso
│   │   ├── agent-showcase.tsx      # Equipo + sound wave
│   │   ├── value-props.tsx         # Tabla comparativa
│   │   ├── cta-section.tsx         # CTA final
│   │   ├── pipeline-preview.tsx    # Preview del pipeline
│   │   └── factory-footer.tsx      # Footer
│   ├── pipeline/
│   │   ├── pipeline-flow.tsx       # Flujo completo
│   │   └── pipeline-stage.tsx      # Card de etapa
│   ├── agent-card.tsx              # Card de agente (admin)
│   └── ui/
│       ├── orb.tsx                 # Orbe 3D (Three.js + GLSL)
│       └── dynamic-orb.tsx         # Wrapper SSR-safe
│
└── lib/
    ├── factory-types.ts            # FactoryAgent, ConversationTree, ChatMessage
    ├── factory-agents.ts           # 5 agentes con arboles de conversacion
    ├── factory-service.ts          # Helpers (getFactoryAgent, pickRandom, etc.)
    ├── types.ts                    # Tipos legacy + re-exports
    ├── agents-service.ts           # CRUD localStorage (admin)
    └── utils.ts                    # cn() helper
```

## Arboles de Conversacion

Cada agente front-office tiene un arbol completo:

- **Atlas** (Product Owner) — ~20 nodos: explica user stories, BPM, MVPs, pricing, timeline. Guia al cliente para definir su proyecto.
- **Venus** (UX/UI) — ~17 nodos: explica UX vs UI, wireframes, design systems, estilos, proceso de diseño.
- **Pluto** (Black Belt) — ~18 nodos: explica testing, Agile, Kanban, CI/CD, Six Sigma, metricas, auto-blindaje.
- **Earth** y **Uranus** — Nodos basicos con redirect a agentes activos.

## Diferenciador vs Fabrica Tradicional

| | Tradicional | AgentBoss |
|---|---|---|
| Discovery | 2-4 semanas | 1-2 dias |
| Tiempo a MVP | 8-16 semanas | 1-4 semanas |
| Costo MVP | $15,000 - $50,000 | $3,000 - $10,000 |
| Disponibilidad | Horario oficina | 24/7 |
| Costo discovery | Cobrado | Gratis |

## Roadmap

- [ ] Deploy en Vercel con dominio custom
- [ ] Backend con Supabase (auth + database)
- [ ] Guardar conversaciones de clientes en BD
- [ ] Dashboard de analytics por agente
- [ ] Integracion con LLM para respuestas dinamicas
- [ ] Earth y Uranus operativos
- [ ] Widget embebible para sitios de clientes
- [ ] Notificaciones cuando un cliente deja su email

## Autor

**Carlos Bejar** — [carlosbejar.cl](https://carlosbejar.cl)

---

Built with Next.js 16, React 19, Tailwind v4, Three.js y mucha IA.
