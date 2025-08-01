"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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

        <div className="md:w-1/3 lg:text-right text-center max-w-80 flex lg:items-end items-center lg:justify-end justify-center lg:place-self-end pb-5">
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
        {/* Desktop Bento Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4 h-[52rem] xl:h-[60rem]">
          {/* Column 1 - Two cards stacked vertically */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Card 1 - Top half */}
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <div className="relative h-full">

                <Image
                  src={`/assets/Solucion1.avif`}
                  alt={testimonials[0]?.title || ""}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-6 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/proyectos"
                      className="bg-[#101010]/50 mb-4 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-sm px-4">
                        Ver Proyectos
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                    <h3 className="text-white text-base xl:text-lg uppercase font-qurova font-medium tracking-wider mb-2">
                      {testimonials[0]?.title}
                    </h3>
                    <p className="text-white text-sm xl:text-base leading-tight font-mansfield font-light">
                      {testimonials[0]?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Bottom half */}
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <div className="relative h-full">

                <Image
                  src={`/assets/Solucion2.avif`}
                  alt={testimonials[1]?.title || ""}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-6 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/proyectos"
                      className="bg-[#101010]/50 mb-4 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-sm px-4">
                        Ver Proyectos
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                    <h3 className="text-white text-base xl:text-lg uppercase font-qurova font-medium tracking-wider mb-2">
                      {testimonials[1]?.title}
                    </h3>
                    <p className="text-white text-sm xl:text-base leading-tight font-mansfield font-light">
                      {testimonials[1]?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Card 3 (75% height) + Green square (25% height) */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Card 3 - 75% height */}
            <div className="rounded-xl overflow-hidden relative" style={{ height: '75%' }}>
              <div className="relative h-full">

                <Image
                  src={`/assets/Solucion3.avif`}
                  alt={testimonials[2]?.title || ""}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-6 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/proyectos"
                      className="bg-[#101010]/50 mb-4 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-sm px-4">
                        Ver Proyectos
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                    <h3 className="text-white text-base xl:text-lg uppercase font-qurova font-medium tracking-wider mb-2">
                      {testimonials[2]?.title}
                    </h3>
                    <p className="text-white text-sm xl:text-base leading-tight font-mansfield font-light">
                      {testimonials[2]?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card - 25% height */}
            <div className="rounded-xl overflow-hidden relative" style={{ height: 'calc(25% - 1rem)' }}>
              <div className="relative h-full">
                <Image
                  src={`/assets/Soluciones.avif`}
                  alt="Soluciones digitales"
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                  <div className="text-center">
                    <h3 className="text-white text-xs xl:text-sm uppercase font-qurova font-medium tracking-wider leading-tight mb-3 max-w-[180px] text-center">
                      {excelenciaData.ctaCard.title}
                    </h3>
                    <a
                      href="/servicios"
                      className="bg-[#101010]/50 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-8 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-xs px-3">
                        {excelenciaData.ctaCard.button}
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300 flex-shrink-0">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3 - Two cards stacked vertically */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Card 4 - Top half */}
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <div className="relative h-full">

                <Image
                  src={`/assets/Solucion4.avif`}
                  alt={testimonials[3]?.title || ""}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-6 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/proyectos"
                      className="bg-[#101010]/50 mb-4 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-sm px-4">
                        Ver Proyectos
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                    <h3 className="text-white text-base xl:text-lg uppercase font-qurova font-medium tracking-wider mb-2">
                      {testimonials[3]?.title}
                    </h3>
                    <p className="text-white text-sm xl:text-base leading-tight font-mansfield font-light">
                      {testimonials[3]?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 - Bottom half */}
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <div className="relative h-full">

                <Image
                  src={`/assets/Solucion5.avif`}
                  alt={testimonials[4]?.title || ""}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-700 -z-10"
                  onError={(e) => {
                    e.target.src = "/assets/AurigitalChat2.svg";
                  }}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-black/0 -z-10" />

                <div className="absolute bottom-0 left-0 pt-6 pb-6 px-6 w-full text-white z-10">
                  <div className="mb-2">
                    <a
                      href="/proyectos"
                      className="bg-[#101010]/50 mb-4 max-w-[200px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                    >
                      <span className="text-sm px-4">
                        Ver Proyectos
                      </span>
                      <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 inline-flex items-center justify-center text-black duration-300">
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </a>
                    <h3 className="text-white text-base xl:text-lg uppercase font-qurova font-medium tracking-wider mb-2">
                      {testimonials[4]?.title}
                    </h3>
                    <p className="text-white text-sm xl:text-base leading-tight font-mansfield font-light">
                      {testimonials[4]?.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <div className="relative h-[31rem] sm:h-[26rem] md:h-[36rem]">

                    <Image
                      src={`/assets/Solucion${index + 1}.avif`}
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
                          href="/proyectos"
                          className="bg-[#101010]/50 mb-4 max-w-[220px] duration-300 group text-white hover:text-[#B2FF00] rounded-full px-6 py-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center whitespace-nowrap"
                        >
                          <span className="text-sm px-4">
                            Ver Proyectos
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