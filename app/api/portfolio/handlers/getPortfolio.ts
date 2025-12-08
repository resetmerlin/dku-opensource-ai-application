import { NextRequest } from 'next/server'
import { getPortfolioById } from '@/lib/db/fakePortfolioDB'
import { createErrorResponse, createSuccessResponse, handleError } from './utils'

export async function getPortfolioHandler(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const portfolioId = searchParams.get('portfolioId')

    if (!portfolioId) {
      return createErrorResponse('portfolioId parameter is required', 400)
    }

    const portfolio = await getPortfolioById(portfolioId)

    if (!portfolio) {
      return createErrorResponse('Portfolio not found', 404)
    }

    return createSuccessResponse(portfolio)
  } catch (error) {
    return handleError(error, 'fetching portfolio')
  }
}
