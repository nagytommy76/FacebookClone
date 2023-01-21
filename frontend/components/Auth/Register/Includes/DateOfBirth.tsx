import useGetYears from './Hook/useGetYears'
import useGetMonth from './Hook/useGetMonth'

import Stack from '@mui/material/Stack'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const DateOfBirth = () => {
   const years = useGetYears()
   const months = useGetMonth()
   return (
      <Stack direction='row' spacing={1} width='100%'>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Születési év</InputLabel>
            <Select
               labelId='demo-simple-select-label'
               id='demo-simple-select'
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
               id='demo-simple-select'
               // value={age}
               label='Születési év'
               // onChange={handleChange}
            >
               {Object.entries(months).map((month) => (
                  <MenuItem key={month[0]} value={month[0]}>
                     {month[1]}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Nap</InputLabel>
            <Select
               labelId='demo-simple-select-label'
               id='demo-simple-select'
               // value={age}
               label='Születési év'
               // onChange={handleChange}
            >
               <MenuItem value={10}>Ten</MenuItem>
               <MenuItem value={20}>Twenty</MenuItem>
               <MenuItem value={30}>Thirty</MenuItem>
            </Select>
         </FormControl>
      </Stack>
   )
}

export default DateOfBirth
