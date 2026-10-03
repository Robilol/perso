import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'

/** Fenêtre de navigateur stylisée autour d'une capture d'écran */
export function BrowserFrame({
  url,
  className,
  children,
}: {
  url?: string | null
  className?: string
  children: ReactNode
}) {
  const host = url ? hostname(url) : null

  return (
    <div className={cx('overflow-hidden rounded-xl border-2 border-ink bg-white', className)}>
      <div
        aria-hidden
        className="flex items-center gap-1.5 border-b-2 border-ink bg-paper px-3 py-2"
      >
        <span className="size-2.5 shrink-0 rounded-full border-[1.5px] border-ink bg-coral" />
        <span className="size-2.5 shrink-0 rounded-full border-[1.5px] border-ink bg-sun" />
        <span className="size-2.5 shrink-0 rounded-full border-[1.5px] border-ink bg-mint" />
        <span className="ml-2 h-5 min-w-0 flex-1 truncate rounded-full border-[1.5px] border-ink/20 bg-white px-2.5 font-mono text-[11px] leading-[1.05rem] text-muted">
          {host}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}
