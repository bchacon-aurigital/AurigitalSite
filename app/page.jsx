"use client";
import dynamic from "next/dynamic";
import Hero from "./components/home/Hero";

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

const ProyectosCarrusel = dynamic(() => import("./components/home/ProyectosCarrusel"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">
      <ProyectosCarrusel />
      <Hero />
      <div className="space-y-12">
        <Servicios />
        <Excelencia />
        <Proyectos />
        <EstamosAqui />
        <CTA />
      </div>
      <Footer />
    </main>
  );
};

export default Home;