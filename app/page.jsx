"use client";
import dynamic from "next/dynamic";
import Hero from "./components/home/Hero";
import NavbarServicios from "./components/ServiciosPages/NavbarServicios";

const Proyectos = dynamic(() => import("./components/home/Proyectos"), {
  ssr: false,
});

const Servicios = dynamic(() => import("./components/home/Servicios"), {
  ssr: false,
});

const Testimonios = dynamic(() => import("./components/home/Testimonios"), {
  ssr: false,
});

const CTAComunidad = dynamic(() => import("./components/home/CTAComunidad"), {
  ssr: false,
});

const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});

const Home = () => {
  return (
    <main className="bg-[#101010] overflow-x-hidden">
      <NavbarServicios dark />
      <Hero />
      <div className="py-6 px-4">
        <div className="space-y-6">
          <Servicios />
          <Proyectos />
          <Testimonios />
        </div>
        <CTAComunidad />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
