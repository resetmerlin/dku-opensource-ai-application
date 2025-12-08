'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Loader from './components/Loader'
import { PortfolioProvider, usePortfolioContext } from './PortfolioContext'
import PortfolioTabs from './components/PortfolioTabs'
import { Header } from '../hub/Header'
import Footer from '../ui/Footer'
import { RoleProvider } from '@/components/providers/RoleProvider'

type TProps = {
  portfolioId?: string
}

const PortfolioPageComp = () => {
  const { isLoading, activeTab, setActiveTab } = usePortfolioContext()

  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        <Header />

        {isLoading ? (
          <Loader />
        ) : (
          <div className="mx-auto max-w-5xl px-8 py-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-12 grid w-full grid-cols-3 rounded border border-gray-100 bg-white p-0.5">
                <TabsTrigger
                  value="profile"
                  className="cursor-pointer rounded text-sm text-slate-500 transition-colors hover:text-slate-700 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="generator"
                  className="cursor-pointer rounded text-sm text-slate-500 transition-colors hover:text-slate-700 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                >
                  AI Generator
                </TabsTrigger>
                <TabsTrigger
                  value="highlights"
                  className="cursor-pointer rounded text-sm text-slate-500 transition-colors hover:text-slate-700 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                >
                  Highlights
                </TabsTrigger>
              </TabsList>
              <PortfolioTabs />
            </Tabs>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}

const PortfolioPage = ({ portfolioId }: TProps) => {
  return (
    <RoleProvider>
      <PortfolioProvider portfolioId={portfolioId}>
        <PortfolioPageComp />
      </PortfolioProvider>
    </RoleProvider>
  )
}

export default PortfolioPage
