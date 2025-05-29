"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const ProyectosCarrusel = () => {
  const { translations } = useLanguage();
  const proyectos = translations.proyectosCarrusel.projects;

  return (
    <div className="container relative mx-auto pb-6 max-w-[110rem] px-4 transition-all duration-1000 ease-in-out">
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-row items-center justify-center gap-2 flex-shrink-0">
          <div className="bg-[#B2FF00] rounded-full w-3 h-3"></div>
          <p className="text-white/70 whitespace-nowrap font-qurova font-medium">
            {translations.proyectosCarrusel.nowCreating}
          </p>
        </div>

        <div className="flex-1 overflow-hidden relative h-8">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#101010] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#101010] to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scroll-infinite gap-14 items-center h-full">
            {[...proyectos, ...proyectos, ...proyectos, ...proyectos].map((proyecto, index) => (
              <div key={index} className="flex flex-row items-center gap-2 whitespace-nowrap flex-shrink-0">
                <h3 className="text-lg md:text-xl font-medium text-white/70 font-qurova">
                  {proyecto.title}
                </h3>
                <h4 className="text-sm md:text-base font-medium text-white/40 font-mansfield">
                  {proyecto.description}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-75%);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 40s linear infinite;
        }
        
        /* Animación más rápida en móviles */
        @media (max-width: 768px) {
          .animate-scroll-infinite {
            animation: scroll-infinite 12s linear infinite;
          }
        }
        
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ProyectosCarrusel;