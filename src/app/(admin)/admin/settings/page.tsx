'use client'

import { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { updateProfile } from '@/lib/actions/updateProfile'
import { profileUpdateSchema } from '@/lib/utils/validators'
import { useAuth } from '@/hooks/useAuth'
import { useUserProfile } from '@/hooks/useUserProfile'

type FieldErrors = Partial<Record<'displayName' | 'bio' | 'websiteUrl', string>>

export default function AdminSettingsPage() {
  const { user } = useAuth()
  const { profile, loading: profileLoading } = useUserProfile()

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [saving, setSaving] = useState(false)
  const [saveResult, setSaveResult] = useState<'success' | 'error' | null>(null)

  useEffect(() => {
    if (!profileLoading) {
      setDisplayName(profile?.displayName ?? user?.displayName ?? '')
      setBio(profile?.bio ?? '')
      setWebsiteUrl(profile?.websiteUrl ?? '')
    }
  }, [profileLoading, profile, user])

  function clearFieldError(field: keyof FieldErrors) {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSave() {
    if (!user || saving) return
    const result = profileUpdateSchema.safeParse({
      displayName,
      bio: bio || undefined,
      websiteUrl: websiteUrl || undefined,
    })
    if (!result.success) {
      const fieldErrors: FieldErrors = {}
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
      setErrors(fieldErrors)
      return
    }
    setErrors({})
    setSaving(true)
    setSaveResult(null)
    try {
      await updateProfile(user.uid, { displayName, bio: bio || undefined, websiteUrl: websiteUrl || undefined })
      setSaveResult('success')
    } catch {
      setSaveResult('error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground">Settings</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your admin account profile.
        </p>
      </div>

      {/* Admin badge */}
      <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-accent" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-accent">Administrator Account</p>
          <p className="text-xs text-muted-foreground">
            This account has full moderation and management access.
          </p>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5 rounded-xl border border-border bg-card p-5">
        <Avatar
          src={user?.photoURL}
          name={displayName || user?.email}
          size="xl"
          className="ring-2 ring-border"
        />
        <div>
          <p className="text-sm font-medium text-foreground">{displayName || 'Admin'}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{user?.email}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Avatar is managed by your Google account.
          </p>
        </div>
      </div>

      {/* Profile form */}
      <div className="space-y-5 rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold text-foreground">Profile</h3>

        <Input
          label="Display Name"
          value={displayName}
          onChange={(e) => { setDisplayName(e.target.value); clearFieldError('displayName') }}
          error={errors.displayName}
          placeholder="Your name"
          maxLength={50}
        />

        <Textarea
          label="Bio"
          value={bio}
          onChange={(e) => { setBio(e.target.value); clearFieldError('bio') }}
          error={errors.bio}
          placeholder="A short description"
          maxLength={300}
          showCount
          currentLength={bio.length}
          rows={3}
        />

        <Input
          label="Website"
          value={websiteUrl}
          onChange={(e) => { setWebsiteUrl(e.target.value); clearFieldError('websiteUrl') }}
          error={errors.websiteUrl}
          placeholder="https://yourwebsite.com"
          type="url"
        />
      </div>

      {saveResult === 'success' && (
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-300/30 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-700/20 dark:bg-emerald-900/10 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden />
          Profile updated.
        </div>
      )}
      {saveResult === 'error' && (
        <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          Failed to save. Please try again.
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg" loading={saving} disabled={saving}>
          Save Changes
        </Button>
      </div>
    </div>
  )
}
