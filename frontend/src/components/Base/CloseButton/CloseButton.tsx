import React from 'react'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const CloseButton: React.FC<{ closeFunction: () => void; rightPosition?: number; topPosition?: number }> = ({
   closeFunction,
   rightPosition = 2,
   topPosition = 2,
}) => {
   return (
      <IconButton
         onClick={closeFunction}
         sx={{ position: 'absolute', right: 2, top: 2 }}
         aria-label='close'
         color='error'
         size='medium'
      >
         <CloseIcon fontSize='inherit' />
      </IconButton>
   )
}

export default CloseButton
