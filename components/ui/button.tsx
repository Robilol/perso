import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cx } from '@/lib/cx'

type Variant = 'primary' | 'secondary' | 'dark'
type Size = 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-mint text-ink',
  secondary: 'bg-white text-ink',
  dark: 'bg-ink text-paper',
}

const SIZES: Record<Size, string> = {
  md: 'px-5 py-2.5 text-[15px]',
  lg: 'px-6 py-3.5 text-base',
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant
  size?: Size
  className?: string
}) {
  return cx(
    'inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink font-semibold whitespace-nowrap shadow-brutal transition-[translate,box-shadow] duration-150',
    'hover:-translate-0.5 hover:shadow-brutal-md active:translate-0.5 active:shadow-brutal-sm',
    'disabled:pointer-events-none disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size }

/** Lien stylé en bouton ; les URL externes s'ouvrent dans un nouvel onglet */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  const external = typeof href === 'string' && /^https?:\/\//.test(href)
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    />
  )
}
