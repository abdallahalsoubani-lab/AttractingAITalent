/**
 * أنواع TypeScript الأساسية للتطبيق
 */

// User Types
export interface User {
  id: string
  email: string
  name: string
  nameAr: string
  role: 'ADMIN' | 'HR_MANAGER' | 'HR_SPECIALIST' | 'TECH_REVIEWER' | 'CONSULTANT' | 'VIEWER'
  phone?: string
  department?: string
  avatar?: string
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}

// Job Types
export interface Job {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  status: 'DRAFT' | 'OPEN' | 'ON_HOLD' | 'CLOSED' | 'FILLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  department?: string
  location?: string
  isRemote: boolean
  salaryMin?: number
  salaryMax?: number
  currency: string
  openings: number
  applicationsCount?: number
  deadline?: Date
  createdAt: Date
  publishedAt?: Date
  closedAt?: Date
}

// Candidate Types
export interface Candidate {
  id: string
  firstName: string
  lastName: string
  firstNameAr?: string
  lastNameAr?: string
  email: string
  phone?: string
  country?: string
  city?: string
  yearsExperience?: number
  currentCompany?: string
  currentTitle?: string
  expectedSalary?: number
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  scholarUrl?: string
  aiSummary?: string
  aiStrengths: string[]
  aiWeaknesses: string[]
  tags: string[]
  source?: string
  isBlacklisted: boolean
  createdAt: Date
}

// Application Types
export interface Application {
  id: string
  candidateId: string
  jobId: string
  stage: ApplicationStage
  status: 'ACTIVE' | 'ON_HOLD' | 'CLOSED'
  matchScore?: number
  aiRanking?: number
  appliedAt: Date
  updatedAt: Date
  rejectionReason?: string
  withdrawReason?: string
}

export type ApplicationStage =
  | 'NEW'
  | 'SCREENED'
  | 'SHORTLISTED'
  | 'TECH_INTERVIEW'
  | 'HR_INTERVIEW'
  | 'FINAL_INTERVIEW'
  | 'OFFER'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN'

// Interview Types
export interface Interview {
  id: string
  applicationId: string
  type: 'PHONE_SCREEN' | 'TECHNICAL' | 'BEHAVIORAL' | 'SYSTEM_DESIGN' | 'FINAL' | 'HR'
  title: string
  scheduledAt: Date
  duration: number
  location?: string
  isRemote: boolean
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  recordingUrl?: string
  transcriptUrl?: string
  aiSummary?: string
  createdAt: Date
}

// Evaluation Types
export interface Evaluation {
  id: string
  applicationId: string
  evaluatorId: string
  type: 'CV_SCREENING' | 'TECHNICAL_INTERVIEW' | 'HR_INTERVIEW' | 'FINAL_INTERVIEW' | 'OVERALL'
  overallScore: number
  scoresJson: Record<string, any>
  strengths: string[]
  weaknesses: string[]
  recommendation?: string
  isAiGenerated: boolean
  createdAt: Date
}

// Project Types
export interface Project {
  id: string
  name: string
  nameAr: string
  description?: string
  status: 'DRAFT' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED'
  startDate: Date
  endDate?: Date
  budget?: number
  createdAt: Date
  updatedAt: Date
}

// Report Types
export interface Report {
  id: string
  projectId?: string
  type: 'MONTHLY_RECRUITMENT' | 'MONTHLY_EXPERTS' | 'KPI_DASHBOARD' | 'LESSONS_LEARNED' | 'CUSTOM'
  title: string
  period: string
  dataJson: Record<string, any>
  insightsJson?: Record<string, any>
  documentUrl?: string
  createdAt: Date
}

// AI Expert Types
export interface AiExpert {
  id: string
  name: string
  nameAr?: string
  affiliation?: string
  country?: string
  level: 'ELITE' | 'TOP' | 'EMERGING'
  specializations: string[]
  hIndex?: number
  citations?: number
  publications?: number
  googleScholar?: string
  linkedinUrl?: string
  personalWebsite?: string
  summary?: string
  notableWork: string[]
  createdAt: Date
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  limit: number
  offset: number
}

// Form Types
export interface JobFormData {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  status: string
  priority: string
  department?: string
  location?: string
  isRemote: boolean
  salaryMin?: number
  salaryMax?: number
  openings: number
  skills: string[]
}

export interface CandidateFormData {
  firstName: string
  lastName: string
  firstNameAr?: string
  lastNameAr?: string
  email: string
  phone?: string
  yearsExperience?: number
  currentCompany?: string
  currentTitle?: string
  expectedSalary?: number
  skills: string[]
}
