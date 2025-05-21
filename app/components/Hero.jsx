"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from '../context/LanguageContext';

const Navbar = dynamic(() => import("./Navbar"), {
    ssr: false,
});

export default function Hero() {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { translations } = useLanguage();
    
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
            className="relative h-[95vh] w-full overflow-hidden bg-black mx-auto max-w-[110rem] rounded-lg"
            role="banner"
            aria-label="Hero section"
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
                    <source src="/assets/1.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                </video>
                <div className="absolute inset-0 bg-[#1E1E1E] bg-opacity-80"></div>
            </div>

            <div className="z-50" data-aos="fade-down" data-aos-delay="200">
                <Navbar />
            </div>

            <div className="container mx-auto px-4 md:px-12 flex flex-col justify-center h-[95vh]">
                <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center z-20" data-aos="fade-up" data-aos-delay="200">

                    <div className="border border-[#B2FF00] rounded-full px-16 py-2 mb-8" data-aos="fade-down" data-aos-delay="300">
                        <p className="text-[#B2FF00] font-mansfield font-light">{translations.hero.projectsCount}</p>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-medium transition-transform duration-1000 ease-in-out font-qurova" data-aos="fade-up" data-aos-delay="400">
                        <span className="text-[#a7a6a6]"> {translations.hero.title.part1} </span> <br /> {translations.hero.title.part2}
                    </h1>

                    <p className="text-md text-[#FFFFFF]/60 mt-8 max-w-[52rem] font-mansfield font-light" data-aos="fade-up" data-aos-delay="500">
                        {translations.hero.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-8 font-qurova font-normal" data-aos="fade-up" data-aos-delay="600">
                        <a
                            href="/contacto"
                            className="px-14 py-2 bg-[#B2FF00] rounded-full text-black hover:bg-[#b3ff00b6] transition-colors duration-500 text-center relative z-10"
                            data-aos="zoom-in" data-aos-delay="700"
                        >
                            {translations.hero.buttons.contact}
                        </a>
                        <a
                            href="/conocer-mas"
                            className="px-14 py-2 bg-transparent rounded-full text-white border border-white hover:border-transparent hover:text-black hover:bg-white transition-colors duration-500 text-center relative z-10"
                            data-aos="zoom-in" data-aos-delay="800"
                        >
                            {translations.hero.buttons.knowMore}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}