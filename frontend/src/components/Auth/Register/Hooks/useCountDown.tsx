import { useState } from 'react'

const useCountDown = () => {
   const [count, setCount] = useState<number>(5)

   const startCountDownTimer = () => {
      setInterval(() => {
         if (count >= 0) {
            setCount((prevCount) => prevCount - 1)
         }
      }, 1000)
   }

   return {
      count,
      startCountDownTimer,
   }
}

export default useCountDown
