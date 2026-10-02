import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const CONTRACT_TYPES = [
  {title: 'Freelance', value: 'freelance'},
  {title: 'CDI', value: 'permanent'},
  {title: 'CDD', value: 'fixedTerm'},
  {title: 'Alternance', value: 'apprenticeship'},
  {title: 'Stage', value: 'internship'},
]

const legacyField = {
  group: 'legacy',
  deprecated: {reason: "Utilisé uniquement par l'ancien site."},
  readOnly: true,
  hidden: ({value}: {value?: unknown}) => value === undefined,
  initialValue: undefined,
}

export default defineType({
  name: 'jobExperience',
  title: 'Expérience',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'main', title: 'Expérience', default: true},
    {name: 'legacy', title: 'Ancien site'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Poste',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Entreprise',
      type: 'string',
      group: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyUrl',
      title: "Site de l'entreprise",
      type: 'url',
      group: 'main',
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
      group: 'main',
      description: 'Ex. « Paris (75) », « Remote »',
    }),
    defineField({
      name: 'contractType',
      title: 'Type de contrat',
      type: 'string',
      group: 'main',
      options: {list: CONTRACT_TYPES},
    }),
    defineField({
      name: 'startYear',
      title: 'Année de début',
      type: 'number',
      group: 'main',
      validation: (rule) => rule.required().integer().min(1990).max(2100),
    }),
    defineField({
      name: 'current',
      title: 'Poste actuel',
      type: 'boolean',
      group: 'main',
      initialValue: false,
    }),
    defineField({
      name: 'endYear',
      title: 'Année de fin',
      type: 'number',
      group: 'main',
      hidden: ({parent}) => Boolean(parent?.current),
      validation: (rule) =>
        rule
          .integer()
          .min(1990)
          .max(2100)
          .custom((endYear, context) => {
            const {startYear, current} = (context.parent ?? {}) as {
              startYear?: number
              current?: boolean
            }
            if (current || endYear === undefined) return true
            return !startYear || endYear >= startYear || "Doit être postérieure à l'année de début"
          }),
    }),
    defineField({
      name: 'summary',
      title: 'Contexte',
      type: 'text',
      rows: 3,
      group: 'main',
      description: 'Le produit ou la mission en une phrase.',
    }),
    defineField({
      name: 'achievements',
      title: 'Réalisations',
      type: 'array',
      group: 'main',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({
      name: 'tags',
      title: 'Stack technique',
      type: 'array',
      group: 'main',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      ...legacyField,
      name: 'meta',
      title: 'Entreprise / Lieu (obsolète)',
      type: 'string',
    }),
    defineField({
      ...legacyField,
      name: 'year',
      title: 'Période (obsolète)',
      type: 'string',
    }),
    defineField({
      ...legacyField,
      name: 'text',
      title: 'Description (obsolète)',
      type: 'text',
    }),
  ],
  orderings: [
    {
      title: 'Plus récentes',
      name: 'startYearDesc',
      by: [{field: 'startYear', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      startYear: 'startYear',
      endYear: 'endYear',
      current: 'current',
    },
    prepare: ({title, company, startYear, endYear, current}) => {
      const end = current ? 'aujourd’hui' : endYear
      const period = startYear && end && end !== startYear ? `${startYear} – ${end}` : startYear
      return {title, subtitle: [company, period].filter(Boolean).join(' · ')}
    },
  },
})
