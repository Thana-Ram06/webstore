'use client'

import { useRef, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { AppLogo } from '@/components/cards/subcomponents/AppLogo'
import { validateFile, uploadLogo } from '@/lib/firebase/storage'
import { compressLogo } from '@/lib/utils/image'
import { cn } from '@/lib/utils/cn'

interface LogoUploaderProps {
  logoUrl: string
  appName: string
  draftId: string
  onUpload: (url: string) => void
  onRemove: () => void
  required?: boolean
  error?: string
}

export function LogoUploader({
  logoUrl,
  appName,
  draftId,
  onUpload,
  onRemove,
  required,
  error,
}: LogoUploaderProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  async function handleFile(file: File) {
    const validation = validateFile(file, 'logo')
    if (!validation.valid) {
      setUploadError(validation.error ?? 'Invalid file')
      return
    }

    setUploadError(null)
    setUploading(true)
    setProgress(0)

    try {
      const compressed = await compressLogo(file)
      const url = await uploadLogo(draftId, compressed, (p) => setProgress(p.percent))
      onUpload(url)
    } catch {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) void handleFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) void handleFile(file)
  }

  const displayError = error ?? uploadError

  return (
    <div className="space-y-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml"
        hidden
        onChange={handleInputChange}
      />

      {logoUrl ? (
        /* Preview */
        <div className="flex items-center gap-4">
          <AppLogo src={logoUrl} name={appName || 'App'} size="xl" className="ring-1 ring-border rounded-2xl" />
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Logo uploaded</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-xs text-accent hover:underline"
              >
                Replace
              </button>
              <span className="text-muted-foreground/50">·</span>
              <button
                type="button"
                onClick={onRemove}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={cn(
            'flex h-36 w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            isDragging
              ? 'border-accent bg-accent-subtle'
              : displayError
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-muted/30 hover:bg-muted/60',
            uploading && 'pointer-events-none opacity-70',
          )}
        >
          {uploading ? (
            <div className="w-full max-w-[140px] space-y-2 text-center">
              <p className="text-xs text-muted-foreground">Uploading…</p>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">{Math.round(progress)}%</p>
            </div>
          ) : (
            <>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Upload className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {isDragging ? 'Drop to upload' : 'Upload logo'}
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, WebP, SVG · max 2MB</p>
              </div>
            </>
          )}
        </button>
      )}

      {displayError && (
        <p className="flex items-center gap-1.5 text-xs text-destructive" role="alert">
          <X className="h-3 w-3" aria-hidden />
          {displayError}
        </p>
      )}
      {required && !logoUrl && !displayError && (
        <p className="text-xs text-muted-foreground">A logo is required to submit your app.</p>
      )}
    </div>
  )
}
