'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FileText, Image as ImageIcon, X } from 'lucide-react'
import { useMutateResumeUpload } from '@/components/portfolio/remote'
import { UseMutateFunction } from '@tanstack/react-query'
import { ApiResponse } from '@/lib/apiClient'

const formatFileSize = (bytes: number) => {
  const units = ['B', 'KB', 'MB', 'GB']
  let i = 0
  let value = bytes

  while (value >= 1024 && i < units.length - 1) {
    value /= 1024
    i++
  }

  return `${value.toFixed(1)} ${units[i]}`
}

export function UploadContent(uploadlogic: {
  resumePreview: {
    professionalSummary: string
    suggestedSkills: string[]
  } | null
  uploadResume: UseMutateFunction<
    ApiResponse<{
      professionalSummary: string
      suggestedSkills: string[]
    }>,
    Error,
    File,
    unknown
  >
  isUploading: boolean
  isSuccess: boolean
  onFileChange?: (file: File | null) => void
}) {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed.')
      return
    }

    setPdfFile(file)
    uploadlogic.onFileChange?.(file)
    resetInput()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleFile(file)
  }

  return (
    <div className="relative lg:col-span-2">
      <div className="mb-8 flex items-center space-x-2">
        <h2 className="text-lg font-medium text-slate-900">Upload Your Content</h2>
        <div className="h-2 w-2 rotate-45 rounded-sm bg-blue-500/30" />
        <div className="h-1 w-1 animate-pulse rounded-full bg-slate-300/50" />
      </div>

      <Card
        className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-blue-50/20 via-transparent to-slate-50/10" />

        <label htmlFor="upload-profile" className="absolute opacity-0 w-full h-full z-40" />

        <div className="relative z-10 text-center">
          <div className="relative mb-4 inline-block">
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <div className="absolute -top-1 -right-1 h-2 w-2 animate-pulse rounded-full bg-blue-400/60" />
          </div>

          <h3 className="mb-2 text-base font-medium text-slate-900">Drag &amp; Drop Files</h3>
          <p className="mb-6 text-sm text-gray-500">
            Upload your resume, portfolio, or project files
          </p>

          <Button className="relative overflow-hidden rounded-button bg-slate-900 text-white hover:bg-slate-800">
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 to-transparent" />
            <span className="relative z-10">Choose File</span>
          </Button>
        </div>

        <input
          id="upload-profile"
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleChange}
          ref={fileInputRef}
        />
      </Card>

      {pdfFile ? (
        <div className="mt-8 space-y-4">
          <Button
            className="w-full relative rounded-button"
            variant={'outline'}
            disabled={uploadlogic.isUploading}
            onClick={() => uploadlogic.uploadResume(pdfFile)}
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 to-transparent" />
            <span className="relative z-10">Show Preview</span>
          </Button>
          <div className="flex items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300">
            <div className="flex items-center space-x-3">
              <FileText className="h-4 w-4 text-gray-400" />
              <div className="flex flex-col">
                <span className="text-sm text-slate-900 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                  {pdfFile.name}
                </span>
                <span className="text-xs text-gray-500 max-w-[200px] truncate whitespace-nowrap overflow-hidden">
                  {pdfFile.name.split('.').pop()?.toUpperCase()} • {formatFileSize(pdfFile.size)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Progress value={100} className="w-14" />
              <button
                onClick={() => {
                  setPdfFile(null)
                  uploadlogic.onFileChange?.(null)
                }}
                className="rounded p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
