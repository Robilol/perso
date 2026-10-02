import type { IconType } from 'react-icons'
import {
  RiBriefcase4Line,
  RiCodeSSlashLine,
  RiDashboard3Line,
  RiGithubFill,
  RiGlobalLine,
  RiLayoutLine,
  RiLinkedinBoxFill,
  RiServerLine,
  RiSmartphoneLine,
  RiTeamLine,
  RiTwitterXLine,
} from 'react-icons/ri'

const SERVICE_ICONS: Record<string, IconType> = {
  code: RiCodeSSlashLine,
  server: RiServerLine,
  mobile: RiSmartphoneLine,
  team: RiTeamLine,
  layout: RiLayoutLine,
  gauge: RiDashboard3Line,
}

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: RiLinkedinBoxFill,
  github: RiGithubFill,
  malt: RiBriefcase4Line,
  x: RiTwitterXLine,
  other: RiGlobalLine,
}

export function serviceIcon(name?: string | null): IconType {
  return SERVICE_ICONS[name ?? ''] ?? RiCodeSSlashLine
}

export function socialIcon(platform?: string | null): IconType {
  return SOCIAL_ICONS[platform ?? ''] ?? RiGlobalLine
}
