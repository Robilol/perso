import { createClient, type QueryParams } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // API directe plutôt que CDN : les pages sont mises en cache par Next.js et revalidées par webhook
  useCdn: false,
  perspective: 'published',
})

/** Filet de sécurité : les pages se régénèrent au plus tard toutes les heures, même sans webhook */
const REVALIDATE_SECONDS = 3600

/**
 * Requête mise en cache par Next.js. Les tags correspondent aux types de documents utilisés,
 * ce qui permet au webhook Sanity (app/api/revalidate) de ne régénérer que le nécessaire.
 */
export function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  tags,
}: {
  query: QueryString
  params?: QueryParams
  tags: string[]
}) {
  return client.fetch(query, params, { next: { revalidate: REVALIDATE_SECONDS, tags } })
}
