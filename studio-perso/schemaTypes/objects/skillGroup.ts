import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export default defineType({
  name: 'skillGroup',
  title: 'Groupe de compétences',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex. « Front-end », « Back-end », « Mobile »',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      title: 'Compétences',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1).unique(),
    }),
  ],
  preview: {
    select: {title: 'title', skills: 'skills'},
    prepare: ({title, skills}) => ({
      title,
      subtitle: Array.isArray(skills) ? skills.join(', ') : undefined,
    }),
  },
})
