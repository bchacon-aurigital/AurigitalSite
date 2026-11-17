import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.schema";
import BlogFilters from "./BlogFilters";
import NavbarServicios from "../components/ServiciosPages/NavbarServicios";
import Footer from "../components/Footer";

const reader = createReader(process.cwd(), config);

export default async function BlogPage() {
  const posts = await reader.collections.posts.all();

  // Solo artículos publicados, del más reciente al más antiguo
  const publicados = posts
    .filter((post) => post.entry.status === "published")
    .map((post) => ({
      slug: post.slug,
      title: post.entry.title,
      description: post.entry.description,
      author: post.entry.author,
      coverImage: post.entry.coverImage,
      category: post.entry.category,
      publishedDate: post.entry.publishedDate,
    }))
    .sort((a, b) =>
      (b.publishedDate || "").localeCompare(a.publishedDate || "")
    );

  return (
    <main className="overflow-x-clip bg-[#101010] text-white">
      <NavbarServicios dark />

      {/* TÍTULO GIGANTE */}
      <section className="mx-auto max-w-[110rem] px-5 pb-10 pt-16 md:pb-16 md:pt-24">
        <h1 className="font-qurova text-[15vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[10.5vw]">
          Aurigital <span className="text-[#B2FF00]">Blog</span>
        </h1>
        <p className="mt-6 max-w-2xl font-mansfield text-base text-gray-400 md:text-lg">
          Ideas, tendencias y conocimientos sobre diseño, desarrollo web y
          tecnología.
        </p>
      </section>

      <BlogFilters posts={publicados} />

      <div className="px-2 pb-5">
        <Footer />
      </div>
    </main>
  );
}
