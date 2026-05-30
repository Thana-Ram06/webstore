'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { GoogleSignInButton } from './GoogleSignInButton'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils/cn'

interface LoginFormProps {
  isSignUp?: boolean
}

const ERROR_MESSAGES: Record<string, string> = {
  'auth/popup-blocked': 'Pop-up was blocked. Please allow pop-ups for this site and try again.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Try again when you\'re ready.',
  'auth/cancelled-popup-request': 'Sign-in was cancelled.',
  'auth/account-exists-with-different-credential': 'An account with this email already exists. Try a different sign-in method.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/user-disabled': 'This account has been disabled. Contact support if you think this is a mistake.',
  default: 'Something went wrong. Please try again.',
}

function getErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code
    return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.default
  }
  return ERROR_MESSAGES.default
}

export function LoginForm({ isSignUp = false }: LoginFormProps) {
  const { user, loading, signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [signingIn, setSigningIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) {
      router.replace(callbackUrl)
    }
  }, [user, loading, router, callbackUrl])

  async function handleGoogleSignIn() {
    setError(null)
    setSigningIn(true)
    try {
      await signIn()
      router.replace(callbackUrl)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setSigningIn(false)
    }
  }

  const isLoading = loading || signingIn

  return (
    <div className="flex flex-col gap-4">
      {/* Error alert */}
      {error && (
        <div
          role="alert"
          className={cn(
            'flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-3.5 py-3',
            'text-sm text-destructive',
          )}
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{error}</span>
        </div>
      )}

      {/* Google sign-in */}
      <GoogleSignInButton onClick={handleGoogleSignIn} loading={isLoading} />

      {/* Divider */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        <span>or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Info text */}
      <p className="text-center text-xs text-muted-foreground">
        {isSignUp ? (
          <>
            By creating an account you agree to our{' '}
            <Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            .
          </>
        ) : (
          <>
            More sign-in options coming soon.{' '}
            <span className="block mt-0.5 text-muted-foreground/70">
              Your data is always secure.
            </span>
          </>
        )}
      </p>
    </div>
  )
}
