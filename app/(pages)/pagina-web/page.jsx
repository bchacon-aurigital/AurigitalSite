"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import NavbarServicios from "@/app/components/ServiciosPages/NavbarServicios";
import HeroPaginaWeb from "@/app/components/pagina-web/HeroPaginaWeb";
import StructuredData from "@/app/components/seo/StructuredData";
import Breadcrumbs from "@/app/components/seo/Breadcrumbs";
import {
  getLevelServiceSchema,
  getHowToSchema,
  getFAQSchema,
  getBreadcrumbSchema,
  getItemListSchema,
} from "@/app/lib/structuredData";
import { trackCTAClick } from "@/app/lib/analytics";
import { useContactModal } from "@/app/context/ContactModalContext";
import { usePaginaWeb } from "@/app/components/pagina-web/usePaginaWeb";

/* Secciones bajo el hero: fuera del bundle inicial, igual que en el home */
const ParaVos = dynamic(() => import("@/app/components/pagina-web/ParaVos"));
const Recibis = dynamic(() => import("@/app/components/pagina-web/Recibis"));
const Despues = dynamic(() => import("@/app/components/pagina-web/Despues"));
const LevelExamples = dynamic(() => import("@/app/components/ServiciosPages/LevelExamples"));
const Proceso = dynamic(() => import("@/app/components/pagina-web/Proceso"));
const OtrosNiveles = dynamic(() => import("@/app/components/pagina-web/OtrosNiveles"));
const PazMental = dynamic(() => import("@/app/components/pagina-web/PazMental"));
const FAQServicios = dynamic(() => import("@/app/components/ServiciosPages/FAQServicios"));
const CtaFinal = dynamic(() => import("@/app/components/pagina-web/CtaFinal"));
const Footer = dynamic(() => import("@/app/components/Footer"));

const SITE_URL = "https://www.aurigital.com";

const breadcrumbItems = [
  { name: "Inicio", url: SITE_URL },
  { name: "Servicios", url: `${SITE_URL}/servicios` },
  { name: "Página web", url: `${SITE_URL}/pagina-web` },
];

const PaginaWeb = () => {
  const [source, setSource] = useState("organic");
  const { openModal } = useContactModal();
  const t = usePaginaWeb();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sourceParam = new URLSearchParams(window.location.search).get("source");
    if (sourceParam) setSource(sourceParam);
  }, []);

  /* CTA genérico: evento GA + modal de contacto */
  const handleCTAClick = (ctaText, location) => {
    trackCTAClick(ctaText, location, source);
    openModal();
  };

  /* CTA final: además empuja el evento de GTM pedido para esta página */
  const handleFinalCTAClick = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cta_click",
        location: "pagina-web_final",
        cta_text: t.ctaFinal.cta,
      });
    }
    handleCTAClick(t.ctaFinal.cta, "pagina-web_final");
  };

  return (
    <>
      <StructuredData
        data={getLevelServiceSchema({
          name: "Página web",
          serviceType: "Diseño y desarrollo de página web",
          description:
            "Página web diseñada desde cero, sin plantillas y programada en código. Ideal para marcas visuales y portafolios en Costa Rica. Desde $2,000.",
          url: `${SITE_URL}/pagina-web`,
          price: 2000,
          priceCurrency: "USD",
        })}
      />
      <StructuredData
        data={getHowToSchema({
          name: t.proceso.h2,
          description: t.proceso.intro,
          steps: t.proceso.steps.map((step) => ({ name: step.title, text: step.text })),
        })}
      />
      <StructuredData data={getFAQSchema(t.faq.faqs)} />
      <StructuredData data={getBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData
        data={getItemListSchema({
          name: t.ejemplos.h2,
          items: t.ejemplos.cards.map((card) => ({
            name: card.title,
            url: `${SITE_URL}/proyectos/${card.slug}`,
          })),
        })}
      />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="bg-[#101010] overflow-x-hidden">
        <NavbarServicios dark />

        <HeroPaginaWeb onPrimaryClick={() => handleCTAClick(t.hero.ctaPrimary, "hero_primary")} />

        <div className="py-6 px-4">
          <div className="space-y-6">
            <ParaVos />
            <Recibis />
            <Despues />
            <LevelExamples level="pagina-web" />
            <Proceso />
            <OtrosNiveles onCtaClick={() => handleCTAClick(t.otrosNiveles.cta, "otros_niveles")} />
            <PazMental />
            <FAQServicios theme="dark" title={t.faq.h2} faqs={t.faq.faqs} layout="split" />
          </div>

          <CtaFinal onCtaClick={handleFinalCTAClick} />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default PaginaWeb;
