"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNivel } from "./NivelContext";

const BORDER = "border-[#1e3f52]/70";

/* Separa el titular en su primera coma para darle el acento Mansfield del home */
const splitAtComma = (text = "") => {
  const i = text.indexOf(", ");
  return i === -1 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 2)];
};

/* Paleta de los paneles: del azul del hero al lima de marca, un paso por tono */
const SCENES = ["aur-scene--1", "aur-scene--2", "aur-scene--3", "aur-scene--4"];

const STYLES = `
.aur-colonnade { position: relative; height: 620px; background: #101010; }
.aur-strip { position: absolute; inset: 0; display: flex; }

.aur-col {
  position: relative; flex: 1 1 0%; min-width: 0; overflow: hidden;
  border-left: 1px dashed rgba(30,63,82,.7); cursor: pointer; outline: none;
  background: #141414;
  transition: flex-grow 900ms cubic-bezier(.76,0,.18,1);
}
.aur-col:first-child { border-left: 0; }
/* Superficie común: la retícula recorre toda la tira, también bajo las columnas en reposo */
.aur-col::before {
  content: ''; position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(240,250,255,.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240,250,255,.045) 1px, transparent 1px);
  background-size: 34px 34px;
}
.aur-col.-active { flex-grow: 2.5; }
.aur-col::after {
  content: ''; position: absolute; inset: 0; z-index: 4; pointer-events: none;
  box-shadow: inset 0 0 0 1.5px transparent; transition: box-shadow .4s ease;
}
.aur-col:focus-visible::after { box-shadow: inset 0 0 0 2px #B2FF00; }

/* Capa de arte: entra desde abajo y sale por arriba — un solo sentido */
.aur-media {
  position: absolute; inset: 0; z-index: 1;
  transform: translateY(101%); will-change: transform;
  transition: transform 900ms cubic-bezier(.76,0,.18,1);
}
.aur-media.-in  { transform: translateY(0); }
.aur-media.-out { transform: translateY(-101%); }

.aur-scene { position: absolute; inset: 0; overflow: hidden; background: var(--scene); }
/* Retícula tenue: el mismo motivo de plano técnico del home */
.aur-scene::before {
  content: ''; position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(240,250,255,.13) 1px, transparent 1px),
    linear-gradient(90deg, rgba(240,250,255,.13) 1px, transparent 1px);
  background-size: 34px 34px;
}
/* Velo para que el número, el título y la descripción lean sobre cualquier panel */
.aur-scene::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to bottom,
    rgba(16,16,16,.62) 0%, rgba(16,16,16,.14) 26%,
    rgba(16,16,16,.22) 58%, rgba(16,16,16,.82) 100%);
}

.aur-scene--1 { --scene:
  radial-gradient(120% 95% at 18% 8%,  rgba(100,184,232,.55) 0%, rgba(100,184,232,0) 55%),
  radial-gradient(95% 85% at 88% 18%,  rgba(77,191,240,.34) 0%,  rgba(77,191,240,0) 58%),
  radial-gradient(130% 120% at 72% 104%, rgba(23,58,80,.95) 0%,  rgba(23,58,80,0) 62%),
  linear-gradient(148deg, #1e3346 0%, #16242f 54%, #0f171d 100%); }
.aur-scene--2 { --scene:
  radial-gradient(120% 95% at 82% 10%, rgba(77,191,240,.48) 0%,  rgba(77,191,240,0) 55%),
  radial-gradient(100% 90% at 12% 26%, rgba(60,255,88,.26) 0%,   rgba(60,255,88,0) 58%),
  radial-gradient(130% 120% at 62% 106%, rgba(20,78,82,.92) 0%,  rgba(20,78,82,0) 62%),
  linear-gradient(158deg, #1a3540 0%, #132730 54%, #0d181c 100%); }
.aur-scene--3 { --scene:
  radial-gradient(118% 92% at 22% 12%, rgba(60,255,88,.40) 0%,   rgba(60,255,88,0) 55%),
  radial-gradient(105% 95% at 86% 24%, rgba(178,255,0,.26) 0%,   rgba(178,255,0,0) 58%),
  radial-gradient(130% 125% at 70% 104%, rgba(30,84,42,.92) 0%,  rgba(30,84,42,0) 62%),
  linear-gradient(153deg, #1d3524 0%, #15281b 54%, #0e1812 100%); }
.aur-scene--4 { --scene:
  radial-gradient(118% 92% at 76% 10%, rgba(178,255,0,.50) 0%,   rgba(178,255,0,0) 55%),
  radial-gradient(110% 100% at 14% 30%, rgba(178,255,0,.24) 0%,  rgba(178,255,0,0) 58%),
  radial-gradient(135% 130% at 60% 106%, rgba(72,94,18,.92) 0%,  rgba(72,94,18,0) 62%),
  linear-gradient(153deg, #26341a 0%, #1d2a12 54%, #131c0b 100%); }

/* Cromo de cada columna, siempre por encima del arte */
.aur-num {
  position: absolute; top: 26px; left: 24px; right: 16px; z-index: 3;
  font-family: 'Space Grotesk', sans-serif; font-weight: 300; line-height: 1;
  font-size: clamp(34px, 3.2vw, 52px); color: rgba(100,184,232,.42);
  transition: color .45s ease;
}
.aur-col.-active .aur-num { color: #B2FF00; }

.aur-name {
  position: absolute; left: 24px; right: 18px; bottom: 28px; z-index: 3; margin: 0;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700; text-transform: uppercase;
  font-size: clamp(12px, 1.05vw, 15px); letter-spacing: .02em; line-height: 1.2;
  color: rgba(255,255,255,.5); transition: color .45s ease;
}
.aur-col.-active .aur-name { color: #fff; }

/* Descripción flotante: viaja con el mismo movimiento ascendente */
.aur-heads {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 5;
  width: min(88%, 620px); height: clamp(130px, 32%, 190px);
  overflow: hidden; pointer-events: none; text-align: center;
}
.aur-head {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  transform: translateY(112%); opacity: 0;
  transition: transform 900ms cubic-bezier(.76,0,.18,1), opacity 630ms ease;
}
.aur-head.-in  { transform: translateY(0); opacity: 1; }
.aur-head.-out { transform: translateY(-112%); opacity: 0; }
.aur-head p {
  margin: 0; font-family: 'Red Hat Display', sans-serif; font-weight: 300;
  font-size: clamp(15px, 1.45vw, 20px); line-height: 1.55; color: rgba(255,255,255,.88);
  text-wrap: balance;
}
.aur-head .aur-rule { width: 38px; height: 1px; background: #B2FF00; opacity: .8; }

/* Acordeón vertical */
@media (max-width: 1023px) {
  .aur-colonnade { height: auto; }
  .aur-strip { position: relative; inset: auto; flex-direction: column; height: 460px; }
  .aur-col { border-left: 0; border-top: 1px dashed rgba(30,63,82,.7); min-height: 78px; }
  .aur-col:first-child { border-top: 0; }
  .aur-col.-active { flex-grow: 3.4; }
  .aur-num { top: 18px; left: 20px; font-size: 30px; }
  .aur-name { left: 20px; bottom: 18px; font-size: 13px; }
  .aur-heads {
    position: relative; left: auto; top: auto; transform: none;
    width: 100%; height: auto; text-align: left;
    padding: 28px 20px 30px; border-top: 1px dashed rgba(30,63,82,.7);
  }
  .aur-head { position: relative; inset: auto; align-items: flex-start; transform: none; opacity: 1; }
  .aur-head:not(.-in) { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .aur-col, .aur-media, .aur-head { transition-duration: .01ms; }
}
`;

const Proceso = () => {
  const { h2, intro, steps } = useNivel().proceso;
  const [titleStart, titleAccent] = splitAtComma(h2);

  const [active, setActive] = useState(0);
  const colRefs = useRef([]);
  const mediaRefs = useRef([]);
  const headRefs = useRef([]);
  const prevRef = useRef(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  /* Al terminar de salir por arriba, se devuelve abajo sin transición:
     así cada panel siempre vuelve a entrar en el mismo sentido */
  useEffect(() => {
    const layers = [...mediaRefs.current, ...headRefs.current].filter(Boolean);
    const onEnd = (e) => {
      const el = e.currentTarget;
      if (e.propertyName !== "transform" || !el.classList.contains("-out")) return;
      el.style.transition = "none";
      el.classList.remove("-out");
      void el.offsetWidth; // fuerza reflow
      el.style.transition = "";
    };
    layers.forEach((el) => el.addEventListener("transitionend", onEnd));
    return () => layers.forEach((el) => el.removeEventListener("transitionend", onEnd));
  }, [steps.length]);

  /* Relevo: sale el anterior, entra el nuevo */
  useEffect(() => {
    const enter = (el) => {
      if (!el) return;
      if (el.classList.contains("-out")) {
        el.style.transition = "none";
        el.classList.remove("-out");
        void el.offsetWidth;
        el.style.transition = "";
      }
      el.classList.add("-in");
    };
    const exit = (el) => {
      if (!el) return;
      el.classList.remove("-in");
      el.classList.add("-out");
    };

    const prev = prevRef.current;
    if (prev === active) return;
    if (prev != null) {
      exit(mediaRefs.current[prev]);
      exit(headRefs.current[prev]);
    }
    enter(mediaRefs.current[active]);
    enter(headRefs.current[active]);
    prevRef.current = active;
  }, [active]);

  const onKeyDown = useCallback(
    (e, i) => {
      const last = steps.length - 1;
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = i === 0 ? last : i - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      if (next === null) return;
      e.preventDefault();
      setActive(next);
      colRefs.current[next]?.focus();
    },
    [steps.length]
  );

  return (
    <div className={`border border-dashed ${BORDER} rounded-sm overflow-hidden`}>
      <style>{STYLES}</style>

      {/* Encabezado */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 border-b border-dashed ${BORDER}`}>
        <div
          className={`p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-dashed ${BORDER}`}
          data-aos="fade-right"
          data-aos-duration="700"
        >
          <h2 className="text-3xl lg:text-5xl leading-tight font-space-grotesk uppercase text-white">
            <span className="font-normal">{titleStart}</span>{" "}
            {titleAccent && <span className="italic font-bold font-mansfield">{titleAccent}</span>}
          </h2>
        </div>
        <div
          className="p-8 lg:p-12 flex flex-col justify-center"
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="80"
        >
          <p className="text-white/70 font-red-hat font-light text-sm leading-relaxed max-w-sm">
            {intro}
          </p>
        </div>
      </div>

      {/* Pasos — acordeón de columnas */}
      <div className="aur-colonnade" data-aos="fade-up" data-aos-duration="700">
        <div className="aur-strip" role="tablist" aria-label={h2}>
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => (colRefs.current[i] = el)}
              className={`aur-col${active === i ? " -active" : ""}`}
              role="tab"
              id={`proceso-tab-${step.number}`}
              aria-controls={`proceso-panel-${step.number}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onPointerEnter={canHover ? () => setActive(i) : undefined}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <div className="aur-media" ref={(el) => (mediaRefs.current[i] = el)}>
                <div className={`aur-scene ${SCENES[i % SCENES.length]}`} />
              </div>
              <span className="aur-num">{step.number}</span>
              <h3 className="aur-name">{step.title}</h3>
            </div>
          ))}
        </div>

        <div className="aur-heads">
          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => (headRefs.current[i] = el)}
              className="aur-head"
              role="tabpanel"
              id={`proceso-panel-${step.number}`}
              aria-labelledby={`proceso-tab-${step.number}`}
              aria-hidden={active !== i}
            >
              <span className="aur-rule" aria-hidden="true" />
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proceso;
