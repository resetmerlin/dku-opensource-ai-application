import { NextResponse } from 'next/server'
import { listAllPortfolios } from '@/lib/db/fakePortfolioDB'

/**
 * GET /api/portfolios
 * Fetch all portfolios (public endpoint)
 */
export async function GET() {
  try {
    const portfolios = await listAllPortfolios()

    // Transform portfolio data to match Hub page format
    const transformedPortfolios = portfolios.map((portfolio: any, index: number) => {
      // Use the featured project image or a placeholder
      const projectImage = portfolio.featuredProjects?.[0]?.imageUrl ||
        `https://placehold.co/600x400/4F46E5/FFFFFF/png?text=Portfolio+${index + 1}`

      return {
        id: portfolio._id || `portfolio-${index}`,
        portfolioId: portfolio._id,
        name: portfolio.profile.name,
        title: portfolio.profile.title,
        industry: 'Engineering', // Default, could be inferred from skills
        role: portfolio.profile.title,
        rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
        views: Math.floor(Math.random() * 2000) + 500, // Random views
        likes: Math.floor(Math.random() * 150) + 50, // Random likes
        image: projectImage,
        avatar: portfolio.profile.avatar || `https://i.pravatar.cc/150?img=${index + 1}`,
        featured: Math.random() > 0.6,
        trending: Math.random() > 0.5,
        bio: portfolio.profile.bio,
        skills: portfolio.coreSkills.map((skill: any) =>
          typeof skill === 'string' ? skill : skill.name
        ),
        projects: portfolio.profile.stats.projects || 0,
        experience: `${portfolio.profile.stats.yearsOfCareer}+ years`,
      }
    })

    return NextResponse.json(
      {
        success: true,
        data: transformedPortfolios,
        total: transformedPortfolios.length,
        message: 'Portfolios fetched successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch portfolios',
        data: [],
        total: 0,
      },
      { status: 500 }
    )
  }
}
