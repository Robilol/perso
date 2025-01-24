import { http } from './http';
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

const getInformation = async () => {
  const res = await http.get<Information>('/api/information.json');
  return res.data;
};

const getServices = async () => {
  const res = await http.get<Service[]>('/api/services.json')
  return res.data
}

const getTechskills = async () => {
  const res = await http.get<TechSkill[]>('/api/techskills.json')
  return res.data
}

const getLanguageskills = async () => {
  const res = await http.get<LanguageSkill[]>('/api/languageskills.json')
  return res.data
}

const getPortfolioFilters = async () => {
  const res = await http.get<PortfolioFilter[]>('/api/portfoliofilters.json')
  return res.data
}

const getPortfolios = async () => {
  const res = await http.get<Project[]>('/api/portfolios.json')
  return res.data
}

const getJobExperience = async () => {
  const res = await http.get<JobExperience[]>('/api/jobexperience.json')
  return res.data
}

const getEducationBackground = async () => {
  const res = await http.get<EducationalBackground[]>('/api/educationbackground.json')
  return res.data
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
