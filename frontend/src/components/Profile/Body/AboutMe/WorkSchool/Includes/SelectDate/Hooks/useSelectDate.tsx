import { useState, useEffect } from 'react'
import moment from 'moment'
import type { SelectChangeEvent } from '@mui/material'
import type { DateError } from '../Types'

const useSelectDate = (setDate: React.Dispatch<React.SetStateAction<DateError>>) => {
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
      setDate({ value: new Date(`${year}-${month}-${event.target.value}`), error: false, errorMsg: '' })
   }

   useEffect(() => {
      const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
      let days: number[] = []
      for (let index = 1; index <= daysInMonth; index++) {
         days.push(index)
      }
      setDaysOfMonth(days)
   }, [year, month])

   useEffect(() => {
      if (year != '' && month != '' && day != '')
         setDate({ value: new Date(`${year}-${month}-${day}`), error: false, errorMsg: '' })
   }, [year, month, day, setDate])

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
