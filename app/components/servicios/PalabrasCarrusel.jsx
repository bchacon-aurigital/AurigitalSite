"use client";
import { useLanguage } from '../../context/LanguageContext';

const PalabrasCarrusel = () => {
  const { translations } = useLanguage();
  const palabrasData = translations.palabrasCarrusel.words;

  return (
    <div 
      className="container relative mx-auto max-w-[110rem] px-4 transition-all duration-1000 ease-in-out"
      data-aos="fade-up"
    >
      <div className="flex flex-row items-center gap-4">

        <div className="flex-1 overflow-hidden relative py-2">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#101010] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#101010] to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-scroll-infinite gap-2 items-center h-full">
            {[...palabrasData, ...palabrasData, ...palabrasData, ...palabrasData].map((item, index) => (
              <div key={index} className="flex flex-row items-center whitespace-nowrap flex-shrink-0 gap-2">
                <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white font-qurova">
                  {item.palabra}
                </h3>
                <span className="text-[#B2FF00] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold">
                  *
                </span>
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

export default PalabrasCarrusel; 