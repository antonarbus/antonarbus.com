'use client'

// functions\useBoolean.js
import { useState } from 'react'

export default function useBoolean(initVal = true) {
  const [state, setState] = useState(initVal)
  const toggleState = () => setState(prevVal => !prevVal)
  return [state, toggleState]
}
