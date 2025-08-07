"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from '../../context/ContactModalContext';
import { DollarSign, ArrowRight } from "lucide-react";

const Pricing = () => {
  const { translations } = useLanguage();
  const { openModal } = useContactModal();
  const pricingData = translations.planPazMental.pricing;

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#515151]" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Pricing */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-[#B2FF00]" />
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-qurova font-medium">
                Inversión
              </h2>
            </div>
            
            <div className="mb-6">
              <div className="text-[#B2FF00] text-4xl sm:text-5xl lg:text-6xl font-qurova font-medium mb-2">
                {pricingData.price}
              </div>
              <p className="text-[#D4D4D4]/60 text-sm sm:text-base font-mansfield">
                {pricingData.note}
              </p>
            </div>

          </div>

          {/* Right side - CTA */}
          <div className="bg-[#101010] rounded-2xl p-6 sm:p-8 border border-[#515151] text-center">
            <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-qurova font-medium mb-4">
              Cotización Personalizada
            </h3>
            
            <p className="text-[#D4D4D4]/80 text-sm sm:text-base font-mansfield mb-6 leading-relaxed">
              Cada sitio web es único. Te damos una cotización exacta basada en tus necesidades específicas y funcionalidades actuales.
            </p>

            <button
              onClick={openModal}
              className="w-full bg-[#B2FF00] hover:bg-[#b3ff00b6] text-black rounded-full px-6 py-3 sm:py-4 transition-colors duration-300 flex items-center justify-center gap-3 font-qurova font-medium"
            >
              <span className="text-sm sm:text-base">
                {pricingData.cta}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-4 text-xs text-[#D4D4D4]/60 font-mansfield">
              Respuesta en menos de 2 horas hábiles
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;