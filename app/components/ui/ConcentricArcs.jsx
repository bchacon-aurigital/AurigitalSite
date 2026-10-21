'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Abanico de arcos finos que se pellizcan en una cintura brillante (reloj de arena).
 * Implementación propia de Aurigital — misma API de props que Concentric Tides
 * para poder intercambiarlos sin tocar el hero.
 *
 * Geometría: cada línea i es la curva y = ±m_i · |x|^P, con m_i repartido de forma
 * pareja. Todas se aplanan hacia x = 0 (la cintura) y se abren hacia los bordes.
 */

const vertexShader = `
void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const fragmentShader = `
precision highp float;

uniform vec2  uResolution, uMouse;
uniform float uTime;
uniform vec3  uColorA, uColorB;
uniform int   uLineCount;
uniform float uThickness, uSpread, uGhost, uGlow, uIntensity;
uniform float uBreathe, uHueShift, uSurge, uHoverBoost, uHover;
uniform float uBurst, uBurstWave;

vec3 hueRotate(vec3 c, float a) {
  const vec3 k = vec3(0.57735);
  float ca = cos(a), sa = sin(a);
  return c * ca + cross(k, c) * sa + k * dot(k, c) * (1.0 - ca);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) * px;

  // El puntero desplaza la cintura
  p -= uMouse * 0.10 * (0.35 + uHover);

  float ax = abs(p.x);
  float ay = abs(p.y);

  // Exponente del abanico: >1 aplana la curva cerca del centro
  float P = 1.0 + uSpread;

  // Pendiente de la línea más externa: sale justo por la esquina
  float maxX = 0.5 * uResolution.x * px;
  float maxY = 0.5 * uResolution.y * px;
  float mMax = maxY / pow(max(maxX, 1e-4), P);

  // Constantes del píxel: fuera del bucle, no dependen de la línea
  float axp  = pow(max(ax, 1e-5), P);
  float axp1 = pow(max(ax, 1e-5), P - 1.0);

  // El clic abre el abanico y engrosa el trazo un instante
  float open = 1.0 + uHover * (uHoverBoost - 1.0) + uBurst * 0.20;
  float w = max(uThickness, 0.05) * px * 1.15 * (1.0 + uBurst * 0.45);

  vec3 col = vec3(0.0);
  float n = float(uLineCount);

  for (int i = 0; i < 32; i++) {
    if (i >= uLineCount) break;
    float fi = (float(i) + 1.0) / n;              // 0 → 1, de la más plana a la más abierta

    // Respiración: cada línea oscila apenas, desfasada
    float br = 1.0 + uBreathe * 0.14 * sin(uTime * 0.55 + fi * 4.2);

    float m  = fi * mMax * open * br;
    float yc = m * axp;                            // altura de la curva en esta x
    float sl = m * P * axp1;                       // pendiente local
    float d  = abs(ay - yc) / sqrt(1.0 + sl * sl); // distancia perpendicular aprox.

    float core = exp(-d / (w * 0.55));
    float halo = exp(-d / (w * 2.6 * max(uGlow, 0.05)));
    float line = core + halo * 0.42;

    // Ghost: las líneas más abiertas se atenúan, pero sin perder el cian
    float g = pow(max(1.0 - fi * 0.55, 0.0), uGhost * 0.45);

    // Surge: una onda de brillo que viaja hacia afuera
    float s = 1.0 + uSurge * 0.1 * sin(uTime * 1.5 - ax * 6.5 + fi * 3.0);

    vec3 lc = hueRotate(mix(uColorA, uColorB, fi), radians(uHueShift) * fi);

    // Clic: una cresta de brillo que viaja desde la cintura hacia los bordes
    float wv = 1.0 + uBurst * 1.7 * exp(-pow((ax - uBurstWave) * 7.0, 2.0));

    col += lc * line * g * s * wv;
  }

  // Cintura: casi todo el blanco sale de las líneas superponiéndose en x≈0.
  // Esto solo remata el núcleo; mantenerlo angosto es lo que da el filamento.
  float waist = exp(-ax * ax * 58.0) * exp(-ay * ay * 5200.0);
  float halo  = exp(-ax * ax * 15.0) * exp(-ay * ay * 420.0);
  col += vec3(1.0) * waist * uGlow * (0.50 + uBurst * 0.75);
  col += mix(uColorB, vec3(1.0), 0.6) * halo * uGlow * (0.11 + uBurst * 0.22);

  col *= uIntensity * (1.0 + uBurst * 0.55);

  float a = max(col.r, max(col.g, col.b));
  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
}
`;

export default function ConcentricArcs({
  colors = ['#64c2ef', '#c8f3ff'],
  lineCount = 13,
  thickness = 1.05,
  spread = 0.72,
  ghost = 1.55,
  glow = 1.6,
  intensity = 1.35,
  breathe = 0.5,
  hueShift = 17,
  surge = 3,
  hoverBoost = 1.6,
  followMouse = true,
  clickPulse = true,
}) {
  const mountRef = useRef(null);
  const propsRef = useRef(null);
  const mouseRef = useRef([0, 0]);
  const smoothMouseRef = useRef([0, 0]);
  const hoverRef = useRef(0);
  const isHoveredRef = useRef(false);
  const burstAtRef = useRef(-1);

  propsRef.current = {
    colors, lineCount, thickness, spread, ghost, glow,
    intensity, breathe, hueShift, surge, hoverBoost, followMouse, clickPulse,
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    } catch {
      return;
    }
    if (!renderer.capabilities.isWebGL2) {
      renderer.dispose();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
    camera.position.z = 1;

    const uniforms = {
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2() },
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uLineCount: { value: 13 },
      uThickness: { value: 1 },
      uSpread: { value: 0.72 },
      uGhost: { value: 1.55 },
      uGlow: { value: 1.6 },
      uIntensity: { value: 1.35 },
      uBreathe: { value: 0.5 },
      uHueShift: { value: 17 },
      uSurge: { value: 3 },
      uHoverBoost: { value: 1.6 },
      uHover: { value: 0 },
      uBurst: { value: 0 },
      uBurstWave: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, transparent: true });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
    scene.add(quad);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    };
    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseRef.current[0] = (e.clientX - rect.left) / rect.width - 0.5;
      mouseRef.current[1] = -((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onEnter = () => { isHoveredRef.current = true; };
    const onLeave = () => {
      isHoveredRef.current = false;
      mouseRef.current[0] = 0;
      mouseRef.current[1] = 0;
    };
    mount.addEventListener('mousemove', onMouseMove);
    mount.addEventListener('mouseenter', onEnter);
    mount.addEventListener('mouseleave', onLeave);

    /* Latido al clic. Con mouse dispara al apretar; al tacto espera a soltar
       y solo si fue un toque, para no destellar en cada scroll. */
    const fire = () => { burstAtRef.current = performance.now(); };
    let touchStart = null;
    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse') fire();
      else touchStart = { t: performance.now(), x: e.clientX, y: e.clientY };
    };
    const onPointerUp = (e) => {
      if (e.pointerType === 'mouse' || !touchStart) return;
      const moved = Math.hypot(e.clientX - touchStart.x, e.clientY - touchStart.y);
      if (moved < 12 && performance.now() - touchStart.t < 500) fire();
      touchStart = null;
    };
    const onPointerCancel = () => { touchStart = null; };
    mount.addEventListener('pointerdown', onPointerDown);
    mount.addEventListener('pointerup', onPointerUp);
    mount.addEventListener('pointercancel', onPointerCancel);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const BURST_LIFE = 1.35; // segundos

    let frameId;
    const animate = (t) => {
      frameId = requestAnimationFrame(animate);
      const p = propsRef.current;

      smoothMouseRef.current[0] += (mouseRef.current[0] - smoothMouseRef.current[0]) * 0.07;
      smoothMouseRef.current[1] += (mouseRef.current[1] - smoothMouseRef.current[1]) * 0.07;
      hoverRef.current += ((isHoveredRef.current ? 1 : 0) - hoverRef.current) * 0.06;

      /* Envolvente del latido: ataque inmediato, decaimiento con rebote */
      let burst = 0;
      let wave = 0;
      if (p.clickPulse && !reduced && burstAtRef.current >= 0) {
        const age = (t - burstAtRef.current) / 1000;
        if (age >= 0 && age < BURST_LIFE) {
          const attack = Math.min(age / 0.06, 1);
          const decay = Math.exp(-age * 2.7);
          const throb = 1 + 0.3 * Math.sin(age * 15.5);
          burst = Math.max(0, attack * decay * throb);
          wave = age * 0.95; // la cresta viaja hacia el borde
        } else {
          burstAtRef.current = -1;
        }
      }

      uniforms.uTime.value = reduced ? 0 : t * 0.001;
      uniforms.uColorA.value.set(p.colors?.[0] || '#64c2ef');
      uniforms.uColorB.value.set(p.colors?.[1] || '#c8f3ff');
      uniforms.uLineCount.value = Math.max(1, Math.min(32, p.lineCount));
      uniforms.uThickness.value = p.thickness;
      uniforms.uSpread.value = p.spread;
      uniforms.uGhost.value = p.ghost;
      uniforms.uGlow.value = p.glow;
      uniforms.uIntensity.value = p.intensity;
      uniforms.uBreathe.value = reduced ? 0 : p.breathe;
      uniforms.uHueShift.value = p.hueShift;
      uniforms.uSurge.value = reduced ? 0 : p.surge;
      uniforms.uHoverBoost.value = p.hoverBoost;
      uniforms.uHover.value = hoverRef.current;
      uniforms.uBurst.value = burst;
      uniforms.uBurstWave.value = wave;
      uniforms.uMouse.value.set(
        p.followMouse ? smoothMouseRef.current[0] : 0,
        p.followMouse ? smoothMouseRef.current[1] : 0
      );

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      ro.disconnect();
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('mouseenter', onEnter);
      mount.removeEventListener('mouseleave', onLeave);
      mount.removeEventListener('pointerdown', onPointerDown);
      mount.removeEventListener('pointerup', onPointerUp);
      mount.removeEventListener('pointercancel', onPointerCancel);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      quad.geometry.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
