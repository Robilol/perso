'use client'

import { useSyncExternalStore } from 'react'
import { RiArrowUpLine } from 'react-icons/ri'
import { cx } from '@/lib/cx'

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

/** Bouton flottant qui apparaît après un écran de défilement et ramène en haut de la page */
export function BackToTop() {
  const visible = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > window.innerHeight,
    () => false,
  )

  return (
    <button
      type="button"
      // Sans `behavior`, le défilement suit `scroll-behavior` de globals.css : fluide, sauf en mouvement réduit
      onClick={() => window.scrollTo({ top: 0 })}
      inert={!visible}
      className={cx(
        'fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border-2 border-ink bg-mint text-2xl shadow-brutal transition-[opacity,translate,box-shadow] duration-200 md:right-6 md:bottom-6',
        'hover:-translate-0.5 hover:shadow-brutal-md active:translate-0.5 active:shadow-brutal-sm',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <RiArrowUpLine aria-hidden />
      <span className="sr-only">Revenir en haut de la page</span>
    </button>
  )
}
