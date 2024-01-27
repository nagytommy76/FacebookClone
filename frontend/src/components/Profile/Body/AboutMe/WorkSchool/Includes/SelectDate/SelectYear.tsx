import { useState } from 'react'
import useYear from '../../Hooks/useYear'

import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'

import SelectBase from './SelectBase'

const SelectYear = () => {
   // Itt esetleg lehet a születési évet megadni mint minumum évszám a DB-ből dateOfBirth
   const fillYears = useYear()
   const [fromYear, setFromYear] = useState<string | null>(null)

   const handleChangeYear = (event: SelectChangeEvent) => {
      setFromYear(event.target.value.toString())
   }
   return (
      <SelectBase handleChangeEvent={handleChangeYear} labelText='Év' value={fromYear || ''}>
         {fillYears().map((year) => (
            <MenuItem key={year} value={year}>
               {year}
            </MenuItem>
         ))}
      </SelectBase>
   )
}

export default SelectYear
