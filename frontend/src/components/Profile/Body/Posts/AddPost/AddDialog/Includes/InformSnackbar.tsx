import React from 'react'

import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'

const InformSnackbar: React.FC<{ isOpen: boolean; handleClose: () => void }> = ({ isOpen, handleClose }) => {
   return <Snackbar open={isOpen} onClose={handleClose} TransitionComponent={Fade} message='I love snacks' />
}

export default InformSnackbar
