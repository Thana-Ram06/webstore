'use client'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { clientApp } from './config'

export const storage = getStorage(clientApp)

export const STORAGE_LIMITS = {
  logo: {
    maxBytes: 2 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
  },
  screenshot: {
    maxBytes: 8 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
  avatar: {
    maxBytes: 2 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const

export const storagePaths = {
  logo: (appId: string, ext: string) => `apps/${appId}/logo.${ext}`,
  screenshot: (appId: string, index: number, ext: string) =>
    `apps/${appId}/screenshots/${index}.${ext}`,
  avatar: (userId: string, ext: string) => `users/${userId}/avatar.${ext}`,
}

export interface UploadProgress {
  bytesTransferred: number
  totalBytes: number
  percent: number
}

export function uploadFile(
  storagePath: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, storagePath)
    const task = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
      cacheControl: 'public, max-age=31536000',
    })

    task.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress({
            bytesTransferred: snapshot.bytesTransferred,
            totalBytes: snapshot.totalBytes,
            percent,
          })
        }
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve(url)
      },
    )
  })
}

export async function deleteFile(storagePath: string): Promise<void> {
  const storageRef = ref(storage, storagePath)
  await deleteObject(storageRef)
}

export async function uploadLogo(
  appId: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  const ext = file.type === 'image/svg+xml' ? 'svg' : 'webp'
  return uploadFile(storagePaths.logo(appId, ext), file, onProgress)
}

export async function uploadScreenshot(
  appId: string,
  index: number,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  return uploadFile(storagePaths.screenshot(appId, index, 'webp'), file, onProgress)
}

export async function uploadAvatar(
  userId: string,
  file: File,
  onProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  return uploadFile(storagePaths.avatar(userId, 'webp'), file, onProgress)
}

export function validateFile(
  file: File,
  type: keyof typeof STORAGE_LIMITS,
): { valid: boolean; error?: string } {
  const limits = STORAGE_LIMITS[type]

  if (!(limits.allowedTypes as readonly string[]).includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${limits.allowedTypes.join(', ')}`,
    }
  }

  if (file.size > limits.maxBytes) {
    const maxMB = limits.maxBytes / (1024 * 1024)
    return { valid: false, error: `File too large. Max size: ${maxMB}MB` }
  }

  return { valid: true }
}
