"use client";
import Link from "next/link";
import {
  Palette,
  LayoutTemplate,
  Gauge,
  Search,
  MessageSquareText,
  Smartphone,
  AtSign,
} from "lucide-react";
import { usePaginaWeb } from "./usePaginaWeb";
import RippleGrid from "../ui/RippleGrid";

const ICONS = [Palette, LayoutTemplate, Gauge, Search, MessageSquareText, Smartphone, AtSign];

/* Bento de escritorio: 4 columnas × 3 filas, sin huecos.
   [0] ocupa 2×2 · [3] y [6] ocupan 2×1 · el resto 1×1.
   En móvil no aplica ningún span: todo cae a una sola columna, como antes. */
const CELLS = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
];

/* Todas las tarjetas son transparentes: el mismo lienzo recorre el bento entero
   y el borde gris es lo que define el contorno de cada una. */
const BORDE = "border-[#2e2e2e]";

/* Convierte la mención a "Plan Paz Mental" dentro del texto en un enlace lima */
const linkPazMental = (text, href) => {
  const token = "Plan Paz Mental";
  const i = text.indexOf(token);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <Link
        href={href}
        className="text-[#B2FF00] underline underline-offset-2 decoration-[#B2FF00]/40 hover:decoration-[#B2FF00] transition-colors"
      >
        {token}
      </Link>
      {text.slice(i + token.length)}
    </>
  );
};

const Card = ({ Icon, title, text, big }) => (
  <div
    className={`relative overflow-hidden rounded-2xl p-6 lg:p-8 flex flex-col gap-4 h-full bg-transparent border-[1.5px] ${BORDE}`}
  >
    <span className="relative z-10 w-[44px] h-[44px] rounded-[10px] border-[2px] border-[#B2FF00] flex items-center justify-center flex-shrink-0">
      <Icon size={22} className="text-[#B2FF00]" />
    </span>

    <div className={`relative ${big ? "mt-auto" : ""}`}>
      {/* Las líneas del lienzo cruzan el texto: velo suave solo detrás del bloque,
          así la retícula sigue a la vista en el resto de la tarjeta. */}
      <span
        aria-hidden="true"
        className="absolute -inset-x-8 -bottom-10 -top-7 pointer-events-none bg-gradient-to-t from-[#141414] via-[#141414]/92 to-transparent"
      />

      <div className="relative">
        <h3
          className={`font-space-grotesk font-bold uppercase text-white leading-tight mb-2 ${
            big ? "text-base lg:text-xl" : "text-sm lg:text-base"
          }`}
        >
          {title}
        </h3>
        <p
          className={`font-red-hat font-light text-white/65 leading-relaxed ${
            big ? "text-sm lg:text-base" : "text-sm"
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  </div>
);

const Recibis = () => {
  const t = usePaginaWeb();
  const { h2, items } = t.recibis;
  const ppm = t.pazMental;
  const last = items.length - 1;

  return (
    <div className="w-full bg-[#1C1C1C] rounded-sm pb-16 md:pb-24">
      <div className="text-center pt-16 md:pt-24 pb-12 px-4">
        <h2
          className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-white/90 leading-tight max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          {h2}
        </h2>
      </div>

      {/* Un solo lienzo detrás de todo el bento. Las celdas opacas lo tapan y el
          relleno de cada celda pinta las calles, así no asoma entre tarjetas. */}
      <div className="relative mx-4 md:mx-8 lg:mx-12 bg-[#141414] rounded-2xl overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <RippleGrid
            color="#0ac0f4"
            rippleSpeed={0.55}
            fade={0.25}
            rippleSize={2.05}
            glow={0.8}
            mouseInteraction={false}
            clickRipple={false}
            /* Un círculo a la vez: nace en el centro, se mantiene visible hasta
               salir por el borde y recién entonces arranca el siguiente. */
            solo
            rippleDecay={0.1}
            rippleInterval={0.6}
          />
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
          {items.map((item, i) => {
            const isLast = i === last;
            return (
              <div
                key={i}
                /* Borde, no padding: pinta solo el anillo de la calle y deja
                   ver el lienzo en toda el área de la tarjeta. */
                className={`border-[6px] border-[#1C1C1C] ${CELLS[i] || ""}`}
                data-aos="fade-up"
                data-aos-delay={(i % 4) * 80}
              >
                <Card
                  Icon={ICONS[i] || AtSign}
                  title={item.title}
                  big={i === 0}
                  text={
                    isLast
                      ? linkPazMental(item.text, ppm?.ctaHref || "/plan-paz-mental")
                      : item.text
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Recibis;
