import React from 'react'
import useGetYears from './Hook/useGetYears'
import useGetMonth from './Hook/useGetMonth'
import useGetDays from './Hook/useGetDays'
import useDateOfBirth from './Hook/useDateOfBirth'
import { IDateOfBirth } from './Types'

import Stack from '@mui/material/Stack'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const DateOfBirth: React.FC<{
   dateOfBirth: IDateOfBirth
   setDateOfBirth: React.Dispatch<React.SetStateAction<IDateOfBirth>>
}> = ({ dateOfBirth, setDateOfBirth }) => {
   const years = useGetYears()
   const months = useGetMonth()
   const days = useGetDays()
   const { handleDayChange, handleMontChange, handleYearChange } = useDateOfBirth(setDateOfBirth)

   return (
      <>
         <Stack direction='row' spacing={1} width='100%'>
            <FormControl fullWidth error={dateOfBirth.isError}>
               <InputLabel id='demo-simple-select-label'>Születési év</InputLabel>
               <Select
                  labelId='demo-simple-select-label'
                  id='year'
                  value={dateOfBirth.year}
                  label='Születési év'
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  onChange={handleYearChange}>
                  {years.map((year, index) => (
                     <MenuItem key={index} value={year}>
                        {year}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <FormControl fullWidth error={dateOfBirth.isError}>
               <InputLabel id='demo-simple-select-label'>Hónap</InputLabel>
               <Select
                  labelId='demo-simple-select-label'
                  id='month'
                  value={dateOfBirth.month}
                  label='Hónap'
                  onChange={handleMontChange}>
                  {months.map((month, index) => (
                     <MenuItem key={index} value={index}>
                        {month}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <FormControl fullWidth error={dateOfBirth.isError}>
               <InputLabel id='demo-simple-select-label'>Nap</InputLabel>
               <Select
                  labelId='demo-simple-select-label'
                  id='days'
                  value={dateOfBirth.day}
                  label='Nap'
                  MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
                  onChange={handleDayChange}>
                  {days.map((day) => (
                     <MenuItem key={day} value={day}>
                        {day}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
         </Stack>
         <FormHelperText error={dateOfBirth.isError}>{dateOfBirth.msg}</FormHelperText>
      </>
   )
}

export default DateOfBirth
