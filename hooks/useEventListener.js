import { useEffect, useRef } from 'react'

export default function useEventListener (
  eventType,
  callback,
  element = typeof window !== 'undefined' && window
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (e) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}
