import { useState, useEffect } from 'react'
import moment from 'moment'
import type { SelectChangeEvent } from '@mui/material'

const useSelectDate = () => {
   const [year, setYear] = useState('')
   const [month, setMonth] = useState('')
   const [day, setDay] = useState('')
   const [daysOfMonth, setDaysOfMonth] = useState<number[] | null>(null)
   const [disabled, setDisabled] = useState({ month: true, day: true })

   const handleChangeYear = (event: SelectChangeEvent) => {
      setYear(event.target.value.toString())
      setDisabled({ ...disabled, month: false })
   }
   const handleChangeMonth = (event: SelectChangeEvent) => {
      setMonth(event.target.value)
      setDisabled({ ...disabled, day: false })
   }
   const handleChangeDay = (event: SelectChangeEvent) => {
      setDay(event.target.value as string)
   }

   useEffect(() => {
      const daysInMonth = moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth()
      let days: number[] = []
      for (let index = 1; index <= daysInMonth; index++) {
         days.push(index)
      }
      setDaysOfMonth(days)
   }, [year, month])

   return {
      handleChangeYear,
      handleChangeMonth,
      handleChangeDay,
      year,
      month,
      day,
      disabled,
      daysOfMonth,
   }
}

export default useSelectDate
