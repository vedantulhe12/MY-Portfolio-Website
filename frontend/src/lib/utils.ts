import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeTime(date: string | Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const now = new Date()
  const then = new Date(date)
  const diffInDays = Math.floor((then.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (Math.abs(diffInDays) < 1) {
    return 'Today'
  } else if (Math.abs(diffInDays) < 7) {
    return rtf.format(diffInDays, 'day')
  } else if (Math.abs(diffInDays) < 30) {
    return rtf.format(Math.floor(diffInDays / 7), 'week')
  } else if (Math.abs(diffInDays) < 365) {
    return rtf.format(Math.floor(diffInDays / 30), 'month')
  } else {
    return rtf.format(Math.floor(diffInDays / 365), 'year')
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}