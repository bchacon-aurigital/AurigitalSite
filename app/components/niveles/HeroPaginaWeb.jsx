"use client";
import dynamic from "next/dynamic";
import HeroNivel from "./HeroNivel";

/* Solo el lienzo se monta en cliente. El h1, la descripción, el precio y los
   CTA salen en el HTML estático desde HeroNivel. */
const ConcentricArcs = dynamic(() => import("../ui/ConcentricArcs"), { ssr: false });

const VELO =
  "radial-gradient(68% 56% at 50% 50%, rgba(16,16,16,0.90) 0%, rgba(16,16,16,0.68) 40%, rgba(16,16,16,0.26) 66%, rgba(16,16,16,0) 84%)";

export default function HeroPaginaWeb({ onPrimaryClick }) {
  return (
    <HeroNivel
      hint
      velo={VELO}
      onPrimaryClick={onPrimaryClick}
      /* Sin el rotate-90 del home: acá el reloj de arena se lee horizontal en todos los tamaños */
      fondo={
        <ConcentricArcs
          colors={["#64c2ef", "#c8f3ff"]}
          lineCount={13}
          thickness={1.05}
          spread={0.72}
          ghost={1.55}
          glow={1.6}
          intensity={1.35}
          breathe={0.5}
          hueShift={17}
          surge={3}
          hoverBoost={1.6}
        />
      }
    />
  );
}
