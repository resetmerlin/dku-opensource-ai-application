'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useGetPortfolioData } from '@/hooks/usePortfolio'
import type { LucideIcon } from 'lucide-react'
import { CheckCircle, Smile, Star, Trophy, Users, Lightbulb } from 'lucide-react'
import {
  achievementBadges as defaultAchievementBadges,
  careerTimeline as defaultCareerTimeline,
  coreSkills as defaultCoreSkills,
  feedPosts as defaultFeedPosts,
  featuredProjects as defaultFeaturedProjects,
  performanceMetrics as defaultPerformanceMetrics,
  portfolioLayouts as defaultPortfolioLayouts,
  suggestedSkills as defaultSuggestedSkills,
  uploadedFiles as defaultUploadedFiles,
} from './data'
import type { Portfolio } from '@/types/portfolio'
import { useClerk } from '@clerk/nextjs'
import { useParams } from 'next/navigation'

const iconMap: Record<string, LucideIcon> = {
  Trophy,
  Star,
  Users,
  Lightbulb,
  CheckCircle,
  Smile,
}

type PortfolioContextType = {
  portfolio: Portfolio | undefined
  isLoading: boolean
  isOthersPortfolio: boolean
  activeTab: string
  setActiveTab: (tab: string) => void
  displayCoreSkills: string[]
  displayFeaturedProjects: Array<{
    title: string
    desc: string
    imageUrl?: string
  }>
  displayCareerTimeline: Array<{ id?: string; year: string; title: string; company: string }>
  displayAchievementBadges: Array<{ icon: LucideIcon; title: string }>
  displayPerformanceMetrics: Array<{ label: string; value: string; icon: LucideIcon }>
  displayFeedPosts: Array<{
    user: string
    role: string
    time: string
    content: string
    likes: number
    comments: number
    aiTag: string
  }>
  displayUploadedFiles: string[]
  displaySuggestedSkills: string[]
  displayPortfolioLayouts: number[]
  showFirstOnboarding: boolean
  isMyPortfolio: boolean
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined)

type PortfolioProviderProps = {
  children: ReactNode
  portfolioId?: string
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const params = useParams<{ portfolioId: string }>()

  const portfolioId = params.portfolioId

  const [activeTab, setActiveTab] = useState('profile')

  const { data: portfolio, isLoading, isOthersPortfolio } = useGetPortfolioData(portfolioId)

  const { user } = useClerk()

  const showFirstOnboarding = !user && !portfolio
  const isMyPortfolio = portfolio?.userId === user?.id

  const displayCoreSkills =
    portfolio?.coreSkills?.map((skill) => (typeof skill === 'string' ? skill : skill.name)) ||
    defaultCoreSkills

  const displayFeaturedProjects =
    portfolio?.featuredProjects?.map((project) => ({
      title: project.title,
      desc: project.description,
      imageUrl: project.imageUrl,
    })) || []

  const displayCareerTimeline = portfolio?.careerTimeline || defaultCareerTimeline

  const displayAchievementBadges =
    portfolio?.achievementBadges?.map((badge) => ({
      icon: iconMap[badge.icon] || Trophy,
      title: badge.title,
    })) || defaultAchievementBadges

  const displayPerformanceMetrics =
    portfolio?.performanceMetrics?.map((metric) => ({
      label: metric.label,
      value: metric.value,
      icon: iconMap[metric.icon] || CheckCircle,
    })) || defaultPerformanceMetrics

  const displayFeedPosts =
    portfolio?.feedPosts?.map((post) => ({
      user: post.user,
      role: post.role,
      time: post.time,
      content: post.content,
      likes: post.likes,
      comments: post.comments,
      aiTag: post.aiTag || '',
    })) || defaultFeedPosts

  const displayUploadedFiles =
    portfolio?.uploadedFiles?.map((file) => file.filename) || defaultUploadedFiles
  const displaySuggestedSkills = portfolio?.suggestedSkills || defaultSuggestedSkills
  const displayPortfolioLayouts =
    portfolio?.portfolioLayouts?.map((layout) => Number(layout.id.split('-')[1])) ||
    defaultPortfolioLayouts

  const value: PortfolioContextType = {
    portfolio,
    isLoading,
    isOthersPortfolio,
    activeTab,
    setActiveTab,
    displayCoreSkills,
    displayFeaturedProjects,
    displayCareerTimeline,
    displayAchievementBadges,
    displayPerformanceMetrics,
    displayFeedPosts,
    displayUploadedFiles,
    displaySuggestedSkills,
    displayPortfolioLayouts,
    showFirstOnboarding,
    isMyPortfolio,
  }

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error('usePortfolioContext must be used within a PortfolioProvider')
  }
  return context
}
