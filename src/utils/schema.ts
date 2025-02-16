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
