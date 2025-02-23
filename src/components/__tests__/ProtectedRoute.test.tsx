import { describe, it, expect } from 'vitest'
import { render } from '@/test/testUtils'
import ProtectedRoute from '../auth/ProtectedRoute'

describe('ProtectedRoute', () => {
  it('redirects to login when not authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(window.location.pathname).toBe('/login')
  })

  it('renders children when authenticated', () => {
    const preloadedState = {
      user: {
        isAuthenticated: true,
        token: 'test-token',
      },
    }

    const { getByText } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { preloadedState },
    )

    expect(getByText('Protected Content')).toBeInTheDocument()
  })
})
