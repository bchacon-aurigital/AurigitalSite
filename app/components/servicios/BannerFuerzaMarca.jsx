"use client";
import React, { Fragment } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const BannerFuerzaMarca = () => {
  const { translations } = useLanguage();

  const renderTextWithSpans = (text) => {
    const parts = text.split('<span>').map((part, index) => {
      if (part.includes('</span>')) {
        const [spanText, remainingText] = part.split('</span>');
        return (
          <Fragment key={index}>
            <span className="text-[#101010]">{spanText}</span>
            {remainingText}
          </Fragment>
        );
      }
      return part;
    });
    return parts;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#B2FF00] mx-auto max-w-[110rem] rounded-xl py-12" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-3">
        <p className="text-[#101010]/50 text-xl lg:text-2xl xl:text-3xl font-qurova font-medium leading-relaxed text-center">
          {renderTextWithSpans(translations.bannerFuerzaMarca.text)}
        </p>
      </div>
    </section>
  );
};

export default BannerFuerzaMarca; 