'use client'
import { useId } from 'react'
import Link from 'next/link'

export default function CotizacionButton({ children, onClick, href, variant = 'lime', fullWidth = false, external = false }) {
  const uid = `cta-${useId().replace(/:/g, '')}`

  const isWhite = variant === 'white'

  const meshColor    = isWhite ? '255,255,255' : '178,255,0'
  const baseBg       = isWhite ? 'transparent' : '#ffffff'
  const baseBorder   = isWhite ? '#ffffff'     : '#ffffff'
  const baseColor    = isWhite ? '#ffffff'     : '#101010'
  const hoverFill    = '#0d0d0d'
  const hoverText    = isWhite ? '#ffffff'     : '#B2FF00'
  const hoverGlow    = isWhite ? '255,255,255' : '178,255,0'
  const hoverBorder  = isWhite ? '#ffffff'     : '#B2FF00'

  const styles = `
    .${uid} {
      position: relative;
      overflow: hidden;
      background: ${baseBg};
      color: ${baseColor};
      border: 2px solid ${baseBorder};
      border-radius: 0.75rem;
      padding: 0.45rem 1.75rem;
      font-family: var(--font-space-grotesk, sans-serif);
      font-weight: 500;
      font-size: 1rem;
      white-space: nowrap;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      ${fullWidth ? 'width: 100%;' : 'align-self: flex-start;'}
      transition: border-color 0.4s, box-shadow 0.4s;
    }

    .${uid}::after {
      content: '';
      position: absolute;
      inset: 0;
      background: ${hoverFill};
      opacity: 0;
      transition: opacity 0.35s ease;
      z-index: 0;
    }
    .${uid}:hover::after { opacity: 1; }

    .${uid} .cta-mesh {
      position: absolute;
      inset: -2px;
      background-image:
        linear-gradient(rgba(${meshColor},0.18) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${meshColor},0.18) 1px, transparent 1px);
      background-size: 14px 14px;
      background-position: 0 0;
      opacity: 0;
      z-index: 1;
      transition: opacity 0.35s ease 0.05s;
    }
    .${uid}:hover .cta-mesh {
      opacity: 1;
      animation: mesh-drift-${uid} 3s linear infinite;
    }
    @keyframes mesh-drift-${uid} {
      from { background-position: 0 0; }
      to   { background-position: 14px 14px; }
    }

    .${uid} .cta-sweep {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        105deg,
        transparent 30%,
        rgba(${meshColor},0.10) 50%,
        transparent 70%
      );
      transform: translateX(-100%);
      z-index: 2;
      opacity: 0;
      transition: opacity 0.2s;
    }
    .${uid}:hover .cta-sweep {
      opacity: 1;
      animation: sweep-${uid} 1.4s ease-in-out infinite;
    }
    @keyframes sweep-${uid} {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }

    .${uid} .cta-text {
      position: relative;
      z-index: 3;
      letter-spacing: 0.03em;
      display: inline-flex;
      align-items: center;
      gap: 0.45em;
      transition: color 0.35s ease, text-shadow 0.35s ease;
    }
    .${uid}:hover .cta-text {
      color: ${hoverText};
      text-shadow: 0 0 10px rgba(${hoverGlow},0.5);
    }

    .${uid}:hover {
      border-color: ${hoverBorder};
      box-shadow: 0 0 16px rgba(${hoverGlow},0.22), inset 0 0 12px rgba(${hoverGlow},0.06);
    }
  `

  const inner = (
    <>
      <span className="cta-mesh"  aria-hidden="true" />
      <span className="cta-sweep" aria-hidden="true" />
      <span className="cta-text">{children}</span>
    </>
  )

  return (
    <>
      <style>{styles}</style>
      {href
        ? <Link href={href} className={uid} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</Link>
        : <button onClick={onClick} className={uid}>{inner}</button>
      }
    </>
  )
}
