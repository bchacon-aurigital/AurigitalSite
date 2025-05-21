"use client";

import { createContext, useState, useContext, useEffect } from 'react';
import esTranslations from '../i18n/locales/es.json';
import enTranslations from '../i18n/locales/en.json';

const translations = {
  es: esTranslations,
  en: enTranslations
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  const [translations, setTranslations] = useState(esTranslations);

  useEffect(() => {
    // Intenta obtener el idioma guardado en localStorage
    const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      setTranslations(savedLanguage === 'es' ? esTranslations : enTranslations);
    }
  }, []);

  const changeLanguage = (lang) => {
    if (lang === language) return;
    
    setLanguage(lang);
    setTranslations(lang === 'es' ? esTranslations : enTranslations);
    
    // Guarda la preferencia en localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 