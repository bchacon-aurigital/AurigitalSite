"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const Servicios = () => {
    const videoRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const { translations } = useLanguage();
    const serviciosData = translations.servicios;


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
        <div
            className="mx-auto pt-12 max-w-[110rem]"
            data-aos="fade-up"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 mx-auto w-full min-h-[600px] md:min-h-[700px] lg:h-[800px]">
                <div className="flex flex-col justify-center text-center lg:text-center p-4 md:p-8 bg-[#363636] rounded-2xl order-1 lg:order-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-qurova font-medium uppercase leading-none text-white mb-4 md:mb-8">
                        <span className="text-white/50 block">{serviciosData.title.part1}</span>
                        <span className="text-white block">{serviciosData.title.part2}</span>
                        <span className="text-white/50 ">{serviciosData.title.part3}</span>
                        {serviciosData.title.part4}
                    </h2>

                    <p className="text-xs md:text-sm lg:text-xs font-mansfield font-light text-white/80 leading-relaxed mx-auto max-w-lg">
                        {serviciosData.description}
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-rows-2 gap-3 h-auto lg:h-full order-2 lg:order-2">
                    <div
                        className="relative rounded-2xl overflow-hidden border border-[#4E4E4E]/50 xl:border-none flex flex-col justify-between h-[200px] sm:h-[250px] lg:h-auto"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <div className="absolute inset-0 hidden lg:block">
                            <Image
                                src={`/assets/${serviciosData.cards[0].image}`}
                                alt={serviciosData.cards[0].title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10 p-3 md:p-6">
                            <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-3xl font-qurova font-medium uppercase tracking-wider leading-tight mb-2 md:mb-4">
                                {serviciosData.cards[0].title}
                            </h3>
                            <p className="text-[#D4D4D4]/60 text-xs md:text-sm lg:text-md font-mansfield font-light leading-none">
                                {serviciosData.cards[0].description}
                            </p>
                        </div>
                    </div>

                    <div
                        className="relative rounded-2xl overflow-hidden border border-[#4E4E4E]/50 xl:border-none flex flex-col justify-between h-[200px] sm:h-[250px] lg:h-auto"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <div className="absolute inset-0 hidden lg:block">
                            <Image
                                src={`/assets/${serviciosData.cards[1].image}`}
                                alt={serviciosData.cards[1].title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>

                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10 p-3 md:p-6">
                            <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-3xl font-qurova font-medium uppercase tracking-wider leading-tight mb-2 md:mb-4">
                                {serviciosData.cards[1].title.split('\n').map((line, i) => (
                                    i > 0 ? (
                                        <span key={i}>
                                            <br />
                                            {line}
                                        </span>
                                    ) : line
                                ))}
                            </h3>
                            <p className="text-[#D4D4D4]/60 text-xs md:text-sm lg:text-md font-mansfield font-light leading-none">
                                {serviciosData.cards[1].description}
                            </p>
                        </div>
                    </div>

                    <div
                        className="col-span-2 relative rounded-2xl overflow-hidden bg-[#1A1A1A] flex flex-col justify-between border border-gray-700/50 h-[300px] sm:h-[250px] lg:h-auto sm:col-span-2 lg:col-span-2"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <video
                            ref={videoRef}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            onError={(e) => {
                                console.log("Error loading video:", e);
                            }}
                        >
                            <source src={`/assets/5.webm`} type="video/webm" />
                            Tu navegador no soporta videos.
                        </video>
                        <div className="absolute inset-0 bg-white/[0.08]"></div>

                        <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-10 p-3 md:p-6">
                            <h3 className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-3xl font-qurova font-medium uppercase tracking-wider leading-tight mb-2 md:mb-4 max-w-xs md:max-w-md">
                                {serviciosData.cards[2].title}
                            </h3>
                            <p className="text-[#D4D4D4]/60 text-xs md:text-sm lg:text-md font-mansfield font-light leading-none max-w-xs md:max-w-md">
                                {serviciosData.cards[2].description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Servicios; 