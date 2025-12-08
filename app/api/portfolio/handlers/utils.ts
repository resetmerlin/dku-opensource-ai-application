import { NextResponse } from 'next/server'

export const createErrorResponse = (message: string, status: number, error?: unknown) => {
  return NextResponse.json(
    {
      success: false,
      message,
      error: error instanceof Error ? error.message : undefined,
    },
    { status }
  )
}

export const createSuccessResponse = <T>(data: T, message?: string, status: number = 200) => {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
    },
    { status }
  )
}

export const handleError = (error: unknown, context: string) => {
  console.error(`Error ${context}:`, error)
  return createErrorResponse('Internal server error', 500, error)
}
