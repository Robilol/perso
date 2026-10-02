import profile from './profile'
import project from './project'
import jobExperience from './jobExperience'
import service from './service'
import educationalBackground from './educationalBackground'
import clientReview from './clientReview'
import information from './information'
import portfolioFilter from './portfolioFilter'
import richText from './objects/richText'
import stat from './objects/stat'
import skillGroup from './objects/skillGroup'
import socialLink from './objects/socialLink'
import link from './objects/link'

export const schemaTypes = [
  profile,
  project,
  jobExperience,
  service,
  educationalBackground,
  clientReview,
  information,
  portfolioFilter,
  richText,
  stat,
  skillGroup,
  socialLink,
  link,
]

/** Documents uniques, édités depuis la structure et exclus du menu « Créer » */
export const SINGLETON_TYPES = new Set(['profile'])

/** Types conservés pour l'ancien site uniquement */
export const LEGACY_TYPES = new Set(['information', 'portfolioFilter'])
