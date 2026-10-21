"use client";
import { useEffect, useState } from "react";
import { useNivel } from "./NivelContext";
import CotizacionButton from "../ui/CotizacionButton";

/* Separa el titular en su primera coma para darle el acento Mansfield del home */
const splitAtComma = (text = "") => {
  const i = text.indexOf(", ");
  return i === -1 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 2)];
};

/**
 * Armazón compartido de los heros de nivel: epígrafe, h1 con acento, descripción,
 * botonera y chip de inversión. Cada nivel le pasa su propio fondo.
 *
 * El texto vive siempre en el HTML estático; lo único que se monta en cliente es
 * el lienzo que llegue por `fondo`.
 */
export default function HeroNivel({
  fondo,
  fondoEstatico,
  velo,
  hint = false,
  onPrimaryClick,
}) {
  const data = useNivel().hero;
  const [mounted, setMounted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    requestAnimationFrame(() => setMounted(true));
    if (!hint) return;
    const t = setTimeout(() => setShowHint(true), 2200);
    return () => clearTimeout(t);
  }, [hint]);

  const [titleStart, titleAccent] = splitAtComma(data.h1);

  const reveal = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.9s ease-out ${delay}s, transform 0.9s ease-out ${delay}s`,
  });

  return (
    /* El navbar va en flujo por encima (95px en móvil, 129px desde md), así que
       restamos su alto: de lo contrario el borde inferior del hero —y con él el
       chip de inversión— cae siempre debajo del pliegue. */
    <section
      className="relative min-h-[calc(100dvh-95px)] md:min-h-[calc(100dvh-129px)] w-full overflow-hidden bg-[#101010] flex items-center"
      role="banner"
      aria-label={data.eyebrow}
    >
      <style>{`
        @keyframes hint-pulse {
          0%   { opacity: 0.25; text-shadow: 0 0 4px rgba(100,184,232,0.15); }
          50%  { opacity: 1;    text-shadow: 0 0 20px rgba(100,184,232,1), 0 0 40px rgba(100,184,232,0.5), 0 0 60px rgba(100,184,232,0.2); }
          100% { opacity: 0.25; text-shadow: 0 0 4px rgba(100,184,232,0.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-hint] { animation: none !important; opacity: 0.6 !important; }
        }
      `}</style>

      {/* Respaldo estático: queda debajo del lienzo y es lo único que se ve
          cuando el nivel decide no montarlo (equipos de poca potencia, sin WebGL). */}
      {fondoEstatico && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: fondoEstatico }} />
      )}

      {fondo && (
        <div className="absolute inset-0" aria-hidden="true">
          {fondo}
        </div>
      )}

      {/* Velo radial: mantiene legible el copy sobre el fondo */}
      {velo && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: velo }} />
      )}

      <div className="relative z-10 pointer-events-none container mx-auto px-4 md:px-12 py-24">
        <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center">
          <p
            className="text-white/70 font-space-grotesk font-light text-sm tracking-widest uppercase mb-8"
            style={reveal(0.2)}
          >
            {/* Decorativo, igual que en el hero del home. Fuera del texto accesible
                para no ensuciar lo que leen lectores de pantalla ni los crawlers. */}
            <span aria-hidden="true">{"// "}</span>
            {data.eyebrow}
          </p>

          <h1
            className="text-3xl md:text-5xl font-medium font-space-grotesk leading-tight"
            style={reveal(0.55)}
          >
            <span className="text-white/90">{titleStart}</span>
            {titleAccent && (
              <>
                <br className="hidden sm:flex" />{" "}
                <span className="italic font-bold font-mansfield">{titleAccent}</span>
              </>
            )}
          </h1>

          {/* Hint del home: invita a tocar el fondo para disparar el latido */}
          {hint && (
            <p
              className="font-space-grotesk text-xs uppercase tracking-widest text-[#64B8E8] mt-6"
              aria-hidden="true"
              data-hint
              style={{
                opacity: showHint ? 1 : 0,
                transition: "opacity 0.7s ease-out",
                animation: showHint ? "hint-pulse 2.2s ease-in-out infinite" : "none",
              }}
            >
              {isTouch ? "[ TAP ]" : "[ CLICK ]"}
            </p>
          )}

          <p
            className="text-md text-white/80 mt-6 max-w-[42rem] font-red-hat font-light px-2"
            style={reveal(0.9)}
          >
            {data.description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 mt-12" style={reveal(1.3)}>
            <span className="pointer-events-auto">
              <CotizacionButton onClick={onPrimaryClick}>{data.ctaPrimary}</CotizacionButton>
            </span>
            <span className="pointer-events-auto">
              <CotizacionButton href="#ejemplos" variant="white">
                {data.ctaSecondary}
              </CotizacionButton>
            </span>
          </div>
        </div>
      </div>

      {/* Inversión y plazo: chip en la esquina inferior derecha, con la retícula
          que usamos en los botones y en los paneles del proceso */}
      <div
        /* En móvil sube por encima del selector de idioma, que es fixed abajo a la
           izquierda y se solapaba con el chip en pantallas de 360px. */
        className="absolute right-4 md:right-10 bottom-24 md:bottom-10 z-20 pointer-events-none max-w-[calc(100%-2rem)]"
        style={reveal(1.5)}
      >
        <div className="relative overflow-hidden rounded-xl border border-[#64c2ef]/45 bg-[#11405e] px-4 py-3 md:px-6 md:py-3.5 shadow-[0_0_24px_rgba(100,194,239,0.18)]">
          <span
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(rgba(200,243,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(200,243,255,0.18) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />
          <p className="relative font-space-grotesk font-medium text-[11px] md:text-sm uppercase tracking-widest text-white">
            {data.priceLine}
          </p>
        </div>
      </div>
    </section>
  );
}
