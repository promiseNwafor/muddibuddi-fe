import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/testUtils'
import RegisterContainer from '../auth/RegisterContainer'

describe('Register Component', () => {
  it('renders registration form', () => {
    render(<RegisterContainer />)

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register/i }),
    ).toBeInTheDocument()
  })

  it('handles successful registration', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    await user.type(screen.getByPlaceholderText(/name/i), 'Test User')
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'password123')
    await user.type(
      screen.getByPlaceholderText(/confirm password/i),
      'password123',
    )
    await user.click(screen.getByRole('button', { name: /register/i }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard')
    })
  })

  it('shows error on password mismatch', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    await user.type(screen.getByPlaceholderText(/name/i), 'Test User')
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await user.type(screen.getByPlaceholderText('Password'), 'password123')
    await user.type(
      screen.getByPlaceholderText(/confirm password/i),
      'differentpassword',
    )
    await user.click(screen.getByRole('button', { name: /register/i }))

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument()
  })
})
