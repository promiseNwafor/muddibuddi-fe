import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  moodEntries: [],
}

export const moodSlice = createSlice({
  name: 'mood',
  initialState,
  reducers: {},
})

export default moodSlice.reducer
