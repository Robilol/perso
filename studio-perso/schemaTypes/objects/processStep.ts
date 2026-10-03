import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'processStep',
  title: 'Étape',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
  },
})
