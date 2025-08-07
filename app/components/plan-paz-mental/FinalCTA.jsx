"use client";
import { useLanguage } from "../../context/LanguageContext";
import { useContactModal } from '../../context/ContactModalContext';
import { ArrowRight, Heart } from "lucide-react";

const FinalCTA = () => {
  const { translations } = useLanguage();
  const { openModal } = useContactModal();
  const finalCtaData = translations.planPazMental.finalCta;

  return (
    <section className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Message */}
        <div
          className="bg-[#1E1E1E] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 border border-[#515151] flex flex-col justify-center"
          data-aos="fade-right"
        >
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-[#B2FF00]" />
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-qurova font-medium leading-tight">
              {finalCtaData.title}
            </h2>
          </div>
          
          <p className="text-[#D4D4D4]/80 text-base sm:text-lg lg:text-xl font-mansfield leading-relaxed mb-6">
            {finalCtaData.description}
          </p>

          <div className="bg-[#B2FF00]/10 rounded-xl p-4 sm:p-6 border border-[#B2FF00]/20">
            <h3 className="text-[#B2FF00] text-lg sm:text-xl lg:text-2xl font-qurova font-medium mb-3">
              {finalCtaData.question}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#B2FF00] rounded-full"></div>
              <span className="text-white text-sm sm:text-base font-mansfield">
                Your technological peace of mind is waiting for you
              </span>
            </div>
          </div>
        </div>

        {/* Right side - CTA */}
        <div
          className="bg-[#B2FF00] rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-black flex flex-col justify-center text-center"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-qurova font-medium mb-4 leading-tight">
              Start Today
            </h3>
            <p className="text-base sm:text-lg opacity-80 font-mansfield leading-relaxed">
              Give your business the technological peace of mind it deserves
            </p>
          </div>

          <button
            onClick={openModal}
            className="w-full bg-black hover:bg-gray-800 text-[#B2FF00] rounded-full px-6 py-4 sm:py-5 transition-colors duration-300 flex items-center justify-center gap-3 font-qurova font-medium text-lg sm:text-xl mb-6"
          >
            <span>
              {finalCtaData.cta}
            </span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center">
              <span className="font-mansfield opacity-80">Immediate setup</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mansfield opacity-80">24/7 support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mansfield opacity-80">No hidden costs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div 
        className="mt-12 bg-[#B2FF00] rounded-2xl p-6 sm:p-8 text-center text-black"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <h4 className="text-xl sm:text-2xl lg:text-3xl font-qurova font-medium mb-4">
          {finalCtaData.bottomCta.title}
        </h4>
        <p className="text-base sm:text-lg opacity-80 font-mansfield mb-6 max-w-2xl mx-auto leading-relaxed">
          {finalCtaData.bottomCta.description}
        </p>
        <button
          onClick={openModal}
          className="bg-black hover:bg-gray-800 text-[#B2FF00] rounded-full px-8 py-3 sm:py-4 transition-colors duration-300 font-qurova font-medium text-base sm:text-lg"
        >
          {finalCtaData.bottomCta.button}
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;