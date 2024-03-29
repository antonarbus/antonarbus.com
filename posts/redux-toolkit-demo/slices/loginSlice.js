// redux-toolkit-demo/slices/loginSlice.js
import { createSlice } from '@reduxjs/toolkit'
import { changeGreeting } from './greetingsSlice'

const initialState = {
  isLogged: false
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogged = !state.isLogged
    }
  },
  // preferable way of extraReducers syntax
  extraReducers: (builder) => {
    builder.addCase(changeGreeting, (state, action) => {
      console.log('I can respond to changeGreeting() action of greetingsSlice from loginSlice')
    })
  }
})

export default loginSlice.reducer
export const { login } = loginSlice.actions
