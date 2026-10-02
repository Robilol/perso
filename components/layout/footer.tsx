import Link from 'next/link'
import { socialIcon } from '@/components/icons'
import { Container } from '@/components/ui/container'
import { NAV_ITEMS } from '@/lib/site'
import { SOCIAL_PLATFORMS } from '@/sanity/labels'
import type { SITE_QUERY_RESULT } from '@/sanity/types'

export function Footer({ profile }: { profile: NonNullable<SITE_QUERY_RESULT> }) {
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-heading text-2xl">{fullName}</p>
          <p className="mt-2 text-paper/70">{profile.jobTitle}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block font-mono text-sm text-mint underline decoration-2 underline-offset-4 hover:text-paper"
          >
            {profile.email}
          </a>
        </div>

        <nav aria-label="Plan du site">
          <p className="font-mono text-xs tracking-[0.2em] text-paper/50 uppercase">Navigation</p>
          <ul className="mt-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-mint">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#contact" className="hover:text-mint">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {profile.socialLinks?.length ? (
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-paper/50 uppercase">Ailleurs</p>
            <ul className="mt-4 space-y-2">
              {profile.socialLinks.map((link) => {
                const Icon = socialIcon(link.platform)
                return (
                  <li key={link._key}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-mint"
                    >
                      <Icon aria-hidden className="text-lg" />
                      {SOCIAL_PLATFORMS[link.platform] ?? link.platform}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </Container>

      <div className="border-t-2 border-paper/15">
        <Container className="flex flex-col gap-2 py-6 text-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {fullName}
          </p>
          <p>Conçu et développé avec Next.js et Sanity</p>
        </Container>
      </div>
    </footer>
  )
}
