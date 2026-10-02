import { RiArrowDownSLine, RiArrowRightLine, RiArrowRightUpLine } from 'react-icons/ri'
import { ProjectCard, projectTarget } from '@/components/projects/project-card'
import { SanityImage } from '@/components/sanity-image'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TagList } from '@/components/ui/tag'
import { PROJECT_CATEGORIES } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Project = HOME_QUERY_RESULT['projects'][number]

/** Cartes affichées avant le bouton « Voir toutes les réalisations » (deux rangées de trois) */
const VISIBLE_COUNT = 6

export function ProjectsSection({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null
  const featured = projects.filter((project) => project.featured)
  const others = projects.filter((project) => !project.featured)
  const visible = others.slice(0, VISIBLE_COUNT)
  const hidden = others.slice(VISIBLE_COUNT)

  return (
    <section id="realisations" aria-labelledby="realisations-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="realisations-title"
          eyebrow="Réalisations"
          title="Des produits conçus et livrés de bout en bout"
          description="Plateformes communautaires, outils métier, sites e-commerce : une sélection de projets, du cadrage à la mise en production."
        />

        <div className="mt-14 space-y-12">
          {featured.map((project) => (
            <FeaturedProject key={project._id} project={project} />
          ))}

          {visible.length > 0 && <ProjectGrid projects={visible} />}

          {hidden.length > 0 && (
            <details className="group">
              <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 font-semibold shadow-brutal transition-[translate,box-shadow] group-open:mb-10 hover:-translate-0.5 hover:shadow-brutal-md [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">
                  Voir toutes les réalisations (+{hidden.length})
                </span>
                <span className="hidden group-open:inline">Masquer les autres réalisations</span>
                <RiArrowDownSLine
                  aria-hidden
                  className="text-xl transition-transform group-open:rotate-180"
                />
              </summary>
              <ProjectGrid projects={hidden} offset={visible.length} />
            </details>
          )}
        </div>
      </Container>
    </section>
  )
}

function ProjectGrid({ projects, offset = 0 }: { projects: Project[]; offset?: number }) {
  return (
    <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <li key={project._id}>
          <ProjectCard project={project} index={offset + index} />
        </li>
      ))}
    </ul>
  )
}

function FeaturedProject({ project }: { project: Project }) {
  const target = projectTarget(project)
  const meta = [PROJECT_CATEGORIES[project.category], project.period].filter(Boolean).join(' · ')

  return (
    <article className="grid gap-8 rounded-3xl border-2 border-ink bg-white p-4 shadow-brutal-lg sm:p-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:p-7">
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border-2 border-ink bg-sun">
        <SanityImage
          image={project.coverimage}
          fill
          sizes="(min-width: 1024px) 600px, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div className="flex flex-col justify-center pb-2 lg:pb-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border-2 border-ink bg-sun px-3 py-0.5 text-xs font-bold tracking-wide uppercase">
            À la une
          </span>
          {meta && <span className="font-mono text-xs text-muted">{meta}</span>}
        </div>

        <h3 className="mt-4 font-heading text-3xl leading-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-lg text-pretty text-muted">{project.subtitle}</p>

        {project.keyResults?.length ? (
          <dl className="mt-6 grid grid-cols-3 gap-3">
            {project.keyResults.map((result) => (
              <div
                key={result._key}
                className="flex flex-col-reverse justify-end rounded-xl border-2 border-ink bg-paper px-3 py-3"
              >
                <dt className="mt-0.5 text-xs leading-snug text-muted">{result.label}</dt>
                <dd className="font-heading text-2xl">{result.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <TagList tags={project.tags} max={6} className="mt-6" />

        <div className="mt-8 flex flex-wrap gap-3">
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
