"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { useNivel } from "./NivelContext";
import CotizacionButton from "../ui/CotizacionButton";

const CtaFinal = ({ onCtaClick }) => {
  const data = useNivel().ctaFinal;
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      /* Acotado: fuera de pantalla el desplazamiento no debe sacar la imagen del marco */
      const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      imageRef.current.style.transform = `translateY(${progress * -160}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Imagen con parallax */}
      <div ref={imageRef} className="absolute inset-0 scale-[1.4]" style={{ willChange: "transform" }}>
        <Image src="/assets/home/cta-home.avif" alt="" fill unoptimized className="object-cover" />
      </div>

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto py-24">
        <p
          className="font-space-grotesk font-light text-xs tracking-widest uppercase text-white/50 mb-6"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          {data.label}
        </p>
        <h2
          className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-white leading-tight mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
          data-aos-duration="800"
        >
          {data.h2}
        </h2>
        <p
          className="font-red-hat font-light text-white/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-delay="180"
          data-aos-duration="600"
        >
          {data.text}
        </p>
        <div
          className="flex flex-wrap items-center justify-center gap-4"
          data-aos="fade-up"
          data-aos-delay="260"
          data-aos-duration="600"
        >
          <CotizacionButton onClick={onCtaClick}>{data.cta}</CotizacionButton>
        </div>
      </div>
    </section>
  );
};

export default CtaFinal;
