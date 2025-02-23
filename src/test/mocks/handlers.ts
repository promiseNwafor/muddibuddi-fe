import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('http://localhost:8000/auth/login', async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string
      password: string
    }

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: {
          id: '1',
          email: 'test@example.com',
        },
        token: 'fake-jwt-token',
      })
    }

    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 400 },
    )
  }),

  http.post('http://localhost:8000/auth/register', async ({ request }) => {
    const { email, password, username } = (await request.json()) as {
      email: string
      password: string
      username: string
    }

    if (email && password && username) {
      return HttpResponse.json(
        {
          user: {
            id: '1',
            username,
            email,
            password,
          },
          token: 'fake-jwt-token',
        },
        { status: 201 },
      )
    }

    return HttpResponse.json(
      { message: 'Please fill all fields' },
      { status: 400 },
    )
  }),

  http.get('http://localhost:8000/user/data', async ({ request }) => {
    const authHeader = request.headers.get('authorization')

    if (authHeader === 'Bearer fake-jwt-token') {
      return HttpResponse.json({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      })
    }

    return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }),
]
