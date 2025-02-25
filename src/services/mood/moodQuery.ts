import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddMoodValues, ApiResponse, Mood } from '@/types'
import { apiUrl } from '@/utils'

export const moodQuery = createApi({
  reducerPath: 'moodQuery',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        throw new Error('Token not found')
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getMoodEntries: builder.query<Mood[], void>({
      query: () => '/mood/entries',
    }),
    addMoodEntry: builder.mutation<ApiResponse<Mood>, AddMoodValues>({
      query: (mood) => ({
        url: '/mood/entries',
        method: 'POST',
        body: mood,
      }),
    }),
  }),
})

export const { useGetMoodEntriesQuery, useAddMoodEntryMutation } = moodQuery
