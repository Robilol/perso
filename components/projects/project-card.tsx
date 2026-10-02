import Link from 'next/link'
import { RiArrowRightLine, RiArrowRightUpLine } from 'react-icons/ri'
import { SanityImage, type SanityImageData } from '@/components/sanity-image'
import { TagList } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import { PROJECT_CATEGORIES } from '@/sanity/labels'

export type ProjectCardData = {
  _id: string
  title: string
  slug: string
  category: string
  subtitle: string
  tags: string[]
  url: string | null
  period: string | null
  hasCaseStudy: boolean
  coverimage: SanityImageData
}

// Fonds des vignettes, en rotation pour rythmer la grille
const TONES = ['bg-sky', 'bg-rose', 'bg-lime', 'bg-lilac', 'bg-sun', 'bg-mint-light']

/** Destination d'une carte : l'étude de cas si elle existe, sinon le site en ligne */
export function projectTarget(project: Pick<ProjectCardData, 'slug' | 'hasCaseStudy' | 'url'>) {
  if (project.hasCaseStudy) return { href: `/realisations/${project.slug}`, external: false }
  if (project.url) return { href: project.url, external: true }
  return null
}

/** Carte de réalisation entièrement cliquable (lien étendu sur le titre) */
export function ProjectCard({
  project,
  index = 0,
  headingLevel: Heading = 'h3',
}: {
  project: ProjectCardData
  index?: number
  headingLevel?: 'h2' | 'h3'
}) {
  const target = projectTarget(project)
  const meta = [PROJECT_CATEGORIES[project.category], project.period].filter(Boolean).join(' · ')

  return (
    <article
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal transition-[translate,box-shadow] duration-200',
        target &&
          'hover:-translate-0.5 hover:shadow-brutal-lg has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ink',
      )}
    >
      <div
        className={cx(
          'relative aspect-[16/10] overflow-hidden border-b-2 border-ink',
          TONES[index % TONES.length],
        )}
      >
        <SanityImage
          image={project.coverimage}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        {meta && <p className="font-mono text-xs text-muted">{meta}</p>}
        <Heading className="mt-2 font-heading text-xl leading-tight">
          {target ? (
            <Link
              href={target.href}
              className="after:absolute after:inset-0 focus-visible:outline-none"
              {...(target.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {project.title}
              <span className="sr-only">
                {target.external ? ' (site en ligne, nouvel onglet)' : ' (étude de cas)'}
              </span>
            </Link>
          ) : (
            project.title
          )}
        </Heading>
        <p className="mt-2 line-clamp-3 text-[15px] text-muted">{project.subtitle}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <TagList tags={project.tags} max={3} />
          {target && (
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-mint text-lg transition-transform duration-200 group-hover:-rotate-12"
            >
              {target.external ? <RiArrowRightUpLine /> : <RiArrowRightLine />}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}
