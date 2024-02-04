import type { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import SelectBase from './SelectBase'

const SelectDay: React.FC<{
   handleChangeDay: (event: SelectChangeEvent) => void
   day: string
   daysOfMonth: number[] | null
   disabled?: boolean
   error?: boolean
}> = ({ handleChangeDay, day, daysOfMonth, disabled = false, error = false }) => {
   return (
      <SelectBase
         error={error}
         disabled={disabled}
         handleChangeEvent={handleChangeDay}
         labelId='day'
         labelText='Nap'
         value={day}
      >
         {daysOfMonth &&
            daysOfMonth.map((day) => (
               <MenuItem key={day} value={day}>
                  {day}
               </MenuItem>
            ))}
      </SelectBase>
   )
}

export default SelectDay
