'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowRight,
  ArrowUp,
  Clock,
  Eye,
  Flame,
  Github,
  LayoutGrid,
  Linkedin,
  Plus,
  Search,
  Star,
  Twitter,
  X,
} from 'lucide-react'
import { FaEye, FaHeart, FaBriefcase, FaWindows } from 'react-icons/fa'
import {
  SiAdobe,
  SiAirbnb,
  SiAmazon,
  SiApple,
  SiBehance,
  SiFacebook,
  SiGoogle,
  SiInstagram,
  SiShopify,
  SiSketch,
  SiSlack,
  SiSpotify,
} from 'react-icons/si'
import { portfolios as fallbackPortfolios } from './data'
import { Header } from './Header'
import { usePortfolios } from '@/hooks/usePortfolios'
import { useRouter } from 'next/navigation'

const HubPage: React.FC = () => {
  const router = useRouter()
  const { data: apiPortfolios, isLoading } = usePortfolios()
  const portfolios = apiPortfolios || fallbackPortfolios

  const [activeCategory, setActiveCategory] = useState('trending')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [searchQuery, setSearchQuery] = useState('')
  const categories = [
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'most-viewed', label: 'Most Viewed', icon: Eye },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'all', label: 'All Portfolios', icon: LayoutGrid },
  ]
  const filteredPortfolios = portfolios.filter((portfolio) => {
    const matchesSearch =
      portfolio.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portfolio.industry.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesIndustry =
      selectedIndustry === 'all' ||
      portfolio.industry.toLowerCase() === selectedIndustry.toLowerCase()
    const matchesRole =
      selectedRole === 'all' || portfolio.role.toLowerCase().includes(selectedRole.toLowerCase())
    let matchesCategory = true
    if (activeCategory === 'trending') {
      matchesCategory = portfolio.trending
    } else if (activeCategory === 'most-viewed') {
      matchesCategory = portfolio.views > 1500
    } else if (activeCategory === 'recent') {
      matchesCategory = true
    }
    return matchesSearch && matchesIndustry && matchesRole && matchesCategory
  })
  const handlePortfolioClick = (portfolio: any) => {
    const portfolioId = portfolio.portfolioId || portfolio.id
    router.push(`/portfolio/${portfolioId}`)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Header>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            type="text"
            placeholder="Search portfolios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 w-80 border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-8"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </Header>
      <div className="mx-auto w-[88vw] px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Featured Portfolios</h2>
          <p className="text-slate-600 mb-6">
            Discover exceptional work from talented professionals
          </p>
        </div>
        <div className="flex gap-8">
          <div className="w-80 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Filter Options</h3>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {[
                    { id: 'trending', label: 'Trending', icon: Flame },
                    { id: 'most-viewed', label: 'Most Viewed', icon: Eye },
                    { id: 'recent', label: 'Recent', icon: Clock },
                    { id: 'all', label: 'All Portfolios', icon: LayoutGrid },
                  ].map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer text-left ${
                        activeCategory === category.id
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'text-slate-600 hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Industry</h4>
                <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                  <SelectTrigger className="w-full border-gray-200 bg-white text-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Role</h4>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full border-gray-200 bg-white text-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="scientist">Data Scientist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'JavaScript', 'Python', 'UI/UX Design', 'Node.js', 'AWS'].map(
                    (skill) => (
                      <button
                        key={skill}
                        className="px-3 py-1 text-xs border border-gray-200 rounded-full text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors cursor-pointer"
                      >
                        {skill}
                      </button>
                    )
                  )}
                  <button className="px-3 py-1 text-xs border border-gray-200 rounded-full text-slate-600 hover:bg-gray-50 transition-colors cursor-pointer">
                    + More
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <h4 className="text-sm font-medium text-slate-700 mb-3">Experience</h4>
                <div className="space-y-2">
                  {[
                    { label: 'Entry Level', count: '1-3 years' },
                    { label: 'Mid Level', count: '4-6 years' },
                    { label: 'Senior Level', count: '7-9 years' },
                    { label: 'Expert Level', count: '10+ years' },
                  ].map((exp) => (
                    <label key={exp.label} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-slate-600">{exp.label}</span>
                      <span className="text-xs text-slate-400 ml-auto">{exp.count}</span>
                    </label>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedIndustry('all')
                  setSelectedRole('all')
                  setActiveCategory('trending')
                }}
                variant="outline"
                className="w-full border-gray-200 bg-white text-slate-600 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  Showing{' '}
                  <span className="font-medium text-gray-900">{filteredPortfolios.length}</span>{' '}
                  portfolios
                  {searchQuery && (
                    <span>
                      {' '}
                      for "<span className="font-medium text-gray-900">{searchQuery}</span>"
                    </span>
                  )}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-slate-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 border-gray-200 bg-white text-sm hover:border-gray-300 transition-colors">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="recent">Most Recent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {filteredPortfolios.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Search className="mx-auto mb-4 h-10 w-10 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolios found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedIndustry('all')
                    setSelectedRole('all')
                    setActiveCategory('trending')
                  }}
                  variant="outline"
                  className="border-gray-200 bg-white text-slate-600 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredPortfolios.map((portfolio) => (
                    <Card
                      key={portfolio.id}
                      className="group cursor-pointer overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white"
                      onClick={() => handlePortfolioClick(portfolio)}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={portfolio.image}
                          alt={`${portfolio.name}'s Portfolio`}
                          className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex space-x-2">
                            <Button className="bg-white text-slate-900 hover:bg-gray-100 !rounded-button whitespace-nowrap cursor-pointer text-sm h-8 px-4 shadow-sm transform hover:scale-105 transition-transform">
                              <FaEye className="mr-2 h-4 w-4" />
                              View Portfolio
                            </Button>
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {portfolio.id === 1 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <SiGoogle className="mr-1 inline-block h-3 w-3" />
                              Google
                            </Badge>
                          )}
                          {portfolio.id === 2 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <FaWindows className="mr-1 inline-block h-3 w-3" />
                              Microsoft
                            </Badge>
                          )}
                          {portfolio.id === 3 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <SiFacebook className="mr-1 inline-block h-3 w-3" />
                              Meta
                            </Badge>
                          )}
                          {portfolio.id === 4 && (
                            <Badge className="bg-orange-50 text-orange-800 border-orange-200 text-xs px-2 py-1 shadow-sm">
                              <SiAmazon className="mr-1 inline-block h-3 w-3" />
                              Amazon
                            </Badge>
                          )}
                          {portfolio.id === 5 && (
                            <Badge className="bg-red-50 text-red-800 border-red-200 text-xs px-2 py-1 shadow-sm">
                              <SiAdobe className="mr-1 inline-block h-3 w-3" />
                              Adobe
                            </Badge>
                          )}
                          {portfolio.id === 6 && (
                            <Badge className="bg-green-50 text-green-800 border-green-200 text-xs px-2 py-1 shadow-sm">
                              <SiSpotify className="mr-1 inline-block h-3 w-3" />
                              Spotify
                            </Badge>
                          )}
                          {portfolio.id === 7 && (
                            <Badge className="bg-red-50 text-red-800 border-red-200 text-xs px-2 py-1 shadow-sm">
                              <SiAirbnb className="mr-1 inline-block h-3 w-3" />
                              Airbnb
                            </Badge>
                          )}
                          {portfolio.id === 8 && (
                            <Badge className="bg-green-50 text-green-800 border-green-200 text-xs px-2 py-1 shadow-sm">
                              <SiShopify className="mr-1 inline-block h-3 w-3" />
                              Shopify
                            </Badge>
                          )}
                          {portfolio.id === 9 && (
                            <Badge className="bg-pink-50 text-pink-800 border-pink-200 text-xs px-2 py-1 shadow-sm">
                              <SiInstagram className="mr-1 inline-block h-3 w-3" />
                              Instagram
                            </Badge>
                          )}
                          {portfolio.id === 10 && (
                            <Badge className="bg-orange-50 text-orange-800 border-orange-200 text-xs px-2 py-1 shadow-sm">
                              <SiAmazon className="mr-1 inline-block h-3 w-3" />
                              AWS
                            </Badge>
                          )}
                          {portfolio.id === 11 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <SiBehance className="mr-1 inline-block h-3 w-3" />
                              Behance
                            </Badge>
                          )}
                          {portfolio.id === 12 && (
                            <Badge className="bg-gray-50 text-gray-800 border-gray-200 text-xs px-2 py-1 shadow-sm">
                              <SiApple className="mr-1 inline-block h-3 w-3" />
                              Apple
                            </Badge>
                          )}
                          {portfolio.id === 13 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <SiGoogle className="mr-1 inline-block h-3 w-3" />
                              Google
                            </Badge>
                          )}
                          {portfolio.id === 14 && (
                            <Badge className="bg-blue-50 text-blue-800 border-blue-200 text-xs px-2 py-1 shadow-sm">
                              <FaWindows className="mr-1 inline-block h-3 w-3" />
                              Microsoft
                            </Badge>
                          )}
                          {portfolio.id === 15 && (
                            <Badge className="bg-orange-50 text-orange-800 border-orange-200 text-xs px-2 py-1 shadow-sm">
                              <SiSketch className="mr-1 inline-block h-3 w-3" />
                              Sketch
                            </Badge>
                          )}
                          {portfolio.id === 16 && (
                            <Badge className="bg-purple-50 text-purple-800 border-purple-200 text-xs px-2 py-1 shadow-sm">
                              <SiSlack className="mr-1 inline-block h-3 w-3" />
                              Slack
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={portfolio.avatar} />
                            <AvatarFallback className="bg-slate-100 text-slate-600 text-sm font-medium">
                              {portfolio.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-slate-900">
                              {portfolio.name}
                            </h3>
                            <p className="text-sm text-slate-600">{portfolio.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500 mt-3">
                          <span className="flex items-center space-x-1">
                            <FaHeart className="h-4 w-4" />
                            <span>{portfolio.likes} likes</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaBriefcase className="h-4 w-4" />
                            <span>{portfolio.experience}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaEye className="h-4 w-4" />
                            <span>{portfolio.views} views</span>
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button
                    variant="outline"
                    className="border-gray-200 bg-white text-slate-600 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer px-8 py-3"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Load More Portfolios
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-8 z-40">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-slate-900 hover:bg-slate-800 text-white !rounded-button whitespace-nowrap cursor-pointer h-12 w-12 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
      <footer className="bg-gray-900 text-gray-300 py-12 mt-16 relative border-t border-gray-700 shadow-2xl shadow-slate-900/25">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.01] via-transparent to-teal-600/[0.01] pointer-events-none"></div>
        <div className="mx-auto w-[88vw] px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl shadow-blue-600/40 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">ProCraft</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed font-normal">
                Empowering professionals with AI-powered personal branding and portfolio creation
                tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-tight">Product</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    AI Generator
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-tight">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 tracking-tight">Support</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors cursor-pointer font-normal"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 font-normal">
              © 2024 ProCraft. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default HubPage
