"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/home/Hero";
import NavbarServicios from "./components/ServiciosPages/NavbarServicios";

gsap.registerPlugin(ScrollTrigger);

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
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none", duration: 1 },
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      tl.fromTo(heroRef.current, { yPercent: 0 }, { yPercent: 50 });
    });

    return () => mm.revert();
  }, []);

  return (
    <main className="bg-[#101010] overflow-x-hidden">
      <NavbarServicios dark />
      <div ref={heroRef} className="relative z-0">
        <Hero />
      </div>
      <div
        ref={contentRef}
        className="relative z-10 -mt-10 md:mt-0 rounded-t-[2rem] md:rounded-none bg-[#101010] shadow-[0_-24px_60px_30px_rgba(0,0,0,1)] py-6 px-4"
      >
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
