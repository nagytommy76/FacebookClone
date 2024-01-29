import React from 'react'
import useInputs from './SelectDate/Hooks/useInputs'

import DateSelector from './DateSelector'

import { WorkSchoolInputContainer } from '../Styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const WorkSchoolInputs = () => {
   const {
      setCity,
      setCompany,
      setPost,
      setFromDate,
      setToDate,
      handleChangeCity,
      handleChangeCompany,
      handleChangePost,
   } = useInputs()

   return (
      <WorkSchoolInputContainer>
         <TextField onChange={handleChangeCompany} label='Vállalat' id='companyName' size='medium' />
         <TextField onChange={handleChangePost} label='Pozíció' id='post' size='medium' />
         <TextField onChange={handleChangeCity} label='Város' id='city' size='medium' />
         <DateSelector setFromDate={setFromDate} setToDate={setToDate} />
         <Button color='warning' variant='outlined'>
            Küldés
         </Button>
      </WorkSchoolInputContainer>
   )
}

export default WorkSchoolInputs
