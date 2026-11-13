
import Link from "next/link";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import { notFound } from "next/navigation";
import ImagenAjustable from "../../components/ImagenAjustable";

import config from "../../../keystatic.schema";

const reader = createReader(process.cwd(), config);

// Generar las rutas de los artículos publicados
export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();

  return posts
    .filter((post) => post.entry.status === "published")
    .map((post) => ({
      slug: post.slug,
    }));
}

export const dynamicParams = false;

// Leer y mostrar un artículo
export default async function ArticuloPage({ params }) {
  const { slug } = await params;

  const post = await reader.collections.posts.read(slug);

  // No mostrar artículos inexistentes o borradores
  if (!post || post.status !== "published") {
    notFound();
  }

  // Obtener el contenido escrito en Keystatic
  const { node } = await post.content();
  
const contenido = Markdoc.transform(node, {
  tags: {
    ImagenAjustable: {
      render: "ImagenAjustable",
      attributes: {
        image: { type: String },
        alt: { type: String },
        size: { type: String, default: "medium" },
      },
    },
  },
});


  // Formatear la fecha
  const fecha = post.publishedDate
    ? new Date(
        `${post.publishedDate}T12:00:00`
      ).toLocaleDateString("es-CR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-[#101010] text-white">

      <article className="mx-auto max-w-4xl px-6 py-24">

        {/* REGRESAR AL BLOG */}
        <Link
          href="/blog"
          className="mb-12 inline-block text-sm text-gray-400 hover:text-white"
        >
          ← Volver al blog
        </Link>

        {/* CATEGORÍA */}
        {post.category &&
          post.category !== "sin-categoria" && (
            <p className="mb-5 text-sm uppercase tracking-widest text-emerald-400">
              {post.category.replaceAll("-", " ")}
            </p>
          )}

        {/* TÍTULO */}
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          {post.title}
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="mb-8 text-xl leading-relaxed text-gray-400">
          {post.description}
        </p>

        {/* AUTOR Y FECHA */}
        <div className="mb-12 flex flex-wrap gap-4 text-sm text-gray-400">
          <span>Por {post.author}</span>
          {fecha && <span>• {fecha}</span>}
        </div>

        {/* IMAGEN DE PORTADA */}
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-14 w-full rounded-2xl object-cover"
          />
        )}

        {/* CONTENIDO DEL ARTÍCULO */}
        <div className="blog-content">
          
{Markdoc.renderers.react(contenido, React, {
  components: {
    ImagenAjustable,
  },
})}

        </div>

        {/* ENLACE INFERIOR */}
        <div className="mt-20 border-t border-white/10 pt-8">
          <Link
            href="/blog"
            className="text-sm font-medium hover:text-gray-400"
          >
            ← Ver más artículos
          </Link>
        </div>

      </article>

    </main>
  );
}
