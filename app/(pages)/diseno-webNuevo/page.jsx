"use client";

import NavbarServicios from '@/app/components/ServiciosPages/NavbarServicios';
import HeroServicios from '@/app/components/ServiciosPages/HeroServicios';
import EncabezadoServicios from '@/app/components/ServiciosPages/EncabezadoServicios';
import GarantiaResultados from '@/app/components/ServiciosPages/Diseno-web/GarantiaResultados';
import CardsCarrusel from '@/app/components/ServiciosPages/CardsCarrusel';
import TiposSitios from '@/app/components/ServiciosPages/TiposSitios';
import ServiciosGrid from '@/app/components/ServiciosPages/ServiciosGrid';
import CasosExito from '@/app/components/ServiciosPages/CasosExito';
import TestimoniosServicios from '@/app/components/ServiciosPages/TestimoniosServicios';
import CardsDiferenciales from '@/app/components/ServiciosPages/CardsDiferenciales';
import PlanesPrecios from '@/app/components/ServiciosPages/Diseno-web/PlanesPrecios';
import FAQServicios from '@/app/components/ServiciosPages/FAQServicios';
import Footer from '@/app/components/ServiciosPages/Footer';
import { EyeOff, Frown, Ban, Bug, LayoutDashboard, MonitorSmartphone, ShieldCheck, Laptop } from 'lucide-react';

const Servicios = () => {
  return (
    <main className="bg-[#E9E9E9]">

      <NavbarServicios />

      {/* Hero Diseño Web → video se achica y cae sobre el Encabezado */}
      <HeroServicios
        title={<>Diseño web en<br />Costa Rica para<br />marcas con autoridad</>}
        description="En Aurigital diseñamos páginas web y sitios web a medida (sin plantillas genéricas por defecto) para empresas, PyMEs y emprendedores que necesitan una web que se entienda, se vea profesional y genere contactos reales."
        features={[
          "Prototipo navegable + diseño alineado a tu marca",
          "Experiencia móvil impecable (responsivo) y navegación clara",
          "Sitio rápido, seguro (SSL) y con ruta clara (CTA, formularios)"
        ]}
        videoSrc="/assets/servicios/servicios-pages/VideoHero.webm"
      />

      <EncabezadoServicios
        title="Agencia de diseño web en Costa Rica para marcas con reputación"
        description="Aurigital es una empresa de diseño web en Costa Rica orientada a negocios top: diseñamos páginas web y sitios web que comunican valor, sostienen tu reputación y guían al usuario a una acción clara (cotizar, agendar o comprar). Presencia visual premium, más claridad, estructura y propósito."
        ctaText="Solicitar cotización"
        secondaryText="Ver paquetes"
        onCtaClick={() => { }}
        onSecondaryClick={() => { }}
      />

            {/* Garantía de resultados — único de diseño web */}
            <GarantiaResultados
        icon="/assets/servicios/servicios-pages/DisenoWeb/FlechaIcon.svg"
        subtitle="Somos más que solo sitios"
        title="Garantizamos resultados de la mayor calidad"
        description="Nos especializamos en entender a nuestros clientes y darles un resultado que lleve a sus marcas al siguiente nivel"
        section1={{
          badge: 'Lo que BUSCAMOS',
          heading: 'Diseño web para marcas con autoridad: claras, premium y sin fricción',
          text: 'Tu página web no debería ser un folleto digital. Debe guiar al usuario, responder objeciones y llevarlo a una acción concreta: cotizar, agendar o comprar. Esa claridad es parte del diseño: que tu cliente entienda qué ofrecés, por qué sos diferente y cómo solicitar el servicio sin complicaciones.',
          images: [
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados3.avif',
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados2.avif',
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados1.avif',
          ],
          importaBadge: '¿Esto importa?',
          importaText: 'Y sí, lo visual importa. Los efectos, animaciones y microinteracciones son un plus premium cuando refuerzan tu presencia y hacen que tu marca se sienta más profesional, moderna y grande. La diferencia es que en Aurigital no usamos estilos estéticos para tapar falta de estructura: construimos una experiencia premium con claridad, autoridad y estructura en el mismo sistema.',
        }}
        section2={{
          badge: 'NOS IMPORTA TU MARCA',
          heading: 'Si ya pagaste una web y hoy no te da orgullo mostrarla, el problema no es tu marca',
          texts: [
            'Para la mayoría de nuestros clientes, que la web se vea \u201Cbonita\u201D es el requisito número uno. Y tiene sentido. El problema es que \u201Cbonito\u201D es subjetivo: lo difícil no es poner un diseño \u201Clindo\u201D, sino entender qué es bonito para tu marca y ejecutarlo con fidelidad, criterio y detalle.',
            'En Aurigital eso es parte del trabajo: escuchamos, interpretamos y traducimos tu esencia en una experiencia que te represente. Y mientras vos te enfocás en lo tuyo, nosotros nos ocupamos de lo que no querés ni deberías tener que cargar: que la calidad tecnológica sea excelente y que todo funcione como debe.',
          ],
          secondImage: '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados4.avif',
          bottomText: 'Hay cosas que resolvemos en todos los proyectos como estándar (navegación clara, experiencia móvil impecable, orden y estabilidad). Lo que de verdad te preocupa es esto:',
          concerns: [
            { icon: EyeOff, title: 'Resultado pobre', text: 'Que te hagan un sitio que no te guste mostrar' },
            { icon: Frown, title: 'Sin seguimiento', text: 'Que te lo dejen botado y quedés sin continuidad' },
            { icon: Ban, title: 'Potencial limitado', text: 'Que no se aproveche la tecnología y sigás resolviendo todo "a mano"' },
            { icon: Bug, title: 'Una carga y no un alivio', text: 'Que el proyecto te genere más dolores de cabeza, no tranquilidad' },
          ],
        }}
      />

      {/* Cards Diseño Web — sin subtitle, con CTA y anotación en título */}
      <CardsCarrusel
        title={<>Diagnóstico tecnológico: <br className='hidden lg:block' /> verificamos si tu web aprovecha <br className='hidden lg:block' /> la tecnología <span className="text-base md:text-lg lg:text-xl font-normal normal-case tracking-normal"><br className='block md:hidden' />[y qué la frena]</span></>}
        description="Antes de diseñar, revisamos lo que define la experiencia, la claridad del mensaje y la tranquilidad operativa. La idea es simple: que tu web represente tu marca y funcione con criterio, sin fricción."
        ctaText="Solicitar diagnóstico y cotización"
        onCtaClick={() => { }}
        desktopSlides={3.2}
        cards={[
          {
            svg: "/assets/servicios/servicios-pages/DisenoWeb/Vector1.svg",
            number: "01",
            title: "Estructura y navegación",
            description: "¿Qué busca el usuario y qué encuentra?"
          },
          {
            svg: "/assets/servicios/servicios-pages/DisenoWeb/Vector2.svg",
            number: "02.",
            title: "Mensaje y claridad",
            description: "Propuesta de valor, secciones y CTAs"
          },
          {
            svg: "/assets/servicios/servicios-pages/DisenoWeb/Vector3.svg",
            number: "03.",
            title: "Experiencia móvil",
            description: "Lectura, botones, formularios y velocidad real"
          },
          {
            svg: "/assets/servicios/servicios-pages/DisenoWeb/Vector4.webp",
            number: "04.",
            title: "Confianza",
            description: "Coherencia visual, orden, seguridad y claridad"
          },
          {
            svg: "/assets/servicios/servicios-pages/DisenoWeb/Vector5.webp",
            number: "05.",
            title: "Estructura tecnológica",
            description: "Licencias, herramientas y mini-funciones que te quitan trabajo y ordenan la operación"
          }
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

      {/* Grid Diseño Web — 3 cards + 1 full-width */}
      <ServiciosGrid
        subtitle="[ lo que incluye tu proyecto ]"
        title={<>Servicios de diseño <br className='hidden lg:block' /> web profesional</>}
        description={<>Si el proyecto requiere lógica privada, integraciones o flujos complejos, lo abordamos como <em className="text-white/70 underline">desarrollo web</em></>}
        layout="featured"
        cards={[
          {
            icon: <LayoutDashboard size={24} className="text-[#B2FF00]" />,
            title: "Diseño UX/UI y prototipo navegable",
            description: "Definimos secciones, jerarquía de contenido y diseño visual antes de construir, para evitar \"adivinar\" en producción."
          },
          {
            icon: <MonitorSmartphone size={24} className="text-[#B2FF00]" />,
            title: "Diseño responsivo (mobile first)",
            description: "Tu web debe funcionar perfecta en celular: lectura, botones, formularios y navegación."
          },
          {
            icon: <ShieldCheck size={24} className="text-[#B2FF00]" />,
            title: "Base técnica esencial",
            description: "Sitio rápido, seguro (SSL) y bien estructurado para que cargue bien y se sienta confiable."
          },
          {
            icon: <Laptop size={24} className="text-[#B2FF00]" />,
            title: "Consultoría tecnológica integral",
            description: "Te orientamos desde el inicio para alinear la web con las herramientas que ya usás y definir qué necesitás para simplificar procesos (captación, agenda, pedidos, comunicación) incluyendo automatizaciones y configuración de herramientas cuando aplican. El objetivo es que la tecnología te quite carga operativa, no que te agregue trabajo."
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

      {/* Diferenciales Diseño Web — 3x2 grid con hover reveal */}
      <CardsDiferenciales
        title={<>¿Por qué elegir Aurigital para <br className='hidden lg:block' /> diseñar tu página web en Costa Rica?</>}
        badge="PORQUÉ NOSOTROS"
        columns={3}
        cards={[
          {
            title: "Diseño a medida",
            description: "No arrancamos con plantillas genéricas por defecto"
          },
          {
            title: "Prototipo navegable antes de construir",
            description: "Claridad y control desde el inicio"
          },
          {
            title: "Claridad de ruta",
            description: "Estructura, mensajes y CTAs para que el usuario sepa exactamente qué hacer para contratarte, agendar o comprar"
          },
          {
            title: "Experiencia móvil real",
            description: "No \"adaptado\", sino diseñado para celular"
          },
          {
            title: "Proceso ordenado por etapas",
            description: "Entregas, revisiones y control de cambios"
          },
          {
            title: "Posibilidad de escalar",
            description: "e-commerce, mejoras y evolutivo con \"Paz Mental\""
          }
        ]}
      />

      {/* Planes y Precios — único de diseño web */}
      <PlanesPrecios
        plans={[
          {
            name: "Startup pack",
            price: "Desde $3,450",
            timeline: "3-4 meses",
            idealPara: "PyMEs y empresas establecidas",
            features: [
              "Primera funcionalidad premium sin costo extra",
              "Incluye todo lo del Professional Pack",
              "Prototipo Navegable",
              "Hasta 4 páginas sin límite de secciones",
              "SEO Intermedio Optimizado",
              "Animaciones y microanimaciones",
              "Integraciones headless personalizadas",
              "Generación de contenido IA",
              "Funcionalidades básicas ilimitadas"
            ]
          },
          {
            name: "Professional Pack",
            price: "Desde $2,000",
            timeline: "2 meses",
            idealPara: "Marcas personales y pequeños negocios",
            features: [
              "1 página única sin límite de secciones",
              "Diseño web personalizado y único para la marca",
              "Diseño adaptable a todos los dispositivos (escritorio, tablet, celular)",
              "SEO básico optimizado",
              "Revisiones ilimitadas",
              "Dominio y Hosting incluidos",
              "Hasta 3 funcionalidades básicas",
              "Formulario de contacto",
              "Microanimaciones simples"
            ]
          },
          {
            name: "Enterprise Pack",
            price: "Desde $6,800",
            timeline: "4-6 meses",
            idealPara: "Empresas grandes y proyectos complejos",
            features: [
              "Incluye todo lo del Startup Pack",
              "Hasta 8 páginas completamente personalizadas",
              "SEO Avanzado Optimizado",
              "Multilenguaje",
              "Consultoría técnica para integraciones dentro y fuera del sitio web",
              "Integración completa con ecosistema digital",
              "Dos funcionalidades premium sin costo extra"
            ]
          }
        ]}
        pazMental={{
          subtitle: "Paz mental : mantenimiento y evolución"
        }}
      />

      {/* FAQ Diseño Web — centrado, 1 columna */}
      <FAQServicios
        subtitle="PREGUNTAS FRECUENTES"
        title={<>Preguntas frecuentes <br className='hidden lg:block' /> sobre diseño web en Costa Rica</>}
        layout="centered"
        faqs={[
          {
            question: '¿Cómo sé si realmente necesito una web nueva o si basta con ajustar la que ya tengo?',
            answer: 'Si tu web actual no logra que la gente entienda qué ofrecés en pocos segundos, no genera consultas medibles o funciona mal en celular, normalmente no es un "ajuste menor". Si el problema es solo contenido desactualizado o una sección puntual, sí puede bastar con ajustes.'
          },
          {
            question: '¿Qué información tengo que tener lista antes de contratar diseño web?',
            answer: 'Definición clara de qué vendés, a quién le vendés, servicios/productos principales, zona de atención, objetivo principal del sitio (consultas, ventas, agenda, catálogo) y material base de marca (logo/colores si existen). Si tenés referencias visuales, ayudan a alinear estilo sin improvisar.'
          },
          {
            question: '¿Qué debería entregar una "web de alta calidad" más allá de verse bonita?',
            answer: 'Claridad del mensaje, navegación simple, buena experiencia en celular, tiempos de carga razonables, formularios que funcionen y una estructura que guíe al usuario a una acción concreta.'
          },
          {
            question: '¿Qué puedo esperar como resultado realista después de publicar mi página web?',
            answer: 'Más confianza y credibilidad, mejor capacidad de convertir interesados en consultas y una base sólida para campañas o crecimiento orgánico. No es realista esperar ventas automáticas si no existe una fuente de tráfico o una oferta clara.'
          },
          {
            question: '¿Qué debería quedar claro en una cotización para evitar sorpresas?',
            answer: 'Alcance de secciones/páginas, qué incluye y qué no incluye, rondas de revisión, tiempos por etapa, si incluye e-commerce, si incluye publicación, y cómo se manejarán cambios fuera de alcance.'
          },
          {
            question: '¿Por qué algunas webs cuestan muy barato y otras son más costosas?',
            answer: 'Suele cambiar el nivel de trabajo en estructura, prototipado, diseño a medida, revisiones, calidad del desarrollo, pruebas en móvil y soporte posterior. Muchas webs baratas recortan en esas capas y el costo aparece después en rehacer o "parchar".'
          },
          {
            question: '¿Qué pasa si no tengo fotos profesionales o textos listos?',
            answer: 'Se puede avanzar con material provisional, pero la calidad percibida puede bajar. Lo ideal es definir qué contenido es imprescindible para publicar y qué puede mejorarse luego sin bloquear el lanzamiento.'
          },
          {
            question: '¿En qué casos conviene una landing page y en cuáles un sitio web completo?',
            answer: 'Landing: cuando tenés una oferta clara y querés una sola acción (solicitud/cotización). Sitio completo: cuando el usuario necesita más información para decidir (servicios, confianza, pruebas, preguntas).'
          },
          {
            question: '¿Qué diferencia hay entre "diseño web" y "desarrollo web" en términos prácticos?',
            answer: 'El diseño define estructura, experiencia y cómo se comunica la propuesta de valor. El desarrollo web implementa funcionamiento, rendimiento e integraciones. Son etapas distintas pero complementarias.'
          }
        ]}
      />

      <Footer />
    </main>
  );
};

export default Servicios;
