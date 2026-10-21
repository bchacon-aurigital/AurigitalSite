"use client";
import dynamic from "next/dynamic";

/* Los mismos lienzos que usan los heros, cargados solo en cliente */
const ConcentricArcs = dynamic(() => import("./ConcentricArcs"), { ssr: false });
const WebThreads = dynamic(() => import("./WebThreads"), { ssr: false });
const MagicRings = dynamic(() => import("./MagicRings"), { ssr: false });
const Threads = dynamic(() => import("./Threads"), { ssr: false });

/**
 * El fondo del hero de cada servicio, en versión decorativa: sin seguir el
 * puntero, sin pulso al clic y sin capturar eventos. Va dentro de una capa
 * `pointer-events-none`, así que la tarjeta que lo lleva detrás sigue siendo
 * un enlace y nada más.
 */
export default function FondoServicio({ servicio }) {
  switch (servicio) {
    case "pagina-web":
      return (
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
          followMouse={false}
          clickPulse={false}
        />
      );

    case "sistema-web":
      return (
        <WebThreads
          colors={["#00eb52", "#0ac0f4"]}
          coreColor="#FFFFFF"
          threadCount={12}
          spread={0.33}
          speed={0.2}
          frequency={5}
          taper={1}
          glow={0.021}
          thickness={1.1}
          brightness={0.6}
          grain={0.05}
          mirror
          shimmer
          intro={false}
          mouseInteraction={false}
          pulseOnClick={false}
        />
      );

    case "ecosistema-web":
      return (
        <Threads
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
          fade={0.05}
          opacity={0.8}
          seed={9}
          enableMouseInteraction={false}
          pulseOnClick={false}
        />
      );

    /* Paz Mental toma el lienzo del hero del home: es el plan que acompaña
       a todos los niveles, no uno más de la escalera. */
    case "plan-paz-mental":
      return (
        <MagicRings
          color="#4dbff0"
          colorTwo="#3cff58"
          ringCount={8}
          lineThickness={3.5}
          noiseAmount={0.44}
          fadeIn={0.75}
          fadeOut={1.75}
          baseRadius={0.21}
          radiusStep={0.12}
          ringGap={1.2}
          speed={0.8}
          scaleRate={0.07}
          attenuation={18.5}
          parallax={0.08}
          hoverScale={1.25}
          followMouse={false}
          clickBurst={false}
        />
      );

    default:
      return null;
  }
}
