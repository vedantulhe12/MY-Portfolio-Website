export interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage?: string
  topics: string[]
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
  created_at: string
}

export interface GitHubStats {
  total_repos: number
  total_stars: number
  total_forks: number
  languages: LanguageStats[]
}

export interface LanguageStats {
  name: string
  percentage: number
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tech: string[]
  github?: string
  demo?: string
  featured: boolean
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string[]
  tech: string[]
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'cloud'
  level: 1 | 2 | 3 | 4 | 5
  icon?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next?: string
  previous?: string
}