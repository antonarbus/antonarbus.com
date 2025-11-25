'use client'


// redux-toolkit-demo/store.js
import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import counter from './slices/counterSlice.js'
import login from './slices/loginSlice.js'
import greetings from './slices/greetingsSlice.js'
import users from './slices/usersSlice.js'

// #region LOGGER MIDDLEWARE
const logger = createLogger({})
// #endregion

export const store = configureStore({
  reducer: {
    counter,
    login,
    greetings,
    users
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
  devTools: true
})
