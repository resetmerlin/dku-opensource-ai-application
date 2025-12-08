import type { LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import NoHighlights from './EmptyHighlights'
import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'

const strengths = [
  { skill: 'Design Leadership', value: 95 },
  { skill: 'User Research', value: 88 },
  { skill: 'AI Integration', value: 82 },
  { skill: 'Prototyping', value: 90 },
  { skill: 'Strategy', value: 85 },
]

const HighlightsTab = () => {
  const { displayPerformanceMetrics } = usePortfolioContext()

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Card className="rounded-lg border border-gray-100 bg-white p-8">
          <h2 className="mb-8 text-lg font-medium text-slate-900">Professional Strengths</h2>
          <div className="space-y-6">
            {strengths.map((item) => (
              <div key={item.skill}>
                <div className="mb-3 flex justify-between">
                  <span className="text-sm text-slate-900">{item.skill}</span>
                  <span className="text-sm text-slate-500">{item.value}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-gray-100">
                  <div
                    className="h-1.5 rounded-full bg-slate-900 transition-all duration-300"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-lg border border-gray-100 bg-white p-8">
          <h2 className="mb-8 text-lg font-medium text-slate-900">Branding Insights</h2>
          <div className="space-y-8">
            <div className="text-center">
              <div className="relative mx-auto h-32 w-32">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#F1F5F9" strokeWidth="4" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#0F172A"
                    strokeWidth="4"
                    strokeDasharray="251.2"
                    strokeDashoffset="62.8"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-medium text-slate-900">85%</div>
                    <div className="text-xs text-slate-500">Brand Score</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="rounded border border-gray-100 bg-gray-50 p-4 text-center">
                <div className="text-lg font-medium text-slate-900">12K</div>
                <div className="text-xs text-slate-500">Profile Views</div>
              </div>
              <div className="rounded border border-gray-100 bg-gray-50 p-4 text-center">
                <div className="text-lg font-medium text-slate-900">89%</div>
                <div className="text-xs text-slate-500">Engagement</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="rounded-lg border border-gray-100 bg-white p-8">
        <h2 className="mb-8 text-lg font-medium text-slate-900">Performance Metrics</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {displayPerformanceMetrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="text-center">
                <Icon className="mb-3 inline-block h-6 w-6 text-slate-400" />
                <div className="text-xl font-medium text-slate-900">{metric.value}</div>
                <div className="text-sm text-slate-500">{metric.label}</div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

export default HighlightsTab
