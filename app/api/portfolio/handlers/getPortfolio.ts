import { NextRequest } from 'next/server'
import PortfolioModel from '@/db/models/Portfolio'
import { createErrorResponse, createSuccessResponse, ensureDbConnection, handleError } from './utils'

export async function getPortfolioHandler(request: NextRequest) {
  try {
    await ensureDbConnection()

    const searchParams = request.nextUrl.searchParams
    const portfolioId = searchParams.get('portfolioId')

    if (!portfolioId) {
      return createErrorResponse('portfolioId parameter is required', 400)
    }

    const portfolio = await PortfolioModel.findById(portfolioId).lean()

    if (!portfolio) {
      return createErrorResponse('Portfolio not found', 404)
    }

    return createSuccessResponse({
      ...portfolio,
      _id: portfolio._id.toString(),
    })
  } catch (error) {
    return handleError(error, 'fetching portfolio')
  }
}
