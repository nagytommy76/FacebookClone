import React from 'react'
import { SelectChangeEvent } from '@mui/material'
import { IDateOfBirth } from '../Types'

const useDateOfBirth = (setDateOfBirth: React.Dispatch<React.SetStateAction<IDateOfBirth>>) => {
   const handleYearChange = (event: SelectChangeEvent) => {
      setDateOfBirth((prevValue) => {
         return {
            ...prevValue,
            year: event.target.value,
         }
      })
   }
   const handleMontChange = (event: SelectChangeEvent) => {
      setDateOfBirth((prevValue) => {
         return {
            ...prevValue,
            month: event.target.value,
         }
      })
   }
   const handleDayChange = (event: SelectChangeEvent) => {
      setDateOfBirth((prevValue) => {
         return {
            ...prevValue,
            day: event.target.value,
         }
      })
   }
   return { handleYearChange, handleMontChange, handleDayChange }
}

export default useDateOfBirth
