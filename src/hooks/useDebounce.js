import { useEffect, useState } from "react"

export const useDebounce = (value, delay = 300, minLength = 3) => {
  const [debouncedValue, setDebouncedValue] = useState("")

  useEffect(() => {
    if (value?.length < minLength) {
      setDebouncedValue("") // clear query if input too short
      return
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay, minLength])

  return debouncedValue
}
