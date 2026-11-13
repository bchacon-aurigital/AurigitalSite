
import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.schema";
import BlogFilters from "./BlogFilters";

const reader = createReader(process.cwd(), config);

export default async function BlogPage() {
  const posts = await reader.collections.posts.all();

  // Mostrar únicamente artículos publicados
  const publicados = posts
    .filter((post) => post.entry.status === "published")
    .map((post) => ({
      slug: post.slug,
      title: post.entry.title,
      description: post.entry.description,
      coverImage: post.entry.coverImage,
      category: post.entry.category,
      publishedDate: post.entry.publishedDate,
    }));

  return (
    <main className="min-h-screen bg-[#101010] text-white">

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28">

        <p className="mb-5 text-sm uppercase tracking-[0.25em] text-gray-400">
          // Blog de Aurigital
        </p>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
          Ideas que impulsan
          <br />
          el mundo digital.
        </h1>

        <p className="mt-7 max-w-2xl text-lg text-gray-400">
          Explorá ideas, tendencias y conocimientos
          sobre diseño, desarrollo web y tecnología.
        </p>

      </section>

      {/* FILTROS Y ARTÍCULOS */}
      <BlogFilters posts={publicados} />

    </main>
  );
}
