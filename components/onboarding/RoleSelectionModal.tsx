'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type RoleSelectionModalProps = {
  onRoleSelect: (role: 'recruiter' | 'job-seeker') => void
  isSubmitting?: boolean
}

const RoleSelectionModal = ({ onRoleSelect, isSubmitting = false }: RoleSelectionModalProps) => {
  const [selectedRole, setSelectedRole] = useState<'recruiter' | 'job-seeker' | null>(null)

  const handleSubmit = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole)
    }
  }

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 backdrop-blur-sm w-screen h-screen">
      <Card className="w-full max-w-2xl rounded-lg border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-semibold text-slate-900">Welcome to Your Portfolio</h2>
          <p className="text-sm text-slate-600">
            To get started, please select your role to customize your experience
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={() => setSelectedRole('recruiter')}
            className={`group relative cursor-pointer rounded-lg border-2 p-6 text-left transition-all hover:shadow-md ${
              selectedRole === 'recruiter'
                ? 'border-slate-900 bg-slate-50'
                : 'border-gray-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
              <svg
                className="h-6 w-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-slate-900">Recruiter</h3>
            <p className="text-sm text-slate-600">
              I'm looking to discover and connect with talented professionals for opportunities
            </p>
            {selectedRole === 'recruiter' && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>

          <button
            onClick={() => setSelectedRole('job-seeker')}
            className={`group relative cursor-pointer rounded-lg border-2 p-6 text-left transition-all hover:shadow-md ${
              selectedRole === 'job-seeker'
                ? 'border-slate-900 bg-slate-50'
                : 'border-gray-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
              <svg
                className="h-6 w-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-medium text-slate-900">Job Seeker</h3>
            <p className="text-sm text-slate-600">
              I'm looking to showcase my skills and connect with potential employers
            </p>
            {selectedRole === 'job-seeker' && (
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
                <svg
                  className="h-4 w-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">You can change this later in your settings</p>
          <Button
            onClick={handleSubmit}
            disabled={!selectedRole || isSubmitting}
            className="h-10 rounded-lg bg-slate-900 px-6 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default RoleSelectionModal
