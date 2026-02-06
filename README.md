# AgentBoss

Plataforma para crear, configurar y desplegar agentes de IA con voz y texto para tu negocio.

![AgentBoss Dashboard](https://github.com/bejarcarlosm/agentboss/raw/master/docs/dashboard.png)

## Que es AgentBoss?

AgentBoss es una fabrica de agentes de inteligencia artificial. Permite crear agentes personalizados que pueden atender llamadas, responder chats, calificar leads, gestionar documentos y automatizar procesos operativos, todo sin escribir codigo.

### Funcionalidades

- **Creacion de agentes** - Wizard de 4 pasos: informacion basica, personalidad, voz e IA
- **Agentes de voz** - Integra NVIDIA Riva, ElevenLabs y OpenAI TTS
- **Agentes de chat** - Powered by GPT-4o, Claude y otros modelos
- **Dashboard** - Vista de todos tus agentes con estado en tiempo real
- **Prueba en vivo** - Orbe interactivo 3D para probar la conversacion
- **Widget embebible** - Codigo listo para integrar en tu sitio web
- **API REST** - Endpoint para integrar via API

## Tech Stack

| Capa | Tecnologia |
|------|------------|
| Framework | Next.js 16 + React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| 3D | Three.js (react-three-fiber) |
| Estado | localStorage (migrando a Supabase) |
| Font | Rajdhani (Google Fonts) |

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

Abre http://localhost:3000 y haz clic en **"Probar con cuenta demo"**.

## Estructura

```
src/
├── app/
│   ├── page.tsx              # Dashboard con hero + carousel de agentes
│   ├── login/page.tsx        # Login con orbe 3D
│   ├── agents/
│   │   ├── new/page.tsx      # Wizard de creacion (4 pasos)
│   │   └── [id]/page.tsx     # Detalle: config, probar, integrar
│   ├── globals.css           # Theme dark + lime-green accent
│   └── layout.tsx            # Rajdhani font + metadata
├── components/
│   ├── agent-card.tsx        # Card estilo Dapta con capabilities
│   └── ui/
│       ├── orb.tsx           # Orbe 3D con GLSL shaders
│       └── dynamic-orb.tsx   # Wrapper SSR-safe
└── lib/
    ├── types.ts              # Agent, Voice, LLM providers
    ├── agents-service.ts     # CRUD + 9 demo agents
    └── utils.ts              # cn() helper
```

## Agentes Demo

El sistema incluye 9 agentes pre-configurados:

| Agente | Rol | Funcion |
|--------|-----|---------|
| Mercury | Logistica | Extraccion de BLs navieros |
| Venus | Cotizaciones | Rutas maritimas internacionales |
| Neptune | Supply Chain | Prediccion de demanda |
| Atlas | Procesos | Diagnostico y optimizacion |
| Saturn | Legal | Contratos y documentacion |
| Mars | Ventas | Calificacion de leads |
| Earth | Infra | Deploy y monitoreo |
| Uranus | Seguridad | Escaneo de vulnerabilidades |
| Pluto | Consultoria | Analisis de workflows |

## Diseno

UI inspirada en [Dapta.ai](https://dapta.ai):

- Fondo negro puro (`#0a0a0a`)
- Acento lime-green (`#c8e64c`)
- Cards olive-dark con bordes sutiles
- Carousel horizontal de agentes
- Checklist de capabilities con checkmarks verdes
- Boton CTA "Hablar" en lime-green

## Roadmap

- [ ] Backend con Appwrite (auth + database)
- [ ] Integracion real con ElevenLabs para voz
- [ ] Chat en vivo con Gemini AI
- [ ] Deploy en Coolify
- [ ] Widget embebible funcional
- [ ] Dashboard de analytics

## Autor

**Carlos Bejar** - [carlosbejar.cl](https://carlosbejar.cl)

---

Built with Next.js 16, React 19, Tailwind v4 y Three.js
