"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { PiOfficeChairBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import IconBadge from "../ui/IconBadge";

const Grid = () => {
  const [mounted, setMounted] = useState(false);
  const [showText, setShowText] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);
  const EstamosAquiRef = useRef(null);
  const { translations, language } = useLanguage();
  const gridData = translations.sobreNosotrosGrid;

  const textParts = [gridData.introText];
  const totalText = textParts.join("");
  const [typedText, setTypedText] = useState("");

  const renderTextWithSpans = (text) => {
    return text.split("<span>").map((part, index) => {
      if (part.includes("</span>")) {
        const [spanText, remainingText] = part.split("</span>");
        return (
          <span key={index}>
            <span className="text-white/50">{spanText}</span>
            {remainingText}
          </span>
        );
      }
      return part;
    });
  };

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
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  useEffect(() => {
    setMounted(true);

    const checkVisibility = () => {
      if (
        EstamosAquiRef.current &&
        isInViewport(EstamosAquiRef.current) &&
        !showText
      ) {
        setShowText(true);
        window.removeEventListener("scroll", checkVisibility);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
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
      }, 15);

      return () => clearTimeout(typingTimer);
    }
  }, [typedText, showText, totalText]);

  if (!mounted) {
    return null;
  }

  const renderText = () => {
    const words = typedText.split(/(\s+)/);

    return words.map((word, index) => {
      if (word.trim() === "") {
        return word;
      }

      const wordIndex = words
        .slice(0, index)
        .filter((w) => w.trim() !== "").length;
      const isGray = wordIndex % 2 === 0;

      return (
        <span
          key={`${language}-${index}`}
          className={isGray ? "text-[#010101]" : "text-[#010101]"}
        >
          {word}
        </span>
      );
    });
  };

  const JumpingDots = () => (
    <div className="flex space-x-1 justify-center items-center h-full">
      {[0, 1, 2].map((dot) => (
        <div
          key={dot}
          className="w-5 h-5 bg-gray-700 rounded-full animate-bounce"
          style={{
            animationDelay: `${dot * 0.2}s`,
            animationDuration: "0.6s",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      ref={EstamosAquiRef}
      className="text-gray-700 rounded-lg overflow-hidden"
      role="contentinfo"
      data-aos="fade-up"
    >
      <div className="max-w-[110rem] mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          <div className="container relative py-16 px-8 lg:py-20 lg:px-12 mx-auto rounded-xl bg-white md:h-auto flex items-center">
            <div className="flex flex-col lg:flex-col items-center text-center lg:text-left gap-8 lg:gap-4 justify-center mx-auto w-full lg:items-start">
              <Image
                src="/assets/AurigitalChat.svg"
                alt="logo"
                width={100}
                height={100}
                className="lg:self-start"
              />
              <h2 className="text-xl md:text-2xl lg:text-[1.7rem] font-red-hat font-medium leading-tight">
                {!showText && <JumpingDots />}
                {showText && renderText()}
              </h2>
            </div>
          </div>

          <div className="container mx-auto w-full rounded-xl bg-[url('/assets/sobrenosotros/grid.avif')] bg-cover bg-no-repeat bg-center h-full min-h-[400px] lg:min-h-[480px]" />
        </div>
      </div>
      <div
        className="relative bg-[#1E1E1E] w-full rounded-xl mt-2 lg:mt-3 overflow-hidden min-h-[400px] md:min-h-[480px] flex items-center justify-center"
        data-aos="fade-left"
        data-aos-delay="400"
      >
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-40"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/assets/sobrenosotros/sn-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Optional dark overlay for text readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />

        {/* Foreground Content */}
        {/* <IconBadge
          icon={FaCode}
          iconColor="text-black"
          bgColor="bg-[#B2FF00]"
          position="top-right"
          size="large"
          darkBg="bg-[#101010]"
          lightBg="bg-[#1E1E1E]"
        /> */}

        <div className="relative z-10 px-6 text-center justify-center">
          <h3
            className="text-3xl md:text-4xl xl:text-6xl font-space-grotesk font-medium uppercase leading-tight mb-4 text-white"
            dangerouslySetInnerHTML={{
              __html: gridData.cards.codeFlexibility.title,
            }}
          />
          <p className="text-white text-base md:text-lg lg:text-xl font-red-hat leading-relaxed max-w-2xl mx-auto font-medium">
            {renderTextWithSpans(gridData.cards.codeFlexibility.description)}
          </p>
        </div>
      </div>

      <div className="hidden grid-cols-1 md:grid-cols-2 gap-6 max-w-[110rem] mx-auto mt-6">
        <div
          className="relative bg-[#1E1E1E] rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-center justify-start"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <IconBadge
            icon={PiOfficeChairBold}
            iconColor="text-black"
            bgColor="bg-[#00BBFF]"
            position="top-right"
            size="large"
            darkBg="bg-[#101010]"
            lightBg="bg-[#1E1E1E]"
          />

          <div className="text-left px-6">
            <h3 className="text-3xl md:text-4xl xl:text-6xl font-space-grotesk font-medium uppercase leading-tight mb-4">
              <span className="text-white/50">
                {gridData.cards.chairGuy.title.part1}
              </span>
              <br />
              <span
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: gridData.cards.chairGuy.title.part2,
                }}
              />
            </h3>
            <p className="text-white text-sm md:text-md font-red-hat font-medium leading-relaxed max-w-lg mx-auto">
              {renderTextWithSpans(gridData.cards.chairGuy.description)}
            </p>
          </div>
        </div>

        <div
          className="hidden md:flex relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <Image
            src="/assets/sobrenosotros/grid1.avif"
            alt="Persona trabajando en computadora"
            fill
            className=" object-cover object-center"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Grid;
