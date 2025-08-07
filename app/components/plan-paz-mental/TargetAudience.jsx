"use client";
import { useLanguage } from "../../context/LanguageContext";

const TargetAudience = () => {
  const { translations } = useLanguage();
  const targetData = translations.planPazMental.target;

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="mb-8 lg:mb-12" data-aos="fade-up">
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-qurova font-medium text-center">
          {targetData.title}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {targetData.profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative border border-[#515151] hover:border-[#B2FF00]/30 transition-all duration-300 group"
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
          >
            {/* Icon */}
            {profile.icon && (
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#B2FF00]/10 rounded-full flex items-center justify-center text-2xl sm:text-3xl group-hover:bg-[#B2FF00]/20 transition-colors duration-300">
                  {profile.icon}
                </div>
              </div>
            )}

            <div className="flex flex-col h-full">
              {/* Title */}
              <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-qurova font-medium uppercase mb-4 leading-tight max-w-[70%]">
                {profile.title}
              </h3>

              {/* Description */}
              <p className="text-[#D4D4D4]/80 text-sm sm:text-base leading-relaxed font-mansfield flex-grow">
                {profile.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 pt-4 border-t border-[#515151] group-hover:border-[#B2FF00]/30 transition-colors duration-300">
                <div className="w-8 h-1 bg-[#B2FF00] rounded-full group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom highlight */}
      <div 
        className="mt-12 bg-[#B2FF00]/10 rounded-2xl p-6 sm:p-8 border border-[#B2FF00]/20 text-center"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <h3 className="text-[#B2FF00] text-xl sm:text-2xl lg:text-3xl font-qurova font-medium mb-4">
          ¿Te identificas con alguno?
        </h3>
        <p className="text-white text-base sm:text-lg font-mansfield leading-relaxed max-w-3xl mx-auto">
          El Plan Paz Mental está diseñado específicamente para profesionales y empresarios como tú, 
          que valoran su tiempo y entienden que la tecnología debe ser un aliado, no un dolor de cabeza.
        </p>
      </div>
    </section>
  );
};

export default TargetAudience;