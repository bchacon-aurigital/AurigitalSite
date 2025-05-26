"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';

const EstamosAqui = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [showSecondContent, setShowSecondContent] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [textHighlighted, setTextHighlighted] = useState(false);
    const [containerExpanding, setContainerExpanding] = useState(false);
    const EstamosAquiRef = useRef(null);
    const containerRef = useRef(null);
    const { translations, language } = useLanguage();

    const textParts = translations.estamosAqui.typing;
    const testimonialData = translations.estamosAqui.testimonials;

    const totalText = textParts.join("");
    const [typedText, setTypedText] = useState("");

    const testimonials = testimonialData.items.map((item, index) => ({
        id: index + 1,
        company: item.company,
        testimonial: item.testimonial,
        author: item.author,
        companyLogo: `company-${index + 1}.svg`,
        authorAvatar: `author-${index + 1}.svg`
    }));

    useEffect(() => {
        if (mounted) {
            setTypedText("");
            setShouldReset(true);
            setShowSecondContent(false);
            setIsTransitioning(false);
            setTextHighlighted(false);
            setContainerExpanding(false);
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
            setShowSecondContent(false);
            setIsTransitioning(false);
            setTextHighlighted(false);
            setContainerExpanding(false);
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

            const expandContainerTimer = setTimeout(() => {
                setContainerExpanding(true);

                const transitionTimer = setTimeout(() => {
                    setIsTransitioning(true);

                    const showContentTimer = setTimeout(() => {
                        setShowSecondContent(true);
                    }, 700);

                    return () => clearTimeout(showContentTimer);
                }, 500);

                return () => clearTimeout(transitionTimer);
            }, 2000);

            return () => clearTimeout(expandContainerTimer);
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
        >
            <div
                ref={containerRef}
                className={`container relative py-12 px-4 mx-auto max-w-[110rem] rounded-lg bg-white overflow-hidden transition-all duration-1000 ease-in-out 
                ${!containerExpanding ? '' :
                        (containerExpanding && !isTransitioning) ? 'md:py-56' :
                            (containerExpanding && isTransitioning) ? 'md:py-24' : ''} 
                ${showSecondContent ? 'min-h-[800px] md:min-h-[800px]' : ''}`}
                style={{ minHeight: containerExpanding ? 'auto' : 'auto' }}
            >
                <div
                    className={`flex flex-col md:flex-row items-center text-center md:text-left md:items-start md:gap-20 gap-8 justify-center mx-auto max-w-7xl transition-all duration-700 ease-in-out 
                    ${isTransitioning ? 'opacity-0 transform -translate-y-8' : 'opacity-100 transform translate-y-0'}
                    ${showSecondContent ? 'hidden' : 'block'}`}
                >
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
                    className={`flex flex-col items-center text-center md:text-left md:items-start mx-auto max-w-7xl transition-all duration-1000 ease-in-out 
                    ${showSecondContent ? 'opacity-100 transform translate-y-0 relative' : 'opacity-0 transform translate-y-8 absolute left-0 right-0 top-0'}
                    ${!showSecondContent ? 'hidden' : 'block'}`}
                    data-aos="fade-left"

                >
                    <div className="flex flex-col md:flex-row items-center gap-4 md:justify-between">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 py-8 md:py-10 w-full">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`flex flex-col items-center gap-4 transition-all duration-700 ease-out ${showSecondContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
                                    }`}
                                style={{
                                    transitionDelay: `${500 + (index * 150)}ms`
                                }}

                            >
                                <div className="bg-[#DBDBDB] rounded-xl shadow-lg p-6 md:p-8 w-full h-full flex flex-col justify-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                                    <div className="flex items-center gap-3 mb-4 justify-center md:justify-start" data-aos="fade-down" data-aos-delay={300 + (index * 100)}>
                                        <div
                                            className="w-[35px] h-[35px] flex items-center justify-center rounded-full bg-[#B2FF00] transition-transform duration-300 hover:scale-110"
                                        >
                                            <Image
                                                src={`/assets/${testimonial.companyLogo}`}
                                                alt={`${testimonial.company} logo`}
                                                width={35}
                                                height={35}
                                                onError={(e) => {
                                                    e.target.src = "/assets/AurigitalChat.svg";
                                                }}
                                            />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-800 flex-1 font-qurova">{testimonial.company}</h4>
                                    </div>

                                    <blockquote className="flex items-center text-xs text-gray-600 italic md:text-sm leading-tight mb-6 font-mansfield min-h-[150px] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200" data-aos="fade-up" data-aos-delay={350 + (index * 100)}>
                                        {testimonial.testimonial}
                                    </blockquote>

                                    <div className="flex items-center gap-3 mt-auto" data-aos="fade-up" data-aos-delay={400 + (index * 100)}>
                                        <div
                                            className="w-[25px] h-[25px] flex items-center justify-center rounded-full bg-[#B2FF00] transition-transform duration-300 hover:scale-110"
                                        >
                                            <Image
                                                src={`/assets/${testimonial.authorAvatar}`}
                                                alt={`${testimonial.author} avatar`}
                                                width={25}
                                                height={25}
                                                onError={(e) => {
                                                    e.target.src = "/assets/AurigitalChat.svg";
                                                }}
                                            />
                                        </div>
                                        <span className="font-medium text-sm text-[#414141] flex-1 font-qurova text-start">{testimonial.author}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EstamosAqui;