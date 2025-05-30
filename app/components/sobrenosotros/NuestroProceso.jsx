"use client";

import { useLanguage } from '../../context/LanguageContext';

const NuestroProceso = () => {
    const { translations } = useLanguage();
    const procesoData = translations.nuestroProceso;

    return (
        <section className="relative w-full overflow-hidden bg-[#101010] mx-auto max-w-[110rem] rounded-xl border border-[#343434] cursor-default">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 sm:mb-16 border-b border-white/10 pb-6 sm:pb-8">
                    <div className="w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-white font-qurova leading-tight">
                            {procesoData.title.part1}<br />
                            {procesoData.title.part2}
                        </h2>
                    </div>

                    <div className="w-full lg:w-1/2 lg:pl-8 xl:pl-12">
                        <p 
                            className="text-white/70 text-base sm:text-lg leading-tight font-mansfield text-left lg:text-right"
                            dangerouslySetInnerHTML={{ __html: procesoData.description }}
                        />
                    </div>
                </div>

                {/* Proceso Steps */}
                <div className="space-y-6 sm:space-y-8">
                    {procesoData.steps.map((proceso, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-start border-b border-white/10 pb-6 sm:pb-8 group hover:border-[#B2FF00]/30 transition-all duration-300 gap-4 sm:gap-6 lg:gap-14"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            {/* Número */}
                            <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center">
                                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white group-hover:text-[#B2FF00]/40 transition-colors duration-300 font-mansfield font-semibold leading-none">
                                    {proceso.numero}
                                </span>
                            </div>

                            {/* Contenido */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-white group-hover:text-[#B2FF00] transition-colors duration-300 font-qurova mb-2 sm:mb-3 leading-tight">
                                    {proceso.titulo}
                                </h3>
                                <p className="text-white/50 text-sm sm:text-base lg:text-lg leading-relaxed font-qurova group-hover:text-white/90 transition-colors duration-300">
                                    {proceso.descripcion}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NuestroProceso; 