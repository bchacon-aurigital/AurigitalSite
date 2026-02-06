'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Import components
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/diseno-web/Hero';
import TextSection from '@/app/components/diseno-web/TextSection';
import DiagnosticSection from '@/app/components/diseno-web/DiagnosticSection';
import SiteTypesGrid from '@/app/components/diseno-web/SiteTypesGrid';
import IncludedServices from '@/app/components/diseno-web/IncludedServices';
import CaseStudies from '@/app/components/diseno-web/CaseStudies';
import TestimonialsSlider from '@/app/components/diseno-web/TestimonialsSlider';
import Differentiators from '@/app/components/diseno-web/Differentiators';
import PricingCards from '@/app/components/diseno-web/PricingCards';
import PazMentalCTA from '@/app/components/diseno-web/PazMentalCTA';
import FAQAccordion from '@/app/components/diseno-web/FAQAccordion';
import WhatsAppForm from '@/app/components/diseno-web/WhatsAppForm';

export default function DisenoWebPage() {
  const formRef = useRef(null);
  const pricingRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState('');

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth scroll to pricing
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle package selection
  const handleSelectPackage = (packageName) => {
    setSelectedPackage(packageName);
    scrollToForm();
  };

  // Structured Data (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.aurigital.com/#organization',
        name: 'Aurigital',
        url: 'https://www.aurigital.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.aurigital.com/logo.png'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+506-8888-8169',
          contactType: 'customer service',
          areaServed: 'CR',
          availableLanguage: ['es', 'en']
        },
        sameAs: [
          'https://www.instagram.com/aurigital',
          'https://www.linkedin.com/company/aurigital'
        ]
      },
      {
        '@type': 'Service',
        '@id': 'https://www.aurigital.com/diseno-web/#service',
        serviceType: 'Diseño Web',
        provider: {
          '@id': 'https://www.aurigital.com/#organization'
        },
        areaServed: {
          '@type': 'Country',
          name: 'Costa Rica'
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Paquetes de Diseño Web',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paquete Esencia',
                description: 'Diseño web para marcas personales y pequeños negocios'
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '2500',
                priceCurrency: 'USD'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paquete Profesional',
                description: 'Diseño web para PyMEs y empresas establecidas'
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '4500',
                priceCurrency: 'USD'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Paquete E-commerce',
                description: 'Diseño web para tiendas online y ventas digitales'
              },
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: '7500',
                priceCurrency: 'USD'
              }
            }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.aurigital.com/diseno-web/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cómo sé si realmente necesito una web nueva o si basta con ajustar la que ya tengo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Si tu web actual no logra que la gente entienda qué ofrecés en pocos segundos, no genera consultas medibles o funciona mal en celular, normalmente no es un "ajuste menor". Si el problema es solo contenido desactualizado o una sección puntual, sí puede bastar con ajustes.'
            }
          },
          {
            '@type': 'Question',
            name: '¿Qué información tengo que tener lista antes de contratar diseño web?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Definición clara de qué vendés, a quién le vendés, servicios/productos principales, zona de atención, objetivo principal del sitio (consultas, ventas, agenda, catálogo) y material base de marca (logo/colores si existen).'
            }
          },
          {
            '@type': 'Question',
            name: '¿Por qué algunas webs cuestan muy barato y otras son más costosas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Suele cambiar el nivel de trabajo en estructura, prototipado, diseño a medida, revisiones, calidad del desarrollo, pruebas en móvil y soporte posterior.'
            }
          }
        ]
      },
      {
        '@type': 'AggregateRating',
        '@id': 'https://www.aurigital.com/diseno-web/#rating',
        ratingValue: '5',
        reviewCount: '6',
        bestRating: '5',
        worstRating: '1'
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Diseño Web Costa Rica | Aurigital: Páginas Web a Medida</title>
        <meta
          name="description"
          content="Diseño web en Costa Rica: sitios a medida alineados a tu marca. UX clara y tecnología que reduce fricción. Corporativas, e-commerce, landings, catálogos, etc."
        />
        <meta
          name="keywords"
          content="diseño web costa rica, páginas web costa rica, sitios web costa rica, desarrollo web, diseño web profesional"
        />
        <link rel="canonical" href="https://www.aurigital.com/diseno-web/" />

        {/* Open Graph */}
        <meta property="og:title" content="Diseño Web Costa Rica | Aurigital" />
        <meta
          property="og:description"
          content="Diseño web en Costa Rica: sitios a medida alineados a tu marca"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aurigital.com/diseno-web/" />
        <meta property="og:image" content="https://www.aurigital.com/og-diseno-web.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diseño Web Costa Rica | Aurigital" />
        <meta
          name="twitter:description"
          content="Diseño web en Costa Rica: sitios a medida alineados a tu marca"
        />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="bg-[#101010] py-5 px-2 overflow-x-hidden">
        <div className="bg-[#B2FF00] rounded-xl mx-auto max-w-[110rem] relative">
          {/* Navbar */}
          <Navbar
            textColor="text-black"
            menuColor="bg-black"
            buttonBgColor="bg-black"
            buttonTextColor="text-[#B2FF00]"
            buttonTextColorHover="hover:text-white"
            buttonHoverColor="hover:bg-[#000000]"
            logoVariant="dark"
            linkHoverColor="hover:text-[#000000] transition-all duration-300"
          />
        </div>

        {/* B01 - Hero */}
        <Hero onScrollToForm={scrollToForm} onScrollToPricing={scrollToPricing} />

        {/* B02 - Quiénes somos */}
        <TextSection
          title="Agencia de diseño web en Costa Rica para marcas con reputación"
          paragraphs={[
            'Aurigital es una empresa de diseño web en Costa Rica orientada a negocios top: diseñamos páginas web y sitios web que comunican valor, sostienen tu reputación y guían al usuario a una acción clara (cotizar, agendar o comprar). Presencia visual premium, más claridad, estructura y propósito.'
          ]}
        />

        {/* B03 - Propuesta de valor */}
        <TextSection
          title="Diseño web para marcas con autoridad: claras, premium y sin fricción."
          paragraphs={[
            'Tu página web no debería ser un folleto digital. Debe guiar al usuario, responder objeciones y llevarlo a una acción concreta: cotizar, agendar o comprar. Esa claridad es parte del diseño: que tu cliente entienda qué ofrecés, por qué sos diferente y cómo solicitar el servicio sin complicaciones.',
            'Y sí: lo visual importa. Los efectos, animaciones y microinteracciones son un plus premium cuando refuerzan tu presencia y hacen que tu marca se sienta más profesional, moderna y grande. La diferencia es que en Aurigital no usamos estética para tapar falta de estructura: construimos una experiencia premium con claridad, autoridad y estructura en el mismo sistema.'
          ]}
          className="bg-[#0a0a0a]"
        />

        {/* B04 - Objeción / Dolor */}
        <TextSection
          title="Si ya pagaste una web y hoy no te da orgullo mostrarla, el problema no es tu marca"
          paragraphs={[
            'Para la mayoría de nuestros clientes, que la web se vea "bonita" es el requisito número uno. Y tiene sentido. El problema es que "bonito" es subjetivo: lo difícil no es poner un diseño "lindo", sino entender qué es bonito para tu marca y ejecutarlo con fidelidad, criterio y detalle.',
            'En Aurigital eso es parte del trabajo: escuchamos, interpretamos y traducimos tu esencia en una experiencia que te represente. Y mientras vos te enfocás en lo tuyo, nosotros nos ocupamos de lo que no querés ni deberías tener que cargar: que la calidad tecnológica sea excelente y que todo funcione como debe.',
            'Hay cosas que resolvemos en todos los proyectos como estándar (navegación clara, experiencia móvil impecable, orden y estabilidad). Lo que de verdad te preocupa es esto:'
          ]}
          bullets={[
            'Que te hagan un sitio que no te guste mostrar',
            'Que te lo dejen botado y quedés sin continuidad',
            'Que no se aproveche la tecnología y sigás resolviendo todo "a mano"',
            'Que el proyecto te genere más dolores de cabeza, no tranquilidad'
          ]}
        />

        {/* B05 - Diagnóstico */}
        <DiagnosticSection onScrollToForm={scrollToForm} />

        {/* B06 - Tipos de sitios */}
        <SiteTypesGrid />

        {/* B07 - Servicios incluidos */}
        <IncludedServices />

        {/* B08 - Casos de éxito */}
        <CaseStudies onScrollToForm={scrollToForm} />

        {/* B09 - Testimonios */}
        <TestimonialsSlider />

        {/* B10 - Diferenciadores */}
        <Differentiators />

        {/* B11 - Paquetes y precios */}
        <div ref={pricingRef}>
          <PricingCards onSelectPackage={handleSelectPackage} />
        </div>

        {/* B12 - Paz Mental */}
        <PazMentalCTA />

        {/* B13 - FAQs */}
        <FAQAccordion />

        {/* Formulario WhatsApp */}
        <div ref={formRef}>
          <WhatsAppForm selectedPackage={selectedPackage} />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
