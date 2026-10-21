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
  LayoutDashboard,
  ShoppingCart,
  CalendarCheck,
  GraduationCap,
  Ticket,
  PenLine,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useNivel, useNivelKey } from "./NivelContext";
import RippleGrid from "../ui/RippleGrid";

/* Un icono por prestación, en el orden en que el nivel las lista en i18n */
const ICONOS = {
  paginaWeb: [Palette, LayoutTemplate, Gauge, Search, MessageSquareText, Smartphone, AtSign],
  sistemaWeb: [
    LayoutDashboard,
    ShoppingCart,
    CalendarCheck,
    GraduationCap,
    Ticket,
    PenLine,
    BarChart3,
    Sparkles,
  ],
};

/* Bento de escritorio: 4 columnas, sin huecos. [0] ocupa 2×2 y las celdas
   anchas rematan la fila. En móvil no aplica ningún span: todo cae a una sola
   columna. La clave es la cantidad de prestaciones que lista el nivel.
     7 → 2×2 + 1 + 1 / 2 / 1 + 1 + 2
     8 → 2×2 + 1 + 1 / 2 / 1 + 1 + 1 + 1 */
const BENTOS = {
  7: ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", "", "", "lg:col-span-2"],
  8: ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", "", "", "", ""],
};

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
  const t = useNivel();
  const nivel = useNivelKey();
  const { h2, intro, items } = t.recibis;
  const ppm = t.pazMental;
  const iconos = ICONOS[nivel] || ICONOS.paginaWeb;
  const celdas = BENTOS[items.length] || [];

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
        {intro && (
          <p
            className="font-red-hat font-light text-white/50 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mt-5"
            data-aos="fade-up"
            data-aos-delay="80"
            data-aos-duration="600"
          >
            {intro}
          </p>
        )}
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
          {items.map((item, i) => (
            <div
              key={i}
              /* Borde, no padding: pinta solo el anillo de la calle y deja
                 ver el lienzo en toda el área de la tarjeta. */
              className={`border-[6px] border-[#1C1C1C] ${celdas[i] || ""}`}
              data-aos="fade-up"
              data-aos-delay={(i % 4) * 80}
            >
              <Card
                Icon={iconos[i] || AtSign}
                title={item.title}
                big={i === 0}
                text={linkPazMental(item.text, ppm?.ctaHref || "/plan-paz-mental")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recibis;
