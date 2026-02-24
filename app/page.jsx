"use client";
import dynamic from "next/dynamic";
import Hero from "./components/home/Hero";
import NavbarServicios from "./components/ServiciosPages/NavbarServicios";

const CTA = dynamic(() => import("./components/home/CTA"), {
  ssr: false,
});

const EstamosAqui = dynamic(() => import("./components/home/EstamosAqui"), {
  ssr: false,
});

const Excelencia = dynamic(() => import("./components/home/Excelencia"), {
  ssr: false,
});

const Proyectos = dynamic(() => import("./components/home/Proyectos"), {
  ssr: false,
});

const Servicios = dynamic(() => import("./components/home/Servicios"), {
  ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#101010] overflow-x-hidden">
      <NavbarServicios dark />
      <div className="py-6 px-4">
        <Hero />
        <div className="space-y-6 mt-6">
          <Servicios />
          <Proyectos />
          <EstamosAqui />
          <CTA />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;