import React from 'react'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

const RemoveNotification: React.FC<{ notificationId: string }> = ({ notificationId }) => {
   return (
      <IconButton aria-label='delete' sx={{ position: 'absolute', right: 5, top: 5 }}>
         <DeleteIcon />
      </IconButton>
   )
}

export default RemoveNotification
