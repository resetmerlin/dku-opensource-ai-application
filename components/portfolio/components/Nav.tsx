import { Button } from '@/components/ui/button'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const PortfolioNav = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white px-8 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded bg-slate-900" />
          <span className="text-lg font-medium text-slate-900">ProCraft</span>
        </div>
        <div className="hidden items-center space-x-8 md:flex">
          <a
            href="#"
            className="cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            Features
          </a>
          <a
            href="#"
            className="cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            Pricing
          </a>
          <a
            href="#"
            className="cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-900"
          >
            About
          </a>
        </div>
        <div className="flex items-center space-x-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="h-8 cursor-pointer whitespace-nowrap rounded-button border-slate-200 bg-white px-3 text-sm text-slate-600 hover:bg-slate-50"
              >
                Log In
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button className="h-8 cursor-pointer whitespace-nowrap rounded-button bg-slate-900 px-4 text-sm text-white hover:bg-slate-800">
                Sign Up
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default PortfolioNav
