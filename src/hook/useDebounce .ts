import { useEffect, useState } from "react"



export const useDebounce  = (value: string , delay:number) => {
  const [delayValue, setDelayValue] = useState(value)

  useEffect(() => {
    const handle = setInterval(() => {
      setDelayValue(value)
    }, delay)
    
    return() => {
      clearInterval(handle)
    }
  },[value, delay])

  return delayValue
}

