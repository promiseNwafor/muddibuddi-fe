import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userReducer, { logout, setToken } from '@/services/user/userSlice'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key]
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

// Mock window.location
const locationMock = {
  href: '',
}

describe('User Slice', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    })
    vi.clearAllMocks()
    localStorageMock.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Initial state', () => {
    it('should handle initial state with no token', () => {
      localStorageMock.getItem.mockReturnValueOnce(null)

      const initialState = userReducer(undefined, { type: 'unknown' })

      expect(initialState).toEqual({
        isAuthenticated: false,
        token: null,
      })
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token')
    })

    it('should handle initial state with token', () => {
      localStorageMock.getItem.mockReturnValueOnce('test-token')

      const initialState = userReducer(undefined, { type: 'unknown' })

      expect(initialState).toEqual({
        isAuthenticated: true,
        token: 'test-token',
      })
      expect(localStorageMock.getItem).toHaveBeenCalledWith('token')
    })
  })

  describe('Actions', () => {
    it('should handle logout', () => {
      const initialState = {
        isAuthenticated: true,
        token: 'test-token',
      }

      const nextState = userReducer(initialState, logout())

      expect(nextState).toEqual({
        isAuthenticated: false,
        token: null,
      })
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
      expect(window.location.href).toBe('/login')
    })

    it('should handle setToken', () => {
      const initialState = {
        isAuthenticated: false,
        token: null,
      }

      const nextState = userReducer(initialState, setToken('new-token'))

      expect(nextState).toEqual({
        isAuthenticated: true,
        token: 'new-token',
      })
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'token',
        'new-token',
      )
    })
  })

  describe('Reducer', () => {
    it('should return the current state for unknown actions', () => {
      const initialState = {
        isAuthenticated: true,
        token: 'test-token',
      }

      const nextState = userReducer(initialState, { type: 'unknown' })

      expect(nextState).toEqual(initialState)
    })
  })
})
