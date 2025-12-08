import UploadContentSection from './UploadContentSection'
import AIPreviewSection from './AIPreviewSection'

function MainContent() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <UploadContentSection />
      <AIPreviewSection />
    </div>
  )
}

export default MainContent
