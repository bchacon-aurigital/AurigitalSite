"use client";
import { useLanguage } from "../../context/LanguageContext";

const PalabrasCarrusel = () => {
  const { translations } = useLanguage();
  const palabrasData = translations.planPazMental.palabrasCarrusel.words;

  return (
    <div 
      className="container relative mx-auto max-w-[110rem] px-4 transition-all duration-1000 ease-in-out"
      data-aos="fade-up"
    >
      <div className="flex flex-row items-center gap-4">

        <div className="flex-1 overflow-hidden relative py-2">
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#101010] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#101010] to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex items-center animate-scroll-left whitespace-nowrap gap-12">
            {/* First set */}
            {palabrasData.map((item, index) => (
              <div key={`first-${index}`} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-qurova font-medium text-white uppercase tracking-wide">
                  {item.palabra}
                </span>
                <div className="w-2 h-2 bg-[#B2FF00] rounded-full flex-shrink-0 mx-4"></div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {palabrasData.map((item, index) => (
              <div key={`second-${index}`} className="flex items-center gap-2 flex-shrink-0">
                <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-qurova font-medium text-white uppercase tracking-wide">
                  {item.palabra}
                </span>
                <div className="w-2 h-2 bg-[#B2FF00] rounded-full flex-shrink-0 mx-4"></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 25s linear infinite;
        }
        
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PalabrasCarrusel;