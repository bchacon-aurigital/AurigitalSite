"use client";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";
import IconBadge from "../ui/IconBadge2";
import { ArrowRight } from "lucide-react";
import BotonServicio from '../ServiciosPages/ui/Boton';
import { useRouter } from 'next/navigation';

const Proyectos = () => {
  const { translations } = useLanguage();
  const proyectosData = translations.proyectos;
  const servicesData = translations.servicesGrid;
  const router = useRouter();

  return (
    <div className="container relative mx-auto pt-12 max-w-[110rem] rounded-xl bg-[#B2FF00] px-4 transition-all duration-1000 ease-in-out">
      <div
        className="flex flex-col lg:flex-row lg:justify-between gap-8 mx-auto max-w-7xl items-center lg:items-end mb-12 text-center lg:text-left"
        data-aos="fade-up"
      >
        <div className="lg:w-1/2 max-w-md">
          <p className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-space-grotesk font-medium uppercase leading-none text-black">
            {proyectosData.title}
          </p>
        </div>
        <div className="flex flex-col">
          <div className=" lg:text-right">
            <p className="text-base md:text-lg font-red-hat font-medium text-black/80 leading-relaxed max-w-[33rem] lg:ml-auto">
              {proyectosData.description}
            </p>
          </div>
          <div className="mt-5 self-center lg:self-end">
            <BotonServicio dark={true} onClick={() => router.push('/proyectos')}>{translations.hero.buttons.knowMore}</BotonServicio>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mx-auto max-w-7xl py-3">
        {proyectosData.cards.map((proyecto, index) => (
          <div
            key={index}
            className="relative rounded-3xl overflow-hidden group cursor-pointer mx-auto w-[300px] min-h-[370px] bg-[#101010] hover:scale-105 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay={(index + 1) * 100}
          >
            <IconBadge
              image={proyecto.icon}
              iconColor="text-black"
              bgColor="bg-[#101010]"
              position="center"
              size="medium"
              darkBg="bg-[#B2FF00]"
              lightBg="bg-[#101010]"
            />

            <div className="relative w-full h-full flex flex-col justify-center items-center px-6 py-2 mt-9">
              <Image
                src={`/assets/proyectos/ImgsProyectos/${proyecto.image}`}
                alt={proyecto.title}
                width={280}
                height={100}
                className="object-cover h-[170px] w-full mx-auto rounded-2xl mb-4"
              />

              <div className="w-full text-white z-10">
                <p className="text-white text-base md:text-lg lg:text-xl uppercase font-space-grotesk font-medium tracking-wider leading-tight">
                  {proyecto.title}
                </p>
                <p className="text-white/90 text-xs md:text-sm font-red-hat font-light leading-relaxed">
                  {proyecto.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proyectos;
