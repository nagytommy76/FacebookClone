import React from 'react'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

const WorkSchool = () => {
   return (
      <>
         <div>
            <Typography variant='h5'>Munkahely</Typography>
            <Button variant='text' color='warning' startIcon={<AddCircleOutlineIcon />}>
               Munkahely megadása
            </Button>
         </div>
      </>
   )
}

export default WorkSchool
