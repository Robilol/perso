import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'
import { serviceIcon } from '@/components/icons'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { cx } from '@/lib/cx'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

const TONES = ['bg-mint', 'bg-sun', 'bg-rose', 'bg-sky', 'bg-lilac', 'bg-lime']

export function ServicesSection({ services }: { services: HOME_QUERY_RESULT['services'] }) {
  if (services.length === 0) return null

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-y-2 border-ink bg-white py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Comment je peux vous aider"
          description="Du MVP à l’évolution d’une application existante, j’interviens seul ou au sein de votre équipe."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcon(service.iconName)
            return (
              <li
                key={service._id}
                className="flex flex-col rounded-2xl border-2 border-ink bg-paper p-6 shadow-brutal"
              >
                <span
                  aria-hidden
                  className={cx(
                    'grid size-12 place-items-center rounded-xl border-2 border-ink text-2xl',
                    TONES[index % TONES.length],
                  )}
                >
                  <Icon />
                </span>
                <h3 className="mt-6 font-heading text-xl leading-tight">{service.title}</h3>
                <p className="mt-3 text-[15px] text-pretty text-muted">{service.text}</p>
              </li>
            )
          })}
        </ul>

        <p className="mt-12 text-lg">
          Un besoin qui ne rentre pas dans ces cases ?{' '}
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-1 font-semibold underline decoration-mint decoration-[3px] underline-offset-4 hover:decoration-ink"
          >
            Parlons-en
            <RiArrowRightLine
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </p>
      </Container>
    </section>
  )
}
