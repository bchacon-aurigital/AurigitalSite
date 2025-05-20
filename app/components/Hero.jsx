"use client";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), {
    ssr: false,
});

export default function Hero() {
    return (
        <section
            className="relative h-[95vh] w-full overflow-hidden bg-black mx-auto max-w-[110rem] rounded-lg"
            role="banner"
            aria-label="Hero section"
        >
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: "url('/assets/FondoHero.avif')" }}
                aria-hidden="true"
            ></div>

            <div className="z-50">
                <Navbar />
            </div>

            <div className="container mx-auto px-4 md:px-12 h-screen flex flex-col justify-center h-[95vh]">
                <div className="max-w-4xl mx-auto text-white text-center flex flex-col justify-center items-center z-20" data-aos="fade-up" data-aos-delay="200">

                    <div className="border border-[#B2FF00] rounded-full px-16 py-2 mb-8">
                        <p className="text-[#B2FF00] font-mansfield font-light">+41 Proyectos realizados</p>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-medium transition-transform duration-1000 ease-in-out font-qurova">
                        <span className="text-[#a7a6a6]"> SITIOS WEB PARA </span> <br /> MARCAS QUE SE DESTACAN
                    </h1>

                    <p className="text-md text-[#FFFFFF]/60 mt-8 max-w-[52rem] font-mansfield font-light">
                        Imagina tener una presencia online tan sólida e impactante que atraiga a tu público y te quite preocupaciones,
                        donde te guiamos en cada paso, para que no te sientas solo en el mundo digital
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 mt-8 font-qurova font-normal">
                        <a
                            href="/contacto"
                            className="px-14 py-3 bg-[#B2FF00] rounded-full text-black hover:bg-[#b3ff00b6] transition-colors duration-500 text-center relative z-10"
                        >
                            Contáctanos
                        </a>
                        <a
                            href="/conocer-mas"
                            className="px-14 py-3 bg-transparent rounded-full text-white border border-white hover:border-transparent hover:text-black hover:bg-white transition-colors duration-500 text-center relative z-10"
                        >
                            Conocer más
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}