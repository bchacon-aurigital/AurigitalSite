"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../context/LanguageContext';

const EstamosAqui = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const EstamosAquiRef = useRef(null);
    const { translations, language } = useLanguage();

    const textParts = translations.estamosAqui.typing;
    
    const totalText = textParts.join("");
    const [typedText, setTypedText] = useState("");
    
    useEffect(() => {
        if (mounted) {
            setTypedText("");
            setShouldReset(true);
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
        }
    }, [shouldReset]);

    useEffect(() => {
        if (!showText) return;
        
        if (typedText.length < totalText.length) {
            const typingTimer = setTimeout(() => {
                setTypedText(totalText.substring(0, typedText.length + 1));
            }, 30); 
            
            return () => clearTimeout(typingTimer);
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
            className="text-gray-700 pt-12 rounded-lg" 
            role="contentinfo" 
            data-aos="fade-up"
        >
            <div className="container mx-auto py-12 md:py-24 max-w-[110rem] rounded-lg bg-white px-4">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left md:items-start md:gap-20 gap-8 justify-center mx-auto max-w-7xl">
                    <Image src="/assets/AurigitalChat.svg" alt="logo" width={100} height={100} />
                    <h2 className="text-5xl font-qurova font-medium uppercase leading-tight">
                        {!showText && <JumpingDots />}
                        {showText && renderText()}
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default EstamosAqui;