"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  Briefcase,
  RadioTower,
  HeartPulse,
  UtensilsCrossed,
  Zap,
  ShoppingBag,
  CalendarDays,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import es from "../../i18n/locales/es.json";

const BORDER = "border-[#1e3f52]/70";

/* Las industrias, en el orden en que se muestran. La etiqueta de cada una
   vive en i18n; acá solo van el orden y el icono. */
const INDUSTRIAS = [
  { id: "arte-cultura", Icon: RadioTower },
  { id: "salud-bienestar", Icon: HeartPulse },
  { id: "turismo-gastronomia", Icon: UtensilsCrossed },
  { id: "servicios-profesionales", Icon: Briefcase },
  { id: "energia-infraestructura", Icon: Zap },
  { id: "comercio", Icon: ShoppingBag },
  { id: "eventos-congresos", Icon: CalendarDays },
];

const STYLES = `
/* Sin registrar, una custom property no interpola y la deriva no se mueve */
@property --pf-x { syntax: '<percentage>'; inherits: true; initial-value: 50%; }
@property --pf-y { syntax: '<percentage>'; inherits: true; initial-value: 40%; }

/* ── Fondo de cuadros del encabezado ─────────────────────────────────────
   Tres capas sobre el mismo paso de retícula: la trama apagada siempre
   visible, la misma trama en lima revelada por una máscara que sigue al
   puntero, y unos pocos cuadros que laten solos. */
.pf-head { position: relative; overflow: hidden; --pf-x: 50%; --pf-y: 40%; }
.pf-head > * { position: relative; z-index: 1; }

.pf-trama, .pf-trama-viva {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-size: 34px 34px;
}
.pf-trama {
  background-image:
    linear-gradient(rgba(240,250,255,.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240,250,255,.055) 1px, transparent 1px);
}
/* La trama lima solo existe donde pasa el foco */
.pf-trama-viva {
  background-image:
    linear-gradient(rgba(178,255,0,.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(178,255,0,.5) 1px, transparent 1px);
  -webkit-mask-image: radial-gradient(circle 190px at var(--pf-x) var(--pf-y), #000 0%, rgba(0,0,0,.45) 45%, transparent 72%);
  mask-image: radial-gradient(circle 190px at var(--pf-x) var(--pf-y), #000 0%, rgba(0,0,0,.45) 45%, transparent 72%);
}
/* Halo suave bajo el foco */
.pf-foco {
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(circle 220px at var(--pf-x) var(--pf-y), rgba(178,255,0,.09), transparent 70%);
}

/* Sin puntero fino el foco recorre el bloque solo */
.pf-head.-auto .pf-trama-viva, .pf-head.-auto .pf-foco { animation: pf-deriva 14s ease-in-out infinite; }
@keyframes pf-deriva {
  0%   { --pf-x: 22%; --pf-y: 30%; }
  50%  { --pf-x: 78%; --pf-y: 66%; }
  100% { --pf-x: 22%; --pf-y: 30%; }
}

/* Cuadros sueltos que laten, alineados al paso de 34px */
.pf-cuadro {
  position: absolute; width: 34px; height: 34px; z-index: 0; pointer-events: none;
  background: rgba(178,255,0,.1); animation: pf-latido 4.5s ease-in-out infinite;
}
@keyframes pf-latido { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .pf-head.-auto .pf-trama-viva, .pf-head.-auto .pf-foco, .pf-cuadro { animation: none; }
  .pf-cuadro { opacity: .5; }
}

.pf-pill {
  position: relative; display: inline-flex; align-items: center; gap: .55rem;
  padding: .6rem 1.15rem; border-radius: 999px; cursor: pointer;
  font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: .9rem;
  color: rgba(255,255,255,.62);
  background: #161616; border: 1px solid #2e2e2e;
  transition: color .3s ease, border-color .3s ease, background-color .3s ease,
              box-shadow .35s ease, transform .35s cubic-bezier(.22,.61,.36,1);
}
.pf-pill:focus-visible { outline: 2px solid #B2FF00; outline-offset: 3px; }

@media (hover: hover) and (pointer: fine) {
  .pf-pill:not(.-on):hover {
    color: #fff; border-color: rgba(178,255,0,.45); transform: translateY(-2px);
    box-shadow: 0 10px 24px -16px rgba(178,255,0,.5);
  }
}

/* El activo toma el lima de marca, igual que los botones */
.pf-pill.-on {
  color: #101010; background: #B2FF00; border-color: #B2FF00;
  box-shadow: 0 0 20px rgba(178,255,0,.28), inset 0 0 0 1px rgba(255,255,255,.25);
}

.pf-card { animation: pf-in .45s cubic-bezier(.22,.61,.36,1) both; }
@keyframes pf-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }

@media (prefers-reduced-motion: reduce) {
  .pf-pill, .pf-card { transition: none; animation: none; }
}
`;

/* Cuadros que laten, alineados al paso de 34px de la trama */
const CUADROS = [
  { x: "8%", y: "24%", d: 0 },
  { x: "21%", y: "68%", d: 1.4 },
  { x: "37%", y: "16%", d: 2.6 },
  { x: "63%", y: "74%", d: 0.8 },
  { x: "79%", y: "30%", d: 2.1 },
  { x: "91%", y: "60%", d: 3.3 },
];

const trackProyecto = (proyecto) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "select_portfolio_item",
    project_name: proyecto.title,
    project_url: proyecto.href,
  });
};

export default function Portafolio() {
  const { translations } = useLanguage();
  const t = translations?.proyectosGaleria || es.proyectosGaleria;
  const hero = translations?.heroProyectos || es.heroProyectos;
  const filtros = t.filtros || es.proyectosGaleria.filtros;
  const etiquetas = filtros.industrias || es.proyectosGaleria.filtros.industrias;

  const [industria, setIndustria] = useState("todos");

  /* `/proyectos?industria=comercio` permite enlazar a una industria concreta */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pedida = new URLSearchParams(window.location.search).get("industria");
    if (pedida && INDUSTRIAS.some((i) => i.id === pedida)) setIndustria(pedida);
  }, []);

  const cards = t.cards || [];

  /* Solo se ofrecen las industrias que hoy tienen proyectos publicados */
  const pestanas = useMemo(() => {
    const conteo = (id) => cards.filter((c) => c.industria === id).length;
    return [
      { id: "todos", label: filtros.todos, Icon: LayoutGrid, total: cards.length },
      ...INDUSTRIAS.filter((i) => conteo(i.id) > 0).map((i) => ({
        id: i.id,
        label: etiquetas[i.id] || i.id,
        Icon: i.Icon,
        total: conteo(i.id),
      })),
    ];
  }, [cards, filtros.todos, etiquetas]);

  const visibles = useMemo(
    () => (industria === "todos" ? cards : cards.filter((c) => c.industria === industria)),
    [cards, industria]
  );

  /* El foco de la trama sigue al puntero. Con puntero grueso no hay hover,
     así que el bloque se marca `-auto` y el foco deriva solo. */
  const cabeceraRef = useRef(null);
  const [autoDeriva, setAutoDeriva] = useState(true);

  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setAutoDeriva(!fino);
    if (!fino) return;

    const el = cabeceraRef.current;
    if (!el) return;
    let pendiente = null;
    const onMove = (e) => {
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = null;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--pf-x", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--pf-y", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (pendiente) cancelAnimationFrame(pendiente);
    };
  }, []);

  return (
    <div id="portafolio" className={`border border-dashed ${BORDER} rounded-sm scroll-mt-24`}>
      <style>{STYLES}</style>

      {/* Encabezado: título, subtítulo y filtros sobre la trama de cuadros */}
      <div ref={cabeceraRef} className={`pf-head ${autoDeriva ? "-auto" : ""}`}>
        <div className="pf-trama" aria-hidden="true" />
        <div className="pf-foco" aria-hidden="true" />
        <div className="pf-trama-viva" aria-hidden="true" />
        {CUADROS.map((c, i) => (
          <span
            key={i}
            className="pf-cuadro"
            aria-hidden="true"
            style={{ left: c.x, top: c.y, animationDelay: `${c.d}s` }}
          />
        ))}

      <div className="px-6 pt-16 md:pt-24 pb-10 text-center">
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-medium uppercase text-white leading-[0.95] max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <span className="text-white/90">
            {hero.title.part1} {hero.title.part2}
          </span>{" "}
          <span className="italic font-bold font-mansfield">{hero.title.part3}</span>
        </h1>
        <p
          className="font-red-hat font-light text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6"
          data-aos="fade-up"
          data-aos-delay="80"
          data-aos-duration="600"
        >
          {hero.description.text}
        </p>
      </div>

      {/* Filtros */}
      <div
        className="px-6 pb-12 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto"
        role="group"
        aria-label={filtros.label}
        data-aos="fade-up"
        data-aos-delay="140"
      >
        {pestanas.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            className={`pf-pill ${industria === id ? "-on" : ""}`}
            aria-pressed={industria === id}
            onClick={() => setIndustria(id)}
          >
            <Icon size={16} strokeWidth={2} aria-hidden="true" />
            {label}
          </button>
        ))}
        </div>
      </div>

      {/* Rejilla */}
      <div className={`border-t border-dashed ${BORDER} px-4 md:px-8 lg:px-12 py-10`}>
        {visibles.length === 0 ? (
          <p className="font-red-hat font-light text-white/45 text-sm text-center py-16">
            {filtros.vacio}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
            {visibles.map((proyecto, index) => (
              <a
                /* La industria entra en la `key` para que al cambiar de filtro
                   React remonte las tarjetas y la entrada se reproduzca. */
                key={`${industria}-${proyecto.id}`}
                href={proyecto.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackProyecto(proyecto)}
                className="pf-card group relative block rounded-2xl overflow-hidden bg-[#1B1B1B] border border-[#2e2e2e] h-[300px] no-underline"
                style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
              >
                <div className="relative w-full h-full flex flex-col justify-center items-center py-1 px-4 transition-transform duration-300 group-hover:scale-[1.04]">
                  <Image
                    src={`/assets/proyectos/ImgsProyectos/${proyecto.image}`}
                    alt={proyecto.title}
                    width={280}
                    height={170}
                    className="object-cover h-[170px] w-full mx-auto rounded-2xl"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    unoptimized={true}
                  />

                  <div className="h-[100px] py-4 w-full text-white z-10">
                    <h2 className="text-white text-base md:text-lg lg:text-xl uppercase font-space-grotesk font-medium tracking-wider leading-tight">
                      {proyecto.title}
                    </h2>
                    <p className="text-white/60 text-xs md:text-sm font-red-hat font-light leading-relaxed">
                      {proyecto.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
