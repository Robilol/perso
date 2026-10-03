import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RiArrowLeftLine, RiArrowRightLine, RiArrowRightUpLine } from 'react-icons/ri'
import { JsonLd } from '@/components/json-ld'
import { ProjectCard } from '@/components/projects/project-card'
import { RichText } from '@/components/rich-text'
import { SanityImage } from '@/components/sanity-image'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-heading'
import { Sticker } from '@/components/ui/sticker'
import { TagList } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import { fullName, getSiteProfile, openGraph } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { client, sanityFetch } from '@/sanity/client'
import { PROJECT_CATEGORIES } from '@/sanity/labels'
import { CASE_STUDIES_QUERY, PROJECT_QUERY } from '@/sanity/queries'
import type { PROJECT_QUERY_RESULT } from '@/sanity/types'

type Props = { params: Promise<{ slug: string }> }
type Project = NonNullable<PROJECT_QUERY_RESULT>

// Fonds des chiffres clés
const RESULT_TONES = ['bg-mint', 'bg-sun', 'bg-sky', 'bg-rose']

function getProject(slug: string) {
  return sanityFetch({ query: PROJECT_QUERY, params: { slug }, tags: ['project'] })
}

export async function generateStaticParams() {
  const caseStudies = await client.fetch(CASE_STUDIES_QUERY)
  return caseStudies.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [project, profile] = await Promise.all([getProject(slug), getSiteProfile()])
  if (!project) return {}

  const path = `/realisations/${project.slug}`
  const title = `${project.title} — ${PROJECT_CATEGORIES[project.category] ?? 'Réalisation'}`
  return {
    title,
    description: project.subtitle,
    alternates: { canonical: path },
    openGraph: openGraph({
      siteName: fullName(profile),
      title,
      description: project.subtitle,
      url: path,
      type: 'article',
    }),
    twitter: { card: 'summary_large_image', title, description: project.subtitle },
    // Sans étude de cas, la page reste accessible mais n'a pas d'intérêt pour les moteurs de recherche
    robots: project.hasCaseStudy ? undefined : { index: false, follow: true },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const [project, profile] = await Promise.all([getProject(slug), getSiteProfile()])
  if (!project) notFound()

  const category = PROJECT_CATEGORIES[project.category]

  return (
    <article>
      <header className="border-b-2 border-ink bg-grid">
        <Container className="pt-8 pb-14 sm:pt-12 sm:pb-20">
          <Link
            href="/#realisations"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-sm font-semibold shadow-brutal-sm transition-[translate,box-shadow] hover:-translate-0.5 hover:shadow-brutal"
          >
            <RiArrowLeftLine
              aria-hidden
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Toutes les réalisations
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {category && <Sticker className="-rotate-2 bg-lilac">{category}</Sticker>}
            {project.period && (
              <span className="font-mono text-sm text-muted">{project.period}</span>
            )}
          </div>
          <h1 className="mt-6 font-heading text-[2.75rem] leading-[1.02] text-balance sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-pretty text-muted">{project.subtitle}</p>

          <ProjectLinks project={project} className="mt-9" />
        </Container>
      </header>

      <Container className="pt-12 sm:pt-16">
        <div className="rounded-3xl border-2 border-ink bg-lilac bg-grid p-3 shadow-brutal-xl sm:p-8 lg:p-10">
          <BrowserFrame url={project.url} className="shadow-brutal-md">
            <div className="relative aspect-[16/10] bg-sun">
              <SanityImage
                image={project.coverimage}
                fill
                priority
                sizes="(min-width: 1152px) 1024px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </BrowserFrame>
        </div>
      </Container>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <div className="min-w-0">
          {project.keyResults?.length ? (
            <dl className="mb-14 grid gap-4 sm:grid-cols-3">
              {project.keyResults.map((result, index) => (
                <div
                  key={result._key}
                  className={cx(
                    'flex flex-col-reverse justify-end rounded-2xl border-2 border-ink p-5 shadow-brutal',
                    RESULT_TONES[index % RESULT_TONES.length],
                  )}
                >
                  <dt className="mt-2 text-sm font-medium">{result.label}</dt>
                  <dd className="font-heading text-5xl leading-none">{result.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          {project.hasCaseStudy ? (
            <RichText value={project.body} />
          ) : (
            <p className="text-lg text-muted">
              L’étude de cas détaillée de ce projet arrive bientôt.
            </p>
          )}
        </div>

        <aside aria-labelledby="fiche-projet">
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal lg:sticky lg:top-28">
            <h2
              id="fiche-projet"
              className="border-b-2 border-ink bg-ink px-6 py-3 font-mono text-xs font-bold tracking-[0.2em] text-paper uppercase"
            >
              Fiche projet
            </h2>
            <dl className="divide-y-2 divide-dashed divide-ink/20 px-6">
              {[
                { label: 'Client', value: project.client },
                { label: 'Rôle', value: project.role },
                { label: 'Période', value: project.period },
                { label: 'Type', value: category },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label} className="py-4">
                    <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-1 font-medium">{item.value}</dd>
                  </div>
                ))}
              <div className="py-4">
                <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                  Stack
                </dt>
                <dd className="mt-2">
                  <TagList tags={project.tags} />
                </dd>
              </div>
            </dl>
            {project.url && (
              <div className="border-t-2 border-ink bg-paper p-4">
                <ButtonLink href={project.url} className="w-full">
                  Voir le site
                  <RiArrowRightUpLine aria-hidden className="text-lg" />
                  <span className="sr-only">(nouvel onglet)</span>
                </ButtonLink>
              </div>
            )}
          </div>
        </aside>
      </Container>

      <Gallery project={project} />

      <Container className="pb-20 sm:pb-28">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border-2 border-ink bg-mint bg-grid p-8 shadow-brutal-xl sm:flex-row sm:items-center sm:p-12">
          <div>
            <p className="font-heading text-3xl leading-tight sm:text-4xl">
              Un projet similaire&nbsp;?
            </p>
            <p className="mt-2 text-lg">
              Parlons de vos objectifs et de la meilleure façon de les atteindre.
            </p>
          </div>
          <ButtonLink href="/#contact" variant="dark" size="lg">
            Discutons-en
            <RiArrowRightLine aria-hidden className="text-lg" />
          </ButtonLink>
        </div>
      </Container>

      {project.others?.length ? (
        <section
          aria-labelledby="autres-realisations"
          className="border-t-2 border-ink bg-white py-20 sm:py-24"
        >
          <Container>
            <Eyebrow>Réalisations</Eyebrow>
            <h2 id="autres-realisations" className="mt-4 font-heading text-3xl sm:text-4xl">
              D’autres projets
            </h2>
            <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {project.others.map((other, index) => (
                <li key={other._id}>
                  <ProjectCard project={other} index={index + 1} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          description: project.subtitle,
          url: `${SITE_URL}/realisations/${project.slug}`,
          dateModified: project._updatedAt,
          keywords: project.tags.join(', '),
          ...(project.coverimage.asset ? { image: project.coverimage.asset.url } : {}),
          ...(profile
            ? { author: { '@type': 'Person', name: fullName(profile), url: SITE_URL } }
            : {}),
        }}
      />
    </article>
  )
}

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const links = [
    ...(project.url ? [{ _key: 'site', label: 'Voir le site', url: project.url }] : []),
    ...(project.links ?? []),
  ]
  if (links.length === 0) return null

  return (
    <ul className={cx('flex flex-wrap gap-3', className)}>
      {links.map((link, index) => (
        <li key={link._key}>
          <ButtonLink href={link.url} variant={index === 0 ? 'primary' : 'secondary'}>
            {link.label}
            <RiArrowRightUpLine aria-hidden className="text-lg" />
            <span className="sr-only">(nouvel onglet)</span>
          </ButtonLink>
        </li>
      ))}
    </ul>
  )
}

const PORTRAIT_COLUMNS: Record<number, string> = {
  1: 'mx-auto max-w-xs',
  2: 'grid-cols-2 md:mx-auto md:max-w-2xl',
  3: 'grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
}

function Gallery({ project }: { project: Project }) {
  const images = (project.imagegallery ?? []).filter((image) => image.asset)
  if (images.length === 0) return null

  // Captures d'écran mobiles (portrait) : jusqu'à 4 par ligne ; captures de bureau : 2 par ligne
  const portrait = images.every((image) => {
    const dimensions = image.asset?.metadata?.dimensions
    return dimensions ? dimensions.height > dimensions.width : false
  })
  const columns = portrait ? PORTRAIT_COLUMNS[Math.min(images.length, 4)] : 'md:grid-cols-2'

  return (
    <section aria-labelledby="galerie" className="pb-20 sm:pb-24">
      <Container>
        <Eyebrow>Galerie</Eyebrow>
        <h2 id="galerie" className="mt-4 font-heading text-3xl sm:text-4xl">
          En images
        </h2>
        <ul className={cx('mt-10 grid items-start gap-6 sm:gap-8', columns)}>
          {images.map((image) => (
            <li
              key={image._key}
              className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal-md transition-transform duration-300 md:odd:-rotate-1 md:even:rotate-1 md:hover:rotate-0"
            >
              <SanityImage
                image={image}
                alt={image.alt ?? `${project.title} — capture d’écran`}
                sizes={
                  portrait ? '(min-width: 768px) 270px, 50vw' : '(min-width: 768px) 550px, 100vw'
                }
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
