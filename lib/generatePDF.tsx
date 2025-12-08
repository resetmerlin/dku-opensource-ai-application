'use client'

import { useMemo, useRef, useState } from 'react'
import type { Portfolio } from '@/types/portfolio'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { Spinner } from '@/components/ui/spinner'

type Props = {
  portfolio: Portfolio
  buttonClassName?: string
}

export function PortfolioPDFContent({ portfolio }: { portfolio: Portfolio }) {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-gray-900 p-12 font-sans ">
      {/* Header Section */}
      <div className="bg-gray-100 p-8 rounded-lg mb-6">
        <div className="flex flex-row gap-6 items-start">
          {/* Profile Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{portfolio.profile.name}</h1>

            {/* PURE HEX COLOR — NO lab(), NO color-mix */}
            <h2 className="text-xl font-semibold mb-4" style={{ color: '#3b82f6' }}>
              {portfolio.profile.title}
            </h2>

            <p className="text-gray-700 text-sm leading-relaxed">{portfolio.profile.bio}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row gap-6">
        {/* LEFT COLUMN */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#3b82f6' }}>
            CAREER TIMELINE
          </h3>

          {portfolio.careerTimeline.map((item, i) => (
            <div key={item.id || i} className="mb-6">
              <div className="flex flex-row justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.company}</p>
                </div>
                <p className="text-sm text-gray-500">{item.year}</p>
              </div>

              {item.description && (
                <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
              )}
            </div>
          ))}

          {/* Featured Projects */}
          {portfolio.featuredProjects?.length > 0 && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#3b82f6' }}>
                FEATURED PROJECTS
              </h3>

              {portfolio.featuredProjects.map((p, i) => (
                <div key={p.id || i} className="mb-6">
                  <p className="text-base font-bold text-gray-900 mb-2">{p.title}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{p.description}</p>

                  {p.technologies && p.technologies?.length > 0 && (
                    <div className="flex flex-row flex-wrap gap-2 mt-2">
                      {p.technologies.map((tech, t) => (
                        <span key={t} className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-64 bg-gray-100 p-6 rounded-lg">
          {/* Core Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">CORE SKILLS</h3>
            <div className="flex flex-col gap-2">
              {portfolio.coreSkills.map((s, i) => (
                <p key={i} className="text-sm text-gray-700">
                  • {typeof s === 'string' ? s : s.name}
                </p>
              ))}
            </div>
          </div>

          {/* Suggested Skills */}
          {portfolio.suggestedSkills?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">SUGGESTED SKILLS</h3>
              <div className="flex flex-row flex-wrap gap-2">
                {portfolio.suggestedSkills.map((skill, i) => (
                  <span key={i} className="text-xs bg-gray-200 px-3 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Statistics */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">STATISTICS</h3>
            <div className="text-sm text-gray-700">
              <div className="flex justify-between mb-2">
                <span>Years of Career:</span>
                <span className="font-semibold">{portfolio.profile.stats.yearsOfCareer || 0}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Projects:</span>
                <span className="font-semibold">{portfolio.profile.stats.projects || 0}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          {portfolio.achievementBadges?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">ACHIEVEMENTS</h3>
              <div className="flex flex-col gap-2">
                {portfolio.achievementBadges.map((b, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    🏆 {b.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 text-center p-4 border-t border-gray-300">
        <p className="text-gray-600 text-sm font-semibold">Generated by Portfolio AI</p>
      </footer>
    </div>
  )
}

/**
 * Export button + hidden PDF template.
 * Drop this where you previously called generatePortfolioPDF(portfolio).
 */
export function PortfolioPDFExportButton({ portfolio, buttonClassName }: Props) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/portfolioPdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `portfolio.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      // TODO: show toast
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-4">
      {/* Download Button */}
      <Button
        onClick={handleDownload}
        disabled={loading}
        className={
          buttonClassName ?? 'flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700'
        }
      >
        {loading ? <Spinner /> : <Download className="h-4 w-4" />}
        Download PDF
      </Button>
    </div>
  )
}
