"use client";
import dynamic from "next/dynamic";
import Hero from "../../components/proyectos/hero";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";

const Proyectos = dynamic(() => import("../../components/proyectos/Proyectos"));

const CTA = dynamic(() => import("../../components/proyectos/CTA")); 

const Footer = dynamic(() => import("../../components/Footer"));


const Home = () => {
  return (
    <main className="bg-[#101010] overflow-x-hidden">
      <NavbarServicios dark />
      <div className="py-6 px-4">
        <Hero />
        <div className="space-y-6 mt-6">
          <Proyectos />
          <CTA />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;