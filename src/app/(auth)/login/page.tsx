import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthCard } from '@/components/auth/AuthCard'
import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your WebsTore account to discover and save your favourite web apps.',
}

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to WebsTore"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
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
