
import Link from "next/link";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import { notFound } from "next/navigation";
import "../blog-content.css";
import ImagenAjustable from "../../components/ImagenAjustable";
import config from "../../../keystatic.schema";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";
import Footer from "../../components/Footer";

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

  const mostrarCat = post.category && post.category !== "sin-categoria";

  return (
    <main className="overflow-x-clip bg-[#101010] text-white">
      <NavbarServicios dark />

      <article className="mx-auto max-w-4xl px-6 pb-20 pt-16 md:pt-24">
        {/* REGRESAR AL BLOG */}
        <Link
          href="/blog"
          className="mb-10 inline-block font-mansfield text-sm text-gray-400 transition-colors hover:text-[#B2FF00]"
        >
          ← Volver al blog
        </Link>

        {/* FECHA, AUTOR Y CATEGORÍA */}
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mansfield">
          {fecha && (
            <span className="rounded-sm bg-[#B2FF00] px-3 py-2 text-sm font-bold uppercase text-black">
              {fecha}
            </span>
          )}
          <span className="text-sm text-gray-400">Por {post.author}</span>
          {mostrarCat && (
            <span className="rounded-sm border border-white/20 px-3 py-2 text-sm text-white">
              {post.category.replaceAll("-", " ")}
            </span>
          )}
        </div>

        {/* TÍTULO */}
        <h1 className="mb-6 font-qurova text-4xl font-bold uppercase leading-tight md:text-6xl">
          {post.title}
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="mb-10 font-mansfield text-xl leading-relaxed text-gray-400">
          {post.description}
        </p>

        {/* IMAGEN DE PORTADA (misma proporción que en el listado) */}
        {post.coverImage && (
          <div className="mb-14 aspect-video w-full overflow-hidden rounded-md bg-[#181818]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
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
            className="font-mansfield text-sm font-medium transition-colors hover:text-[#B2FF00]"
          >
            ← Ver más artículos
          </Link>
        </div>
      </article>

      <div className="px-2 pb-5">
        <Footer />
      </div>
    </main>
  );
}
