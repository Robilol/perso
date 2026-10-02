import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export default defineType({
  name: 'clientReview',
  title: 'Témoignage',
  type: 'document',
  icon: CommentIcon,
  description: 'Les témoignages publiés apparaissent dans une section dédiée de la page d’accueil.',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Fonction / Entreprise',
      type: 'string',
    }),
    defineField({
      name: 'givenreview',
      title: 'Note',
      type: 'number',
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'text',
      title: 'Témoignage',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'meta',
      media: 'image',
    },
  },
})
