"use client";

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, RefreshCw, Pencil, Archive, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavbarServicios from '@/app/components/ServiciosPages/NavbarServicios';
import HeroPPM from '@/app/components/ppm/HeroPPM';
import CardsCarrusel from '@/app/components/ServiciosPages/CardsCarrusel';
import CasosExito from '@/app/components/ServiciosPages/CasosExito';
import FAQServicios from '@/app/components/ServiciosPages/FAQServicios';
import Footer from '@/app/components/Footer';
import { useLanguage } from '@/app/context/LanguageContext';

const CARD_ICONS = [ArrowUpRight, Check, RefreshCw, Pencil, Archive];
const VIDEOS = [
  '/assets/servicios/servicios-pages/marca-personal.webm',
  '/assets/servicios/servicios-pages/pyme.webm',
  '/assets/servicios/servicios-pages/empresa.webm',
  '/assets/servicios/servicios-pages/eventos.webm',
];
const WA_HREF = 'https://wa.me/50688888169?text=Hola!%20Me%20gustar%C3%ADa%20consultar%20sobre%20el%20Plan%20Paz%20Mental';

const PPM = () => {
  const { translations } = useLanguage();
  const t = translations.ppm;
  const shared = translations.serviciosShared;

  // Logo carousel
  const logoX = useMotionValue(0);
  const marqueeRef = useRef(null);
  const animRef = useRef(null);
  const halfWRef = useRef(0);
  const runRef = useRef(null);

  // Includes cards carousel
  const includesX = useMotionValue(0);
  const includesContainerRef = useRef(null);
  const includesTrackRef = useRef(null);
  const [includesDragLeft, setIncludesDragLeft] = useState(-1);
  const [activeFeature, setActiveFeature] = useState(0);

  const progressScale = useTransform(includesX, (x) => {
    if (includesDragLeft >= 0) return 0;
    return Math.min(1, Math.max(0, x / includesDragLeft));
  });
  const rightFadeOpacity = useTransform(includesX, (x) => {
    if (includesDragLeft >= 0) return 0;
    return Math.max(0, 1 - (x / includesDragLeft) * 1.8);
  });

  const handleIncludesDragEnd = (_, info) => {
    const track = includesTrackRef.current;
    if (!track || includesDragLeft >= 0) return;
    const cards = track.children;
    const step = cards.length > 1
      ? cards[1].offsetLeft - cards[0].offsetLeft
      : (cards[0]?.offsetWidth ?? 0) + 16;
    if (step <= 0) return;
    const cur = includesX.get();
    const vel = info.velocity.x;
    let idx = Math.round(-cur / step);
    if (vel < -300) idx = Math.floor(-cur / step) + 1;
    else if (vel > 300) idx = Math.ceil(-cur / step) - 1;
    const maxIdx = Math.round(-includesDragLeft / step);
    idx = Math.max(0, Math.min(idx, maxIdx));
    animate(includesX, -idx * step, { type: 'spring', stiffness: 380, damping: 38 });
  };

  useEffect(() => {
    AOS.init({ once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const container = includesContainerRef.current;
    const track = includesTrackRef.current;
    if (!container || !track) return;
    const update = () => {
      const overflow = track.scrollWidth - container.offsetWidth;
      setIncludesDragLeft(overflow > 0 ? -overflow : 0);
    };
    const id = setTimeout(update, 350);
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => { clearTimeout(id); ro.disconnect(); };
  }, []);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    halfWRef.current = el.scrollWidth / 2;
    const run = (from) => {
      animRef.current?.stop();
      const hw = halfWRef.current;
      const dist = hw + from;
      if (dist <= 0) { logoX.set(0); run(0); return; }
      animRef.current = animate(logoX, from - dist, {
        duration: (dist / hw) * 60,
        ease: 'linear',
        onComplete: () => { logoX.set(0); run(0); },
      });
    };
    runRef.current = run;
    const id = setTimeout(() => run(0), 100);
    return () => { clearTimeout(id); animRef.current?.stop(); };
  }, [logoX]);

  const features = t?.loQueCambia?.features ?? [];
  const prev = () => setActiveFeature(i => (i - 1 + features.length) % features.length);
  const next = () => setActiveFeature(i => (i + 1) % features.length);

  return (
    <main className="bg-[#E9E9E9] overflow-x-hidden">
      <NavbarServicios />

      <HeroPPM
        title={<>{t?.hero?.titlePart1} <br />{t?.hero?.titlePart2} <br />{t?.hero?.titlePart3}</>}
        description={t?.hero?.description}
        features={t?.hero?.features}
        imageSrc="/assets/ppm/ppm-hero.avif"
        overlayTitle={t?.hero?.overlayTitle}
        overlaySubtitle={t?.hero?.overlaySubtitle}
        overlaySubtitle2={t?.hero?.overlaySubtitle2}
        ctaWhatsapp={t?.hero?.ctaWhatsapp}
        ctaPaquetes={t?.hero?.ctaPaquetes}
      />

      <CardsCarrusel
        cardImageHeight={{ sm: 220, md: 260 }}
        subtitle={t?.cards?.subtitle}
        title={<>{t?.cards?.titlePart1}<span className="text-[#B2FF00]">{t?.cards?.titlePart2}</span></>}
        description={<>{t?.cards?.descriptionPart1} <br className="hidden lg:block" /> {t?.cards?.descriptionPart2}</>}
        cards={(t?.cards?.items ?? []).map((item, i) => ({
          svg: [
            '/assets/servicios/servicios-pages/PPM/Vector1.svg',
            '/assets/servicios/servicios-pages/DesarrolloWeb/Vector3.svg',
            '/assets/servicios/servicios-pages/PPM/Vector3.svg',
          ][i],
          imageInset: { x: 10, y: 30 },
          imageAlign: i === 2 ? 'top' : undefined,
          number: item.number,
          title: item.title,
          description: item.description,
          particleEffect: true,
        }))}
      />

      {/* Logo carousel */}
      <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-16 lg:py-24">
        <h2
          data-aos="fade-up"
          className="font-space-grotesk font-medium text-[#252525] text-xl md:text-2xl lg:text-3xl tracking-[-0.04em] leading-[1.1] text-center mb-12 lg:mb-16"
        >
          {t?.logos?.title}
        </h2>
        <div data-aos="fade-up" data-aos-delay="100" className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
          <motion.div
            ref={marqueeRef}
            style={{ x: logoX }}
            drag="x"
            dragMomentum={false}
            onDragStart={() => animRef.current?.stop()}
            onDragEnd={() => {
              let cur = logoX.get();
              const hw = halfWRef.current;
              if (hw > 0) cur = ((cur % hw) + hw) % hw - hw;
              logoX.set(cur);
              runRef.current?.(cur);
            }}
            className="flex w-max"
          >
            {[...Array(2)].map((_, copy) => (
              <div key={copy} className="flex items-center gap-12 md:gap-16 px-6">
                {['abrahamstudio','amplify','backline','columbia','estereo','fd','grupoc','mauro','pranayama','radio2','servidental','slick','thebohemian','tulsi'].map((name) => (
                  <img
                    key={name}
                    src={`/assets/ppm/${name}.svg`}
                    alt={name}
                    draggable={false}
                    className="h-12 md:h-14 w-auto max-w-[120px] md:max-w-[140px] shrink-0"
                  />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pedí Cambios */}
      <section className="bg-[#1a1a1a] px-6 md:px-10 lg:px-14 py-20 lg:py-28 flex flex-col items-center text-center">
        <p data-aos="fade-up" className="font-space-grotesk text-white/40 text-xs tracking-[0.18em] uppercase mb-4">
          {t?.cambios?.label}
        </p>
        <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-[-0.02em] leading-[1.0] mb-5">
          {t?.cambios?.titlePart1}<br />
          {t?.cambios?.titlePart2} <span className="text-[#B2FF00]">{t?.cambios?.titleHighlight}</span>
        </h2>
        <p data-aos="fade-up" data-aos-delay="100" className="font-red-hat text-white/50 text-sm md:text-base leading-[1.6] max-w-[480px] mb-12">
          {t?.cambios?.description1}
        </p>
        <div data-aos="fade-up" data-aos-delay="150" className="w-full max-w-[900px] rounded-2xl overflow-hidden">
          <img src="/assets/ppm/cambios.avif" alt="" draggable={false} className="w-full h-auto object-cover" />
        </div>
        <p data-aos="fade-up" className="font-red-hat text-white/50 text-sm md:text-base leading-[1.6] max-w-[480px] mt-12 mb-8">
          {t?.cambios?.description2}
        </p>
        <div data-aos="fade-up">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[#B2FF00] text-[#B2FF00] hover:bg-[#B2FF00] hover:text-[#1a1a1a] font-space-grotesk font-medium text-sm px-8 py-3 rounded-full transition-colors duration-200"
          >
            {t?.cambios?.cta}
          </a>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-[#1e1e1e] px-6 md:px-10 lg:px-14 py-20 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-14">
          <div>
            <p data-aos="fade-up" className="font-space-grotesk text-white/35 text-xs tracking-[0.15em] uppercase mb-5">
              {t?.incluye?.label}
            </p>
            <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-white uppercase text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] tracking-[-0.02em] leading-[1.05]">
              {t?.incluye?.titlePart1}<br />
              <span className="italic">{t?.incluye?.titleItalic}</span> {t?.incluye?.titlePart3}
            </h2>
          </div>
          <p data-aos="fade-up" data-aos-delay="100" className="font-red-hat text-white/35 text-sm leading-[1.65] max-w-[340px] lg:text-right shrink-0">
            {t?.incluye?.disclaimer}
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="150" className="relative">
          <div ref={includesContainerRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
            <motion.div
              ref={includesTrackRef}
              style={{ x: includesX }}
              drag={includesDragLeft < 0 ? 'x' : false}
              dragMomentum={false}
              dragConstraints={{ left: includesDragLeft, right: 0 }}
              dragElastic={0.08}
              onDragEnd={handleIncludesDragEnd}
              className="flex gap-3 md:gap-4"
            >
              {(t?.incluye?.cards ?? []).map(({ title, desc }, i) => {
                const Icon = CARD_ICONS[i];
                return (
                  <div
                    key={title}
                    className="flex flex-col justify-between bg-[#2a2a2a] border border-white/[0.07] rounded-2xl p-6 md:p-7
                               w-[78vw] sm:w-[52vw] md:w-[38vw] lg:w-[calc((100vw-9rem)/3)] h-72 md:h-80 shrink-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-space-grotesk font-medium text-white uppercase text-xl md:text-2xl tracking-[-0.01em] leading-[1.1] whitespace-pre-line">
                        {title}
                      </h3>
                      <div className="bg-white/90 rounded-xl p-2 shrink-0">
                        {Icon && <Icon size={20} className="text-[#1e1e1e]" strokeWidth={1.5} />}
                      </div>
                    </div>
                    <p className="font-red-hat text-white/45 text-sm leading-[1.6]">{desc}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
          <motion.div
            style={{ opacity: rightFadeOpacity }}
            className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1e1e1e] to-transparent"
          />
        </div>
        <div className="mt-6 h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white/40 rounded-full origin-left" style={{ scaleX: progressScale }} />
        </div>
      </section>

      {/* ¿Para quién es? */}
      <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="lg:w-[38%] shrink-0 mb-14 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p data-aos="fade-up" className="font-space-grotesk text-[#252525]/40 text-xs tracking-[0.15em] uppercase mb-5">
                {t?.paraQuien?.label}
              </p>
              <h2 data-aos="fade-up" data-aos-delay="50" className="font-space-grotesk font-medium text-[#252525] uppercase text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] mb-8">
                {t?.paraQuien?.title}
              </h2>
              <p data-aos="fade-up" data-aos-delay="100" className="font-red-hat text-[#252525]/55 text-sm md:text-base leading-[1.65]">
                {t?.paraQuien?.description}
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col divide-y divide-[#252525]/10">
            {(t?.paraQuien?.items ?? []).map(({ badge, title, desc }, i) => (
              <div key={title} data-aos="fade-up" data-aos-delay={i * 60} className="flex items-start gap-5 py-8">
                <div className="shrink-0 w-10 h-10 border border-[#252525]/20 rounded-lg flex items-center justify-center text-[#252525]/50">
                  {badge === 'alert'
                    ? <AlertTriangle size={16} strokeWidth={1.5} />
                    : <span className="font-space-grotesk text-xs font-medium">{badge}</span>
                  }
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <h3 className="font-space-grotesk font-medium text-[#252525] uppercase text-base md:text-lg tracking-[-0.01em] leading-[1.1]">
                    {title}
                  </h3>
                  <p className="font-red-hat text-[#252525]/55 text-sm md:text-base leading-[1.6]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que cambia */}
      <section className="bg-[#e9e9e9] px-6 md:px-10 lg:px-14 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 lg:mb-10">
          <h2 data-aos="fade-up" className="font-space-grotesk font-medium text-[#252525] uppercase text-3xl md:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] max-w-[680px]">
            {t?.loQueCambia?.title}
          </h2>
          <div data-aos="fade-up" data-aos-delay="80" className="shrink-0">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-space-grotesk font-medium text-sm px-6 py-3 rounded-[12px] bg-[#252525] text-white hover:bg-[#101010] transition-colors duration-200"
            >
              {t?.loQueCambia?.cta}
            </a>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <div className="lg:w-[30%] flex flex-col gap-2">
            {features.map((f, i) => (
              <button
                key={f.title}
                onClick={() => setActiveFeature(i)}
                className={`flex flex-col justify-between text-left rounded-2xl p-5 md:p-6 transition-colors duration-200 cursor-pointer
                  ${activeFeature === i ? 'bg-[#1a1a1a] ring-1 ring-white/10' : 'bg-[#252525] hover:bg-[#202020]'}`}
              >
                <h3 className="font-space-grotesk font-medium text-white text-base md:text-lg leading-[1.2] mb-6">{f.title}</h3>
                <p className="font-red-hat text-white/45 text-sm leading-[1.55]">{f.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex-1 relative rounded-2xl overflow-hidden bg-[#d0d0d0] min-h-[280px] lg:min-h-0">
            <AnimatePresence mode="sync">
              <motion.video
                key={activeFeature}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                autoPlay muted loop playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={VIDEOS[activeFeature % VIDEOS.length]} type="video/webm" />
              </motion.video>
            </AnimatePresence>
            <div className="absolute bottom-4 right-4 flex gap-2 z-10">
              <button onClick={prev} className="w-10 h-10 bg-[#252525]/80 hover:bg-[#252525] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200">
                <ArrowLeft size={16} />
              </button>
              <button onClick={next} className="w-10 h-10 bg-[#252525]/80 hover:bg-[#252525] backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors duration-200">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <CasosExito
        subtitle={shared?.casosExito?.subtitle}
        title={<>{shared?.casosExito?.titlePart1} <br className="hidden lg:block" /> {shared?.casosExito?.titlePart2}</>}
        description={shared?.casosExito?.description}
        cases={shared?.casosExito?.cases}
      />

      <FAQServicios
        layout="split"
        title={t?.faq?.title}
        faqs={t?.faq?.faqs ?? []}
      />

      <Footer />
    </main>
  );
};

export default PPM;
