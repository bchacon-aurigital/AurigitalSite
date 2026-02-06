'use client';

import { useState, useEffect } from 'react';
import { getAllPosts } from '@/app/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error loading posts:', err);
        setError('Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B2FF00] mx-auto mb-4"></div>
          <p className="text-white text-xl">Cargando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Blog <span className="text-[#B2FF00]">Aurigital</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, noticias y artículos sobre desarrollo web y tecnología
          </p>
        </motion.div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-xl">No hay posts disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-transparent hover:border-[#B2FF00]"
              >
                <Link href={`/blog/${post.slug}`}>
                  {/* Featured Image */}
                  <div className="relative h-48 bg-[#252525]">
                    {post.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        fill
                        unoptimized={true}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-[#B2FF00] text-6xl font-bold">A</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Categories */}
                    {post.categories?.nodes && post.categories.nodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.nodes.map((category) => (
                          <span
                            key={category.slug}
                            className="text-xs px-3 py-1 bg-[#B2FF00] text-[#101010] rounded-full font-semibold"
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2
                      className="text-2xl font-bold text-white mb-3 hover:text-[#B2FF00] transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    {/* Excerpt */}
                    <div
                      className="text-gray-400 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {post.author?.node?.avatar?.url && (
                        <Image
                          src={post.author.node.avatar.url}
                          alt={post.author.node.name}
                          width={32}
                          height={32}
                          unoptimized={true}
                          className="rounded-full"
                        />
                      )}
                      <span>{post.author?.node?.name}</span>
                      <span>•</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('es-CR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
