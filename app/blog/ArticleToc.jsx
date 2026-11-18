"use client";

import { useEffect, useState } from "react";

// Tabla de contenidos "En esta página" con scrollspy
export default function ArticleToc({ headings }) {
  const [active, setActive] = useState(headings[0]?.id || "");

  useEffect(() => {
    if (!headings.length) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-110px 0px -65% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  const list = (
    <ul>
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className={`block border-l-[3px] py-3.5 pr-3 font-mansfield text-[15px] leading-snug transition-all ${
              h.level === 3 ? "pl-8" : "pl-4"
            } ${
              active === h.id
                ? "border-[#B2FF00] bg-[#B2FF00]/5 pl-6 font-semibold text-[#B2FF00]"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Móvil: desplegable */}
      <details className="mb-10 rounded-md border border-white/10 bg-[#181818] p-4 lg:hidden">
        <summary className="cursor-pointer font-mansfield text-base font-semibold text-white">
          En esta página
        </summary>
        <div className="mt-3">{list}</div>
      </details>

      {/* Escritorio: lateral fijo */}
      <nav
        aria-label="En esta página"
        className="sticky top-28 hidden lg:block"
      >
        <p className="mb-4 border-b border-white/15 pb-4 font-mansfield text-xl font-semibold text-white">
          En esta página
        </p>
        {list}
      </nav>
    </>
  );
}
