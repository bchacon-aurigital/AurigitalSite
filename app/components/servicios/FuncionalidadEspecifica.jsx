"use client";
import React, { useEffect, Fragment } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import AOS from "aos";
import "aos/dist/aos.css";

const FuncionalidadEspecifica = () => {
    const { translations } = useLanguage();

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 100,
        });
    }, []);

    const renderTextWithSpans = (text) => {
        const parts = text.split('<span>').map((part, index) => {
            if (part.includes('</span>')) {
                const [spanText, remainingText] = part.split('</span>');
                return (
                    <Fragment key={index}>
                        <span className="text-[#101010]">{spanText}</span>
                        {remainingText}
                    </Fragment>
                );
            }
            return part;
        });
        return parts;
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#00BBFF] mx-auto max-w-[110rem] rounded-xl" data-aos="fade-up">
            <div className="container mx-auto max-w-7xl px-4 py-8 sm:py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                    <div className="flex-1 text-center lg:text-left" data-aos="fade-right" data-aos-delay="100">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-[#101010]/50 font-qurova leading-tight uppercase">
                            {translations.funcionalidadEspecifica.title.part1}
                            <br />
                            <span className="text-[#101010]">
                                {translations.funcionalidadEspecifica.title.part2}
                                <br />
                                {translations.funcionalidadEspecifica.title.part3}
                            </span>
                        </h2>
                    </div>

                    <div className="flex-1 text-center lg:text-right" data-aos="fade-left" data-aos-delay="200">
                        <p className="text-sm sm:text-base lg:text-md text-[#101010]/50 font-mansfield font-medium leading-relaxed max-w-2xl uppercase">
                            {renderTextWithSpans(translations.funcionalidadEspecifica.description)}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FuncionalidadEspecifica; 