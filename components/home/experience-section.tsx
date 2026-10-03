import { RiArrowDownSLine, RiArrowRightUpLine, RiDownload2Line } from 'react-icons/ri'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Sticker } from '@/components/ui/sticker'
import { TagList } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import { formatPeriod } from '@/lib/site'
import { CONTRACT_TYPES } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Experience = HOME_QUERY_RESULT['experiences'][number]

/** Nombre d'expériences affichées avant le bouton « Voir les expériences précédentes » */
const VISIBLE_COUNT = 5

// Frise : rail vertical entre la colonne des dates et les cartes (à gauche sur mobile)
const TIMELINE =
  'relative space-y-8 before:absolute before:top-4 before:bottom-4 before:left-[calc(0.75rem-1px)] before:w-0.5 before:bg-ink md:before:left-[calc(13.25rem-1px)]'

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
          index="03"
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

        <ol className={cx('mt-14', TIMELINE)}>
          {visible.map((experience) => (
            <ExperienceItem key={experience._id} experience={experience} />
          ))}
        </ol>

        {older.length > 0 && (
          <details className="group mt-8">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2.5 font-semibold shadow-brutal transition-[translate,box-shadow] group-open:mb-8 hover:-translate-0.5 hover:shadow-brutal-md [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">
                Voir les expériences précédentes ({older.length})
              </span>
              <span className="hidden group-open:inline">Masquer les expériences précédentes</span>
              <RiArrowDownSLine
                aria-hidden
                className="text-xl transition-transform group-open:rotate-180"
              />
            </summary>
            <ol className={TIMELINE}>
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
    <li className="relative grid gap-3 pl-10 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
      <span
        aria-hidden
        className={cx(
          'absolute top-6 left-0 size-6 rounded-full border-2 border-ink shadow-brutal-sm md:left-[12.5rem]',
          experience.current ? 'bg-coral' : 'bg-mint',
        )}
      />

      <div className="flex flex-wrap items-center gap-2 md:flex-col md:items-end md:pt-6 md:text-right">
        <p className="font-mono text-sm font-bold">
          {formatPeriod(experience.startYear, experience.endYear, experience.current)}
        </p>
        {experience.current && <Sticker className="-rotate-2 bg-coral">En cours</Sticker>}
        {contract && (
          <span className="rounded-full border-2 border-ink bg-lilac px-2.5 py-0.5 text-xs font-semibold">
            {contract}
          </span>
        )}
      </div>

      <article className="rounded-2xl border-2 border-ink bg-white p-5 shadow-brutal sm:p-6">
        <h3 className="font-heading text-xl leading-tight sm:text-2xl">{experience.title}</h3>
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
              <span className="sr-only">(nouvel onglet)</span>
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
