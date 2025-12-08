import { client } from '../lib/sanity'
import {
  EducationalBackground,
  Information,
  JobExperience,
  LanguageSkill,
  Project,
  PortfolioFilter,
  Service,
  TechSkill,
} from '../types'

const getInformation = async (): Promise<Information> => {
  const query = `*[_type == "information"][0] {
    firstName,
    lastName,
    fullName,
    "thumbImage": thumbImage.asset->url,
    "largeImage": largeImage.asset->url,
    bio,
    age,
    birthday,
    nationality,
    languages,
    address,
    freelance,
    isAvailable,
    availabilityMessage,
    socialAddress,
    phoneNumbers,
    emailAddress
  }`

  const data = await client.fetch(query)
  return data
}

const getServices = async (): Promise<Service[]> => {
  const query = `*[_type == "service"] | order(_createdAt asc) {
    title,
    text,
    "icon": icon.asset->url
  }`

  const data = await client.fetch(query)
  return data
}

const getTechskills = async (): Promise<TechSkill[]> => {
  const query = `*[_type == "techSkill"] | order(_createdAt asc) {
    title,
    percentage
  }`

  const data = await client.fetch(query)
  return data
}

const getLanguageskills = async (): Promise<LanguageSkill[]> => {
  const query = `*[_type == "languageSkill"] | order(_createdAt asc) {
    title,
    percentage
  }`

  const data = await client.fetch(query)
  return data
}

const getPortfolioFilters = async (): Promise<PortfolioFilter[]> => {
  const query = `*[_type == "portfolioFilter"] | order(_createdAt asc) {
    title,
    value
  }`

  const data = await client.fetch(query)
  return data
}

const getPortfolios = async (): Promise<Project[]> => {
  const query = `*[_type == "project"] | order(_createdAt asc) {
    "id": _id,
    title,
    subtitle,
    "coverimage": coverimage.asset->url,
    "imagegallery": imagegallery[].asset->url,
    videogallery,
    url,
    filters,
    tags
  }`

  const data = await client.fetch(query)
  return data
}

const getJobExperience = async (): Promise<JobExperience[]> => {
  const query = `*[_type == "jobExperience"] | order(_createdAt asc) {
    title,
    meta,
    text,
    year,
    tags
  }`

  const data = await client.fetch(query)
  return data
}

const getEducationBackground = async (): Promise<EducationalBackground[]> => {
  const query = `*[_type == "educationalBackground"] | order(_createdAt asc) {
    title,
    meta,
    text,
    year
  }`

  const data = await client.fetch(query)
  return data
}

export {
  getInformation,
  getServices,
  getTechskills,
  getLanguageskills,
  getPortfolioFilters,
  getPortfolios,
  getJobExperience,
  getEducationBackground,
}
