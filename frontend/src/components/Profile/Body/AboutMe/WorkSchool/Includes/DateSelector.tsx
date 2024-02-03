import SelectContainer from './SelectDate/SelectContainer'

import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'

const DateSelector: React.FC<{
   endDateChecked: boolean
   setToDate: React.Dispatch<React.SetStateAction<Date | undefined>>
   setFromDate: React.Dispatch<React.SetStateAction<Date | undefined>>
   handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ setToDate, setFromDate, handleChangeChecked, endDateChecked }) => {
   return (
      <>
         <FormControlLabel
            control={<Checkbox checked={endDateChecked} onChange={handleChangeChecked} />}
            label='Jelenleg is itt dolgozom'
         />
         <SelectContainer setDate={setFromDate} />
         <Collapse timeout={150} in={!endDateChecked}>
            <SelectContainer setDate={setToDate} />
         </Collapse>
      </>
   )
}

export default DateSelector
