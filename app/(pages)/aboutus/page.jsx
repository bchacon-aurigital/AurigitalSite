"use client";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../../components/Footer"), {
  ssr: false,
});

const Newsletter = dynamic(() => import("../../components/aboutus/Newsletter"), {
    ssr: false,
});

const NuestroProceso = dynamic(() => import("../../components/aboutus/NuestroProceso"), {
    ssr: false,
  });

const Home = () => {
  return (
    <main className="bg-[#101010] py-5 px-5">

      <div className="space-y-12">
        <NuestroProceso />
        <Newsletter />
      </div>
      <Footer />
    </main>
  );
};

export default Home;