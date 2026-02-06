import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const client = new GraphQLClient(endpoint, {
  headers: {},
});

// Función base para hacer queries a WordPress
export async function fetchAPI(query, variables = {}) {
  try {
    const data = await client.request(query, variables);
    return data;
  } catch (error) {
    console.error('Error fetching from WordPress:', error);
    throw error;
  }
}

// Obtener todos los posts
export async function getAllPosts(first = 100) {
  const query = `
    query GetAllPosts($first: Int!) {
      posts(first: $first, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { first });
  return data.posts.nodes;
}

// Obtener un post por slug
export async function getPostBySlug(slug) {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        seo {
          title
          metaDesc
          opengraphImage {
            sourceUrl
          }
        }
      }
    }
  `;

  const data = await fetchAPI(query, { slug });
  return data.post;
}

// Obtener todos los slugs de posts (para generateStaticParams futuro)
export async function getAllPostSlugs() {
  const query = `
    query GetAllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `;

  const data = await fetchAPI(query);
  return data.posts.nodes;
}
