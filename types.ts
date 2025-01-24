export type JobExperience = {
  'title': string
  'meta': string
  'text': string
  'year': string
  tags?: string[]
}

export type EducationalBackground = {
  'title': string
  'meta': string
  'text': string
  'year': string
}

export type LanguageSkill = {
  title: string
  percentage: number
}

export type PortfolioFilter = {
  title: string
  value: string
}

export type Portfolio = {
  'title': string;
  'subtitle': string;
  'coverimage': string;
  'imagegallery'?: string[]
  'videogallery': boolean,
  'url'?: string;
  'filters': string[];
  tags: string[]
}

export type Service = {
  title: string
  text: string
  icon: string
}

export type TechSkill = {
  title: string
  percentage: number
}