import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import { Action } from '@/enums'
import { LoginFormValues, UserFormValues } from '@/utils/schema'
import { User } from '@/types'
import { loginThunk, registerThunk } from './userThunk'

const initialState = {
  user: null as User | null,
  isLoading: false,
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
      state.user = null
      state.isLoading = false
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
        state.user = action.payload.data
        toast.success(action.payload.message)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        toast.error(action.error.message)
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        toast.error(action.error.message)
      })
  },
})

export const { reset } = userSlice.actions

export default userSlice.reducer
