'use client'

const LOGO_MAX_PX = 512
const SCREENSHOT_MAX_PX = 1920
const QUALITY = 0.85

function drawAndCompress(
  file: File,
  maxPx: number,
  quality: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)

      let { width, height } = img
      if (width > maxPx || height > maxPx) {
        const ratio = Math.min(maxPx / width, maxPx / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) return reject(new Error('Canvas context unavailable'))

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas toBlob failed'))
          const compressed = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), {
            type: 'image/webp',
          })
          resolve(compressed)
        },
        'image/webp',
        quality,
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }

    img.src = url
  })
}

export async function compressLogo(file: File): Promise<File> {
  if (file.type === 'image/svg+xml') return file
  return drawAndCompress(file, LOGO_MAX_PX, QUALITY)
}

export async function compressScreenshot(file: File): Promise<File> {
  return drawAndCompress(file, SCREENSHOT_MAX_PX, QUALITY)
}

export async function compressAvatar(file: File): Promise<File> {
  return drawAndCompress(file, 256, QUALITY)
}
