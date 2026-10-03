import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { RichText } from '@/components/rich-text'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/section-heading'
import { cx } from '@/lib/cx'
import { fullName, getSiteProfile, openGraph } from '@/lib/seo'
import { sanityFetch } from '@/sanity/client'
import { LEGAL_QUERY } from '@/sanity/queries'

const PATH = '/mentions-legales'
const TITLE = 'Mentions légales'
const DESCRIPTION = 'Éditeur, hébergement, données personnelles et cookies du site.'

type Row = { label: string; value: ReactNode }

function getLegalNotice() {
  return sanityFetch({ query: LEGAL_QUERY, tags: ['legalNotice', 'profile'] })
}

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile()
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: PATH },
    openGraph: openGraph({
      siteName: fullName(profile),
      title: TITLE,
      description: DESCRIPTION,
      url: PATH,
    }),
  }
}

export default async function LegalNoticePage() {
  const { legal, contact } = await getLegalNotice()
  if (!legal) notFound()

  const updatedAt = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(
    new Date(legal._updatedAt),
  )

  const publisher: Row[] = [
    { label: 'Éditeur', value: legal.publisherName },
    { label: 'Statut', value: legal.legalStatus },
    { label: 'SIRET', value: legal.siret },
    { label: 'TVA intracommunautaire', value: legal.vatNumber },
    { label: 'Adresse', value: legal.address },
    {
      label: 'Email',
      value: contact?.email && (
        <TextLink href={`mailto:${contact.email}`}>{contact.email}</TextLink>
      ),
    },
    { label: 'Directeur de la publication', value: legal.publicationDirector },
  ]

  const host: Row[] = [
    { label: 'Hébergeur', value: legal.host?.name },
    { label: 'Adresse', value: legal.host?.address },
    { label: 'Téléphone', value: legal.host?.phone },
    {
      label: 'Site',
      value: legal.host?.url && (
        <TextLink href={legal.host.url} external>
          {legal.host.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
        </TextLink>
      ),
    },
  ]

  return (
    <article>
      <header className="border-b-2 border-ink bg-grid">
        <Container className="pt-12 pb-14 sm:pt-16 sm:pb-20">
          <Eyebrow>Informations légales</Eyebrow>
          <h1 className="mt-5 font-heading text-[2.6rem] leading-none sm:text-6xl">{TITLE}</h1>
          <p className="mt-6 max-w-2xl text-lg text-pretty text-muted">
            Qui édite ce site, où il est hébergé et comment vos données sont traitées.
          </p>
          <p className="mt-6 font-mono text-sm">Mise à jour : {updatedAt}</p>
        </Container>
      </header>

      <Container className="py-14 sm:py-20">
        <div className="grid items-start gap-7 lg:grid-cols-2">
          <InfoCard id="editeur" title="Éditeur du site" rows={publisher} className="bg-white" />
          <InfoCard id="hebergement" title="Hébergement" rows={host} className="bg-sky" />
        </div>

        <RichText value={legal.body} className="mt-16 max-w-3xl sm:mt-20" />
      </Container>
    </article>
  )
}

function InfoCard({
  id,
  title,
  rows,
  className,
}: {
  id: string
  title: string
  rows: Row[]
  className?: string
}) {
  const visible = rows.filter((row) => row.value)
  if (visible.length === 0) return null

  return (
    <section
      aria-labelledby={id}
      className={cx('rounded-2xl border-2 border-ink p-6 shadow-brutal sm:p-8', className)}
    >
      <h2 id={id} className="font-heading text-2xl">
        {title}
      </h2>
      <dl className="mt-6 divide-y-2 divide-dashed divide-ink/20">
        {visible.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-4"
          >
            <dt className="font-mono text-[11px] tracking-[0.2em] text-ink/70 uppercase sm:pt-1">
              {row.label}
            </dt>
            <dd className="font-medium whitespace-pre-line">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function TextLink({
  href,
  external,
  children,
}: {
  href: string
  external?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className="wrap-anywhere underline decoration-2 underline-offset-4 hover:decoration-mint"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
