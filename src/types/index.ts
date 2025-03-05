export interface ApiResponse<T> {
  message: string
  success: boolean
  data: T
}

export interface ApiErrorResponse {
  data: {
    message: string
    error: string
  }
}

export interface User {
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

export interface AddMoodValues {
  entryDateTime: string
  moodText: string
}

export interface Mood {
  id: string
  entryDateTime: Date
  moodText: string
  moodLabel: string
  moodScore: number
  summary: string
  city: string
  country: string
  weatherData: WeatherData
}

export interface WeatherData {
  id: string
  temperature: number
  feelsLike: number
  humidity: number
  pressure: number
  windSpeed: number
  cloudCover: number
  precipitation: number
  weatherType: string
  description: string
}
