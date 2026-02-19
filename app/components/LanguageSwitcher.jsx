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
    <div className="z-1 fixed bottom-6 left-6 top-auto flex justify-start z-50">
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