"use client";
import dynamic from "next/dynamic";
import Hero from "../../components/sobrenosotros/Hero";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";

const Footer = dynamic(() => import("../../components/Footer"));

const Newsletter = dynamic(() => import("../../components/sobrenosotros/Newsletter"));

const QuoteCard = dynamic(() => import("../../components/sobrenosotros/QuoteCard"));

const Grid = dynamic(() => import("../../components/sobrenosotros/grid"));

const NuestroProceso = dynamic(() => import("../../components/sobrenosotros/NuestroProceso"));

const Home = () => {
  return (
    <main className="bg-[#101010] overflow-x-clip">
      <NavbarServicios dark />
      <div className="py-5 px-2">
        <Hero />
        <div className="space-y-6 mt-6">
          <Grid />
          <NuestroProceso />
          <QuoteCard />
          <Newsletter />
        </div>
        <Footer />
      </div>
    </main>
  );
};

export default Home;