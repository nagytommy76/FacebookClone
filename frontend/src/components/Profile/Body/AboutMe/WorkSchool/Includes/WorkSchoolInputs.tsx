import React from 'react'

import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'

const WorkSchoolInputs = () => {
   return (
      <div>
         <TextField label='Vállalat' id='companyName' size='small' />
         <TextField label='Pozíció' id='post' size='small' />
         <TextField label='Város' id='city' size='small' />
         <Input
            type='date'
            id='start'
            name='trip-start'
            onChange={(event) => console.log(event.target.value)}
         />
      </div>
   )
}

export default WorkSchoolInputs
