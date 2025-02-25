// import { describe, it, expect, vi, beforeEach } from 'vitest'
// import { userQuery } from '@/services/user/userQuery'
// import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import userReducer from '@/services/user/userSlice'

// // Mock fetchBaseQuery to avoid actual network requests
// vi.mock('@reduxjs/toolkit/query/react', async () => {
//   const actual = await vi.importActual('@reduxjs/toolkit/query/react')
//   return {
//     ...actual,
//     fetchBaseQuery: vi.fn(),
//   }
// })

// // Create mock for API responses
// const mockLoginResponse = {
//   success: true,
//   data: {
//     token: 'test-jwt-token',
//     user: {
//       id: '1',
//       username: 'testuser',
//       email: 'test@example.com',
//     },
//   },
//   message: 'Login successful',
// }

// const mockRegisterResponse = {
//   success: true,
//   data: {
//     username: 'newuser',
//     email: 'newuser@example.com',
//   },
//   message: 'User registered successfully',
// }

// const mockUserResponse = {
//   success: true,
//   data: {
//     id: '1',
//     username: 'testuser',
//     email: 'test@example.com',
//   },
//   message: 'User data retrieved',
// }

// // If you don't have setupApiStore, here's a simple implementation
// // This is just a placeholder - you'll need to implement or import the real version
// const setupApiStore = (api, reducers = {}) => {
//   const getState = vi.fn().mockReturnValue({
//     user: { token: 'test-token' },
//   })
//   const next = vi.fn()

//   // Test the middleware
//   api.middleware({ getState })(next)({})

//   return {
//     store: {
//       getState,
//     },
//   }
// }

// describe('User Query API', () => {
//   let fetchMock: ReturnType<typeof vi.fn>

//   beforeEach(() => {
//     fetchMock = vi.fn()
//     fetchBaseQuery.mockReturnValue(fetchMock)
//     vi.clearAllMocks()
//   })

//   describe('Configuration', () => {
//     it('should use the correct base URL', () => {
//       expect(userQuery.reducerPath).toBe('userQuery')

//       // Test that headers are prepared correctly
//       const { store } = setupApiStore(userQuery, { user: userReducer })
//       const headers = new Headers()
//       const prepareHeaders = fetchBaseQuery.mock.calls[0][0].prepareHeaders

//       const result = prepareHeaders(headers, { getState: store.getState })

//       expect(result.get('authorization')).toBe('Bearer test-token')
//     })
//   })

//   describe('Endpoints', () => {
//     it('login mutation should call correct endpoint with credentials', async () => {
//       fetchMock.mockResolvedValueOnce({
//         data: mockLoginResponse,
//       })

//       const credentials = { email: 'test@example.com', password: 'password123' }
//       const result = await userQuery.endpoints.login.initiate(credentials)(
//         { dispatch: vi.fn(), getState: vi.fn() },
//         undefined,
//         undefined,
//       )

//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.objectContaining({
//           url: 'auth/login',
//           method: 'POST',
//           body: credentials,
//         }),
//         expect.anything(),
//         expect.anything(),
//       )

//       expect(result.data).toEqual(mockLoginResponse)
//     })

//     it('register mutation should call correct endpoint with user data', async () => {
//       fetchMock.mockResolvedValueOnce({
//         data: mockRegisterResponse,
//       })

//       const userData = {
//         username: 'newuser',
//         email: 'newuser@example.com',
//         password: 'password123',
//       }
//       const result = await userQuery.endpoints.register.initiate(userData)(
//         { dispatch: vi.fn(), getState: vi.fn() },
//         undefined,
//         undefined,
//       )

//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.objectContaining({
//           url: 'auth/register',
//           method: 'POST',
//           body: userData,
//         }),
//         expect.anything(),
//         expect.anything(),
//       )

//       expect(result.data).toEqual(mockRegisterResponse)
//     })

//     it('getUser query should call correct endpoint', async () => {
//       fetchMock.mockResolvedValueOnce({
//         data: mockUserResponse,
//       })

//       const result = await userQuery.endpoints.getUser.initiate(undefined)(
//         { dispatch: vi.fn(), getState: vi.fn() },
//         undefined,
//         undefined,
//       )

//       expect(fetchMock).toHaveBeenCalledWith(
//         expect.objectContaining({
//           url: 'user/data',
//         }),
//         expect.anything(),
//         expect.anything(),
//       )

//       // Check the transformation works
//       expect(result.data).toEqual(mockUserResponse.data)
//     })
//   })

//   describe('Hooks', () => {
//     it('should export the correct hooks', () => {
//       expect(typeof userQuery.useGetUserQuery).toBe('function')
//       expect(typeof userQuery.useLoginMutation).toBe('function')
//       expect(typeof userQuery.useRegisterMutation).toBe('function')
//     })
//   })
// })
