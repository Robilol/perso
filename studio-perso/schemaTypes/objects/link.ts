import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export default defineType({
  name: 'link',
  title: 'Lien',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      description: 'Ex. « App Store », « Code source », « Démo »',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'url'},
  },
})
