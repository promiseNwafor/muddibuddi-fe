/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import { render } from '@/test/testUtils'
import { toast } from 'sonner'
import { useGetUserQuery } from '@/services/user/userQuery'
import ProtectedRoute from '../auth/ProtectedRoute'

// Mock the toast
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

// Mock the React Router hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({ pathname: '/protected' }),
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate" data-to={to}>
        Redirecting...
      </div>
    ),
  }
})

// Mock the user query hook
vi.mock('@/services/user/userQuery', () => ({
  useGetUserQuery: vi.fn(),
  userQuery: {
    reducerPath: 'api',
    reducer: () => ({}),
    middleware: () => (next: (action: string) => void) => (action: string) =>
      next(action),
  },
}))

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state when fetching user data', () => {
    // Mock loading state
    // @ts-expect-error
    useGetUserQuery.mockReturnValue({
      isLoading: true,
      error: null,
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument()
  })

  it('redirects to login and shows toast when there is an error', () => {
    // Mock error state
    const mockError = { error: 'Unauthorized access' }
    // @ts-expect-error
    useGetUserQuery.mockReturnValue({
      isLoading: false,
      error: mockError,
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
    )

    expect(toast.error).toHaveBeenCalledWith(
      'Something went wrong! Unauthorized access',
    )
    expect(screen.getByTestId('navigate')).toBeInTheDocument()
    expect(screen.getByTestId('navigate').getAttribute('data-to')).toBe(
      '/login',
    )
  })

  it('redirects to login when user is not authenticated', () => {
    // Mock not authenticated state
    // @ts-expect-error
    useGetUserQuery.mockReturnValue({
      isLoading: false,
      error: null,
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          user: {
            isAuthenticated: false,
          },
        },
      },
    )

    expect(screen.getByTestId('navigate')).toBeInTheDocument()
    expect(screen.getByTestId('navigate').getAttribute('data-to')).toBe(
      '/login',
    )
  })

  it('renders children when user is authenticated', () => {
    // Mock authenticated state
    // @ts-expect-error
    useGetUserQuery.mockReturnValue({
      isLoading: false,
      error: null,
    })

    render(
      <ProtectedRoute>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          user: {
            isAuthenticated: true,
          },
        },
      },
    )

    expect(screen.getByTestId('protected-content')).toBeInTheDocument()
  })
})
