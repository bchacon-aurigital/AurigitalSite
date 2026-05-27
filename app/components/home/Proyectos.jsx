"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from "../../context/ContactModalContext";
import CotizacionButton from "../ui/CotizacionButton";
import { ArrowUpRight } from "lucide-react";

const Proyectos = () => {
  const { translations } = useLanguage();
  const { openModal } = useContactModal();
  const data = translations.proyectosHome;

  return (
    <div className="w-full bg-[#1C1C1C]" data-aos="fade-up">

      {/* Header */}
      <div className="text-center py-20 md:py-28 px-4">
        <p className="text-[#a7a6a6] font-space-grotesk font-light text-xs tracking-widest uppercase mb-5">
          {data.label}
        </p>
        <h2 className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-white/90 leading-tight mb-10">
          {data.title.part1}<br />{data.title.part2}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <CotizacionButton onClick={openModal}>{data.cta1}</CotizacionButton>
          <CotizacionButton href="/proyectos" variant="white">{data.cta2}</CotizacionButton>
        </div>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 md:px-8 lg:px-12 pb-12 md:pb-16">
        {data.cards.map((card, i) => (
          <div
            key={i}
            className="group rounded-2xl overflow-hidden bg-[#181818]"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`/assets/home/${card.image}`}
                alt={card.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Info bar — below image */}
            <div className="px-5 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <p className="font-space-grotesk font-bold uppercase text-white text-base leading-tight">
                  {card.title}
                </p>
                <p className="font-red-hat font-light text-white/50 text-sm mt-1">
                  {card.description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 flex-shrink-0">

                {/* VER PROYECTOS — hidden on desktop, slides in on hover */}
                <div className="overflow-hidden transition-all duration-300 ease-out
                                max-w-[160px] opacity-100
                                md:max-w-0 md:opacity-0
                                md:group-hover:max-w-[160px] md:group-hover:opacity-100"
                     style={{ transitionDelay: '60ms' }}>
                  <Link
                    href="/proyectos"
                    className="font-space-grotesk font-medium text-xs text-[#B2FF00] border border-[#B2FF00] px-4 py-2.5 rounded-xl hover:bg-[#B2FF00] hover:text-black transition-colors whitespace-nowrap block"
                  >
                    VER PROYECTOS
                  </Link>
                </div>

                {/* Secondary button — morphs from arrow square into labeled button */}
                <Link
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#B2FF00] text-black rounded-xl h-9 flex items-center justify-center overflow-hidden hover:bg-[#c8ff33] transition-all duration-300 ease-out
                             px-4 gap-1
                             md:px-[9px] md:gap-0
                             md:group-hover:px-4 md:group-hover:gap-1"
                >
                  <span className="font-space-grotesk font-medium text-xs whitespace-nowrap overflow-hidden transition-all duration-300 ease-out
                                   max-w-[120px] opacity-100
                                   md:max-w-0 md:opacity-0
                                   md:group-hover:max-w-[120px] md:group-hover:opacity-100">
                    {card.ctaLabel.toUpperCase()}
                  </span>
                  <ArrowUpRight size={17} className="flex-shrink-0" />
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
