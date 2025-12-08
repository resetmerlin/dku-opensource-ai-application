import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, CheckCircle, Clock3, Lock, Rocket, Smile, Trophy, Users } from 'lucide-react'

const EmptyHighlights = () => {
  const { setActiveTab } = usePortfolioContext()

  return (
    <div className="space-y-12">
      <div className="mb-12 text-center">
        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-amber-50 to-amber-100">
          <ArrowRight className="h-8 w-8 text-amber-500" />
          <div className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-amber-400/60" />
        </div>
        <h1 className="mb-3 text-xl font-medium text-slate-900">
          Ready to Generate Your Highlights?
        </h1>
        <p className="mx-auto mb-6 max-w-md text-sm text-slate-500">
          First, let&apos;s create your profile using our AI Generator. Once your portfolio is
          ready, we can analyze your metrics and showcase your professional strengths.
        </p>
        <Button
          onClick={() => setActiveTab('generator')}
          className="cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800"
        >
          <ArrowRight className="mr-2 h-4 w-4" />
          Go to AI Generator
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-12 opacity-50 lg:grid-cols-2">
        <Card className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-8">
          <div className="absolute inset-0 bg-gray-50/30" />
          <div className="relative z-10 text-center">
            <Lock className="mb-4 inline-block h-6 w-6 text-gray-400" />
            <h2 className="mb-3 text-lg font-medium text-slate-600">Professional Strengths</h2>
            <p className="mb-6 text-sm text-slate-400">
              Available after profile creation. Our AI will analyze your skills and experience.
            </p>
            <Badge className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-500">
              <Clock3 className="mr-1 inline-block h-3 w-3" />
              Coming Soon
            </Badge>
          </div>
        </Card>

        <Card className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-8">
          <div className="absolute inset-0 bg-gray-50/30" />
          <div className="relative z-10 text-center">
            <Lock className="mb-4 inline-block h-6 w-6 text-gray-400" />
            <h2 className="mb-3 text-lg font-medium text-slate-600">Brand Analytics</h2>
            <p className="mb-6 text-sm text-slate-400">
              Real-time insights will be generated based on your completed profile.
            </p>
            <Badge className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-500">
              <Clock3 className="mr-1 inline-block h-3 w-3" />
              Coming Soon
            </Badge>
          </div>
        </Card>
      </div>

      <Card className="relative overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 opacity-50">
        <div className="absolute inset-0 bg-gray-50/30" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
          <svg className="absolute right-8 top-4 h-12 w-12" viewBox="0 0 100 100">
            <circle cx="30" cy="30" r="2" fill="#9CA3AF" />
            <circle cx="70" cy="50" r="1.5" fill="#9CA3AF" />
            <line x1="30" y1="30" x2="70" y2="50" stroke="#9CA3AF" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="relative z-10 text-center">
          <Lock className="mb-6 inline-block h-8 w-8 text-gray-400" />
          <h2 className="mb-4 text-lg font-medium text-slate-600">Performance Metrics</h2>
          <p className="mx-auto mb-8 max-w-md text-sm text-slate-400">
            Once you complete your profile in the AI Generator, we&apos;ll unlock detailed
            performance analytics and career insights.
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { label: 'Projects', icon: CheckCircle },
              { label: 'Satisfaction', icon: Smile },
              { label: 'Leadership', icon: Users },
              { label: 'Awards', icon: Trophy },
            ].map((metric) => {
              const Icon = metric.icon
              return (
                <div
                  key={metric.label}
                  className="rounded border border-gray-200 bg-gray-100/50 p-4"
                >
                  <Icon className="mb-2 inline-block h-5 w-5 text-gray-300" />
                  <div className="text-xs text-slate-400">{metric.label}</div>
                </div>
              )
            })}
          </div>
          <div className="mt-8">
            <Button
              onClick={() => setActiveTab('generator')}
              className="cursor-pointer whitespace-nowrap rounded-button bg-slate-600 text-white hover:bg-slate-700"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Start with AI Generator
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default EmptyHighlights
