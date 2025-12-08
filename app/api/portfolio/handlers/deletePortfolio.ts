import { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import PortfolioModel from '@/db/models/Portfolio'
import { createErrorResponse, ensureDbConnection, handleError } from './utils'

export async function deletePortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return createErrorResponse('Unauthorized - Please sign in to delete your portfolio', 401)
    }

    await ensureDbConnection()

    const portfolio = await PortfolioModel.findOneAndDelete({ userId })

    if (!portfolio) {
      return createErrorResponse('Portfolio not found', 404)
    }

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
