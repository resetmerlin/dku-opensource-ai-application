import mongoose, { Schema, Document } from 'mongoose'
import type { Portfolio } from '@/types/portfolio'

export interface PortfolioDocument extends Omit<Portfolio, '_id'>, Document {}

const CoreSkillSchema = new Schema({
  name: { type: String, required: true },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
  },
})

const FeaturedProjectSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  technologies: [String],
  link: String,
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed',
  },
})

const CareerTimelineSchema = new Schema({
  id: { type: String, required: true },
  year: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  isCurrent: { type: Boolean, default: false },
})

const AchievementBadgeSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: String,
  earnedDate: Date,
})

const PerformanceMetricSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
  change: Number,
  trend: {
    type: String,
    enum: ['up', 'down', 'stable'],
  },
})

const FeedPostSchema = new Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  role: { type: String, required: true },
  avatar: String,
  time: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  aiTag: String,
  timestamp: { type: Date, default: Date.now },
})

const UploadedFileSchema = new Schema({
  id: { type: String, required: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  size: { type: Number, required: true },
  type: { type: String, required: true },
})

const PortfolioLayoutSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  thumbnail: String,
  isActive: { type: Boolean, default: false },
})

const PortfolioSchema = new Schema<PortfolioDocument>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    profile: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
      title: { type: String, required: true },
      bio: { type: String, required: true },
      avatar: String,
      stats: {
        followers: { type: Number, default: 0 },
        endorsements: { type: Number, default: 0 },
        projects: { type: Number, default: 0 },
      },
    },
    coreSkills: [CoreSkillSchema],
    featuredProjects: [FeaturedProjectSchema],
    careerTimeline: [CareerTimelineSchema],
    achievementBadges: [AchievementBadgeSchema],
    performanceMetrics: [PerformanceMetricSchema],
    feedPosts: [FeedPostSchema],
    uploadedFiles: [UploadedFileSchema],
    suggestedSkills: [String],
    portfolioLayouts: [PortfolioLayoutSchema],
  },
  {
    timestamps: true,
  }
)

const PortfolioModel =
  mongoose.models.Portfolio || mongoose.model<PortfolioDocument>('Portfolio', PortfolioSchema)

export default PortfolioModel
