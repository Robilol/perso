import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { sanityFetch } from '@/sanity/client'
import { CASE_STUDIES_QUERY } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const caseStudies = await sanityFetch({ query: CASE_STUDIES_QUERY, tags: ['project'] })

  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map((caseStudy) => ({
      url: `${SITE_URL}/realisations/${caseStudy.slug}`,
      lastModified: new Date(caseStudy._updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/mentions-legales`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
