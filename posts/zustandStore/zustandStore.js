// posts/zustandStore/zustandStore.js
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { counterSlice } from './counterSlice'
import { loginOutSlice } from './loginOutSlice'

export const zustandStore = create(devtools((set, get) => ({
  ...counterSlice(set, get),
  ...loginOutSlice(set, get)
}), { name: 'Store with slices' }))
