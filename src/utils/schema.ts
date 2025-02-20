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
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time'),
})

export type MoodEntryFormValues = z.infer<typeof MoodEntrySchema>
