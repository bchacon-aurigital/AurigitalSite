"use client";
import dynamic from "next/dynamic";
import Hero from "../../components/sobrenosotros/Hero";

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const Newsletter = dynamic(() => import("../../components/sobrenosotros/Newsletter"), {
    ssr: false,
});

const QuoteCard = dynamic(() => import("../../components/sobrenosotros/QuoteCard"), {
    ssr: false,
  });

const Grid = dynamic(() => import("../../components/sobrenosotros/grid"), {
    ssr: false,
  });

const NuestroProceso = dynamic(() => import("../../components/sobrenosotros/NuestroProceso"), {
    ssr: false,
  });

const Home = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">
      <Hero />
      <div className="space-y-12">
        <Grid />
        <QuoteCard />
        <NuestroProceso />
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
};

export default Home;