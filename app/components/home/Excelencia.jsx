"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import IconBadge from "../ui/IconBadge";
import { HiCheckBadge } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const iconMap = {
  HiCheckBadge: HiCheckBadge,
  FaStar: FaStar,
};

const Excelencia = () => {
  const [mounted, setMounted] = useState(false);
  const [showText, setShowText] = useState(false);

  const [shouldReset, setShouldReset] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textCompleted, setTextCompleted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const excelenciaRef = useRef(null);
  const testimonialRef = useRef(null);
  const { translations, language } = useLanguage();
  const servicesData = translations.servicesGrid;

  const excelenciaData = translations.excelencia;
  const secondaryTextParts = excelenciaData.animatedText;
  const totalText = secondaryTextParts.join("");
  const testimonials = excelenciaData.columns || [];

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
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  useEffect(() => {
    setMounted(true);

    const checkVisibility = () => {
      if (excelenciaRef.current && isInViewport(excelenciaRef.current) && !showText) {
        setShowText(true);
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

  // Carousel navigation functions
  const nextSlide = () => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const prevSlide = () => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Touch handlers for mobile swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

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
        visiblePart = typedText.substring(
          startPos,
          Math.min(currentLength, typedText.length)
        );
      }

      let textClass = "";
      if (index === 1 || index === 3 || index === 5 || index === 7) {
        textClass = "text-[#000000]";
      }

      return (
        <span key={`${language}-${index}`} className={textClass}>
          {visiblePart.split("\n").map((line, i) =>
            i > 0 ? (
              <span key={i}>
                <br />
                {line}
              </span>
            ) : (
              line
            )
          )}
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
            animationDuration: "0.6s",
          }}
        ></div>
      ))}
    </div>
  );

  return (
    <div
      ref={excelenciaRef}
      className="container relative mx-auto py-12 max-w-[110rem] rounded-xl bg-white px-4 transition-all duration-1000 ease-in-out"
      role="contentinfo"
      data-aos="fade-up"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mx-auto max-w-7xl items-center lg:items-end">
        <div className="lg:w-2/3 flex items-end">
          <h2 className="text-3xl sm:text-5xl lg:text-[6rem] font-qurova font-medium uppercase leading-none text-center lg:text-left">
            <span className="text-[#BBBBBB] block">
              {excelenciaData.title.part1}
            </span>
            <span className="text-black block">
              {excelenciaData.title.part2}
            </span>
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
                className={`transition-transform duration-1000 ${
                  textCompleted ? "scale-110" : ""
                }`}
              />
            </div>
            <div className="text-base md:text-xl font-mansfield font-semibold uppercase text-[#000000]/60">
              {!showText && <JumpingDots />}
              {showText && renderSecondaryText()}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mx-auto max-w-7xl py-6">
        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6">
          {testimonials.map((columna, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden relative"
            >
              <div className="relative h-96 sm:h-80 md:h-[28rem]">
                <IconBadge
                  icon={iconMap[columna.icono]}
                  iconColor="text-white"
                  bgColor="bg-[#ABCD1F]"
                  position="top-left"
                  size="large"
                  darkBg="bg-white"
                  lightBg="bg-[#9cb11a]"
                />

                <Image
                  src={`/assets/Frame 7${index + 2}.avif`}
                  alt={columna.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-3 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/servicios"
                      className="bg-[#101010]/50 mb-4 max-w-[160px] duration-300 group text-white hover:text-[#B2FF00] rounded-full p-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center"
                    >
                      <span className="text-sm px-2">
                        {servicesData.cards.webDevelopment.button}
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </a>
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

        {/* Mobile Carousel View */}
        <div className="lg:hidden relative">
          <div 
            ref={testimonialRef}
            className="overflow-hidden rounded-xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                willChange: 'transform'
              }}
            >
              {testimonials.map((columna, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="relative h-96 sm:h-80 md:h-[28rem]">
                    <IconBadge
                      icon={iconMap[columna.icono]}
                      iconColor="text-white"
                      bgColor="bg-[#ABCD1F]"
                      position="top-left"
                      size="large"
                      darkBg="bg-white"
                      lightBg="bg-[#9cb11a]"
                    />

                    <Image
                      src={`/assets/Frame 7${index + 2}.avif`}
                      alt={columna.title}
                      fill
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-700 -z-10"
                      onError={(e) => {
                        e.target.src = "/assets/AurigitalChat2.svg";
                      }}
                    />

                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                    <div className="absolute bottom-0 left-0 pt-6 pb-3 px-6 w-full text-white z-10">
                      <div className="mb-2">
                        <a
                          href="/servicios"
                          className="bg-[#101010]/50 mb-4 max-w-[160px] duration-300 group text-white hover:text-[#B2FF00] rounded-full p-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center"
                        >
                          <span className="text-sm px-2">
                            {servicesData.cards.webDevelopment.button}
                          </span>
                          <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center text-black duration-300">
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                        </a>
                        <h3 className="text-white max-w-xs text-md md:text-3xl uppercase font-qurova font-medium tracking-wider mb-1">
                          {columna.title}
                        </h3>
                        <p className="text-white text-xs md:text-base max-w-xl leading-tight font-mansfield font-light">
                          {columna.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isTransitioning}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-[#ABCD1F] scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  } disabled:cursor-not-allowed`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Excelencia;