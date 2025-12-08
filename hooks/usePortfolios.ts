import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/apiClient'

type HubPortfolio = {
  id: string
  portfolioId: string
  name: string
  title: string
  industry: string
  role: string
  rating: number
  views: number
  likes: number
  image: string
  avatar: string
  featured: boolean
  trending: boolean
  bio: string
  skills: string[]
  projects: number
  experience: string
}

type PortfoliosResponse = {
  success: boolean
  data: HubPortfolio[]
  total: number
  message?: string
}

export const usePortfolios = () => {
  return useQuery<HubPortfolio[], Error>({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const response = await apiClient.get<PortfoliosResponse>('/portfolios')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}
