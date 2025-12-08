import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getPortfolioByUserId, deletePortfolioById } from '@/lib/db/fakePortfolioDB'
import { createErrorResponse, handleError } from './utils'

export async function deletePortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return createErrorResponse('Unauthorized - Please sign in to delete your portfolio', 401)
    }

    // Find portfolio by userId first
    const portfolio = await getPortfolioByUserId(userId)

    if (!portfolio) {
      return createErrorResponse('Portfolio not found', 404)
    }

    // Delete by portfolio ID
    await deletePortfolioById(portfolio._id)

    return NextResponse.json(
      {
        success: true,
        message: 'Portfolio deleted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    return handleError(error, 'deleting portfolio')
  }
}
