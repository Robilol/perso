'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEvent } from 'react'
import { initials } from '@/lib/site'

export function Logo({ firstName, lastName }: { firstName: string; lastName: string }) {
  const pathname = usePathname()

  // Déjà sur l'accueil, Next.js ne fait rien : on remonte en douceur comme le bouton « haut de page »
  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/' || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.scrollTo({ top: 0 })
    if (window.location.hash) window.history.replaceState(null, '', '/')
  }

  return (
    <Link
      href="/"
      onClick={scrollToTop}
      className="group flex items-center gap-3"
      aria-label={`${firstName} ${lastName}, accueil`}
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-lg border-2 border-ink bg-mint font-heading text-[13px] tracking-normal shadow-brutal-sm transition-transform duration-200 group-hover:-rotate-6"
      >
        {initials(firstName, lastName)}
      </span>
      <span className="font-heading text-[17px] tracking-tight whitespace-nowrap" aria-hidden>
        {firstName} {lastName}
      </span>
    </Link>
  )
}
