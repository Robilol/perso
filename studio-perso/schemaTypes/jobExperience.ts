import {defineType} from 'sanity'

export default defineType({
  name: 'jobExperience',
  title: 'Expérience professionnelle',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Poste',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'meta',
      title: 'Entreprise / Lieu',
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
      title: 'Période',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'string'}],
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
