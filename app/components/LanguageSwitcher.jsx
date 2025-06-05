"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLanguageToggle = () => {
    const newLanguage = language === 'es' ? 'en' : 'es';
    changeLanguage(newLanguage);
  };

  return (
    <div className="fixed bottom-32 left-6 md:bottom-6 md:left-6 right-6 md:right-auto top-1/2 md:top-auto transform translate-y-20 md:transform-none flex justify-end md:justify-start z-50">
      <button
        onClick={handleLanguageToggle}
        className="bg-[#B2FF00] text-black w-10 h-10 md:w-14 md:h-14 rounded-full shadow-lg flex items-center justify-center text-sm md:text-xl font-medium hover:bg-[#a0e600] transition-colors duration-300"
        aria-label="Cambiar idioma"
      >
        {language.toUpperCase()}
      </button>
    </div>
  );
};

export default LanguageSwitcher; 