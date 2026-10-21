"use client";
import Image from "next/image";
import { usePaginaWeb } from "./usePaginaWeb";

const BORDER = "border-[#1e3f52]/70";

/* Figuras geométricas propias de esta sección, en el mismo lenguaje de línea
   que las del home: difusión · embudo · equilibrio */
const FIGURES = ["Despues-1.svg", "Despues-2.svg", "Despues-3.svg"];

const Despues = () => {
  const { h2, items } = usePaginaWeb().despues;

  return (
    <div className={`border border-dashed ${BORDER} rounded-sm`}>
      <div
        className={`p-8 lg:p-12 border-b border-dashed ${BORDER}`}
        data-aos="fade-up"
        data-aos-duration="700"
      >
        <h2 className="text-3xl lg:text-5xl leading-tight font-space-grotesk uppercase text-white font-normal max-w-3xl">
          {h2}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col min-h-[420px] ${
              i < items.length - 1 ? `border-b md:border-b-0 md:border-r border-dashed ${BORDER}` : ""
            }`}
            data-aos="fade-up"
            data-aos-delay={i * 120}
            data-aos-duration="700"
          >
            {/* Figura centrada en la zona superior */}
            <div className="flex-1 flex items-center justify-center py-12 px-8">
              <Image
                src={`/assets/pagina-web/svg/${FIGURES[i] || FIGURES[0]}`}
                alt=""
                aria-hidden="true"
                width={180}
                height={180}
                unoptimized={true}
                className="object-contain"
              />
            </div>

            {/* Texto anclado abajo */}
            <div className="p-6 lg:p-8">
              <h3 className="font-space-grotesk font-bold uppercase text-white text-sm lg:text-base leading-tight mb-3">
                {item.title}
              </h3>
              <p className="font-red-hat font-light text-white/50 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Despues;
