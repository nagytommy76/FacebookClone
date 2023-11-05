import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'

const InformSnackbar: React.FC<{ isOpen: boolean; message: string; handleClose: () => void }> = ({
   isOpen,
   message,
   handleClose,
}) => {
   return (
      <Snackbar
         sx={{ width: '400px' }}
         open={isOpen}
         onClose={handleClose}
         autoHideDuration={3000}
         TransitionComponent={Fade}
      >
         <Alert onClose={handleClose} severity='success' variant='filled' sx={{ width: '100%' }}>
            {message}
         </Alert>
      </Snackbar>
   )
}

export default InformSnackbar
