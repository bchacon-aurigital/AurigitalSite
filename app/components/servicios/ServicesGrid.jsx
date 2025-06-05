"use client";
import { ShoppingCart, FileText, Calendar, ArrowDownRight, ArrowRight } from "lucide-react";
import { GrCatalogOption } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import IconBadge from "../ui/IconBadge";
import { useLanguage } from '../../context/LanguageContext';
import { useChat } from '../../context/ChatContext';

const ServicesGrid = () => {
    const { translations } = useLanguage();
    const { openChat } = useChat();
    const servicesData = translations.servicesGrid;

    const services = [
        {
            id: 1,
            title: servicesData.services[0].title,
            description: servicesData.services[0].description,
            icon: FileText,
        },
        {
            id: 2,
            title: servicesData.services[1].title,
            description: servicesData.services[1].description,
            icon: ShoppingCart,
        },
        {
            id: 3,
            title: servicesData.services[2].title,
            description: servicesData.services[2].description,
            icon: GrCatalogOption,
        },
        {
            id: 4,
            title: servicesData.services[3].title,
            description: servicesData.services[3].description,
            icon: Calendar,
        },
    ];

    const renderTextWithSpans = (text) => {
        return text.split('<span>').map((part, index) => {
            if (part.includes('</span>')) {
                const [spanText, remainingText] = part.split('</span>');
                return (
                    <span key={index}>
                        <span className="text-[#FFFFFF]">{spanText}</span>
                        {remainingText}
                    </span>
                );
            }
            return part;
        });
    };

    return (
        <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div 
                    className="md:col-span-2 lg:col-span-2 bg-[#B2FF00] rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-center min-h-[250px] sm:min-h-[300px] lg:min-h-[400px]"
                    data-aos="fade-right"
                >
                    <div className="flex flex-col gap-3 sm:gap-4">
                        <ArrowDownRight className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 text-black" />
                        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl mt-4 sm:mt-6 lg:mt-8 xl:mt-12 font-medium text-black leading-tight font-qurova">
                            {servicesData.mainTitle}
                        </h1>
                    </div>
                </div>

                <div className="md:col-span-2 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div 
                        className="sm:col-span-2 bg-[#101010] border border-[#515151] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white flex h-full items-center"
                        data-aos="fade-left"
                        data-aos-delay="100"
                    >
                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#FFFFFF]/60 leading-tight sm:leading-none">
                            {renderTextWithSpans(servicesData.description)}
                        </p>
                    </div>

                    <div 
                        className="bg-[#101010] border border-[#515151] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-[#E0E0E0] justify-between flex flex-col"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 
                            className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 sm:mb-2 font-qurova"
                            dangerouslySetInnerHTML={{ __html: servicesData.cards.webDevelopment.title }}
                        />
                        <a 
                            href="#Desarrollo-Web"
                            className="bg-[#101010] w-full sm:max-w-[160px] duration-300 group text-white hover:text-[#B2FF00] rounded-full p-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center"
                        >
                            <span className="text-sm px-2">{servicesData.cards.webDevelopment.button}</span>
                            <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center text-black duration-300">
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                        </a>
                    </div>

                    <div 
                        className="bg-[#101010] border border-[#515151] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-[#E0E0E0] justify-between flex flex-col"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 
                            className="text-lg sm:text-xl lg:text-2xl font-medium mb-3 sm:mb-2 font-qurova"
                            dangerouslySetInnerHTML={{ __html: servicesData.cards.customFunctionalities.title }}
                        />
                        <a 
                            href="#Funcionalidades-Personalizadas"
                            className="bg-[#101010] w-full sm:max-w-[160px] duration-300 group text-white hover:text-[#B2FF00] rounded-full p-2 border border-[#515151] hover:border-[#B2FF00] transition-colors flex flex-row items-center justify-center"
                        >
                            <span className="text-sm px-2">{servicesData.cards.customFunctionalities.button}</span>
                            <div className="bg-white rounded-full p-1 group-hover:bg-[#B2FF00] transition-colors w-6 h-6 sm:w-8 sm:h-8 inline-flex items-center justify-center text-black duration-300">
                                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                            </div>
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:col-span-2 lg:col-span-2 gap-4">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className={`bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative`}
                            data-aos="fade-up"
                            data-aos-delay={100 + (index * 100)}
                        >
                            <IconBadge
                                icon={service.icon}
                                iconColor="text-[#B2FF00]"
                                bgColor="bg-[#1E1E1E]"
                                position="top-right"
                                size="large"
                                darkBg="bg-[#101010]"
                                lightBg="bg-[#1E1E1E]"
                            />
                            <div className="flex flex-col h-56 lg:h-72 justify-end">
                                <h3 className={`text-white text-xl sm:text-2xl lg:text-3xl font-normal mb-2 font-qurova uppercase`}>
                                    {service.title}
                                </h3>
                                <p className={`text-[#D4D4D4]/60 text-md xl:text-lg leading-tight sm:leading-none`}>
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 md:col-span-2">
                    <div 
                        className="bg-[#00A8E6] rounded-2xl p-6 sm:p-8 lg:px-8 text-black text-left sm:text-right flex flex-col items-start sm:items-end justify-center min-h-[200px] sm:min-h-[250px]"
                        data-aos="fade-right"
                        data-aos-delay="200"
                    >
                        <h2 
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-tight sm:leading-none font-qurova"
                            dangerouslySetInnerHTML={{ __html: servicesData.bottomSection.mainCard.title }}
                        />
                        <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-full sm:max-w-2xl mt-4">
                            {servicesData.bottomSection.mainCard.description}
                        </p>
                    </div>

                    <div 
                        className={`bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative`}
                        data-aos="fade-left"
                        data-aos-delay="300"
                    >
                        <IconBadge
                            icon={TfiWorld}
                            iconColor="text-[#B2FF00]"
                            bgColor="bg-[#1E1E1E]"
                            position="top-right"
                            size="large"
                            darkBg="bg-[#101010]"
                            lightBg="bg-[#1E1E1E]"
                        />

                        <div className="flex flex-col h-48 lg:h-full justify-end">
                            <h3 className={`text-white text-xl sm:text-2xl lg:text-3xl font-normal mb-2 font-qurova uppercase`}>
                                {servicesData.bottomSection.landingCard.title}
                            </h3>
                            <p className={`text-[#D4D4D4]/60 text-sm sm:text-base lg:text-lg leading-tight sm:leading-none max-w-full sm:max-w-md`}>
                                {servicesData.bottomSection.landingCard.description}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesGrid; 