"use client";

import IconBadge from "../ui/IconBadge";
import { PiDiamondsFourFill } from "react-icons/pi";
import { TiFlowMerge } from "react-icons/ti";
import { FaTools } from "react-icons/fa";
import { HiLightBulb } from "react-icons/hi";
import { FaCoins } from "react-icons/fa6";
import { TbPlugConnected } from "react-icons/tb";
import { LuArrowDownLeft } from "react-icons/lu";
import { useLanguage } from '../../context/LanguageContext';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const ServicesSection = () => {
    const { translations } = useLanguage();
    const serviciosData = translations.serviciosPersonalizados;

    useEffect(() => {
        AOS.init({
            once: true,
            offset: 100,
        });
    }, []);

    const serviceIcons = [
        PiDiamondsFourFill,
        TiFlowMerge,
        FaTools,
        HiLightBulb,
        FaCoins,
        TbPlugConnected
    ];

    return (
        <section className="container relative mx-auto py-12 max-w-[110rem] rounded-xl bg-white px-4 transition-all duration-1000 ease-in-out" data-aos="fade-up">
            <div className="hidden lg:block absolute top-5 right-5" data-aos="fade-down" data-aos-delay="200">
                <LuArrowDownLeft className="text-black w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-6 lg:mb-9" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 lg:mt-20" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#101010]/50 mb-4 font-qurova font-medium">
                        {serviciosData.title.part1} <br />
                        <span className="text-[#000000]">{serviciosData.title.part2}</span>
                    </h2>
                    <p className="text-[#000000]/60 text-lg max-w-3xl mx-auto leading-tight font-mansfield font-medium">
                        {serviciosData.description}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {serviciosData.services.map((service, index) => (
                        <div
                            key={index}
                            className="relative bg-[#E0E0E0] rounded-3xl p-8 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 group"
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 100}
                        >
                            <IconBadge
                                icon={serviceIcons[index]}
                                position="top-left"
                                size="large"
                                bgColor="bg-[#BCBCBC]"
                                iconColor="text-black"
                                darkBg="bg-white"
                                lightBg="bg-[#E0E0E0]"
                            />

                            <div className="flex flex-col justify-end h-64">
                                <h3 className="text-black font-medium font-qurova text-2xl mb-1 leading-tight">
                                    {service.title}
                                </h3>
                                <p className="text-[#1E1E1E]/60 font-mansfield font-medium leading-tight text-sm">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection; 