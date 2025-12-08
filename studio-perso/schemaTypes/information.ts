import {defineType} from 'sanity'

export default defineType({
  name: 'information',
  title: 'Informations personnelles',
  type: 'document',
  fields: [
    {
      name: 'firstName',
      title: 'Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fullName',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'thumbImage',
      title: 'Image miniature',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'largeImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'age',
      title: 'Âge',
      type: 'number',
    },
    {
      name: 'birthday',
      title: 'Date de naissance',
      type: 'date',
    },
    {
      name: 'nationality',
      title: 'Nationalité',
      type: 'string',
    },
    {
      name: 'languages',
      title: 'Langues',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'address',
      title: 'Adresse',
      type: 'string',
    },
    {
      name: 'freelance',
      title: 'Disponibilité freelance',
      type: 'string',
    },
    {
      name: 'isAvailable',
      title: 'Disponible pour de nouvelles opportunités',
      type: 'boolean',
      description: 'Afficher le badge de disponibilité sur la page d\'accueil',
      initialValue: true,
    },
    {
      name: 'availabilityMessage',
      title: 'Message de disponibilité',
      type: 'string',
      description: 'Message personnalisé pour le badge (par défaut: "Disponible pour de nouvelles opportunités")',
      hidden: ({document}) => !document?.isAvailable,
    },
    {
      name: 'socialAddress',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'github',
          title: 'GitHub',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        },
        {
          name: 'malt',
          title: 'Malt',
          type: 'url',
        },
      ],
    },
    {
      name: 'phoneNumbers',
      title: 'Numéros de téléphone',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'emailAddress',
      title: 'Adresses email',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
