"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    { name: "Servicios", href: "/servicios" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Contacto", href: "/contacto" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <nav className="w-full z-50 px-6 md:px-12 py-4" role="navigation" aria-label="Navegación principal">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex-shrink-0 z-50"
            aria-label="AURIGITAL - Ir a inicio"
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

          <div className="hidden lg:flex items-center justify-center space-x-8" role="menubar">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:text-[#B2FF00] px-2 py-2 transition-colors text-base font-light font-qurova z-50"
                role="menuitem"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/agendar-cita"
              className="z-50 font-qurova flex items-center bg-[#B2FF00] text-black px-6 py-2 rounded-full font-light transition-all duration-300 hover:scale-105"
            >
              Agendar Cita
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-black text-xl font-light hover:text-[#B2FF00] transition-colors font-qurova"
                onClick={toggleMenu}
                role="menuitem"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-6">
              <Link
                href="/agendar-cita"
                className="font-qurova flex items-center bg-[#CCFF00] text-black px-6 py-2 rounded-full font-light transition-colors hover:bg-[#b3e600] w-fit"
                onClick={toggleMenu}
              >
                Agendar Cita
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;