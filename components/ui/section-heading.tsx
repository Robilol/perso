import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** Sur-titre en capitales mono, précédé du numéro de section ou d'un repère carré */
export function Eyebrow({
  children,
  index,
  dark,
  className,
}: {
  children: ReactNode
  index?: string
  dark?: boolean
  className?: string
}) {
  return (
    <p
      className={cx(
        'flex items-center gap-3 font-mono text-xs font-medium tracking-[0.2em] uppercase sm:text-sm',
        dark ? 'text-paper/70' : 'text-muted',
        className,
      )}
    >
      {index ? (
        <span
          aria-hidden
          className={cx(
            'rounded-md border-2 px-1.5 py-0.5 text-xs leading-none font-bold tracking-normal',
            dark ? 'border-paper bg-mint text-ink' : 'border-ink bg-ink text-paper',
          )}
        >
          {index}
        </span>
      ) : (
        <span aria-hidden className="size-2.5 border-2 border-ink bg-mint" />
      )}
      {children}
    </p>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
  id,
  dark,
}: {
  index?: string
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  id?: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div className="max-w-3xl">
        <Eyebrow index={index} dark={dark}>
          {eyebrow}
        </Eyebrow>
        <h2
          id={id}
          className="mt-5 font-heading text-[2.25rem] leading-[1.02] text-balance sm:text-[3.25rem]"
        >
          {title}
        </h2>
        {description && (
          <p className={cx('mt-5 text-lg text-pretty', dark ? 'text-paper/75' : 'text-muted')}>
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  )
}
