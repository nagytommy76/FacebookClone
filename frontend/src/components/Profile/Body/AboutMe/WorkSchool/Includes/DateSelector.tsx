import { useState } from 'react'
import SelectContainer from './SelectDate/SelectContainer'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'

const DateSelector: React.FC<{
   setToDate: React.Dispatch<React.SetStateAction<Date | undefined>>
   setFromDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}> = ({ setToDate, setFromDate }) => {
   const [checked, setChecked] = useState<boolean>(true)

   const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
   }

   return (
      <>
         <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleChangeChecked} />}
            label='Jelenleg is itt dolgozom'
         />
         <SelectContainer setDate={setFromDate} />
         <Collapse timeout={150} in={!checked}>
            <SelectContainer setDate={setToDate} />
         </Collapse>
      </>
   )
}

export default DateSelector
