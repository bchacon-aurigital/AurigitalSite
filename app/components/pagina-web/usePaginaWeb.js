"use client";
import { useLanguage } from "../../context/LanguageContext";
import es from "../../i18n/locales/es.json";

/**
 * Textos de la página /pagina-web.
 * Mientras en.json no traiga la clave `paginaWeb`, cae a español en vez de romper.
 */
export const usePaginaWeb = () => {
  const { translations } = useLanguage();
  return translations?.paginaWeb || es.paginaWeb;
};

export default usePaginaWeb;
