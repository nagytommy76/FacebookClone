import React from 'react'
import useInputs from './Hooks/useInputs'
import useOpen from './Hooks/useOpen'

import { useParams } from 'next/navigation'
import { useAppSelector } from '@/reduxStore/store'

import DateSelector from './DateSelector'

import { WorkSchoolInputContainer } from '../Styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Typography from '@mui/material/Typography'

const WorkSchoolInputs = () => {
   const params = useParams() as { userId: string }
   const loggedInUserId = useAppSelector((state) => state.auth.userId)

   const {
      city,
      company,
      post,
      description,
      endDateChecked,
      fromDate,
      toDate,
      handleChangeChecked,
      setFromDate,
      setToDate,
      handleSetDescription,
      handleChangeCityValue,
      handleChangeCompanyValue,
      handleChangePostValue,
      addWorkMutation,
   } = useInputs()
   const { handleSetOpen, isOpen } = useOpen()

   return (
      <>
         <Typography variant='h5'>Munkahely</Typography>
         {params.userId == loggedInUserId && (
            <>
               <Button
                  onClick={handleSetOpen}
                  variant='text'
                  color='warning'
                  startIcon={<AddCircleOutlineIcon />}
               >
                  Munkahely megadása
               </Button>

               <Collapse timeout={200} sx={{ width: '100%' }} in={isOpen}>
                  <WorkSchoolInputContainer>
                     <TextField
                        required
                        onChange={handleChangeCompanyValue}
                        value={company.value}
                        label='Vállalat'
                        id='companyName'
                        size='medium'
                        error={company.error}
                        helperText={company.errorMsg}
                     />
                     <TextField
                        required
                        onChange={handleChangePostValue}
                        value={post.value}
                        label='Pozíció'
                        id='post'
                        size='medium'
                        error={post.error}
                        helperText={post.errorMsg}
                     />
                     <TextField
                        required
                        onChange={handleChangeCityValue}
                        value={city.value}
                        label='Város'
                        id='city'
                        size='medium'
                        error={city.error}
                        helperText={city.errorMsg}
                     />
                     <TextField
                        value={description}
                        onChange={handleSetDescription}
                        multiline
                        rows={3}
                        id='description'
                        label='Leírás'
                        size='medium'
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
               </Collapse>
            </>
         )}
      </>
   )
}

export default WorkSchoolInputs
