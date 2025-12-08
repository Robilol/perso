import {defineType} from 'sanity'

export default defineType({
  name: 'portfolioFilter',
  title: 'Filtre de portfolio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Valeur',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'value',
    },
  },
})
