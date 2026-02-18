"use client";

import NavbarServicios from '@/app/components/ServiciosPages/NavbarServicios';
import HeroServicios from '@/app/components/ServiciosPages/HeroServicios';
import EncabezadoServicios from '@/app/components/ServiciosPages/EncabezadoServicios';
import CardsCarrusel from '@/app/components/ServiciosPages/CardsCarrusel';
import ServiciosGrid from '@/app/components/ServiciosPages/ServiciosGrid';
import TabsDesarrollo from '@/app/components/ServiciosPages/Desarrollo-web/TabsDesarrollo';
import CardsDiferenciales from '@/app/components/ServiciosPages/CardsDiferenciales';
import CarruselMedida from '@/app/components/ServiciosPages/Desarrollo-web/CarruselMedida';
import TiposSitios from '@/app/components/ServiciosPages/TiposSitios';
import CasosExito from '@/app/components/ServiciosPages/CasosExito';
import TestimoniosServicios from '@/app/components/ServiciosPages/TestimoniosServicios';
import VentajasDesarrollo from '@/app/components/ServiciosPages/Desarrollo-web/VentajasDesarrollo';
import FAQServicios from '@/app/components/ServiciosPages/FAQServicios';
import Footer from '@/app/components/ServiciosPages/Footer';
import { Gauge, Unplug, UserX, Zap, LayoutDashboard, MonitorSmartphone, ShieldCheck, UserRound, Settings, Workflow, BadgeCheck, Cog, PanelTop, ListChecks, RefreshCcw, Home } from 'lucide-react';

const Servicios = () => {
  return (
    <main className="bg-[#E9E9E9]">

      <NavbarServicios />

      {/* Hero Desarrollo Web → video se achica y cae sobre el Encabezado */}
      <HeroServicios
        title={<>Desarrollo web en<br />Costa Rica para marcas<br />que necesitan una web<br />sólida y lista para operar</>}
        description="En Aurigital hacemos desarrollo web con estándar de producción: implementamos tu sitio desde un prototipo (UX/UI) o desde cero, con performance, seguridad e integraciones que ordenan la operación. Hacemos desarrollo de páginas web principalmente en Costa Rica, y también de forma remota cuando el alcance encaja."
        features={[
          "Implementación fiel al diseño (UX/UI) con navegación clara y móvil impecable",
          "Sitio rápido, estable y seguro (SSL) para sostener reputación y confianza",
          "Integraciones y automatizaciones para reducir trabajo manual (formularios, agenda, pagos)"
        ]}
        videoSrc="/assets/servicios/servicios-pages/VideoHero.webm"
      />

      <EncabezadoServicios
        title="Servicios de desarrollo web para empresas y marcas personales con reputación"
        description="Aurigital es una agencia de desarrollo web en Costa Rica que ofrece servicio de desarrollo web para empresas, PyMEs y figuras públicas que no pueden improvisar con su presencia digital. Construimos sitios mantenibles, estables y listos para operar, con un proceso claro y continuidad real."
        ctaText="Solicitar cotización"
        secondaryText="Ver paquetes"
        onCtaClick={() => { }}
        onSecondaryClick={() => { }}
      />

      {/* Cards Desarrollo Web — con subtitle, sin CTA */}
      <CardsCarrusel
        subtitle="RESULTADOS REALES"
        title={<>Desarrollo web no es &ldquo;subir algo&rdquo;: es implementar un sistema que funcione</>}
        description={<>Cuando hablamos de desarrollo web, hablamos <br className='hidden lg:block' />  de pasar de intención a producción:</>}
        cards={[
          {
            svg: "/assets/servicios/servicios-pages/DesarrolloWeb/Vector1.svg",
            number: "01",
            title: "UI/UX",
            description: "Convertimos diseño/UX en un sitio funcional, rápido y estable"
          },
          {
            svg: "/assets/servicios/servicios-pages/DesarrolloWeb/Vector2.svg",
            number: "02.",
            title: "Arquitectura",
            description: "Implementamos estructura, componentes, formularios e integraciones"
          },
          {
            svg: "/assets/servicios/servicios-pages/DesarrolloWeb/Vector3.svg",
            number: "03.",
            title: "Resultado final",
            description: "Dejamos el sitio listo para operar, medir y mantener sin depender de \"parches\""
          }
        ]}
      />

      {/* Grid Desarrollo Web — 4 columnas, problemas comunes */}
      <ServiciosGrid
        subtitle="LA IMPORTANCIA DE UN BUEN DESARROLLO"
        title={<>Si el desarrollo es débil, <br className='hidden lg:block' /> la web se vuelve una carga <br className='hidden lg:block' /> <span className="text-[#B2FF00]">( y se nota )</span></>}
        description={<>El problema no suele ser &ldquo;tu marca&rdquo; ni &ldquo;tu oferta&rdquo;. El problema es cuando la implementación queda a medias:</>}
        columns={4}
        cards={[
          {
            icon: <Gauge size={24} className="text-[#B2FF00]" />,
            title: "Sitio lento o inestable",
            description: "Se percibe barato y afecta la experiencia del usuario"
          },
          {
            icon: <Unplug size={24} className="text-[#B2FF00]" />,
            title: "Integraciones incompletas",
            description: "terminás resolviendo todo por chat (seguimiento, agenda, pedidos)"
          },
          {
            icon: <UserX size={24} className="text-[#B2FF00]" />,
            title: "Sin continuidad",
            description: "el proveedor desaparece y nadie entiende el sitio"
          },
          {
            icon: <Zap size={24} className="text-[#B2FF00]" />,
            title: "Nuestro enfoque es el contrario",
            description: "que la tecnología te descargue operación y sostenga tu reputación."
          }
        ]}
      />

      {/* Tabs Desarrollo Web — qué incluye */}
      <TabsDesarrollo
        subtitle="LO QUE TE OFRECEMOS"
        title={<>Qué incluye nuestro desarrollo de páginas web en Costa Rica</>}
        tabs={[
          {
            number: '01',
            title: 'Implementación front-end fiel al diseño (UX/UI)',
            description: 'Convertimos el diseño en una experiencia real: componentes bien construidos, responsive y coherencia visual sin "sorpresas" en producción',
            image: '/assets/servicios/servicios-pages/DesarrolloWeb/TabsDesarrollo1.avif',
          },
          {
            number: '02',
            title: 'Back-end y lógica necesaria',
            description: 'Implementamos la lógica del servidor, bases de datos, autenticación y flujos internos que tu sitio necesita para funcionar de forma estable y segura.',
            image: '/assets/servicios/servicios-pages/DesarrolloWeb/TabsDesarrollo2.avif',
          },
          {
            number: '03',
            title: 'Performance y buenas prácticas',
            description: 'Optimizamos carga, código y recursos para que tu sitio sea rápido, liviano y cumpla estándares técnicos que sostienen reputación y posicionamiento.',
            image: '/assets/servicios/servicios-pages/DesarrolloWeb/TabsDesarrollo3.avif',
          },
          {
            number: '04',
            title: 'Seguridad esencial (SSL)',
            description: 'Configuramos certificados SSL, protección contra vulnerabilidades comunes y buenas prácticas de seguridad para proteger tu sitio y la confianza de tus usuarios.',
            image: '/assets/servicios/servicios-pages/DesarrolloWeb/TabsDesarrollo4.avif',
          },
          {
            number: '05',
            title: 'QA, ambiente de pruebas y publicación',
            description: 'Probamos en ambiente controlado antes de publicar: formularios, flujos, móvil, integraciones y estabilidad general para entregar un sitio listo para operar.',
            image: '/assets/servicios/servicios-pages/DesarrolloWeb/TabsDesarrollo5.avif',
          },
        ]}
      />

      {/* Diferenciales Desarrollo Web — 2x2 grid con hover reveal */}
      <CardsDiferenciales
        subtitle="IMPULSA TU SITIO"
        title={<>Integraciones y <br className='hidden lg:block' /> automatizaciones para <br className='hidden lg:block' /> simplificar tu operación </>}
        description={<>
          <span className="block text-black/70 text-base leading-[24px] tracking-[-0.36px] mb-3">{`La mayoría de marcas con reputación no necesitan "más visitas"; necesitan orden, respuesta ágil y procesos claros. Por eso integramos herramientas y automatizaciones que estructuran solicitudes, reducen la dependencia de chats y dejan la operación lista para escalar sin improvisación.`}</span>
          <span className="block text-black/50 text-sm leading-[24px] tracking-[-0.32px]">Estas integraciones se implementan cuando aplican; si el proyecto requiere lógica privada o flujos complejos, se aborda como <em className="text-black/70 underline">funcionalidades web a medida.</em></span>
        </>}
        columns={2}
        cards={[
          {
            title: "Agenda y reservas",
            description: "Configuración de agenda en línea para reducir ida y vuelta y estructurar solicitudes."
          },
          {
            title: "Pagos y e-commerce",
            description: "Integración de pago y flujo de compra cuando aplica, para profesionalizar ventas y reducir gestión manual."
          },
          {
            title: "CRM, email y mensajería",
            description: "Conexiones con formularios, notificaciones y seguimiento para que el proceso sea trazable."
          },
          {
            title: "Formularios avanzados y rutas de contacto",
            description: "Formularios con lógica simple (campos, filtros, rutas) para que cada solicitud llegue al lugar correcto."
          }
        ]}
      />

      {/* Carrusel Desarrollo Web a Medida — único de desarrollo web */}
      <CarruselMedida
        subtitle="LA IMPORTANCIA DE UN BUEN DESARROLLO"
        title={<>Desarrollo web a medida <br className='hidden lg:block' /> para necesidades específicas <br className='hidden lg:block' /> y privadas</>}
        description={<>Cuando el proyecto necesita reglas propias (y no solo &ldquo;una web&rdquo;), entramos a desarrollo web a medida: módulos y flujos hechos para tu operación.</>}
        cards={[
          {
            icon: <LayoutDashboard size={24} className="text-black" />,
            title: 'Paneles o dashboards administrativos',
            description: 'Creamos interfaces intuitivas que centralizan tu información para facilitar la toma de decisiones estratégicas',
          },
          {
            icon: <UserRound size={24} className="text-black" />,
            title: <>Portales con roles <br className="hidden md:block" />(usuarios, permisos, estados)</>,
            description: 'Gestiona permisos específicos, flujos de aprobación y estados personalizados de forma segura y escalable',
          },
          {
            icon: <Settings size={24} className="text-black" />,
            title: <>Automatizaciones específicas e integraciones de datos (APIs)</>,
            description: 'Eliminamos el trabajo manual sincronizando datos automáticamente y optimizando tus flujos operativos',
          },
          {
            icon: <Workflow size={24} className="text-black" />,
            title: <>Procesos internos que no deben quedar &ldquo;a mano&rdquo;</>,
            description: 'Digitaliza y estandariza esas tareas complejas que hoy dependen de la memoria o de hojas de cálculo sueltas.',
          },
        ]}
      />

      {/* Tipos de sitios — igual en ambas páginas */}
      <TiposSitios
        title={<>Tipos de páginas web y sitios <br className='hidden lg:block' /> web que diseñamos en Costa Rica</>}
        badge="SITIOS & SUS TIPOS"
        items={[
          {
            number: "01 /",
            title: "Sitios para marcas personales",
            description: "Para figuras y profesionales con reputación: una web que traduzca tu autoridad en presencia digital, con narrativa clara, prueba social y rutas de contacto limpias para que la experiencia se sienta premium.",
            tags: ["Blog", "Agenda en línea"],
            video: "/assets/servicios/servicios-pages/marca-personal.webm"
          },
          {
            number: "02 /",
            title: "Sitios web para PyMEs",
            description: "Para negocios con estándar alto: claridad de oferta, estructura ordenada y una base tecnológica que evita improvisación y te permite crecer sin rehacer el sitio después.",
            tags: ["Agenda en línea", "Catalogo en línea"],
            video: "/assets/servicios/servicios-pages/pyme.webm"
          },
          {
            number: "03 /",
            title: "Sitio web para empresas a gran escala",
            description: "Para marcas con operación y equipos: arquitectura robusta, secciones estratégicas, consistencia visual y orden de comunicación para sostener credibilidad y facilitar coordinación.",
            tags: ["Dashboards administrativos", "Blog", "Catalogo en línea"],
            video: "/assets/servicios/servicios-pages/empresa.webm"
          },
          {
            number: "04 /",
            title: "Sitios web para Eventos",
            description: "Para lanzamientos, experiencias y fechas específicas: una ruta clara, estética fuerte y tecnología orientada a registro, agenda o control de acceso, según el caso.",
            tags: ["Tiquetera con control de acceso", "Agenda en línea"],
            video: "/assets/servicios/servicios-pages/eventos.webm"
          }
        ]}
      />

      {/* Grid Desarrollo Web — 3x2 grid */}
      <ServiciosGrid
        subtitle="LA IMPORTANCIA DE UN BUEN DESARROLLO"
        title={<>Proceso de desarrollo web: <br className='hidden lg:block' /> orden, control y entregas claras</>}
        layout="grid"
        cards={[
          {
            icon: <LayoutDashboard size={24} className="text-[#B2FF00]" />,
            title: "Definición de alcance",
            description: "Qué incluye / qué no incluye (sin ambigüedades)"
          },
          {
            icon: <MonitorSmartphone size={24} className="text-[#B2FF00]" />,
            title: "Plan técnico",
            description: "Estructura, integraciones y entorno de pruebas"
          },
          {
            icon: <ShieldCheck size={24} className="text-[#B2FF00]" />,
            title: "Implementación por iteraciones",
            description: "Avances visibles y revisión ordenada"
          },
          {
            icon: <LayoutDashboard size={24} className="text-[#B2FF00]" />,
            title: "QA y pruebas",
            description: "Estabilidad, móvil, formularios, flujos e integraciones"
          },
          {
            icon: <MonitorSmartphone size={24} className="text-[#B2FF00]" />,
            title: "Lanzamiento",
            description: "Checklist final y publicación"
          },
          {
            icon: <ShieldCheck size={24} className="text-[#B2FF00]" />,
            title: "Documentación y continuidad",
            description: <>Base mantenible para evolutivo o mantenimiento <em className="text-white/70 underline">mantenimiento</em></>
          }
        ]}
      />

      {/* Casos de éxito — igual en ambas páginas */}
      <CasosExito
        subtitle="Casos reales"
        title={<>Diseño web que eleva la <br className='hidden lg:block' /> la marca y ordena la operación</>}
        description="Resultados medibles con clientes reales. Conoce como solucionamos los problemas de nuestros clientes y elevamos sus negocios al siguiente nivel"
        cases={[
          {
            logo: "/assets/servicios/servicios-pages/CIOCR-Logo.svg",
            client: "CIOCR - Congreso Internacional Odontológico",
            href: "https://ciocr.org",
            problem: "Necesitaban un proveedor local que manejara tanto la web como el sistema de control de acceso para su congreso anual",
            solution: "Sistema completo de inscripciones, ventas de entradas, integración de pagos y dashboard administrativo dinámico",
            result: "Actualización en tiempo real, transacciones resueltas el mismo día, cronograma dinámico del evento"
          },
          {
            logo: "/assets/servicios/servicios-pages/Columbia-Logo.svg",
            client: "Grupo Columbia - Cadena de Emisoras",
            problem: "Sitios pesados, llenos de captchas y publicidad, experiencia móvil terrible, WordPress se caía con tráfico alto",
            solution: "Rediseño headless con Next.js (frontend) + WordPress (backend), reproductor tipo Spotify, integración con Cloudinary",
            result: "Cero caídas del servidor, experiencia similar a Spotify, picos masivos en elecciones sin problemas"
          },
          {
            logo: "/assets/servicios/servicios-pages/Servidental-Logo.svg",
            client: "Servidental - Equipamiento Médico Dental",
            href: "https://servidentalcr.com/",
            problem: "WordPress desactualizado, sin tiempo para mantenerlo, catálogo limitado y sin funcionalidad de ventas",
            solution: "Catálogo en Next.js, rediseño con WordPress headless, blog para SEO, e-commerce completo con WooCommerce",
            result: "De catálogo básico a e-commerce funcional con ventas automáticas, integración Tilopay, evolución constante mes a mes"
          }
        ]}
      />

      <TestimoniosServicios
        subtitle="TESTIMONIOS"
        title="Nuestros clientes valoran nuestro servicio de diseño web con 5 estrellas"
        description="Conoce las opiniones de nuestros clientes y su satisfacción con los resultados finales"
        testimonials={[
          {
            quote: "Después de mucho tiempo y malas experiencias con manejadores web, apareció Aurigital. Excelente servicio, full cumplimiento y siempre acompañando en todos los procesos. Recomendados a todo nivel… gracias equipo.",
            name: "Daniel Hernandez",
            company: "Agua de la Sierra"
          },
          {
            quote: "En Servidental CR, contratamos los servicios de Aurigital para la actualización de nuestro sitio web, y no podríamos estar más satisfechos. Desde el primer momento, el equipo demostró gran profesionalismo y tiempos de respuesta sumamente eficientes. Nos acompañaron en todo el proceso, escuchando nuestras ideas y ayudándonos a plasmarlas de manera clara y efectiva en la web. Gracias a su atención personalizada, logramos transmitir nuestro mensaje a los clientes tal como lo habíamos imaginado. Recomiendo a Aurigital sin reservas; su servicio es excepcional.",
            name: "Allan Chan",
            company: "Servidental CR"
          },
          {
            quote: "Haber elegido a Aurigital como creadores de la página web para mi proyecto Pranayama Costa Rica ha sido de las mejores decisiones del año. Desde el inicio he sentido respaldo total, compromiso, creatividad, apertura en comunicación y la sensación de que somos un equipo buscando elevar el proyecto a un nuevo plano. Aplaudo el profesionalismo y la superación de la marca Aurigital, y estoy seguro que cada uno de sus proyectos es mejor que el anterior. 100% recomendados.",
            name: "Kenneth Chacón",
            company: "Pranayama"
          },
          {
            quote: "He sido barbero profesional por más de 8 años y mi mayor problema ha sido el manejo de citas para mis clientes. Muchos me escriben o llaman durante mis horas de trabajo, y se me complicaba atender sus consultas, lo que ocasiona la pérdida de clientes. Aurigital me ha ahorrado tiempo, facilitando la agenda con un solo click. Su diseño web y facilidad de uso logran que la experiencia sea siempre positiva. Yo personalmente solo puedo compartir felicidad y completo respaldo y admiración a esta gran empresa. Siempre agradecido y recomendado, Gracias Aurigital.",
            name: "Abraham Corella",
            company: "Abraham Studio"
          },
          {
            quote: "Aurigital me ayudó a conocer mis necesidades en el mundo digital y se han encargado de acompañarme en el proceso. Junto a ellos he podido desarrollar no solo una página web estética, sino funcional. Me ayudaron a organizar mi proceso de agendar clientes, venta de libros, promoción de talleres nuevos y creación de un blog para explotar mi creatividad. Estoy segura de que puedo seguir confiando en su trabajo para seguir construyendo plataformas de crecimiento, conocimiento y amor.",
            name: "Tulsi Diaz",
            company: "Tulsi Psicóloga"
          },
        ]}
      />

      {/* Ventajas de trabajar con Aurigital — único de desarrollo web */}
      <VentajasDesarrollo
        subtitle="VENTAJAS DE TRABAJAR CON AURIGITAL"
        title={<>¿Por qué <span className="font-extrabold italic text-[#2f2f2f]">Aurigital</span> para desarrollo web en Costa Rica?</>}
        ctaText="PORQUÉ NOSOTROS"
        onCtaClick={() => { }}
        cards={[
          {
            icon: <BadgeCheck size={24} className="text-[#252525]" />,
            title: 'Estándar de producción',
            description: 'Performance, estabilidad y seguridad esencial (SSL)',
          },
          {
            icon: <Cog size={24} className="text-[#252525]" />,
            title: 'Integraciones y automatizaciones',
            description: 'Integraciones y automatizaciones orientadas a operación (menos trabajo manual)',
          },
          {
            icon: <PanelTop size={24} className="text-[#252525]" />,
            title: 'Fidelidad al UI/UX',
            description: 'Implementación fiel a UX/UI sin "sorpresas" en producción',
          },
          {
            icon: <ListChecks size={24} className="text-[#252525]" />,
            title: 'Proceso serio',
            description: 'Alcance definido, QA, control de cambios y checklist de salida',
          },
          {
            icon: <RefreshCcw size={24} className="text-[#252525]" />,
            title: 'Continuidad',
            description: 'El proyecto queda entendible y mantenible',
          },
          {
            icon: <Home size={24} className="text-[#252525]" />,
            title: 'Nacionalidad',
            description: 'Costa Rica como foco primario; remoto cuando el alcance encaja',
          },
        ]}
      />

      {/* FAQ Desarrollo Web — split header, 2 columnas */}
      <FAQServicios
        subtitle="MODALIDAD REMOTA"
        title={<>Desarrollo web en Costa <br className='hidden lg:block' /> Rica, con capacidad remota</>}
        description="Atendemos proyectos en Costa Rica y coordinamos de forma remota cuando aplica. La prioridad es la misma en ambos casos: comunicación clara, entregas ordenadas y una implementación que sostenga la reputación de la marca."
        layout="split"
        faqs={[
          {
            question: '¿Qué incluye exactamente el "desarrollo web" y qué queda fuera?',
            answer: 'Incluye implementación en producción, performance base, seguridad esencial (SSL), integraciones acordadas, QA y publicación. Queda fuera lo que no esté especificado: funcionalidades con lógica privada, integraciones nuevas no contempladas, contenido masivo y cambios de alcance sin estimación.'
          },
          {
            question: '¿Cómo evitan que el proyecto se convierta en "parches" o quede inestable con el tiempo?',
            answer: 'Con alcance claro, estructura técnica mantenible, QA antes de publicar y control de cambios. La prioridad es que el sitio quede entendible, estable y fácil de evolucionar sin romperse en cada ajuste.'
          },
          {
            question: '¿Qué pasa si durante el proyecto me doy cuenta de que necesito más funcionalidades?',
            answer: 'Se documenta el cambio, se estima y se prioriza. Preferimos formalizar ajustes en vez de "meter cosas" sin control, para proteger estabilidad, tiempos y calidad.'
          },
          {
            question: '¿Puedo contratar desarrollo si ya tengo diseño/prototipo, o si mi web ya existe?',
            answer: 'Sí. Podemos implementar desde un diseño existente o trabajar sobre un sitio ya publicado, siempre que el alcance sea claro. Si la base actual limita rendimiento o mantenimiento, se recomienda re-implementación parcial o total. Nota importante: podemos trabajar sobre un diseño existente pero NO sobre una página web ya hecha. La mayoría están en algún constructor de sitios como Wix o WordPress. No trabajamos ni mantenemos esos sistemas. Incluso si está hecha en código, no podemos garantizar la calidad del código que entreguemos ya que no fue estructurado por nosotros, y muchas veces para hacerlo bien hay que empezar de cero.'
          },
          {
            question: '¿Cómo manejan integraciones y automatizaciones para reducir trabajo manual?',
            answer: 'Las definimos según tu flujo real (captación, agenda, pedidos, comunicación). Implementamos integraciones acordadas (formularios, agenda, pagos, CRM/email) y dejamos el proceso ordenado para que no dependa de chats para todo.'
          },
          {
            question: '¿Qué tan "a medida" puede ser el desarrollo sin volverse un sistema gigante?',
            answer: 'Depende de reglas, roles y flujos. Si son ajustes puntuales, se integran dentro del sitio. Si hay lógica privada o procesos internos (dashboards, portales, tiqueteras con reglas), se aborda como módulo a medida con especificación y estimación propia.'
          },
          {
            question: '¿Cómo garantizan calidad antes de publicar?',
            answer: 'Con checklist de salida: pruebas en móvil, formularios, flujos, integraciones y revisión final de performance y estabilidad. Idealmente usamos ambiente de pruebas antes de producción para validar sin afectar el sitio en vivo.'
          },
          {
            question: '¿Qué acceso y propiedad me queda al final del proyecto?',
            answer: 'Te quedan los accesos y el control operativo del sitio (cuentas, dominios/hosting si aplican, y el entorno de administración). También dejamos documentación mínima para continuidad y handoff.'
          },
          {
            question: '¿Qué pasa después del lanzamiento si necesito cambios, soporte o evolución?',
            answer: 'Podés trabajar mejoras puntuales por alcance, o continuar con mantenimiento/evolución para asegurar continuidad, actualizaciones y mejoras sin improvisación. El objetivo es que el proyecto no quede "botado" con el tiempo.'
          }
        ]}
      />

      <Footer />
    </main>
  );
};

export default Servicios;
