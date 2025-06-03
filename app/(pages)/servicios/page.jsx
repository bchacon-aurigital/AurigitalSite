"use client";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";

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

const Servicios = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">
      <div className="bg-[#B2FF00] rounded-xl mx-2">
        <Navbar
          textColor="text-black"
          buttonBgColor="bg-black"
          buttonTextColor="text-[#B2FF00]"
          buttonTextColorHover="hover:text-white"
          buttonHoverColor="hover:bg-[#000000]"
          logoVariant="dark"
          linkHoverColor="hover:text-[#B2FF00]"
        />
      </div>
      <div className="space-y-12 mt-4 px-2">
        <ServicesSection />
        <FuncionalidadEspecifica />
        <BannerServicios />
        <BannerFuerzaMarca />
        <CTA />
      </div>
      <Footer />
    </main>
  );
};

export default Servicios;