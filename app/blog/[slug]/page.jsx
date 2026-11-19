import Link from "next/link";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "../blog-content.css";
import ImagenAjustable from "../../components/ImagenAjustable";
import config from "../../../keystatic.schema";
import NavbarServicios from "../../components/ServiciosPages/NavbarServicios";
import Footer from "../../components/Footer";
import ArticleToc from "../ArticleToc";
import StructuredData from "../../components/seo/StructuredData";
import { buildMetadata, canonicalUrl } from "../../lib/seo";
import { getBlogPostingSchema, getBreadcrumbSchema } from "../../lib/structuredData";

const reader = createReader(process.cwd(), config);

// Metadata propia por artículo (canonical, Open Graph, keywords).
// Sin esto cada artículo heredaría el canonical de /blog y Google lo desindexaría.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post || post.status !== "published") return {};

  const titulo = (post.seoTitle || post.title).trim();

  return buildMetadata({
    title: titulo.includes("Aurigital") ? titulo : `${titulo} | Aurigital`,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords?.length ? post.keywords : undefined,
    type: "article",
    publishedTime: post.publishedDate || undefined,
    authors: post.author ? [post.author] : undefined,
    tags: post.keywords,
    ...(post.coverImage
      ? { image: canonicalUrl(post.coverImage), imageAlt: post.title }
      : {}),
  });
}

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

/* ---------- Utilidades ---------- */

const slugify = (texto) =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Texto plano de un nodo ya transformado
const textoDe = (nodo) => {
  if (typeof nodo === "string") return nodo;
  if (Array.isArray(nodo)) return nodo.map(textoDe).join("");
  if (nodo && nodo.children) return textoDe(nodo.children);
  return "";
};

// Recorre el árbol: asigna id a h2/h3 y devuelve la lista para la tabla de contenidos
const extraerTitulos = (nodo, titulos = [], usados = new Set()) => {
  if (Array.isArray(nodo)) {
    nodo.forEach((n) => extraerTitulos(n, titulos, usados));
    return titulos;
  }
  if (!nodo || typeof nodo !== "object") return titulos;

  if (nodo.name === "h2" || nodo.name === "h3") {
    const text = textoDe(nodo).trim();
    let id = slugify(text) || "seccion";
    let n = 2;
    while (usados.has(id)) id = `${slugify(text)}-${n++}`;
    usados.add(id);
    nodo.attributes = { ...nodo.attributes, id };
    titulos.push({ id, text, level: nodo.name === "h2" ? 2 : 3 });
  }
  if (nodo.children) extraerTitulos(nodo.children, titulos, usados);
  return titulos;
};

const formatearFecha = (iso) =>
  iso
    ? new Date(`${iso}T12:00:00`).toLocaleDateString("es-CR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEPT", "OCT", "NOV", "DIC"];
const formatearCorta = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1]} ${y}`;
};

const nombreCategoria = (c) => c.replaceAll("-", " ");

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

  const titulos = extraerTitulos(contenido);
  const palabras = textoDe(contenido).split(/\s+/).filter(Boolean).length;
  const minutos = Math.max(1, Math.round(palabras / 200));

  const fecha = formatearFecha(post.publishedDate);
  const mostrarCat = post.category && post.category !== "sin-categoria";

  // Otros artículos (los 3 más recientes distintos al actual)
  const otros = (await reader.collections.posts.all())
    .filter((p) => p.entry.status === "published" && p.slug !== slug)
    .sort((a, b) =>
      (b.entry.publishedDate || "").localeCompare(a.entry.publishedDate || "")
    )
    .slice(0, 3);

  return (
    <main className="overflow-x-clip bg-[#101010] text-white">
      <StructuredData
        data={getBlogPostingSchema({
          title: post.title,
          description: post.description,
          url: canonicalUrl(`/blog/${slug}`),
          image: post.coverImage ? canonicalUrl(post.coverImage) : undefined,
          datePublished: post.publishedDate || undefined,
          author: post.author,
          keywords: post.keywords,
          section: mostrarCat ? nombreCategoria(post.category) : undefined,
        })}
      />
      <StructuredData
        data={getBreadcrumbSchema([
          { name: "Inicio", url: canonicalUrl("/") },
          { name: "Blog", url: canonicalUrl("/blog") },
          { name: post.title, url: canonicalUrl(`/blog/${slug}`) },
        ])}
      />
      <NavbarServicios dark />

      {/* ENCABEZADO CENTRADO */}
      <header className="mx-auto flex max-w-4xl flex-col items-center px-5 pb-12 pt-14 text-center md:pt-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 font-mansfield text-sm text-gray-400 transition-colors hover:text-[#B2FF00]"
        >
          <ArrowLeft size={14} /> Volver al blog
        </Link>

        {mostrarCat && (
          <span className="mb-8 rounded-md border border-white/20 px-8 py-3.5 font-mansfield text-lg capitalize text-gray-200">
            {nombreCategoria(post.category)}
          </span>
        )}

        <h1 className="font-qurova text-3xl font-bold uppercase leading-tight md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-8 font-mansfield text-lg text-gray-400">
          <span className="font-semibold text-white">{post.author}</span>
          {fecha && <> - {fecha}</>}
          <span className="text-gray-600"> · </span>
          {minutos} min de lectura
        </p>
      </header>

      {/* PORTADA A ANCHO COMPLETO */}
      {post.coverImage && (
        <div className="w-full px-5 md:px-10">
          <div className="h-[55vh] w-full overflow-hidden rounded-md bg-[#181818] md:h-[calc(100vh-40px)] md:min-h-[600px]">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* TABLA DE CONTENIDOS + CONTENIDO */}
      <div className="mx-auto grid max-w-[110rem] gap-x-14 px-5 pb-24 pt-14 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside>
          <ArticleToc headings={titulos} />
        </aside>

        <article className="min-w-0">
          <div className="blog-content">
            {Markdoc.renderers.react(contenido, React, {
              components: { ImagenAjustable },
            })}
          </div>
        </article>
      </div>

      {/* OTROS ARTÍCULOS */}
      {otros.length > 0 && (
        <section className="mx-auto max-w-[110rem] px-5 pb-24">
          <h2 className="mb-12 font-qurova text-[11vw] font-bold uppercase leading-[0.95] tracking-tight md:text-[6.5vw]">
            Otros <span className="text-[#B2FF00]">artículos</span>
          </h2>

          <div className="grid grid-cols-1 gap-x-5 gap-y-14 md:grid-cols-3">
            {otros.map((o) => {
              const e = o.entry;
              const cat = e.category && e.category !== "sin-categoria";
              return (
                <Link
                  href={`/blog/${o.slug}`}
                  key={o.slug}
                  className="group flex h-full flex-col"
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-[#181818]">
                    {e.coverImage && (
                      <img
                        src={e.coverImage}
                        alt={e.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    {cat && (
                      <span className="absolute left-4 top-4 rounded-sm border border-white/20 bg-black/50 px-4 py-2 font-mansfield text-sm font-medium capitalize text-white backdrop-blur-md">
                        {nombreCategoria(e.category)}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center gap-3 font-mansfield">
                    <span className="rounded-sm bg-[#B2FF00] px-3 py-2 text-sm font-bold uppercase text-black">
                      {formatearCorta(e.publishedDate)}
                    </span>
                    <span className="text-sm text-gray-400">Por {e.author}</span>
                  </div>

                  <h3 className="mt-4 line-clamp-3 font-mansfield text-lg font-semibold uppercase leading-snug text-white transition-colors group-hover:text-[#B2FF00]">
                    {e.title}
                  </h3>

                  {e.description && (
                    <p className="mt-2 line-clamp-4 font-mansfield leading-relaxed text-gray-400">
                      {e.description}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <div className="px-2 pb-5">
        <Footer />
      </div>
    </main>
  );
}
