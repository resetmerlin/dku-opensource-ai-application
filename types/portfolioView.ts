// types/portfolioView.ts
export type PortfolioView = {
  profile: {
    initials: string
    name: string
    title: string
    stats: {
      followers: number
      endorsements: number
      projects: number
    }
  }
  about: {
    bio: string
    aiEnhanced: boolean
  }
  coreSkills: string[]
  featuredProjects: {
    id: string
    title: string
    description: string
    imageUrl?: string
    subtitle?: string
  }[]
  careerTimeline: {
    id: string
    year: string
    title: string
    company: string
    description?: string
  }[]
  achievements: {
    id: string
    title: string
    icon?: string
    description?: string
  }[]
}
