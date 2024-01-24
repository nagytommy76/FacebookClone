import React from 'react'

import SelectContainer from './SelectContainer'

import { WorkSchoolInputContainer } from '../Styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const WorkSchoolInputs = () => {
   return (
      <WorkSchoolInputContainer>
         <TextField label='Vállalat' id='companyName' size='medium' />
         <TextField label='Pozíció' id='post' size='medium' />
         <TextField label='Város' id='city' size='medium' />
         <SelectContainer />
         <Button color='warning' variant='outlined'>
            Küldés
         </Button>
      </WorkSchoolInputContainer>
   )
}

export default WorkSchoolInputs
