'use client'


// posts/zustandStore/loginOutSlice.js
export const loginOutSlice = (set, get) => ({
  isLogged: false,
  logInOut: () => set(
    (state) => ({ isLogged: !state.isLogged }),
    false,
    'log in / out'
  )
})
