"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

const Proyectos = () => {
    const { translations } = useLanguage();
    const proyectosData = translations.proyectos;

    return (
        <div
            className="container relative mx-auto pt-12 max-w-[110rem] rounded-lg bg-[#B2FF00] px-4 transition-all duration-1000 ease-in-out"
        >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mx-auto max-w-7xl items-center lg:items-end mb-12 text-center lg:text-left" data-aos="fade-up">
                <div className="lg:w-1/2 max-w-md">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-qurova font-medium uppercase leading-none text-black">
                        {proyectosData.title}
                    </h2>
                </div>
                
                <div className="lg:w-1/2 lg:text-right">
                    <p className="text-base md:text-lg font-mansfield font-medium text-black/80 leading-relaxed max-w-[33rem] lg:ml-auto">
                        {proyectosData.description}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mx-auto max-w-7xl">
                {proyectosData.cards.map((proyecto, index) => (
                    <div 
                        key={index} 
                        className="relative rounded-3xl overflow-hidden group cursor-pointer mx-auto w-[300px] "
                        data-aos="fade-up"
                        data-aos-delay={(index + 1) * 100}
                    >
                        <div className="relative w-[300px] h-[400px] hover:scale-[1.01] transition-all duration-300">
                            <Image
                                src={`/assets/${proyecto.image}`}
                                alt={proyecto.title}
                                fill
                                sizes="h-[400px] w-[300px]"
                                className="object-fill"
                                onError={(e) => {
                                    e.target.src = "/assets/AurigitalChat2.svg";
                                }}
                            />
                            
                            <div className="absolute h-[100px] bottom-8 left-0 p-4 md:p-6 w-full text-white z-10">
                                <h3 className="text-white text-base md:text-lg lg:text-xl uppercase font-qurova font-medium tracking-wider leading-tight">
                                    {proyecto.title}
                                </h3>
                                <p className="text-white/90 text-xs md:text-sm font-mansfield font-light leading-relaxed">
                                    {proyecto.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Proyectos; 