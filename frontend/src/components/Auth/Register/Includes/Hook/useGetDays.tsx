import { useMemo } from 'react'

const useGetDays = () => {
   const makeDays = () => {
      let days: number[] = []
      for (let index = 1; index <= 31; index++) {
         days.push(index)
      }
      return days
   }
   return useMemo(makeDays, [])
}

export default useGetDays
