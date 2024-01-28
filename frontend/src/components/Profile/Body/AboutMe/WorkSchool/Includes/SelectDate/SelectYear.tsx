import useYear from './Hooks/useYear'

import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'

import SelectBase from './SelectBase'

const SelectYear: React.FC<{ handleChangeYear: (event: SelectChangeEvent) => void; year: string }> = ({
   handleChangeYear,
   year,
}) => {
   const fillYears = useYear()
   return (
      <SelectBase handleChangeEvent={handleChangeYear} labelText='Év' value={year}>
         {fillYears().map((year) => (
            <MenuItem key={year} value={year}>
               {year}
            </MenuItem>
         ))}
      </SelectBase>
   )
}

export default SelectYear
