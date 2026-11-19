
import { config, collection, fields } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';
import { createElement } from 'react';
import VistaPreviaImagenKeystatic from './app/components/VistaPreviaImagenKeystatic';


export default config({
  ui: {
    brand: {
      name: 'Aurigital Studio',
    },

    navigation: {
      'Gestión de contenido': ['posts'],
    },
  },

  storage: {
    kind: 'local',
  },


  collections: {
    posts: collection({
      label: 'Artículos del blog',
      slugField: 'title',
      path: 'content/posts/*',

      schema: {
        // TÍTULO Y SLUG - OBLIGATORIOS
        title: fields.slug({
          name: {
            label: 'Título del artículo *',
            validation: {
              length: { min: 1 },
            },
          },
          slug: {
            label: 'Slug (URL del artículo) *',
          },
        }),

        // DESCRIPCIÓN - OBLIGATORIA
        description: fields.text({
          label: 'Descripción *',
          description:
            'Es el texto que Google muestra bajo el título. Ideal: entre 120 y 155 caracteres, incluyendo la palabra clave principal.',
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),

        // SEO - OPCIONALES
        seoTitle: fields.text({
          label: 'Título SEO (opcional)',
          description:
            'Título que aparece en Google (ideal: hasta 60 caracteres, con la palabra clave principal). Si lo dejás vacío se usa el título del artículo.',
        }),

        keywords: fields.array(
          fields.text({
            label: 'Palabra clave',
            validation: { length: { min: 1 } },
          }),
          {
            label: 'Palabras clave (SEO)',
            description:
              'Agregá entre 3 y 8 frases por las que querés que te encuentren, ej. "diseño web Costa Rica". La primera es la principal: usala también en el título y la descripción.',
            itemLabel: (props) => props.value,
          }
        ),

        // AUTOR - OBLIGATORIO
        author: fields.text({
          label: 'Autor *',
          validation: {
            length: { min: 1 },
          },
        }),

        // IMAGEN DE PORTADA - OBLIGATORIA
        coverImage: fields.image({
          label: 'Imagen de portada *',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
          validation: {
            isRequired: true,
          },
        }),

        // FECHA - OBLIGATORIA
        publishedDate: fields.date({
          label: 'Fecha de publicación *',
          validation: {
            isRequired: true,
          },
        }),

        // CATEGORÍA - OPCIONAL
        category: fields.select({
          label: 'Categoría (opcional)',
          description:
            'Si no seleccionás una categoría, quedará como Sin categoría.',
          options: [
            {
              label: 'Sin categoría',
              value: 'sin-categoria',
            },
            {
              label: 'Diseño UI/UX',
              value: 'diseno-ui-ux',
            },
            {
              label: 'Desarrollo web',
              value: 'desarrollo-web',
            },
            {
              label: 'Diseño',
              value: 'diseño',
            },
            {
              label: 'Noticias de Aurigital',
              value: 'noticias',
            },
          ],
          defaultValue: 'sin-categoria',
        }),

        // ESTADO DEL ARTÍCULO
        status: fields.select({
          label: 'Estado del artículo *',
          description:
            'Borrador: en preparación. Publicado: listo para mostrarse en el blog.',
          options: [
            {
              label: 'Borrador',
              value: 'draft',
            },
            {
              label: 'Publicado',
              value: 'published',
            },
          ],
          defaultValue: 'draft',
        }),

        // CONTENIDO DEL ARTÍCULO
        content: fields.markdoc({
          label: 'Contenido del artículo - TEST IMAGEN',

          options: {
            image: {
              directory: 'public/images/blog-content',
              publicPath: '/images/blog-content/',
            },
          },

          components: {
            ImagenAjustable: block({
              label: 'Imagen con tamaño personalizado',

              // VISTA PREVIA DENTRO DE KEYSTATIC
              ContentView: (props) =>
                createElement(
                  VistaPreviaImagenKeystatic,
                  props.value
                ),

              schema: {
                // IMAGEN
                image: fields.image({
                  label: 'Seleccionar imagen',
                  directory: 'public/images/blog-adjustable',
                  publicPath: '/images/blog-adjustable/',
                  validation: {
                    isRequired: true,
                  },
                }),

                // DESCRIPCIÓN
                alt: fields.text({
                  label: 'Descripción de la imagen',
                  description:
                    'Texto alternativo para accesibilidad.',
                }),

                // TAMAÑO PERSONALIZADO
                size: fields.select({
                  label: 'Tamaño de la imagen',
                  options: [
                    {
                      label: 'Pequeña',
                      value: 'small',
                    },
                    {
                      label: 'Mediana',
                      value: 'medium',
                    },
                    {
                      label: 'Grande',
                      value: 'large',
                    },
                    {
                      label: 'Ancho completo',
                      value: 'full',
                    },
                  ],
                  defaultValue: 'medium',
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
