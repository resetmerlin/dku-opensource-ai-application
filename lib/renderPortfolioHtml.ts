// lib/renderPortfolioHtml.ts
import type { PortfolioDocument } from '@/types/portfolio'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function renderPortfolioHtml(doc: PortfolioDocument): string {
  const { profile, coreSkills, featuredProjects, careerTimeline, suggestedSkills } = doc

  // Left column: REPRESENTATIVE WORKS -> featuredProjects
  const worksHtml = featuredProjects
    .map(
      (p) => `
      <div class="mb-8">
        <div class="flex gap-6">
          <div class="w-48 h-32 bg-gray-100 rounded overflow-hidden flex-shrink-0">
            ${
              p.imageUrl
                ? `<img src="${escapeHtml(
                    p.imageUrl
                  )}" alt="${escapeHtml(p.title)}" class="w-full h-full object-cover object-top">`
                : ''
            }
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-lg font-bold text-gray-900">${escapeHtml(p.title)}</h4>
              <span class="text-sm text-gray-500">${escapeHtml(p.status ?? '')}</span>
            </div>
            <p class="text-sm text-gray-700 leading-relaxed">
              ${escapeHtml(p.description)}
            </p>
          </div>
        </div>
      </div>
    `
    )
    .join('')

  // Skills (right sidebar)
  // We only have names, so we give them decreasing dummy percentages.
  // If you want real numbers, add a `level` field to your schema later.
  const allSkills = [...coreSkills] // you can also merge suggestedSkills if you want
  const basePercents = [95, 90, 85, 80, 78, 75, 72, 70]

  const skillsHtml = allSkills
    .map((name, idx) => {
      const percent = basePercents[idx] ?? 70
      return `
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span class="text-slate-700">${escapeHtml(name)}</span>
          <span class="text-slate-500">${percent}%</span>
        </div>
        <div class="w-full bg-slate-200 rounded-full h-2">
          <div class="bg-primary h-2 rounded-full" style="width: ${percent}%"></div>
        </div>
      </div>
    `
    })
    .join('')

  // Education block -> use careerTimeline (year/title/company)
  const educationHtml = careerTimeline
    .map(
      (c) => `
      <div>
        <h4 class="font-semibold text-slate-900 text-sm">${escapeHtml(c.title)}</h4>
        <p class="text-slate-600 text-sm">${escapeHtml(c.company)}</p>
        <p class="text-slate-500 text-xs">${escapeHtml(c.year)}</p>
      </div>
    `
    )
    .join('')

  // Languages – you don’t have explicit languages right now.
  // For now we’ll show suggestedSkills as “languages of work” style.
  const languagesHtml = suggestedSkills
    .map(
      (s) => `
      <div class="flex justify-between">
        <span class="text-slate-700">${escapeHtml(s)}</span>
        <span class="text-slate-500">Proficient</span>
      </div>
    `
    )
    .join('')

  // Achievements – list featured project titles as bullets for now
  const achievementsHtml = featuredProjects
    .map((p) => `<div>• ${escapeHtml(p.title)}</div>`)
    .join('')

  // Licenses / Works: use coreSkills/suggestedSkills as small badges
  const licensesHtml = coreSkills
    .slice(0, 3)
    .map(
      (skill, idx) => `
      <div class="w-8 h-6 bg-slate-${600 + (idx % 3) * 100} rounded-sm flex items-center justify-center">
        <span class="text-white text-[10px] font-bold truncate">${escapeHtml(skill)}</span>
      </div>
    `
    )
    .join('')

  const toolsHtml = suggestedSkills
    .slice(0, 8)
    .map(
      (tool) => `
      <div class="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
        <span class="text-white text-xs font-bold truncate">${escapeHtml(tool)}</span>
      </div>
    `
    )
    .join('')

  return `
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />

  <title>${escapeHtml(profile.name)} – Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- IMPORTANT:
       Tailwind utility classes used below require a built CSS file.
       For html-pdf/PhantomJS, prefer linking a precompiled CSS:
       <link rel="stylesheet" href="file:///path/to/compiled.css" /> -->
  <style>
    body {
      margin: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #e5e7eb;
    }
  </style>
</head>
<body>
<div class="max-w-5xl mx-auto bg-white shadow-lg">
  <!-- Header Section -->
  <div class="bg-gradient-to-r from-slate-50 to-white p-8 border-b">
    <div class="flex items-start gap-8">
      <!-- Profile Photo -->
      <div class="flex-shrink-0">
        <div class="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-lg">
          ${
            profile.avatar
              ? `<img src="${escapeHtml(
                  profile
                )}" alt="${escapeHtml(profile.name)}" class="w-full h-full object-cover object-top">`
              : ''
          }
        </div>
      </div>
      <!-- Personal Info -->
      <div class="flex-1">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">${escapeHtml(profile.name)}</h1>
        <h2 class="text-xl text-primary font-semibold mb-4">${escapeHtml(profile.title)}</h2>
        <p class="text-gray-700 text-sm leading-relaxed mb-6 max-w-3xl">
          ${escapeHtml(profile.bio)}
        </p>
        <!-- Contact Info -->
        <div class="flex flex-wrap gap-6 text-sm text-gray-600">
          ${
            profile.email
              ? `
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <i class="ri-mail-line text-primary"></i>
            </div>
            <span>${escapeHtml(profile.email)}</span>
          </div>`
              : ''
          }
          ${
            profile.phone
              ? `
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <i class="ri-phone-line text-primary"></i>
            </div>
            <span>${escapeHtml(profile.phone)}</span>
          </div>`
              : ''
          }
          ${
            profile.location
              ? `
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <i class="ri-map-pin-line text-primary"></i>
            </div>
            <span>${escapeHtml(profile.location)}</span>
          </div>`
              : ''
          }
          ${
            profile.github
              ? `
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <i class="ri-github-line text-primary"></i>
            </div>
            <span>${escapeHtml(profile.github)}</span>
          </div>`
              : ''
          }
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex">
    <!-- Left Column - Representative Works -->
    <div class="flex-1 p-8">
      <h3 class="text-2xl font-bold text-primary mb-6">REPRESENTATIVE WORKS</h3>
      ${worksHtml}
    </div>

    <!-- Right Sidebar -->
    <div class="w-80 bg-slate-50 p-8">
      <!-- Licenses -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">LICENSES</h3>
        <div class="flex gap-2">
          ${licensesHtml}
        </div>
      </div>

      <!-- Works/Tools -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">WORKS</h3>
        <div class="grid grid-cols-4 gap-2">
          ${toolsHtml}
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Skills</h3>
        <div class="space-y-3">
          ${skillsHtml}
        </div>
      </div>

      <!-- Education (using career timeline) -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Experience</h3>
        <div class="space-y-4">
          ${educationHtml}
        </div>
      </div>

      <!-- Languages (using suggestedSkills just as a visual section) -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Languages</h3>
        <div class="space-y-2 text-sm">
          ${languagesHtml}
        </div>
      </div>

      <!-- Achievements -->
      <div class="mb-8">
        <h3 class="text-lg font-bold text-slate-900 mb-4">Achievements</h3>
        <div class="space-y-3 text-sm text-slate-700">
          ${achievementsHtml}
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="text-center py-4 text-slate-500 text-sm border-t">
    <span class="font-bold">1</span>
  </div>
</div>
</body>
</html>
`
}
