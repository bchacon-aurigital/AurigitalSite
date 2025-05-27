"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage, translations } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <button
        onClick={toggleMenu}
        className="bg-[#B2FF00] text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl font-medium hover:bg-[#a0e600] transition-colors duration-300"
        aria-label="Cambiar idioma"
      >
        {language.toUpperCase()}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 left-0 bg-white rounded-lg shadow-xl py-2 w-24">
          <ul>
            <li>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`w-full text-left px-4 py-2 ${language === 'es' ? 'bg-gray-100 text-[#B2FF00]' : 'hover:bg-gray-50'}`}
              >
                {translations.languageSwitcher.es}
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`w-full text-left px-4 py-2 ${language === 'en' ? 'bg-gray-100 text-[#B2FF00]' : 'hover:bg-gray-50'}`}
              >
                {translations.languageSwitcher.en}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 