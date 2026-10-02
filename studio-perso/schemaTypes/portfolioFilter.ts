import {defineType} from 'sanity'
import {ArchiveIcon} from '@sanity/icons/Archive'

export default defineType({
  name: 'portfolioFilter',
  title: 'Filtre de portfolio (ancien site)',
  type: 'document',
  icon: ArchiveIcon,
  deprecated: {
    reason:
      "Remplacé par le champ « Type de projet » des réalisations. Utilisé uniquement par l'ancien site.",
  },
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
