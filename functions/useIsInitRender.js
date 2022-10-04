// /functions/useIsInitRender'
import { useRef, useEffect } from 'react'

export default function useIsInitRender() {
  const isInitRender = useRef(true)
  useEffect(() => { isInitRender.current = false }, [])
  return isInitRender.current
}
