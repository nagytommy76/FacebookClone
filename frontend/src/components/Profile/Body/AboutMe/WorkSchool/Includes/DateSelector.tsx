import SelectContainer from './SelectDate/SelectContainer'
import { DateError } from './SelectDate/Types'

import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'

const DateSelector: React.FC<{
   endDateChecked: boolean
   fromDate: DateError
   setToDate: React.Dispatch<React.SetStateAction<DateError>>
   setFromDate: React.Dispatch<React.SetStateAction<DateError>>
   handleChangeChecked: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ setToDate, setFromDate, handleChangeChecked, endDateChecked, fromDate }) => {
   return (
      <>
         <FormControlLabel
            control={<Checkbox checked={endDateChecked} onChange={handleChangeChecked} />}
            label='Jelenleg is itt dolgozom'
         />
         <FormControl error={fromDate.error}>
            <SelectContainer error={fromDate.error} setDate={setFromDate} />
            <FormHelperText>{fromDate.errorMsg}</FormHelperText>
         </FormControl>
         <Collapse timeout={150} in={!endDateChecked}>
            <SelectContainer setDate={setToDate} />
            <FormHelperText>Error</FormHelperText>
         </Collapse>
      </>
   )
}

export default DateSelector
