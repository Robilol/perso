import {defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'coverimage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'imagegallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'videogallery',
      title: 'Galerie de vidéos',
      type: 'array',
      of: [{type: 'url'}],
    },
    {
      name: 'url',
      title: 'URL du projet',
      type: 'url',
    },
    {
      name: 'filters',
      title: 'Filtres',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'React.js', value: 'react'},
          {title: 'Next.js', value: 'nextjs'},
          {title: 'Prestashop', value: 'prestashop'},
          {title: 'Wordpress', value: 'wordpress'},
        ],
      },
    },
    {
      name: 'tags',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverimage',
    },
  },
})
