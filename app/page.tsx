import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AboutSection } from '@/components/home/about-section'
import { ClientsMarquee } from '@/components/home/clients-marquee'
import { ContactSection } from '@/components/home/contact-section'
import { ExperienceSection } from '@/components/home/experience-section'
import { Hero } from '@/components/home/hero'
import { ProjectsSection } from '@/components/home/projects-section'
import { ServicesSection } from '@/components/home/services-section'
import { TestimonialsSection } from '@/components/home/testimonials-section'
import { JsonLd } from '@/components/json-ld'
import { PERSON_ID, WEBSITE_ID } from '@/lib/seo'
import { SITE_URL } from '@/lib/site'
import { sanityFetch } from '@/sanity/client'
import { HOME_QUERY, HOME_TYPES } from '@/sanity/queries'
import type { HOME_QUERY_RESULT } from '@/sanity/types'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

// Entrées du bandeau « Ils m'ont fait confiance » qui ne désignent pas une entreprise
const NOT_A_CLIENT = new Set(['freelance', 'indépendant', 'projet personnel'])

export default async function HomePage() {
  const { profile, projects, experiences, services, education, testimonials } = await sanityFetch({
    query: HOME_QUERY,
    tags: HOME_TYPES,
  })
  if (!profile) notFound()

  const featuredProject = projects.find((project) => project.featured) ?? projects[0]

  return (
    <>
      <Hero profile={profile} featuredProject={featuredProject} />
      <ClientsMarquee
        names={clientNames(experiences, projects)}
        keywords={services.map((service) => service.title)}
      />
      <ProjectsSection projects={projects} />
      <ServicesSection services={services} process={profile.process} />
      <ExperienceSection experiences={experiences} resumeUrl={profile.resumeUrl} />
      <TestimonialsSection testimonials={testimonials} />
      <AboutSection profile={profile} education={education} />
      <ContactSection profile={profile} />
      <JsonLd data={structuredData(profile)} />
    </>
  )
}

/** Site, page de profil et personne (schema.org), reliés par leurs identifiants */
function structuredData(profile: NonNullable<HOME_QUERY_RESULT['profile']>) {
  const name = `${profile.firstName} ${profile.lastName}`
  // « Versailles (78) · Remote » → « Versailles »
  const city = profile.location?.split(/[(·,]/)[0].trim()

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name,
        inLanguage: 'fr-FR',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'ProfilePage',
        '@id': SITE_URL,
        url: SITE_URL,
        name: `${name} — ${profile.jobTitle}`,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': WEBSITE_ID },
        mainEntity: { '@id': PERSON_ID },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name,
        givenName: profile.firstName,
        familyName: profile.lastName,
        jobTitle: profile.jobTitle,
        description: profile.intro,
        url: SITE_URL,
        email: `mailto:${profile.email}`,
        image: profile.portrait?.asset?.url,
        address: city
          ? { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'FR' }
          : undefined,
        // « Anglais (TOEIC 760) » → « Anglais »
        knowsLanguage: profile.languages?.map((language) => language.replace(/\s*\(.*\)$/, '')),
        knowsAbout: profile.skillGroups?.flatMap((group) => group.skills) ?? [],
        sameAs: profile.socialLinks?.map((link) => link.url) ?? [],
      },
    ],
  }
}

/** Entreprises et clients cités dans le parcours et les réalisations, sans doublon */
function clientNames(
  experiences: HOME_QUERY_RESULT['experiences'],
  projects: HOME_QUERY_RESULT['projects'],
) {
  const names = [
    ...experiences.map((experience) => experience.company),
    ...projects.map((project) => project.client),
  ]
    .filter((name): name is string => Boolean(name))
    .map((name) => name.replace(/\s*\(.*\)\s*$/, '').trim())
    .filter((name) => !NOT_A_CLIENT.has(name.toLowerCase()))

  return [...new Map(names.map((name) => [name.toLowerCase(), name])).values()]
}
