"use client";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";

const Proyectos = () => {
    const { translations } = useLanguage();
    const proyectosData = translations.proyectosGaleria;

    return (
        <div
            id="portafolio"
            className="container relative mx-auto pt-12 max-w-[110rem] rounded-xl bg-[#101010] px-2 py-4 transition-all duration-1000 ease-in-out border border-[#5D5D5D]/30"
        >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mx-auto max-w-7xl items-center lg:items-end mb-12 text-center lg:text-left" data-aos="fade-up">
                <div className="lg:w-1/2 max-w-md">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-qurova font-medium uppercase leading-none text-white">
                        {proyectosData.title}
                    </h2>
                </div>
                
                <div className="lg:w-1/2 lg:text-right">
                    <p className="text-base md:text-lg font-mansfield font-medium text-white/90 leading-relaxed max-w-[33rem] lg:ml-auto">
                        {proyectosData.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto max-w-7xl">
                {proyectosData.cards.map((proyecto, index) => (
                    <div 
                        key={proyecto.id} 
                        className="relative rounded-2xl overflow-hidden group cursor-pointer mx-auto h-[300px] bg-[#1B1B1B]"
                        data-aos="fade-up"
                        data-aos-delay={(index + 1) * 100}
                    >
                        <div className="relative w-full h-full hover:scale-105 transition-all duration-300 flex flex-col justify-center items-center py-1 px-4">
                            <Image
                                src={`/assets/proyectos/ImgsProyectos/${proyecto.image}`}
                                alt={proyecto.title}
                                width={280}
                                height={100}
                                className="object-cover h-[170px] w-full mx-auto rounded-2xl"
                            />
                            
                            <div className="h-[100px] py-4 w-full text-white z-10">
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