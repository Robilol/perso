import Link from 'next/link'
import { initials } from '@/lib/site'

export function Logo({ firstName, lastName }: { firstName: string; lastName: string }) {
  return (
    <Link
      href="/"
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
