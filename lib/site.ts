export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.robin-regis.fr').replace(
  /\/$/,
  '',
)

export const NAV_ITEMS = [
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#services', label: 'Services' },
  { href: '/#experiences', label: 'Expériences' },
  { href: '/#a-propos', label: 'À propos' },
]

/** « 2019 — aujourd'hui », « 2023 — 2024 » ou « 2024 » */
export function formatPeriod(startYear: number, endYear?: number | null, current?: boolean | null) {
  if (current) return `${startYear} — aujourd’hui`
  if (!endYear || endYear === startYear) return String(startYear)
  return `${startYear} — ${endYear}`
}

/** Initiales pour les monogrammes : « Robin Regis » → « RR » */
export function initials(...parts: Array<string | null | undefined>) {
  return parts
    .filter(Boolean)
    .map((part) => part!.trim().charAt(0).toUpperCase())
    .join('')
}
