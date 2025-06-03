"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import IconBadge from "../ui/IconBadge";
import { FaBook } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import { IoMailOpenSharp } from "react-icons/io5";

const iconMap = {
    "FaBook": FaBook,
    "MdManageSearch": MdManageSearch,
    "IoMailOpenSharp": IoMailOpenSharp
};

const BannerServicios = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [textCompleted, setTextCompleted] = useState(false);
    const bannerRef = useRef(null);
    const { translations, language } = useLanguage();

    const bannerData = translations.bannerServicios;

    const secondaryTextParts = bannerData.animatedText;

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
            if (bannerRef.current && isInViewport(bannerRef.current) && !showText) {
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
            if (index === 3 || index === 1 || index === 6) {
                textClass = "text-[#FFFFFF]/60";
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
                    className="w-4 h-4 bg-[#101010] rounded-full animate-bounce"
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
            ref={bannerRef}
            className="container relative mx-auto py-12 max-w-[110rem] rounded-xl bg-[#363636] px-4 transition-all duration-1000 ease-in-out"
            role="contentinfo"
            data-aos="fade-up"
        >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mx-auto max-w-7xl items-center lg:items-end">
                <div className="md:w-1/3 lg:text-left text-center flex lg:items-start items-center lg:justify-start pb-5">
                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <div className="mt-2">
                            <Image
                                src="/assets/AurigitalChat.svg"
                                alt="logo"
                                width={40}
                                height={40}
                                className={`transition-transform duration-1000 ${textCompleted ? 'scale-110' : ''}`}
                            />
                        </div>
                        <div className="text-base md:text-xl font-mansfield font-semibold uppercase text-[#FFFFFF]">
                            {!showText && <JumpingDots />}
                            {showText && renderSecondaryText()}
                        </div>
                    </div>
                </div>

                <div className="lg:w-2/3 flex items-end justify-end">
                    <h2 className="text-3xl sm:text-7xl font-qurova font-normal uppercase leading-none text-center lg:text-right">
                        <span className="text-[#FFFFFF]/50 block">{bannerData.title.part1}</span>
                        <span className="text-[#FFFFFF]/90 block">{bannerData.title.part2}</span>
                    </h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mx-auto max-w-7xl py-6 mt-4" data-aos="fade-up">
                {bannerData.cards.map((card, index) => (
                    <div
                        key={index}
                        className="rounded-xl overflow-hidden relative border border-[#E0E0E0]"
                        data-aos="fade-up"
                        data-aos-delay={(index + 1) * 100}
                    >
                        <div className="relative h-80 sm:h-72 md:h-96 flex flex-col justify-between">
                            <IconBadge
                                icon={iconMap[card.icon]}
                                iconColor="text-white"
                                bgColor="bg-[#101010]"
                                position="top-right"
                                size="large"
                                darkBg="bg-[white]"
                                lightBg="bg-[#363636]"
                            />

                            <div className="flex flex-col justify-end h-full pt-16 p-8">
                                <h3 className="text-[#E0E0E0]/90 text-md md:text-3xl uppercase font-qurova font-medium tracking-wider mb-1">
                                    {card.title.split('\n').map((line, i) => (
                                        i > 0 ? (
                                            <span key={i}>
                                                <br />
                                                {line}
                                            </span>
                                        ) : line
                                    ))}
                                </h3>
                                <p className="text-[#E0E0E0]/60 text-xs md:text-base leading-tight font-mansfield font-light">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerServicios; 