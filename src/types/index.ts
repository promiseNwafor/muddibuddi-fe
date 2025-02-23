export type User = {
  id: string
  email: string
  username: string
  city: string
  country: string
  weatherUnit: string
  notificationEnabled: boolean
  shareData: boolean
}

export interface LoginResponse {
  token: string
  success: boolean
  message: string
  status: number
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  username: string
}

export interface ApiResponse<T> {
  message: string
  success: boolean
  status: number
  user: T
}
