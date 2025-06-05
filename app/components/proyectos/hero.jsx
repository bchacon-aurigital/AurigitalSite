"use client";
import dynamic from "next/dynamic";
import { useLanguage } from '../../context/LanguageContext';
import { LuArrowDownLeft } from "react-icons/lu";

const Navbar = dynamic(() => import("../../components/Navbar"), {
    ssr: false,
});

export default function Hero() {
    const { translations } = useLanguage();
    
    return (
        <section
            className="relative h-[95vh] w-full overflow-hidden bg-[#00BBFF] mx-auto max-w-[110rem] rounded-xl"
            role="banner"
            aria-label="Hero section"
            data-aos="fade-in"
        >
            <Navbar 
                textColor="text-white"
                menuColor="bg-white"
                buttonBgColor="bg-white"
                buttonTextColor="text-[#00BBFF]"
                buttonTextColorHover="hover:text-white"
                buttonHoverColor="hover:bg-[#004A5C]"
                logoVariant="light"
                linkHoverColor="hover:text-[#005D7F]"
            />
            <div className="mx-auto h-[90vh] w-full flex items-center lg:items-end px-6 md:px-12 pb-8 md:pb-12">
                <div className="w-full text-white" data-aos="fade-up" data-aos-delay="200">
                    
                    <div className="flex flex-col items-center justify-center lg:flex-row lg:items-end lg:justify-between">
                        
                        <div className="flex-1 ">
                            <h1 className="text-5xl lg:text-[5rem] font-medium leading-none font-qurova uppercase text-white text-center lg:text-left">
                                <span className="text-[#005D7F] block"> 
                                    {translations.heroProyectos.title.part1} <br className="hidden sm:block" /> {translations.heroProyectos.title.part2}
                                </span>
                                {translations.heroProyectos.title.part3}
                            </h1>
                        </div>
                        
                        <div className="flex-shrink-0 flex flex-col items-center lg:items-end lg:justify-end lg:max-w-md" data-aos="fade-up" data-aos-delay="500">
                            <LuArrowDownLeft className="hidden lg:block text-white w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-6 lg:mb-9" />
                            <p className="text-base lg:text-2xl font-mansfield font-light leading-relaxed text-center lg:text-right uppercase mb-3">
                                <span className="text-black/60">{translations.heroProyectos.description.spans[0].text}</span> proyecto <span className="text-black/60">{translations.heroProyectos.description.spans[1].text}</span> colaboración profunda <span className="text-black/60">{translations.heroProyectos.description.spans[2].text}</span> compromiso <span className="text-black/60">{translations.heroProyectos.description.spans[3].text}</span> excelencia.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}