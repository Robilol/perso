import { OG_SIZE, renderOgImage } from '@/lib/og'
import { fullName, getSiteProfile } from '@/lib/seo'

export const alt = 'Robin Regis, développeur full-stack freelance'
export const size = OG_SIZE
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  const profile = await getSiteProfile()
  const availability = profile?.availability?.status === 'available' ? 'Disponible' : 'Freelance'

  return renderOgImage({
    name: fullName(profile),
    kicker: profile?.jobTitle ?? 'Développeur full-stack',
    title: profile?.headline ?? 'Applications web sur mesure',
    description: profile?.location,
    label: availability,
  })
}
