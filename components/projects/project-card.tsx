import Link from 'next/link'
import { RiArrowRightLine, RiArrowRightUpLine } from 'react-icons/ri'
import { SanityImage, type SanityImageData } from '@/components/sanity-image'
import { BrowserFrame } from '@/components/ui/browser-frame'
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
const TONES = ['bg-sky', 'bg-rose', 'bg-lime', 'bg-sun', 'bg-lilac', 'bg-mint-light']

/** Destination d'une carte : l'étude de cas si elle existe, sinon le site en ligne */
export function projectTarget(project: Pick<ProjectCardData, 'slug' | 'hasCaseStudy' | 'url'>) {
  if (project.hasCaseStudy) return { href: `/realisations/${project.slug}`, external: false }
  if (project.url) return { href: project.url, external: true }
  return null
}

/** Numéro affiché devant les projets : « 01 », « 02 »… */
export function projectNumber(index: number) {
  return String(index + 1).padStart(2, '0')
}

/** Titre cliquable : le lien s'étend à toute la carte (ou la ligne) qui le contient */
export function ProjectLink({ project }: { project: ProjectCardData }) {
  const target = projectTarget(project)
  if (!target) return project.title

  return (
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
  )
}

/** Pastille fléchée des cartes cliquables */
export function ProjectArrow({ external }: { external: boolean }) {
  return (
    <span
      aria-hidden
      className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-mint text-lg transition-transform duration-200 group-hover:-rotate-12"
    >
      {external ? <RiArrowRightUpLine /> : <RiArrowRightLine />}
    </span>
  )
}

/** Carte de réalisation entièrement cliquable : capture dans une fenêtre de navigateur sur fond coloré */
export function ProjectCard({
  project,
  index = 0,
  number,
  headingLevel: Heading = 'h3',
}: {
  project: ProjectCardData
  /** Position dans la liste, pour la couleur de fond */
  index?: number
  /** Numéro affiché devant la catégorie, ex. « 02 » */
  number?: string
  headingLevel?: 'h2' | 'h3'
}) {
  const target = projectTarget(project)

  return (
    <article
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal transition-[translate,box-shadow] duration-200',
        target &&
          'hover:-translate-1 hover:shadow-brutal-lg has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ink',
      )}
    >
      <div
        className={cx(
          'border-b-2 border-ink bg-grid px-5 pt-5 sm:px-7 sm:pt-7',
          TONES[index % TONES.length],
        )}
      >
        <BrowserFrame url={project.url} className="-mb-0.5 rounded-b-none">
          <div className="relative aspect-[16/10] overflow-hidden">
            <SanityImage
              image={project.coverimage}
              fill
              sizes="(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
        </BrowserFrame>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-2 font-mono text-xs text-muted">
          {number && (
            <>
              <span className="font-bold text-ink">{number}</span>
              <span aria-hidden>/</span>
            </>
          )}
          {PROJECT_CATEGORIES[project.category]}
          {project.period && <span className="ml-auto">{project.period}</span>}
        </p>
        <Heading className="mt-3 font-heading text-2xl leading-tight">
          <ProjectLink project={project} />
        </Heading>
        <p className="mt-2 line-clamp-3 text-pretty text-muted">{project.subtitle}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <TagList tags={project.tags} max={3} />
          {target && <ProjectArrow external={target.external} />}
        </div>
      </div>
    </article>
  )
}
