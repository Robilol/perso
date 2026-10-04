import type { ReactNode } from 'react'
import { Sticker } from '@/components/ui/sticker'
import { cx } from '@/lib/cx'

/**
 * Deux bandeaux défilants croisés : les entreprises et clients (encre) par-dessus les services (menthe).
 * Sur un écran étroit, des bandeaux croisés au centre se recouvriraient presque entièrement : le bandeau menthe
 * est donc décalé vers le bas et ne croise le bandeau encre en son centre qu’à partir de `xl`.
 * Les bandeaux sont décoratifs ; la liste des clients est lue une seule fois par les lecteurs d'écran.
 */
export function ClientsMarquee({ names, keywords }: { names: string[]; keywords: string[] }) {
  if (names.length === 0) return null

  return (
    <section
      aria-labelledby="clients-title"
      className="relative overflow-hidden border-b-2 border-ink pt-16 pb-24 sm:pt-24 sm:pb-28 xl:pb-24"
    >
      <h2 id="clients-title" className="sr-only">
        Ils m’ont fait confiance
      </h2>
      <ul className="sr-only">
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <div className="relative">
        {keywords.length > 0 && (
          <div
            aria-hidden
            className="absolute inset-x-[-5%] top-1/2 translate-y-[calc(-50%+3.5rem)] rotate-[3.5deg] border-y-2 border-ink bg-mint py-2.5 xl:-translate-y-1/2"
          >
            <Track
              items={keywords}
              reverse
              itemClassName="font-mono text-xs font-bold tracking-[0.2em] uppercase sm:text-sm"
              separator={<span className="text-base">✦</span>}
            />
          </div>
        )}

        <div className="relative -mx-[5%] -rotate-[2.5deg] border-y-2 border-ink bg-ink py-4 text-paper shadow-brutal-md">
          <Sticker
            aria-hidden
            className="absolute -top-4 left-[calc(5%+1rem)] z-10 -rotate-2 bg-sun sm:left-[calc(5%+2rem)]"
          >
            Ils m’ont fait confiance
          </Sticker>
          <Track
            items={names}
            itemClassName="font-heading text-lg sm:text-xl"
            separator={<span className="size-2 rotate-45 bg-mint" />}
          />
        </div>
      </div>
    </section>
  )
}

function Track({
  items,
  reverse,
  itemClassName,
  separator,
}: {
  items: string[]
  reverse?: boolean
  itemClassName: string
  separator: ReactNode
}) {
  // Liste doublée (deux fois si elle est courte) pour boucler sans saut
  const repeated = items.length < 8 ? [...items, ...items] : items

  return (
    <div aria-hidden className="group flex overflow-hidden">
      <div
        className={cx(
          'flex w-max group-hover:[animation-play-state:paused] motion-reduce:animate-none',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {repeated.map((item, index) => (
              <li key={`${copy}-${index}`} className="flex items-center">
                <span className={cx('px-6 whitespace-nowrap', itemClassName)}>{item}</span>
                <span className="flex">{separator}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
