"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from "../../context/ContactModalContext";
import CotizacionButton from "../ui/CotizacionButton";

/* ── Single video card ───────────────────────────────────────────── */
const VideoCard = ({ card }) => {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const tryPlay = useCallback(async (muted = false) => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    try {
      await v.play();
      setPlaying(true);
    } catch {
      if (!muted) {
        v.muted = true;
        try { await v.play(); setPlaying(true); } catch {}
      }
    }
  }, []);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.muted = true;
    setPlaying(false);
  }, []);

  /* Desktop: hover */
  const onEnter = () => { if (!isMobile) tryPlay(false); };
  const onLeave = () => { if (!isMobile) pause(); };

  /* Mobile: viewport */
  useEffect(() => {
    if (!isMobile) return;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay(true);
        else pause();
      },
      { threshold: 0.6 }
    );
    const el = cardRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, tryPlay, pause]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={videoRef}
        src={`/assets/${card.video}`}
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: playing ? "grayscale(0)" : "grayscale(1)",
          transition: "filter 0.6s ease",
        }}
      />

      {/* Bottom text overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
        <p className="text-white/70 font-red-hat font-light text-xs mb-1">{card.project}</p>
        <p className="text-white font-space-grotesk font-bold uppercase text-sm tracking-wide">
          {card.client}
        </p>
      </div>
    </div>
  );
};

/* ── Main section ────────────────────────────────────────────────── */
const Testimonios = () => {
  const { translations } = useLanguage();
  const { openModal } = useContactModal();
  const data = translations.testimoniosHome;
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const sectionRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    setCursor({ x: e.clientX, y: e.clientY, visible: true });
  }, []);
  const onMouseLeave = useCallback(() => setCursor(c => ({ ...c, visible: false })), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          data.messages.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), i * 400);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const el = containerRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [data.messages, hasTriggered]);

  return (
    <div
      ref={sectionRef}
      className="relative z-10 w-full bg-[#EBEBEB]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        cursor: 'none',
        backgroundImage: `
          linear-gradient(rgba(100,180,220,0.18) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100,180,220,0.18) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        backgroundPosition: '-1px -1px'
      }}
    >
      {/* Crosshair cursor — fixed, extends to screen edges */}
      {cursor.visible && (
        <>
          {/* Horizontal line — left segment */}
          <div aria-hidden="true" style={{ position: 'fixed', top: cursor.y, left: 0, width: cursor.x - 14, height: 1, background: 'rgba(100,180,220,0.55)', pointerEvents: 'none', zIndex: 9999 }} />
          {/* Horizontal line — right segment */}
          <div aria-hidden="true" style={{ position: 'fixed', top: cursor.y, left: cursor.x + 14, right: 0, height: 1, background: 'rgba(100,180,220,0.55)', pointerEvents: 'none', zIndex: 9999 }} />
          {/* Vertical line — top segment */}
          <div aria-hidden="true" style={{ position: 'fixed', left: cursor.x, top: 0, width: 1, height: cursor.y - 14, background: 'rgba(100,180,220,0.55)', pointerEvents: 'none', zIndex: 9999 }} />
          {/* Vertical line — bottom segment */}
          <div aria-hidden="true" style={{ position: 'fixed', left: cursor.x, top: cursor.y + 14, width: 1, bottom: 0, background: 'rgba(100,180,220,0.55)', pointerEvents: 'none', zIndex: 9999 }} />
          {/* Center circle */}
          <div aria-hidden="true" style={{ position: 'fixed', left: cursor.x, top: cursor.y, transform: 'translate(-50%,-50%)', width: 20, height: 20, border: '1.5px solid rgba(100,180,220,0.85)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999 }} />
          {/* Center dot */}
          <div aria-hidden="true" style={{ position: 'fixed', left: cursor.x, top: cursor.y, transform: 'translate(-50%,-50%)', width: 4, height: 4, background: 'rgba(100,180,220,1)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999 }} />
        </>
      )}

      {/* ── Video testimonials ───────────────────────── */}
      <div className="px-4 md:px-8 lg:px-16 pt-20 md:pt-32 pb-4">

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-5xl font-space-grotesk font-normal text-[#1a1a1a]/90 leading-tight">
            {data.videoTitle.part1}<br />{data.videoTitle.part2}
          </h2>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <CotizacionButton onClick={openModal}>{data.videoCta1}</CotizacionButton>
            <CotizacionButton href="/proyectos" variant="white">{data.videoCta2}</CotizacionButton>
          </div>
        </div>

        {/* Video grid — carousel on mobile, 3-col on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
          {data.videoCards.map((card, i) => (
            <div key={i} className="flex-shrink-0 w-[82%] md:w-auto snap-center">
              <VideoCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat bubbles ─────────────────────────────── */}
      <div className="pt-8 pb-16 md:pt-10 md:pb-24 px-4 md:px-8 lg:px-16">

        {/* Header */}
        <div className="text-center py-10 md:py-16 px-4 mb-6">
          <p className="font-space-grotesk font-light text-xs tracking-widest uppercase text-[#555] mb-5">
            {data.label}
          </p>
          <h2 className="text-3xl md:text-5xl font-space-grotesk font-normal uppercase text-[#1a1a1a]/90 leading-tight">
            {data.title.part1}<br />{data.title.part2}
          </h2>
        </div>

        {/* Bubbles */}
        <div ref={containerRef} className="space-y-4 max-w-3xl mx-auto">
          {data.messages.map((msg, i) => {
            const isLeft = msg.side === "left";
            const visible = i < visibleCount;
            return (
              <div
                key={i}
                className={`flex ${isLeft ? "justify-start" : "justify-end"}`}
                style={{
                  transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateX(0)"
                    : isLeft ? "translateX(-28px)" : "translateX(28px)",
                }}
              >
                <div
                  className={`max-w-[75%] px-5 py-4 text-base font-red-hat font-light leading-relaxed shadow-sm ${
                    isLeft
                      ? "bg-[#5BB8F5] text-white rounded-2xl rounded-tl-[6px]"
                      : "bg-white text-[#1a1a1a] rounded-2xl rounded-tr-[6px]"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Instagram feed ───────────────────────────── */}
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
      <div
        style={{ cursor: 'auto' }}
        onMouseEnter={() => setCursor(c => ({ ...c, visible: false }))}
        onMouseMove={e => e.stopPropagation()}
      >
        <div
          className="elfsight-app-055ec6fe-baed-40a4-96ea-7711e07b758a"
          data-elfsight-app-lazy
        />
      </div>
    </div>
  );
};

export default Testimonios;
