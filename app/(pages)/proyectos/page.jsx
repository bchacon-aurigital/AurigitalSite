"use client";
import dynamic from "next/dynamic";
import Portafolio from "../../components/proyectos/Portafolio";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";

const CTA = dynamic(() => import("../../components/proyectos/CTA"));

const Footer = dynamic(() => import("../../components/Footer"));

const Home = () => {
  return (
    <main className="bg-[#101010] overflow-x-clip">
      <NavbarServicios dark />
      <div className="py-6 px-4">
        <div className="space-y-6">
          <Portafolio />
          <CTA />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;
