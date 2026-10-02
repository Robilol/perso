/** Bandeau défilant des entreprises et clients ; la liste est doublée pour boucler sans saut */
export function ClientsMarquee({ names }: { names: string[] }) {
  if (names.length === 0) return null
  const items = names.length < 8 ? [...names, ...names] : names

  return (
    <section aria-labelledby="clients-title" className="border-b-2 border-ink bg-ink text-paper">
      <div className="flex items-stretch">
        <h2 id="clients-title" className="sr-only">
          Ils m’ont fait confiance
        </h2>
        <p
          aria-hidden
          className="z-10 hidden shrink-0 items-center border-r-2 border-paper/20 bg-ink px-6 font-mono text-xs tracking-[0.2em] text-mint uppercase md:flex"
        >
          Ils m’ont fait confiance
        </p>
        <div className="group flex flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] py-4">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                className="flex shrink-0 items-center"
                aria-hidden={copy === 1 ? true : undefined}
              >
                {items.map((name, index) => (
                  <li key={`${copy}-${index}`} className="flex items-center">
                    <span className="px-6 font-heading text-lg whitespace-nowrap sm:text-xl">
                      {name}
                    </span>
                    <span aria-hidden className="size-2 rotate-45 bg-mint" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
