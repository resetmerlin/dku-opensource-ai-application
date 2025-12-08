import { TabsContent } from '@/components/ui/tabs'
import ProfileTab from './ProfileTab'
import GeneratorTab from './GeneratorTab'
import HighlightsTab from './HighlightsTab'
import FeedTab from './FeedTab'
import { usePortfolioContext } from '../../PortfolioContext'
import EmptyProfile from './ProfileTab/EmptyProfile'
import EmptyFeed from './FeedTab/EmptyFeed'
import EmptyGenerator from './GeneratorTab/EmptyGenerator'
import EmptyHighlights from './HighlightsTab/EmptyHighlights'

export default function Tabs() {
  const { showFirstOnboarding } = usePortfolioContext()

  return (
    <>
      <TabsContent value="profile">
        {showFirstOnboarding ? <EmptyProfile /> : <ProfileTab />}
      </TabsContent>

      <TabsContent value="generator">
        {showFirstOnboarding ? <EmptyGenerator /> : <GeneratorTab />}
      </TabsContent>

      <TabsContent value="highlights">
        {showFirstOnboarding ? <EmptyHighlights /> : <HighlightsTab />}
      </TabsContent>

      <TabsContent value="feed">{showFirstOnboarding ? <EmptyFeed /> : <FeedTab />}</TabsContent>
    </>
  )
}
