"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Building2, Briefcase, Zap, Stethoscope, ShoppingCart, Users, Cpu, Globe, TrendingUp, Shield, Rocket, Database, Cloud, Code, Heart, Coffee, Lightbulb, Target, Award, Star } from "lucide-react";
import Image from "next/image";

const LogosCarousel = () => {
  const { translations } = useLanguage();
  const carouselData = translations.planPazMental.carousel;

  const companyIcons = [
    Building2, Briefcase, Zap, Stethoscope, ShoppingCart, 
    Users, Cpu, Globe, TrendingUp, Shield, 
    Rocket, Database, Cloud, Code, Heart, 
    Coffee, Lightbulb, Target, Award, Star
  ];

  // Special logos for specific companies
  const specialLogos = {
    'Abraham Studio': '/assets/ppm/abrahamstudio.svg',
    'Tulsi Psicóloga': '/assets/ppm/tulsi.svg',
    'Backline Studios': '/assets/ppm/backline.svg',
    'Servidental': '/assets/ppm/servidental.svg',
    'Terciopelo Beauty': '/assets/ppm/terciopelo.svg',
    'Galileo Capital': '/assets/ppm/galileo.svg',
    'The Bohemian': '/assets/ppm/thebohemian.svg',
    'Mauro Sergio BJJ': '/assets/ppm/mauro.svg',
    'Pranayama': '/assets/ppm/pranayama.svg',
    'Fighter District': '/assets/ppm/fd.svg',
    'Felade': '/assets/ppm/felade.svg'
  };

  const renderCompanyLogo = (company, index, keyPrefix) => {
    console.log('Rendering company:', company, 'Has special logo:', !!specialLogos[company]);
    if (specialLogos[company]) {
      return (
        <div
          key={`${keyPrefix}-${index}`}
          className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white/90 rounded-lg border border-gray-200 flex items-center justify-center"
        >
          <Image 
            src={specialLogos[company]}
            alt={company}
            width={48}
            height={48}
            className={`object-contain ${
              company === 'Abraham Studio' || company === 'Mauro Sergio BJJ' || company === 'Pranayama' || company === 'The Bohemian' || company === 'Felade' || company === 'Backline Studios' || company === 'Servidental' || company === 'Galileo Capital'
                ? 'w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20' 
                : 'w-11 h-11 sm:w-14 sm:h-14 md:w-18 md:h-18'
            }`}
          />
        </div>
      );
    } else {
      const IconComponent = companyIcons[index % companyIcons.length];
      return (
        <div
          key={`${keyPrefix}-${index}`}
          className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-white/90 rounded-lg border border-gray-200 flex items-center justify-center"
        >
          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-gray-600" />
        </div>
      );
    }
  };

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12" data-aos="fade-up">
        <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-space-grotesk font-medium text-center mb-8 lg:mb-12">
          {carouselData.intro}
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {carouselData.companies.map((company, index) => 
              renderCompanyLogo(company, index, 'first')
            )}
            {/* Duplicate set for seamless loop */}
            {carouselData.companies.map((company, index) => 
              renderCompanyLogo(company, index, 'second')
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LogosCarousel;