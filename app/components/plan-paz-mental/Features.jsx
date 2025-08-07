"use client";
import { useLanguage } from "../../context/LanguageContext";
import { CheckCircle } from "lucide-react";

const Features = () => {
  const { translations } = useLanguage();
  const featuresData = translations.planPazMental.features;

  return (
    <section className="bg-white rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 lg:mx-0">
      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-12 lg:mb-16 mt-8 lg:mt-12" data-aos="fade-up">
          <h2 className="text-[#101010] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-qurova font-medium text-center">
            {featuresData.title}
          </h2>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuresData.items.slice(0, 3).map((feature, index) => (
          <div
            key={index}
            className="bg-[#F8F9FA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative border border-[#E0E0E0] hover:border-[#00A8E6]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            data-aos="fade-up"
            data-aos-delay={100 + index * 100}
          >
            {/* Icon */}
            {feature.icon && (
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00A8E6]/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl text-[#00A8E6]">
                  {feature.icon}
                </div>
              </div>
            )}

            <div className="flex flex-col h-full">
              {/* Title */}
              <h3 className="text-[#101010] text-xl sm:text-2xl lg:text-3xl font-qurova font-medium uppercase mb-6 leading-tight max-w-[80%]">
                {feature.title}
              </h3>

              {/* Features List */}
              <div className="flex-grow mb-6">
                <ul className="space-y-3">
                  {feature.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00A8E6] flex-shrink-0 mt-0.5" />
                      <span className="text-[#666666] text-sm sm:text-base leading-relaxed font-mansfield">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="bg-[#00A8E6]/10 rounded-xl p-4 border border-[#00A8E6]/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#00A8E6] rounded-full"></div>
                  <span className="text-[#00A8E6] text-sm font-qurova font-medium uppercase">
                    Resultado
                  </span>
                </div>
                <p className="text-[#101010] text-sm sm:text-base font-mansfield leading-relaxed">
                  {feature.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom two cards - full width on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {featuresData.items.slice(3, 5).map((feature, index) => (
          <div
            key={index + 3}
            className="bg-[#F8F9FA] rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative border border-[#E0E0E0] hover:border-[#00A8E6]/50 transition-all duration-300 shadow-sm hover:shadow-md"
            data-aos="fade-up"
            data-aos-delay={400 + index * 100}
          >
            {/* Icon */}
            {feature.icon && (
              <div className="absolute top-6 right-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#00A8E6]/20 rounded-full flex items-center justify-center text-2xl sm:text-3xl text-[#00A8E6]">
                  {feature.icon}
                </div>
              </div>
            )}

            <div className="flex flex-col h-full">
              {/* Title */}
              <h3 className="text-[#101010] text-xl sm:text-2xl lg:text-3xl font-qurova font-medium uppercase mb-6 leading-tight max-w-[80%]">
                {feature.title}
              </h3>

              {/* Features List */}
              <div className="flex-grow mb-6">
                <ul className="space-y-3">
                  {feature.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#00A8E6] flex-shrink-0 mt-0.5" />
                      <span className="text-[#666666] text-sm sm:text-base leading-relaxed font-mansfield">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div className="bg-[#00A8E6]/10 rounded-xl p-4 border border-[#00A8E6]/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#00A8E6] rounded-full"></div>
                  <span className="text-[#00A8E6] text-sm font-qurova font-medium uppercase">
                    Resultado
                  </span>
                </div>
                <p className="text-[#101010] text-sm sm:text-base font-mansfield leading-relaxed">
                  {feature.result}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default Features;