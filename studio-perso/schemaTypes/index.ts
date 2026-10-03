import profile from './profile'
import project from './project'
import jobExperience from './jobExperience'
import service from './service'
import educationalBackground from './educationalBackground'
import clientReview from './clientReview'
import legalNotice from './legalNotice'
import information from './information'
import portfolioFilter from './portfolioFilter'
import richText from './objects/richText'
import stat from './objects/stat'
import skillGroup from './objects/skillGroup'
import socialLink from './objects/socialLink'
import link from './objects/link'
import processStep from './objects/processStep'

export const schemaTypes = [
  profile,
  project,
  jobExperience,
  service,
  educationalBackground,
  clientReview,
  legalNotice,
  information,
  portfolioFilter,
  richText,
  stat,
  skillGroup,
  socialLink,
  link,
  processStep,
]

/** Documents uniques, édités depuis la structure et exclus du menu « Créer » */
export const SINGLETON_TYPES = new Set(['profile', 'legalNotice'])

/** Types conservés pour l'ancien site uniquement */
export const LEGACY_TYPES = new Set(['information', 'portfolioFilter'])
