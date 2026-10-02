import Link from 'next/link'
import { RiArrowRightLine, RiArrowRightUpLine, RiMapPin2Line } from 'react-icons/ri'
import { SanityImage } from '@/components/sanity-image'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Tag } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import { initials } from '@/lib/site'
import { PROJECT_CATEGORIES } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Profile = NonNullable<HOME_QUERY_RESULT['profile']>
type Project = HOME_QUERY_RESULT['projects'][number]

const AVAILABILITY = {
  available: { label: 'Disponible pour de nouvelles missions', dot: 'bg-[#22c55e]' },
  limited: { label: 'Disponibilité partielle', dot: 'bg-[#f59e0b]' },
  unavailable: { label: 'Actuellement indisponible', dot: 'bg-[#ef4444]' },
} as const

export function Hero({
  profile,
  featuredProject,
}: {
  profile: Profile
  featuredProject?: Project
}) {
  const status = profile.availability?.status ?? 'available'
  const availability = AVAILABILITY[status]

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b-2 border-ink bg-dots"
    >
      <Container className="grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.45fr_1fr] lg:gap-14 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-sm font-medium shadow-brutal-sm">
            <span className="relative flex size-2.5" aria-hidden>
              {status === 'available' && (
                <span
                  className={cx(
                    'absolute inline-flex size-full animate-ping rounded-full opacity-60',
                    availability.dot,
                  )}
                />
              )}
              <span
                className={cx('relative inline-flex size-2.5 rounded-full', availability.dot)}
              />
            </span>
            {profile.availability?.message || availability.label}
          </p>

          <h1
            id="hero-title"
            className="mt-7 font-heading text-[2.6rem] leading-[1.06] text-balance sm:text-6xl lg:text-[3.6rem] xl:text-[4rem]"
          >
            <Headline text={profile.headline} highlight={profile.headlineHighlight} />
          </h1>

          <p className="mt-7 max-w-xl text-lg text-pretty text-muted sm:text-xl">{profile.intro}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/#contact" size="lg">
              Discutons de votre projet
              <RiArrowRightLine aria-hidden className="text-lg" />
            </ButtonLink>
            <ButtonLink href="/#realisations" size="lg" variant="secondary">
              Voir mes réalisations
            </ButtonLink>
          </div>

          {profile.stats?.length ? (
            <dl className="mt-12 grid max-w-xl divide-y-2 divide-ink overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
              {profile.stats.map((stat) => (
                <div
                  key={stat._key}
                  className="flex flex-row-reverse items-baseline justify-end gap-3 px-5 py-3.5 sm:flex-col-reverse sm:justify-end sm:gap-1 sm:py-4"
                >
                  <dt className="text-sm text-muted">{stat.label}</dt>
                  <dd className="font-heading text-xl leading-tight sm:text-2xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <ProfileCard profile={profile} featuredProject={featuredProject} />
      </Container>
    </section>
  )
}

/** Titre avec un extrait surligné façon « étiquette » */
function Headline({ text, highlight }: { text: string; highlight?: string | null }) {
  const index = highlight ? text.indexOf(highlight) : -1
  if (!highlight || index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <span className="rounded-xl border-2 border-ink bg-mint [box-decoration-break:clone] px-2 shadow-brutal-sm [-webkit-box-decoration-break:clone]">
        {highlight}
      </span>
      {text.slice(index + highlight.length)}
    </>
  )
}

function ProfileCard({
  profile,
  featuredProject,
}: {
  profile: Profile
  featuredProject?: Project
}) {
  // Quelques compétences phares, prises en tête des premiers groupes
  const mainSkills = (profile.skillGroups ?? [])
    .slice(0, 3)
    .flatMap((group, index) => group.skills.slice(0, index === 0 ? 3 : 2))

  return (
    <aside aria-label="En bref" className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="rounded-3xl border-2 border-ink bg-white p-6 shadow-brutal-lg sm:p-7 lg:rotate-[1.5deg]">
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border-2 border-ink bg-mint">
            {profile.portrait?.asset ? (
              <SanityImage
                image={profile.portrait}
                fill
                sizes="64px"
                priority
                className="object-cover"
              />
            ) : (
              <span aria-hidden className="grid size-full place-items-center font-heading text-xl">
                {initials(profile.firstName, profile.lastName)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-heading text-xl">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-sm text-muted">{profile.jobTitle}</p>
            {profile.location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                <RiMapPin2Line aria-hidden className="shrink-0" />
                {profile.location}
              </p>
            )}
          </div>
        </div>

        {mainSkills.length > 0 && (
          <div className="mt-6 border-t-2 border-dashed border-ink/25 pt-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              Stack principale
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {mainSkills.map((skill) => (
                <li key={skill}>
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}

        {featuredProject && (
          <div className="mt-6 border-t-2 border-dashed border-ink/25 pt-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">À la une</p>
            <Link
              href={
                featuredProject.hasCaseStudy
                  ? `/realisations/${featuredProject.slug}`
                  : '/#realisations'
              }
              className="group mt-3 flex items-center gap-4 rounded-2xl border-2 border-ink bg-sun p-3 transition-[translate,box-shadow] hover:-translate-0.5 hover:shadow-brutal"
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-white">
                <SanityImage
                  image={featuredProject.coverimage}
                  fill
                  sizes="56px"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-base">{featuredProject.title}</p>
                <p className="truncate text-sm text-ink/70">
                  {[PROJECT_CATEGORIES[featuredProject.category], featuredProject.period]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <RiArrowRightUpLine
                aria-hidden
                className="shrink-0 text-xl transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}
