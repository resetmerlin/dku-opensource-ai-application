export interface PortfolioProfile {
  userId: string
  name: string
  title: string
  bio: string
  avatar?: string
  stats: {
    yearsOfCareer: number
    projects: number
    followers?: number
    endorsements?: number
  }
}

export interface CoreSkill {
  name: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}

export interface FeaturedProject {
  id: string
  title: string
  description: string
  imageUrl?: string
  technologies?: string[]
  link?: string
  status?: 'completed' | 'in-progress' | 'planned'
}

export interface CareerTimelineItem {
  id: string
  year: string
  title: string
  company: string
  description?: string
  startDate?: Date
  endDate?: Date | null
  isCurrent?: boolean
}

export interface AchievementBadge {
  id: string
  title: string
  icon: string
  description?: string
  earnedDate?: Date
}

export interface PerformanceMetric {
  label: string
  value: string
  icon: string
  change?: number
  trend?: 'up' | 'down' | 'stable'
}

export interface FeedPost {
  id: string
  user: string
  role: string
  avatar?: string
  time: string
  content: string
  likes: number
  comments: number
  aiTag?: string
  timestamp?: Date
}

export interface UploadedFile {
  id: string
  filename: string
  url: string
  uploadDate: Date
  size: number
  type: string
}

export interface PortfolioLayout {
  id: string
  name: string
  thumbnail?: string
  isActive?: boolean
}

export interface Portfolio {
  _id?: string
  userId: string
  profile: PortfolioProfile
  coreSkills: CoreSkill[]
  featuredProjects: FeaturedProject[]
  careerTimeline: CareerTimelineItem[]
  achievementBadges: AchievementBadge[]
  performanceMetrics: PerformanceMetric[]
  feedPosts: FeedPost[]
  uploadedFiles: UploadedFile[]
  suggestedSkills: string[]
  portfolioLayouts: PortfolioLayout[]
  createdAt?: string
  updatedAt?: string
}

export interface PortfolioResponse {
  success: boolean
  data: Portfolio
  message?: string
}

export interface PortfolioListResponse {
  success: boolean
  data: Portfolio[]
  total: number
  page: number
  limit: number
  message?: string
}
