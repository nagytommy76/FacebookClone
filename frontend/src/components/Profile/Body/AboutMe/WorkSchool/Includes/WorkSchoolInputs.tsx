import React from 'react'
import useInputs from './Hooks/useInputs'

import DateSelector from './DateSelector'

import { WorkSchoolInputContainer } from '../Styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const WorkSchoolInputs = () => {
   const {
      city,
      company,
      post,
      endDateChecked,
      fromDate,
      toDate,
      handleChangeChecked,
      setFromDate,
      setToDate,
      handleChangeCityValue,
      handleChangeCompanyValue,
      handleChangePostValue,
      addWorkMutation,
   } = useInputs()

   return (
      <WorkSchoolInputContainer>
         <TextField
            onChange={handleChangeCompanyValue}
            value={company.value}
            label='Vállalat'
            id='companyName'
            size='medium'
            error={company.error}
            helperText={company.errorMsg}
         />
         <TextField
            onChange={handleChangePostValue}
            value={post.value}
            label='Pozíció'
            id='post'
            size='medium'
            error={post.error}
            helperText={post.errorMsg}
         />
         <TextField
            onChange={handleChangeCityValue}
            value={city.value}
            label='Város'
            id='city'
            size='medium'
            error={city.error}
            helperText={city.errorMsg}
         />
         <DateSelector
            handleChangeChecked={handleChangeChecked}
            setFromDate={setFromDate}
            setToDate={setToDate}
            endDateChecked={endDateChecked}
            fromDate={fromDate}
         />
         <Button onClick={() => addWorkMutation()} color='warning' variant='outlined'>
            Küldés
         </Button>
      </WorkSchoolInputContainer>
   )
}

export default WorkSchoolInputs
