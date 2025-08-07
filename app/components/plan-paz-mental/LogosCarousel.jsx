"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Building2, Briefcase, Zap, Stethoscope, ShoppingCart, Users, Cpu, Globe, TrendingUp, Shield, Rocket, Database, Cloud, Code, Heart, Coffee, Lightbulb, Target, Award, Star } from "lucide-react";

const LogosCarousel = () => {
  const { translations } = useLanguage();
  const carouselData = translations.planPazMental.carousel;

  const companyIcons = [
    Building2, Briefcase, Zap, Stethoscope, ShoppingCart, 
    Users, Cpu, Globe, TrendingUp, Shield, 
    Rocket, Database, Cloud, Code, Heart, 
    Coffee, Lightbulb, Target, Award, Star
  ];

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12" data-aos="fade-up">
        <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-qurova font-medium text-center mb-8 lg:mb-12">
          {carouselData.intro}
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {carouselData.companies.map((company, index) => {
              const IconComponent = companyIcons[index % companyIcons.length];
              return (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 px-6 py-4 bg-white/10 rounded-lg border border-[#515151] flex items-center justify-center"
                >
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/70" />
                </div>
              );
            })}
            {/* Duplicate set for seamless loop */}
            {carouselData.companies.map((company, index) => {
              const IconComponent = companyIcons[index % companyIcons.length];
              return (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-4 sm:mx-6 lg:mx-8 px-6 py-4 bg-white/10 rounded-lg border border-[#515151] flex items-center justify-center"
                >
                  <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white/70" />
                </div>
              );
            })}
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