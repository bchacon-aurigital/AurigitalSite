"use client";
import dynamic from "next/dynamic";
import Hero from "./components/Hero";

const CTA = dynamic(() => import("./components/CTA"), {
  ssr: false,
}); 

const EstamosAqui = dynamic(() => import("./components/EstamosAqui"), {
    ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#1E1E1E] py-5 px-3">
      <Hero />
      <EstamosAqui />
      <CTA />
      <Footer />
    </main>
  );
};

export default Home;