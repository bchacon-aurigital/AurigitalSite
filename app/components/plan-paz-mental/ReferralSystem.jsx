"use client";
import { useLanguage } from "../../context/LanguageContext";
import { Gift, Users, ArrowRight } from "lucide-react";

const ReferralSystem = () => {
  const { translations } = useLanguage();
  const referralData = translations.planPazMental.referrals;

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Card */}
        <div
          className="bg-[#00A8E6] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-black flex flex-col justify-center"
          data-aos="fade-right"
        >
          <div className="flex items-center gap-4 mb-6">
            <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-black" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-space-grotesk font-medium leading-tight">
              {referralData.title}
            </h2>
          </div>
          
          <div className="bg-black/10 rounded-xl p-4 sm:p-6 mb-6">
            <div className="text-center">
              <div className="text-lg sm:text-xl lg:text-2xl font-space-grotesk font-medium mb-2">
                {referralData.highlight}
              </div>
            </div>
          </div>
        </div>

        {/* Features Card */}
        <div
          className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#515151]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="flex items-center gap-4 mb-8">
            <Users className="w-12 h-12 text-[#B2FF00]" />
            <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-space-grotesk font-medium">
              Características
            </h3>
          </div>

          <div className="space-y-6">
            {referralData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-[#101010] rounded-xl border border-[#515151]"
              >
                <div className="w-2 h-2 bg-[#B2FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-[#D4D4D4]/80 text-sm sm:text-base leading-relaxed font-red-hat">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#B2FF00]/10 rounded-xl border border-[#B2FF00]/20">
            <div className="flex items-center gap-2 text-[#B2FF00] text-sm font-space-grotesk font-medium uppercase mb-2">
              <ArrowRight className="w-4 h-4" />
              Ejemplo
            </div>
            <p className="text-white text-sm sm:text-base font-red-hat">
              Refieres 12 clientes = 1 año completo gratis + sigues disfrutando todos los beneficios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReferralSystem;