import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'
import { sanityFetch } from '@/sanity/client'
import { SITE_QUERY } from '@/sanity/queries'

/** Identifiants schema.org : les données structurées de chaque page désignent la même personne */
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Profil utilisé par le layout et les métadonnées (requête mise en cache et dédupliquée par Next.js) */
export function getSiteProfile() {
  return sanityFetch({ query: SITE_QUERY, tags: ['profile'] })
}

export function fullName(profile: { firstName: string; lastName: string } | null | undefined) {
  return profile ? `${profile.firstName} ${profile.lastName}` : 'Robin Regis'
}

/**
 * Open Graph complet : Next.js remplace l'objet du layout au lieu de le fusionner, image comprise.
 * Twitter reprend titre, description et image de l'Open Graph.
 */
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
