import { useState } from 'react'
import type { SelectChangeEvent } from '@mui/material'

const useSelectDate = () => {
   const [fromMonth, setFromMonth] = useState('')
   const [fromYear, setFromYear] = useState('')
   const [fromDay, setFromDay] = useState('')
   const [daysOfMonth, setDaysOfMonth] = useState<number | null>(null)

   const handleChangeYear = (event: SelectChangeEvent) => {
      setFromYear(event.target.value.toString())
   }
   const handleChangeMonth = (event: SelectChangeEvent) => {
      setFromMonth(event.target.value)
   }
   const handleChangeDay = (event: SelectChangeEvent) => {
      setFromDay(event.target.value as string)
   }

   return {
      handleChangeYear,
      handleChangeMonth,
      handleChangeDay,
   }
}

export default useSelectDate
