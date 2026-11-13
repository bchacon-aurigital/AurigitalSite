
"use client";

import { useState } from "react";
import Link from "next/link";

const categorias = [
  { label: "Todas", value: "todas" },
  { label: "Diseño UI/UX", value: "diseno-ui-ux" },
  { label: "Desarrollo web", value: "desarrollo-web" },
  { label: "Marketing digital", value: "marketing-digital" },
  { label: "Diseño", value: "diseño" },
  { label: "Noticias de Aurigital", value: "noticias" },
];

export default function BlogFilters({ posts }) {
  const [categoria, setCategoria] = useState("todas");

  const filtrados = posts.filter((post) => {
    if (categoria === "todas") return true;

    return post.category === categoria;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">

      <h2 className="mb-8 text-2xl font-semibold">
        Explorar artículos
      </h2>

      {/* BOTONES PARA FILTRAR */}
      <div className="mb-10 flex flex-wrap gap-3">

        {categorias.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategoria(cat.value)}
            aria-pressed={categoria === cat.value}
            className={`rounded-full border px-5 py-3 text-sm transition-colors ${
              categoria === cat.value
                ? "border-white bg-white text-black"
                : "border-white/20 text-white hover:border-white"
            }`}
          >
            {cat.label}
          </button>
        ))}

      </div>

      {/* RESULTADOS */}
      {filtrados.length === 0 ? (
        <p className="text-gray-400">
          No hay artículos en esta categoría.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filtrados.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#181818] transition-colors hover:border-white/30"
            >

              {post.coverImage && (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-6">

                {post.category &&
                  post.category !== "sin-categoria" && (
                    <p className="mb-3 text-sm text-emerald-400">
                      {categorias.find(
                        (c) => c.value === post.category
                      )?.label || post.category}
                    </p>
                  )}

                <h3 className="mb-3 text-2xl font-semibold">
                  {post.title}
                </h3>

                <p className="mb-5 text-gray-400">
                  {post.description}
                </p>

                <span className="text-sm font-medium">
                  Leer artículo →
                </span>

              </div>
            </Link>
          ))}

        </div>
      )}
    </section>
  );
}
