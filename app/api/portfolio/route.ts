import { NextRequest } from 'next/server'
import {
  getPortfolioHandler,
  createPortfolioHandler,
  updatePortfolioHandler,
  deletePortfolioHandler,
} from './handlers'

export async function GET(request: NextRequest) {
  return getPortfolioHandler(request)
}

export async function POST(request: NextRequest) {
  return createPortfolioHandler(request)
}

export async function PUT(request: NextRequest) {
  return updatePortfolioHandler(request)
}

export async function DELETE(request: NextRequest) {
  return deletePortfolioHandler(request)
}
