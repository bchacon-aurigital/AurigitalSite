"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useContactModal } from '../../context/ContactModalContext';
import CotizacionButton from '../ui/CotizacionButton';

const MagicRings = dynamic(() => import('../ui/MagicRings'), { ssr: false });

export default function Hero() {
    const { translations } = useLanguage();
    const { openModal } = useContactModal();
    const [showHint, setShowHint] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setIsMobile(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
        // tiny rAF so the browser paints the hidden state first
        requestAnimationFrame(() => setMounted(true));
        const t = setTimeout(() => setShowHint(true), 2200);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            className="relative h-[90vh] md:h-[95vh] w-full overflow-hidden bg-[#101010]"
            role="banner"
            aria-label="Hero section"
        >
            <div className="absolute left-0 right-0 -top-[30%] -bottom-[30%] md:inset-0 rotate-90 md:rotate-0" aria-hidden="true">
                <MagicRings
                    ringCount={8} lineThickness={3.5} color="#4dbff0" colorTwo="#3cff58"
                    noiseAmount={0.44} fadeIn={0.75} fadeOut={1.75} hoverScale={1.25}
                    clickBurst={true} baseRadius={0.21} radiusStep={0.12} ringGap={1.2}
                    parallax={0.08} speed={0.8} scaleRate={0.07} mouseInfluence={0.55}
                    attenuation={18.5} followMouse={true}
                />
            </div>

            <style>{`
                @keyframes hint-pulse {
                    0%   { opacity: 0.25; text-shadow: 0 0 4px rgba(100,184,232,0.15); }
                    50%  { opacity: 1;    text-shadow: 0 0 20px rgba(100,184,232,1), 0 0 40px rgba(100,184,232,0.5), 0 0 60px rgba(100,184,232,0.2); }
                    100% { opacity: 0.25; text-shadow: 0 0 4px rgba(100,184,232,0.15); }
                }
            `}</style>

            <div className="relative z-10 pointer-events-none container mx-auto px-4 md:px-12 flex flex-col justify-center h-[90vh] md:h-[95vh]">
                <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center">

                    <p
                        className="text-white/70 font-space-grotesk font-light text-sm tracking-widest uppercase mb-8"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s' }}
                    >
                        {translations.hero.projectsCount}
                    </p>

                    <h1
                        className="text-3xl md:text-5xl font-medium font-space-grotesk leading-tight"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.9s ease-out 0.55s, transform 0.9s ease-out 0.55s' }}
                    >
                        <span className="text-white/90">{translations.hero.title.part1}</span>
                        <br />
                        {translations.hero.title.part2}
                    </h1>

                    {/* Hint */}
                    <p
                        className="font-space-grotesk text-xs uppercase tracking-widest text-[#64B8E8] mt-6"
                        style={{
                            opacity: showHint ? 1 : 0,
                            transition: 'opacity 0.7s ease-out',
                            animation: showHint ? 'hint-pulse 2.2s ease-in-out infinite' : 'none',
                        }}
                    >
                        {isMobile ? '[ TAP ]' : '[ CLICK ]'}
                    </p>

                    <p
                        className="text-md text-white/80 mt-4 max-w-[36rem] font-red-hat font-light px-4"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.9s ease-out 0.9s, transform 0.9s ease-out 0.9s' }}
                    >
                        {translations.hero.description}
                    </p>

                    <div
                        className="flex flex-col md:flex-row gap-4 mt-10"
                        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 0.9s ease-out 1.3s, transform 0.9s ease-out 1.3s' }}
                    >
                        <span className="pointer-events-auto">
                            <CotizacionButton onClick={openModal}>
                                {translations.hero.buttons.contact}
                            </CotizacionButton>
                        </span>
                        <span className="pointer-events-auto">
                            <CotizacionButton href="/proyectos" variant="white">
                                {translations.hero.buttons.knowMore}
                            </CotizacionButton>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
