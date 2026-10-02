import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons/Book'

export default defineType({
  name: 'educationalBackground',
  title: 'Formation',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Diplôme',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'École / Lieu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'year',
      title: 'Années',
      type: 'string',
      description: 'Ex. « 2017 - 2019 » (sert aussi au tri)',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [{title: 'Plus récentes', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}]}],
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
