import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/client'
import { SITE_QUERY } from '@/sanity/queries'

/** Profil utilisé par le layout et les métadonnées (requête mise en cache et dédupliquée par Next.js) */
export function getSiteProfile() {
  return sanityFetch({ query: SITE_QUERY, tags: ['profile'] })
}

export function fullName(profile: { firstName: string; lastName: string } | null | undefined) {
  return profile ? `${profile.firstName} ${profile.lastName}` : 'Robin Regis'
}

/** Open Graph complet : Next.js remplace l'objet du layout au lieu de le fusionner */
export function openGraph({
  siteName,
  title,
  description,
  url,
  type = 'website',
}: {
  siteName: string
  title: string
  description?: string | null
  url: string
  type?: 'website' | 'article'
}): Metadata['openGraph'] {
  return { type, locale: 'fr_FR', siteName, title, description: description ?? undefined, url }
}
