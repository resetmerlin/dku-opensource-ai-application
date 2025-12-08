'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header({ children }: { children?: ReactNode }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 px-8 py-4 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-[88vw] items-center">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded bg-slate-900"></div>
          <span className="text-lg font-medium text-slate-900">ProCraft</span>
        </div>
        <div className="mx-8 flex flex-1 justify-center">{children}</div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            <Link
              href="/hub"
              data-readdy="true"
              className="text-slate-900 font-medium transition-colors cursor-pointer text-sm"
            >
              Hub
            </Link>
            <Link
              href="/portfolio/me"
              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer text-sm"
            >
              About
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-slate-200 bg-white text-slate-600 hover:bg-slate-50 !rounded-button whitespace-nowrap cursor-pointer text-sm h-8 px-3"
            >
              Log In
            </Button>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white !rounded-button whitespace-nowrap cursor-pointer text-sm h-8 px-4">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
