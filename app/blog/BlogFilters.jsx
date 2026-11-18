"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";

const POSTS_POR_PAGINA = 9;

const categorias = [
  { label: "Todos", value: "todas" },
  { label: "Diseño UI/UX", value: "diseno-ui-ux" },
  { label: "Desarrollo web", value: "desarrollo-web" },
  { label: "Diseño", value: "diseño" },
  { label: "Noticias de Aurigital", value: "noticias" },
];

const MESES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEPT", "OCT", "NOV", "DIC",
];

function formatearFecha(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1]} ${y}`;
}

export default function BlogFilters({ posts }) {
  const [categoria, setCategoria] = useState("todas");
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return posts.filter((post) => {
      if (categoria !== "todas" && post.category !== categoria) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.description || "").toLowerCase().includes(q)
      );
    });
  }, [posts, categoria, busqueda]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(filtrados.length / POSTS_POR_PAGINA)
  );
  const paginaActual = Math.min(pagina, totalPaginas);
  const visibles = filtrados.slice(
    (paginaActual - 1) * POSTS_POR_PAGINA,
    paginaActual * POSTS_POR_PAGINA
  );

  const irAPagina = (n) => {
    setPagina(n);
    document
      .getElementById("blog-listado")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="blog-listado"
      className="mx-auto max-w-[110rem] scroll-mt-24 px-5 pb-20"
    >
      {/* BARRA: ORDENAR + BUSCAR */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex w-full items-center justify-between rounded-md border border-white/15 px-5 py-3.5 font-mansfield text-white focus-within:border-[#B2FF00] sm:w-auto sm:min-w-[20rem]">
          <span className="text-gray-300">Ordenar por</span>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setPagina(1);
            }}
            className="cursor-pointer appearance-none bg-transparent pr-6 text-right outline-none"
            aria-label="Filtrar por categoría"
          >
            {categorias.map((c) => (
              <option key={c.value} value={c.value} className="bg-[#101010]">
                {c.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-4"
          />
        </label>

        <label className="relative flex w-full items-center rounded-md border border-white/15 focus-within:border-[#B2FF00] sm:w-80">
          <input
            type="search"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
            placeholder="Buscar"
            aria-label="Buscar artículos"
            className="w-full bg-transparent px-5 py-3.5 pr-12 font-mansfield text-white placeholder-gray-300 outline-none"
          />
          <Search size={18} className="pointer-events-none absolute right-4" />
        </label>
      </div>

      {/* RESULTADOS */}
      {visibles.length === 0 ? (
        <p className="py-20 text-center font-mansfield text-gray-400">
          No encontramos artículos con ese criterio.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 items-start gap-x-6 gap-y-14 md:grid-cols-3 md:gap-x-5 md:gap-y-16">
          {visibles.map((post) => {
            const cat = categorias.find((c) => c.value === post.category);
            const mostrarCat =
              post.category && post.category !== "sin-categoria";

            return (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="group flex h-full flex-col"
              >
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-[#181818]">
                  {post.coverImage && (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {mostrarCat && (
                    <span className="absolute left-4 top-4 rounded-sm border border-white/20 bg-black/50 px-4 py-2 font-mansfield text-sm font-medium text-white backdrop-blur-md">
                      {cat?.label || post.category}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-center gap-3 font-mansfield">
                  <span className="rounded-sm bg-[#B2FF00] px-3 py-2 text-sm font-bold uppercase text-black">
                    {formatearFecha(post.publishedDate)}
                  </span>
                  <span className="text-sm text-gray-400">
                    Por {post.author}
                  </span>
                </div>

                <h2 className="mt-4 line-clamp-3 font-mansfield text-lg font-semibold uppercase leading-snug text-white transition-colors group-hover:text-[#B2FF00]">
                  {post.title}
                </h2>

                {post.description && (
                  <p className="mt-2 line-clamp-5 font-mansfield leading-relaxed text-gray-400">
                    {post.description}
                  </p>
                )}

                <span className="mt-3 inline-flex items-center gap-1 font-mansfield text-sm font-semibold text-[#B2FF00]">
                  Leer más
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <nav
          aria-label="Paginación"
          className="mt-16 flex items-center justify-center gap-1 font-mansfield"
        >
          <button
            type="button"
            onClick={() => irAPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            aria-label="Página anterior"
            className="rounded-md bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => irAPagina(n)}
              aria-current={n === paginaActual ? "page" : undefined}
              className={`px-2.5 py-1 text-lg transition-colors ${
                n === paginaActual
                  ? "font-bold text-[#B2FF00]"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => irAPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            aria-label="Página siguiente"
            className="rounded-md bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}
    </section>
  );
}
