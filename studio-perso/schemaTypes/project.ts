import {defineArrayMember, defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons/Projects'

export const PROJECT_CATEGORIES = [
  {title: 'Produit', value: 'product'},
  {title: 'Application web', value: 'webapp'},
  {title: 'Application mobile', value: 'mobile'},
  {title: 'Site vitrine', value: 'website'},
  {title: 'E-commerce', value: 'ecommerce'},
  {title: 'Side project', value: 'sideproject'},
]

const altField = defineField({
  name: 'alt',
  title: 'Texte alternatif',
  type: 'string',
})

export default defineType({
  name: 'project',
  title: 'Réalisation',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'card', title: 'Carte', default: true},
    {name: 'caseStudy', title: 'Étude de cas'},
    {name: 'media', title: 'Médias'},
    {name: 'legacy', title: 'Ancien site'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'card',
      description: "Adresse de l'étude de cas : /realisations/<slug>",
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Type de projet',
      type: 'string',
      group: 'card',
      options: {list: PROJECT_CATEGORIES},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Résumé',
      type: 'text',
      rows: 3,
      group: 'card',
      description: 'Une ou deux phrases affichées sur la carte et en introduction.',
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: 'tags',
      title: 'Stack technique',
      type: 'array',
      group: 'card',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'url',
      title: 'Site en ligne',
      type: 'url',
      group: 'card',
    }),
    defineField({
      name: 'featured',
      title: 'Mettre en avant',
      type: 'boolean',
      group: 'card',
      description: 'Affiche le projet en grand en tête des réalisations.',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage",
      type: 'number',
      group: 'card',
      description: 'Les petits nombres sont affichés en premier.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'caseStudy',
    }),
    defineField({
      name: 'role',
      title: 'Mon rôle',
      type: 'string',
      group: 'caseStudy',
    }),
    defineField({
      name: 'period',
      title: 'Période',
      type: 'string',
      group: 'caseStudy',
      description: 'Ex. « 2023 » ou « 2021 — aujourd’hui »',
    }),
    defineField({
      name: 'keyResults',
      title: 'Chiffres clés',
      type: 'array',
      group: 'caseStudy',
      of: [defineArrayMember({type: 'stat'})],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'body',
      title: 'Étude de cas',
      type: 'richText',
      group: 'caseStudy',
      description:
        'Contexte, réalisations, choix techniques, résultats… Sans contenu, la carte renvoie vers le site en ligne.',
    }),
    defineField({
      name: 'links',
      title: 'Autres liens',
      type: 'array',
      group: 'caseStudy',
      of: [defineArrayMember({type: 'link'})],
    }),
    defineField({
      name: 'coverimage',
      title: 'Image de couverture',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [altField],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'imagegallery',
      title: 'Galerie',
      type: 'array',
      group: 'media',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [altField],
        }),
      ],
    }),
    defineField({
      name: 'videogallery',
      title: 'Galerie de vidéos (obsolète)',
      type: 'array',
      group: 'legacy',
      of: [defineArrayMember({type: 'url'})],
      deprecated: {reason: "Utilisé uniquement par l'ancien site."},
      readOnly: true,
      hidden: ({value}) => value === undefined,
      initialValue: undefined,
    }),
    defineField({
      name: 'filters',
      title: 'Filtres (obsolète)',
      type: 'array',
      group: 'legacy',
      of: [defineArrayMember({type: 'string'})],
      deprecated: {
        reason: "Remplacé par « Type de projet ». Utilisé uniquement par l'ancien site.",
      },
      readOnly: true,
      hidden: ({value}) => value === undefined,
      initialValue: undefined,
    }),
  ],
  orderings: [
    {title: "Ordre d'affichage", name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Titre', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      period: 'period',
      featured: 'featured',
      media: 'coverimage',
    },
    prepare: ({title, category, period, featured, media}) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [PROJECT_CATEGORIES.find((item) => item.value === category)?.title, period]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
})
