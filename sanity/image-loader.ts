'use client'

import type { ImageLoaderProps } from 'next/image'

/** Loader de next/image : le CDN Sanity redimensionne et choisit le format (AVIF/WebP) */
export default function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  if (!src.startsWith('https://cdn.sanity.io/')) return src

  const url = new URL(src)
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 80))
  url.searchParams.set('fit', 'max')
  url.searchParams.set('auto', 'format')
  return url.toString()
}
