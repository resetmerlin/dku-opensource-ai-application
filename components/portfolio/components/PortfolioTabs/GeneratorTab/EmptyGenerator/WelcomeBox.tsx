import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { Bot, Upload } from 'lucide-react'

function WelcomeBox() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white p-12 text-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-8">
        <svg className="absolute right-12 top-6 h-20 w-20" viewBox="0 0 100 100">
          <circle cx="30" cy="30" r="2" fill="#3B82F6" fillOpacity="0.1" />
          <circle cx="60" cy="40" r="1.5" fill="#3B82F6" fillOpacity="0.08" />
          <line
            x1="30"
            y1="30"
            x2="60"
            y2="40"
            stroke="#3B82F6"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        </svg>
      </div>
      <div className="relative z-10">
        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-slate-100 bg-slate-50">
          <Bot className="h-8 w-8 text-slate-600" />
          <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-slate-400/60" />
        </div>
        <h1 className="mb-3 text-2xl font-medium text-slate-900">AI Portfolio Generator</h1>
        <p className="mx-auto mb-8 max-w-lg text-sm text-slate-500">
          Let our AI create a stunning portfolio for you. Upload your files and watch as we
          transform your content into a professional showcase.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <SignInButton mode="modal">
            <Button className="cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800">
              <Upload className="mr-2 h-4 w-4" />
              Start Creating
            </Button>
          </SignInButton>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBox
