import {defineType} from 'sanity'

export default defineType({
  name: 'educationalBackground',
  title: 'Formation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Diplôme',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'meta',
      title: 'École / Lieu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'text',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'year',
      title: 'Année',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'meta',
      description: 'year',
    },
    prepare({title, subtitle, description}) {
      return {
        title,
        subtitle: `${subtitle} - ${description}`,
      }
    },
  },
})
