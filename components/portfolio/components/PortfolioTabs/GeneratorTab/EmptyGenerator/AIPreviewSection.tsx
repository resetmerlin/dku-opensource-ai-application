import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { FileText, Wand2 } from 'lucide-react'

function AIPreviewSection() {
  return (
    <div>
      <h3 className="mb-4 flex items-center space-x-2 text-sm font-medium text-slate-900">
        <span>AI Preview</span>
        <div className="flex items-center space-x-1">
          <div className="h-1 w-1 animate-pulse rounded-full bg-blue-400/40" />
          <div className="h-0.5 w-0.5 rounded-full bg-slate-300/60" />
        </div>
      </h3>

      <div className="space-y-4">
        <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/20">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-medium text-slate-900">Professional Summary</h4>
            <Badge className="rounded border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-gray-500 transition-colors group-hover:border-blue-100 group-hover:bg-blue-50 group-hover:text-blue-600">
              <Wand2 className="mr-1 inline-block h-3 w-3" />
              AI Ready
            </Badge>
          </div>
          <div className="py-6 text-center">
            <FileText className="mb-2 inline-block h-6 w-6 text-gray-300 transition-colors group-hover:text-blue-400" />
            <p className="text-xs text-slate-500">Upload files to generate summary</p>
          </div>
        </Card>

        <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/20">
          <h4 className="mb-4 text-sm font-medium text-slate-900">Suggested Skills</h4>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex h-8 items-center justify-center rounded border border-gray-200 bg-gray-100 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50"
              >
                <div className="h-2 w-16 rounded bg-gray-200 transition-colors group-hover:bg-blue-200" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="group cursor-pointer rounded-lg border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/20">
          <h4 className="mb-4 text-sm font-medium text-slate-900">Portfolio Layout</h4>
        </Card>

        <div className="flex space-x-3 pt-2">
          <Button
            disabled
            className="flex-1 cursor-not-allowed whitespace-nowrap rounded-button bg-gray-200 text-gray-500"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Generate Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AIPreviewSection
