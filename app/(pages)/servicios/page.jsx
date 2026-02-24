"use client";
import dynamic from "next/dynamic";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";

const ServicesGrid = dynamic(() => import("../../components/servicios/ServicesGrid"), {
  ssr: false,
});

const ServicesSection = dynamic(() => import("../../components/servicios/ServicesSection"), {
  ssr: false,
});

const BannerServicios = dynamic(() => import("../../components/servicios/BannerServicios"), {
  ssr: false,
});

const FuncionalidadEspecifica = dynamic(() => import("../../components/servicios/FuncionalidadEspecifica"), {
  ssr: false,
});

const BannerFuerzaMarca = dynamic(() => import("../../components/servicios/BannerFuerzaMarca"), {
  ssr: false,
});

const CTA = dynamic(() => import("../../components/servicios/CTA"), {
  ssr: false,
});

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const PalabrasCarrusel = dynamic(() => import("../../components/servicios/PalabrasCarrusel"), {
  ssr: false,
});

const Servicios = () => {
  return (
    <main className="bg-[#101010] overflow-x-hidden">
      <NavbarServicios />
      <div className="py-5 px-2">
        <div className="space-y-6 mt-6">
          <PalabrasCarrusel />
          <ServicesGrid />
          <ServicesSection />
          <FuncionalidadEspecifica />
          <BannerServicios />
          <BannerFuerzaMarca />
          <CTA />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Servicios;