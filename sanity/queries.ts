import { defineQuery } from 'groq'

// Champs communs des images : texte alternatif, recadrage, point focal et métadonnées utiles à next/image
const imageFields = /* groq */ `
  alt,
  crop,
  hotspot,
  asset->{_id, url, metadata{lqip, dimensions{width, height}}}
`

const projectCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  category,
  subtitle,
  tags,
  url,
  period,
  "hasCaseStudy": defined(body[0]),
  coverimage{${imageFields}}
`

/** Profil : métadonnées, en-tête et pied de page de toutes les pages */
export const SITE_QUERY = defineQuery(/* groq */ `
  *[_type == "profile" && _id == "profile"][0]{
    firstName,
    lastName,
    jobTitle,
    headline,
    intro,
    email,
    location,
    availability,
    socialLinks[]{_key, platform, url},
    seo
  }
`)

/** Types de documents affichés sur l'accueil : tags de cache de la page et date de mise à jour du sitemap */
export const HOME_TYPES = [
  'profile',
  'project',
  'jobExperience',
  'service',
  'educationalBackground',
  'clientReview',
]

export const HOME_QUERY = defineQuery(/* groq */ `{
  "profile": *[_type == "profile" && _id == "profile"][0]{
    firstName,
    lastName,
    jobTitle,
    availability,
    headline,
    headlineHighlight,
    intro,
    stats[]{_key, value, label},
    portrait{${imageFields}},
    about,
    location,
    languages,
    skillGroups[]{_key, title, skills},
    "resumeUrl": resume.asset->url,
    process[]{_key, title, text},
    contactText,
    email,
    socialLinks[]{_key, platform, url}
  },
  "projects": *[_type == "project" && defined(slug.current)]
    | order(coalesce(order, 999) asc, _createdAt asc){
      ${projectCardFields},
      featured,
      client,
      keyResults[]{_key, value, label}
    },
  "experiences": *[_type == "jobExperience"]
    | order(select(current == true => 9999, coalesce(endYear, startYear)) desc, startYear desc){
      _id,
      title,
      company,
      companyUrl,
      logo{${imageFields}},
      location,
      contractTypes,
      startYear,
      endYear,
      current,
      summary,
      achievements,
      tags
    },
  "services": *[_type == "service"] | order(coalesce(order, 999) asc){
    _id,
    title,
    text,
    iconName,
    deliverables,
    stack
  },
  "education": *[_type == "educationalBackground"] | order(year desc){_id, title, meta, year},
  "testimonials": *[_type == "clientReview"] | order(_createdAt desc){
    _id,
    name,
    meta,
    text,
    image{${imageFields}}
  }
}`)

export const PROJECT_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    ${projectCardFields},
    _createdAt,
    _updatedAt,
    client,
    role,
    keyResults[]{_key, value, label},
    links[]{_key, label, url},
    body[]{
      ...,
      _type == "image" => {
        _key,
        _type,
        caption,
        ${imageFields}
      }
    },
    imagegallery[]{_key, ${imageFields}},
    "others": *[_type == "project" && defined(slug.current) && slug.current != $slug]
      | order(coalesce(order, 999) asc)[0...3]{${projectCardFields}}
  }
`)

/** Réalisations qui ont une étude de cas : pages pré-générées */
export const CASE_STUDIES_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current) && defined(body[0])]{"slug": slug.current}
`)

/** Sitemap : dernières mises à jour et captures des études de cas ($homeTypes = HOME_TYPES) */
export const SITEMAP_QUERY = defineQuery(/* groq */ `{
  "homeUpdatedAt": *[_type in $homeTypes] | order(_updatedAt desc)[0]._updatedAt,
  "caseStudies": *[_type == "project" && defined(slug.current) && defined(body[0])]{
    "slug": slug.current,
    _updatedAt,
    "images": [coverimage, ...coalesce(imagegallery, [])].asset->url
  },
  "legalUpdatedAt": *[_type == "legalNotice" && _id == "legalNotice"][0]._updatedAt
}`)

/** Mentions légales ; l'email de contact vient du profil */
export const LEGAL_QUERY = defineQuery(/* groq */ `{
  "legal": *[_type == "legalNotice" && _id == "legalNotice"][0]{
    _updatedAt,
    publisherName,
    legalStatus,
    siret,
    address,
    vatNumber,
    publicationDirector,
    host{name, address, phone, url},
    body
  },
  "contact": *[_type == "profile" && _id == "profile"][0]{email}
}`)
