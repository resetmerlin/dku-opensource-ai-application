import { RoleProvider } from '@/components/providers/RoleProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>
}
