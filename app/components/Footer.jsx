"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContactAction } from '../hooks/useContactAction';
import { useLanguage } from '../context/LanguageContext';
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
    const { translations } = useLanguage();
    
    useEffect(() => {
        AOS.init({
          once: true,
          offset: 100,
        });
      }, []);

    const [mounted, setMounted] = useState(false);
    const handleContactClick = useContactAction();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <footer className="text-gray-700 pt-12 rounded-lg p-2" role="contentinfo" data-aos="fade-up">
            <div className="container mx-auto border-t border-[#2F2F2F]/40 py-12 max-w-[110rem] rounded-lg bg-white px-5 p-2">
                <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center" data-aos="fade-right" data-aos-delay="100">
                        <Image
                            src="./assets/logoFooter.svg"
                            alt="AURIGITAL Logo"
                            width={260}
                            height={180}
                            className="mb-4"
                            priority
                        />
                        <p className="text-xl max-w-[15rem] font-mansfield font-extralight text-center">
                            {translations.footer.slogan}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center md:text-left mb-5" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-lg font-medium mb-2 font-qurova">{translations.footer.sections.resources.title}</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/terminos-condiciones" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.resources.links.terms}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/reservaciones" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.resources.links.reservations}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/portafolio" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.resources.links.portfolio}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5" data-aos="fade-up" data-aos-delay="300">
                            <h3 className="text-lg font-medium mb-2 font-qurova">{translations.footer.sections.information.title}</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/sobre-nosotros" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.aboutUs}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/testimonios" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.testimonials}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/beneficios" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.benefits}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/servicios" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.services}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/proyectos" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.projects}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-lg font-medium mb-2 font-qurova">{translations.footer.sections.contact.title}</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/whatsapp" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.whatsapp}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/instagram" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.instagram}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/facebook" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.facebook}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/linkedin" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.linkedin}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/direccion" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.address}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 py-4 border-t border-[#2F2F2F]/40 max-w-7xl mx-auto">
                    <p className="text-md mb-4 md:mb-0" data-aos="fade-right" data-aos-delay="100">{translations.footer.copyright}</p>
                    <div className="grid md:grid-cols-4 gap-3 px-2" data-aos="fade-left" data-aos-delay="200">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="WhatsApp"
                            data-aos="zoom-in" data-aos-delay="300"
                        >
                            <FaWhatsapp className='w-5 h-5' /> {translations.footer.socialMedia.whatsapp}
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Instagram"
                            data-aos="zoom-in" data-aos-delay="400"
                        >
                            <FaInstagram className='w-5 h-5' /> {translations.footer.socialMedia.instagram}
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Facebook"
                            data-aos="zoom-in" data-aos-delay="500"
                        >
                            <FaFacebook className='w-5 h-5' /> {translations.footer.socialMedia.facebook}
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="LinkedIn"
                            data-aos="zoom-in" data-aos-delay="600"
                        >
                            <FaLinkedin className='w-5 h-5' /> {translations.footer.socialMedia.linkedin}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;