"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroNivel from "./HeroNivel";

/* Solo el lienzo se monta en cliente. El h1, la descripción, el precio y los
   CTA salen en el HTML estático desde HeroNivel. */
const WebThreads = dynamic(() => import("../ui/WebThreads"), { ssr: false });

const VELO =
  "radial-gradient(70% 58% at 50% 50%, rgba(16,16,16,0.88) 0%, rgba(16,16,16,0.64) 42%, rgba(16,16,16,0.24) 68%, rgba(16,16,16,0) 86%)";

/* Respaldo del tejido para equipos sin WebGL2 o de poca potencia: dos focos en
   los colores de los hilos, sin animación ni lienzo. */
const FONDO_ESTATICO =
  "radial-gradient(58% 44% at 24% 32%, rgba(0,235,82,0.16) 0%, rgba(0,235,82,0) 62%)," +
  "radial-gradient(62% 48% at 78% 66%, rgba(10,192,244,0.18) 0%, rgba(10,192,244,0) 64%)," +
  "#101010";

export default function HeroSistemaWeb({ onPrimaryClick }) {
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
          <WebThreads
            colors={["#00eb52", "#0ac0f4"]}
            coreColor="#FFFFFF"
            threadCount={12}
            spread={0.33}
            lightMode={false}
            speed={0.2}
            frequency={5}
            taper={1}
            position={0.5}
            pinch={0.5}
            nodes={1}
            angle={0}
            glow={0.021}
            falloff={0.6}
            thickness={1.1}
            brightness={0.6}
            opacity={1}
            depth={0}
            pulses={0}
            mirror
            shimmer
            fade={0}
            grain={0.05}
            intro
            mouseInteraction
            mouseStrength={0.5}
            pulseOnClick
            surgeStrength={3.4}
            surgeBothWays
            paused={false}
          />
        ) : null
      }
    />
  );
}
