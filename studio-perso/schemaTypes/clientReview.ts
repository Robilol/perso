import {defineType} from 'sanity'

export default defineType({
  name: 'clientReview',
  title: 'Avis client',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'meta',
      title: 'Fonction / Entreprise',
      type: 'string',
    },
    {
      name: 'givenreview',
      title: 'Note',
      type: 'number',
      validation: (Rule) => Rule.required().min(0).max(5),
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'text',
      title: 'Commentaire',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'meta',
      media: 'image',
      rating: 'givenreview',
    },
    prepare({title, subtitle, media, rating}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle} - ${rating}/5` : `${rating}/5`,
        media,
      }
    },
  },
})
