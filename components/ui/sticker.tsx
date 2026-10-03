import type { ComponentProps } from 'react'
import { cx } from '@/lib/cx'

/** Pastille façon autocollant : capitales mono, fond coloré, légère ombre (inclinaison au choix) */
export function Sticker({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 font-mono text-[11px] leading-4 font-bold tracking-[0.14em] whitespace-nowrap text-ink uppercase shadow-brutal-sm',
        className,
      )}
      {...props}
    />
  )
}
