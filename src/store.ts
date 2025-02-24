import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/services/user/userSlice'
import { userQuery } from '@/services/user/userQuery'
import moodReducer from '@/services/mood/moodSlice'
import { moodQuery } from '@/services/mood/moodQuery'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userQuery.reducerPath]: userQuery.reducer,
    mood: moodReducer,
    [moodQuery.reducerPath]: moodQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userQuery.middleware, moodQuery.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
