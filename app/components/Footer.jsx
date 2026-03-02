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
    const { translations, language } = useLanguage();
    
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

    const getTermsUrl = () => {
        return language === 'es' 
            ? '/Docs/TerminosyCondicionesES.pdf' 
            : '/Docs/Terms&ConditionsEN.pdf';
    };

    if (!mounted) {
        return null;
    }

    return (
        <footer className="text-gray-700 mt-6 rounded-lg" role="contentinfo">
            <div className="container mx-auto border-t border-[#2F2F2F]/40 py-12 max-w-[110rem] rounded-xl bg-white px-5 p-2">
                <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col items-start" data-aos="fade-right" data-aos-delay="100">
                        <Image
                            src="./assets/logo-negro.svg"
                            alt="AURIGITAL Logo"
                            width={260}
                            height={180}
                            className="mb-4"
                            priority
                            unoptimized={true}
                        />
                        <p className="text-3xl font-space-grotesk font-bold text-left leading-tight tracking-tight whitespace-nowrap">
                            {translations.footer.slogan}
                        </p>
                        <p className="text-sm font-red-hat font-normal text-left text-gray-500 mt-3 max-w-[22rem]">
                            Aurigital es una agencia de diseño web en Costa Rica, especializada en UX/UI con prototipo navegable, desarrollo web a medida, branding digital, integraciones y automatizaciones (formularios, pagos, agenda, CRM), e-commerce, dashboards, mantenimiento continuo y soporte premium para marcas con reputación.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center md:text-left mb-5" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk">{translations.footer.sections.resources.title}</h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm">
                                <li>
                                    <a 
                                        href={getTermsUrl()} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="hover:text-[#B2FF00] transition-colors"
                                    >
                                        {translations.footer.sections.resources.links.terms}
                                    </a>
                                </li>
                                <li>
                                    <Link href="https://bookings.aurigital.com/" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.resources.links.reservations}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/proyectos/#portafolio" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.resources.links.portfolio}
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5" data-aos="fade-up" data-aos-delay="300">
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk">{translations.footer.sections.information.title}</h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm">
                                <li>
                                    <Link href="/sobrenosotros" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.aboutUs}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/#testimonios" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.information.links.testimonials}
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
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk">{translations.footer.sections.contact.title}</h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm">
                                <li>
                                    <Link href="https://wa.me/50688888169" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.whatsapp}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://instagram.com/aurigital" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.instagram}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://facebook.com/aurigital" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.facebook}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://linkedin.com/company/aurigital" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.linkedin}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://www.google.com/maps?ll=9.911489,-84.138238&z=18&t=m&hl=es&gl=CR&mapclient=embed" className="hover:text-[#B2FF00] transition-colors">
                                        {translations.footer.sections.contact.links.address}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <address className="not-italic flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-[#2F2F2F]/40 max-w-7xl mx-auto font-red-hat text-sm text-gray-600" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                        <span itemProp="name" className="font-space-grotesk font-semibold text-black">Aurigital</span>
                        <span itemProp="address">Escazú, San José, Costa Rica</span>
                        <a href="tel:+50688888169" itemProp="telephone" className="hover:text-[#B2FF00] transition-colors">+506 8888-8169</a>
                    </div>
                    <button
                        onClick={handleContactClick}
                        className="font-space-grotesk font-semibold text-sm bg-black text-white px-6 py-3 rounded-md hover:bg-[#B2FF00] hover:text-black transition-colors duration-300 whitespace-nowrap"
                    >
                        {translations.footer.cta}
                    </button>
                </address>

                <div className="flex flex-col md:flex-row justify-between items-center mt-6 py-4 border-t border-[#2F2F2F]/40 max-w-7xl mx-auto">
                    <p className="text-md mb-4 md:mb-0" data-aos="fade-right" data-aos-delay="100">{translations.footer.copyright}</p>
                    <div className="grid md:grid-cols-4 gap-3 px-2" data-aos="fade-left" data-aos-delay="200">
                        <a
                            href="https://wa.me/50688888169"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp className='w-5 h-5' /> {translations.footer.socialMedia.whatsapp}
                        </a>

                        <a
                            href="https://instagram.com/aurigital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Instagram"
                        >
                            <FaInstagram className='w-5 h-5' /> {translations.footer.socialMedia.instagram}
                        </a>

                        <a
                            href="https://facebook.com/aurigital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Facebook"
                        >
                            <FaFacebook className='w-5 h-5' /> {translations.footer.socialMedia.facebook}
                        </a>

                        <a
                            href="https://www.linkedin.com/company/aurigital"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="LinkedIn"
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