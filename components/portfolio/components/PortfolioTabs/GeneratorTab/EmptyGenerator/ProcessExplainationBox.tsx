import { Upload, Settings2, Rocket } from 'lucide-react'

const PROCESS_EXPLAINED_LIST = [
  {
    step: '1',
    icon: Upload,
    title: 'Upload Content',
    desc: 'Add your resume, projects, and certificates',
  },
  {
    step: '2',
    icon: Settings2,
    title: 'AI Processing',
    desc: 'Our AI analyzes and optimizes your content',
  },
  {
    step: '3',
    icon: Rocket,
    title: 'Get Portfolio',
    desc: 'Receive your professional portfolio instantly',
  },
] as const

function ProcessExplainationBox() {
  return (
    <div className="mt-12 rounded-lg border border-gray-100 bg-gray-50 p-8">
      <h3 className="mb-6 text-center text-lg font-medium text-slate-900">How It Works</h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {PROCESS_EXPLAINED_LIST.map((item, index) => {
          const Icon = item.icon
          return (
            <div key={item.step} className="relative text-center">
              <div className="relative mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-100 bg-white">
                <Icon className="h-5 w-5 text-slate-600" />
                <div className="absolute -right-1 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-600 text-xs font-medium text-white">
                  {item.step}
                </div>
              </div>
              <h4 className="mb-2 font-medium text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
              {index < 2 && (
                <div className="absolute right-[-16px] top-6 hidden h-0.5 w-8 bg-slate-200 md:block" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProcessExplainationBox
