import React from 'react'

import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'

const InformSnackbar: React.FC<{ isOpen: boolean; message: string; handleClose: () => void }> = ({
   isOpen,
   message,
   handleClose,
}) => {
   return (
      <Snackbar
         open={isOpen}
         onClose={handleClose}
         autoHideDuration={5000}
         TransitionComponent={Fade}
         message={message}
      />
   )
}

export default InformSnackbar
