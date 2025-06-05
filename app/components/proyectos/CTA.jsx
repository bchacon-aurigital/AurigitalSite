"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useChat } from '../../context/ChatContext';
import { useContactModal } from '../../context/ContactModalContext';

export default function CTA() {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { translations } = useLanguage();
    const { openChat } = useChat();
    const { openModal } = useContactModal();

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (videoRef.current) {
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
                >
                    <source src="/assets/4.webm" type="video/webm" />
                    Tu navegador no soporta videos HTML5.
                </video>
                <div className="absolute inset-0 bg-white bg-opacity-70"></div>
            </div>

            <div className="container mx-auto px-4 md:px-12 flex flex-col justify-center h-[95vh]">
                <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center z-20" data-aos="fade-up" data-aos-delay="200">

                    <h1 className="text-black text-4xl md:text-6xl font-medium transition-transform duration-1000 ease-in-out font-qurova uppercase" data-aos="fade-up" data-aos-delay="300">
                        <span className="text-[#000000]/60"> {translations.cta.title.part1} </span> <br /> {translations.cta.title.part2}
                    </h1>

                    <p className="text-md text-[#000000]/80 mt-8 max-w-[52rem] font-mansfield font-medium" data-aos="fade-up" data-aos-delay="400">
                        {translations.cta.description}
                    </p> 

                    <div className="flex flex-col md:flex-row gap-4 mt-8 font-qurova font-normal" data-aos="zoom-in" data-aos-delay="600">
                        <button
                            onClick={openModal}
                            className="px-14 py-2 bg-black rounded-full text-white hover:bg-[#b3ff00b6] transition-colors duration-500 text-center relative z-10"
                        >
                            {translations.cta.buttons.contact}
                        </button>
                        <button
                            onClick={openChat}
                            className="px-14 py-2 bg-transparent rounded-full text-black border border-black hover:border-transparent hover:text-black hover:bg-white transition-colors duration-500 text-center relative z-10"
                        >
                            {translations.cta.buttons.knowMore}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}