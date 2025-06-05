"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const EstamosAqui = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [showTestimonials, setShowTestimonials] = useState(false);
    const [textHighlighted, setTextHighlighted] = useState(false);
    const [activeSlide, setActiveSlide] = useState(1);
    const EstamosAquiRef = useRef(null);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const { translations, language } = useLanguage();

    const textParts = translations.estamosAqui.typing;
    const testimonialData = translations.estamosAqui.testimonials;

    const totalText = textParts.join("");
    const [typedText, setTypedText] = useState("");

    const testimonios = testimonialData.items || [];
    const isArray = Array.isArray(testimonios);
    const testimoniosExtendidos = isArray && testimonios.length < 3
        ? [...testimonios, ...testimonios].slice(0, 4)
        : isArray ? testimonios : [];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        initialSlide: 1,
        afterChange: (current) => setActiveSlide(current),
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: "0",
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "60px",
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "10px",
                },
            },
        ],
    };

    useEffect(() => {
        if (mounted) {
            setTypedText("");
            setShouldReset(true);
            setShowTestimonials(false);
            setTextHighlighted(false);
        }
    }, [language, mounted]);

    const isInViewport = (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };

    useEffect(() => {
        setMounted(true);

        const checkVisibility = () => {
            if (EstamosAquiRef.current && isInViewport(EstamosAquiRef.current) && !showText) {
                setShowText(true);
                window.removeEventListener('scroll', checkVisibility);
            }
        };

        checkVisibility();
        window.addEventListener('scroll', checkVisibility);

        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [showText]);

    useEffect(() => {
        if (shouldReset) {
            setTypedText("");
            setShouldReset(false);
            setShowTestimonials(false);
            setTextHighlighted(false);
        }
    }, [shouldReset]);

    useEffect(() => {
        if (!showText) return;

        if (typedText.length < totalText.length) {
            const typingTimer = setTimeout(() => {
                setTypedText(totalText.substring(0, typedText.length + 1));
            }, 30);

            return () => clearTimeout(typingTimer);
        } else {
            setTextHighlighted(true);

            const showTestimonialsTimer = setTimeout(() => {
                setShowTestimonials(true);
            }, 2000);

            return () => clearTimeout(showTestimonialsTimer);
        }
    }, [typedText, showText, totalText]);

    if (!mounted) {
        return null;
    }

    const renderText = () => {
        let currentLength = 0;
        return textParts.map((part, index) => {
            const startPos = currentLength;
            currentLength += part.length;
            let visiblePart = "";

            if (startPos < typedText.length) {
                visiblePart = typedText.substring(startPos, Math.min(currentLength, typedText.length));
            }

            const isGray = index % 2 === 0;
            return (
                <span key={`${language}-${index}`} className={isGray ? "text-[#a7a6a6]" : ""}>
                    {visiblePart}
                </span>
            );
        });
    };

    const JumpingDots = () => (
        <div className="flex space-x-1 justify-center h-6">
            {[0, 1, 2].map((dot) => (
                <div
                    key={dot}
                    className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"
                    style={{
                        animationDelay: `${dot * 0.2}s`,
                        animationDuration: '0.6s'
                    }}
                ></div>
            ))}
        </div>
    );

    return (
        <div
            ref={EstamosAquiRef}
            className="text-gray-700 rounded-lg"
            role="contentinfo"
            data-aos="fade-up"
            id="testimonios"
        >
            <div
                ref={containerRef}
                className="container relative py-12 px-4 mx-auto max-w-[110rem] rounded-xl bg-white overflow-hidden transition-all duration-1000 ease-in-out"
            >
                <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-start md:gap-20 gap-8 justify-center mx-auto max-w-7xl">
                    <Image
                        src="/assets/AurigitalChat.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className={`transition-transform duration-1000 ${textHighlighted ? 'scale-110' : ''}`}
                    />
                    <h2 className="md:text-5xl text-3xl font-qurova font-medium uppercase leading-tight transition-all duration-1000">
                        {!showText && <JumpingDots />}
                        {showText && renderText()}
                    </h2>
                </div>

                <div
                    className={`transition-all duration-1000 ease-in-out overflow-hidden ${
                        showTestimonials 
                            ? 'max-h-[1000px] opacity-100 mt-16' 
                            : 'max-h-0 opacity-0 mt-0'
                    }`}
                >
                    <div className="flex flex-col items-center text-center md:text-left md:items-start mx-auto max-w-7xl">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between w-full">
                            <h2 className="text-4xl md:text-5xl font-qurova font-medium uppercase leading-tight md:w-2/4 text-center md:text-left" data-aos="fade-right" data-aos-delay="100">
                                {testimonialData.title.split(' ').map((word, i, arr) => (
                                    i === arr.length - 3 ?
                                        <span key={i}><br className="hidden md:block" />{word}</span> :
                                        <span key={i}> {word}</span>
                                ))}
                            </h2>
                            <div className="flex flex-col items-center md:items-end gap-4 md:w-1/3 mt-4 md:mt-0" data-aos="fade-left" data-aos-delay="200">
                                <h3 className="text-lg text-center md:text-right font-mansfield font-medium leading-tight">
                                    {testimonialData.subtitle}
                                </h3>
                                <div className="flex flex-row items-center gap-4 font-qurova mt-2">
                                    <button className="bg-[#00BBFF] text-white px-4 py-2 rounded-full hover:bg-[#0099CC] transition-colors duration-300" data-aos="zoom-in" data-aos-delay="300">
                                        {testimonialData.buttons.contact}
                                    </button>
                                    <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300" data-aos="zoom-in" data-aos-delay="400">
                                        {testimonialData.buttons.knowMore}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-8 md:py-10 overflow-hidden">
                            <div className="relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[150vw] py-8 overflow-x-visible">
                                <Slider ref={sliderRef} {...settings} className="testimonios-slider">
                                    {Array.isArray(testimoniosExtendidos) ? testimoniosExtendidos.map((testimonio, index) => {
                                        const isActive = index === activeSlide;
                                        return (
                                            <div key={index} className=" outline-none">
                                                <div
                                                    className={`
                                                        relative p-6 lg:px-12 transition-all h-full flex flex-row items-center justify-start gap-8 rounded-xl lg:h-[350px]
                                                        overflow-hidden
                                                        ${isActive
                                                            ? "bg-[#00BBFF] scale-100 z-10 shadow-xl rounded-xl"
                                                            : "bg-[#262626] text-white scale-75"}
                                                    `}
                                                >
                                                    <FaQuoteRight
                                                        className={`absolute -top-32 -right-20 -z-10 text-[27rem] mb-4 w-[55%] hidden lg:block ${isActive ? "text-[#098CBC]" : "text-[#1F1F1F]/30"
                                                            }`}
                                                    />

                                                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                                        <Image
                                                            src={`/assets/home/${testimonio.company}.svg`}
                                                            alt={`${testimonio.author} avatar`}
                                                            width={85}
                                                            height={85}
                                                            onError={(e) => {
                                                                e.target.src = "/assets/AurigitalChat.svg";
                                                            }}
                                                        />

                                                        <div className="flex flex-col">
                                                            <p className={`mb-4 text-sm md:text-xl leading-none font-mansfield font-normal italic ${isActive ? "text-[#0A0C0D]" : "text-[#404040]"
                                                                }`}>
                                                                {testimonio.testimonial}
                                                            </p>
                                                            <p className={`font-semibold text-md ${isActive ? "text-[#0F6B8D]" : "text-[#404040]/30"
                                                                }`}>
                                                                -{testimonio.author}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : null}
                                </Slider>

                                <div className="flex justify-center mt-8 space-x-6">
                                    <button
                                        onClick={() => sliderRef.current.slickPrev()}
                                        className="bg-[#00BBFF] rounded-full p-2 shadow-md focus:outline-none"
                                        aria-label="Testimonio anterior"
                                    >
                                        <IoIosArrowBack className="text-black text-2xl" />
                                    </button>
                                    <button
                                        onClick={() => sliderRef.current.slickNext()}
                                        className="bg-[#00BBFF] rounded-full p-2 shadow-md focus:outline-none"
                                        aria-label="Siguiente testimonio"
                                    >
                                        <IoIosArrowForward className="text-black text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .testimonios-slider .slick-track {
                    display: flex !important;
                    align-items: center !important;
                }
                .testimonios-slider .slick-slide {
                    transition: all 0.3s ease;
                    height: inherit !important;
                }
                .testimonios-slider .slick-current {
                    z-index: 10;
                }
            `}</style>
        </div>
    );
};

export default EstamosAqui;