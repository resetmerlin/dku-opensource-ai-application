# Portfolio API Documentation

## Overview
RESTful API for managing user portfolio information including profile, skills, projects, career timeline, achievements, and more.

## Base URL
```
/api/portfolio
```

## Authentication
- **Public endpoints**: `GET /api/portfolio` (fetch by portfolioId) - No authentication required
- **Protected endpoints**: All other endpoints require Clerk authentication
  - `GET /api/portfolio/me` - Fetch current user's portfolio
  - `POST /api/portfolio` - Create portfolio
  - `PUT /api/portfolio` - Update portfolio
  - `DELETE /api/portfolio` - Delete portfolio

---

## Endpoints

### GET /api/portfolio
Retrieve a portfolio by its ID (publicly accessible, no authentication required).

**Query Parameters:**
- `portfolioId` (required): The portfolio ID to fetch

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "portfolio_id",
    "userId": "user_12345",
    "profile": {
      "userId": "user_12345",
      "name": "Sarah Chen",
      "title": "Senior Product Designer",
      "bio": "Passionate product designer...",
      "avatar": "https://...",
      "stats": {
        "followers": 2400,
        "endorsements": 156,
        "projects": 89
      }
    },
    "coreSkills": [
      {
        "name": "UI/UX Design",
        "level": "expert"
      }
    ],
    "featuredProjects": [...],
    "careerTimeline": [...],
    "achievementBadges": [...],
    "performanceMetrics": [...],
    "feedPosts": [...],
    "uploadedFiles": [...],
    "suggestedSkills": [...],
    "portfolioLayouts": [...],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Missing portfolioId parameter
- `404 Not Found`: Portfolio not found
- `500 Internal Server Error`: Server error

---

### GET /api/portfolio/me
Retrieve the authenticated user's own portfolio.

**Authentication:** Required

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "portfolio_id",
    "userId": "user_12345",
    "profile": { /* ... */ },
    // ... rest of portfolio data
  }
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `404 Not Found`: Portfolio not found
- `500 Internal Server Error`: Server error

---

### POST /api/portfolio
Create a new portfolio for the authenticated user.

**Request Body:**
```json
{
  "profile": {
    "name": "John Doe",
    "title": "Full Stack Developer",
    "bio": "Experienced developer...",
    "stats": {
      "followers": 0,
      "endorsements": 0,
      "projects": 0
    }
  },
  "coreSkills": [
    {
      "name": "JavaScript",
      "level": "expert"
    }
  ],
  "featuredProjects": [],
  "careerTimeline": [],
  "achievementBadges": [],
  "performanceMetrics": [],
  "feedPosts": [],
  "uploadedFiles": [],
  "suggestedSkills": [],
  "portfolioLayouts": []
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": { /* portfolio object */ },
  "message": "Portfolio created successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `409 Conflict`: Portfolio already exists
- `500 Internal Server Error`: Server error

---

### PUT /api/portfolio
Update the authenticated user's portfolio.

**Request Body:**
Same structure as POST, but all fields are optional (partial update supported).

**Response (200 OK):**
```json
{
  "success": true,
  "data": { /* updated portfolio object */ },
  "message": "Portfolio updated successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `404 Not Found`: Portfolio not found
- `500 Internal Server Error`: Server error

---

### DELETE /api/portfolio
Delete the authenticated user's portfolio.

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Portfolio deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized`: User not authenticated
- `404 Not Found`: Portfolio not found
- `500 Internal Server Error`: Server error

---

## Data Types

### Portfolio
```typescript
interface Portfolio {
  _id?: string
  userId: string
  profile: PortfolioProfile
  coreSkills: CoreSkill[]
  featuredProjects: FeaturedProject[]
  careerTimeline: CareerTimelineItem[]
  achievementBadges: AchievementBadge[]
  performanceMetrics: PerformanceMetric[]
  feedPosts: FeedPost[]
  uploadedFiles: UploadedFile[]
  suggestedSkills: string[]
  portfolioLayouts: PortfolioLayout[]
  createdAt?: Date
  updatedAt?: Date
}
```

See `/types/portfolio.ts` for complete type definitions.

---

## Usage Examples

### Using React Query Hooks

```typescript
import { usePortfolio, useMyPortfolio, useCreatePortfolio, useUpdatePortfolio } from '@/hooks/usePortfolio'

// Fetch any portfolio by ID (publicly accessible)
function ViewPortfolio({ portfolioId }: { portfolioId: string }) {
  const { data, isLoading, error } = usePortfolio(portfolioId)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>{data?.profile.name}</div>
}

// Fetch current user's own portfolio
function MyPortfolioPage() {
  const { data, isLoading, error } = useMyPortfolio()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>My Portfolio: {data?.profile.name}</div>
}

// Create portfolio
function CreatePortfolio() {
  const createMutation = useCreatePortfolio()

  const handleCreate = () => {
    createMutation.mutate({
      profile: { /* ... */ },
      coreSkills: [],
      // ... other fields
    })
  }

  return <button onClick={handleCreate}>Create</button>
}

// Update portfolio
function UpdatePortfolio() {
  const updateMutation = useUpdatePortfolio()

  const handleUpdate = () => {
    updateMutation.mutate({
      profile: {
        bio: "Updated bio"
      }
    })
  }

  return <button onClick={handleUpdate}>Update</button>
}
```

### Using API Client Directly

```typescript
import apiClient from '@/lib/apiClient'

// Fetch portfolio by ID (public)
const response = await apiClient.get('/portfolio?portfolioId=abc123')

// Fetch current user's portfolio (authenticated)
const myPortfolio = await apiClient.get('/portfolio/me')

// Create portfolio
const newPortfolio = await apiClient.post('/portfolio', portfolioData)

// Update portfolio
const updated = await apiClient.put('/portfolio', { profile: { bio: 'New bio' } })

// Delete portfolio
await apiClient.delete('/portfolio')
```

---

## Sample Data

Use the `generateSamplePortfolio` utility to create sample data:

```typescript
import { generateSamplePortfolio } from '@/lib/samplePortfolioData'

const sampleData = generateSamplePortfolio('user_123', 'John Doe')
await apiClient.post('/portfolio', sampleData)
```

---

## Environment Variables

Ensure these are set:
- `MONGO_URI`: MongoDB connection string
- Clerk environment variables (see Clerk documentation)
