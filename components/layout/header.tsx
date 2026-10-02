'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { RiCloseLine, RiMenuLine } from 'react-icons/ri'
import { ButtonLink } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Logo } from '@/components/layout/logo'
import { cx } from '@/lib/cx'
import { NAV_ITEMS } from '@/lib/site'

function subscribeToScroll(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}

export function Header({ firstName, lastName }: { firstName: string; lastName: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > 8,
    () => false,
  )

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-50 border-b-2 transition-colors duration-200',
        scrolled || menuOpen
          ? 'border-ink bg-paper/95 backdrop-blur-sm'
          : 'border-transparent bg-paper',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Logo firstName={firstName} lastName={lastName} />

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors hover:bg-ink hover:text-paper"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="/#contact">Me contacter</ButtonLink>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border-2 border-ink bg-white text-xl shadow-brutal-sm md:hidden"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <RiCloseLine aria-hidden /> : <RiMenuLine aria-hidden />}
          <span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span>
        </button>
      </Container>

      {menuOpen && (
        <div id="menu-mobile" className="border-t-2 border-ink bg-paper md:hidden">
          <Container className="py-6">
            <nav aria-label="Navigation mobile">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.href}
                    className="border-b-2 border-dashed border-ink/20 last:border-0"
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-3 font-heading text-2xl"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink href="/#contact" onClick={closeMenu} size="lg" className="mt-6 w-full">
              Me contacter
            </ButtonLink>
          </Container>
        </div>
      )}
    </header>
  )
}
