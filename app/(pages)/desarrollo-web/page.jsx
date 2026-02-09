'use client';

import { useRef, useState, useEffect } from 'react';
import Head from 'next/head';

// SEO Components
import StructuredData from '@/app/components/seo/StructuredData';
import Breadcrumbs from '@/app/components/seo/Breadcrumbs';
import {
  getLocalBusinessSchema,
  getServiceSchema,
  getFAQSchema,
  getAggregateRatingSchema,
  getBreadcrumbSchema
} from '@/app/lib/structuredData';
import { trackCTAClick } from '@/app/lib/analytics';

// Import components
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Hero from '@/app/components/desarrollo-web/Hero';
import TextSection from '@/app/components/diseno-web/TextSection';
import WhatIsDevelopment from '@/app/components/desarrollo-web/WhatIsDevelopment';
import IncludedServices from '@/app/components/desarrollo-web/IncludedServices';
import Integrations from '@/app/components/desarrollo-web/Integrations';
import CustomDevelopment from '@/app/components/desarrollo-web/CustomDevelopment';
import SiteTypesGrid from '@/app/components/diseno-web/SiteTypesGrid';
import Process from '@/app/components/desarrollo-web/Process';
import CaseStudies from '@/app/components/diseno-web/CaseStudies';
import TestimonialsSlider from '@/app/components/diseno-web/TestimonialsSlider';
import FAQAccordion from '@/app/components/desarrollo-web/FAQAccordion';
import WhatsAppForm from '@/app/components/diseno-web/WhatsAppForm';

export default function DesarrolloWebPage() {
  const [source, setSource] = useState('organic');
  const formRef = useRef(null);
  const includedRef = useRef(null);
  const [selectedPackage, setSelectedPackage] = useState('');

  // Get source from URL params on client side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const sourceParam = urlParams.get('source');
      if (sourceParam) {
        setSource(sourceParam);
      }
    }
  }, []);

  // CTA text variants based on traffic source
  const ctaConfig = {
    organic: {
      primary: 'Solicitar cotización',
      secondary: 'Ver qué incluimos',
      formCTA: 'Enviar a WhatsApp'
    },
    ads: {
      primary: 'Agenda una consulta gratis',
      secondary: 'Ver propuesta sin compromiso',
      formCTA: 'Agendar ahora'
    }
  };

  const cta = ctaConfig[source] || ctaConfig.organic;

  // Smooth scroll to form
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Smooth scroll to included services
  const scrollToIncluded = () => {
    includedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle CTA click with tracking
  const handleCTAClick = (location) => {
    trackCTAClick(cta.primary, location, source);
  };

  // Breadcrumbs data
  const breadcrumbItems = [
    { name: "Inicio", url: "https://www.aurigital.com" },
    { name: "Servicios", url: "https://www.aurigital.com/servicios" },
    { name: "Desarrollo Web", url: "https://www.aurigital.com/desarrollo-web" }
  ];

  // FAQs data for structured data
  const faqsData = [
    {
      question: "¿Qué incluye exactamente el \"desarrollo web\" y qué queda fuera?",
      answer: "Incluye implementación en producción, performance base, seguridad esencial (SSL), integraciones acordadas, QA y publicación. Queda fuera lo que no esté especificado: funcionalidades con lógica privada, integraciones nuevas no contempladas, contenido masivo y cambios de alcance sin estimación."
    },
    {
      question: "¿Cómo garantizan calidad antes de publicar?",
      answer: "Con checklist de salida: pruebas en móvil, formularios, flujos, integraciones y revisión final de performance y estabilidad. Idealmente usamos ambiente de pruebas antes de producción para validar sin afectar el sitio en vivo."
    },
    {
      question: "¿Qué acceso y propiedad me queda al final del proyecto?",
      answer: "Te quedan los accesos y el control operativo del sitio (cuentas, dominios/hosting si aplican, y el entorno de administración). También dejamos documentación mínima para continuidad y handoff."
    }
  ];

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData data={getServiceSchema(
        "Desarrollo Web",
        "Desarrollo web en Costa Rica para marcas con reputación: sitios rápidos, estables y mantenibles, con integraciones y QA antes de publicar.",
        "$$-$$$"
      )} />
      <StructuredData data={getFAQSchema(faqsData)} />
      <StructuredData data={getAggregateRatingSchema()} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <Head>
        <title>Desarrollo Web Costa Rica Aurigital: Desarrollo Páginas Web</title>
        <meta
          name="description"
          content="Desarrollo web en Costa Rica para marcas con reputación: implementación sólida, performance y automatizaciones para darte más libertad operativa."
        />
        <meta
          name="keywords"
          content="desarrollo web costa rica, desarrollo de páginas web, desarrollo web profesional, programación web costa rica, desarrollo web a medida"
        />
        <link rel="canonical" href="https://www.aurigital.com/desarrollo-web/" />

        {/* Open Graph */}
        <meta property="og:title" content="Desarrollo Web Costa Rica Aurigital: Desarrollo Páginas Web" />
        <meta
          property="og:description"
          content="Desarrollo web en Costa Rica para marcas con reputación: implementación sólida, performance y automatizaciones para darte más libertad operativa."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.aurigital.com/desarrollo-web/" />
        <meta property="og:image" content="https://www.aurigital.com/assets/og-desarrollo-web.jpg" />
        <meta property="og:locale" content="es_CR" />
        <meta property="og:site_name" content="Aurigital" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Desarrollo Web Costa Rica Aurigital: Desarrollo Páginas Web" />
        <meta
          name="twitter:description"
          content="Desarrollo web en Costa Rica para marcas con reputación: implementación sólida, performance y automatizaciones para darte más libertad operativa."
        />
        <meta name="twitter:image" content="https://www.aurigital.com/assets/og-desarrollo-web.jpg" />
        <meta name="twitter:creator" content="@aurigital" />

        {/* Geo Tags */}
        <meta name="geo.region" content="CR" />
        <meta name="geo.placename" content="Costa Rica" />
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

        {/* Breadcrumbs */}
        <div className="pt-8">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* B01 - Hero */}
        <Hero onScrollToForm={scrollToForm} onScrollToIncluded={scrollToIncluded} cta={cta} onCTAClick={handleCTAClick} />

        {/* B02 - Quiénes somos */}
        <TextSection
          title="Servicios de desarrollo web para empresas y marcas personales con reputación"
          paragraphs={[
            'Aurigital es una agencia de desarrollo web en Costa Rica que ofrece servicio de desarrollo web para empresas, PyMEs y figuras públicas que no pueden improvisar con su presencia digital. Construimos sitios mantenibles, estables y listos para operar, con un proceso claro y continuidad real.'
          ]}
        />

        {/* B03 - Qué significa "Desarrollo Web" aquí */}
        <WhatIsDevelopment />

        {/* B04 - Dolor real */}
        <TextSection
          title="Si el desarrollo es débil, la web se vuelve una carga (y se nota)"
          paragraphs={[
            'El problema no suele ser "tu marca" ni "tu oferta". El problema es cuando la implementación queda a medias:',
          ]}
          bullets={[
            'Sitio lento o inestable: se percibe barato y afecta la experiencia',
            'Integraciones incompletas: terminás resolviendo todo por chat (seguimiento, agenda, pedidos)',
            'Sin continuidad: el proveedor desaparece y nadie entiende el sitio'
          ]}
          className="bg-[#0a0a0a]"
          footer="Nuestro enfoque es el contrario: que la tecnología te descargue operación y sostenga tu reputación."
        />

        {/* B05 - Qué incluye (BASE TÉCNICA) */}
        <div ref={includedRef}>
          <IncludedServices />
        </div>

        {/* B06 - Integraciones y automatizaciones */}
        <Integrations />

        {/* B07 - Desarrollo web a medida */}
        <CustomDevelopment />

        {/* B08 - Tipos de proyectos */}
        <SiteTypesGrid />

        {/* B09 - Proceso */}
        <Process />

        {/* B10 - Casos de éxito */}
        <CaseStudies onScrollToForm={scrollToForm} cta={cta} onCTAClick={handleCTAClick} />

        {/* B11 - Testimonios */}
        <TestimonialsSlider />

        {/* B12 - Diferenciadores */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-center leading-tight">
              ¿Por qué Aurigital para{' '}
              <span className="text-[#B2FF00]">desarrollo web en Costa Rica?</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Estándar de producción: performance, estabilidad y seguridad esencial (SSL)',
                'Implementación fiel a UX/UI sin "sorpresas" en producción',
                'Integraciones y automatizaciones orientadas a operación (menos trabajo manual)',
                'Proceso serio: alcance definido, QA, control de cambios y checklist de salida',
                'Continuidad: el proyecto queda entendible y mantenible',
                'Costa Rica como foco primario; remoto cuando el alcance encaja'
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-6 bg-[#1a1a1a] border border-gray-800 rounded-xl hover:border-[#B2FF00] transition-all duration-300"
                >
                  <div className="w-2 h-2 bg-[#B2FF00] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-200 text-base md:text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B13 - Cobertura */}
        <section className="py-20 px-6 bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Desarrollo web en Costa Rica,{' '}
              <span className="text-[#B2FF00]">con capacidad remota</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Atendemos proyectos en Costa Rica y coordinamos de forma remota cuando aplica. La prioridad es la misma en ambos casos: comunicación clara, entregas ordenadas y una implementación que sostenga la reputación de la marca.
            </p>
          </div>
        </section>

        {/* B14 - FAQs */}
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
