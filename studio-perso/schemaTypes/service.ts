import {defineArrayMember, defineField, defineType} from 'sanity'
import {WrenchIcon} from '@sanity/icons/Wrench'

export const SERVICE_ICONS = [
  {title: 'Code', value: 'code'},
  {title: 'Serveur / API', value: 'server'},
  {title: 'Mobile', value: 'mobile'},
  {title: 'Équipe', value: 'team'},
  {title: 'Interface', value: 'layout'},
  {title: 'Performance', value: 'gauge'},
]

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: WrenchIcon,
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
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'deliverables',
      title: 'Ce que je livre',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Trois à cinq livrables concrets, affichés en liste.',
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: 'stack',
      title: 'Technologies',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'iconName',
      title: 'Icône',
      type: 'string',
      options: {list: SERVICE_ICONS, layout: 'radio', direction: 'horizontal'},
      initialValue: 'code',
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'icon',
      title: 'Icône SVG (obsolète)',
      type: 'image',
      options: {accept: 'image/svg+xml'},
      deprecated: {
        reason: "Remplacé par le champ « Icône ». Utilisé uniquement par l'ancien site.",
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
      initialValue: undefined,
    }),
  ],
  orderings: [
    {title: "Ordre d'affichage", name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'text'},
  },
})
