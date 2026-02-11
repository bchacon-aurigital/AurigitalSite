"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { translations, language } = useLanguage();

  const getTermsUrl = () => {
    return language === 'es'
      ? '/Docs/TerminosyCondicionesES.pdf'
      : '/Docs/Terms&ConditionsEN.pdf';
  };

  const recursos = [
    { name: translations.footer.sections.resources.links.terms, href: getTermsUrl(), external: true },
    { name: translations.footer.sections.resources.links.reservations, href: "https://bookings.aurigital.com/" },
    { name: translations.footer.sections.resources.links.portfolio, href: "/proyectos/#portafolio" },
  ];

  const informacion = [
    { name: translations.footer.sections.information.links.aboutUs, href: "/sobrenosotros" },
    { name: translations.footer.sections.information.links.testimonials, href: "/#testimonios" },
    { name: translations.footer.sections.information.links.services, href: "/servicios" },
    { name: translations.footer.sections.information.links.projects, href: "/proyectos" },
  ];

  const contacto = [
    { name: translations.footer.sections.contact.links.whatsapp, href: "https://wa.me/50688888169" },
    { name: translations.footer.sections.contact.links.instagram, href: "https://instagram.com/aurigital" },
    { name: translations.footer.sections.contact.links.facebook, href: "https://facebook.com/aurigital" },
    { name: translations.footer.sections.contact.links.linkedin, href: "https://linkedin.com/company/aurigital" },
    { name: translations.footer.sections.contact.links.address, href: "https://www.google.com/maps?ll=9.911489,-84.138238&z=18&t=m&hl=es&gl=CR&mapclient=embed" },
  ];

  const socialIcons = [
    { icon: FaWhatsapp, href: "https://wa.me/50688888169" },
    { icon: FaInstagram, href: "https://instagram.com/aurigital" },
    { icon: FaFacebook, href: "https://facebook.com/aurigital" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/company/aurigital" },
  ];

  return (
    <footer className="bg-[#1c1c1c] text-white">
      <div className="px-6 md:px-10 lg:px-14 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 text-center md:text-left">
          <div>
            <h4 className="font-space-grotesk font-medium text-white text-xl tracking-[-0.6px] mb-3">
              {translations.footer.sections.resources.title}
            </h4>
            <ul className="space-y-4">
              {recursos.map((item) => (
                <li key={item.name}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-space-grotesk font-normal text-white text-lg hover:opacity-70 transition-opacity"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-space-grotesk font-normal text-white text-lg hover:opacity-70 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-space-grotesk font-medium text-white text-xl tracking-[-0.6px] mb-3">
              {translations.footer.sections.information.title}
            </h4>
            <ul className="space-y-4">
              {informacion.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-space-grotesk font-normal text-white text-lg hover:opacity-70 transition-opacity"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-space-grotesk font-medium text-white text-xl tracking-[-0.6px] mb-3">
              {translations.footer.sections.contact.title}
            </h4>
            <ul className="space-y-4">
              {contacto.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="font-space-grotesk font-normal text-white text-lg hover:opacity-70 transition-opacity"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-10 lg:px-14 py-6 border-t border-white/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-space-grotesk font-normal text-white text-lg">
            {translations.footer.copyright}
          </p>

          <div className="flex items-center gap-3">
            {socialIcons.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors border border-white/30 rounded-xl p-2"
              >
                <social.icon size={28} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
