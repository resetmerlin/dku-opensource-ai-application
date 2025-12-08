'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Check, Eye, FileText, Image as ImageIcon, Loader2, X } from 'lucide-react'
import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'

const GeneratorTab = () => {
  const { displayUploadedFiles, displaySuggestedSkills, displayPortfolioLayouts } =
    usePortfolioContext()

  const [showGenerationModal, setShowGenerationModal] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generationStage, setGenerationStage] = useState('')
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)
  const timeoutsRef = useRef<number[]>([])

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id))
    timeoutsRef.current = []
  }

  const handleGeneratePortfolio = () => {
    clearTimers()
    setShowGenerationModal(true)
    setIsGenerating(true)
    setGenerationComplete(false)
    setGenerationProgress(0)
    setGenerationStage('')

    const stages = [
      { stage: 'Analyzing uploaded files...', duration: 2000 },
      { stage: 'Extracting key information...', duration: 3000 },
      { stage: 'Generating professional summary...', duration: 2500 },
      { stage: 'Creating portfolio layout...', duration: 3500 },
      { stage: 'Optimizing content structure...', duration: 2000 },
      { stage: 'Finalizing your portfolio...', duration: 1500 },
    ]

    let currentStage = 0
    const totalDuration = stages.reduce((sum, stage) => sum + stage.duration, 0)
    let elapsedTime = 0

    const processStage = () => {
      if (currentStage < stages.length) {
        setGenerationStage(stages[currentStage].stage)
        setEstimatedTime(Math.ceil((totalDuration - elapsedTime) / 1000))
        const stageProgress = Math.round((elapsedTime / totalDuration) * 100)
        setGenerationProgress(Math.min(stageProgress, 95))

        const timer = window.setTimeout(() => {
          elapsedTime += stages[currentStage].duration
          currentStage += 1
          processStage()
        }, stages[currentStage].duration)

        timeoutsRef.current.push(timer)
      } else {
        setGenerationProgress(100)
        setGenerationStage('Portfolio generation complete!')
        setIsGenerating(false)
        setGenerationComplete(true)
        setEstimatedTime(0)
      }
    }

    processStage()
  }

  const handleCloseModal = () => {
    clearTimers()
    setShowGenerationModal(false)
    setIsGenerating(false)
    setEstimatedTime(0)
  }

  useEffect(() => {
    return () => clearTimers()
  }, [])

  return (
    <>
      <div className="relative space-y-6">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          <svg className="absolute left-1/3 top-10 h-40 w-40" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="aiGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1E293B" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <circle cx="25" cy="25" r="2" fill="#3B82F6" fillOpacity="0.15" />
            <circle cx="45" cy="35" r="1.5" fill="#3B82F6" fillOpacity="0.12" />
            <circle cx="65" cy="20" r="2" fill="#3B82F6" fillOpacity="0.15" />
            <circle cx="75" cy="50" r="1" fill="#3B82F6" fillOpacity="0.1" />
            <circle cx="55" cy="65" r="1.5" fill="#3B82F6" fillOpacity="0.12" />
            <line x1="25" y1="25" x2="45" y2="35" stroke="url(#aiGradient1)" strokeWidth="0.5" />
            <line x1="45" y1="35" x2="65" y2="20" stroke="url(#aiGradient1)" strokeWidth="0.5" />
            <line x1="65" y1="20" x2="75" y2="50" stroke="url(#aiGradient1)" strokeWidth="0.5" />
            <line x1="75" y1="50" x2="55" y2="65" stroke="url(#aiGradient1)" strokeWidth="0.5" />
            <line
              x1="25"
              y1="25"
              x2="55"
              y2="65"
              stroke="url(#aiGradient1)"
              strokeWidth="0.3"
              strokeDasharray="2,2"
            />
          </svg>
          <svg className="absolute bottom-20 right-1/4 h-32 w-32" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="aiGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <polygon
              points="30,30 50,20 70,35 65,55 45,50 35,40"
              fill="none"
              stroke="url(#aiGradient2)"
              strokeWidth="0.5"
            />
            <circle cx="30" cy="30" r="1" fill="#0F172A" fillOpacity="0.08" />
            <circle cx="50" cy="20" r="1" fill="#0F172A" fillOpacity="0.08" />
            <circle cx="70" cy="35" r="1" fill="#0F172A" fillOpacity="0.08" />
            <circle cx="65" cy="55" r="1" fill="#0F172A" fillOpacity="0.08" />
          </svg>
        </div>

        <div className="relative z-10 grid min-h-96 grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="relative lg:col-span-2">
            <div className="mb-8 flex items-center space-x-2">
              <h2 className="text-lg font-medium text-slate-900">Upload Your Content</h2>
              <div className="h-2 w-2 rotate-45 rounded-sm bg-blue-500/30" />
              <div className="h-1 w-1 animate-pulse rounded-full bg-slate-300/50" />
            </div>
            <Card className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/80 p-8 backdrop-blur-sm transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30">
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-blue-50/20 via-transparent to-slate-50/10" />
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
                  <span className="relative z-10">Choose Files</span>
                </Button>
              </div>
            </Card>

            <div className="mt-8 space-y-4">
              <h4 className="font-medium text-slate-900">Uploaded Files</h4>
              {displayUploadedFiles.map((file) => (
                <div
                  key={file}
                  className="flex items-center justify-between rounded border border-gray-200 bg-white p-4 transition-colors hover:border-gray-300"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-slate-900">{file}</span>
                  </div>
                  <Progress value={100} className="w-16" />
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-3">
            <div className="mb-8 flex items-center space-x-3">
              <h2 className="text-lg font-medium text-slate-900">AI-Generated Preview</h2>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500/40" />
                <div className="h-1 w-1 rounded-full bg-slate-300/60" />
                <div
                  className="h-0.5 w-0.5 animate-pulse rounded-full bg-blue-400/30"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
            </div>

            <div className="absolute left-4 top-16 h-20 w-px bg-gradient-to-b from-blue-200/40 to-transparent opacity-60" />
            <div className="space-y-6">
              <Card className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white/95 p-6 backdrop-blur-sm transition-all duration-300 hover:border-blue-100 hover:shadow-sm">
                <div className="absolute right-0 top-0 h-12 w-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-bl from-blue-50/30 to-transparent" />
                <div className="absolute right-3 top-3 h-1 w-1 rounded-full bg-blue-400/50" />
                <div className="relative mb-4 flex items-center justify-between">
                  <h3 className="font-medium text-slate-900">Professional Summary</h3>
                  <Badge className="rounded border-blue-100/50 bg-blue-50/80 px-2 py-1 text-xs text-blue-600 backdrop-blur-sm">
                    <div className="flex items-center space-x-1">
                      <div className="h-1 w-1 animate-pulse rounded-full bg-blue-500" />
                      <span>AI Generated</span>
                    </div>
                  </Badge>
                </div>
                <p className="leading-relaxed text-slate-700">
                  Experienced product designer with expertise in AI integration and user-centered
                  design. Proven track record of leading successful design initiatives and driving
                  innovation.
                </p>
              </Card>

              <Card className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 font-medium text-slate-900">Suggested Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {displaySuggestedSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="cursor-pointer rounded border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="rounded-lg border border-gray-200 bg-white p-6">
                <h3 className="mb-4 font-medium text-slate-900">Portfolio Layout</h3>
                <div className="grid grid-cols-2 gap-4">
                  {displayPortfolioLayouts.map((item) => (
                    <div
                      key={item}
                      className="flex aspect-video cursor-pointer items-center justify-center rounded border border-gray-200 bg-gray-50 transition-colors hover:bg-gray-100"
                    >
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </Card>

              <div className="mt-6 flex space-x-3">
                <Button
                  onClick={handleGeneratePortfolio}
                  className="flex-1 cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800"
                >
                  Generate Portfolio
                </Button>
                <Button
                  className="cursor-pointer whitespace-nowrap rounded-button border-gray-200 bg-white text-slate-600 hover:bg-gray-50"
                  variant="outline"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showGenerationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <Card className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
              <svg className="absolute right-8 top-4 h-32 w-32" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="modalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1E293B" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="2" fill="url(#modalGradient)" />
                <circle cx="50" cy="30" r="1.5" fill="url(#modalGradient)" />
                <circle cx="70" cy="15" r="2" fill="url(#modalGradient)" />
                <circle cx="80" cy="45" r="1" fill="url(#modalGradient)" />
                <circle cx="60" cy="60" r="1.5" fill="url(#modalGradient)" />
                <line
                  x1="20"
                  y1="20"
                  x2="50"
                  y2="30"
                  stroke="url(#modalGradient)"
                  strokeWidth="0.5"
                />
                <line
                  x1="50"
                  y1="30"
                  x2="70"
                  y2="15"
                  stroke="url(#modalGradient)"
                  strokeWidth="0.5"
                />
                <line
                  x1="70"
                  y1="15"
                  x2="80"
                  y2="45"
                  stroke="url(#modalGradient)"
                  strokeWidth="0.5"
                />
                <line
                  x1="80"
                  y1="45"
                  x2="60"
                  y2="60"
                  stroke="url(#modalGradient)"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            <div className="relative z-10 p-8">
              <div className="mb-8 text-center">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-50 to-blue-100">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                      <div className="absolute right-1 top-1 h-2 w-2 animate-ping rounded-full bg-blue-400" />
                    </>
                  ) : (
                    <Check className="h-8 w-8 text-green-500" />
                  )}
                </div>
                <h2 className="mb-2 text-xl font-semibold text-slate-900">
                  {isGenerating ? 'AI Portfolio Generator' : 'Portfolio Generated!'}
                </h2>
                <p className="text-sm text-slate-500">
                  {isGenerating
                    ? 'Our AI is creating your professional portfolio...'
                    : 'Your AI-powered portfolio is ready to view and customize.'}
                </p>
              </div>

              <div className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900">Progress</span>
                  <span className="text-sm text-slate-500">{generationProgress}%</span>
                </div>
                <Progress value={generationProgress} className="mb-4 h-2" />

                <div className="flex items-center space-x-3 rounded-lg border border-blue-100/50 bg-blue-50/50 p-4">
                  <div className="flex items-center space-x-2">
                    {isGenerating ? (
                      <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500" />
                    ) : (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">
                      {generationStage || 'Preparing...'}
                    </p>
                    {isGenerating && estimatedTime > 0 && (
                      <p className="mt-1 text-xs text-slate-500">
                        Estimated time remaining: {estimatedTime} seconds
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8 space-y-3">
                <h4 className="text-sm font-medium text-slate-900">AI Processing Steps:</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'File Analysis', threshold: 15 },
                    { label: 'Content Extraction', threshold: 35 },
                    { label: 'Summary Generation', threshold: 55 },
                    { label: 'Layout Creation', threshold: 75 },
                    { label: 'Optimization', threshold: 90 },
                    { label: 'Finalization', threshold: 100 },
                  ].map((step) => {
                    const completed = generationProgress >= step.threshold
                    return (
                      <div key={step.label} className="flex items-center space-x-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            completed ? 'bg-green-500' : 'bg-gray-200'
                          } ${!completed && isGenerating ? 'animate-pulse' : ''}`}
                        />
                        <span className={completed ? 'text-green-600' : 'text-slate-400'}>
                          {step.label}
                        </span>
                        {completed && <Check className="h-3 w-3 text-green-500" />}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex space-x-3">
                {generationComplete ? (
                  <>
                    <Button
                      onClick={handleCloseModal}
                      className="flex-1 cursor-pointer whitespace-nowrap rounded-button bg-slate-900 text-white hover:bg-slate-800"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Portfolio
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCloseModal}
                      className="cursor-pointer whitespace-nowrap rounded-button border-gray-200 bg-white text-slate-600 hover:bg-gray-50"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Close
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    onClick={handleCloseModal}
                    disabled={isGenerating && generationProgress < 100}
                    className="w-full cursor-pointer whitespace-nowrap rounded-button border-gray-200 bg-white text-slate-600 hover:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <X className="mr-2 h-4 w-4" />
                        Close
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default GeneratorTab
