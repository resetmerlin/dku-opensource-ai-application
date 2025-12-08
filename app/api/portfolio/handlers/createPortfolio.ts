import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { createSuccessResponse, handleError } from './utils'
import { savePortfolio } from '@/lib/db/fakePortfolioDB'
import OpenAI from 'openai'
import PDFParser from 'pdf2json'
import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export const runtime = 'nodejs'

const TEN_MEGA_BYTES_SIZE = 10 * 1024 * 1024

export async function createPortfolioHandler(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Unauthorized: user not signed in',
          data: null,
        },
        { status: 401 }
      )
    }
    const { users } = await clerkClient()

    const userName = await users.getUser(userId)

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: 'No file provided',
          data: null,
        },
        { status: 400 }
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        {
          success: false,
          message: 'Only PDF files are allowed',
          data: null,
        },
        { status: 400 }
      )
    }

    if (file.size > TEN_MEGA_BYTES_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'File is too large. Max size is 10MB.',
          data: null,
        },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const fileContent = await extractTextFromPdf(buffer)

    const preview = await generatePortfolio(fileContent, userName.fullName ?? '')

    // Map featuredExperience to featuredProjects format
    const featuredProjects =
      preview.featuredExperience?.map((exp: any) => ({
        id: exp.id,
        title: exp.title,
        description: exp.description,
        imageUrl: '',
        technologies: [],
        link: '',
        status: 'completed' as const,
      })) || []

    const portfolio = await savePortfolio(userId, {
      profile: {
        userId,
        name: userName.fullName ?? '',
        title: preview.profile?.title || 'Professional',
        bio: preview.profile?.bio || '',
        avatar: preview.profile?.avatar || '',
        stats: {
          yearsOfCareer: preview.profile?.stats?.yearsOfCareer || 0,
          projects: preview.profile?.stats?.projects || 0,
        },
      },
      coreSkills: preview.coreSkills || [],
      featuredProjects: featuredProjects,
      careerTimeline: preview.careerTimeline || [],
      achievementBadges: preview.achievementBadges || [],
      performanceMetrics: preview.performanceMetrics || [],
      feedPosts: preview.feedPosts || [],
      uploadedFiles: preview.uploadedFiles || [],
      suggestedSkills: preview.suggestedSkills || [],
      portfolioLayouts: preview.portfolioLayouts || [],
    } as any)

    return createSuccessResponse(
      {
        ...portfolio,
        _id: portfolio._id,
      },
      'Portfolio created successfully',
      201
    )
  } catch (error) {
    return handleError(error, 'creating portfolio')
  }
}

/**
 * Use pdf2json to extract raw text from the PDF.
 * This matches the pattern you pasted: write to /tmp, then parse.
 */
async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const fileName = uuidv4()
  const tmpDir = os.tmpdir()
  const tempFilePath = path.join(tmpDir, `${fileName}.pdf`)

  // write PDF to temp file
  await fs.writeFile(tempFilePath, buffer)

  const pdfParser = new (PDFParser as any)(null, 1)
  let parsedText = ''

  // wrap pdf2json event API into a Promise
  await new Promise<void>((resolve, reject) => {
    pdfParser.on('pdfParser_dataError', (errData: any) => {
      console.error('pdfParser_dataError', errData?.parserError || errData)
      reject(errData?.parserError || errData)
    })

    pdfParser.on('pdfParser_dataReady', () => {
      parsedText = (pdfParser as any).getRawTextContent() || ''
      resolve()
    })

    pdfParser.loadPDF(tempFilePath)
  })

  return parsedText.trim()
}

async function generatePortfolio(resumeText: string, userName: string) {
  const systemPrompt = `
You are an expert career-analysis assistant.
Your job is to extract and explain a person’s career, skills, experience, and professional identity using ONLY the information present in their resume.

Rules:
- Use only information explicitly found in the resume.
- Do NOT exaggerate, infer achievements, fabricate details, or assume missing context.
- Maintain a professional, concise, neutral, fact-based tone.
- If the resume lacks details, acknowledge gaps instead of inventing information.
- Summaries must be readable and reflect the person's actual experience level.

`

  const userPrompt = `
You are an assistant that analyzes resumes and produces a structured portfolio object in STRICT JSON.

Your ONLY valid output format is the exact JSON structure shown below.

Here is the resume text:

{{${resumeText}}}

And this is my name:

{{${userName}}}

Extract ONLY factual information from this resume and return JSON ONLY — no markdown, no code fences, no explanations.

You must fill the following JSON structure:

{
  \"profile\": {
    \"title\": \"string\",
    \"bio\": \"string\",
    \"avatar\": \"\",
    \"stats\": {
      \"yearsOfCareer\": number,
      \"projects\": number
    }
  },
  \"coreSkills\": [\"string\"],
  \"featuredExperience\": [
    {
      \"id\": \"string\",
      \"title\": \"string\",
      \"description\": \"string\",
      \"impact\": \"string\"
    }
  ],
  \"careerTimeline\": [
    {
      \"id\": \"string\",
      \"year\": \"string\",
      \"title\": \"string\",
      \"company\": \"string\"
    }
  ],
  \"achievementBadges\": [],
  \"performanceMetrics\": [],
  \"feedPosts\": [],
  \"suggestedSkills\": [\"string\"]
}

### Extraction Guidelines (STRICT)

1. **Career Overview → bio**  
   - Provide a 2–3 sentence summary rewritten for clarity.  
   - Must be strictly based on resume facts.  
   - Absolutely no embellishment, assumptions, or invented achievements.

2. **Key Responsibilities**  
   - Only include responsibilities explicitly stated in the resume.

3. **Skills Identified → coreSkills**  
   - Extract only skills supported by the resume.  
   - Provide 4–8 items.  
   - No invented or assumed skills.

4. **Suggested Skills**  
   - Provide 4–8 realistic related skills.  
   - Must remain grounded in resume content.

5. **Featured Experience → featuredExperience**  
   - Each item describes:  
     - What the candidate actually did (description).  
     - What impact it had (ONLY if the resume explicitly states it).  
   - If impact is not described, set:  
     - \"impact\": \"Not specified in resume\"  
   - Each item must include:  
     - \"id\": unique value (e.g., \"feat-1\")  
     - \"title\": short label  
     - \"description\": factual contribution  
     - \"impact\": factual business outcome or the fallback above

6. **Career Timeline → careerTimeline**  
   - Reverse chronological order (most recent first).  
   - Each entry must include:  
     - \"id\": unique ID (e.g., \"career-1\")  
     - \"year\": start year OR \"unknown\"  
     - \"title\": job title  
     - \"company\": company name  
   - Only include roles explicitly mentioned.

7. **Missing Info**  
   - Never guess missing metrics or dates.  
   - Use defaults (e.g., \"unknown\") where required.

### Field Rules

- \"title\": Extract from resume or use \"Professional\" if not present.  
- \"bio\": Required 2–3 factual sentences.  
- \"yearsOfCareer\":  
  - Estimate strictly from resume dates.  
  - If no dates are present, return 0.  
- \"projects\": Count explicit projects; otherwise 0.  
- All fields must exist, even if empty arrays.  
- NEVER return null, undefined, or omit keys.  
- Output MUST be valid JSON only — no extra text, comments, or markdown.

`

  const completion = await openai.chat.completions.create({
    model: 'chatgpt-4o-latest',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  })

  const raw = completion.choices?.[0]?.message?.content ?? ''

  const parsed = JSON.parse(raw)

  return parsed
}
