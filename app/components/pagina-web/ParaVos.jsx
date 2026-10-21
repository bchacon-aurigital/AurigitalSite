"use client";
import { Check } from "lucide-react";
import { usePaginaWeb } from "./usePaginaWeb";

const BORDER = "border-[#1e3f52]/70";

const ParaVos = () => {
  const { h2, intro, items } = usePaginaWeb().paraVos;

  return (
    <div className={`border border-dashed ${BORDER} rounded-sm`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Izquierda — titular */}
        <div
          className={`p-8 lg:p-12 flex flex-col justify-center gap-6 border-b lg:border-b-0 lg:border-r border-dashed ${BORDER}`}
          data-aos="fade-right"
          data-aos-duration="700"
        >
          <h2 className="text-3xl lg:text-5xl leading-tight font-space-grotesk uppercase text-white font-normal">
            {h2}
          </h2>
          <p className="text-white/70 font-red-hat font-light text-sm leading-relaxed">
            {intro}
          </p>
        </div>

        {/* Derecha — lista */}
        <ul className="flex flex-col justify-center" data-aos="fade-left" data-aos-duration="700" data-aos-delay="80">
          {items.map((item, i) => (
            <li
              key={i}
              className={`flex items-start gap-4 px-8 lg:px-12 py-5 ${
                i < items.length - 1 ? `border-b border-dashed ${BORDER}` : ""
              }`}
            >
              <span className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-[1.5px] border-[#B2FF00]/60 flex items-center justify-center">
                <Check size={13} className="text-[#B2FF00]" strokeWidth={3} />
              </span>
              <p className="font-red-hat font-light text-white/70 text-sm lg:text-base leading-relaxed">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ParaVos;
