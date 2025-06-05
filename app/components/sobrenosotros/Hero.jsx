"use client";
import dynamic from "next/dynamic";
import { useLanguage } from '../../context/LanguageContext';
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Navbar = dynamic(() => import("../Navbar"), {
    ssr: false,
});

export default function Hero() {
    const { translations } = useLanguage();
    const heroData = translations.sobreNosotrosHero;

    const socialLinks = [
        {
            name: "WhatsApp",
            icon: FaWhatsapp,
            href: "https://wa.me/50688888169",
        },
        {
            name: "Instagram", 
            icon: FaInstagram,
            href: "https://instagram.com/aurigital", 
        },
        {
            name: "Facebook",
            icon: FaFacebookF,
            href: "https://facebook.com/aurigital", 
        },
        {
            name: "LinkedIn",
            icon: FaLinkedinIn,
            href: "https://linkedin.com/company/aurigital", 
        }
    ];

    return (
        <section
            className="relative h-[95vh] w-full overflow-hidden bg-[#B2FF00] mx-auto max-w-[110rem] rounded-xl"
            role="banner"
            aria-label="Hero section"
            data-aos="fade-in"
        >
            <div
                className="absolute right-0 top-0 h-screen w-full lg:w-1/2 pointer-events-none"
                aria-hidden="true"
            >
                <Image
                    className="absolute object-cover w-full h-full"
                    src="/assets/sobrenosotros/BGhero.svg"
                    alt="Hero background"
                    fill
                    priority
                />
            </div>

            <Navbar
                textColor="text-black"
                buttonBgColor="bg-black"
                buttonTextColor="text-[#B2FF00]"
                buttonTextColorHover="hover:text-white"
                buttonHoverColor="hover:bg-[#000000]"
                logoVariant="dark"
                linkHoverColor="hover:text-[#B2FF00]"
            />

            <div className="container mx-auto px-4 md:px-12 flex flex-col justify-start lg:justify-center h-[95vh] mt-[1rem] lg:mt-0">
                <div className="w-full mx-auto text-white flex flex-col items-center" data-aos="fade-up" data-aos-delay="200">

                    <h1 
                        className=" text-[4rem] leading-none sm:text-[5rem]  md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[16rem] font-bold transition-transform duration-1000 ease-in-out font-qurova text-black" 
                        data-aos="fade-up" 
                        data-aos-delay="400"
                    >
                        {heroData.title}
                    </h1>

                    <p 
                        className="text-lg md:text-4xl text-black font-qurova uppercase font-normal mr-auto" 
                        data-aos="fade-up" 
                        data-aos-delay="500"
                        dangerouslySetInnerHTML={{ __html: heroData.subtitle }}
                    />
                </div>
            </div>

            <div 
                className="absolute bottom-0 left-0 right-0 h-[16vh] bg-gradient-to-t from-[#A7F10E] to-transparent pointer-events-none"
                aria-hidden="true"
            />

            <div className="hidden lg:block absolute bottom-3 right-0 p-6" data-aos="fade-up" data-aos-delay="600">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                        {socialLinks.map((social, index) => {
                            const IconComponent = social.icon;
                            return (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        flex items-end justify-start gap-3 px-6 py-4 
                                        bg-transparent
                                        border border-black rounded-tl-[2rem]
                                        text-black font-mansfield font-medium
                                        transition-all duration-300 ease-in-out
                                        transform hover:scale-105 hover:shadow-lg
                                    `}
                                >
                                    <IconComponent className="text-2xl text-black" />
                                    <span className="text-xl font-medium">{social.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}