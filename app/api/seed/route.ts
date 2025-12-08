import { NextResponse } from 'next/server'
import { seedDummyPortfolios } from '@/lib/db/seedPortfolios'

/**
 * POST /api/seed
 * Seed the database with dummy portfolios
 */
export async function POST() {
  try {
    await seedDummyPortfolios()

    return NextResponse.json(
      {
        success: true,
        message: 'Database seeded successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to seed database',
      },
      { status: 500 }
    )
  }
}
