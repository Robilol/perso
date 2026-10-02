import {defineField, defineType} from 'sanity'
import {ChartUpwardIcon} from '@sanity/icons/ChartUpward'

export default defineType({
  name: 'stat',
  title: 'Chiffre clé',
  type: 'object',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'value',
      title: 'Valeur',
      type: 'string',
      description: 'Affichée en grand, ex. « 10+ ans », « 7 », « Full-stack »',
      validation: (rule) => rule.required().max(16),
    }),
    defineField({
      name: 'label',
      title: 'Libellé',
      type: 'string',
      description: "Affiché sous la valeur, ex. « d'expérience »",
      validation: (rule) => rule.required().max(40),
    }),
  ],
  preview: {
    select: {value: 'value', label: 'label'},
    prepare: ({value, label}) => ({title: `${value} — ${label}`}),
  },
})
