import React from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const DialogHeader: React.FC<{ headerText?: string; handleCloseAddDialog: () => void }> = ({
   headerText = 'létrehozása',
   handleCloseAddDialog,
}) => {
   return (
      <DialogTitle
         sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
         }}
      >
         Bejegyzés {headerText}
         <IconButton onClick={handleCloseAddDialog}>
            <CloseIcon />
         </IconButton>
      </DialogTitle>
   )
}

export default DialogHeader
