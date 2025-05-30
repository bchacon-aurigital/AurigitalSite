"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import { PiOfficeChairBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa";
import IconBadge from '../ui/IconBadge';

const Grid = () => {
    const [mounted, setMounted] = useState(false);
    const [showText, setShowText] = useState(false);
    const [shouldReset, setShouldReset] = useState(false);
    const EstamosAquiRef = useRef(null);
    const { translations, language } = useLanguage();

    const textParts = ["Aurigital nació porque vimos demasiado talento en Costa Rica perdiéndose en lo genérico. Marcas con visión, con alma, pero sin un espacio online que hiciera justicia a su calidad. Nosotros existimos para eso: para acompañar a quienes no se conforman, a quienes saben lo que valen y quieren una presencia digital que esté a la altura de su ambición."];
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
        <div className="flex space-x-1 justify-center items-center h-full">
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
            className="text-gray-700 rounded-lg overflow-hidden mt-12"
            role="contentinfo"
            data-aos="fade-up"
        >
            <div className="grid md:grid-rows-2 min-h-[150vh] md:min-h-screen md:h-[95vh] max-w-[110rem] mx-auto gap-4">
                <div className=" container relative py-12 px-4 mx-auto rounded-xl bg-white md:h-auto flex items-center max-w-[110rem]">
                    <div className="flex flex-col md:flex-row items-center text-center md:text-left  gap-8 justify-center mx-auto max-w-7xl w-full">
                        <Image
                            src="/assets/AurigitalChat.svg"
                            alt="logo"
                            width={100}
                            height={100}
                        />
                        <h2 className="text-2xl md:text-3xl font-qurova font-medium uppercase leading-tight">
                            {!showText && <JumpingDots />}
                            {showText && renderText()}
                        </h2>
                    </div>
                </div>

                <div className="container mx-auto w-full rounded-xl bg-[url('/assets/sobrenosotros/grid.avif')] bg-contain sm:bg-cover bg-no-repeat bg-center h-[50vh] md:h-full max-w-[110rem]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[110rem] mx-auto mt-8">
                <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-center justify-start">
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
                        <h3 className="text-3xl md:text-4xl xl:text-6xl font-qurova font-medium uppercase leading-tight mb-4">
                            <span className="text-white/50 ">TU</span><br />
                            <span className="text-white">CHICO<br />DE LA SILLA</span>
                        </h3>
                        <p className="text-white text-sm md:text-md font-mansfield font-medium leading-relaxed max-w-lg mx-auto">
                            <span className="text-white/50"> Piensa en nosotros como tu fuente de </span> experiencia tecnológica.<span className="text-white/50"> Al igual que ese </span>
                            "chico de la silla" <span className="text-white/50">en las películas, estamos aquí en nuestra base de </span>
                            operaciones digitales <span className="text-white/50 "> para darte la </span> inteligencia<span className="text-white/50 "> el </span> análisis <span className="text-white/50 "> y el</span> soporte técnico
                            <span className="text-white/50 "> que necesitas para que tú puedas enfocarte en la </span>acción principal de tu negocio, y alcanzar tus metas en el mundo online.
                        </p>
                    </div>
                </div>

                <div className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px]">
                    <Image
                        src="/assets/sobrenosotros/grid1.avif"
                        alt="Persona trabajando en computadora"
                        fill
                        className="object-cover object-center"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent"></div>
                </div>

                <div className="relative rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px]">
                    <Image
                        src="/assets/sobrenosotros/grid2.avif"
                        alt="Mujer programando"
                        fill
                        className="object-cover object-center"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                </div>

                <div className="relative bg-[#1E1E1E] rounded-xl overflow-hidden min-h-[400px] md:min-h-[480px] flex items-center justify-start">
                    <IconBadge
                        icon={FaCode}
                        iconColor="text-black"
                        bgColor="bg-[#B2FF00]"
                        position="top-right"
                        size="large"
                        darkBg="bg-[#101010]"
                        lightBg="bg-[#1E1E1E]"
                    />

                    <div className="text-left px-6">
                        <h3 className="text-3xl md:text-4xl xl:text-6xl font-qurova font-medium uppercase leading-tight mb-4 text-white">
                            poder <span className="text-white/50 ">y</span><br />
                            Flexibilidad <br />
                            <span className="text-white/50 "> del </span>Codigo.
                        </h3>
                        <p className="text-white text-sm md:text-md font-mansfield leading-relaxed max-w-lg mx-auto font-medium">
                        Somos ingenieros de software de corazón,<span className="text-white/50 "> y notamos una</span> brecha en el mercado:
                        <span className="text-white/50 "> una</span> oferta limitada de desarrollo web basado en código, <span className="text-white/50 ">a menudo</span> eclipsada por 
                        agencias de marketing <span className="text-white/50 ">donde la web es solo una pieza más. Para nosotros,</span> la web
                        es fundamental. <span className="text-white/50 ">Elegimos el código porque nos da la libertad de construir </span>  
                        soluciones completamente a medida, <span className="text-white/50 ">optimizadas para la</span> última tecnología, <span className="text-white/50 ">la </span> 
                        eficiencia <span className="text-white/50 ">y la</span> escalabilidad. <span className="text-white/50 ">No</span> buscamos el camino fácil, <span className="text-white/50 ">sino</span> la solución más
                        efectiva para tus problemas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grid;