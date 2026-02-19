import type { FactoryAgent } from './factory-types';

export const FACTORY_AGENTS: FactoryAgent[] = [
  // =============================================
  // FRONT-OFFICE: Atlas (Product Owner)
  // =============================================
  {
    id: 'agent-atlas',
    slug: 'product-owner',
    name: 'Atlas',
    role: 'Product Owner',
    description: 'Traduzco tus ideas de negocio en especificaciones tecnicas que los desarrolladores pueden construir.',
    avatar: '/agents/atlas.webp',
    color: '#2dd4bf',
    category: 'front-office',
    status: 'active',
    personality: 'Lider, directo, explica conceptos como user stories y BPM de forma clara',
    conversationTree: {
      startNodeId: 'greeting',
      nodes: {
        'greeting': {
          id: 'greeting',
          agentMessages: [
            'Hola! Soy Atlas, el Product Owner de la fabrica. Mi trabajo es entender tu negocio y traducirlo en software que funcione. En que puedo ayudarte?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Bienvenido a la fabrica! Soy Atlas, tu Product Owner. Estoy aqui para entender que necesitas y convertirlo en un plan de accion. Que tienes en mente?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Hola! Atlas aqui, tu Product Owner. Antes de construir nada, necesito entender bien tu negocio. Cuéntame, como puedo ayudarte?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
          ],
          suggestedQuestions: [
            { label: 'Que haces exactamente?', nextNodeId: 'explain-role', type: 'node' },
            { label: 'Como funciona la fabrica?', nextNodeId: 'explain-factory', type: 'node' },
            { label: 'Quiero construir un proyecto', nextNodeId: 'start-project', type: 'node' },
          ],
        },
        'explain-role': {
          id: 'explain-role',
          agentMessages: [
            'Como Product Owner, soy el puente entre tu vision de negocio y el equipo tecnico. Tomo tus ideas, las analizo y las convierto en "user stories" — pequenas piezas de funcionalidad que se pueden construir paso a paso.',
            'Mi rol es traducir lo que necesitas en algo que los developers puedan construir. Uso herramientas como user stories, flujos de proceso (BPM) y priorizacion para que tu proyecto avance rapido y sin desperdicios.',
          ],
          suggestedQuestions: [
            { label: 'Que es una user story?', nextNodeId: 'explain-user-story', type: 'node' },
            { label: 'Que es BPM?', nextNodeId: 'explain-bpm', type: 'node' },
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-project', type: 'node' },
          ],
        },
        'explain-factory': {
          id: 'explain-factory',
          agentMessages: [
            'La fabrica tiene 3 fases:\n\n1. **Discovery** — Yo (Atlas), Venus (UX) y Pluto (BlackBelt) conversamos contigo para entender que necesitas.\n2. **Development** — Earth, nuestro developer, construye el software basado en las specs.\n3. **Deploy** — Uranus se encarga de que todo funcione en produccion.\n\nEs como una linea de ensamblaje, pero para software.',
            'Imagina una fabrica de autos, pero para software:\n\n- **Atlas** (yo) define QUE construir\n- **Venus** diseña COMO se ve y se siente\n- **Pluto** asegura la CALIDAD\n- **Earth** lo CONSTRUYE\n- **Uranus** lo DESPLIEGA\n\nCada agente es experto en su area.',
          ],
          suggestedQuestions: [
            { label: 'Quiero hablar con Venus', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Quiero hablar con Pluto', nextNodeId: 'handoff-pluto', type: 'node' },
            { label: 'Empecemos mi proyecto', nextNodeId: 'start-project', type: 'node' },
          ],
        },
        'explain-user-story': {
          id: 'explain-user-story',
          agentMessages: [
            'Una user story tiene este formato:\n\n**"Como [tipo de usuario], quiero [accion], para [beneficio]"**\n\nEjemplo: "Como dueno de restaurante, quiero recibir pedidos online, para no perder ventas por telefono"\n\nEs simple pero poderoso. Nos ayuda a pensar siempre desde el usuario.',
            'Las user stories son la unidad basica de trabajo:\n\n**Como [quien], quiero [que], para [por que]**\n\nEjemplo real: "Como paciente, quiero agendar citas desde mi celular, para no tener que llamar a la clinica"\n\nCada story se puede estimar, priorizar y construir de forma independiente.',
          ],
          suggestedQuestions: [
            { label: 'Dame mas ejemplos', nextNodeId: 'user-story-examples', type: 'node' },
            { label: 'Que es BPM?', nextNodeId: 'explain-bpm', type: 'node' },
            { label: 'Escribamos stories para mi proyecto', nextNodeId: 'start-project', type: 'node' },
          ],
        },
        'user-story-examples': {
          id: 'user-story-examples',
          agentMessages: [
            'Aqui van algunos ejemplos por industria:\n\n**E-commerce:**\n- Como comprador, quiero filtrar productos por precio, para encontrar lo que busco rapido\n- Como vendedor, quiero ver estadisticas de ventas, para tomar mejores decisiones\n\n**SaaS:**\n- Como admin, quiero invitar miembros al equipo, para que colaboren en el proyecto\n- Como usuario free, quiero ver que incluye el plan pro, para decidir si upgradeamos\n\n**Logistica:**\n- Como coordinador, quiero rastrear envios en tiempo real, para informar a los clientes',
          ],
          suggestedQuestions: [
            { label: 'Ahora si, empecemos', nextNodeId: 'start-project', type: 'node' },
            { label: 'Como se priorizan?', nextNodeId: 'explain-prioritization', type: 'node' },
            { label: 'Hablar con Venus sobre diseño', nextNodeId: 'handoff-venus', type: 'node' },
          ],
        },
        'explain-bpm': {
          id: 'explain-bpm',
          agentMessages: [
            'BPM (Business Process Management) es mapear como fluye el trabajo en tu negocio.\n\nPor ejemplo, un proceso de venta:\n1. Cliente contacta → 2. Se califica el lead → 3. Se envia propuesta → 4. Negociacion → 5. Cierre\n\nCuando mapeamos esto, encontramos cuellos de botella y oportunidades de automatizacion. Es la base para construir software que realmente resuelva problemas.',
            'BPM es como hacer un mapa de tu negocio. Documentamos cada paso de tus procesos clave:\n\n**Ejemplo proceso de soporte:**\nTicket entra → Se clasifica → Se asigna → Se resuelve → Se cierra\n\nAl mapear esto, sabemos exactamente que automatizar y donde el software genera mas impacto.',
          ],
          suggestedQuestions: [
            { label: 'Mapeemos mi proceso', nextNodeId: 'start-project', type: 'node' },
            { label: 'Que herramientas usan?', nextNodeId: 'explain-tools', type: 'node' },
            { label: 'Quiero hablar con Pluto', nextNodeId: 'handoff-pluto', type: 'node' },
          ],
        },
        'explain-prioritization': {
          id: 'explain-prioritization',
          agentMessages: [
            'Usamos la matriz **Impacto vs Esfuerzo**:\n\n| | Bajo Esfuerzo | Alto Esfuerzo |\n|---|---|---|\n| **Alto Impacto** | Hacer PRIMERO | Planificar |\n| **Bajo Impacto** | Nice to have | NO hacer |\n\nLas stories de alto impacto y bajo esfuerzo van primero. Es asi de simple. El objetivo es entregar valor rapido.',
          ],
          suggestedQuestions: [
            { label: 'Genial, empecemos', nextNodeId: 'start-project', type: 'node' },
            { label: 'Que es un MVP?', nextNodeId: 'explain-mvp', type: 'node' },
            { label: 'Hablar con Pluto sobre calidad', nextNodeId: 'handoff-pluto', type: 'node' },
          ],
        },
        'explain-mvp': {
          id: 'explain-mvp',
          agentMessages: [
            'Un MVP (Minimum Viable Product) es la version mas simple de tu producto que entrega valor real.\n\nNo es un prototipo a medias. Es un producto funcional con las features esenciales:\n\n**Ejemplo — App de delivery:**\n- MVP: Pedir comida + pagar + seguir pedido\n- NO MVP: Reviews, programa de puntos, chat con restaurante\n\nLanzamos rapido, medimos, iteramos. Asi se construye software exitoso.',
          ],
          suggestedQuestions: [
            { label: 'Definamos mi MVP', nextNodeId: 'start-project', type: 'node' },
            { label: 'Cuanto tarda construir un MVP?', nextNodeId: 'explain-timeline', type: 'node' },
            { label: 'Hablar con Venus sobre diseño', nextNodeId: 'handoff-venus', type: 'node' },
          ],
        },
        'explain-timeline': {
          id: 'explain-timeline',
          agentMessages: [
            'Depende de la complejidad, pero nuestra fabrica trabaja rapido:\n\n- **Landing page**: 1-2 dias\n- **MVP simple** (auth + CRUD + dashboard): 1-2 semanas\n- **MVP complejo** (integraciones, AI, pagos): 2-4 semanas\n\nLo importante es que empezamos a entregar valor desde el dia 1. No esperamos 3 meses para mostrar algo.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos ahora', nextNodeId: 'start-project', type: 'node' },
            { label: 'Cuanto cuesta?', nextNodeId: 'explain-pricing', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-pricing': {
          id: 'explain-pricing',
          agentMessages: [
            'Buena pregunta! Nuestro modelo es transparente:\n\n- **Discovery** (conmigo, Venus y Pluto): Sin costo — es nuestra inversion en entender tu proyecto\n- **Desarrollo**: Se cotiza despues del discovery, con alcance claro\n- **Sin sorpresas**: Precio fijo por MVP definido\n\nPrimero hagamos el discovery para darte un numero real.',
          ],
          suggestedQuestions: [
            { label: 'Ok, empecemos el discovery', nextNodeId: 'start-project', type: 'node' },
            { label: 'Necesito mas informacion', nextNodeId: 'explain-factory', type: 'node' },
            { label: 'Dejame tu contacto', nextNodeId: 'contact', type: 'node' },
          ],
        },
        'explain-tools': {
          id: 'explain-tools',
          agentMessages: [
            'Nuestro stack esta optimizado para velocidad y calidad:\n\n- **Next.js + React** — Frontend moderno y rapido\n- **Supabase** — Base de datos + autenticacion + storage\n- **Tailwind CSS** — Diseño consistente y profesional\n- **Vercel AI SDK** — Integracion de IA nativa\n- **TypeScript** — Codigo sin errores\n\nTodo esto lo domina Earth, nuestro developer. Tu solo defines QUE necesitas.',
          ],
          suggestedQuestions: [
            { label: 'Perfecto, empecemos', nextNodeId: 'start-project', type: 'node' },
            { label: 'Quiero hablar con Earth', nextNodeId: 'handoff-earth', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'start-project': {
          id: 'start-project',
          agentMessages: [
            'Excelente! Para empezar necesito entender tu negocio. Cuéntame:\n\n1. **Que problema quieres resolver?**\n2. **Quien es tu usuario principal?**\n3. **Como lo resuelves hoy?** (manual, Excel, otra herramienta...)\n\nEscribe libremente, yo me encargo de estructurarlo.',
            'Perfecto, vamos a definir tu proyecto. Necesito que me cuentes:\n\n- **Tu negocio**: A que te dedicas?\n- **El dolor**: Que problema te quita el sueno?\n- **El sueno**: Como se veria el mundo si estuviera resuelto?\n\nNo te preocupes por la estructura, solo cuéntame.',
          ],
          suggestedQuestions: [
            { label: 'Tengo un e-commerce', nextNodeId: 'project-ecommerce', type: 'node' },
            { label: 'Necesito automatizar procesos', nextNodeId: 'project-automation', type: 'node' },
            { label: 'Quiero una app SaaS', nextNodeId: 'project-saas', type: 'node' },
          ],
        },
        'project-ecommerce': {
          id: 'project-ecommerce',
          agentMessages: [
            'E-commerce, genial! Hay mucho por optimizar ahi. Cuéntame mas:\n\n- Que vendes? (productos fisicos, digitales, servicios)\n- Ya tienes tienda? (Shopify, WooCommerce, nada aun)\n- Cual es tu mayor dolor hoy? (ventas, logistica, atencion al cliente)\n\nCon esto puedo empezar a definir las user stories clave.',
          ],
          suggestedQuestions: [
            { label: 'Quiero mejorar las ventas', nextNodeId: 'project-detail', type: 'node' },
            { label: 'Necesito automatizar el soporte', nextNodeId: 'project-detail', type: 'node' },
            { label: 'Quiero crear una tienda nueva', nextNodeId: 'project-detail', type: 'node' },
          ],
        },
        'project-automation': {
          id: 'project-automation',
          agentMessages: [
            'Automatizacion! Mi especialidad. Las empresas pierden horas en tareas repetitivas. Cuéntame:\n\n- Que procesos son los mas manuales?\n- Cuantas personas estan involucradas?\n- Que herramientas usan hoy? (Excel, email, WhatsApp...)\n\nVamos a encontrar donde la automatizacion genera mas impacto.',
          ],
          suggestedQuestions: [
            { label: 'Procesos administrativos', nextNodeId: 'project-detail', type: 'node' },
            { label: 'Atencion al cliente', nextNodeId: 'project-detail', type: 'node' },
            { label: 'Gestion de documentos', nextNodeId: 'project-detail', type: 'node' },
          ],
        },
        'project-saas': {
          id: 'project-saas',
          agentMessages: [
            'Una app SaaS! Excelente eleccion de modelo de negocio. Para definir el MVP necesito:\n\n- **El problema**: Que dolor resuelve tu SaaS?\n- **El usuario**: B2B (empresas) o B2C (consumidores)?\n- **La competencia**: Hay algo similar? Que harias diferente?\n\nCon esto definimos el MVP y las primeras user stories.',
          ],
          suggestedQuestions: [
            { label: 'Es para empresas (B2B)', nextNodeId: 'project-detail', type: 'node' },
            { label: 'Es para consumidores (B2C)', nextNodeId: 'project-detail', type: 'node' },
            { label: 'No estoy seguro aun', nextNodeId: 'project-detail', type: 'node' },
          ],
        },
        'project-detail': {
          id: 'project-detail',
          agentMessages: [
            'Perfecto, voy entendiendo tu vision. Para profundizar, me ayudaria mucho si me dejas tu email o nombre. Asi puedo preparar un brief inicial y coordinar con Venus (UX) y Pluto (calidad) para el siguiente paso.\n\nEscribe tu email o nombre abajo:',
            'Genial, tengo una buena idea de lo que necesitas. El siguiente paso es coordinar con el equipo. Me dejas tu email o nombre para preparar el brief?\n\nEscribelo abajo y te contactamos para agendar una sesion de discovery completa.',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Venus sobre diseño', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Hablar con Pluto sobre calidad', nextNodeId: 'handoff-pluto', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-venus': {
          id: 'handoff-venus',
          agentMessages: [
            'Buena idea! Venus es nuestra experta en UX/UI. Ella te ayudara con el diseño, los flujos de usuario y la experiencia visual. Te conecto con ella.',
          ],
          suggestedQuestions: [
            { label: 'Ir con Venus', nextNodeId: '', type: 'navigate', navigateTo: '/chat/ux-designer' },
            { label: 'Seguir hablando contigo', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-pluto': {
          id: 'handoff-pluto',
          agentMessages: [
            'Pluto es nuestro Black Belt en calidad y procesos. El se asegura de que todo lo que construimos sea robusto y escalable. Te conecto.',
          ],
          suggestedQuestions: [
            { label: 'Ir con Pluto', nextNodeId: '', type: 'navigate', navigateTo: '/chat/black-belt' },
            { label: 'Seguir aqui', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-earth': {
          id: 'handoff-earth',
          agentMessages: [
            'Earth es nuestro developer estrella, pero aun esta en entrenamiento. Pronto estara disponible para construir tu proyecto. Por ahora, definamos bien las specs conmigo.',
          ],
          suggestedQuestions: [
            { label: 'Ok, sigamos aqui', nextNodeId: 'start-project', type: 'node' },
            { label: 'Hablar con Venus', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'contact': {
          id: 'contact',
          agentMessages: [
            'Puedes agendar una llamada directamente con Carlos (nuestro fundador).\n\nTambien puedes escribirnos a hola@agentboss.cl\n\nO si prefieres, dejame tu email aqui abajo y te contactamos nosotros.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos el discovery', nextNodeId: 'start-project', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
      },
    },
  },

  // =============================================
  // FRONT-OFFICE: Venus (UX/UI Designer)
  // =============================================
  {
    id: 'agent-venus',
    slug: 'ux-designer',
    name: 'Venus',
    role: 'UX/UI Designer',
    description: 'Diseño experiencias digitales que tus usuarios amen. Flujos intuitivos, interfaces limpias.',
    avatar: '/agents/venus.webp',
    color: '#a855f7',
    category: 'front-office',
    status: 'active',
    personality: 'Creativa, visual, habla de flujos y experiencia de usuario',
    conversationTree: {
      startNodeId: 'greeting',
      nodes: {
        'greeting': {
          id: 'greeting',
          agentMessages: [
            'Hola! Soy Venus, la disenadora UX/UI de la fabrica. Mi trabajo es que tu producto no solo funcione, sino que tus usuarios lo amen. En que puedo ayudarte?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Bienvenido! Soy Venus, encargada del diseño y la experiencia de usuario. Hablemos de como quieres que se vea y se sienta tu producto.\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Hola! Venus aqui, tu disenadora. Antes de disenar, necesito entender a tus usuarios. Cuéntame sobre tu proyecto!\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
          ],
          suggestedQuestions: [
            { label: 'Que haces exactamente?', nextNodeId: 'explain-role', type: 'node' },
            { label: 'Necesito disenar mi app', nextNodeId: 'start-design', type: 'node' },
            { label: 'Que es UX vs UI?', nextNodeId: 'explain-ux-ui', type: 'node' },
          ],
        },
        'explain-role': {
          id: 'explain-role',
          agentMessages: [
            'Como disenadora UX/UI, me encargo de dos cosas:\n\n**UX (User Experience)** — Como FUNCIONA: flujos, navegacion, que tan facil es usar la app\n**UI (User Interface)** — Como se VE: colores, tipografia, componentes, layout\n\nPrimero diseño la experiencia (wireframes), luego la hago linda (UI). Todo centrado en tu usuario.',
          ],
          suggestedQuestions: [
            { label: 'Que es un wireframe?', nextNodeId: 'explain-wireframe', type: 'node' },
            { label: 'Que es un design system?', nextNodeId: 'explain-design-system', type: 'node' },
            { label: 'Diseñemos mi app', nextNodeId: 'start-design', type: 'node' },
          ],
        },
        'explain-ux-ui': {
          id: 'explain-ux-ui',
          agentMessages: [
            'Es una pregunta clasica!\n\n**UX es como funciona la puerta**\n- Se empuja o se jala? Es obvio? El usuario se frustra?\n\n**UI es como se ve la puerta**\n- Color, textura, forma del tirador\n\nUna app puede ser hermosa (buen UI) pero imposible de usar (mal UX). O fea pero super funcional. Mi trabajo es que sea las dos cosas.',
          ],
          suggestedQuestions: [
            { label: 'Como es un buen UX?', nextNodeId: 'explain-good-ux', type: 'node' },
            { label: 'Muéstrame ejemplos', nextNodeId: 'ux-examples', type: 'node' },
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-design', type: 'node' },
          ],
        },
        'explain-wireframe': {
          id: 'explain-wireframe',
          agentMessages: [
            'Un wireframe es un boceto simple de la estructura de una pantalla. Sin colores, sin imagenes — solo cajas y texto.\n\nEs como el plano de una casa antes de construirla:\n- Donde va el menu?\n- Donde van los botones principales?\n- Como fluye la informacion?\n\nNos permite validar la estructura ANTES de invertir tiempo en diseño visual.',
          ],
          suggestedQuestions: [
            { label: 'Que viene despues del wireframe?', nextNodeId: 'explain-process', type: 'node' },
            { label: 'Hagamos wireframes de mi app', nextNodeId: 'start-design', type: 'node' },
            { label: 'Hablar con Atlas sobre specs', nextNodeId: 'handoff-atlas', type: 'node' },
          ],
        },
        'explain-design-system': {
          id: 'explain-design-system',
          agentMessages: [
            'Un design system es tu "caja de LEGO" para diseño:\n\n- **Colores**: Paleta definida (primario, secundario, errores, exito)\n- **Tipografia**: Fuentes y tamaños consistentes\n- **Componentes**: Botones, cards, inputs, modales — reutilizables\n- **Espaciado**: Grid y margenes consistentes\n\nCon un design system, cada pantalla nueva se construye rapido y se ve consistente. Es la base de productos profesionales.',
          ],
          suggestedQuestions: [
            { label: 'Como se crea uno?', nextNodeId: 'explain-process', type: 'node' },
            { label: 'Usamos Tailwind CSS?', nextNodeId: 'explain-tailwind', type: 'node' },
            { label: 'Empecemos a diseñar', nextNodeId: 'start-design', type: 'node' },
          ],
        },
        'explain-good-ux': {
          id: 'explain-good-ux',
          agentMessages: [
            'Un buen UX sigue estos principios:\n\n1. **No me hagas pensar** — La interfaz debe ser obvia\n2. **3 clicks máximo** — Cualquier accion importante en 3 clicks o menos\n3. **Feedback inmediato** — El usuario siempre sabe que paso (cargando, exito, error)\n4. **Consistencia** — Los mismos patrones en toda la app\n5. **Mobile first** — Diseño pensado primero para celular\n\nSi el usuario necesita un manual, el UX fallo.',
          ],
          suggestedQuestions: [
            { label: 'Ejemplos de buen UX', nextNodeId: 'ux-examples', type: 'node' },
            { label: 'Empecemos mi proyecto', nextNodeId: 'start-design', type: 'node' },
            { label: 'Hablar con Pluto', nextNodeId: 'handoff-pluto', type: 'node' },
          ],
        },
        'ux-examples': {
          id: 'ux-examples',
          agentMessages: [
            'Algunos ejemplos de UX excelente:\n\n**Notion** — Cada bloque es intuitivo, arrastras y sueltas\n**Stripe** — Checkout en 2 pasos, sin friccion\n**WhatsApp** — Tu abuela lo usa sin manual\n**Airbnb** — Buscar, filtrar, reservar — flujo perfecto\n\nQue tienen en comun? **Simplicidad**. Hacen cosas complejas parecer faciles.',
          ],
          suggestedQuestions: [
            { label: 'Quiero ese nivel', nextNodeId: 'start-design', type: 'node' },
            { label: 'Que estilo recomiendas?', nextNodeId: 'explain-styles', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-tailwind': {
          id: 'explain-tailwind',
          agentMessages: [
            'Si! Usamos Tailwind CSS como base de nuestro design system:\n\n- **Utility-first** — Clases como `bg-blue-500`, `text-lg`, `rounded-xl`\n- **Consistente** — Escala de colores y espaciado predefinida\n- **Rapido** — No escribimos CSS custom, componemos utilidades\n- **Responsive** — `md:`, `lg:` para cada breakpoint\n\nCombinado con shadcn/ui tenemos componentes hermosos y accesibles out of the box.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos a diseñar', nextNodeId: 'start-design', type: 'node' },
            { label: 'Que es shadcn/ui?', nextNodeId: 'explain-shadcn', type: 'node' },
            { label: 'Hablar con Earth', nextNodeId: 'handoff-earth', type: 'node' },
          ],
        },
        'explain-shadcn': {
          id: 'explain-shadcn',
          agentMessages: [
            'shadcn/ui es una coleccion de componentes hermosos y accesibles:\n\n- Botones, dialogs, dropdowns, tablas, formularios\n- Personalizables al 100% (no es un framework cerrado)\n- Accesibles por defecto (keyboard nav, screen readers)\n- Copiamos el codigo directo a nuestro proyecto\n\nEs como tener un diseñador senior integrado en el codigo.',
          ],
          suggestedQuestions: [
            { label: 'Genial, empecemos', nextNodeId: 'start-design', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-process': {
          id: 'explain-process',
          agentMessages: [
            'Mi proceso de diseño es asi:\n\n1. **Research** — Entender usuarios y competencia\n2. **Wireframes** — Estructura en baja fidelidad\n3. **UI Design** — Diseño visual con colores y estilos\n4. **Prototipo** — Version interactiva para testear\n5. **Handoff** — Specs para que Earth lo construya\n\nCada paso lo validamos contigo antes de avanzar.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos!', nextNodeId: 'start-design', type: 'node' },
            { label: 'Hablar con Atlas primero', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Cuanto tarda?', nextNodeId: 'design-timeline', type: 'node' },
          ],
        },
        'explain-styles': {
          id: 'explain-styles',
          agentMessages: [
            'Depende de tu marca y audiencia! Los estilos mas populares:\n\n**Minimal/Clean** — Mucho espacio blanco, tipografia elegante (Apple, Notion)\n**Dark Mode** — Fondos oscuros, acentos neon (Discord, Spotify)\n**Colorful/Fun** — Colores vibrantes, ilustraciones (Slack, Duolingo)\n**Corporate** — Profesional, confiable, azules (Salesforce, HubSpot)\n\nPara startups recomiendo Dark Mode o Minimal — se ven modernos y profesionales.',
          ],
          suggestedQuestions: [
            { label: 'Me gusta Dark Mode', nextNodeId: 'start-design', type: 'node' },
            { label: 'Prefiero Minimal', nextNodeId: 'start-design', type: 'node' },
            { label: 'No se, tu decide', nextNodeId: 'start-design', type: 'node' },
          ],
        },
        'design-timeline': {
          id: 'design-timeline',
          agentMessages: [
            'Los tiempos de diseño:\n\n- **Landing page**: 1-2 dias\n- **App simple** (5-10 pantallas): 3-5 dias\n- **App compleja** (15+ pantallas): 1-2 semanas\n- **Design system completo**: 1 semana\n\nPero como trabajamos con componentes reutilizables, cada pantalla nueva tarda menos que la anterior.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos ahora', nextNodeId: 'start-design', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'start-design': {
          id: 'start-design',
          agentMessages: [
            'Perfecto! Para empezar a disenar necesito entender:\n\n1. **Tu usuario**: Quien va a usar esto? (edad, perfil, nivel tech)\n2. **La accion clave**: Que es lo MAS importante que hace el usuario en tu app?\n3. **Referentes**: Hay alguna app que te guste como se ve?\n\nCuéntame libremente, yo estructuro todo.',
            'Vamos a disenar! Cuéntame:\n\n- **Que tipo de producto es?** (app web, mobile, dashboard, landing)\n- **Para quien?** (B2B empresas, consumidores, interno)\n- **Alguna referencia visual que te guste?**\n\nEscribe lo que quieras, yo me encargo del diseño.',
          ],
          suggestedQuestions: [
            { label: 'Es una app web', nextNodeId: 'design-detail', type: 'node' },
            { label: 'Es un dashboard', nextNodeId: 'design-detail', type: 'node' },
            { label: 'Primero hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
          ],
        },
        'design-detail': {
          id: 'design-detail',
          agentMessages: [
            'Excelente! Ya tengo una idea. Para avanzar con el diseño, me ayudaria mucho tener tu contacto.\n\nDejame tu email abajo y te envio los primeros wireframes para que los revises. Tambien podemos agendar una sesion de diseño en vivo.',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Atlas sobre specs', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Hablar con Pluto sobre calidad', nextNodeId: 'handoff-pluto', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-atlas': {
          id: 'handoff-atlas',
          agentMessages: [
            'Buena idea! Atlas es nuestro Product Owner. El define las especificaciones y user stories que yo despues diseño. Te conecto!',
          ],
          suggestedQuestions: [
            { label: 'Ir con Atlas', nextNodeId: '', type: 'navigate', navigateTo: '/chat/product-owner' },
            { label: 'Seguir aqui', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-pluto': {
          id: 'handoff-pluto',
          agentMessages: [
            'Pluto se asegura de que el diseño sea robusto y cumpla estandares. Buena idea consultarlo. Te conecto!',
          ],
          suggestedQuestions: [
            { label: 'Ir con Pluto', nextNodeId: '', type: 'navigate', navigateTo: '/chat/black-belt' },
            { label: 'Seguir aqui', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-earth': {
          id: 'handoff-earth',
          agentMessages: [
            'Earth esta en entrenamiento todavia. Pero cuando este listo, mis diseños se convierten en codigo 1:1. Por ahora, definamos el diseño juntas!',
          ],
          suggestedQuestions: [
            { label: 'Ok, sigamos diseñando', nextNodeId: 'start-design', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
      },
    },
  },

  // =============================================
  // FRONT-OFFICE: Pluto (Black Belt Expert)
  // =============================================
  {
    id: 'agent-pluto',
    slug: 'black-belt',
    name: 'Pluto',
    role: 'Black Belt Expert',
    description: 'Aseguro la calidad de cada proyecto. Procesos, testing, mejores practicas y mejora continua.',
    avatar: '/agents/pluto.webp',
    color: '#22c55e',
    category: 'front-office',
    status: 'active',
    personality: 'Analitico, consultor, enfocado en calidad, procesos y mejora continua',
    conversationTree: {
      startNodeId: 'greeting',
      nodes: {
        'greeting': {
          id: 'greeting',
          agentMessages: [
            'Hola! Soy Pluto, el Black Belt de la fabrica. Me aseguro de que todo lo que construimos sea robusto, escalable y de la mas alta calidad. En que puedo asesorarte?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Bienvenido! Soy Pluto, experto en calidad y procesos. Mi rol es que tu proyecto no solo funcione hoy, sino que escale manana. Que necesitas?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
            'Hola! Pluto aqui, tu consultor de calidad. Antes de construir, asegurémonos de que las bases sean solidas. Como puedo ayudarte?\n\n_Esta es una prueba de concepto. Puedes hacer hasta 7 preguntas para ver como funcionamos._',
          ],
          suggestedQuestions: [
            { label: 'Que haces exactamente?', nextNodeId: 'explain-role', type: 'node' },
            { label: 'Que es un Black Belt?', nextNodeId: 'explain-blackbelt', type: 'node' },
            { label: 'Revisar mi proyecto', nextNodeId: 'start-review', type: 'node' },
          ],
        },
        'explain-role': {
          id: 'explain-role',
          agentMessages: [
            'Como Black Belt, me enfoco en 4 areas:\n\n1. **Calidad de Codigo** — Que sea limpio, testeable y mantenible\n2. **Procesos** — Que el equipo trabaje de forma eficiente (Agile, Kanban)\n3. **Testing** — Que todo funcione antes de llegar al usuario\n4. **Mejora Continua** — Que cada sprint sea mejor que el anterior\n\nSoy el que dice "esto puede fallar" antes de que falle.',
          ],
          suggestedQuestions: [
            { label: 'Que es testing?', nextNodeId: 'explain-testing', type: 'node' },
            { label: 'Que es Agile?', nextNodeId: 'explain-agile', type: 'node' },
            { label: 'Revisemos mi proyecto', nextNodeId: 'start-review', type: 'node' },
          ],
        },
        'explain-blackbelt': {
          id: 'explain-blackbelt',
          agentMessages: [
            'Black Belt viene de Six Sigma, una metodologia de calidad industrial:\n\n- **White Belt** — Conoce los conceptos basicos\n- **Yellow Belt** — Participa en proyectos de mejora\n- **Green Belt** — Lidera proyectos pequenos\n- **Black Belt** — Experto que lidera transformaciones\n- **Master Black Belt** — Entrena a otros Black Belts\n\nEn software, un Black Belt aplica estos principios: medir, analizar, mejorar, controlar. Cero defectos es el objetivo.',
          ],
          suggestedQuestions: [
            { label: 'Como aplicas esto al software?', nextNodeId: 'explain-quality-software', type: 'node' },
            { label: 'Que es mejora continua?', nextNodeId: 'explain-kaizen', type: 'node' },
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-review', type: 'node' },
          ],
        },
        'explain-testing': {
          id: 'explain-testing',
          agentMessages: [
            'Testing es verificar que tu software funcione correctamente. Hay varios niveles:\n\n**Unit Tests** — Prueba cada funcion individualmente\n**Integration Tests** — Prueba que los modulos trabajen juntos\n**E2E Tests** — Simula un usuario real usando la app\n**Manual Testing** — Un humano prueba los flujos criticos\n\nNuestra regla: nada va a produccion sin tests. Es la red de seguridad que evita que los bugs lleguen a tus usuarios.',
          ],
          suggestedQuestions: [
            { label: 'Cuantos tests necesito?', nextNodeId: 'testing-coverage', type: 'node' },
            { label: 'Que es CI/CD?', nextNodeId: 'explain-cicd', type: 'node' },
            { label: 'Revisemos mi proyecto', nextNodeId: 'start-review', type: 'node' },
          ],
        },
        'testing-coverage': {
          id: 'testing-coverage',
          agentMessages: [
            'La regla practica:\n\n- **MVP**: 70-80% coverage en flujos criticos (auth, pagos, core features)\n- **Produccion**: 80-90% coverage general\n- **100%**: No es realista ni necesario\n\nLo importante es testear los **happy paths** (flujo normal) y los **edge cases** (que pasa si falla el pago? si no hay internet? si el usuario hace algo inesperado?)',
          ],
          suggestedQuestions: [
            { label: 'Que herramientas usan?', nextNodeId: 'testing-tools', type: 'node' },
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Earth', nextNodeId: 'handoff-earth', type: 'node' },
          ],
        },
        'testing-tools': {
          id: 'testing-tools',
          agentMessages: [
            'Nuestro stack de testing:\n\n- **Playwright** — E2E tests (simula navegador real)\n- **Vitest** — Unit tests (rapido, compatible con TypeScript)\n- **TypeScript** — Type checking como primera linea de defensa\n- **ESLint** — Detecta problemas de codigo automaticamente\n- **CI/CD** — Tests automaticos en cada push\n\nTypescript solo ya previene el 40% de los bugs. Sumale tests y tienes un producto solido.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos mi proyecto', nextNodeId: 'start-review', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-agile': {
          id: 'explain-agile',
          agentMessages: [
            'Agile es una forma de trabajar basada en:\n\n1. **Sprints cortos** — Ciclos de 1-2 semanas con entregables concretos\n2. **Feedback rapido** — Muestras al cliente cada sprint, no al final\n3. **Adaptacion** — Si algo cambia, te adaptas (no sigues un plan rigido)\n4. **Equipo empoderado** — Cada miembro decide como hacer su trabajo\n\nVs el metodo tradicional (Waterfall) donde planeas todo al inicio y rezas para que funcione 6 meses despues.',
          ],
          suggestedQuestions: [
            { label: 'Que es Kanban?', nextNodeId: 'explain-kanban', type: 'node' },
            { label: 'Como se aplica en la fabrica?', nextNodeId: 'explain-factory-process', type: 'node' },
            { label: 'Empecemos', nextNodeId: 'start-review', type: 'node' },
          ],
        },
        'explain-kanban': {
          id: 'explain-kanban',
          agentMessages: [
            'Kanban es un sistema visual para gestionar trabajo:\n\n**Columnas:** Backlog → En Progreso → En Review → Hecho\n\n**Reglas:**\n- Maximo 3 tareas en progreso (WIP limit)\n- Si algo se bloquea, se resuelve ANTES de empezar algo nuevo\n- Flujo continuo, sin sprints fijos\n\nEs perfecto para equipos pequenos y startups. Simple pero poderoso.',
          ],
          suggestedQuestions: [
            { label: 'Suena bien, empecemos', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-quality-software': {
          id: 'explain-quality-software',
          agentMessages: [
            'En software aplico Six Sigma asi:\n\n**Medir** — Metricas de performance, error rates, tiempo de respuesta\n**Analizar** — Donde estan los cuellos de botella? Que causa los bugs?\n**Mejorar** — Refactoring, optimizacion, automatizacion\n**Controlar** — CI/CD, monitoring, alertas\n\nEl resultado: software predecible, escalable y que no te despierta a las 3am con un error en produccion.',
          ],
          suggestedQuestions: [
            { label: 'Que metricas debo monitorear?', nextNodeId: 'explain-metrics', type: 'node' },
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
          ],
        },
        'explain-kaizen': {
          id: 'explain-kaizen',
          agentMessages: [
            'Kaizen es mejora continua, un principio japones:\n\n**"Hoy mejor que ayer, mañana mejor que hoy"**\n\nEn nuestra fabrica lo aplicamos asi:\n- Despues de cada proyecto, hacemos **retrospectiva**\n- Cada error se documenta y se **blinda** para que no se repita\n- Los procesos se refinan sprint a sprint\n\nNo buscamos perfeccion. Buscamos mejorar 1% cada dia. En un año es 37x mejor.',
          ],
          suggestedQuestions: [
            { label: 'Como evitan repetir errores?', nextNodeId: 'explain-auto-blindaje', type: 'node' },
            { label: 'Empecemos', nextNodeId: 'start-review', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-auto-blindaje': {
          id: 'explain-auto-blindaje',
          agentMessages: [
            'Usamos un sistema llamado **Auto-Blindaje**:\n\n1. Error ocurre\n2. Se identifica la causa raiz\n3. Se arregla\n4. Se DOCUMENTA (que paso, como se arreglo, donde aplica)\n5. Se agrega como regla automatica\n\nComo el acero del Cybertruck: cada impacto refuerza la estructura. Nuestro sistema de desarrollo se hace mas fuerte con cada proyecto.',
          ],
          suggestedQuestions: [
            { label: 'Genial, revisemos mi proyecto', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-metrics': {
          id: 'explain-metrics',
          agentMessages: [
            'Las metricas clave para un producto digital:\n\n**Performance:**\n- Time to First Byte (TTFB) < 200ms\n- Largest Contentful Paint (LCP) < 2.5s\n- Core Web Vitals (Google los usa para SEO)\n\n**Negocio:**\n- Conversion rate\n- Churn rate\n- NPS (Net Promoter Score)\n\n**Desarrollo:**\n- Deployment frequency\n- Lead time for changes\n- Error rate en produccion',
          ],
          suggestedQuestions: [
            { label: 'Empecemos con mi proyecto', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Earth sobre tech', nextNodeId: 'handoff-earth', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'explain-cicd': {
          id: 'explain-cicd',
          agentMessages: [
            'CI/CD es la autopista de delivery de software:\n\n**CI (Continuous Integration):**\n- Cada push al repo ejecuta tests automaticos\n- Si algo falla, te avisa inmediatamente\n- El codigo siempre esta en estado deployable\n\n**CD (Continuous Deployment):**\n- Cuando pasan los tests, se despliega automaticamente\n- Sin intervención manual\n- Produccion se actualiza en minutos\n\nResultado: entregas rapidas y seguras.',
          ],
          suggestedQuestions: [
            { label: 'Que herramientas usan?', nextNodeId: 'testing-tools', type: 'node' },
            { label: 'Empecemos', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Uranus sobre infra', nextNodeId: 'handoff-uranus', type: 'node' },
          ],
        },
        'explain-factory-process': {
          id: 'explain-factory-process',
          agentMessages: [
            'En la fabrica usamos un proceso hibrido:\n\n1. **Discovery** (1-2 dias) — Atlas, Venus y yo definimos alcance\n2. **Sprint Planning** — Priorizamos user stories por impacto\n3. **Desarrollo** (sprints de 1 semana) — Earth construye\n4. **Quality Gate** — Yo reviso cada entregable\n5. **Deploy** — Uranus despliega a produccion\n6. **Retrospectiva** — Que mejoramos para el proximo sprint\n\nIteramos rapido. Feedback constante.',
          ],
          suggestedQuestions: [
            { label: 'Empecemos el discovery', nextNodeId: 'start-review', type: 'node' },
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'start-review': {
          id: 'start-review',
          agentMessages: [
            'Perfecto! Para hacer una revision de calidad necesito entender:\n\n1. **Que tienes hoy?** — App existente, idea, prototipo?\n2. **Que problemas has tenido?** — Bugs, lentitud, escalabilidad?\n3. **Cual es tu objetivo?** — Lanzar, escalar, mejorar?\n\nCuéntame y te doy un diagnostico rapido.',
            'Vamos a revisar tu proyecto. Cuéntame:\n\n- **Estado actual**: En que fase esta?\n- **Tu mayor preocupacion**: Que te quita el sueno?\n- **Expectativa**: Que resultado esperas?\n\nEscribe libremente, yo analizo.',
          ],
          suggestedQuestions: [
            { label: 'Tengo una idea nueva', nextNodeId: 'review-new', type: 'node' },
            { label: 'Tengo un producto existente', nextNodeId: 'review-existing', type: 'node' },
            { label: 'Solo quiero aprender', nextNodeId: 'explain-role', type: 'node' },
          ],
        },
        'review-new': {
          id: 'review-new',
          agentMessages: [
            'Genial! Para un proyecto nuevo, mi rol es asegurar que las bases sean solidas desde el dia 1:\n\n- **Arquitectura correcta** — Que no tengas que reescribir en 3 meses\n- **Testing desde el inicio** — Es 10x mas barato prevenir que arreglar\n- **Buenas practicas** — TypeScript estricto, CI/CD, codigo limpio\n\nDejame tu contacto y coordino con Atlas y Venus para arrancar el discovery.',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Hablar con Venus', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'review-existing': {
          id: 'review-existing',
          agentMessages: [
            'Revisar un producto existente es mi especialidad. Generalmente encuentro:\n\n- **Deuda tecnica** — Código que funciona pero es fragil\n- **Falta de tests** — El 60% de los productos no tienen tests adecuados\n- **Performance** — Queries lentas, bundles grandes, falta de caching\n- **Seguridad** — Validaciones faltantes, auth debil\n\nComparte tu proyecto (o dejame tu email) y te envio un diagnostico detallado.',
          ],
          suggestedQuestions: [
            { label: 'Dejame tu email', nextNodeId: 'contact', type: 'node' },
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'contact': {
          id: 'contact',
          agentMessages: [
            'Escribe tu email abajo y te enviamos un diagnostico gratuito de tu proyecto. Sin compromiso.\n\nTambien puedes contactarnos en hola@agentboss.cl o agendar una llamada con Carlos.',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Atlas', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-atlas': {
          id: 'handoff-atlas',
          agentMessages: [
            'Atlas es el Product Owner que define QUE construir. Buena idea empezar con el para las specs. Te conecto!',
          ],
          suggestedQuestions: [
            { label: 'Ir con Atlas', nextNodeId: '', type: 'navigate', navigateTo: '/chat/product-owner' },
            { label: 'Seguir aqui', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-venus': {
          id: 'handoff-venus',
          agentMessages: [
            'Venus diseña la experiencia de usuario. Si quieres hablar de diseño y flujos, ella es la indicada. Te conecto!',
          ],
          suggestedQuestions: [
            { label: 'Ir con Venus', nextNodeId: '', type: 'navigate', navigateTo: '/chat/ux-designer' },
            { label: 'Seguir aqui', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-earth': {
          id: 'handoff-earth',
          agentMessages: [
            'Earth, nuestro developer, aun esta en entrenamiento. Pero cuando este listo, todo lo que construya pasara por mi control de calidad. Por ahora, sigamos hablando de procesos.',
          ],
          suggestedQuestions: [
            { label: 'Ok, sigamos', nextNodeId: 'start-review', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-uranus': {
          id: 'handoff-uranus',
          agentMessages: [
            'Uranus maneja la infraestructura y deploy. Aun esta en entrenamiento, pero cuando este listo, se encargara de que todo corra en produccion sin problemas.',
          ],
          suggestedQuestions: [
            { label: 'Ok, sigamos', nextNodeId: 'start-review', type: 'node' },
            { label: 'Volver al inicio', nextNodeId: 'greeting', type: 'node' },
          ],
        },
      },
    },
  },

  // =============================================
  // BACK-OFFICE: Earth (Developer) - Coming Soon
  // =============================================
  {
    id: 'agent-earth',
    slug: 'developer',
    name: 'Earth',
    role: 'Full-Stack Developer',
    description: 'Construyo el software que el equipo diseña. Next.js, Supabase, TypeScript — codigo limpio y rapido.',
    avatar: '/agents/earth.webp',
    color: '#06b6d4',
    category: 'back-office',
    status: 'coming-soon',
    personality: 'Tecnico, eficiente, enfocado en codigo limpio y performance',
    conversationTree: {
      startNodeId: 'greeting',
      nodes: {
        'greeting': {
          id: 'greeting',
          agentMessages: [
            'Hola! Soy Earth, el developer de la fabrica. Todavia estoy en entrenamiento, pero pronto estare listo para construir tu proyecto. Por ahora, te recomiendo hablar con el equipo de discovery.',
            'Hey! Soy Earth. Aun no estoy 100% operativo, pero estoy aprendiendo rapido. Mi stack: Next.js, Supabase, TypeScript. Pronto vamos a construir cosas increibles juntos.',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Atlas (PO)', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Hablar con Venus (UX)', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Hablar con Pluto (QA)', nextNodeId: 'handoff-pluto', type: 'node' },
          ],
        },
        'handoff-atlas': {
          id: 'handoff-atlas',
          agentMessages: ['Atlas es el Product Owner. El define las specs que yo construyo. Te conecto!'],
          suggestedQuestions: [
            { label: 'Ir con Atlas', nextNodeId: '', type: 'navigate', navigateTo: '/chat/product-owner' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-venus': {
          id: 'handoff-venus',
          agentMessages: ['Venus diseña las interfaces que yo implemento. Te conecto!'],
          suggestedQuestions: [
            { label: 'Ir con Venus', nextNodeId: '', type: 'navigate', navigateTo: '/chat/ux-designer' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-pluto': {
          id: 'handoff-pluto',
          agentMessages: ['Pluto revisa la calidad de mi codigo. Te conecto con el!'],
          suggestedQuestions: [
            { label: 'Ir con Pluto', nextNodeId: '', type: 'navigate', navigateTo: '/chat/black-belt' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
      },
    },
  },

  // =============================================
  // BACK-OFFICE: Uranus (Infrastructure) - Coming Soon
  // =============================================
  {
    id: 'agent-uranus',
    slug: 'infrastructure',
    name: 'Uranus',
    role: 'Infrastructure Engineer',
    description: 'Deploy, monitoreo, escalabilidad. Me aseguro de que tu software funcione 24/7 en produccion.',
    avatar: '/agents/uranus.webp',
    color: '#f97316',
    category: 'back-office',
    status: 'coming-soon',
    personality: 'Metódico, orientado a la estabilidad y la infraestructura',
    conversationTree: {
      startNodeId: 'greeting',
      nodes: {
        'greeting': {
          id: 'greeting',
          agentMessages: [
            'Hola! Soy Uranus, encargado de infraestructura y deploy. Todavia estoy en entrenamiento, pero pronto me encargare de que tu software corra perfecto en produccion.',
            'Hey! Uranus aqui. Estoy aprendiendo sobre Vercel, Coolify, Docker y todo lo necesario para deployar tu proyecto. Pronto estare listo!',
          ],
          suggestedQuestions: [
            { label: 'Hablar con Atlas (PO)', nextNodeId: 'handoff-atlas', type: 'node' },
            { label: 'Hablar con Venus (UX)', nextNodeId: 'handoff-venus', type: 'node' },
            { label: 'Hablar con Pluto (QA)', nextNodeId: 'handoff-pluto', type: 'node' },
          ],
        },
        'handoff-atlas': {
          id: 'handoff-atlas',
          agentMessages: ['Atlas define el roadmap. Te conecto!'],
          suggestedQuestions: [
            { label: 'Ir con Atlas', nextNodeId: '', type: 'navigate', navigateTo: '/chat/product-owner' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-venus': {
          id: 'handoff-venus',
          agentMessages: ['Venus se encarga del diseño. Te conecto!'],
          suggestedQuestions: [
            { label: 'Ir con Venus', nextNodeId: '', type: 'navigate', navigateTo: '/chat/ux-designer' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
        'handoff-pluto': {
          id: 'handoff-pluto',
          agentMessages: ['Pluto asegura la calidad. Te conecto!'],
          suggestedQuestions: [
            { label: 'Ir con Pluto', nextNodeId: '', type: 'navigate', navigateTo: '/chat/black-belt' },
            { label: 'Volver', nextNodeId: 'greeting', type: 'node' },
          ],
        },
      },
    },
  },
];
