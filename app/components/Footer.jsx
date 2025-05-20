"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useContactAction } from '../hooks/useContactAction';

const Footer = () => {
    const [mounted, setMounted] = useState(false);
    const handleContactClick = useContactAction();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <footer className="text-gray-700 pt-12 rounded-lg p-2" role="contentinfo">
            <div className="container mx-auto border-t border-[#2F2F2F]/40 py-12 max-w-[110rem] rounded-lg bg-white px-5 p-2">
                <div className="flex flex-col md:flex-row justify-between gap-8 max-w-7xl mx-auto">
                    <div className="flex flex-col items-center">
                        <Image
                            src="./assets/logoFooter.svg"
                            alt="AURIGITAL Logo"
                            width={260}
                            height={180}
                            className="mb-4"
                            priority
                        />
                        <p className="text-xl max-w-[15rem] font-mansfield font-extralight text-center">
                            El estilo que va con tu negocio
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-qurova">Recursos</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/terminos-condiciones" className="hover:text-[#B2FF00] transition-colors">
                                        Términos & Condiciones
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/reservaciones" className="hover:text-[#B2FF00] transition-colors">
                                        Reservaciones
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/portafolio" className="hover:text-[#B2FF00] transition-colors">
                                        Portafolio
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-qurova">Información</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/sobre-nosotros" className="hover:text-[#B2FF00] transition-colors">
                                        Sobre Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/testimonios" className="hover:text-[#B2FF00] transition-colors">
                                        Testimonios
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/beneficios" className="hover:text-[#B2FF00] transition-colors">
                                        Beneficios
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/servicios" className="hover:text-[#B2FF00] transition-colors">
                                        Servicios
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/proyectos" className="hover:text-[#B2FF00] transition-colors">
                                        Proyectos
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center md:text-left mb-5">
                            <h3 className="text-lg font-medium mb-2 font-qurova">Contacto</h3>
                            <ul className="space-y-2 font-mansfield font-medium text-sm">
                                <li>
                                    <Link href="/whatsapp" className="hover:text-[#B2FF00] transition-colors">
                                        WhatsApp
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/instagram" className="hover:text-[#B2FF00] transition-colors">
                                        Instagram
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/facebook" className="hover:text-[#B2FF00] transition-colors">
                                        Facebook
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/linkedin" className="hover:text-[#B2FF00] transition-colors">
                                        LinkedIn
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/direccion" className="hover:text-[#B2FF00] transition-colors">
                                        Dirección
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-8 py-4 border-t border-[#2F2F2F]/40 max-w-7xl mx-auto">
                    <p className="text-md mb-4 md:mb-0">© 2025 AURIGITAL | Todos los derechos Reservados</p>
                    <div className=" grid md:grid-cols-4 gap-3 px-2">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp className='w-5 h-5' /> WhatsApp
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Instagram"
                        >
                            <FaInstagram className='w-5 h-5' /> Instagram
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="Facebook"
                        >
                            <FaFacebook className='w-5 h-5' /> Facebook
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 w-full gap-2 flex items-center justify-center bg-transparent border border-black rounded-md transition-colors duration-500 hover:text-white hover:bg-black hover:border-transparent"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className='w-5 h-5' /> LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;