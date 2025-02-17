import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { weekday: 'short' })
}

export const formatEntryDate = (dateStr: string, timeStr: string) => {
  const date = new Date(dateStr)
  const today = new Date('2025-02-17')
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (dateStr === today.toISOString().split('T')[0]) {
    return `Today at ${timeStr}`
  } else if (dateStr === yesterday.toISOString().split('T')[0]) {
    return `Yesterday at ${timeStr}`
  } else {
    return `${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })} at ${timeStr}`
  }
}

export const getMoodColor = (mood: string) => {
  switch (mood.toLowerCase()) {
    case 'happy':
      return 'bg-green-100 text-green-800'
    case 'excited':
      return 'bg-purple-100 text-purple-800'
    case 'neutral':
      return 'bg-gray-100 text-gray-800'
    case 'sad':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
