import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Award, CloudUpload, FileText, FolderClosed, Plus } from 'lucide-react'

const SUGGESTED_FILES = [
  { icon: FileText, name: 'Resume or CV', desc: 'Your work experience' },
  { icon: FolderClosed, name: 'Project Portfolio', desc: 'Your best work samples' },
  { icon: Award, name: 'Certificates', desc: 'Skills and achievements' },
] as const

function UploadContentSection() {
  return (
    <div>
      <h3 className="mb-4 flex items-center space-x-2 text-sm font-medium text-slate-900">
        <span>Upload Content</span>
        <div className="h-1 w-1 animate-pulse rounded-full bg-blue-400/50" />
      </h3>
      <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30">
        <div className="relative mb-4 inline-block">
          <CloudUpload className="h-8 w-8 text-gray-300 transition-colors group-hover:text-blue-400" />
          <div className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-blue-400/40 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <h4 className="mb-2 text-base font-medium text-slate-900">Drop files to get started</h4>
        <p className="mb-4 text-sm text-slate-500">
          Supports PDF, DOC, images, and project files
        </p>
        <Button
          variant="outline"
          className="cursor-pointer whitespace-nowrap rounded-button border-gray-200 bg-white text-sm text-slate-600 hover:bg-gray-50"
        >
          Browse Files
        </Button>
      </Card>

      <div className="mt-6 space-y-3">
        <h4 className="text-sm font-medium text-slate-900">Suggested Files</h4>
        {SUGGESTED_FILES.map((item) => {
          const Icon = item.icon
          return (
            <Card
              key={item.name}
              className="group cursor-pointer border-2 border-dashed border-gray-200 p-4 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/20"
            >
              <div className="flex items-center space-x-3">
                <Icon className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-900">{item.name}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
                <Plus
                  className="text-gray-300 transition-colors group-hover:text-blue-400"
                  size={14}
                />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default UploadContentSection
