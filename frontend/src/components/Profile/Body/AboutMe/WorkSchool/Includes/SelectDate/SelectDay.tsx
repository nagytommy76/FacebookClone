import { useState } from 'react'

import moment from 'moment'

import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import SelectBase from './SelectBase'

const SelectDay = () => {
   const [fromDay, setFromDay] = useState('')

   const handleChangeMonth = (event: SelectChangeEvent) => {
      setFromDay(event.target.value as string)
   }

   return (
      <SelectBase handleChangeEvent={handleChangeMonth} labelId='day' labelText='Nap' value={fromDay}>
         {moment.months().map((month, index) => (
            <MenuItem key={index} value={month}>
               {month}
            </MenuItem>
         ))}
      </SelectBase>
   )
}

export default SelectDay
