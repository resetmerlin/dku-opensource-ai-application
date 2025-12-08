import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  ArrowRight,
  Heart,
  Lock,
  MessageCircle,
  Network,
  Rocket,
  Share2,
  Users,
} from 'lucide-react'

const previewPosts = [
  {
    user: 'Alex Rodriguez',
    role: 'Product Manager',
    time: '2 hours ago',
    content:
      'Just launched our new AI-powered design system! The collaboration between design and engineering teams has been incredible. Excited to see how this will streamline our workflow.',
    likes: 24,
    comments: 8,
    aiTag: 'AI-Enhanced',
  },
  {
    user: 'Maria Santos',
    role: 'UX Researcher',
    time: '5 hours ago',
    content:
      'Fascinating insights from our latest user research study. Users are 3x more likely to engage with personalized AI recommendations. The future of UX is definitely human-AI collaboration.',
    likes: 18,
    comments: 12,
    aiTag: 'Data Insights',
  },
  {
    user: 'David Kim',
    role: 'Design Director',
    time: '1 day ago',
    content:
      'Attending the AI Design Summit next week. Looking forward to connecting with fellow designers and exploring how AI is transforming our industry. Who else will be there?',
    likes: 31,
    comments: 15,
    aiTag: 'Innovation',
  },
]

const EmptyFeed = () => {
  const { setActiveTab } = usePortfolioContext()

  return (
    <div className="relative space-y-12">
      <div className="text-center">
        <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100">
          <Users className="h-8 w-8 text-emerald-500" />
          <div className="absolute right-1 top-1 h-2 w-2 animate-pulse rounded-full bg-emerald-400/60" />
        </div>
        <h1 className="mb-3 text-xl font-medium text-slate-900">Connect with Professionals</h1>
        <p className="mx-auto mb-6 max-w-md text-sm text-slate-500">
          Create your profile first to join the professional community. Once your portfolio is
          ready, you&apos;ll see personalized feeds and networking opportunities.
        </p>
        <Button
          onClick={() => setActiveTab('generator')}
          className="cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800"
        >
          <Rocket className="mr-2 h-4 w-4" />
          Build Your Profile
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <svg className="absolute left-1/4 top-20 h-32 w-32" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="lockedNeural1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="30" r="2" fill="#3B82F6" fillOpacity="0.2" />
          <circle cx="50" cy="20" r="1.5" fill="#3B82F6" fillOpacity="0.15" />
          <circle cx="70" cy="40" r="2" fill="#3B82F6" fillOpacity="0.2" />
          <circle cx="80" cy="70" r="1" fill="#3B82F6" fillOpacity="0.1" />
          <line x1="20" y1="30" x2="50" y2="20" stroke="url(#lockedNeural1)" strokeWidth="0.5" />
          <line x1="50" y1="20" x2="70" y2="40" stroke="url(#lockedNeural1)" strokeWidth="0.5" />
          <line x1="70" y1="40" x2="80" y2="70" stroke="url(#lockedNeural1)" strokeWidth="0.5" />
        </svg>
        <svg className="absolute right-1/4 top-60 h-24 w-24" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="lockedNeural2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polygon
            points="30,20 50,10 70,25 60,45 40,40"
            fill="none"
            stroke="url(#lockedNeural2)"
            strokeWidth="0.5"
          />
          <circle cx="30" cy="20" r="1" fill="#0F172A" fillOpacity="0.1" />
          <circle cx="50" cy="10" r="1" fill="#0F172A" fillOpacity="0.1" />
          <circle cx="70" cy="25" r="1" fill="#0F172A" fillOpacity="0.1" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl space-y-6 opacity-50">
        <EmptyFeed.Posts />
      </div>

      <div className="relative z-10 mt-12 text-center">
        <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-8 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/50">
          <div className="relative">
            <Network className="mb-4 inline-block h-8 w-8 text-emerald-400 transition-colors group-hover:text-emerald-500" />
            <h2 className="mb-2 text-base font-medium text-slate-900">
              Ready to Join the Community?
            </h2>
            <p className="mx-auto mb-4 max-w-md text-sm text-slate-500">
              Once you create your professional profile, you&apos;ll unlock personalized networking
              opportunities and industry insights.
            </p>
            <Button
              onClick={() => setActiveTab('feed')}
              className="cursor-pointer whitespace-nowrap rounded-button bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Create Profile Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

EmptyFeed.Posts = () => {
  return previewPosts.map((post, index) => (
    <Card
      key={post.user}
      className="group relative overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/30"
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gray-50/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="text-center">
          <Lock className="mb-2 inline-block h-6 w-6 text-gray-400" />
          <p className="text-xs text-gray-500">Create profile to unlock</p>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-16 w-16 bg-gradient-to-bl from-emerald-50/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute right-4 top-4">
        <div className="h-2 w-2 rotate-45 rounded-sm bg-gray-400/30" />
        <div className="ml-3 -mt-1 h-1 w-1 rounded-full bg-gray-300/40" />
      </div>
      <div className="relative flex items-start space-x-4">
        <div className="relative">
          <Avatar className="h-10 w-10 ring-1 ring-gray-200">
            <AvatarImage
              src={`https://localhost/api/search-image?query=Professional%20business%20person%20headshot%20with%20friendly%20expression%20on%20clean%20background%20for%20social%20media%20profile&width=48&height=48&seq=feed00${
                index + 1
              }&orientation=squarish`}
            />
            <AvatarFallback className="bg-gray-200 text-sm text-gray-500">
              {post.user
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-gray-400 opacity-60">
            <div className="h-full w-full rounded-full bg-gray-300" />
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-3 flex items-center space-x-2">
            <h4 className="font-medium text-gray-500">{post.user}</h4>
            <Badge className="rounded border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
              {post.aiTag}
            </Badge>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">{post.role}</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">{post.time}</span>
          </div>
          <p className="mb-6 text-sm leading-relaxed text-gray-500">{post.content}</p>
          <div className="absolute left-14 top-16 h-8 w-px bg-gradient-to-b from-gray-200/50 to-transparent opacity-40" />
          <div className="flex items-center space-x-6">
            <button className="flex cursor-not-allowed items-center space-x-2 text-gray-400">
              <Heart className="h-4 w-4" />
              <span className="text-sm">{post.likes}</span>
            </button>
            <button className="flex cursor-not-allowed items-center space-x-2 text-gray-400">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{post.comments}</span>
            </button>
            <button className="flex cursor-not-allowed items-center space-x-2 text-gray-400">
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
            <div className="ml-auto flex items-center space-x-1 opacity-30">
              <div className="h-1 w-1 rounded-full bg-gray-400" />
              <div className="h-0.5 w-0.5 rounded-full bg-gray-300" />
              <span className="text-xs text-gray-400">AI</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  ))
}

export default EmptyFeed
