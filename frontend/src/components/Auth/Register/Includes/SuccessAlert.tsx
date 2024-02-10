import React from 'react'

import Collapse from '@mui/material/Collapse'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

const SuccessAlert: React.FC<{ count: number; email: string; isSuccess: boolean }> = ({
   count,
   email,
   isSuccess,
}) => {
   return (
      <Collapse in={isSuccess} timeout={200} mountOnEnter unmountOnExit>
         <Alert sx={{ mb: 2 }} variant='outlined' severity='success'>
            <AlertTitle>{`Sikeres regisztráció a(z) ${email} email címmel`}</AlertTitle>
            <p>{count} mp múlva átirányíitunk a belépő oldalra!</p>
         </Alert>
      </Collapse>
   )
}

export default SuccessAlert
