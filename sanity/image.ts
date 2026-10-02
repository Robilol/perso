import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from './env'

const builder = createImageUrlBuilder({ projectId, dataset })

/** URL d'une image Sanity (recadrage de l'éditeur inclus) ; la taille est fixée par le loader de next/image */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
