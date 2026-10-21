'use client'
import { useId } from 'react'
import { useLanguage } from '../../context/LanguageContext'

/**
 * Selector de idioma con el formato de cuadros de la marca.
 * En reposo: borde y retícula celestes. En hover: todo pasa al color de contraste
 * del navbar — blanco sobre el navbar oscuro, tinta sobre el claro.
 */
export default function LanguageToggle({ dark = false, onSwitch, fullWidth = false }) {
  const uid = `lang-${useId().replace(/:/g, '')}`
  const { language, changeLanguage } = useLanguage()

  const celeste = '100,184,232'
  const hover = dark ? '255,255,255' : '16,16,16'
  const hoverHex = dark ? '#ffffff' : '#101010'

  const styles = `
    .${uid} {
      position: relative;
      overflow: hidden;
      background: transparent;
      color: #64B8E8;
      border: 2px solid #64B8E8;
      border-radius: 0.75rem;
      padding: 0.45rem 0.95rem;
      font-family: var(--font-space-grotesk, sans-serif);
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5;
      letter-spacing: 0.08em;
      white-space: nowrap;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${fullWidth ? 'width: 100%;' : ''}
      transition: color 0.35s ease, border-color 0.35s ease, box-shadow 0.4s ease;
    }

    /* Dos retículas superpuestas que se cruzan en el hover: el color no se puede
       interpolar en un background-image, pero la opacidad sí. */
    .${uid} .lang-mesh {
      position: absolute;
      inset: -2px;
      background-size: 12px 12px;
      background-position: 0 0;
      transition: opacity 0.35s ease;
      pointer-events: none;
    }
    .${uid} .lang-mesh--base {
      background-image:
        linear-gradient(rgba(${celeste},0.45) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${celeste},0.45) 1px, transparent 1px);
      opacity: 1;
    }
    .${uid} .lang-mesh--hover {
      background-image:
        linear-gradient(rgba(${hover},0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${hover},0.5) 1px, transparent 1px);
      opacity: 0;
    }
    .${uid}:hover .lang-mesh--base,
    .${uid}:focus-visible .lang-mesh--base { opacity: 0; }
    .${uid}:hover .lang-mesh--hover,
    .${uid}:focus-visible .lang-mesh--hover {
      opacity: 1;
      animation: mesh-drift-${uid} 3s linear infinite;
    }
    @keyframes mesh-drift-${uid} {
      from { background-position: 0 0; }
      to   { background-position: 12px 12px; }
    }

    .${uid}:hover,
    .${uid}:focus-visible {
      color: ${hoverHex};
      border-color: ${hoverHex};
      box-shadow: 0 0 16px rgba(${hover},0.22), inset 0 0 12px rgba(${hover},0.06);
      outline: none;
    }

    .${uid} .lang-text { position: relative; z-index: 1; }

    @media (prefers-reduced-motion: reduce) {
      .${uid}, .${uid} .lang-mesh { transition: none; }
      .${uid}:hover .lang-mesh--hover { animation: none; }
    }
  `

  const toggle = () => {
    changeLanguage(language === 'es' ? 'en' : 'es')
    onSwitch?.()
  }

  return (
    <>
      <style>{styles}</style>
      <button
        type="button"
        onClick={toggle}
        className={uid}
        aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
      >
        <span className="lang-mesh lang-mesh--base" aria-hidden="true" />
        <span className="lang-mesh lang-mesh--hover" aria-hidden="true" />
        <span className="lang-text">{language.toUpperCase()}</span>
      </button>
    </>
  )
}
