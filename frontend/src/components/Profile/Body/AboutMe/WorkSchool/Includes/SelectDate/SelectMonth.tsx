import { useState } from 'react'
import moment from 'moment'

import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import SelectBase from './SelectBase'

const SelectMonth = () => {
   const [fromMonth, setFromMonth] = useState<string>('0')

   const handleChangeMonth = (event: SelectChangeEvent) => {
      setFromMonth(event.target.value)
   }
   console.log(moment('2012-02', 'YYYY-MM').daysInMonth())
   console.log(fromMonth)
   return (
      <SelectBase handleChangeEvent={handleChangeMonth} labelId='month' labelText='Hónap' value={fromMonth}>
         {moment.months().map((month, index) => (
            <MenuItem key={index} value={index}>
               {month}
            </MenuItem>
         ))}
      </SelectBase>
   )
}

export default SelectMonth
