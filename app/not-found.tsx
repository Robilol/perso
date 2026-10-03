import type { Metadata } from 'next'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="border-b-2 border-ink bg-grid">
      <Container className="flex min-h-[65vh] flex-col items-center justify-center py-24 text-center">
        <p aria-hidden className="font-heading text-[6.5rem] leading-none sm:text-[9rem]">
          <span className="inline-block -rotate-3 rounded-3xl border-2 border-ink bg-coral px-6 shadow-brutal-lg">
            404
          </span>
        </p>
        <h1 className="mt-12 font-heading text-3xl sm:text-4xl">Cette page est introuvable</h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          Elle a peut-être été déplacée, ou n’a jamais existé.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ButtonLink href="/#realisations" variant="secondary">
            Voir les réalisations
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
