'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPostBySlug } from '@/app/lib/wordpress';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BlogPostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostBySlug(params.slug);
        if (!data) {
          router.push('/blog');
          return;
        }
        setPost(data);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Error al cargar el post');
        setTimeout(() => router.push('/blog'), 2000);
      } finally {
        setLoading(false);
      }
    }

    if (params.slug) {
      fetchPost();
    }
  }, [params.slug, router]);

  const sharePost = (platform) => {
    if (!post) return;

    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title.replace(/<[^>]*>/g, '');

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#B2FF00] mx-auto mb-4"></div>
          <p className="text-white text-xl">Cargando post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Post no encontrado'}</p>
          <p className="text-gray-400">Redirigiendo al blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010]">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#B2FF00] hover:text-white transition-colors mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al blog
        </Link>
      </div>

      {/* Featured Image Hero */}
      {post.featuredImage?.node?.sourceUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative h-[400px] w-full mb-12"
        >
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            fill
            unoptimized={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101010] to-transparent"></div>
        </motion.div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Categories */}
          {post.categories?.nodes && post.categories.nodes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.nodes.map((category) => (
                <span
                  key={category.slug}
                  className="text-sm px-4 py-2 bg-[#B2FF00] text-[#101010] rounded-full font-semibold"
                >
                  {category.name}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />

          {/* Meta */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-800">
            {post.author?.node?.avatar?.url && (
              <Image
                src={post.author.node.avatar.url}
                alt={post.author.node.name}
                width={48}
                height={48}
                unoptimized={true}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-white font-semibold">{post.author?.node?.name}</p>
              <time dateTime={post.date} className="text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString('es-CR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#B2FF00] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-4 prose-blockquote:border-[#B2FF00] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
              prose-code:text-[#B2FF00] prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-800
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:text-gray-300
              prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <p className="text-white font-semibold mb-4">Compartir este artículo:</p>
            <div className="flex gap-4">
              <button
                onClick={() => sharePost('twitter')}
                className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>

              <button
                onClick={() => sharePost('linkedin')}
                className="flex items-center gap-2 px-6 py-3 bg-[#0077B5] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>

              <button
                onClick={() => sharePost('facebook')}
                className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-[#B2FF00] to-[#8FCC00] rounded-lg text-center">
            <h3 className="text-3xl font-bold text-[#101010] mb-4">
              ¿Necesitás ayuda con tu proyecto web?
            </h3>
            <p className="text-[#101010] mb-6">
              En Aurigital convertimos tus ideas en realidad digital
            </p>
            <Link
              href="/contacto"
              className="inline-block px-8 py-3 bg-[#101010] text-white font-semibold rounded-lg hover:bg-[#252525] transition-colors"
            >
              Contactanos
            </Link>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
