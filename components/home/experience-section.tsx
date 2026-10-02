import { RiArrowDownSLine, RiArrowRightUpLine, RiDownload2Line } from 'react-icons/ri'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TagList } from '@/components/ui/tag'
import { formatPeriod } from '@/lib/site'
import { CONTRACT_TYPES } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Experience = HOME_QUERY_RESULT['experiences'][number]

/** Nombre d'expériences affichées avant le bouton « Voir les expériences précédentes » */
const VISIBLE_COUNT = 5

export function ExperienceSection({
  experiences,
  resumeUrl,
}: {
  experiences: Experience[]
  resumeUrl?: string | null
}) {
  if (experiences.length === 0) return null

  const visible = experiences.slice(0, VISIBLE_COUNT)
  const older = experiences.slice(VISIBLE_COUNT)
  const firstYear = Math.min(...experiences.map((experience) => experience.startYear))
  const years = new Date().getFullYear() - firstYear

  return (
    <section id="experiences" aria-labelledby="experiences-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="experiences-title"
          eyebrow="Parcours"
          title="Expériences"
          description={`${years} ans à concevoir et faire évoluer des produits web, de l’alternance au freelance.`}
          action={
            resumeUrl ? (
              <ButtonLink href={resumeUrl} variant="secondary">
                <RiDownload2Line aria-hidden className="text-lg" />
                Télécharger mon CV
              </ButtonLink>
            ) : undefined
          }
        />

        <ol className="mt-14 space-y-6">
          {visible.map((experience) => (
            <ExperienceItem key={experience._id} experience={experience} />
          ))}
        </ol>

        {older.length > 0 && (
          <details className="group mt-6">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 font-semibold shadow-brutal transition-[translate,box-shadow] group-open:mb-6 hover:-translate-0.5 hover:shadow-brutal-md [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                Voir les expériences précédentes ({older.length})
              </span>
              <span className="hidden group-open:inline">Masquer les expériences précédentes</span>
              <RiArrowDownSLine
                aria-hidden
                className="text-xl transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className="space-y-6">
              {older.map((experience) => (
                <ExperienceItem key={experience._id} experience={experience} />
              ))}
            </ol>
          </details>
        )}
      </Container>
    </section>
  )
}

function ExperienceItem({ experience }: { experience: Experience }) {
  const contract = experience.contractType ? CONTRACT_TYPES[experience.contractType] : null

  return (
    <li className="grid gap-3 md:grid-cols-[11rem_1fr] md:gap-8">
      <div className="flex items-center gap-3 md:flex-col md:items-start md:pt-6">
        <p className="flex items-center gap-2 font-mono text-sm font-medium">
          <span aria-hidden className="size-2.5 rotate-45 bg-ink" />
          {formatPeriod(experience.startYear, experience.endYear, experience.current)}
        </p>
        {contract && (
          <span className="rounded-full border-2 border-ink bg-lilac px-2.5 py-0.5 text-xs font-semibold">
            {contract}
          </span>
        )}
      </div>

      <article className="rounded-2xl border-2 border-ink bg-white p-5 shadow-brutal sm:p-6">
        <h3 className="font-heading text-xl leading-tight">{experience.title}</h3>
        <p className="mt-1.5 text-[15px]">
          {experience.companyUrl ? (
            <a
              href={experience.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-semibold underline decoration-mint decoration-2 underline-offset-4 hover:decoration-ink"
            >
              {experience.company}
              <RiArrowRightUpLine aria-hidden />
            </a>
          ) : (
            <span className="font-semibold">{experience.company}</span>
          )}
          {experience.location && <span className="text-muted"> · {experience.location}</span>}
        </p>

        {experience.summary && <p className="mt-3 text-pretty text-muted">{experience.summary}</p>}

        {experience.achievements?.length ? (
          <ul className="mt-4 space-y-1.5">
            {experience.achievements.map((achievement) => (
              <li
                key={achievement}
                className="relative pl-5 text-[15px] before:absolute before:top-[0.55em] before:left-0 before:size-2 before:border-2 before:border-ink before:bg-mint"
              >
                {achievement}
              </li>
            ))}
          </ul>
        ) : null}

        <TagList tags={experience.tags} className="mt-5" />
      </article>
    </li>
  )
}
