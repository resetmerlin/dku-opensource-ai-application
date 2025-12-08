import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'

const FeedTab = () => {
  const { portfolio } = usePortfolioContext()

  return (
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <svg className="absolute left-1/4 top-20 h-32 w-32" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="neuralGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="30" r="2" fill="#3B82F6" fillOpacity="0.2" />
          <circle cx="50" cy="20" r="1.5" fill="#3B82F6" fillOpacity="0.15" />
          <circle cx="70" cy="40" r="2" fill="#3B82F6" fillOpacity="0.2" />
          <circle cx="80" cy="70" r="1" fill="#3B82F6" fillOpacity="0.1" />
          <line x1="20" y1="30" x2="50" y2="20" stroke="url(#neuralGradient1)" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="70" y2="40" stroke="url(#neuralGradient1)" strokeWidth="0.5" />
          <line x1="70" y1="40" x2="80" y2="70" stroke="url(#neuralGradient1)" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-1/4 top-60 h-24 w-24" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="neuralGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polygon
            points="30,20 50,10 70,25 60,45 40,40"
            fill="none"
            stroke="url(#neuralGradient2)"
            strokeWidth="0.5"
          />
          <circle cx="30" cy="20" r="1" fill="#0F172A" fillOpacity="0.1" />
          <circle cx="50" cy="10" r="1" fill="#0F172A" fillOpacity="0.1" />
          <circle cx="70" cy="25" r="1" fill="#0F172A" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl space-y-6">
        {portfolio &&
          portfolio?.feedPosts.map((post, index) => (
            <Card
              key={post.user}
              className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white/95 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gray-200 hover:shadow-sm"
            >
              <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-blue-50/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-4 top-4">
                <div className="h-2 w-2 rotate-45 rounded-sm bg-blue-500/20" />
                <div className="ml-3 -mt-1 h-1 w-1 rounded-full bg-slate-300/40" />
              </div>
              <div className="relative flex items-start space-x-4">
                <div className="relative">
                  <Avatar className="h-10 w-10 ring-1 ring-gray-100">
                    <AvatarImage
                      src={`https://readdy.ai/api/search-image?query=Professional%20business%20person%20headshot%20with%20friendly%20expression%20on%20clean%20background%20for%20social%20media%20profile&width=48&height=48&seq=feed00${
                        index + 1
                      }&orientation=squarish`}
                    />
                    <AvatarFallback className="bg-gray-100 text-sm text-gray-600">
                      {post.user
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-blue-500 opacity-80">
                    <div className="h-full w-full animate-pulse rounded-full bg-blue-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-center space-x-2">
                    <h4 className="font-medium text-slate-900">{post.user}</h4>
                    <Badge className="rounded border-blue-100 bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
                      {post.aiTag}
                    </Badge>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-500">{post.role}</span>
                    <span className="text-sm text-slate-400">•</span>
                    <span className="text-sm text-slate-400">{post.time}</span>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-slate-700">{post.content}</p>
                  <div className="absolute left-14 top-16 h-8 w-px bg-gradient-to-b from-blue-200/50 to-transparent opacity-60" />
                  <div className="flex items-center space-x-6">
                    <div className="ml-auto flex items-center space-x-1 opacity-60">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-blue-400" />
                      <div className="h-0.5 w-0.5 rounded-full bg-slate-300" />
                      <span className="text-xs text-slate-400">AI</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default FeedTab
