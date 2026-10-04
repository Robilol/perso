import Image from 'next/image'
import type { CSSProperties } from 'react'
import { urlFor } from '@/sanity/image'
import type { SanityImageCrop, SanityImageHotspot } from '@/sanity/types'

export type SanityImageData = {
  alt?: string | null
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
  asset: {
    _id: string
    url: string
    metadata: {
      lqip: string | null
      dimensions: { width: number; height: number } | null
    } | null
  } | null
}

type SanityImageProps = {
  image: SanityImageData | null | undefined
  /** Largeurs d'affichage, pour que next/image choisisse la bonne taille */
  sizes: string
  /** Remplit le parent (positionné) en respectant le point focal défini dans le Studio */
  fill?: boolean
  alt?: string
  priority?: boolean
  /** « eager » charge l'image même hors écran (ex. image suivante d'un diaporama) */
  loading?: 'eager' | 'lazy'
  className?: string
}

export function SanityImage({
  image,
  sizes,
  fill,
  alt,
  priority,
  loading,
  className,
}: SanityImageProps) {
  if (!image?.asset) return null

  const { crop, hotspot } = image
  const src = urlFor({
    asset: { _ref: image.asset._id },
    crop: crop ?? undefined,
    hotspot: hotspot ?? undefined,
  }).url()

  const lqip = image.asset.metadata?.lqip ?? undefined
  const placeholder = lqip ? 'blur' : 'empty'
  const altText = alt ?? image.alt ?? ''

  if (fill) {
    return (
      <Image
        src={src}
        alt={altText}
        fill
        sizes={sizes}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={lqip}
        className={className}
        style={objectPosition(crop, hotspot)}
      />
    )
  }

  const { width, height } = croppedDimensions(image.asset.metadata?.dimensions, crop)
  return (
    <Image
      src={src}
      alt={altText}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={loading}
      placeholder={placeholder}
      blurDataURL={lqip}
      className={className}
    />
  )
}

function croppedDimensions(
  dimensions: { width: number; height: number } | null | undefined,
  crop: SanityImageCrop | null | undefined,
) {
  const width = dimensions?.width ?? 1200
  const height = dimensions?.height ?? 800
  if (!crop) return { width, height }
  return {
    width: Math.round(width * (1 - (crop.left ?? 0) - (crop.right ?? 0))),
    height: Math.round(height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0))),
  }
}

/** Point focal du Studio, ramené à la zone recadrée, traduit en object-position */
function objectPosition(
  crop: SanityImageCrop | null | undefined,
  hotspot: SanityImageHotspot | null | undefined,
): CSSProperties | undefined {
  if (hotspot?.x === undefined || hotspot.y === undefined) return undefined
  const left = crop?.left ?? 0
  const top = crop?.top ?? 0
  const visibleWidth = 1 - left - (crop?.right ?? 0)
  const visibleHeight = 1 - top - (crop?.bottom ?? 0)
  const x = clamp((hotspot.x - left) / visibleWidth)
  const y = clamp((hotspot.y - top) / visibleHeight)
  return { objectPosition: `${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%` }
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}
