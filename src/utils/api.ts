import axios from 'axios'

const baseURL = 'http://localhost:8000/'

export const api = axios.create({
  baseURL,
})

api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error)
  }
  return config
})

export default api
