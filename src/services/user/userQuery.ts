import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store'
import { apiUrl } from '@/utils'
import { ApiResponse, LoginResponse, User } from '@/types'
import { LoginFormValues, UserFormValues } from '@/utils/schema'

export const userQuery = createApi({
  reducerPath: 'userQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormValues>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<ApiResponse<UserFormValues>, UserFormValues>({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    getUser: builder.query<User, void>({
      query: () => 'user/data',
    }),
  }),
})

export const { useGetUserQuery, useLoginMutation, useRegisterMutation } =
  userQuery
