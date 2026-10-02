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
    contactText,
    email,
    phone,
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
      location,
      contractType,
      startYear,
      endYear,
      current,
      summary,
      achievements,
      tags
    },
  "services": *[_type == "service"] | order(coalesce(order, 999) asc){_id, title, text, iconName},
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

/** Réalisations qui ont une étude de cas : pages pré-générées et sitemap */
export const CASE_STUDIES_QUERY = defineQuery(/* groq */ `
  *[_type == "project" && defined(slug.current) && defined(body[0])]{
    "slug": slug.current,
    _updatedAt
  }
`)
