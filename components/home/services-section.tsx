import { RiArrowRightLine, RiCheckLine } from 'react-icons/ri'
import { ServiceIcon } from '@/components/icons'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { TagList } from '@/components/ui/tag'
import { cx } from '@/lib/cx'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

type Service = HOME_QUERY_RESULT['services'][number]
type ProcessStep = NonNullable<NonNullable<HOME_QUERY_RESULT['profile']>['process']>[number]

const TONES = ['bg-mint', 'bg-sun', 'bg-sky', 'bg-rose', 'bg-lilac', 'bg-lime']

export function ServicesSection({
  services,
  process,
}: {
  services: Service[]
  process?: ProcessStep[] | null
}) {
  if (services.length === 0) return null

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-y-2 border-ink bg-ink bg-grid py-20 text-paper sm:py-28"
    >
      <Container>
        <SectionHeading
          id="services-title"
          index="02"
          eyebrow="Services"
          title="Comment je peux vous aider"
          description="Du MVP à l’évolution d’une application existante, j’interviens seul ou au sein de votre équipe."
          dark
        />

        <ul className="mt-14 grid gap-7 md:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard key={service._id} service={service} index={index} />
          ))}
        </ul>

        {process?.length ? <Process steps={process} /> : null}

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border-2 border-paper bg-coral p-6 text-ink shadow-[8px_8px_0_0_var(--color-paper)] sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-heading text-2xl leading-tight sm:text-3xl">
              Un besoin qui ne rentre pas dans ces cases&nbsp;?
            </p>
            <p className="mt-2 text-ink/80">Décrivez-le-moi, on trouvera le bon format ensemble.</p>
          </div>
          <ButtonLink href="/#contact" variant="dark" size="lg">
            Parlons-en
            <RiArrowRightLine aria-hidden className="text-lg" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <li
      className={cx(
        'flex flex-col rounded-2xl border-2 border-paper p-6 text-ink shadow-[8px_8px_0_0_var(--color-paper)] sm:p-8',
        TONES[index % TONES.length],
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="grid size-14 place-items-center rounded-xl border-2 border-ink bg-white text-[1.7rem] shadow-brutal-sm"
        >
          <ServiceIcon name={service.iconName} />
        </span>
        <span aria-hidden className="font-heading text-5xl leading-none text-ink/25">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-6 font-heading text-2xl leading-tight sm:text-[1.75rem]">
        {service.title}
      </h3>
      <p className="mt-3 text-pretty text-ink/80">{service.text}</p>

      {service.deliverables?.length ? (
        <div className="mt-6 rounded-xl border-2 border-ink bg-white/75 p-4 sm:p-5">
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase">
            Ce que je livre
          </p>
          <ul className="mt-3 space-y-2">
            {service.deliverables.map((deliverable) => (
              <li key={deliverable} className="flex gap-2.5 text-[15px] leading-snug">
                <RiCheckLine
                  aria-hidden
                  className="mt-px size-[1.15rem] shrink-0 rounded-full border-2 border-ink bg-mint p-px"
                />
                {deliverable}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <TagList tags={service.stack} className="mt-auto pt-6" />
    </li>
  )
}

function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-heading text-3xl sm:text-4xl">Ma méthode</h3>
        <p className="font-mono text-xs tracking-[0.2em] text-paper/60 uppercase">
          En {steps.length} étapes
        </p>
      </div>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step._key}
            className="relative rounded-2xl border-2 border-paper/30 bg-ink p-5 sm:p-6"
          >
            <p
              aria-hidden
              className="flex items-center gap-2 font-mono text-xs font-bold tracking-[0.2em] text-mint uppercase"
            >
              <span className="grid size-7 place-items-center rounded-full border-2 border-mint text-[11px] tracking-normal">
                {index + 1}
              </span>
              Étape
            </p>
            <h4 className="mt-4 font-heading text-xl leading-tight">{step.title}</h4>
            <p className="mt-2 text-[15px] text-pretty text-paper/70">{step.text}</p>
            {index < steps.length - 1 && (
              <RiArrowRightLine
                aria-hidden
                className="absolute top-1/2 -right-[1.05rem] z-10 hidden size-8 -translate-y-1/2 rounded-full border-2 border-ink bg-mint p-1 text-ink lg:block"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
