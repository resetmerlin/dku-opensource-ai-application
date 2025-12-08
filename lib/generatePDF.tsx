import { Document, Page, Text, View, pdf } from '@react-pdf/renderer'
import { createTw } from 'react-pdf-tailwind'
import { Portfolio } from '@/types/portfolio'

// Create Tailwind instance with custom config
const tw = createTw(
  {
    fontFamily: {
      sans: ['Helvetica', 'Arial'],
    },
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
    },
  },
  {
    ptPerRem: 12,
  }
)

// Portfolio PDF Document Component
const PortfolioPDF = ({ portfolio }: { portfolio: Portfolio }) => (
  <Document>
    <Page size="A4" style={tw('p-12 font-sans')}>
      {/* Header Section */}
      <View style={tw('bg-slate-50 p-8 rounded-lg mb-6')}>
        <View style={tw('flex-row gap-6 items-start')}>
          {/* Profile Info */}
          <View style={tw('flex-1')}>
            <Text style={tw('text-4xl font-bold text-slate-900 mb-2')}>
              {portfolio.profile.name}
            </Text>
            <Text style={tw('text-xl text-primary font-semibold mb-4')}>
              {portfolio.profile.title}
            </Text>
            <Text style={tw('text-gray-700 text-sm leading-relaxed')}>
              {portfolio.profile.bio}
            </Text>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={tw('flex-row gap-6')}>
        {/* Left Column - Career Timeline */}
        <View style={tw('flex-1')}>
          <Text style={tw('text-2xl font-bold text-primary mb-4')}>
            CAREER TIMELINE
          </Text>

          {portfolio.careerTimeline.map((item, index) => (
            <View key={item.id || index} style={tw('mb-6')}>
              <View style={tw('flex-row justify-between items-start mb-2')}>
                <View style={tw('flex-1')}>
                  <Text style={tw('text-base font-bold text-slate-900')}>
                    {item.title}
                  </Text>
                  <Text style={tw('text-sm text-gray-600')}>{item.company}</Text>
                </View>
                <Text style={tw('text-sm text-gray-500')}>{item.year}</Text>
              </View>
              {item.description && (
                <Text style={tw('text-sm text-gray-700 leading-relaxed')}>
                  {item.description}
                </Text>
              )}
            </View>
          ))}

          {/* Featured Projects */}
          {portfolio.featuredProjects && portfolio.featuredProjects.length > 0 && (
            <View style={tw('mt-8')}>
              <Text style={tw('text-2xl font-bold text-primary mb-4')}>
                FEATURED PROJECTS
              </Text>
              {portfolio.featuredProjects.map((project, index) => (
                <View key={project.id || index} style={tw('mb-6')}>
                  <Text style={tw('text-base font-bold text-slate-900 mb-2')}>
                    {project.title}
                  </Text>
                  <Text style={tw('text-sm text-gray-700 leading-relaxed')}>
                    {project.description}
                  </Text>
                  {project.technologies && project.technologies.length > 0 && (
                    <View style={tw('flex-row flex-wrap gap-2 mt-2')}>
                      {project.technologies.map((tech, techIndex) => (
                        <Text
                          key={techIndex}
                          style={tw('text-xs bg-slate-200 px-2 py-1 rounded')}
                        >
                          {tech}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Sidebar */}
        <View style={tw('w-64 bg-slate-50 p-6 rounded-lg')}>
          {/* Core Skills */}
          <View style={tw('mb-6')}>
            <Text style={tw('text-lg font-bold text-slate-900 mb-3')}>
              CORE SKILLS
            </Text>
            <View style={tw('flex flex-col gap-2')}>
              {portfolio.coreSkills.map((skill, index) => (
                <Text key={index} style={tw('text-sm text-slate-700')}>
                  • {typeof skill === 'string' ? skill : skill.name}
                </Text>
              ))}
            </View>
          </View>

          {/* Suggested Skills */}
          {portfolio.suggestedSkills && portfolio.suggestedSkills.length > 0 && (
            <View style={tw('mb-6')}>
              <Text style={tw('text-lg font-bold text-slate-900 mb-3')}>
                SUGGESTED SKILLS
              </Text>
              <View style={tw('flex-row flex-wrap gap-2')}>
                {portfolio.suggestedSkills.map((skill, index) => (
                  <Text
                    key={index}
                    style={tw('text-xs bg-slate-200 px-3 py-1 rounded')}
                  >
                    {skill}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Statistics */}
          <View style={tw('mb-6')}>
            <Text style={tw('text-lg font-bold text-slate-900 mb-3')}>
              STATISTICS
            </Text>
            <View style={tw('text-sm text-slate-700')}>
              <View style={tw('flex-row justify-between mb-2')}>
                <Text>Years of Career:</Text>
                <Text style={tw('font-semibold')}>
                  {portfolio.profile.stats.yearsOfCareer || 0}
                </Text>
              </View>
              <View style={tw('flex-row justify-between mb-2')}>
                <Text>Projects:</Text>
                <Text style={tw('font-semibold')}>
                  {portfolio.profile.stats.projects || 0}
                </Text>
              </View>
            </View>
          </View>

          {/* Achievement Badges */}
          {portfolio.achievementBadges && portfolio.achievementBadges.length > 0 && (
            <View style={tw('mb-6')}>
              <Text style={tw('text-lg font-bold text-slate-900 mb-3')}>
                ACHIEVEMENTS
              </Text>
              <View style={tw('flex flex-col gap-2')}>
                {portfolio.achievementBadges.map((badge, index) => (
                  <Text key={index} style={tw('text-sm text-slate-700')}>
                    🏆 {badge.title}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View
        style={tw('absolute bottom-0 left-0 right-0 text-center p-4 border-t border-slate-200')}
      >
        <Text style={tw('text-secondary text-sm font-semibold')}>
          Generated by Portfolio AI
        </Text>
      </View>
    </Page>
  </Document>
)

export async function generatePortfolioPDF(portfolio: Portfolio) {
  try {
    // Generate the PDF blob
    const blob = await pdf(<PortfolioPDF portfolio={portfolio} />).toBlob()

    // Create a download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${portfolio.profile.name.replace(/\s+/g, '_')}_Portfolio.pdf`

    // Trigger download
    document.body.appendChild(link)
    link.click()

    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
