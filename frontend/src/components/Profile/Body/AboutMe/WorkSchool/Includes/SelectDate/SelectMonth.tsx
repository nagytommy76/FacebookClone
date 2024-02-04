import moment from 'moment'

import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import SelectBase from './SelectBase'

const SelectMonth: React.FC<{
   handleChangeMonth: (event: SelectChangeEvent) => void
   month: string
   disabled?: boolean
   error?: boolean
}> = ({ handleChangeMonth, month, disabled = false, error = false }) => {
   return (
      <SelectBase
         error={error}
         disabled={disabled}
         handleChangeEvent={handleChangeMonth}
         labelId='month'
         labelText='Hónap'
         value={month}
      >
         {moment.months().map((month, index) => (
            <MenuItem key={index} value={index + 1}>
               {month}
            </MenuItem>
         ))}
      </SelectBase>
   )
}

export default SelectMonth
