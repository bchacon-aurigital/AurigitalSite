"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

const Excelencia = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [textCompleted, setTextCompleted] = useState(false);
    const excelenciaRef = useRef(null);
    const { translations, language } = useLanguage();

    const excelenciaData = translations.excelencia;
    
    const secondaryTextParts = excelenciaData.animatedText;
    
    const totalText = secondaryTextParts.join("");

    useEffect(() => {
        if (mounted) {
            setTypedText("");
            setShouldReset(true);
            setTextCompleted(false);
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
            if (excelenciaRef.current && isInViewport(excelenciaRef.current) && !showText) {
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
            setTextCompleted(false);
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
            setTextCompleted(true);
        }
    }, [typedText, showText, totalText]);

    if (!mounted) {
        return null;
    }

    const renderSecondaryText = () => {
        let currentLength = 0;
        return secondaryTextParts.map((part, index) => {
            const startPos = currentLength;
            currentLength += part.length;
            let visiblePart = "";
            
            if (startPos < typedText.length) {
                visiblePart = typedText.substring(startPos, Math.min(currentLength, typedText.length));
            }
            
            let textClass = "";
            if (index === 1 || index === 3 || index === 5 || index === 7) {
                textClass = "text-[#000000]"; 
            }
            
            return (
                <span key={`${language}-${index}`} className={textClass}>
                    {visiblePart.split('\n').map((line, i) => (
                        i > 0 ? (
                            <span key={i}>
                                <br />
                                {line}
                            </span>
                        ) : line
                    ))}
                </span>
            );
        });
    };

    const JumpingDots = () => (
        <div className="flex space-x-1 justify-center h-6">
            {[0, 1, 2].map((dot) => (
                <div
                    key={dot}
                    className="w-4 h-4 bg-black rounded-full animate-bounce"
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
            ref={excelenciaRef}
            className="container relative mx-auto py-12 max-w-[110rem] rounded-lg bg-white px-4 transition-all duration-1000 ease-in-out"
            role="contentinfo"
            data-aos="fade-up"
        >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mx-auto max-w-7xl items-center lg:items-end">
                <div className="lg:w-2/3 flex items-end">
                    <h2 className="text-3xl sm:text-5xl lg:text-[6rem] font-qurova font-medium uppercase leading-none text-center lg:text-left">
                        <span className="text-[#BBBBBB] block">{excelenciaData.title.part1}</span>
                        <span className="text-black block">{excelenciaData.title.part2}</span>
                    </h2>
                </div>
                
                <div className="md:w-1/3 lg:text-right text-center flex lg:items-end items-center lg:justify-end justify-center lg:place-self-end pb-5">
                    <div className="flex flex-col items-center lg:items-end gap-4">
                        <div className="mt-2">
                            <Image 
                                src="/assets/AurigitalChat2.svg" 
                                alt="logo" 
                                width={40} 
                                height={40}
                                className={`transition-transform duration-1000 ${textCompleted ? 'scale-110' : ''}`}
                            />
                        </div>
                        <div className="text-base md:text-xl font-mansfield font-semibold uppercase text-[#000000]/60">
                            {!showText && <JumpingDots />}
                            {showText && renderSecondaryText()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mx-auto max-w-7xl py-6" data-aos="fade-up">
                {excelenciaData.columns.map((columna, index) => (
                    <div 
                        key={index} 
                        className="rounded-xl overflow-hidden relative"
                        data-aos="fade-up"
                        data-aos-delay={(index + 1) * 100}
                    >
                        <div className="relative h-64 md:h-96">
                            <Image
                                src={`/assets/Frame 7${index + 2}.svg`}
                                alt={columna.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-700"
                                onError={(e) => {
                                    e.target.src = "/assets/AurigitalChat2.svg";
                                }}
                            />
                            
                            <div className="absolute bottom-0 left-0 p-6 w-full text-white z-10">
                                <div className="mb-2">
                                    <h3 className="text-white max-w-xs text-md md:text-3xl uppercase font-qurova font-medium tracking-wider mb-1">
                                        {columna.title}
                                    </h3>
                                    <p className="text-white text-xs md:text-base max-w-xl leading-tight font-mansfield font-light md:min-h-28">
                                        {columna.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Excelencia; 