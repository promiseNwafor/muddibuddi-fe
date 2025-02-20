import { z } from 'zod'

export const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type UserFormValues = z.infer<typeof UserSchema>

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type LoginFormValues = z.infer<typeof LoginSchema>

export const MoodEntrySchema = z.object({
  moodText: z
    .string()
    .min(10, 'Please describe your mood or event in at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  dateTime: z
    .string()
    .min(5)
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      return selectedDate <= today
    }, 'Date cannot be in the future'),
})

export type MoodEntryFormValues = z.infer<typeof MoodEntrySchema>
