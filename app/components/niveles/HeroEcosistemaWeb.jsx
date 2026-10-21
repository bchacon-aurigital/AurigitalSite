"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroNivel from "./HeroNivel";

/* Solo el lienzo se monta en cliente. El h1, la descripción, el precio y los
   CTA salen en el HTML estático desde HeroNivel. */
const Threads = dynamic(() => import("../ui/Threads"), { ssr: false });

const VELO =
  "radial-gradient(70% 58% at 50% 50%, rgba(16,16,16,0.88) 0%, rgba(16,16,16,0.62) 42%, rgba(16,16,16,0.22) 68%, rgba(16,16,16,0) 86%)";

/* Respaldo del tejido para equipos sin WebGL2 o de poca potencia: el verde y
   el celeste del nivel, sin animación ni lienzo. */
const FONDO_ESTATICO =
  "radial-gradient(54% 42% at 26% 38%, rgba(0,235,25,0.14) 0%, rgba(0,235,25,0) 62%)," +
  "radial-gradient(58% 46% at 74% 62%, rgba(10,192,244,0.16) 0%, rgba(10,192,244,0) 64%)," +
  "#101010";

export default function HeroEcosistemaWeb({ onPrimaryClick }) {
  const [conLienzo, setConLienzo] = useState(false);

  /* En móviles de gama baja el tejido se cobra el primer render: ahí se queda
     solo el respaldo estático. */
  useEffect(() => {
    const esTactil = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const nucleos = navigator.hardwareConcurrency || 8;
    setConLienzo(!(esTactil && nucleos <= 4));
  }, []);

  return (
    <HeroNivel
      hint
      velo={VELO}
      fondoEstatico={FONDO_ESTATICO}
      onPrimaryClick={onPrimaryClick}
      fondo={
        conLienzo ? (
          <Threads
            /* Verde de marca a celeste, el degradé que recorre los hilos */
            color="#00eb19"
            accentColor="#0ac0f4"
            coreColor="#FFFFFF"
            lineCount={52}
            thickness={1.6}
            softness={1.3}
            amplitude={2.7}
            distance={0.2}
            waves={0.8}
            speed={0.9}
            split={0.06}
            fray={0.4}
            angle={3}
            taper={0.45}
            brightness={1.95}
            parting={0.2}
            enableMouseInteraction
            fade={0.05}
            opacity={0.8}
            seed={9}
            /* Mismo gesto que el hero de sistema web, pero más contenido:
               el hilo se enciende sin perder su color. */
            pulseOnClick
            surgeStrength={1.5}
          />
        ) : null
      }
    />
  );
}
