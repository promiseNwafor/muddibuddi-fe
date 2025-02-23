import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@/services/user/userSlice'
import { userQuery } from '@/services/user/userQuery'

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userQuery.reducerPath]: userQuery.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userQuery.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
