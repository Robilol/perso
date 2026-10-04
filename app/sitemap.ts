import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { sanityFetch } from '@/sanity/client'
import { HOME_TYPES, SITEMAP_QUERY } from '@/sanity/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { homeUpdatedAt, caseStudies, legalUpdatedAt } = await sanityFetch({
    query: SITEMAP_QUERY,
    params: { homeTypes: HOME_TYPES },
    tags: [...HOME_TYPES, 'legalNotice'],
  })

  return [
    {
      url: SITE_URL,
      lastModified: homeUpdatedAt ? new Date(homeUpdatedAt) : undefined,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...caseStudies.map((caseStudy) => ({
      url: `${SITE_URL}/realisations/${caseStudy.slug}`,
      lastModified: new Date(caseStudy._updatedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      // Sitemap d'images : couverture et galerie, pour Google Images
      images: caseStudy.images.filter((url): url is string => Boolean(url)),
    })),
    {
      url: `${SITE_URL}/mentions-legales`,
      lastModified: legalUpdatedAt ? new Date(legalUpdatedAt) : undefined,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]
}
