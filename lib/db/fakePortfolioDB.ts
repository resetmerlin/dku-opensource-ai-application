// lib/fakePortfolioDb.ts
import { v4 as uuidv4 } from 'uuid'
import type { Portfolio } from '@/types/portfolio'

export type PortfolioRecord = Portfolio & {
  _id: string
  createdAt: string
  updatedAt: string
}

// --- In-memory database (resets on server restart) ---
const portfolios: PortfolioRecord[] = []

// Track if we've seeded the database
let isSeeded = false

// Auto-seed function
async function autoSeed() {
  if (isSeeded) return

  try {
    // Import seed function to avoid circular dependencies
    const { seedDummyPortfolios } = await import('./seedPortfolios')
    await seedDummyPortfolios()
    isSeeded = true
    console.log('✅ Database auto-seeded successfully')
  } catch (error) {
    console.error('❌ Failed to auto-seed database:', error)
  }
}

// Save (create or update)
export async function savePortfolio(
  userId: string,
  data: Partial<Portfolio>
): Promise<PortfolioRecord> {
  const existing = portfolios.find((p) => p.userId === userId)

  // UPDATE
  if (existing) {
    const updated: PortfolioRecord = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString(),
    }
    Object.assign(existing, updated)
    return updated
  }

  // CREATE
  const created: PortfolioRecord = {
    _id: uuidv4(),
    userId,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as PortfolioRecord

  portfolios.push(created)
  return created
}

export async function getPortfolioByUserId(userId: string): Promise<PortfolioRecord | null> {
  return portfolios.find((p) => p.userId === userId) ?? null
}

export async function getPortfolioById(id: string): Promise<PortfolioRecord | null> {
  return portfolios.find((p) => p._id === id) ?? null
}

export async function deletePortfolioById(id: string): Promise<boolean> {
  const index = portfolios.findIndex((p) => p._id === id)
  if (index === -1) return false

  portfolios.splice(index, 1)
  return true
}

export async function listAllPortfolios(): Promise<PortfolioRecord[]> {
  // Auto-seed if not already seeded
  await autoSeed()
  return portfolios
}
