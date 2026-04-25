"use client";

import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
import { Gauge, Unplug, UserX, Zap, LayoutDashboard, MonitorSmartphone, ShieldCheck, UserRound, Settings, Workflow, BadgeCheck, Cog, PanelTop, ListChecks, RefreshCcw, Home } from 'lucide-react';

const breadcrumbItems = [
  { name: "Inicio", url: "https://aurigital.com" },
  { name: "Servicios", url: "https://aurigital.com/servicios" },
  { name: "Desarrollo Web", url: "https://aurigital.com/desarrollo-web" }
];

const problemasIcons = [
  <Gauge key={0} size={24} className="text-[#B2FF00]" />,
  <Unplug key={1} size={24} className="text-[#B2FF00]" />,
  <UserX key={2} size={24} className="text-[#B2FF00]" />,
  <Zap key={3} size={24} className="text-[#B2FF00]" />
];

const procesoIcons = [
  <LayoutDashboard key={0} size={24} className="text-[#B2FF00]" />,
  <MonitorSmartphone key={1} size={24} className="text-[#B2FF00]" />,
  <ShieldCheck key={2} size={24} className="text-[#B2FF00]" />,
  <LayoutDashboard key={3} size={24} className="text-[#B2FF00]" />,
  <MonitorSmartphone key={4} size={24} className="text-[#B2FF00]" />,
  <ShieldCheck key={5} size={24} className="text-[#B2FF00]" />
];

const carruselMedidaIcons = [
  <LayoutDashboard key={0} size={24} className="text-black" />,
  <UserRound key={1} size={24} className="text-black" />,
  <Settings key={2} size={24} className="text-black" />,
  <Workflow key={3} size={24} className="text-black" />
];

const ventajasIcons = [
  <BadgeCheck key={0} size={24} className="text-[#252525]" />,
  <Cog key={1} size={24} className="text-[#252525]" />,
  <PanelTop key={2} size={24} className="text-[#252525]" />,
  <ListChecks key={3} size={24} className="text-[#252525]" />,
  <RefreshCcw key={4} size={24} className="text-[#252525]" />,
  <Home key={5} size={24} className="text-[#252525]" />
];

const PARTICLE_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32' fill='none'%3E%3Ccircle cx='16' cy='16' r='2.5' fill='white' opacity='0.95'/%3E%3Cline x1='16' y1='1' x2='16' y2='10' stroke='white' stroke-width='1.5' opacity='0.85'/%3E%3Cline x1='16' y1='22' x2='16' y2='31' stroke='white' stroke-width='1.5' opacity='0.85'/%3E%3Cline x1='1' y1='16' x2='10' y2='16' stroke='white' stroke-width='1.5' opacity='0.85'/%3E%3Cline x1='22' y1='16' x2='31' y2='16' stroke='white' stroke-width='1.5' opacity='0.85'/%3E%3C/svg%3E") 16 16, crosshair`

const Servicios = () => {
  const [source, setSource] = useState('organic');
  const { openModal } = useContactModal();
  const { translations } = useLanguage();
  const t = translations.desarrolloWeb;
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
        "Desarrollo Web",
        "Desarrollo web en Costa Rica para marcas con reputación: sitios rápidos, estables y mantenibles, con integraciones y QA antes de publicar.",
        "$$-$$$"
      )} />
      <StructuredData data={getFAQSchema(faqsData)} />
      <StructuredData data={getAggregateRatingSchema()} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="bg-[#E9E9E9] overflow-x-hidden">

      <NavbarServicios />

      <HeroServicios
        title={<>{t?.hero?.titlePart1} <br />{t?.hero?.titlePart2} <br />{t?.hero?.titlePart3} <br />{t?.hero?.titlePart4}</>}
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
        onSecondaryClick={() => { handleCTAClick('encabezado_secondary'); document.getElementById('que-incluimos')?.scrollIntoView({ behavior: 'smooth' }); }}
      />

      <CardsCarrusel
        subtitle={t?.cards?.subtitle}
        title={<>{t?.cards?.titlePart1}<span className="relative inline-block" onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.querySelector('span').style.cssText = `opacity:1;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px` }} onMouseLeave={e => e.currentTarget.querySelector('span').style.opacity = '0'}><a href="/diseno-web/" className="text-[#00BBFF]" style={{ cursor: PARTICLE_CURSOR }}>{t?.cards?.titleQuote}</a><span className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[rgba(0,155,255,0.25)] blur-xl opacity-0 transition-opacity duration-200" /></span>{t?.cards?.titlePart2}</>}
        description={<>{t?.cards?.descriptionPart1} <br className='hidden lg:block' /> {t?.cards?.descriptionPart2}</>}
        cards={t?.cards?.items?.map((card, i) => ({
          svg: `/assets/servicios/servicios-pages/DesarrolloWeb/Vector${i + 1}.svg`,
          number: card.number,
          title: card.title,
          description: card.description,
          particleEffect: true,
        }))}
      />

      <ServiciosGrid
        subtitle={t?.problemas?.subtitle}
        title={<>{t?.problemas?.titlePart1} <br className='hidden lg:block' /> {t?.problemas?.titlePart2} <br className='hidden lg:block' /> <span className="text-[#B2FF00]">{t?.problemas?.titleHighlight}</span></>}
        description={<>{t?.problemas?.descriptionPart1}&ldquo;{t?.problemas?.descriptionQuote1}&rdquo;{t?.problemas?.descriptionMid}&ldquo;{t?.problemas?.descriptionQuote2}&rdquo;{t?.problemas?.descriptionPart2}</>}
        columns={4}
        cards={t?.problemas?.cards?.map((card, i) => ({
          icon: problemasIcons[i],
          title: card.title,
          description: card.description,
          highlighted: i === 3,
        }))}
      />

      <div id="que-incluimos">
      <TabsDesarrollo
        subtitle={t?.tabs?.subtitle}
        title={<>{t?.tabs?.title}</>}
        tabs={t?.tabs?.items?.map((tab) => ({
          number: tab.number,
          title: tab.title,
          description: tab.descriptionLink
            ? <>{tab.descriptionPrefix}<a href="/diseno-web/" className="text-[#b2ff00] hover:underline font-semibold">{tab.descriptionLink}</a>{tab.descriptionSuffix}</>
            : tab.description,
          image: tab.image,
        }))}
      />
      </div>

      <CardsDiferenciales
        subtitle={t?.integraciones?.subtitle}
        title={<>{t?.integraciones?.titlePart1} <br className='hidden lg:block' /> {t?.integraciones?.titlePart2} <br className='hidden lg:block' /> {t?.integraciones?.titlePart3}</>}
        description={t?.integraciones?.descriptionMain}
        columns={2}
        bottomDescription
        cards={t?.integraciones?.cards}
      />

      <TiposSitios
        title={<>{shared?.tiposSitios?.titlePart1} <br className='hidden lg:block' /> {shared?.tiposSitios?.titlePart2}</>}
        badge={shared?.tiposSitios?.badge}
        items={shared?.tiposSitios?.items}
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

      <ServiciosGrid
        title={<>{t?.proceso?.titlePart1} <br className='hidden lg:block' /> {t?.proceso?.titlePart2}</>}
        layout="grid"
        cards={t?.proceso?.cards?.map((card, i) => ({
          icon: procesoIcons[i],
          title: card.title,
          description: card.descriptionLink
            ? <>{card.descriptionPrefix}<a href="/mantenimiento-y-evolucion-web/" className="text-white/70 underline hover:text-white transition-colors">{card.descriptionLink}</a></>
            : card.description
        }))}
      />

      <CarruselMedida
        subtitle={t?.carruselMedida?.subtitle}
        title={<>{t?.carruselMedida?.titlePart1} <br className='hidden lg:block' /> {t?.carruselMedida?.titlePart2} <br className='hidden lg:block' /> {t?.carruselMedida?.titlePart3}</>}
        description={<>{t?.carruselMedida?.descriptionPart1}&ldquo;{t?.carruselMedida?.descriptionQuote}&rdquo;{t?.carruselMedida?.descriptionPart2}</>}
        cards={t?.carruselMedida?.cards?.map((card, i) => ({
          icon: carruselMedidaIcons[i],
          title: card.title,
          description: card.description,
        }))}
        note={t?.carruselMedida?.note}
      />

      <VentajasDesarrollo
        subtitle={t?.ventajas?.subtitle}
        title={<>{t?.ventajas?.titlePrefix}<span className="font-extrabold italic text-[#2f2f2f]">{t?.ventajas?.titleHighlight}</span>{t?.ventajas?.titleSuffix}</>}
        ctaText={t?.ventajas?.ctaText}
        onCtaClick={() => { }}
        cards={t?.ventajas?.cards?.map((card, i) => ({
          icon: ventajasIcons[i],
          title: card.title,
          description: card.description,
        }))}
      />

      <FAQServicios
        subtitle={t?.faq?.subtitle}
        title={<>{t?.faq?.titlePart1} <br className='hidden lg:block' /> {t?.faq?.titlePart2}</>}
        description={t?.faq?.description}
        layout="split"
        faqs={t?.faq?.faqs}
      />

      <Footer />
    </main>
    </>
  );
};

export default Servicios;
