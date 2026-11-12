
import { config, collection, fields } from '@keystatic/core';

export default config({
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
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),

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
              label: 'Marketing digital',
              value: 'marketing-digital',
            },
            {
              label: 'Tecnología',
              value: 'tecnologia',
            },
            {
              label: 'Noticias de Aurigital',
              value: 'noticias',
            },
          ],
          defaultValue: 'sin-categoria',
        }),

        // ESTADO - SELECCIÓN OBLIGATORIA
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

        // CONTENIDO
        content: fields.markdoc({
          label: 'Contenido del artículo *',
          description:
            'Escribí aquí el contenido completo del artículo.',
        }),
      },
    }),
  },
});
