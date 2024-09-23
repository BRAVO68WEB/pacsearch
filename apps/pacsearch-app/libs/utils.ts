import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const calcSize = (size: string) => {
  console.log(size)
  if (size === 'NULL') return '0 B'

  let sizeInBytes = parseInt(size)
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  let i = 0
  while (sizeInBytes >= 1024 && i < sizes.length - 1) {
    sizeInBytes /= 1024
    i++
  }
  return `${sizeInBytes.toFixed(2)} ${sizes[i]}`
}
