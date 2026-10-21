"use client";
import Image from "next/image";
import { useNivel, useNivelKey } from "./NivelContext";

const BORDER = "border-[#1e3f52]/70";

/* Figuras geométricas propias de cada nivel, en el mismo lenguaje de línea
   que las del home. Son decorativas: van vacías para lectores de pantalla. */
const FIGURAS = {
  paginaWeb: {
    base: "/assets/pagina-web/svg/",
    files: ["Despues-1.svg", "Despues-2.svg", "Despues-3.svg"],
  },
  sistemaWeb: {
    base: "/assets/sistema-web/svg/",
    files: ["Despues-1.svg", "Despues-2.svg", "Despues-3.svg", "Despues-4.svg"],
  },
};

/* Retícula y bordes punteados según cuántas secuelas liste el nivel.
   Las clases van literales para que Tailwind las conserve en el build. */
const REJILLA = {
  3: "grid grid-cols-1 md:grid-cols-3",
  4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

const BORDES = {
  3: [
    "border-b md:border-b-0 md:border-r",
    "border-b md:border-b-0 md:border-r",
    "",
  ],
  4: [
    "border-b lg:border-b-0 md:border-r",
    "border-b lg:border-b-0 lg:border-r",
    "border-b md:border-b-0 md:border-r",
    "",
  ],
};

const Despues = () => {
  const { h2, items } = useNivel().despues;
  const nivel = useNivelKey();
  const figuras = FIGURAS[nivel] || FIGURAS.paginaWeb;
  const rejilla = REJILLA[items.length] || REJILLA[3];
  const bordes = BORDES[items.length] || [];

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

      <div className={rejilla}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col min-h-[420px] border-dashed ${BORDER} ${bordes[i] || ""}`}
            data-aos="fade-up"
            data-aos-delay={i * 120}
            data-aos-duration="700"
          >
            {/* Figura centrada en la zona superior */}
            <div className="flex-1 flex items-center justify-center py-12 px-8">
              <Image
                src={`${figuras.base}${figuras.files[i] || figuras.files[0]}`}
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
