import { RiMailLine, RiPhoneLine } from 'react-icons/ri'
import { ContactForm } from '@/components/contact/contact-form'
import { socialIcon } from '@/components/icons'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-heading'
import { SOCIAL_PLATFORMS } from '@/sanity/labels'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Profile = NonNullable<HOME_QUERY_RESULT['profile']>

export function ContactSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t-2 border-ink bg-mint bg-grid py-20 sm:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow index="05">Contact</Eyebrow>
            <h2
              id="contact-title"
              className="mt-5 font-heading text-[2.6rem] leading-none text-balance sm:text-6xl"
            >
              Un projet en tête&nbsp;?
            </h2>
            {profile.contactText && (
              <p className="mt-5 max-w-md text-lg text-pretty">{profile.contactText}</p>
            )}

            <ul className="mt-8 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-3 font-semibold break-all"
                >
                  <span
                    aria-hidden
                    className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-lg transition-transform group-hover:-rotate-12"
                  >
                    <RiMailLine />
                  </span>
                  <span className="underline decoration-2 underline-offset-4">{profile.email}</span>
                </a>
              </li>
              {profile.phone && (
                <li>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, '')}`}
                    className="group inline-flex items-center gap-3 font-semibold"
                  >
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-lg transition-transform group-hover:-rotate-12"
                    >
                      <RiPhoneLine />
                    </span>
                    <span className="underline decoration-2 underline-offset-4">
                      {profile.phone}
                    </span>
                  </a>
                </li>
              )}
            </ul>

            {profile.socialLinks?.length ? (
              <ul className="mt-8 flex flex-wrap gap-3">
                {profile.socialLinks.map((link) => {
                  const Icon = socialIcon(link.platform)
                  return (
                    <li key={link._key}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-semibold shadow-brutal-sm transition-[translate,box-shadow] hover:-translate-0.5 hover:shadow-brutal"
                      >
                        <Icon aria-hidden className="text-base" />
                        {SOCIAL_PLATFORMS[link.platform] ?? link.platform}
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>

          <ContactForm email={profile.email} />
        </div>
      </Container>
    </section>
  )
}
