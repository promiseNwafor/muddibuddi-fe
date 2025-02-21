/* eslint-disable @typescript-eslint/ban-ts-comment */
import api from '@/utils/api'
import { LoginFormValues, UserFormValues } from '@/utils/schema'

export const registerThunk = async (
  url: string,
  user: UserFormValues,
  // @ts-expect-error
  thunkAPI,
) => {
  try {
    const res = await api.post(url, user)
    return res.data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
}

export const loginThunk = async (
  url: string,
  user: LoginFormValues,
  // @ts-expect-error
  thunkAPI,
) => {
  try {
    const res = await api.post(url, user)
    return res.data
  } catch (error) {
    console.log(error)
    return thunkAPI.rejectWithValue(error)
  }
}
