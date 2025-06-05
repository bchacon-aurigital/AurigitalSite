"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { useLanguage } from './context/LanguageContext';
import { useContactAction } from './hooks/useContactAction';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const { translations } = useLanguage();
  const handleContactClick = useContactAction();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; 
  }

  return (
    <main className="bg-[#101010] py-6 px-4 overflow-x-hidden">
      <section
        className="relative h-[95vh] w-full overflow-hidden bg-black mx-auto max-w-[110rem] rounded-xl"
        role="banner"
        aria-label="404 section"
        data-aos="fade-in"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <video 
            className="absolute inset-0 object-cover w-full h-full"
            muted 
            loop 
            playsInline
            autoPlay
            preload="metadata"
          >
            <source src="/assets/3.webm" type="video/webm" />
            Tu navegador no soporta videos HTML5.
          </video>
          <div className="absolute inset-0 bg-[#1E1E1E] bg-opacity-90"></div>
        </div>

        <div className="container mx-auto px-4 md:px-12 flex flex-col justify-center h-[95vh]">
          <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center" data-aos="fade-up" data-aos-delay="200">

            <div className="border border-[#B2FF00] rounded-full px-16 py-2 mb-8" data-aos="fade-down" data-aos-delay="300">
              <p className="text-[#B2FF00] font-mansfield font-light">ERROR 404</p>
            </div>

            <div className="mb-6" data-aos="fade-up" data-aos-delay="350">
              <h1 className="text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold leading-none text-[#B2FF00] font-mansfield opacity-20">
                404
              </h1>
            </div>

            <h2 className="text-4xl md:text-6xl font-medium transition-transform duration-1000 ease-in-out font-mansfield z-10" data-aos="fade-up" data-aos-delay="400">
              <span className="text-[#a7a6a6]">{translations.notFound?.title?.split(' ')[0] || "¡OOPS!"}</span> <br /> 
              {translations.notFound?.title?.substring(translations.notFound?.title?.indexOf(' ') + 1) || "PÁGINA NO ENCONTRADA"}
            </h2>

            <div className="flex flex-col md:flex-row gap-4 mt-8 font-qurova font-normal" data-aos="fade-up" data-aos-delay="600">
              <Link
                href="/"
                className="px-14 py-2 bg-[#B2FF00] rounded-full text-black hover:bg-[#b3ff00b6] transition-colors duration-500 text-center relative"
              >
                {translations.notFound?.homeButton || "Ir al inicio"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}