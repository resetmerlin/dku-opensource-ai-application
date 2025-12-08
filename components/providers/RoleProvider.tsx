'use client'

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react'
import { useUser } from '@clerk/nextjs'
import apiClient from '@/lib/apiClient'
import RoleSelectionModal from '@/components/onboarding/RoleSelectionModal'
import { usePathname, useRouter } from 'next/navigation'

type UserRole = 'recruiter' | 'job-seeker' | null

type RoleContextType = {
  role: UserRole
  isLoading: boolean
  setRole: (role: 'recruiter' | 'job-seeker') => Promise<void>
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

type RoleProviderProps = {
  children: ReactNode
}

export const RoleProvider = ({ children }: RoleProviderProps) => {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [role, setRoleState] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()

  // Fetch user role on mount
  useLayoutEffect(() => {
    const fetchRole = async () => {
      if (!isLoaded) return

      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const response = await apiClient.get<{
          success: boolean
          data: UserRole
          message: string
        }>('/user/role')

        if (response.success && response.data) {
          setRoleState(response.data)
          setShowOnboarding(false)
        } else {
          // No role set, show onboarding
          setShowOnboarding(true)
        }
      } catch (error) {
        console.error('Error fetching user role:', error)
        // On error, assume no role and show onboarding
        setShowOnboarding(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRole()
  }, [user, isLoaded])

  const setRole = async (newRole: 'recruiter' | 'job-seeker') => {
    setIsSubmitting(true)
    try {
      const response = await apiClient.post<{
        success: boolean
        data: UserRole
        message: string
      }>('/user/role', { role: newRole })

      if (response.success) {
        setRoleState(newRole)
        setShowOnboarding(false)
      }
    } catch (error) {
      console.error('Error setting user role:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useLayoutEffect(() => {
    if (pathname == '/hub' && role === 'recruiter') return
    if (pathname.startsWith('/portfolio') && !pathname.endsWith('me') && role === 'recruiter')
      return

    router.replace('/portfolio/me')
  }, [router, pathname])

  const value: RoleContextType = {
    role,
    isLoading,
    setRole,
  }

  return (
    <RoleContext.Provider value={value}>
      {showOnboarding && user && (
        <RoleSelectionModal onRoleSelect={setRole} isSubmitting={isSubmitting} />
      )}
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}
