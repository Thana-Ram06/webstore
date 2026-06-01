import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free AppVault account to discover, save, and review the best web apps.',
}

export default function SignupPage() {
  return (
    <AuthCard
      title="Join AppVault"
      subtitle="The Home of Modern Web Apps"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm isSignUp />
      </Suspense>
    </AuthCard>
  )
}

function LoginFormSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-11 w-full animate-pulse rounded-xl bg-muted" />
      <div className="h-px w-full bg-border" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
    </div>
  )
}
