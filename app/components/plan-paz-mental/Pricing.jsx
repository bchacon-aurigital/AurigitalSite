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
      <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#E0E0E0]" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Pricing */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
              <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-[#00A8E6]" />
              <h2 className="text-[#101010] text-2xl sm:text-3xl lg:text-4xl font-qurova font-medium">
                {pricingData.title}
              </h2>
            </div>
            
            <div className="mb-6">
              <div className="text-[#00A8E6] text-4xl sm:text-5xl lg:text-6xl font-qurova font-medium mb-2">
                {pricingData.price}
              </div>
              <p className="text-[#666666] text-sm sm:text-base font-mansfield">
                {pricingData.note}
              </p>
            </div>

          </div>

          {/* Right side - CTA */}
          <div className="bg-[#00576C] rounded-2xl p-6 sm:p-8 border border-[#00576C] text-center">
            <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-qurova font-medium mb-4">
              {pricingData.quote.title}
            </h3>
            
            <p className="text-[#D4D4D4] text-sm sm:text-base font-mansfield mb-6 leading-relaxed">
              {pricingData.quote.description}
            </p>

            <button
              onClick={openModal}
              className="w-full bg-[#00A8E6] hover:bg-[#00A8E6]/90 text-white rounded-full px-6 py-3 sm:py-4 transition-colors duration-300 flex items-center justify-center gap-3 font-qurova font-medium"
            >
              <span className="text-sm sm:text-base">
                {pricingData.cta}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;