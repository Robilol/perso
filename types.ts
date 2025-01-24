export interface JobExperience {
  'title': string
  'meta': string
  'text': string
  'year': string
  tags?: string[]
}

export interface EducationalBackground {
  'title': string
  'meta': string
  'text': string
  'year': string
}

export interface LanguageSkill {
  title: string
  percentage: number
}

export interface PortfolioFilter {
  title: string
  value: string
}

export interface Project {
  id: string
  'title': string
  'subtitle': string
  'coverimage': string
  'imagegallery'?: string[]
  'videogallery'?: string[]
  'url'?: string
  'filters': string[]
  tags: string[]
}

export interface Service {
  title: string
  text: string
  icon: string
}

export interface TechSkill {
  title: string
  percentage: number
}

export interface Information {
  'firstName': string
  'lastName': string
  'fullName': string
  'thumbImage': string
  'largeImage': string
  'bio': string
  'age': number
  'birthday': string
  'nationality': string
  'languages': string[]
  'address': string
  'freelance': string
  'socialAddress': {
    'github': string
    'linkedin': string
    'malt': string
  }
  'phoneNumbers': string[]
  'emailAddress': string[]
}
