'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { validateFile, uploadScreenshot } from '@/lib/firebase/storage'
import { compressScreenshot } from '@/lib/utils/image'
import { APP_CONFIG } from '@/lib/constants/config'
import { cn } from '@/lib/utils/cn'

interface ScreenshotUploaderProps {
  screenshotUrls: string[]
  draftId: string
  onUpdate: (urls: string[]) => void
}

interface SlotState {
  uploading: boolean
  progress: number
  error: string | null
}

const MAX = APP_CONFIG.maxScreenshots

export function ScreenshotUploader({ screenshotUrls, draftId, onUpdate }: ScreenshotUploaderProps) {
  const [localUrls, setLocalUrls] = useState<string[]>(screenshotUrls)
  const [slotStates, setSlotStates] = useState<Record<number, SlotState>>({})
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})

  function getSlotState(index: number): SlotState {
    return slotStates[index] ?? { uploading: false, progress: 0, error: null }
  }

  function setSlotState(index: number, patch: Partial<SlotState>) {
    setSlotStates((prev) => ({
      ...prev,
      [index]: { ...getSlotState(index), ...patch },
    }))
  }

  async function handleFile(file: File, slotIndex: number) {
    const validation = validateFile(file, 'screenshot')
    if (!validation.valid) {
      setSlotState(slotIndex, { error: validation.error ?? 'Invalid file', uploading: false })
      return
    }

    setSlotState(slotIndex, { uploading: true, progress: 0, error: null })

    try {
      const compressed = await compressScreenshot(file)
      const url = await uploadScreenshot(draftId, slotIndex, compressed, (p) =>
        setSlotState(slotIndex, { progress: p.percent }),
      )

      setLocalUrls((prev) => {
        const next = [...prev]
        next[slotIndex] = url
        const filtered = next.filter(Boolean)
        onUpdate(filtered)
        return filtered
      })
    } catch {
      setSlotState(slotIndex, { error: 'Upload failed. Try again.', uploading: false })
    } finally {
      setSlotState(slotIndex, { uploading: false, progress: 0 })
    }
  }

  function removeSlot(index: number) {
    setLocalUrls((prev) => {
      const next = prev.filter((_, i) => i !== index)
      onUpdate(next)
      return next
    })
  }

  const emptySlotIndex = localUrls.length
  const showEmptySlot = emptySlotIndex < MAX

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {/* Filled slots */}
        {localUrls.map((url, i) => (
          <div key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
            <Image
              src={url}
              alt={`Screenshot ${i + 1}`}
              fill
              className="object-cover"
              sizes="200px"
            />
            <button
              type="button"
              onClick={() => removeSlot(i)}
              className={cn(
                'absolute right-1.5 top-1.5 rounded-full bg-background/80 p-1 backdrop-blur-sm',
                'text-foreground opacity-0 transition-opacity group-hover:opacity-100',
                'hover:bg-background focus-visible:opacity-100 focus-visible:outline-none',
              )}
              aria-label={`Remove screenshot ${i + 1}`}
            >
              <X className="h-3 w-3" aria-hidden />
            </button>
          </div>
        ))}

        {/* Empty upload slot */}
        {showEmptySlot && (
          <div className="aspect-video">
            <input
              ref={(el) => { fileRefs.current[emptySlotIndex] = el }}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleFile(file, emptySlotIndex)
                e.target.value = ''
              }}
            />
            <button
              type="button"
              onClick={() => fileRefs.current[emptySlotIndex]?.click()}
              disabled={getSlotState(emptySlotIndex).uploading}
              className={cn(
                'flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl',
                'border-2 border-dashed border-border bg-muted/30',
                'text-muted-foreground transition-colors hover:bg-muted/60',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                'disabled:pointer-events-none',
              )}
            >
              {getSlotState(emptySlotIndex).uploading ? (
                <div className="w-full px-4 space-y-1.5 text-center">
                  <Loader2 className="mx-auto h-4 w-4 animate-spin" aria-hidden />
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${getSlotState(emptySlotIndex).progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <ImagePlus className="h-5 w-5" aria-hidden />
                  <span className="text-[11px] font-medium">
                    {localUrls.length === 0 ? 'Add screenshot' : 'Add more'}
                  </span>
                </>
              )}
            </button>
            {getSlotState(emptySlotIndex).error && (
              <p className="mt-1 text-[11px] text-destructive" role="alert">
                {getSlotState(emptySlotIndex).error}
              </p>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {localUrls.length}/{MAX} screenshots · PNG, JPG, WebP · max 8MB each
      </p>
    </div>
  )
}
