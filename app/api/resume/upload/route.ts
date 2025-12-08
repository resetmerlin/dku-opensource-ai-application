import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
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

// size limit (e.g., 10MB)
const TEN_MEGA_BYTES_SIZE = 10 * 1024 * 1024

export async function POST(req: NextRequest) {
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

    const formData = await req.formData()
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

    // 🔍 extract text from PDF using pdf2json
    const fileContent = await extractTextFromPdf(buffer)

    // 🤖 send to OpenAI for preview
    const output = await generateResumePreview(fileContent)

    return NextResponse.json(
      {
        ...output,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resume upload error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to upload resume',
        data: null,
      },
      { status: 500 }
    )
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

async function generateResumePreview(resumeText: string) {
  const systemPrompt = `
You are an assistant that analyzes resumes and returns a concise profile preview in **strict JSON**.
Your ONLY valid output format is JSON with this exact shape:


IMPORTANT: Return your answer as strict JSON with this shape:
{
  "professionalSummary": string,
  "suggestedSkills": string[]
}

Rules:
- Respond with **JSON only**. No backticks, no markdown, no extra text.
- Do NOT include comments or trailing commas.
- "professionalSummary":
  - 2–3 sentences.
  - Written in **third person** (e.g., "She", "He", "They").
  - Polished, concise, and suitable for a professional profile preview.
- "suggestedSkills":
  - 4–8 items.
  - Each item is a short skill phrase (e.g., "Product Design", "AI/ML", "User Research").
  - Focus on skills clearly supported by the resume text.
- If information is missing or unclear, make a **reasonable, conservative guess** or omit the skill rather than hallucinating niche expertise.
`

  const userPrompt = `
Here is the resume text:

"""
${resumeText}
"""

Using ONLY this resume text, generate the JSON object described above.

Remember:
- Output must be valid, parseable JSON.
- Do NOT wrap the JSON in any explanation or markdown.
`

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_completion_tokens: 3000,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    response_format: { type: 'json_object' },
  })

  const raw = completion.choices?.[0]?.message?.content ?? ''

  const parsed = JSON.parse(raw) as {
    professionalSummary: string
    suggestedSkills: string[]
  }

  return parsed
}
