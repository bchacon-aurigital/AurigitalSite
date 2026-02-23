"use client";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "../../components/Navbar";

const PlanPazMentalHero = dynamic(() => import("../../components/plan-paz-mental/Hero"), {
  ssr: false,
});

const PalabrasCarrusel = dynamic(() => import("../../components/plan-paz-mental/PalabrasCarrusel"), {
  ssr: false,
});

const LogosCarousel = dynamic(() => import("../../components/plan-paz-mental/LogosCarousel"), {
  ssr: false,
});

const Features = dynamic(() => import("../../components/plan-paz-mental/Features"), {
  ssr: false,
});


const Pricing = dynamic(() => import("../../components/plan-paz-mental/Pricing"), {
  ssr: false,
});


const FinalCTA = dynamic(() => import("../../components/plan-paz-mental/FinalCTA"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const PlanPazMental = () => {
  return (
    <main className="bg-[#101010] py-5 px-2 overflow-x-hidden">
      <div className="bg-[#B2FF00] rounded-xl mx-auto max-w-[110rem] relative">
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
      <div className="space-y-6 mt-6">
        <PalabrasCarrusel />
        <PlanPazMentalHero />
        <LogosCarousel />
        <Features />
        <Pricing />
        <FinalCTA />
      </div>
      <Footer />
      
      {/* Structured Data for Plan Paz Mental */}
      <Script
        id="plan-paz-mental-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Plan Paz Mental",
            "description": "Servicio de soporte web 24/7 con mantenimiento, actualizaciones ilimitadas y tranquilidad tecnológica total para empresas en Costa Rica.",
            "provider": {
              "@type": "Organization",
              "name": "Aurigital",
              "url": "https://aurigital.com",
              "logo": "https://aurigital.com/assets/logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "hola@aurigital.com"
              }
            },
            "serviceType": "Web Support & Maintenance",
            "areaServed": {
              "@type": "Country",
              "name": "Costa Rica"
            },
            "offers": {
              "@type": "Offer",
              "name": "Plan Paz Mental",
              "description": "Soporte web completo con actualizaciones ilimitadas, monitoreo 24/7 y respaldo total",
              "priceCurrency": "USD",
              "price": "125",
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01",
              "includesObject": [
                {
                  "@type": "Service",
                  "name": "Actualizaciones Ilimitadas",
                  "description": "Cambios de contenido, imágenes y texto cuando los necesites"
                },
                {
                  "@type": "Service", 
                  "name": "Soporte Técnico Premium 24/7",
                  "description": "Respuesta prioritaria y monitoreo proactivo continuo"
                },
                {
                  "@type": "Service",
                  "name": "Licencias Incluidas",
                  "description": "Plugins premium, certificados de seguridad y herramientas especializadas"
                },
                {
                  "@type": "Service",
                  "name": "Rediseño Completo",
                  "description": "Rediseño completo incluido al completar los primeros 2 años"
                }
              ]
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Plan Paz Mental Features",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Tranquilidad Tecnológica",
                    "description": "Enfócate en hacer crecer tu negocio mientras nosotros manejamos todo lo técnico"
                  }
                }
              ]
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Business owners, entrepreneurs, professionals",
              "geographicArea": {
                "@type": "Country",
                "name": "Costa Rica"
              }
            }
          })
        }}
      />
    </main>
  );
};

export default PlanPazMental;