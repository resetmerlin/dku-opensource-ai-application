import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getPortfolioByUserId } from '@/lib/db/fakePortfolioDB'
import type { PortfolioResponse } from '@/types/portfolio'

export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized - Please sign in to access your portfolio',
        },
        { status: 401 }
      )
    }

    const portfolio = await getPortfolioByUserId(userId)

    if (!portfolio) {
      return NextResponse.json(
        {
          success: false,
          message: 'Portfolio not found',
        },
        { status: 404 }
      )
    }

    const response: PortfolioResponse = {
      success: true,
      data: portfolio,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
