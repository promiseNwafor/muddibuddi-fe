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
}

export interface ApiResponse<T> {
  message: string
  success: boolean
  data: T
}
