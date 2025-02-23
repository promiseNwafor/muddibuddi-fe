import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { Action } from '@/enums'
import { LoginFormValues, UserFormValues } from '@/utils/schema'
// import { User } from '@/types'
import { loginThunk, registerThunk } from './userThunk'

type UserState = {
  // user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  token: string | null
}

const initialState: UserState = {
  // user: null,
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
}

export const register = createAsyncThunk(
  Action.REGISTER,
  async (user: UserFormValues, thunkAPI) => {
    return registerThunk('auth/register', user, thunkAPI)
  },
)

export const login = createAsyncThunk(
  Action.LOGIN,
  async (user: LoginFormValues, thunkAPI) => {
    return loginThunk('auth/login', user, thunkAPI)
  },
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      // state.user = null
      state.isLoading = false
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token')
    },
    setToken: (state, action) => {
      state.token = action.payload
      state.isAuthenticated = true
      console.log('action.payload.token', action.payload)
      localStorage.setItem('token', action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        // payload is in the shape of { data: User, message: string, success: boolean }
        // state.user = action.payload.data
        toast.success(action.payload.message)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        // state.user = null
        toast.error(`Something went wrong: ${action.error.message}`)
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        // state.user = action.payload.data
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        // state.user = null
        toast.error(`Something went wrong: ${action.error.message}`)
      })
  },
})

export const { reset, logout, setToken } = userSlice.actions

export default userSlice.reducer
