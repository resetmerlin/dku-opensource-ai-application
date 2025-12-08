import type { LucideIcon } from 'lucide-react'
import { CheckCircle, Smile, Star, Trophy, Users, Lightbulb } from 'lucide-react'

export const coreSkills = [
  'UI/UX Design',
  'Product Strategy',
  'AI Integration',
  'User Research',
  'Prototyping',
  'Design Systems',
]

export const featuredProjects = [
  { title: 'AI Design Assistant', desc: 'Revolutionary AI-powered design tool' },
  { title: 'Healthcare Dashboard', desc: 'Patient management system' },
  { title: 'E-commerce Platform', desc: '60% conversion increase' },
  { title: 'Mobile Banking App', desc: 'Financial management solution' },
]

export const careerTimeline = [
  { year: '2024', title: 'Senior Product Designer', company: 'TechFlow Inc' },
  { year: '2022', title: 'Lead Designer', company: 'InnovateLab' },
  { year: '2019', title: 'Product Designer', company: 'StartupXYZ' },
  { year: '2016', title: 'UI Designer', company: 'DesignStudio' },
]

export const achievementBadges: { icon: LucideIcon; title: string }[] = [
  { icon: Trophy, title: 'Design Award' },
  { icon: Star, title: 'Top Performer' },
  { icon: Users, title: 'Team Leader' },
  { icon: Lightbulb, title: 'Innovation' },
]

export const uploadedFiles = ['Resume_2024.pdf', 'Portfolio_Projects.zip', 'Certificates.pdf']

export const suggestedSkills = [
  'Product Design',
  'AI/ML',
  'User Research',
  'Prototyping',
  'Leadership',
]

export const performanceMetrics: { label: string; value: string; icon: LucideIcon }[] = [
  { label: 'Projects Completed', value: '156', icon: CheckCircle },
  { label: 'Client Satisfaction', value: '98%', icon: Smile },
  { label: 'Team Members Led', value: '24', icon: Users },
  { label: 'Awards Received', value: '8', icon: Trophy },
]

export const feedPosts = [
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

export const portfolioLayouts = [1, 2, 3, 4]
