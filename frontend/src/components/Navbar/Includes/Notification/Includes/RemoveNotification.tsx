import React from 'react'
import useRemoveNotification from '../Hooks/useRemoveNotification'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'

const RemoveNotification: React.FC<{ notificationId: string }> = ({ notificationId }) => {
   const removeMutate = useRemoveNotification(notificationId)
   return (
      <Tooltip title='Értesítés törlése'>
         <IconButton
            size='small'
            onClick={() => removeMutate()}
            aria-label='delete'
            sx={{ position: 'absolute', right: 3, top: 5 }}
         >
            <DeleteIcon fontSize='inherit' />
         </IconButton>
      </Tooltip>
   )
}

export default RemoveNotification
