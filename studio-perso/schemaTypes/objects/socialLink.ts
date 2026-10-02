import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export const SOCIAL_PLATFORMS = [
  {title: 'LinkedIn', value: 'linkedin'},
  {title: 'Malt', value: 'malt'},
  {title: 'GitHub', value: 'github'},
  {title: 'X / Twitter', value: 'x'},
  {title: 'Autre', value: 'other'},
]

export default defineType({
  name: 'socialLink',
  title: 'Profil en ligne',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Plateforme',
      type: 'string',
      options: {list: SOCIAL_PLATFORMS},
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
    select: {platform: 'platform', url: 'url'},
    prepare: ({platform, url}) => ({
      title: SOCIAL_PLATFORMS.find((item) => item.value === platform)?.title ?? platform,
      subtitle: url,
    }),
  },
})
