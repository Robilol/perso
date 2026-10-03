import { RiArrowRightLine, RiArrowRightUpLine } from 'react-icons/ri'
import {
  ProjectArrow,
  ProjectCard,
  ProjectLink,
  projectNumber,
  projectTarget,
} from '@/components/projects/project-card'
import { SanityImage } from '@/components/sanity-image'
import { BrowserFrame } from '@/components/ui/browser-frame'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Sticker } from '@/components/ui/sticker'
import { TagList } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import { PROJECT_CATEGORIES } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Project = HOME_QUERY_RESULT['projects'][number]

/** Projets présentés en grandes cartes ; les suivants rejoignent l'index compact */
const CARD_COUNT = 4

// Fonds des chiffres clés du projet phare
const RESULT_TONES = ['bg-mint', 'bg-sun', 'bg-sky', 'bg-rose']

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null
  // Les projets mis en avant passent en tête ; la numérotation suit l'ordre d'affichage
  const ordered = [
    ...projects.filter((project) => project.featured),
    ...projects.filter((project) => !project.featured),
  ]
  const featured = ordered.filter((project) => project.featured)
  const rest = ordered.slice(featured.length)
  const cards = rest.slice(0, CARD_COUNT)
  const index = rest.slice(CARD_COUNT)

  return (
    <section id="realisations" aria-labelledby="realisations-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="realisations-title"
          index="01"
          eyebrow="Réalisations"
          title="Des produits conçus et livrés de bout en bout"
          description="Plateformes communautaires, outils métier, sites e-commerce : une sélection de projets, du cadrage à la mise en production."
        />

        <div className="mt-14 space-y-10 sm:space-y-12">
          {featured.map((project, position) => (
            <FeaturedProject key={project._id} project={project} index={position} />
          ))}

          {cards.length > 0 && (
            <ul className="grid gap-8 md:grid-cols-2">
              {cards.map((project, position) => (
                <li key={project._id}>
                  <ProjectCard
                    project={project}
                    index={position}
                    number={projectNumber(featured.length + position)}
                  />
                </li>
              ))}
            </ul>
          )}

          {index.length > 0 && (
            <ProjectIndex projects={index} offset={featured.length + cards.length} />
          )}
        </div>
      </Container>
    </section>
  )
}

function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const target = projectTarget(project)

  return (
    <article className="grid overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-brutal-xl lg:grid-cols-[1.3fr_1fr]">
      <div className="relative border-b-2 border-ink bg-lilac bg-grid p-5 pt-14 sm:p-9 sm:pt-16 lg:border-r-2 lg:border-b-0 lg:p-10 lg:pt-16">
        <Sticker className="absolute top-4 left-4 -rotate-3 bg-coral sm:top-5 sm:left-6">
          ★ Projet phare
        </Sticker>
        <BrowserFrame url={project.url} className="shadow-brutal-md">
          <div className="relative aspect-[16/10] bg-sun">
            <SanityImage
              image={project.coverimage}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </BrowserFrame>
      </div>

      <div className="flex flex-col p-6 sm:p-9 lg:p-10">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
          <span className="font-bold text-ink">{projectNumber(index)}</span>
          <span aria-hidden>/</span>
          {PROJECT_CATEGORIES[project.category]}
          {project.period && (
            <>
              <span aria-hidden>·</span>
              {project.period}
            </>
          )}
        </p>
        <h3 className="mt-4 font-heading text-[2.4rem] leading-[1.02] sm:text-5xl">
          {project.title}
        </h3>
        <p className="mt-4 text-lg text-pretty text-muted">{project.subtitle}</p>

        {project.keyResults?.length ? (
          <dl className="mt-7 grid grid-cols-3 gap-2.5 sm:gap-3">
            {project.keyResults.map((result, position) => (
              <div
                key={result._key}
                className={cx(
                  'flex flex-col-reverse justify-end rounded-xl border-2 border-ink px-3 py-3 shadow-brutal-sm',
                  RESULT_TONES[position % RESULT_TONES.length],
                )}
              >
                <dt className="mt-1 text-xs leading-snug">{result.label}</dt>
                <dd className="font-heading text-2xl leading-none sm:text-3xl">{result.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <TagList tags={project.tags} max={6} className="mt-7" />

        <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
          {target && !target.external && (
            <ButtonLink href={target.href} variant="dark">
              Lire l’étude de cas
              <RiArrowRightLine aria-hidden className="text-lg" />
            </ButtonLink>
          )}
          {project.url && (
            <ButtonLink href={project.url} variant="secondary">
              Voir le site
              <RiArrowRightUpLine aria-hidden className="text-lg" />
              <span className="sr-only">(nouvel onglet)</span>
            </ButtonLink>
          )}
        </div>
      </div>
    </article>
  )
}

/** Index compact des autres projets : une ligne cliquable par projet */
function ProjectIndex({ projects, offset }: { projects: Project[]; offset: number }) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal">
      <p className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-3 font-mono text-xs tracking-[0.2em] text-paper uppercase">
        <span>Et aussi</span>
        <span className="text-mint">
          {projects.length} projet{projects.length > 1 ? 's' : ''}
        </span>
      </p>
      <ul className="divide-y-2 divide-ink">
        {projects.map((project, position) => {
          const target = projectTarget(project)
          return (
            <li
              key={project._id}
              className={cx(
                'group relative flex items-center gap-4 px-4 py-4 transition-colors sm:gap-6 sm:px-5',
                target &&
                  'hover:bg-mint-light has-[:focus-visible]:outline-[3px] has-[:focus-visible]:-outline-offset-[5px] has-[:focus-visible]:outline-ink',
              )}
            >
              <span className="w-6 shrink-0 font-mono text-sm font-bold">
                {projectNumber(offset + position)}
              </span>
              <div className="relative hidden h-12 w-[4.75rem] shrink-0 overflow-hidden rounded-md border-2 border-ink bg-paper sm:block">
                <SanityImage
                  image={project.coverimage}
                  fill
                  sizes="76px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-lg leading-tight sm:text-xl">
                  <ProjectLink project={project} />
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted md:line-clamp-1">
                  {project.subtitle}
                </p>
              </div>
              <span className="hidden w-32 shrink-0 justify-center md:flex">
                <span className="rounded-full border-2 border-ink bg-paper px-2.5 py-0.5 font-mono text-xs">
                  {PROJECT_CATEGORIES[project.category]}
                </span>
              </span>
              <TagList
                tags={project.tags}
                max={2}
                className="hidden w-48 shrink-0 justify-end lg:flex"
              />
              {target && <ProjectArrow external={target.external} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
