'use client'

import { useParams } from 'next/navigation'
import PortfolioPage from '@/components/portfolio'

export default function PortfolioByIdPage() {
  const params = useParams()
  const portfolioId = params.portfolioId as string

  return <PortfolioPage portfolioId={portfolioId} />
}
