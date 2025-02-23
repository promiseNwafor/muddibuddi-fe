import { describe, it, expect } from 'vitest'
import userReducer, { setToken, logout } from '@/services/user/userSlice'

describe('userSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
  }

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState)
  })

  it('should handle setToken', () => {
    const token = 'test-token'
    const actual = userReducer(initialState, setToken(token))
    expect(actual.token).toEqual(token)
    expect(actual.isAuthenticated).toBe(true)
  })

  it('should handle logout', () => {
    const state = {
      isAuthenticated: true,
      token: 'test-token',
    }
    const actual = userReducer(state, logout())
    expect(actual).toEqual(initialState)
  })
})
