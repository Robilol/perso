import type { ReactNode } from 'react'
import { RiDownload2Line, RiMapPin2Line, RiTranslate2 } from 'react-icons/ri'
import { RichText } from '@/components/rich-text'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { Tag } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Profile = NonNullable<HOME_QUERY_RESULT['profile']>

// Repères colorés des groupes de compétences
const TONES = ['bg-mint', 'bg-sun', 'bg-sky', 'bg-rose', 'bg-lilac', 'bg-lime']

export function AboutSection({
  profile,
  education,
}: {
  profile: Profile
  education: HOME_QUERY_RESULT['education']
}) {
  return (
    <section
      id="a-propos"
      aria-labelledby="a-propos-title"
      className="border-t-2 border-ink bg-white py-20 sm:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            id="a-propos-title"
            index="04"
            eyebrow="À propos"
            title="Le code au service du produit"
          />
          <RichText value={profile.about} className="mt-8" />

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {profile.location && (
              <Fact icon={<RiMapPin2Line />} label="Basé à">
                {profile.location}
              </Fact>
            )}
            {profile.languages?.length ? (
              <Fact icon={<RiTranslate2 />} label="Langues">
                {profile.languages.map((language) => (
                  <span key={language} className="block">
                    {language}
                  </span>
                ))}
              </Fact>
            ) : null}
          </dl>

          {profile.resumeUrl && (
            <ButtonLink href={profile.resumeUrl} variant="secondary" className="mt-10">
              <RiDownload2Line aria-hidden className="text-lg" />
              Télécharger mon CV
            </ButtonLink>
          )}
        </div>

        <div className="space-y-8">
          {profile.skillGroups?.length ? (
            <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-brutal sm:p-8">
              <h3 className="font-heading text-2xl">Compétences</h3>
              <dl className="mt-6 space-y-5">
                {profile.skillGroups.map((group, index) => (
                  <div key={group._key}>
                    <dt className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">
                      <span
                        aria-hidden
                        className={cx('size-2.5 border-2 border-ink', TONES[index % TONES.length])}
                      />
                      {group.title}
                    </dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-1.5">
                        {group.skills.map((skill) => (
                          <li key={skill}>
                            <Tag>{skill}</Tag>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          {education.length > 0 && (
            <div className="rounded-3xl border-2 border-ink bg-paper p-6 shadow-brutal sm:p-8">
              <h3 className="font-heading text-2xl">Formation</h3>
              <ol className="mt-6 space-y-4">
                {education.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
                  >
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted">{item.meta}</p>
                    </div>
                    <p className="font-mono text-sm">{item.year}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}

function Fact({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border-2 border-ink bg-paper p-4">
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-mint text-xl"
      >
        {icon}
      </span>
      <div>
        <dt className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{label}</dt>
        <dd className="mt-0.5 font-medium">{children}</dd>
      </div>
    </div>
  )
}
