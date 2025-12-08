// app/api/portfolio/pdf/route.ts
import { NextRequest, NextResponse } from 'next/server'
import type { Portfolio } from '@/types/portfolio'
import { auth } from '@clerk/nextjs/server'
import { createPortfolioPdf } from '@/lib/portfolioPdf'
import { getPortfolioById, getPortfolioByUserId } from '@/lib/db/fakePortfolioDB'

export const runtime = 'nodejs' // make sure this is NOT 'edge'

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: user not signed in',
          data: null,
        },
        { status: 401 }
      )
    }

    const portfolio = await getPortfolioByUserId(userId)

    if (!portfolio) {
      return NextResponse.json(
        {
          success: false,
          message: 'Portfolio not found on user',
          data: null,
        },
        { status: 404 }
      )
    }

    const buffer = await createPortfolioPdf(portfolio)
    const fileName = 'portfolio.pdf'

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return new Response('Failed to generate PDF', { status: 500 })
  }
}
