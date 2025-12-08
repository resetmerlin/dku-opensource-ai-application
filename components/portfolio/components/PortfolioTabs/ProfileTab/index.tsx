'use client'

import type { LucideIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import EmptyProfile from './EmptyProfile'
import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'

const ProfileTab = () => {
  const {
    portfolio,
    displayCoreSkills,
    displayFeaturedProjects,
    displayCareerTimeline,
    displayAchievementBadges,
  } = usePortfolioContext()

  if (!portfolio) {
    return <EmptyProfile />
  }

  const { profile } = portfolio
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-12">
      <div className="rounded-lg border border-gray-100 bg-white p-8">
        <div className="flex items-start space-x-8">
          <Avatar className="h-20 w-20">
            {profile.avatar ? <AvatarImage src={profile.avatar} alt={profile.name} /> : null}
            <AvatarFallback className="bg-gray-100 text-lg font-medium text-gray-600">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="mb-1 text-xl font-medium text-slate-900">{profile.name}</h1>
            <p className="mb-8 text-slate-500">{profile.title}</p>
            <div className="flex items-center space-x-8">
              <div>
                <div className="text-lg font-medium text-slate-900">
                  {profile.stats.yearsOfCareer || 0}
                </div>
                <div className="text-xs text-slate-400">Years of Career</div>
              </div>
              <div>
                <div className="text-lg font-medium text-slate-900">
                  {profile.stats.projects || 0}
                </div>
                <div className="text-xs text-slate-400">Projects</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button className="h-8 cursor-pointer whitespace-nowrap rounded-button bg-slate-900 px-3 text-sm text-white hover:bg-slate-800">
              Connect
            </Button>
            <Button
              className="h-8 cursor-pointer whitespace-nowrap rounded-button border-gray-200 bg-white px-3 text-sm text-slate-600 hover:bg-gray-50"
              variant="outline"
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      <Card className="rounded-lg border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-medium text-slate-900">About</h2>
          <Badge className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500">AI Enhanced</Badge>
        </div>
        <p className="text-sm leading-relaxed text-slate-600">{profile.bio}</p>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Core Skills</h3>
            <div className="flex flex-wrap gap-2">
              {displayCoreSkills.map((skill) => (
                <Badge
                  key={skill}
                  className="cursor-pointer rounded border-0 bg-gray-50 px-2 py-1 text-xs text-slate-600 hover:bg-gray-100"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Featured Experiences</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {displayFeaturedProjects.map((project, index) => (
                <Card
                  key={project.title}
                  className="cursor-pointer rounded border border-gray-100 bg-white p-4 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-3 aspect-video overflow-hidden rounded bg-gray-50">
                    <img
                      src={`https://localhost/api/search-image?query=Modern%20minimalist%20user%20interface%20design%20mockup%20with%20clean%20layouts%20and%20professional%20aesthetic%20on%20a%20light%20background%20showcasing%20digital%20product%20design&width=300&height=200&seq=project00${
                        index + 1
                      }&orientation=landscape`}
                      alt={project.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <h4 className="text-sm font-medium text-slate-900">{project.title}</h4>
                  <p className="mt-1 text-xs text-slate-500">{project.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Career Timeline</h3>
            <div className="space-y-3">
              {displayCareerTimeline.map((item) => (
                <div key={item.year} className="flex items-start space-x-3 pb-2">
                  <div className="w-8 text-xs text-slate-400">{item.year}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{item.title}</div>
                    <div className="text-xs text-slate-500">{item.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium text-slate-900">Achievements</h3>
            <div className="grid grid-cols-2 gap-2">
              {displayAchievementBadges.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <Card
                    key={achievement.title}
                    className="cursor-pointer rounded border border-gray-100 bg-white p-3 text-center transition-shadow hover:shadow-sm"
                  >
                    <Icon className="mb-1 inline-block h-4 w-4 text-slate-500" />
                    <div className="text-xs text-slate-700">{achievement.title}</div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab
