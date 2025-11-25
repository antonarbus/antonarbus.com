'use client'


// posts/zustandStore/counterSlice.js
export const counterSlice = (set, get) => ({
  counter: 0,
  add: (num) => set(
    (state) => ({ counter: state.counter + (num || 1) }),
    false,
    'add'
  )
})
