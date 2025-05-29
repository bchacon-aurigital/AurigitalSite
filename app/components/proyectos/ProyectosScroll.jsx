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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const totalHeight = (proyectos.length - 1) * viewportHeight;

      let index = Math.floor(scrollTop / viewportHeight);
      if (index < 0) index = 0;
      if (index >= proyectos.length) index = proyectos.length - 1;

      setCurrentProject(index);
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[95vh] overflow-y-scroll snap-y snap-mandatory scrollbar-hide mx-auto max-w-[110rem] rounded-xl mt-12"
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
  );
};

export default ProyectosScroll;
