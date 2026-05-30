import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth-cookies'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminMobileNav } from '@/components/admin/AdminMobileNav'
import { AdminHeader } from '@/components/admin/AdminHeader'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session) redirect('/login?from=/admin')
  if (session.role !== 'admin') redirect('/dashboard')

  return (
    <div className="flex h-dvh flex-col bg-background">
      <AdminHeader />
      <div className="flex min-h-0 flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-6 lg:pb-6">
          {children}
        </main>
      </div>
      <AdminMobileNav />
    </div>
  )
}
