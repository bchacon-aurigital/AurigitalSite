"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContactAction } from '../hooks/useContactAction';
import { useLanguage } from '../context/LanguageContext';
import CotizacionButton from './ui/CotizacionButton';

const Footer = () => {
    const { translations, language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const handleContactClick = useContactAction();

    useEffect(() => { setMounted(true); }, []);

    const getTermsUrl = () =>
        language === 'es'
            ? '/Docs/TerminosyCondicionesES.pdf'
            : '/Docs/Terms&ConditionsEN.pdf';

    if (!mounted) return null;

    return (
        <footer className="w-full bg-[#101010] text-white mt-6 rounded-lg" role="contentinfo">
            <div className="container mx-auto border-t border-white/10 py-12 max-w-[110rem] px-5">
                <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">

                    {/* Logo + slogan */}
                    <div className="flex flex-col items-center md:items-start">
                        <Image
                            src="/assets/logo-white.svg"
                            alt="AURIGITAL Logo"
                            width={260}
                            height={180}
                            className="mb-4"
                            priority
                            unoptimized={true}
                        />
                        <p className="text-3xl font-space-grotesk font-bold text-center md:text-left leading-tight tracking-tight whitespace-nowrap text-white">
                            {translations.footer.slogan}
                        </p>
                        <p className="text-sm font-red-hat font-normal text-center md:text-left text-white/50 mt-3 max-w-[22rem]">
                            {translations.footer.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk text-white">
                                {translations.footer.sections.resources.title}
                            </h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm text-white/60">
                                <li>
                                    <a href={getTermsUrl()} target="_blank" rel="noopener noreferrer"
                                        className="hover:text-[#B2FF00] transition-colors">
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

                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk text-white">
                                {translations.footer.sections.information.title}
                            </h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm text-white/60">
                                <li><Link href="/sobrenosotros" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.aboutUs}</Link></li>
                                <li><Link href="/#testimonios" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.testimonials}</Link></li>
                                <li><Link href="/servicios" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.services}</Link></li>
                                <li><Link href="/proyectos" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.projects}</Link></li>
                                <li><Link href="/diseno-web" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.webDesign}</Link></li>
                                <li><Link href="/desarrollo-web" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.information.links.webDev}</Link></li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-space-grotesk text-white">
                                {translations.footer.sections.contact.title}
                            </h3>
                            <ul className="space-y-2 font-red-hat font-medium text-sm text-white/60">
                                <li><Link href="https://wa.me/50688888169" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.contact.links.whatsapp}</Link></li>
                                <li><Link href="https://instagram.com/aurigital" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.contact.links.instagram}</Link></li>
                                <li><Link href="https://facebook.com/aurigital" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.contact.links.facebook}</Link></li>
                                <li><Link href="https://linkedin.com/company/aurigital" className="hover:text-[#B2FF00] transition-colors">{translations.footer.sections.contact.links.linkedin}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Address bar */}
                <address className="not-italic flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10 max-w-7xl mx-auto font-red-hat text-sm text-white/50">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-10 text-center md:text-left">
                        <span className="font-space-grotesk font-semibold text-white">Aurigital</span>
                        <a href="https://maps.app.goo.gl/Kx9PMYgYtaUTFuYF7" target="_blank" rel="noopener noreferrer"
                            className="hover:text-[#B2FF00] transition-colors">
                            Calle Entierrillos, San José, San Antonio, Santa Teresa, 10203
                        </a>
                        <a href="tel:+50688888169" className="hover:text-[#B2FF00] transition-colors">+506 8888-8169</a>
                    </div>
                    <CotizacionButton onClick={handleContactClick}>{translations.footer.cta}</CotizacionButton>
                </address>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 py-4 border-t border-white/10 max-w-7xl mx-auto">
                    <p className="text-sm mb-4 md:mb-0 text-center md:text-left font-red-hat text-white/40">
                        {translations.footer.copyright}
                    </p>
                    <div className="grid md:grid-cols-4 gap-3 px-2">
                        {[
                            { href: "https://wa.me/50688888169", icon: <FaWhatsapp className="w-5 h-5" />, label: translations.footer.socialMedia.whatsapp, ariaLabel: "WhatsApp" },
                            { href: "https://instagram.com/aurigital", icon: <FaInstagram className="w-5 h-5" />, label: translations.footer.socialMedia.instagram, ariaLabel: "Instagram" },
                            { href: "https://facebook.com/aurigital", icon: <FaFacebook className="w-5 h-5" />, label: translations.footer.socialMedia.facebook, ariaLabel: "Facebook" },
                            { href: "https://www.linkedin.com/company/aurigital", icon: <FaLinkedin className="w-5 h-5" />, label: translations.footer.socialMedia.linkedin, ariaLabel: "LinkedIn" },
                        ].map(({ href, icon, label, ariaLabel }) => (
                            <a key={ariaLabel} href={href} target="_blank" rel="noopener noreferrer"
                                className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-white/20 rounded-md transition-colors duration-300 hover:border-[#B2FF00] hover:text-[#B2FF00] font-red-hat text-white/70"
                                aria-label={ariaLabel}>
                                {icon} {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
