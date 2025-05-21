"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { translations } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: translations.navbar.links.services, href: "/servicios" },
    { name: translations.navbar.links.projects, href: "/proyectos" },
    { name: translations.navbar.links.aboutUs, href: "/sobre-nosotros" },
    { name: translations.navbar.links.contact, href: "/contacto" },
    { name: translations.navbar.links.faq, href: "/faq" },
    { name: translations.navbar.links.blog, href: "/blog" },
  ];

  return (
    <>
      <nav className="w-full z-50 px-6 md:px-12 py-4" role="navigation" aria-label="Navegación principal" data-aos="fade-down">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex-shrink-0 z-50"
            aria-label="AURIGITAL - Ir a inicio"
            data-aos="fade-right" data-aos-delay="100"
          >
            <Image
              src="/assets/LogoNavbar.svg"
              alt="Logo de AURIGITAL"
              width={140}
              height={60}
              className={`h-auto ${isOpen ? 'opacity-0' : 'opacity-100'}`}
              priority
            />
          </Link>

          <button
            className="lg:hidden text-white focus:outline-none relative w-6 h-6 z-50"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            data-aos="fade-left" data-aos-delay="100"
          >
            <span
              className={`absolute w-6 h-1 bg-white transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 top-3" : "top-1"
                }`}
            />
            <span
              className={`absolute w-6 h-1 bg-white transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : "top-3"
                }`}
            />
            <span
              className={`absolute w-6 h-1 bg-white transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 top-3" : "top-5"
                }`}
            />
          </button>

          <div className="hidden lg:flex items-center justify-center space-x-8" role="menubar" data-aos="fade-left">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#B2FF00] px-2 py-2 transition-colors text-base font-light font-qurova z-50"
                role="menuitem"
                data-aos="fade-down" 
                data-aos-delay={150 + index * 50}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/agendar-cita"
              className="z-50 font-qurova flex items-center bg-[#B2FF00] text-black px-6 py-2 rounded-full font-light transition-all duration-300 hover:scale-105"
              data-aos="zoom-in" data-aos-delay="450"
            >
              {translations.navbar.links.schedule}
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 right-0 w-[80%] h-full bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          } z-40`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación móvil"
      >
        <div className="flex flex-col h-full pt-20 px-6 ">
          <nav className="flex flex-col space-y-6" role="navigation" aria-label="Menú móvil">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-black text-xl font-light hover:text-[#B2FF00] transition-colors font-qurova"
                onClick={toggleMenu}
                role="menuitem"
                data-aos="fade-left" 
                data-aos-delay={100 + index * 50}
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-6" data-aos="fade-up" data-aos-delay="400">
              <Link
                href="/agendar-cita"
                className="font-qurova flex items-center bg-[#CCFF00] text-black px-6 py-2 rounded-full font-light transition-colors hover:bg-[#b3e600] w-fit"
                onClick={toggleMenu}
              >
                {translations.navbar.links.schedule}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;