import React from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const SelectBase: React.FC<{
   children: React.ReactNode
   value: string
   labelText: 'Év' | 'Hónap' | 'Nap'
   labelId?: 'year' | 'month' | 'day'
   handleChangeEvent: (event: SelectChangeEvent) => void
}> = ({ children, value, labelText, labelId = 'year', handleChangeEvent }) => {
   return (
      <FormControl fullWidth>
         <InputLabel id={`start-${labelId}`}>{labelText}</InputLabel>
         <Select
            multiline
            labelId={`start-${labelId}`}
            id={`start-${labelId}`}
            value={value}
            label={labelText}
            onChange={handleChangeEvent}
         >
            {children}
         </Select>
      </FormControl>
   )
}

export default SelectBase
