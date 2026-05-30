import { SignJWT, jwtVerify, type JWTPayload } from 'jose'
import type { UserRole } from '@/types'

export const SESSION_COOKIE = '__webstorehq_session'
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7 // 7 days

export interface SessionPayload extends JWTPayload {
  uid: string
  email: string
  displayName: string
  photoURL?: string | null
  role: UserRole
}

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET environment variable is not set')
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(payload: Omit<SessionPayload, keyof JWTPayload>): Promise<string> {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as SessionPayload
  } catch {
    return null
  }
}
