import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// In-memory storage for user roles
const userRoles = new Map<string, 'recruiter' | 'job-seeker'>()

/**
 * GET /api/user/role
 * Fetch the current user's role
 */
export async function GET() {
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

    const role = userRoles.get(userId)

    return NextResponse.json(
      {
        success: true,
        message: 'User role fetched successfully',
        data: role || null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching user role:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch user role',
        data: null,
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/user/role
 * Set the current user's role
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { role } = body

    if (!role || (role !== 'recruiter' && role !== 'job-seeker')) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid role. Must be either "recruiter" or "job-seeker"',
          data: null,
        },
        { status: 400 }
      )
    }

    userRoles.set(userId, role)

    return NextResponse.json(
      {
        success: true,
        message: 'User role set successfully',
        data: role,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error setting user role:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to set user role',
        data: null,
      },
      { status: 500 }
    )
  }
}
