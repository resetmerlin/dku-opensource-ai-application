import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import PortfolioModel from '@/db/models/Portfolio'
import { createErrorResponse, createSuccessResponse, ensureDbConnection, handleError } from './utils'

export async function updatePortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return createErrorResponse('Unauthorized - Please sign in to update your portfolio', 401)
    }

    await ensureDbConnection()

    const body = await request.json()

    const portfolio = await PortfolioModel.findOneAndUpdate(
      { userId },
      {
        ...body,
        profile: {
          ...body.profile,
          userId,
        },
      },
      { new: true, runValidators: true }
    )

    if (!portfolio) {
      return createErrorResponse('Portfolio not found', 404)
    }

    return createSuccessResponse(
      {
        ...portfolio.toObject(),
        _id: portfolio._id.toString(),
      },
      'Portfolio updated successfully'
    )
  } catch (error) {
    return handleError(error, 'updating portfolio')
  }
}
