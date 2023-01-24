import { useMemo } from 'react'

const useGetYears = () => {
   const calculateYear = () => {
      let array = []
      for (let i = 2023; i >= 1901; i--) {
         array.push(i)
      }
      return array
   }
   return useMemo(calculateYear, [])
}

export default useGetYears
