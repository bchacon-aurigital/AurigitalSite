"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import { useContactModal } from '../../context/ContactModalContext';
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';

const EstamosAqui = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const carouselRef = useRef(null);
    const sectionRef = useRef(null);
    const { translations } = useLanguage();
    const { openModal } = useContactModal();
    const router = useRouter();

    const textParts = translations.estamosAqui.typing;
    const testimonialData = translations.estamosAqui.testimonials;
    const testimonios = testimonialData.items || [];

    // Simple carousel navigation
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonios.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonios.length) % testimonios.length);
    };

    // Auto-scroll carousel
    useEffect(() => {
        if (testimonios.length > 1) {
            const interval = setInterval(nextSlide, 8000);
            return () => clearInterval(interval);
        }
    }, [testimonios.length]);

    const renderStaticText = () => {
        return textParts.map((part, index) => {
            const isGray = index % 2 === 0;
            return (
                <span key={index} className={isGray ? "text-[#a7a6a6]" : ""}>
                    {part}
                </span>
            );
        });
    };

    return (
        <div
            ref={sectionRef}
            className="text-gray-700 rounded-lg"
            role="contentinfo"
            id="testimonios"
        >
            <div className="container relative py-12 px-4 mx-auto max-w-[110rem] rounded-xl bg-white overflow-hidden">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-center md:gap-20 gap-8 justify-center m-auto max-w-7xl">
                    <Image
                        src="/assets/AurigitalChat.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className={`transition-transform duration-300 ${isVisible ? 'scale-110' : ''}`}
                    />
                    <div className="md:text-5xl text-3xl font-qurova font-medium uppercase leading-tight">
                        {renderStaticText()}
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mt-16">
                    <div className="flex flex-col items-center text-center md:text-left md:items-start mx-auto max-w-7xl">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between w-full">
                            <h2 className="text-4xl md:text-5xl font-qurova font-medium uppercase leading-tight md:w-2/4 text-center md:text-left">
                                {testimonialData.title.split(' ').map((word, i, arr) => (
                                    i === arr.length - 3 ?
                                        <span key={i}><br className="hidden md:block" />{word}</span> :
                                        <span key={i}> {word}</span>
                                ))}
                            </h2>
                            <div className="flex flex-col items-center md:items-end gap-4 md:w-1/3 mt-4 md:mt-0">
                                <h3 className="text-lg text-center md:text-right font-mansfield font-medium leading-tight">
                                    {testimonialData.subtitle}
                                </h3>
                                <div className="flex flex-row items-center gap-4 font-qurova mt-2">
                                    <button
                                        onClick={openModal}
                                        className="bg-[#00BBFF] text-white px-4 py-2 rounded-full hover:bg-[#0099CC] transition-colors duration-300"
                                    >
                                        {testimonialData.buttons.contact}
                                    </button>
                                    <button
                                        onClick={() => router.push('/sobrenosotros')}
                                        className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                                    >
                                        {testimonialData.buttons.knowMore}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Optimized Carousel */}
                        <div className="w-full py-8 md:py-10 bg-white">
                            <div className="relative bg-white">
                                {/* Carousel Container */}
                                <div className="carousel-container relative overflow-hidden">
                                    <div className="carousel-track flex transition-transform duration-500 ease-in-out">
                                        {testimonios.map((testimonio, index) => {
                                            const isActive = index === currentSlide;
                                            
                                            return (
                                                <div
                                                    key={index}
                                                    className="carousel-slide flex-shrink-0 px-4"
                                                >
                                                    <div
                                                        className={`
                                                            relative p-6 lg:px-12 transition-all duration-500 w-full h-full flex flex-col items-start justify-start gap-6 rounded-xl
                                                            overflow-hidden transform
                                                            ${isActive
                                                                ? "bg-[#00BBFF] scale-100 shadow-xl z-10"
                                                                : "bg-[#262626] text-white scale-90 opacity-60"}
                                                        `}
                                                    >
                                                        <FaQuoteRight
                                                            className={`absolute -top-20 -right-16 text-[12rem] opacity-10 ${
                                                                isActive ? "text-[#098CBC]" : "text-[#1F1F1F]"
                                                            }`}
                                                        />

                                                        <div className="flex flex-col gap-4 relative z-10 h-full">
                                                            <p className={`text-sm md:text-[17px] leading-relaxed font-mansfield font-normal flex-1 ${
                                                                isActive ? "text-[#0A0C0D]" : "text-[#E0E0E0]"
                                                            }`}>
                                                                {testimonio.testimonial}
                                                            </p>
                                                            <div className="flex flex-row gap-4 items-center mt-auto">
                                                                <Image
                                                                    src={`/assets/home/${testimonio.company}.svg`}
                                                                    alt={`${testimonio.author} company`}
                                                                    width={50}
                                                                    height={50}
                                                                    onError={(e) => {
                                                                        e.target.src = "/assets/AurigitalChat.svg";
                                                                    }}
                                                                />
                                                                <p className={`font-semibold text-md ${
                                                                    isActive ? "text-[#0F6B8D]" : "text-[#B0B0B0]"
                                                                }`}>
                                                                    -{testimonio.author}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex justify-center mt-8 gap-4">
                                    <button
                                        onClick={prevSlide}
                                        className="bg-[#00BBFF] hover:bg-[#0099CC] active:bg-[#0088BB] rounded-full p-4 shadow-lg transition-all duration-200"
                                        aria-label="Testimonio anterior"
                                    >
                                        <IoIosArrowBack className="text-black text-xl" />
                                    </button>
                                    
                                    <button
                                        onClick={nextSlide}
                                        className="bg-[#00BBFF] hover:bg-[#0099CC] active:bg-[#0088BB] rounded-full p-4 shadow-lg transition-all duration-200"
                                        aria-label="Siguiente testimonio"
                                    >
                                        <IoIosArrowForward className="text-black text-xl" />
                                    </button>
                                </div>

                                {/* Dots Indicator */}
                                <div className="flex justify-center mt-6 gap-2">
                                    {testimonios.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                index === currentSlide ? 'bg-[#00BBFF]' : 'bg-gray-300'
                                            }`}
                                            aria-label={`Ir a testimonio ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simplified CSS */}
            <style jsx>{`
                .carousel-container {
                    position: relative;
                    overflow: hidden;
                    max-width: 100%;
                    margin: 0 auto;
                    padding: 20px 0;
                    background: transparent;
                }
                
                .carousel-track {
                    display: flex;
                    align-items: stretch;
                    justify-content: flex-start;
                    min-height: 350px;
                }
                
                .carousel-slide {
                    flex: 0 0 auto;
                    display: flex;
                    align-items: stretch;
                    justify-content: center;
                    transition: all 0.5s ease;
                }
                
                /* Desktop: Show 3 slides with center focus - 2:1 aspect ratio */
                @media (min-width: 769px) {
                    .carousel-container {
                        max-width: 2100px;
                    }
                    
                    .carousel-track {
                        transform: translateX(calc(-${currentSlide * 33.333}% + 33.333% - ${currentSlide * 105}px + 40px));
                        min-height: 400px;
                    }
                    
                    .carousel-slide {
                        width: 33.333% !important;
                        flex: 0 0 33.333%;
                        margin: 0 40px;
                    }
                    
                    .carousel-slide > div {
                        min-height: 350px;
                        width: 100%;
                        min-width: 700px;
                        max-width: 700px;
                        margin: 0 auto;
                    }
                }
                
                /* Mobile: Show 1 slide at a time - mantener altura original */
                @media (max-width: 768px) {
                    .carousel-track {
                        transform: translateX(-${currentSlide * 100}%);
                        min-height: 403px;
                    }
                    
                    .carousel-slide {
                        width: 100% !important;
                        flex: 0 0 100%;
                    }
                    
                    .carousel-slide > div {
                        min-height: 403px;
                        width: 100%;
                        max-width: 400px;
                        margin: 0 auto;
                    }
                }
                
                /* Touch optimization */
                .carousel-container * {
                    touch-action: manipulation;
                }
                
                /* Ensure proper dimensions and consistent sizing */
                .carousel-slide > div {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                
                /* Desktop specific sizing */
                @media (min-width: 850px) {
                    .carousel-slide > div {
                        min-height: 400px;
                        max-height: 400px;
                    }
                }
                
                /* Mobile specific sizing */
                @media (max-width: 768px) {
                    .carousel-slide > div {
                        min-height: 600px;
                        max-height: 600px;
                    }
                }
                
                /* Fix for text content in mobile */
                @media (max-width: 768px) {
                    .carousel-slide > div > div {
                        padding: 1rem;
                        gap: 1rem;
                    }
                    
                    .carousel-slide p {
                        font-size: 0.875rem;
                        line-height: 1.4;
                    }
                }
            `}</style>
        </div>
    );
};

export default EstamosAqui;