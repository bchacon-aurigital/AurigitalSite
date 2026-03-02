"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useContactModal } from '../../context/ContactModalContext';
import BotonServicio from '../ServiciosPages/ui/Boton';

export default function CTA() {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { translations } = useLanguage();
    const { openModal } = useContactModal();

    useEffect(() => {
        // Detectar iOS para deshabilitar autoplay problemático
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (videoRef.current && !isIOS) {
                        // Solo reproducir automáticamente en navegadores que no sean iOS
                        videoRef.current.play().catch(error => {
                            console.log("Error al reproducir el video:", error);
                        });
                    }
                } else {
                    setIsVisible(false);
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                }
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    return (
        <section
            className="relative h-[95vh] w-full overflow-hidden bg-black mx-auto max-w-[110rem] rounded-xl"
            role="banner"
            aria-label="CTA section"
            data-aos="fade-in"
        >
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <video
                    ref={videoRef}
                    className="absolute inset-0 object-cover w-full h-full"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/assets/Soluciones.avif"
                    onError={(e) => {
                        // Si el video falla, usar imagen de fondo
                        e.target.style.display = 'none';
                        console.log("Video no disponible, usando imagen de fondo");
                    }}
                >
                    <source src="/assets/4.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-[#1E1E1E] bg-opacity-80"></div>
            </div>

            <div className="container mx-auto px-4 md:px-12 flex flex-col justify-center h-[95vh]">
                <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center z-20" data-aos="fade-up" data-aos-delay="200">

                    <h2 className="text-4xl md:text-6xl font-medium transition-transform duration-1000 ease-in-out font-space-grotesk uppercase" data-aos="fade-up" data-aos-delay="300">
                        <span className="text-[#a7a6a6]"> {translations.cta.title.part1} </span> <br /> {translations.cta.title.part2}
                    </h2>

                    <p className="text-md text-[#FFFFFF]/60 mt-8 max-w-[52rem] font-red-hat font-light" data-aos="fade-up" data-aos-delay="400">
                        {translations.cta.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-8 font-space-grotesk font-normal" data-aos="zoom-in" data-aos-delay="600">
                        <BotonServicio dark={true} onClick={openModal}>{translations.cta.buttons.contact}</BotonServicio>
                    </div>

                </div>
            </div>
        </section>
    );
}