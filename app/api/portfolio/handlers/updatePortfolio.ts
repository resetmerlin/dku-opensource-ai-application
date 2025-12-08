import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { savePortfolio, getPortfolioByUserId } from '@/lib/db/fakePortfolioDB'
import { createErrorResponse, createSuccessResponse, handleError } from './utils'

export async function updatePortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return createErrorResponse('Unauthorized - Please sign in to update your portfolio', 401)
    }

    const body = await request.json()

    // Check if portfolio exists first
    const existing = await getPortfolioByUserId(userId)
    if (!existing) {
      return createErrorResponse('Portfolio not found', 404)
    }

    // Update the portfolio
    const portfolio = await savePortfolio(userId, {
      ...body,
      profile: {
        ...body.profile,
        userId,
      },
    })

    return createSuccessResponse(portfolio, 'Portfolio updated successfully')
  } catch (error) {
    return handleError(error, 'updating portfolio')
  }
}
