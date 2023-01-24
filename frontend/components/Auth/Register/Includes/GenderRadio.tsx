import React from 'react'
import { GenderTypes } from './Types'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

const GenderRadio: React.FC<{
   gender: GenderTypes
   setGender: React.Dispatch<React.SetStateAction<GenderTypes>>
}> = ({ setGender, gender }) => {
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setGender(event.target.value as GenderTypes)
   }
   return (
      <FormControl>
         <FormLabel>Nemed</FormLabel>
         <RadioGroup row name='controlled-radio-gender-group' value={gender} onChange={handleChange}>
            <FormControlLabel value='female' control={<Radio />} label='Nő' />
            <FormControlLabel value='male' control={<Radio />} label='Férfi' />
         </RadioGroup>
      </FormControl>
   )
}

export default GenderRadio
