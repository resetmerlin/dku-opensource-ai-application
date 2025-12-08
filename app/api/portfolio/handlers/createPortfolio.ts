import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import PortfolioModel from '@/db/models/Portfolio'
import { createErrorResponse, createSuccessResponse, ensureDbConnection, handleError } from './utils'

export async function createPortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return createErrorResponse('Unauthorized - Please sign in to create a portfolio', 401)
    }

    await ensureDbConnection()

    const body = await request.json()

    const existingPortfolio = await PortfolioModel.findOne({ userId })

    if (existingPortfolio) {
      return createErrorResponse('Portfolio already exists for this user', 409)
    }

    const portfolio = await PortfolioModel.create({
      userId,
      ...body,
      profile: {
        ...body.profile,
        userId,
      },
    })

    return createSuccessResponse(
      {
        ...portfolio.toObject(),
        _id: portfolio._id.toString(),
      },
      'Portfolio created successfully',
      201
    )
  } catch (error) {
    return handleError(error, 'creating portfolio')
  }
}
