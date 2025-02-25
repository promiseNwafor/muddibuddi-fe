import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@/test/testUtils'
import RegisterContainer from '../auth/RegisterContainer'
import { ROUTES } from '@/utils'

describe('Register Component', () => {
  it('renders register form', () => {
    render(<RegisterContainer />)

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    // expect(screen.getByPlaceholderText(/amy/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/amy@email.com/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /register with google/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles successful registration with RTK Query', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    // Fill out the form
    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // Check navigation and store state
    await waitFor(() => {
      // The component redirects to login page on success
      expect(window.location.pathname).toBe(ROUTES.LOGIN)
    })
  })

  it('handles registration validation errors', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    // Submit form with invalid email but other fields filled
    await user.type(screen.getByLabelText(/username/i), 'testuser')
    await user.type(screen.getByLabelText(/email/i), 'invalidemail')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // TODO: uncomment when error message is implemented
    // await waitFor(() => {
    //   expect(screen.getByText(/invalid email/i)).toBeInTheDocument()
    // })
  })

  it('handles empty form submission', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    // Submit empty form
    await user.click(screen.getByRole('button', { name: /submit/i }))

    await waitFor(() => {
      const errorElements = screen.getAllByText(/required|string must contain/i)
      expect(errorElements.length).toBeGreaterThan(0)
    })
  })

  it('handles registration error with RTK Query', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    // Fill out the form with values that will trigger an error
    await user.type(screen.getByLabelText(/username/i), 'existinguser')
    await user.type(screen.getByLabelText(/email/i), 'existing@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password123')
    await user.click(screen.getByRole('button', { name: /submit/i }))

    // TODO: uncomment when error message is implemented
    // await waitFor(() => {
    //   expect(screen.getByText(/user already exists/i)).toBeInTheDocument()
    // })
  })

  it('navigates to login page when sign in link is clicked', async () => {
    const user = userEvent.setup()
    render(<RegisterContainer />)

    await user.click(screen.getByRole('link', { name: /sign in/i }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/login')
    })
  })
})
