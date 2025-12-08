export type Portfolio = {
  id: number
  name: string
  title: string
  industry: string
  role: string
  rating: number
  views: number
  likes: number
  image: string
  avatar: string
  featured: boolean
  trending: boolean
  bio: string
  skills: string[]
  projects: number
  experience: string
}

export const categories: { id: string; label: string; icon: LucideIcon }[] = [
  { id: 'trending', label: 'Trending', icon: Flame },
  { id: 'most-viewed', label: 'Most Viewed', icon: Eye },
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'all', label: 'All Portfolios', icon: LayoutGrid },
]

export const industries = ['all', 'design', 'engineering', 'marketing', 'product']

export const roles = ['all', 'designer', 'developer', 'manager', 'scientist']

export const skillsFilter = ['React', 'JavaScript', 'Python', 'UI/UX Design', 'Node.js', 'AWS']

export const portfolios: Portfolio[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    title: 'Senior Product Designer',
    industry: 'Design',
    role: 'Product Designer',
    rating: 4.8,
    views: 1247,
    likes: 89,
    image:
      'https://localhost:3000/search-image?query=Modern%20minimalist%20product%20design%20portfolio%20showcase%20with%20clean%20interface%20elements%20and%20professional%20layout%20on%20white%20background&width=400&height=300&seq=portfolio001&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Asian%20female%20designer%20headshot%20with%20confident%20smile%20on%20clean%20background&width=80&height=80&seq=avatar001&orientation=squarish',
    featured: true,
    trending: true,
    bio: 'Passionate product designer with 8+ years of experience creating user-centered digital experiences for Fortune 500 companies.',
    skills: ['UI/UX Design', 'Prototyping', 'User Research', 'Design Systems'],
    projects: 12,
    experience: '8+ years',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    title: 'Full Stack Developer',
    industry: 'Engineering',
    role: 'Developer',
    rating: 4.9,
    views: 2156,
    likes: 134,
    image:
      'https://localhost:3000/search-image?query=Clean%20developer%20portfolio%20with%20code%20snippets%20and%20project%20screenshots%20on%20modern%20dark%20theme%20background&width=400&height=300&seq=portfolio002&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Hispanic%20male%20software%20developer%20headshot%20with%20friendly%20expression%20on%20neutral%20background&width=80&height=80&seq=avatar002&orientation=squarish',
    featured: false,
    trending: true,
    bio: 'Full-stack developer specializing in React, Node.js, and cloud architecture. Passionate about building scalable web applications.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    projects: 18,
    experience: '6+ years',
  },
  {
    id: 3,
    name: 'Emily Watson',
    title: 'Marketing Director',
    industry: 'Marketing',
    role: 'Marketing Manager',
    rating: 4.7,
    views: 987,
    likes: 76,
    image:
      'https://localhost:3000/search-image?query=Professional%20marketing%20portfolio%20with%20campaign%20visuals%20and%20analytics%20charts%20on%20bright%20clean%20background&width=400&height=300&seq=portfolio003&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20female%20marketing%20executive%20headshot%20with%20professional%20smile%20on%20white%20background&width=80&height=80&seq=avatar003&orientation=squarish',
    featured: true,
    trending: false,
    bio: 'Strategic marketing leader with expertise in digital campaigns, brand management, and growth marketing for B2B SaaS companies.',
    skills: ['Digital Marketing', 'Brand Strategy', 'Analytics', 'Growth Hacking'],
    projects: 15,
    experience: '10+ years',
  },
  {
    id: 4,
    name: 'David Kim',
    title: 'Data Scientist',
    industry: 'Engineering',
    role: 'Data Scientist',
    rating: 4.6,
    views: 1543,
    likes: 92,
    image:
      'https://localhost:3000/search-image?query=Data%20science%20portfolio%20with%20visualization%20charts%20and%20machine%20learning%20models%20on%20technical%20background&width=400&height=300&seq=portfolio004&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Asian%20male%20data%20scientist%20headshot%20with%20analytical%20expression%20on%20clean%20background&width=80&height=80&seq=avatar004&orientation=squarish',
    featured: false,
    trending: true,
    bio: 'Data scientist with expertise in machine learning, predictive analytics, and AI model development for enterprise solutions.',
    skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    projects: 22,
    experience: '7+ years',
  },
  {
    id: 5,
    name: 'Jessica Thompson',
    title: 'Brand Designer',
    industry: 'Design',
    role: 'Brand Designer',
    rating: 4.8,
    views: 1876,
    likes: 145,
    image:
      'https://localhost:3000/search-image?query=Creative%20brand%20design%20portfolio%20with%20logo%20designs%20and%20brand%20identity%20elements%20on%20artistic%20background&width=400&height=300&seq=portfolio005&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20African%20American%20female%20brand%20designer%20headshot%20with%20creative%20expression%20on%20neutral%20background&width=80&height=80&seq=avatar005&orientation=squarish',
    featured: true,
    trending: false,
    bio: 'Creative brand designer specializing in visual identity, logo design, and brand strategy for startups and established brands.',
    skills: ['Brand Identity', 'Logo Design', 'Adobe Creative Suite', 'Typography'],
    projects: 28,
    experience: '9+ years',
  },
  {
    id: 6,
    name: 'Alex Johnson',
    title: 'Product Manager',
    industry: 'Product',
    role: 'Product Manager',
    rating: 4.9,
    views: 2341,
    likes: 178,
    image:
      'https://localhost:3000/search-image?query=Product%20management%20portfolio%20with%20roadmap%20visuals%20and%20strategy%20frameworks%20on%20professional%20background&width=400&height=300&seq=portfolio006&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20male%20product%20manager%20headshot%20with%20strategic%20expression%20on%20clean%20background&width=80&height=80&seq=avatar006&orientation=squarish',
    featured: false,
    trending: true,
    bio: 'Strategic product manager with a track record of launching successful digital products and driving user growth at scale.',
    skills: ['Product Strategy', 'Roadmapping', 'Analytics', 'Agile'],
    projects: 16,
    experience: '8+ years',
  },
  {
    id: 7,
    name: 'Rachel Green',
    title: 'UX Researcher',
    industry: 'Design',
    role: 'UX Researcher',
    rating: 4.7,
    views: 1432,
    likes: 98,
    image:
      'https://localhost:3000/search-image?query=UX%20research%20portfolio%20with%20user%20journey%20maps%20and%20testing%20insights%20on%20clean%20professional%20background&width=400&height=300&seq=portfolio007&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20female%20UX%20researcher%20headshot%20with%20thoughtful%20expression%20on%20white%20background&width=80&height=80&seq=avatar007&orientation=squarish',
    featured: false,
    trending: true,
    bio: 'UX researcher passionate about understanding user behavior and translating insights into actionable design recommendations.',
    skills: ['User Research', 'Usability Testing', 'Data Analysis', 'Journey Mapping'],
    projects: 14,
    experience: '5+ years',
  },
  {
    id: 8,
    name: 'Michael Chang',
    title: 'Frontend Developer',
    industry: 'Engineering',
    role: 'Developer',
    rating: 4.8,
    views: 1789,
    likes: 112,
    image:
      'https://localhost:3000/search-image?query=Frontend%20development%20portfolio%20with%20interactive%20web%20interfaces%20and%20modern%20design%20layouts%20on%20tech%20background&width=400&height=300&seq=portfolio008&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Asian%20male%20frontend%20developer%20headshot%20with%20focused%20expression%20on%20clean%20background&width=80&height=80&seq=avatar008&orientation=squarish',
    featured: true,
    trending: true,
    bio: 'Frontend developer specializing in creating beautiful, responsive web applications with modern JavaScript frameworks.',
    skills: ['JavaScript', 'React', 'Vue.js', 'CSS Animation'],
    projects: 20,
    experience: '6+ years',
  },
  {
    id: 9,
    name: 'Sophia Martinez',
    title: 'Content Strategist',
    industry: 'Marketing',
    role: 'Content Manager',
    rating: 4.6,
    views: 1245,
    likes: 87,
    image:
      'https://localhost:3000/search-image?query=Content%20strategy%20portfolio%20with%20editorial%20calendars%20and%20engagement%20metrics%20on%20modern%20workspace%20background&width=400&height=300&seq=portfolio009&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Hispanic%20female%20content%20strategist%20headshot%20with%20creative%20smile%20on%20neutral%20background&width=80&height=80&seq=avatar009&orientation=squarish',
    featured: false,
    trending: false,
    bio: 'Content strategist focused on creating compelling narratives that drive engagement and build strong brand connections.',
    skills: ['Content Strategy', 'Copywriting', 'SEO', 'Social Media'],
    projects: 18,
    experience: '7+ years',
  },
  {
    id: 10,
    name: 'James Wilson',
    title: 'DevOps Engineer',
    industry: 'Engineering',
    role: 'DevOps Engineer',
    rating: 4.9,
    views: 2012,
    likes: 156,
    image:
      'https://localhost:3000/search-image?query=DevOps%20engineering%20portfolio%20with%20cloud%20infrastructure%20diagrams%20and%20automation%20workflows%20on%20technical%20background&width=400&height=300&seq=portfolio010&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20male%20DevOps%20engineer%20headshot%20with%20confident%20expression%20on%20clean%20background&width=80&height=80&seq=avatar010&orientation=squarish',
    featured: true,
    trending: true,
    bio: 'DevOps engineer with expertise in cloud infrastructure, automation, and building scalable deployment pipelines.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    projects: 25,
    experience: '8+ years',
  },
  {
    id: 11,
    name: 'Lisa Anderson',
    title: 'Graphic Designer',
    industry: 'Design',
    role: 'Graphic Designer',
    rating: 4.7,
    views: 1654,
    likes: 124,
    image:
      'https://localhost:3000/search-image?query=Graphic%20design%20portfolio%20with%20print%20materials%20and%20digital%20graphics%20on%20creative%20artistic%20background&width=400&height=300&seq=portfolio011&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20female%20graphic%20designer%20headshot%20with%20artistic%20expression%20on%20white%20background&width=80&height=80&seq=avatar011&orientation=squarish',
    featured: false,
    trending: false,
    bio: 'Graphic designer with a passion for creating visually stunning designs across print and digital mediums.',
    skills: ['Graphic Design', 'Print Design', 'Illustration', 'Branding'],
    projects: 31,
    experience: '9+ years',
  },
  {
    id: 12,
    name: 'Robert Taylor',
    title: 'Mobile App Developer',
    industry: 'Engineering',
    role: 'Developer',
    rating: 4.8,
    views: 1987,
    likes: 143,
    image:
      'https://localhost:3000/search-image?query=Mobile%20app%20development%20portfolio%20with%20smartphone%20interfaces%20and%20native%20app%20designs%20on%20modern%20tech%20background&width=400&height=300&seq=portfolio012&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20African%20American%20male%20mobile%20developer%20headshot%20with%20innovative%20expression%20on%20clean%20background&width=80&height=80&seq=avatar012&orientation=squarish',
    featured: true,
    trending: true,
    bio: 'Mobile app developer specializing in native iOS and Android applications with focus on user experience and performance.',
    skills: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    projects: 17,
    experience: '6+ years',
  },
  {
    id: 13,
    name: 'Amanda Foster',
    title: 'Digital Marketing Manager',
    industry: 'Marketing',
    role: 'Marketing Manager',
    rating: 4.6,
    views: 1376,
    likes: 94,
    image:
      'https://localhost:3000/search-image?query=Digital%20marketing%20portfolio%20with%20campaign%20results%20and%20social%20media%20analytics%20on%20professional%20background&width=400&height=300&seq=portfolio013&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Caucasian%20female%20digital%20marketer%20headshot%20with%20enthusiastic%20smile%20on%20white%20background&width=80&height=80&seq=avatar013&orientation=squarish',
    featured: false,
    trending: true,
    bio: 'Digital marketing manager with expertise in paid advertising, social media campaigns, and conversion optimization.',
    skills: ['PPC', 'Social Media', 'Google Analytics', 'Email Marketing'],
    projects: 19,
    experience: '7+ years',
  },
  {
    id: 14,
    name: 'Kevin Lee',
    title: 'Backend Developer',
    industry: 'Engineering',
    role: 'Developer',
    rating: 4.7,
    views: 1698,
    likes: 108,
    image:
      'https://localhost:3000/search-image?query=Backend%20development%20portfolio%20with%20server%20architecture%20and%20database%20schemas%20on%20technical%20background&width=400&height=300&seq=portfolio014&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Asian%20male%20backend%20developer%20headshot%20with%20technical%20expertise%20on%20clean%20background&width=80&height=80&seq=avatar014&orientation=squarish',
    featured: false,
    trending: false,
    bio: 'Backend developer focused on building robust, scalable server-side applications and API integrations.',
    skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices'],
    projects: 21,
    experience: '8+ years',
  },
  {
    id: 15,
    name: 'Nicole Brooks',
    title: 'UI Designer',
    industry: 'Design',
    role: 'UI Designer',
    rating: 4.8,
    views: 1823,
    likes: 137,
    image:
      'https://localhost:3000/search-image?query=UI%20design%20portfolio%20with%20interface%20mockups%20and%20design%20systems%20on%20modern%20creative%20background&width=400&height=300&seq=portfolio015&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20African%20American%20female%20UI%20designer%20headshot%20with%20creative%20confidence%20on%20neutral%20background&width=80&height=80&seq=avatar015&orientation=squarish',
    featured: true,
    trending: true,
    bio: 'UI designer passionate about creating intuitive and visually appealing user interfaces for web and mobile applications.',
    skills: ['UI Design', 'Figma', 'Design Systems', 'Prototyping'],
    projects: 24,
    experience: '6+ years',
  },
  {
    id: 16,
    name: 'Daniel Garcia',
    title: 'Business Analyst',
    industry: 'Product',
    role: 'Business Analyst',
    rating: 4.5,
    views: 1234,
    likes: 78,
    image:
      'https://localhost:3000/search-image?query=Business%20analysis%20portfolio%20with%20process%20flows%20and%20requirement%20documentation%20on%20professional%20background&width=400&height=300&seq=portfolio016&orientation=landscape',
    avatar:
      'https://localhost:3000/search-image?query=Professional%20Hispanic%20male%20business%20analyst%20headshot%20with%20analytical%20expression%20on%20clean%20background&width=80&height=80&seq=avatar016&orientation=squarish',
    featured: false,
    trending: false,
    bio: 'Business analyst specializing in requirements gathering, process optimization, and stakeholder communication.',
    skills: ['Requirements Analysis', 'Process Mapping', 'Stakeholder Management', 'Documentation'],
    projects: 13,
    experience: '5+ years',
  },
]
import type { LucideIcon } from 'lucide-react'
import { Clock, Eye, Flame, LayoutGrid } from 'lucide-react'
