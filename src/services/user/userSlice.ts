import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  isAuthenticated: boolean
  token: string | null
}

const initialState: UserState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload)
    },
  },
})

export const { logout, setToken } = userSlice.actions

export default userSlice.reducer
