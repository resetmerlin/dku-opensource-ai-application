import WelcomeBox from './WelcomeBox'
import MainContent from './MainContent'
import ProcessExplainationBox from './ProcessExplainationBox'

const EmptyGenerator = () => {
  return (
    <div className="space-y-12">
      <WelcomeBox />
      <MainContent />
      <ProcessExplainationBox />
    </div>
  )
}

export default EmptyGenerator
