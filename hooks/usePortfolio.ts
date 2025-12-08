import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/apiClient'
import type { Portfolio, PortfolioResponse } from '@/types/portfolio'

const PORTFOLIO_QUERY_KEY = 'portfolio'

/**
 * Fetch a portfolio by its ID (publicly accessible)
 */
export const usePortfolio = (portfolioId: string, enabled: boolean = true) => {
  return useQuery<Portfolio, Error>({
    queryKey: [PORTFOLIO_QUERY_KEY, portfolioId],
    queryFn: async () => {
      const response = await apiClient.get<PortfolioResponse>(
        `/portfolio?portfolioId=${portfolioId}`
      )
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled: !!portfolioId && enabled,
  })
}

/**
 * Fetch the current authenticated user's portfolio
 */
export const useMyPortfolio = (enabled: boolean = true) => {
  return useQuery<Portfolio, Error>({
    queryKey: [PORTFOLIO_QUERY_KEY, 'me'],
    queryFn: async () => {
      const response = await apiClient.get<PortfolioResponse>('/portfolio/me')
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    enabled,
  })
}

/**
 * Unified hook to fetch portfolio data
 * - If portfolioId is provided: fetches that specific portfolio (public)
 * - If isOwnPortfolio is true: fetches current user's portfolio (authenticated)
 */
export const useGetPortfolioData = (portfolioId?: string) => {
  const isOthersPortfolio = !!portfolioId?.length

  const { data: portfolioData, isLoading: isLoadingById } = usePortfolio(
    portfolioId || '',
    isOthersPortfolio
  )

  const { data: myPortfolioData, isLoading: isLoadingMine } = useMyPortfolio(!isOthersPortfolio)

  return {
    data: !isOthersPortfolio ? myPortfolioData : portfolioData,
    isLoading: !isOthersPortfolio ? isLoadingMine : isLoadingById,
    isOthersPortfolio,
  }
}

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient()

  return useMutation<Portfolio, Error, Omit<Portfolio, '_id' | 'userId'>>({
    mutationFn: async (portfolioData) => {
      const response = await apiClient.post<PortfolioResponse>('/portfolio', portfolioData)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] })
    },
  })
}

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient()

  return useMutation<Portfolio, Error, Partial<Portfolio>>({
    mutationFn: async (portfolioData) => {
      const response = await apiClient.put<PortfolioResponse>('/portfolio', portfolioData)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] })
      queryClient.setQueryData([PORTFOLIO_QUERY_KEY, data.userId], data)
    },
  })
}

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error>({
    mutationFn: async () => {
      await apiClient.delete('/portfolio')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] })
    },
  })
}
