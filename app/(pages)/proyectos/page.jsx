"use client";
import dynamic from "next/dynamic";
import Hero from "../../components/proyectos/hero";

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
    <main className="bg-[#101010] py-6 px-4 overflow-x-hidden">
      <Hero />
      <div className="space-y-6 mt-6">
        <Proyectos />
        <CTA />
      </div>
      <Footer />
    </main>
  );
};

export default Home;