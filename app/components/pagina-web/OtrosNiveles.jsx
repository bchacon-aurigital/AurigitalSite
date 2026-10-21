"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePaginaWeb } from "./usePaginaWeb";
import CotizacionButton from "../ui/CotizacionButton";

const STYLES = `
.niv-card {
  position: relative; overflow: hidden; height: 100%;
  min-height: 230px; border-radius: 1rem; border: 1px solid transparent;
  display: flex; flex-direction: column; gap: 1rem;
  transition: transform .45s cubic-bezier(.22,.61,.36,1),
              border-color .35s ease, background-color .35s ease, box-shadow .45s ease;
}

/* Retícula compartida: tenue en la tarjeta actual, oculta en las demás
   hasta que el hover la revela. */
.niv-grid {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(178,255,0,.13) 1px, transparent 1px),
    linear-gradient(90deg, rgba(178,255,0,.13) 1px, transparent 1px);
  background-size: 26px 26px;
  transition: opacity .45s ease;
}
.niv-contenido { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 1rem; height: 100%; }

/* Barrido de luz, el mismo gesto que usan los botones de marca */
.niv-sweep {
  position: absolute; inset: 0; z-index: 0; pointer-events: none; opacity: 0;
  background: linear-gradient(105deg, transparent 30%, rgba(178,255,0,.12) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: opacity .25s ease;
}
@keyframes niv-sweep { from { transform: translateX(-100%); } to { transform: translateX(200%); } }

/* ── La actual ── */
.niv-card.-actual { background: #101010; border-color: rgba(178,255,0,.5); }
.niv-card.-actual .niv-grid { opacity: .5; }

/* ── Las seleccionables ── */
.niv-card.-elegible { background: #181818; }
.niv-card.-elegible .niv-grid { opacity: 0; }

.niv-flecha {
  flex-shrink: 0; width: 2.25rem; height: 2.25rem; border-radius: .75rem;
  background: #B2FF00; color: #000; display: flex; align-items: center; justify-content: center;
  transition: transform .4s cubic-bezier(.22,.61,.36,1), background-color .3s ease,
              box-shadow .4s ease;
}

@media (hover: hover) and (pointer: fine) {
  .niv-link:hover .niv-card.-elegible,
  .niv-link:focus-visible .niv-card.-elegible {
    transform: translateY(-6px);
    background: #101010;
    border-color: #B2FF00;
    box-shadow: 0 0 0 1px rgba(178,255,0,.22),
                0 20px 44px -18px rgba(178,255,0,.38),
                0 22px 52px -26px rgba(0,0,0,.95);
  }
  .niv-link:hover .niv-card.-elegible .niv-grid,
  .niv-link:focus-visible .niv-card.-elegible .niv-grid { opacity: .85; }

  .niv-link:hover .niv-card.-elegible .niv-sweep { opacity: 1; animation: niv-sweep 1.3s ease-in-out infinite; }

  .niv-link:hover .niv-card.-elegible .niv-flecha,
  .niv-link:focus-visible .niv-card.-elegible .niv-flecha {
    transform: translate(4px, -4px) scale(1.14);
    background: #c8ff33;
    box-shadow: 0 0 20px rgba(178,255,0,.45);
  }
}

.niv-link:focus-visible { outline: none; }

@media (prefers-reduced-motion: reduce) {
  .niv-card, .niv-grid, .niv-flecha { transition: none; }
  .niv-link:hover .niv-card.-elegible { transform: none; }
  .niv-sweep { display: none; }
}
`;

const OtrosNiveles = ({ onCtaClick }) => {
  const { h2, text, cards, cta } = usePaginaWeb().otrosNiveles;

  return (
    <div className="w-full bg-[#1C1C1C] rounded-sm">
      <style>{STYLES}</style>

      {/* Encabezado */}
      <div className="pt-16 md:pt-24 pb-12 px-4 md:px-8 lg:px-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <h2
          className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-white/90 leading-tight max-w-xl"
          data-aos="fade-right"
          data-aos-duration="700"
        >
          {h2}
        </h2>
        <p
          className="font-red-hat font-light text-white/50 text-sm md:text-base leading-relaxed max-w-xl"
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="80"
        >
          {text}
        </p>
      </div>

      {/* Niveles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 md:px-8 lg:px-12">
        {cards.map((card, i) => {
          const isCurrent = Boolean(card.current);

          const body = (
            <div className={`niv-card ${isCurrent ? "-actual" : "-elegible"} p-6 lg:p-8`}>
              <span className="niv-grid" aria-hidden="true" />
              {!isCurrent && <span className="niv-sweep" aria-hidden="true" />}

              <div className="niv-contenido">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-space-grotesk font-bold uppercase text-white text-base lg:text-lg leading-tight">
                    {card.title}
                  </h3>
                  {isCurrent ? (
                    <span className="flex-shrink-0 font-space-grotesk font-medium text-[0.65rem] uppercase tracking-widest text-[#B2FF00] border border-[#B2FF00]/60 rounded-lg px-3 py-1.5">
                      {card.badge}
                    </span>
                  ) : (
                    <span className="niv-flecha">
                      <ArrowUpRight size={17} />
                    </span>
                  )}
                </div>

                <p className="font-red-hat font-light text-white/50 text-sm leading-relaxed">
                  {card.text}
                </p>

                <p className="mt-auto font-space-grotesk font-medium text-sm text-white/80">
                  {card.price}
                </p>
              </div>
            </div>
          );

          return (
            <div key={card.title} data-aos="fade-up" data-aos-delay={i * 100}>
              {card.href ? (
                <Link href={card.href} className="niv-link block h-full">
                  {body}
                </Link>
              ) : (
                body
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div
        className="px-4 md:px-8 lg:px-12 pt-10 pb-16 md:pb-20 flex justify-center"
        data-aos="fade-up"
        data-aos-delay="120"
      >
        <CotizacionButton onClick={onCtaClick}>{cta}</CotizacionButton>
      </div>
    </div>
  );
};

export default OtrosNiveles;
