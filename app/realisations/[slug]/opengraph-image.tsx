import { OG_SIZE, renderOgImage } from '@/lib/og'
import { fullName, getSiteProfile } from '@/lib/seo'
import { client, sanityFetch } from '@/sanity/client'
import { PROJECT_CATEGORIES } from '@/sanity/labels'
import { CASE_STUDIES_QUERY, PROJECT_QUERY } from '@/sanity/queries'

export const alt = 'Étude de cas'
export const size = OG_SIZE
export const contentType = 'image/png'

export async function generateStaticParams() {
  const caseStudies = await client.fetch(CASE_STUDIES_QUERY)
  return caseStudies.map(({ slug }) => ({ slug }))
}

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [project, profile] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params: { slug }, tags: ['project'] }),
    getSiteProfile(),
  ])

  return renderOgImage({
    name: fullName(profile),
    kicker:
      [project && PROJECT_CATEGORIES[project.category], project?.period]
        .filter(Boolean)
        .join(' · ') || 'Réalisation',
    title: project?.title ?? 'Réalisation',
    description: project?.subtitle,
    label: 'Étude de cas',
  })
}
