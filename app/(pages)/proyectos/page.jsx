"use client";
import dynamic from "next/dynamic";
import Hero from "../../components/proyectos/hero";

const ProyectosScroll = dynamic(() => import("../../components/proyectos/ProyectosScroll"), {
  ssr: false,
});

const Proyectos = dynamic(() => import("../../components/proyectos/Proyectos"), {
  ssr: false,
});

const CTA = dynamic(() => import("../../components/proyectos/CTA"), {
  ssr: false,
}); 

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});


const Home = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">
      <Hero />
      <div className="space-y-12">
        <ProyectosScroll />
        <Proyectos />
        <CTA />
      </div>
      <Footer />
    </main>
  );
};

export default Home;