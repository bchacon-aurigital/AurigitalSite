"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';

const ProyectosScroll = () => {
  const { translations } = useLanguage();
  const [currentProject, setCurrentProject] = useState(0);
  const containerRef = useRef(null);
  const imageScrollRef = useRef(null);

  const proyectos = translations.proyectosScroll.projects;

  const scrollToProject = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const viewportHeight = container.clientHeight;
    const targetScrollTop = index * viewportHeight;
    
    container.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
    
    setCurrentProject(index);
  };

  const goToPrevious = () => {
    if (currentProject > 0) {
      scrollToProject(currentProject - 1);
    }
  };

  const goToNext = () => {
    if (currentProject < proyectos.length - 1) {
      scrollToProject(currentProject + 1);
    }
  };

  return (
    <div className="relative w-full h-[95vh] mx-auto max-w-[110rem] rounded-xl mt-12">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden snap-y snap-mandatory scrollbar-hide rounded-xl"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {proyectos.map((proyecto, index) => (
          <section
            key={index}
            className="grid grid-cols-1 lg:grid-cols-2 w-full h-[95vh] snap-start"
            style={{ backgroundColor: proyecto.color }}
          >
            <div className="flex flex-col justify-end px-10 py-16 text-white">
              <Image
                src={proyecto.logo}
                alt={proyecto.title}
                width={100}
                height={100}
                className="w-2/3 mb-6"
              />
              <p className="text-lg max-w-2xl leading-none font-mansfield text-[#FFFFFF]/80 font-medium">
                {proyecto.description}
              </p>
            </div>

            <div className="relative h-full w-full overflow-hidden">
              <div
                className="h-full w-full overflow-y-scroll scrollbar-hide"
                style={{ scrollBehavior: "smooth" }}
              >
                <Image
                  src={proyecto.image}
                  alt={proyecto.title}
                  width={1200}
                  height={2400}
                  className="object-cover w-full"
                  priority={index === 0}
                />
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="absolute left-10 top-20 transform -translate-y-1/2 flex flex-col gap-4 z-10">
        <button
          onClick={goToPrevious}
          disabled={currentProject === 0}
          className={`w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            currentProject === 0 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-white/20 hover:border-white/60'
          }`}
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          disabled={currentProject === proyectos.length - 1}
          className={`w-12 h-12 rounded-full border-2 border-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            currentProject === proyectos.length - 1 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-white/20 hover:border-white/60'
          }`}
        >
          <svg 
            className="w-6 h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProyectosScroll;
