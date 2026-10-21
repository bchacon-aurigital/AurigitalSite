"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import es from "../../i18n/locales/es.json";
import CotizacionButton from "../ui/CotizacionButton";

/* Cada nivel guarda sus propios ejemplos en i18n bajo <nivel>.ejemplos */
const LEVEL_SOURCES = {
  "pagina-web": (t) => t?.paginaWeb?.ejemplos,
  "sistema-web": (t) => t?.sistemaWeb?.ejemplos,
  "ecosistema-web": (t) => t?.ecosistemaWeb?.ejemplos,
};

/* Geometría del abanico. Las tarjetas son capturas apaisadas, así que el
   encuadre es más ancho que el del referente (que usaba retratos). */
const CFG = {
  cardW: 380,
  cardH: 238,
  gap: 232,
  rotate: 38,
  depth: 150,
  drop: 22,
  shrink: 0.14,
  fade: 0.26,
  dim: 0.22,
  visible: 3,
  persp: 1680,
  autoplayMs: 4200,
  ease: 0.14,
  sensitivity: 0.0072,
};

const trackProjectClick = (project) => {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "select_portfolio_item",
    project_name: project.title,
    project_url: project.href,
  });
};

const STYLES = `
.lvl-stage {
  position: relative; display: grid; place-items: center;
  width: 100%; height: calc(var(--lvl-card-h) + 120px);
  perspective: var(--lvl-persp); perspective-origin: 50% 46%;
  cursor: grab; touch-action: pan-y; user-select: none;
}
.lvl-stage.-drag { cursor: grabbing; }
.lvl-deck { position: relative; width: 0; height: 0; transform-style: preserve-3d; }

.lvl-card {
  display: block; text-decoration: none;
  position: absolute; width: var(--lvl-card-w); height: var(--lvl-card-h);
  left: calc(var(--lvl-card-w) / -2); top: calc(var(--lvl-card-h) / -2);
  margin: 0; padding: 0; border: 0; background: none; cursor: pointer;
  transform-style: preserve-3d; will-change: transform, opacity;
  -webkit-tap-highlight-color: transparent; outline: none;
}
.lvl-card__inner {
  position: absolute; inset: 0; border-radius: 18px; overflow: hidden;
  background: #141414;
  box-shadow: 0 30px 60px -22px rgba(0,0,0,.9), 0 6px 20px -10px rgba(0,0,0,.75);
}
.lvl-card__inner::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 0 0 1px rgba(255,255,255,.07);
}
.lvl-card:focus-visible .lvl-card__inner {
  box-shadow: 0 30px 60px -22px rgba(0,0,0,.9), 0 0 0 3px #B2FF00;
}

/* Resplandor detrás de la tarjeta central */
.lvl-halo {
  position: absolute; top: 48%; left: 50%; transform: translate(-50%, -50%);
  width: min(74vw, 680px); aspect-ratio: 1; z-index: 0; pointer-events: none;
  background: radial-gradient(closest-side, rgba(100,184,232,.55), transparent 72%);
  opacity: .3; filter: blur(34px);
}

/* Retícula de plano técnico para una tarjeta sin captura todavía */
.lvl-card__grid {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  background-image:
    linear-gradient(rgba(100,180,220,.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100,180,220,.14) 1px, transparent 1px);
  background-size: 28px 28px;
}

@media (prefers-reduced-motion: reduce) {
  .lvl-card { transition: none !important; }
}
`;

export default function LevelExamples({ level }) {
  const { translations } = useLanguage();
  const resolve = LEVEL_SOURCES[level];
  /* Respaldo a español mientras en.json no traiga la clave del nivel */
  const data = resolve?.(translations) || resolve?.(es);
  const upcomingLabel = translations?.proyectosCarrusel?.nowCreating || es.proyectosCarrusel.nowCreating;

  const cards = (data?.cards || []).filter((c) => !c.level || c.level === level);
  const N = cards.length;

  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const scaleRef = useRef(1);
  const dragRef = useRef({ on: false, moved: false, lastX: 0, startX: 0, vel: 0 });
  const [active, setActive] = useState(0);

  const irA = useCallback(
    (i) => {
      const cur = Math.round(targetRef.current);
      const o = ((((i - cur) % N) + N) % N) > N / 2 ? (((i - cur) % N) + N) % N - N : (((i - cur) % N) + N) % N;
      targetRef.current = cur + o;
    },
    [N]
  );

  useEffect(() => {
    if (!N) return;
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wrap = (o) => {
      o = ((o % N) + N) % N;
      return o > N / 2 ? o - N : o;
    };

    const layout = () => {
      const f = Math.max(0.5, Math.min(1, window.innerWidth / 1240));
      scaleRef.current = f;
      stage.style.setProperty("--lvl-card-w", Math.round(CFG.cardW * f) + "px");
      stage.style.setProperty("--lvl-card-h", Math.round(CFG.cardH * f) + "px");
      stage.style.setProperty("--lvl-persp", Math.max(1050, CFG.persp * f) + "px");
    };
    layout();
    window.addEventListener("resize", layout);

    const paint = () => {
      const s = scaleRef.current;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const o = wrap(i - posRef.current);
        const ao = Math.abs(o);
        if (ao > CFG.visible + 0.5) {
          el.style.opacity = "0";
          el.style.pointerEvents = "none";
          continue;
        }
        const sc = Math.max(0.4, 1 - ao * CFG.shrink);
        el.style.transform =
          `translateX(${o * CFG.gap * s}px) translateY(${ao * CFG.drop * s}px) ` +
          `translateZ(${-ao * CFG.depth * s}px) rotateY(${-o * CFG.rotate}deg) scale(${sc})`;
        el.style.opacity = String(Math.max(0, 1 - ao * CFG.fade));
        el.style.filter = `brightness(${Math.max(0.3, 1 - ao * CFG.dim)}) saturate(${1 + (1 - Math.min(1, ao)) * 0.25})`;
        el.style.zIndex = String(Math.round(100 - ao * 10));
        el.style.pointerEvents = "auto";
      }
    };

    let raf;
    let ultimo = -1;
    const frame = () => {
      if (!dragRef.current.on) {
        if (reduce) posRef.current = targetRef.current;
        else {
          posRef.current += (targetRef.current - posRef.current) * CFG.ease;
          if (Math.abs(targetRef.current - posRef.current) < 0.001) posRef.current = targetRef.current;
        }
      }
      paint();
      const a = ((Math.round(posRef.current) % N) + N) % N;
      if (a !== ultimo) {
        ultimo = a;
        setActive(a);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    /* arrastre */
    const onDown = (e) => {
      const d = dragRef.current;
      d.on = true;
      d.moved = false;
      d.lastX = d.startX = e.clientX;
      d.vel = 0;
      stage.classList.add("-drag");
      stage.setPointerCapture?.(e.pointerId);
      sincronizar();
    };
    const onMove = (e) => {
      const d = dragRef.current;
      if (!d.on) return;
      const dx = e.clientX - d.lastX;
      d.lastX = e.clientX;
      if (Math.abs(e.clientX - d.startX) > 5) d.moved = true;
      const paso = -dx * CFG.sensitivity;
      posRef.current += paso;
      d.vel = paso;
      paint();
    };
    const soltar = () => {
      const d = dragRef.current;
      if (!d.on) return;
      d.on = false;
      stage.classList.remove("-drag");
      targetRef.current = Math.round(posRef.current + d.vel * 8);
      d.vel = 0;
      sincronizar();
    };
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", soltar);
    stage.addEventListener("pointercancel", soltar);

    /* teclado */
    const onKey = (e) => {
      if (e.key === "ArrowRight") { targetRef.current += 1; e.preventDefault(); }
      else if (e.key === "ArrowLeft") { targetRef.current -= 1; e.preventDefault(); }
      else if (e.key === "Home") { targetRef.current = 0; e.preventDefault(); }
      else if (e.key === "End") { targetRef.current = N - 1; e.preventDefault(); }
    };
    stage.addEventListener("keydown", onKey);

    /* reproducción automática: pausa al pasar el mouse, al arrastrar y con la pestaña oculta */
    let timer = null;
    let hover = false;
    const activo = () => CFG.autoplayMs > 0 && !reduce && !hover && !dragRef.current.on && !document.hidden;
    function sincronizar() {
      clearInterval(timer);
      timer = null;
      if (activo()) timer = setInterval(() => { targetRef.current += 1; }, CFG.autoplayMs);
    }
    const onEnter = () => { hover = true; sincronizar(); };
    const onLeave = () => { hover = false; sincronizar(); };
    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", sincronizar);
    sincronizar();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(timer);
      window.removeEventListener("resize", layout);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", soltar);
      stage.removeEventListener("pointercancel", soltar);
      stage.removeEventListener("keydown", onKey);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", sincronizar);
    };
  }, [N]);

  if (!N) return null;


  return (
    <div id="ejemplos" className="w-full scroll-mt-24">
      <style>{STYLES}</style>

      {/* Encabezado */}
      <div className="text-center pt-16 md:pt-24 pb-10 px-4">
        <h2
          className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-white/90 leading-tight max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          {data.h2}
        </h2>
        {data.intro && (
          <p
            className="font-red-hat font-light text-white/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto mt-5"
            data-aos="fade-up"
            data-aos-delay="80"
            data-aos-duration="600"
          >
            {data.intro}
          </p>
        )}
      </div>

      {/* Abanico */}
      <div className="relative overflow-hidden">
        <span className="lvl-halo" aria-hidden="true" />
        <div
          ref={stageRef}
          className="lvl-stage"
          tabIndex={0}
          role="group"
          aria-roledescription="carrusel"
          aria-label={data.h2}
        >
          <div className="lvl-deck">
            {/* Cada tarjeta es un enlace real: así los seis proyectos quedan en el
                HTML con su nombre y su href, rastreables sin ejecutar JS. Un clic
                sobre una tarjeta lateral centra en vez de navegar. */}
            {cards.map((card, i) => (
              <a
                key={card.slug || i}
                href={card.href || undefined}
                target={card.href ? "_blank" : undefined}
                rel={card.href ? "noopener noreferrer" : undefined}
                ref={(el) => (cardRefs.current[i] = el)}
                className="lvl-card"
                aria-current={active === i ? "true" : undefined}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onClick={(e) => {
                  if (dragRef.current.moved) { e.preventDefault(); return; }
                  if (active !== i || !card.href) { e.preventDefault(); irA(i); return; }
                  trackProjectClick(card);
                }}
              >
                <span className="sr-only">{card.title}</span>
                <span className="lvl-card__inner">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt=""
                      aria-hidden="true"
                      fill
                      unoptimized
                      draggable={false}
                      sizes="(max-width: 768px) 80vw, 380px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="lvl-card__grid">
                      {upcomingLabel && (
                        <span className="flex items-center gap-2 font-space-grotesk font-medium text-xs uppercase tracking-widest text-white/60">
                          <span className="w-2 h-2 rounded-full bg-[#B2FF00]" />
                          {upcomingLabel}
                        </span>
                      )}
                    </span>
                  )}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ficha del proyecto al frente. Se emiten todas, apiladas: la activa manda
          en el alto del bloque y las demás esperan en opacidad cero, de modo que
          el nombre, el rubro y el resumen de cada proyecto salen en el HTML. */}
      <div className="relative px-4 text-center mt-2">
        {cards.map((card, i) => {
          const esActivo = i === active;
          return (
            <div
              key={card.slug || i}
              className={
                esActivo
                  ? "relative transition-opacity duration-300"
                  : "absolute inset-x-0 top-0 opacity-0 pointer-events-none transition-opacity duration-300"
              }
              aria-hidden={esActivo ? undefined : "true"}
            >
              <p className="font-space-grotesk font-bold uppercase text-white text-base md:text-lg tracking-wide">
                {card.title}
              </p>

              {card.href ? (
                <Link
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={esActivo ? undefined : -1}
                  onClick={() => trackProjectClick(card)}
                  className="inline-flex items-center gap-1.5 mt-2 font-space-grotesk font-medium text-xs uppercase tracking-widest text-[#B2FF00] hover:text-[#c8ff33] transition-colors"
                >
                  {card.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ArrowUpRight size={14} />
                </Link>
              ) : (
                upcomingLabel && (
                  <span className="inline-flex items-center gap-2 mt-2 font-space-grotesk font-medium text-xs uppercase tracking-widest text-white/50">
                    <span className="w-2 h-2 rounded-full bg-[#B2FF00]" />
                    {upcomingLabel}
                  </span>
                )
              )}

              {/* Un solo dato, el de más valor, con la estrella por delante.
                  Sin rubro ni resumen: el contexto lo da el propio proyecto. */}
              {card.metric?.value && (
                <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-4">
                  <Star
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="text-[#B2FF00] rounded-full border border-[#B2FF00]/50 p-[3px] flex-shrink-0"
                  />
                  <span className="font-space-grotesk font-medium text-base md:text-lg text-[#B2FF00] leading-none">
                    {card.metric.value}
                  </span>
                  {card.metric.label && (
                    <span className="font-red-hat font-light text-white/55 text-xs md:text-sm leading-none">
                      {card.metric.label}
                    </span>
                  )}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Hacia el portafolio completo */}
      {data.link && (
        <div className="px-4 pt-10 pb-16 md:pb-20 flex justify-center" data-aos="fade-up">
          <CotizacionButton href={data.linkHref || "/proyectos"} variant="white">
            {data.link}
          </CotizacionButton>
        </div>
      )}
    </div>
  );
}
