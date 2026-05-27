"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from "../../context/ContactModalContext";
import CotizacionButton from "../ui/CotizacionButton";

const WA_HREF =
  "https://wa.me/50688888169?text=Hola!%20Me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20servicios";

const CTAComunidad = () => {
  const { translations } = useLanguage();
  const { openModal } = useContactModal();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const data = translations.ctaComunidad;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = rect.top / window.innerHeight;
      imageRef.current.style.transform = `translateY(${progress * -200}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[106vh] flex items-center justify-center overflow-hidden"
      style={{ marginTop: '-220px', zIndex: 5 }}
    >
      {/* Parallax image */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-[1.5]"
        style={{ willChange: "transform" }}
      >
        <Image
          src="/assets/home/cta-home.avif"
          alt=""
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-[220px]">
        <p className="font-space-grotesk font-light text-xs tracking-widest uppercase text-white/50 mb-6"
          data-aos="fade-up" data-aos-duration="600">
          {data.label}
        </p>
        <h2 className="text-4xl md:text-6xl font-space-grotesk font-normal uppercase text-white leading-tight mb-10"
          data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
          {data.title.part1}<br />{data.title.part2}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4"
          data-aos="fade-up" data-aos-delay="220" data-aos-duration="600">
          <CotizacionButton onClick={openModal}>{data.cta1}</CotizacionButton>
          <CotizacionButton href={WA_HREF} variant="white" external>
            <FaWhatsapp size={16} />
            {data.cta2}
          </CotizacionButton>
        </div>
      </div>
    </section>
  );
};

export default CTAComunidad;
