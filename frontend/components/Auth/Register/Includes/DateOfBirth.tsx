import useGetYears from './Hook/useGetYears'
import useGetMonth from './Hook/useGetMonth'
import useGetDays from './Hook/useGetDays'

import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const DateOfBirth = () => {
   const years = useGetYears()
   const months = useGetMonth()
   const days = useGetDays()
   return (
      <Stack direction='row' spacing={1} width='100%'>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Születési év</InputLabel>
            <Select
               labelId='demo-simple-select-label'
               id='year'
               // value={age}
               label='Születési év'
               MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
               // onChange={handleChange}
            >
               {years.map((year, index) => (
                  <MenuItem key={index} value={year}>
                     {year}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Hónap</InputLabel>
            <Select
               labelId='demo-simple-select-label'
               id='month'
               // value={age}
               label='Hónap'
               // onChange={handleChange}
            >
               {months.map((month, index) => (
                  <MenuItem key={index} value={index}>
                     {month}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Nap</InputLabel>
            <Select
               labelId='demo-simple-select-label'
               id='days'
               // value={age}
               label='Nap'
               MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
               // onChange={handleChange}
            >
               {days.map((day) => (
                  <MenuItem key={day} value={day}>
                     {day}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Stack>
   )
}

export default DateOfBirth
