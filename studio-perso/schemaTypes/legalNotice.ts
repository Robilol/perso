import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export default defineType({
  name: 'legalNotice',
  title: 'Mentions légales',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'publisher', title: 'Éditeur', default: true},
    {name: 'host', title: 'Hébergeur'},
    {name: 'content', title: 'Contenu'},
  ],
  fields: [
    defineField({
      name: 'publisherName',
      title: 'Nom et prénom',
      type: 'string',
      group: 'publisher',
      initialValue: 'Robin Regis',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'legalStatus',
      title: 'Statut',
      type: 'string',
      group: 'publisher',
      initialValue: 'Entrepreneur individuel (micro-entreprise)',
    }),
    defineField({
      name: 'siret',
      title: 'SIRET',
      type: 'string',
      group: 'publisher',
      description: '14 chiffres, indiqués sur l’avis de situation INSEE.',
      validation: (rule) => [
        rule.required().warning('Obligatoire pour un entrepreneur individuel'),
        rule
          .regex(/^\d{3} ?\d{3} ?\d{3} ?\d{5}$/, {name: 'SIRET'})
          .error('Le SIRET compte 14 chiffres'),
      ],
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
      group: 'publisher',
      description: 'Adresse déclarée pour l’entreprise (domicile ou adresse de domiciliation).',
      validation: (rule) => rule.required().warning('Obligatoire pour un entrepreneur individuel'),
    }),
    defineField({
      name: 'vatNumber',
      title: 'Numéro de TVA intracommunautaire',
      type: 'string',
      group: 'publisher',
      description: 'À laisser vide en franchise en base de TVA.',
    }),
    defineField({
      name: 'publicationDirector',
      title: 'Directeur de la publication',
      type: 'string',
      group: 'publisher',
      description: 'L’email affiché est celui du profil.',
      initialValue: 'Robin Regis',
    }),
    defineField({
      name: 'host',
      title: 'Hébergeur',
      type: 'object',
      group: 'host',
      options: {collapsible: false},
      fields: [
        defineField({name: 'name', title: 'Nom', type: 'string'}),
        defineField({name: 'address', title: 'Adresse', type: 'text', rows: 3}),
        defineField({name: 'phone', title: 'Téléphone', type: 'string'}),
        defineField({name: 'url', title: 'Site', type: 'url'}),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'richText',
      group: 'content',
      description: 'Données personnelles, cookies, propriété intellectuelle, crédits…',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Mentions légales'}),
  },
})
