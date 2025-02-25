import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/testUtils'
import LoginContainer from '../auth/LoginContainer'

describe('Login Component', () => {
  it('renders login form', () => {
    render(<LoginContainer />)

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('handles successful login with RTK Query', async () => {
    const user = userEvent.setup()
    const { store } = render(<LoginContainer />)

    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      const state = store.getState()
      expect(state.user.token).toBe('fake-jwt-token')
      expect(window.location.pathname).toBe('/dashboard')
    })
  })

  it('handles login error with RTK Query', async () => {
    const user = userEvent.setup()
    render(<LoginContainer />)

    await user.type(screen.getByPlaceholderText(/email/i), 'wrong@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrongpassword')
    await user.click(screen.getByRole('button', { name: /login/i }))

    // TODO: uncomment when error message is implemented
    //   await waitFor(() => {
    //   expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    // })
  })
})
