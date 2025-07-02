"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import { useChat } from '../../context/ChatContext';
import { useContactModal } from '../../context/ContactModalContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';

const EstamosAqui = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [textHighlighted, setTextHighlighted] = useState(false);
    const [activeSlide, setActiveSlide] = useState(1);
    const EstamosAquiRef = useRef(null);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const { translations, language } = useLanguage();
    const { openChat } = useChat();
    const { openModal } = useContactModal();

    const textParts = translations.estamosAqui.typing;
    const testimonialData = translations.estamosAqui.testimonials;

    const totalText = textParts.join("");
    const [typedText, setTypedText] = useState("");
    const router = useRouter();

    const testimonios = testimonialData.items || [];
    const isArray = Array.isArray(testimonios);
    const testimoniosExtendidos = isArray && testimonios.length < 3
        ? [...testimonios, ...testimonios].slice(0, 4)
        : isArray ? testimonios : [];

    const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0",
        initialSlide: 1,
        afterChange: (current) => setActiveSlide(current),
        arrows: false,
        swipeToSlide: true,
        touchThreshold: 8,
        swipe: true,
        touchMove: true,
        accessibility: true,
        focusOnSelect: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        useCSS: true,
        useTransform: true,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: "0",
                    swipeToSlide: true,
                    touchThreshold: 8,
                    focusOnSelect: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "40px",
                    centerMode: true,
                    swipeToSlide: true,
                    touchThreshold: 5,
                    focusOnSelect: true,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerPadding: "20px",
                    centerMode: true,
                    swipeToSlide: true,
                    touchThreshold: 3,
                    focusOnSelect: true,
                    variableWidth: false,
                },
            },
        ],
    };

    useEffect(() => {
        if (mounted) {
            setTypedText("");
            setShouldReset(true);
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
        }
    }, [typedText, showText, totalText]);

    // Enhanced navigation functions for better mobile support
    const goToPrev = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Force immediate execution
        setTimeout(() => {
            if (sliderRef.current && sliderRef.current.slickPrev) {
                try {
                    sliderRef.current.slickPrev();
                } catch (error) {
                    console.warn('Slider navigation error:', error);
                    // Fallback: manually update activeSlide
                    const newIndex = activeSlide === 0 ? testimoniosExtendidos.length - 1 : activeSlide - 1;
                    setActiveSlide(newIndex);
                }
            }
        }, 10);
    };

    const goToNext = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // Force immediate execution
        setTimeout(() => {
            if (sliderRef.current && sliderRef.current.slickNext) {
                try {
                    sliderRef.current.slickNext();
                } catch (error) {
                    console.warn('Slider navigation error:', error);
                    // Fallback: manually update activeSlide
                    const newIndex = (activeSlide + 1) % testimoniosExtendidos.length;
                    setActiveSlide(newIndex);
                }
            }
        }, 10);
    };

    // Handle slide click for mobile
    const handleSlideClick = (index, e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (sliderRef.current && index !== activeSlide) {
            setTimeout(() => {
                sliderRef.current.slickGoTo(index);
            }, 10);
        }
    };

    // Alternative navigation functions for problematic devices
    const handleTouchNav = (direction) => {
        if (direction === 'prev') {
            const newIndex = activeSlide === 0 ? testimoniosExtendidos.length - 1 : activeSlide - 1;
            setActiveSlide(newIndex);
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(newIndex);
            }
        } else {
            const newIndex = (activeSlide + 1) % testimoniosExtendidos.length;
            setActiveSlide(newIndex);
            if (sliderRef.current) {
                sliderRef.current.slickGoTo(newIndex);
            }
        }
    };

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
                        animationDelay: `${dot * 0.01}s`,
                        animationDuration: '0.3s'
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
                <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-center md:gap-20 gap-8 justify-center m-auto max-w-7xl">
                    <Image
                        src="/assets/AurigitalChat.svg"
                        alt="logo"
                        width={100}
                        height={100}
                        className={`transition-transform duration-300 ${textHighlighted ? 'scale-110' : ''}`}
                    />
                    <p className="md:text-5xl text-3xl font-qurova font-medium uppercase leading-tight transition-all duration-500">
                        {!showText && <JumpingDots />}
                        {showText && renderText()}
                    </p>
                </div>

                {/* Testimonials Section - Now always visible */}
                <div className="mt-16 opacity-100">
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
                                <div className="flex flex-row items-center gap-4 font-qurova mt-2" data-aos="zoom-in"
                                    data-aos-delay="400">
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

                        <div className="w-full py-8 md:py-10">
                            <div className="relative lg:left-1/2 lg:-translate-x-1/2 lg:w-[150vw] py-8">
                                <div className="testimonials-container">
                                    <Slider ref={sliderRef} {...settings} className="testimonios-slider">
                                        {Array.isArray(testimoniosExtendidos) ? testimoniosExtendidos.map((testimonio, index) => {
                                            const isActive = index === activeSlide;
                                            return (
                                                <div key={index} className="outline-none focus:outline-none">
                                                    <div
                                                        onClick={(e) => handleSlideClick(index, e)}
                                                        className={`
                                                            relative p-6 lg:px-12 transition-all duration-300 h-full flex flex-row items-center justify-start gap-8 rounded-xl lg:h-[350px]
                                                            overflow-hidden mx-2 cursor-pointer
                                                            ${isActive
                                                                ? "bg-[#00BBFF] scale-100 z-10 shadow-xl"
                                                                : "bg-[#262626] text-white scale-75 hover:scale-80"}
                                                        `}
                                                    >
                                                        <FaQuoteRight
                                                            className={`absolute -top-32 -right-20 -z-10 text-[27rem] mb-4 w-[55%] hidden lg:block ${isActive ? "text-[#098CBC]" : "text-[#1F1F1F]/30"
                                                                }`}
                                                        />

                                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                                            <div className="flex flex-col">
                                                                <p className={`mb-4 text-sm md:text-[17px] leading-none font-mansfield font-normal ${isActive ? "text-[#0A0C0D]" : "text-[#404040]"
                                                                    }`}>
                                                                    {testimonio.testimonial}
                                                                </p>
                                                                <div className="flex flex-row gap-6 items-center">
                                                                    <Image
                                                                        src={`/assets/home/${testimonio.company}.svg`}
                                                                        alt={`${testimonio.author} avatar`}
                                                                        width={50}
                                                                        height={50}
                                                                        onError={(e) => {
                                                                            e.target.src = "/assets/AurigitalChat.svg";
                                                                        }}
                                                                    />
                                                                    <p className={`font-semibold text-md ${isActive ? "text-[#0F6B8D]" : "text-[#404040]/30"
                                                                        }`}>
                                                                        -{testimonio.author}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }) : null}
                                    </Slider>
                                </div>

                                <div className="flex justify-center mt-8 space-x-6">
                                    {/* Previous Button */}
                                    <button
                                        onClick={goToPrev}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleTouchNav('prev');
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                        className="bg-[#00BBFF] hover:bg-[#0099CC] active:bg-[#0088BB] rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BBFF] focus:ring-opacity-50 transition-all duration-200 touch-manipulation select-none relative z-50"
                                        aria-label="Testimonio anterior"
                                        type="button"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            minWidth: '56px',
                                            minHeight: '56px',
                                            WebkitUserSelect: 'none',
                                            userSelect: 'none'
                                        }}
                                    >
                                        <IoIosArrowBack className="text-black text-2xl pointer-events-none" />
                                    </button>
                                    
                                    {/* Next Button */}
                                    <button
                                        onClick={goToNext}
                                        onTouchEnd={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleTouchNav('next');
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                        className="bg-[#00BBFF] hover:bg-[#0099CC] active:bg-[#0088BB] rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00BBFF] focus:ring-opacity-50 transition-all duration-200 touch-manipulation select-none relative z-50"
                                        aria-label="Siguiente testimonio"
                                        type="button"
                                        style={{
                                            WebkitTapHighlightColor: 'transparent',
                                            minWidth: '56px',
                                            minHeight: '56px',
                                            WebkitUserSelect: 'none',
                                            userSelect: 'none'
                                        }}
                                    >
                                        <IoIosArrowForward className="text-black text-2xl pointer-events-none" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .testimonials-container {
                    touch-action: pan-y pinch-zoom;
                    position: relative;
                }
                .testimonios-slider {
                    overflow: visible;
                    position: relative;
                }
                .testimonios-slider .slick-track {
                    display: flex !important;
                    align-items: center !important;
                    margin: 0 !important;
                }
                .testimonios-slider .slick-slide {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    height: inherit !important;
                    outline: none !important;
                    opacity: 1;
                }
                .testimonios-slider .slick-slide > div {
                    outline: none !important;
                    height: 100%;
                }
                .testimonios-slider .slick-current {
                    z-index: 10;
                }
                .testimonios-slider .slick-list {
                    overflow: visible;
                    padding: 0 !important;
                    margin: 0 !important;
                }
                .testimonios-slider .slick-center {
                    transform: scale(1) !important;
                }
                
                /* Enhanced mobile touch support */
                @media (max-width: 768px) {
                    .testimonios-slider .slick-slide {
                        padding: 0 8px;
                        transform: scale(0.85);
                        transition: transform 0.3s ease, opacity 0.3s ease;
                    }
                    .testimonios-slider .slick-center {
                        transform: scale(1) !important;
                    }
                    .testimonios-slider .slick-track {
                        display: flex !important;
                        align-items: center !important;
                    }
                    
                    /* Force button positioning and interaction */
                    .testimonials-container button {
                        position: relative !important;
                        z-index: 9999 !important;
                        pointer-events: auto !important;
                        touch-action: manipulation !important;
                    }
                    
                    .testimonials-container .flex.justify-center {
                        position: relative;
                        z-index: 9999;
                        pointer-events: auto;
                    }
                }
                
                @media (max-width: 480px) {
                    .testimonios-slider .slick-slide {
                        padding: 0 4px;
                    }
                    
                    /* Even more aggressive button targeting for small screens */
                    .testimonials-container button {
                        z-index: 99999 !important;
                        position: relative !important;
                        background: #00BBFF !important;
                        border: 2px solid #fff !important;
                    }
                }
                
                /* Ensure proper touch handling */
                .testimonios-slider * {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                
                /* Override for buttons - make them touchable */
                .testimonials-container button,
                .testimonials-container button * {
                    -webkit-touch-callout: auto !important;
                    -webkit-user-select: auto !important;
                    user-select: auto !important;
                    pointer-events: auto !important;
                    touch-action: manipulation !important;
                }
                
                /* Focus states for accessibility */
                .testimonios-slider button:focus {
                    outline: 3px solid #00BBFF;
                    outline-offset: 3px;
                }
                
                /* Improve touch target size */
                @media (max-width: 768px) {
                    .testimonials-container button {
                        min-width: 56px !important;
                        min-height: 56px !important;
                        padding: 16px !important;
                        margin: 0 8px !important;
                    }
                }
                
                /* Prevent text selection on slides but allow button interaction */
                .testimonios-slider .slick-slide div {
                    pointer-events: auto;
                    cursor: pointer;
                }
                
                /* Active slide enhancement */
                .testimonios-slider .slick-center > div > div {
                    transform: scale(1);
                    z-index: 20;
                }
                
                /* Smooth transitions */
                .testimonios-slider .slick-slide div {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                /* Fix for mobile overflow */
                @media (max-width: 768px) {
                    .testimonials-container {
                        overflow-x: hidden;
                        width: 100%;
                        position: relative;
                    }
                    .testimonios-slider {
                        width: 100%;
                    }
                }
                
                /* Ensure buttons are always on top and clickable */
                .testimonials-container .flex.justify-center.mt-8 {
                    position: relative;
                    z-index: 1000;
                    background: transparent;
                    padding: 20px 0;
                }
                
                /* Force button visibility and interaction on mobile */
                @media (max-width: 768px) {
                    .testimonials-container .flex.justify-center.mt-8 button {
                        background: #00BBFF !important;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
                        border: none !important;
                        position: relative !important;
                        z-index: 10000 !important;
                    }
                    
                    .testimonials-container .flex.justify-center.mt-8 button:active {
                        background: #0088BB !important;
                        transform: scale(0.95);
                    }
                }
            `}</style>
        </div>
    );
};

export default EstamosAqui;