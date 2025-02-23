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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
