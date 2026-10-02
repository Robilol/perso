import {
  PortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from '@portabletext/react'
import { SanityImage, type SanityImageData } from '@/components/sanity-image'
import { cx } from '@/lib/cx'

type ImageBlock = SanityImageData & { _key: string; caption?: string | null }

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-pretty">{children}</p>,
    h2: ({ children }) => (
      <h2 className="!mt-14 flex items-center gap-3 font-heading text-2xl leading-tight text-ink first:!mt-0 sm:text-3xl">
        <span aria-hidden className="size-3 shrink-0 rotate-45 border-2 border-ink bg-mint" />
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="!mt-10 font-heading text-xl text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="rounded-2xl border-2 border-ink bg-sun px-6 py-5 text-lg font-medium shadow-brutal">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2.5">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal space-y-2.5 pl-6 marker:font-mono">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-6 before:absolute before:top-[0.6em] before:left-0 before:size-2.5 before:border-2 before:border-ink before:bg-mint">
        {children}
      </li>
    ),
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    code: ({ children }) => (
      <code className="rounded-md border border-ink/20 bg-white px-1.5 py-0.5 font-mono text-[0.85em]">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href ?? '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="font-semibold underline decoration-mint decoration-[3px] underline-offset-4 hover:decoration-ink"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as ImageBlock
      return (
        <figure className="!my-10">
          <div className="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-brutal">
            <SanityImage
              image={image}
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full"
            />
          </div>
          {image.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">{image.caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export function RichText({
  value,
  className,
}: {
  value?: PortableTextProps['value'] | null
  className?: string
}) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return (
    <div className={cx('space-y-5 text-lg leading-relaxed text-ink/85', className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
