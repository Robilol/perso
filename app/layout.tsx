import type { Metadata, Viewport } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { fullName, getSiteProfile, openGraph } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getSiteProfile()
  const name = fullName(profile)
  const title = profile?.seo?.title || `${name} — ${profile?.jobTitle ?? 'Développeur full-stack'}`
  const description = profile?.seo?.description || profile?.intro

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${name}` },
    description,
    applicationName: name,
    authors: [{ name, url: SITE_URL }],
    creator: name,
    openGraph: openGraph({ siteName: name, title, description, url: '/' }),
    twitter: { card: 'summary_large_image', title, description: description ?? undefined },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#faf7f0',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const profile = await getSiteProfile()

  return (
    <html lang="fr" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:border-2 focus:border-ink focus:bg-sun focus:px-4 focus:py-2 focus:font-semibold"
        >
          Aller au contenu
        </a>
        {profile && <Header firstName={profile.firstName} lastName={profile.lastName} />}
        <main id="contenu">{children}</main>
        {profile && <Footer profile={profile} />}
        <Analytics />
      </body>
    </html>
  )
}
