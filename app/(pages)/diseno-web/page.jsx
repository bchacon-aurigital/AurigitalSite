"use client";

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import Footer from '@/app/components/Footer';
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
import { useContactModal } from '@/app/context/ContactModalContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { EyeOff, Frown, Ban, Bug, LayoutDashboard, MonitorSmartphone, ShieldCheck, Laptop } from 'lucide-react';

const breadcrumbItems = [
  { name: "Inicio", url: "https://aurigital.com" },
  { name: "Servicios", url: "https://aurigital.com/servicios" },
  { name: "Diseño Web", url: "https://aurigital.com/diseno-web" }
];

const serviciosGridIcons = [
  <LayoutDashboard key={0} size={24} className="text-[#B2FF00]" />,
  <MonitorSmartphone key={1} size={24} className="text-[#B2FF00]" />,
  <ShieldCheck key={2} size={24} className="text-[#B2FF00]" />,
  <Laptop key={3} size={24} className="text-[#B2FF00]" />
];

const Servicios = () => {
  const [source, setSource] = useState('organic');
  const { openModal } = useContactModal();
  const { translations } = useLanguage();
  const t = translations.disenoWeb;
  const shared = translations.serviciosShared;

  useEffect(() => {
    AOS.init({ once: true, offset: 100 });
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const sourceParam = urlParams.get('source');
      if (sourceParam) setSource(sourceParam);
    }
  }, []);

  const handleCTAClick = (location) => {
    trackCTAClick(t?.encabezado?.ctaText || 'Solicitar cotización', location, source);
  };

  const faqsData = t?.faq?.faqs?.slice(0, 3) || [];

  return (
    <>
      <StructuredData data={getLocalBusinessSchema()} />
      <StructuredData data={getServiceSchema(
        "Diseño Web",
        "Diseño web en Costa Rica: sitios a medida alineados a tu marca. UX clara y tecnología que reduce fricción. Corporativas, e-commerce, landings, catálogos.",
        "$$-$$$"
      )} />
      <StructuredData data={getFAQSchema(faqsData)} />
      <StructuredData data={getAggregateRatingSchema()} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="bg-[#E9E9E9]">

      <NavbarServicios />

      <HeroServicios
        title={<>{t?.hero?.titlePart1} <br />{t?.hero?.titlePart2} <br />{t?.hero?.titlePart3}</>}
        description={t?.hero?.description}
        features={t?.hero?.features}
        videoSrc="/assets/servicios/servicios-pages/video-Hero.webm"
      />

      <EncabezadoServicios
        title={t?.encabezado?.title}
        description={t?.encabezado?.description}
        ctaText={t?.encabezado?.ctaText}
        secondaryText={t?.encabezado?.secondaryText}
        onCtaClick={() => { handleCTAClick('encabezado_primary'); openModal(); }}
        onSecondaryClick={() => { handleCTAClick('encabezado_secondary'); document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' }); }}
      />

      <GarantiaResultados
        icon="/assets/servicios/servicios-pages/DisenoWeb/FlechaIcon.svg"
        subtitle={t?.garantiaResultados?.subtitle}
        title={t?.garantiaResultados?.title}
        description={t?.garantiaResultados?.description}
        section1={{
          badge: t?.garantiaResultados?.section1?.badge,
          heading: t?.garantiaResultados?.section1?.heading,
          text: t?.garantiaResultados?.section1?.text,
          images: [
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados3.avif',
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados2.avif',
            '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados1.avif',
          ],
          importaBadge: t?.garantiaResultados?.section1?.importaBadge,
          importaText: t?.garantiaResultados?.section1?.importaText,
        }}
        section2={{
          badge: t?.garantiaResultados?.section2?.badge,
          heading: t?.garantiaResultados?.section2?.heading,
          texts: t?.garantiaResultados?.section2?.texts,
          secondImage: '/assets/servicios/servicios-pages/DisenoWeb/GarantiaResultados4.avif',
          bottomText: t?.garantiaResultados?.section2?.bottomText,
          concerns: [
            { icon: EyeOff, title: t?.garantiaResultados?.section2?.concerns?.[0]?.title, text: t?.garantiaResultados?.section2?.concerns?.[0]?.text },
            { icon: Frown, title: t?.garantiaResultados?.section2?.concerns?.[1]?.title, text: t?.garantiaResultados?.section2?.concerns?.[1]?.text },
            { icon: Ban, title: t?.garantiaResultados?.section2?.concerns?.[2]?.title, text: t?.garantiaResultados?.section2?.concerns?.[2]?.text },
            { icon: Bug, title: t?.garantiaResultados?.section2?.concerns?.[3]?.title, text: t?.garantiaResultados?.section2?.concerns?.[3]?.text },
          ],
        }}
      />

      <CardsCarrusel
        title={<>{t?.diagnostico?.titlePart1} <br className='hidden lg:block' />{t?.diagnostico?.titlePart2} <br className='hidden lg:block' />{t?.diagnostico?.titlePart3} <span className="text-base md:text-lg lg:text-xl font-normal normal-case tracking-normal"><br className='block md:hidden' />{t?.diagnostico?.titleAnnotation}</span></>}
        description={t?.diagnostico?.description}
        ctaText={t?.diagnostico?.ctaText}
        onCtaClick={() => { handleCTAClick('diagnostic_section'); openModal(); }}
        desktopSlides={3.2}
        note={<>{t?.diagnostico?.notePrefix}<a href="/auditoria-web-tecnica/" className="text-black/80 underline font-semibold hover:text-black transition-colors">{t?.diagnostico?.noteLink}</a>{t?.diagnostico?.noteSuffix}</>}
        cards={t?.diagnostico?.cards?.map((card, i) => ({
          svg: `/assets/servicios/servicios-pages/DisenoWeb/Vector${i + 1}.${i < 3 ? 'svg' : 'webp'}`,
          number: card.number,
          title: card.title,
          description: card.description
        }))}
      />

      <TiposSitios
        title={<>{shared?.tiposSitios?.titlePart1} <br className='hidden lg:block' /> {shared?.tiposSitios?.titlePart2}</>}
        badge={shared?.tiposSitios?.badge}
        items={shared?.tiposSitios?.items}
        note={<>{shared?.tiposSitios?.notePrefix}<a href="/funcionalidades-web-a-medida/" className="text-black/80 underline font-semibold hover:text-black transition-colors">{shared?.tiposSitios?.noteLink}</a>{shared?.tiposSitios?.noteSuffix}</>}
      />

      <ServiciosGrid
        subtitle={t?.serviciosGrid?.subtitle}
        title={<>{t?.serviciosGrid?.titlePart1} <br className='hidden lg:block' /> {t?.serviciosGrid?.titlePart2}</>}
        description={<>{t?.serviciosGrid?.descriptionPrefix}<a href="/desarrollo-web/" className="text-white/70 underline hover:text-white transition-colors">{t?.serviciosGrid?.descriptionLink}</a></>}
        layout="featured"
        cards={t?.serviciosGrid?.cards?.map((card, i) => ({
          icon: serviciosGridIcons[i],
          title: card.title,
          description: card.description
        }))}
      />

      <CasosExito
        subtitle={shared?.casosExito?.subtitle}
        title={<>{shared?.casosExito?.titlePart1} <br className='hidden lg:block' /> {shared?.casosExito?.titlePart2}</>}
        description={shared?.casosExito?.description}
        cases={shared?.casosExito?.cases}
      />

      <TestimoniosServicios
        subtitle={shared?.testimonios?.subtitle}
        title={shared?.testimonios?.title}
        description={shared?.testimonios?.description}
        testimonials={shared?.testimonios?.testimonials}
      />

      <CardsDiferenciales
        title={<>{t?.diferenciales?.titlePart1} <br className='hidden lg:block' /> {t?.diferenciales?.titlePart2}</>}
        badge={t?.diferenciales?.badge}
        columns={3}
        cards={t?.diferenciales?.cards}
      />

      <div id="planes">
      <PlanesPrecios
        subtitle={shared?.planesPrecios?.subtitle}
        sectionTitle={t?.planes?.sectionTitle}
        sectionDescription={t?.planes?.sectionDescription}
        pricingNote={shared?.planesPrecios?.pricingNote}
        idealParaLabel={shared?.planesPrecios?.idealParaLabel}
        buttonText={shared?.planesPrecios?.buttonText}
        plans={t?.planes?.plans}
        pazMental={{
          subtitle: t?.planes?.pazMentalSubtitle,
          heading: shared?.planesPrecios?.pazMental?.heading,
          headingLink: shared?.planesPrecios?.pazMental?.headingLink,
          features: shared?.planesPrecios?.pazMental?.features,
          priceLabel: shared?.planesPrecios?.pazMental?.priceLabel,
          priceValue: shared?.planesPrecios?.pazMental?.priceValue,
          priceNote: shared?.planesPrecios?.pazMental?.priceNote,
          footerLeft: shared?.planesPrecios?.pazMental?.footerLeft,
          footerRight: shared?.planesPrecios?.pazMental?.footerRight,
        }}
      />
      </div>

      <FAQServicios
        subtitle={t?.faq?.subtitle}
        title={<>{t?.faq?.titlePart1} <br className='hidden lg:block' /> {t?.faq?.titlePart2}</>}
        layout="centered"
        faqs={t?.faq?.faqs}
      />

      <Footer />
    </main>
    </>
  );
};

export default Servicios;
