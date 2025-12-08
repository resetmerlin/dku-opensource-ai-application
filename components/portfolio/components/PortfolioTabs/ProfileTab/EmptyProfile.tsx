import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignInButton } from '@clerk/nextjs'
import {
  Award,
  CalendarPlus,
  Edit3,
  Image as ImageIcon,
  PlusCircle,
  Upload,
  UserRound,
} from 'lucide-react'

type EmptyProfileProps = {
  onGetStarted?: () => void
  onLearnMore?: () => void
}

const EmptyProfile = ({ onGetStarted, onLearnMore }: EmptyProfileProps) => {
  return (
    <div className="space-y-12">
      <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-white p-12 text-center">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
          <svg className="absolute right-8 top-4 h-16 w-16" viewBox="0 0 100 100">
            <circle cx="30" cy="30" r="2" fill="#3B82F6" />
            <circle cx="70" cy="50" r="1.5" fill="#3B82F6" />
            <line x1="30" y1="30" x2="70" y2="50" stroke="#3B82F6" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
            <UserRound className="h-8 w-8 text-gray-400" />
          </div>
          <h1 className="mb-3 text-2xl font-medium text-slate-900">Welcome to ProCraft</h1>
          <p className="mx-auto mb-8 max-w-md text-slate-500">
            Let&apos;s build your professional profile together. Upload your information and let our
            AI create a stunning portfolio for you.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <SignInButton mode="modal">
              <Button className="cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800">
                <Upload className="mr-2 h-4 w-7" />
                Get Started
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>

      <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-white p-8 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30">
        <div className="relative">
          <Edit3 className="mb-4 inline-block h-8 w-8 text-gray-300 transition-colors group-hover:text-blue-400" />
          <h2 className="mb-2 text-base font-medium text-slate-900">
            Add Your Professional Summary
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Tell the world about your experience, skills, and achievements. Our AI will help
            optimize your content.
          </p>
          <Badge className="rounded bg-blue-50 px-3 py-1 text-xs text-blue-600">
            <PlusCircle className="mr-1 inline-block h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Core Skills</h3>
            <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30">
              <PlusCircle className="mb-3 inline-block h-6 w-6 text-gray-300 transition-colors group-hover:text-blue-400" />
              <p className="mb-2 text-sm text-slate-500">Add your professional skills</p>
              <p className="text-xs text-slate-400">
                Start typing and our AI will suggest relevant skills
              </p>
            </Card>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Featured Projects</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <Card
                  key={item}
                  className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <div className="mb-3 flex aspect-video items-center justify-center rounded bg-gray-100 transition-colors group-hover:bg-blue-100/50">
                    <ImageIcon className="h-6 w-6 text-gray-300 transition-colors group-hover:text-blue-400" />
                  </div>
                  <p className="text-xs text-slate-500">Add Project</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Career Timeline</h3>
            <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30">
              <CalendarPlus className="mb-3 inline-block h-6 w-6 text-gray-300 transition-colors group-hover:text-blue-400" />
              <p className="mb-1 text-sm text-slate-500">Add your work experience</p>
              <p className="text-xs text-slate-400">Upload your resume or add manually</p>
            </Card>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Achievements</h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((item) => (
                <Card
                  key={item}
                  className="group cursor-pointer border-2 border-dashed border-gray-200 p-4 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30"
                >
                  <Award className="mb-2 inline-block h-5 w-5 text-gray-300 transition-colors group-hover:text-blue-400" />
                  <div className="text-xs text-slate-400">Add Achievement</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyProfile
