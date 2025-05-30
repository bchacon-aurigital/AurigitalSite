import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const QuoteCard = () => {
  const { translations } = useLanguage();
  
  return (
    <div className="w-full mx-auto max-w-[110rem] p-8 rounded-xl bg-[#B2FF00] h-80 flex items-center justify-center">
      <div className="text-center" data-aos="fade-up">
        <blockquote className="text-black font-medium text-2xl md:text-3xl lg:text-6xl leading-none font-qurova max-w-3xl mx-auto">
          "{translations.quoteCard.quote}"
        </blockquote>
        <cite className="text-black/60 text-lg md:text-xl font-medium font-mansfield">
          - {translations.quoteCard.author}
        </cite>
      </div>
    </div>
  );
};

export default QuoteCard; 