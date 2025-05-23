"use client";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";

const CTA = dynamic(() => import("./components/CTA"), {
  ssr: false,
}); 

const EstamosAqui = dynamic(() => import("./components/EstamosAqui"), {
    ssr: false,
});

const Excelencia = dynamic(() => import("./components/Excelencia"), {
    ssr: false,
});

const Proyectos = dynamic(() => import("./components/Proyectos"), {
    ssr: false,
});

const Servicios = dynamic(() => import("./components/Servicios"), {
    ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">
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