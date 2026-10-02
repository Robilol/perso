import type { ComponentProps } from 'react'
import { cx } from '@/lib/cx'

export function Tag({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full border-2 border-ink bg-white px-2.5 py-0.5 font-mono text-xs leading-5',
        className,
      )}
      {...props}
    />
  )
}

export function TagList({
  tags,
  max,
  className,
}: {
  tags?: string[] | null
  max?: number
  className?: string
}) {
  if (!tags?.length) return null
  const visible = max ? tags.slice(0, max) : tags
  const hidden = tags.length - visible.length

  return (
    <ul className={cx('flex flex-wrap gap-1.5', className)} aria-label="Stack technique">
      {visible.map((tag) => (
        <li key={tag}>
          <Tag>{tag}</Tag>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Tag className="bg-paper">+{hidden}</Tag>
        </li>
      )}
    </ul>
  )
}
