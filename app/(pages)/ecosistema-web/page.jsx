"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import NavbarServicios from "@/app/components/ServiciosPages/NavbarServicios";
import HeroEcosistemaWeb from "@/app/components/niveles/HeroEcosistemaWeb";
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
import { NivelProvider, useNivel } from "@/app/components/niveles/NivelContext";

/* Secciones bajo el hero: fuera del bundle inicial, igual que en el home */
const ParaVos = dynamic(() => import("@/app/components/niveles/ParaVos"));
const Recibis = dynamic(() => import("@/app/components/niveles/Recibis"));
const Despues = dynamic(() => import("@/app/components/niveles/Despues"));
const LevelExamples = dynamic(() => import("@/app/components/ServiciosPages/LevelExamples"));
const Proceso = dynamic(() => import("@/app/components/niveles/Proceso"));
const OtrosNiveles = dynamic(() => import("@/app/components/niveles/OtrosNiveles"));
const PazMental = dynamic(() => import("@/app/components/niveles/PazMental"));
const FAQServicios = dynamic(() => import("@/app/components/ServiciosPages/FAQServicios"));
const CtaFinal = dynamic(() => import("@/app/components/niveles/CtaFinal"));
const Footer = dynamic(() => import("@/app/components/Footer"));

const SITE_URL = "https://www.aurigital.com";

const breadcrumbItems = [
  { name: "Inicio", url: SITE_URL },
  { name: "Servicios", url: `${SITE_URL}/servicios` },
  { name: "Ecosistema web", url: `${SITE_URL}/ecosistema-web` },
];

const EcosistemaWeb = () => {
  const [source, setSource] = useState("organic");
  const { openModal } = useContactModal();
  const t = useNivel("ecosistemaWeb");

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
        location: "ecosistema-web_final",
        cta_text: t.ctaFinal.cta,
      });
    }
    handleCTAClick(t.ctaFinal.cta, "ecosistema-web_final");
  };

  return (
    <NivelProvider nivel="ecosistemaWeb">
      <StructuredData
        data={getLevelServiceSchema({
          name: "Ecosistema web",
          serviceType:
            "Desarrollo de software y plataformas web a la medida con integración de sistemas",
          description:
            "Conectá tu sitio, tus ventas y tu operación en un solo sistema. Aurigital desarrolla plataformas 100% en código, integraciones y monitoreo en tiempo real.",
          url: `${SITE_URL}/ecosistema-web`,
          /* Sin precio: este nivel se cotiza según alcance */
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
          /* No existe ficha por proyecto: todos apuntan al portafolio general
             en vez de a un /proyectos/[slug] que devuelve 404. */
          items: t.ejemplos.cards.map((card) => ({
            name: card.title,
            url: `${SITE_URL}/proyectos`,
          })),
        })}
      />

      <div className="sr-only">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <main className="bg-[#101010] overflow-x-clip">
        <NavbarServicios dark />

        <HeroEcosistemaWeb
          onPrimaryClick={() => handleCTAClick(t.hero.ctaPrimary, "hero_primary")}
        />

        <div className="py-6 px-4">
          <div className="space-y-6">
            <ParaVos />
            <Recibis />
            <Despues />
            <LevelExamples level="ecosistema-web" />
            <Proceso />
            <OtrosNiveles onCtaClick={() => handleCTAClick(t.otrosNiveles.cta, "otros_niveles")} />
            <PazMental />
            <FAQServicios theme="dark" title={t.faq.h2} faqs={t.faq.faqs} layout="split" />
          </div>

          <CtaFinal onCtaClick={handleFinalCTAClick} />
          <Footer />
        </div>
      </main>
    </NivelProvider>
  );
};

export default EcosistemaWeb;
