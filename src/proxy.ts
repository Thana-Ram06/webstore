import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/session'

const PROTECTED_ROUTES = ['/dashboard', '/submit']
const ADMIN_ROUTES = ['/admin']
const AUTH_ROUTES = ['/login', '/signup']
const SHORTHAND_REDIRECTS: Record<string, string> = {
  '/favorites': '/dashboard/favorites',
  '/settings': '/dashboard/settings',
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (SHORTHAND_REDIRECTS[pathname]) {
    return NextResponse.redirect(new URL(SHORTHAND_REDIRECTS[pathname], request.url))
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r))

  if (!isProtected && !isAdminRoute && !isAuthRoute) {
    return NextResponse.next()
  }

  const session = token ? await verifySessionToken(token) : null

  if ((isProtected || isAdminRoute) && !session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute && session?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
