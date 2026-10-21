"use client";
import dynamic from "next/dynamic";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";

const ServicesGrid = dynamic(() => import("../../components/servicios/ServicesGrid"));

const ServicesSection = dynamic(() => import("../../components/servicios/ServicesSection"));

const BannerServicios = dynamic(() => import("../../components/servicios/BannerServicios"));

const FuncionalidadEspecifica = dynamic(() => import("../../components/servicios/FuncionalidadEspecifica"));

const BannerFuerzaMarca = dynamic(() => import("../../components/servicios/BannerFuerzaMarca"));

const CTA = dynamic(() => import("../../components/servicios/CTA"));

const Footer = dynamic(() => import("../../components/Footer"));

const PalabrasCarrusel = dynamic(() => import("../../components/servicios/PalabrasCarrusel"));

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