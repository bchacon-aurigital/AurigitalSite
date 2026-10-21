"use client";
import { createContext, useContext } from "react";
import { useLanguage } from "../../context/LanguageContext";
import es from "../../i18n/locales/es.json";

/* Clave de i18n del nivel que se está renderizando: "paginaWeb", "sistemaWeb"… */
const NivelContext = createContext("paginaWeb");

export const NivelProvider = ({ nivel, children }) => (
  <NivelContext.Provider value={nivel}>{children}</NivelContext.Provider>
);

/**
 * Textos del nivel activo. Mientras en.json no traiga la clave del nivel,
 * cae a español en vez de romper.
 */
export const useNivel = (nivel) => {
  const delContexto = useContext(NivelContext);
  const clave = nivel || delContexto;
  const { translations } = useLanguage();
  return translations?.[clave] || es[clave];
};

/** La clave en crudo ("paginaWeb", "sistemaWeb"), para las constantes de diseño por nivel. */
export const useNivelKey = () => useContext(NivelContext);

export default useNivel;
