import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

export function Eyebrow({
  children,
  className,
  markerClassName = 'bg-mint',
}: {
  children: ReactNode
  className?: string
  markerClassName?: string
}) {
  return (
    <p
      className={cx(
        'flex items-center gap-2 font-mono text-xs font-medium tracking-[0.2em] text-muted uppercase sm:text-sm',
        className,
      )}
    >
      <span aria-hidden className={cx('size-2.5 border-2 border-ink', markerClassName)} />
      {children}
    </p>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  id,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
  id?: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
      <div className="max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          id={id}
          className="mt-4 font-heading text-[2rem] leading-[1.05] text-balance sm:text-5xl"
        >
          {title}
        </h2>
        {description && <p className="mt-5 text-lg text-pretty text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
