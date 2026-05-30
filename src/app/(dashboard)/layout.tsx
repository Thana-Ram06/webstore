import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth-cookies'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardMobileNav } from '@/components/dashboard/DashboardMobileNav'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect('/login?from=/dashboard')

  return (
    <div className="flex h-dvh flex-col bg-background">
      <DashboardHeader />
      <div className="flex min-h-0 flex-1">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:pb-6">
          {children}
        </main>
      </div>
      <DashboardMobileNav />
    </div>
  )
}
