import React from 'react'

import useDeleteMutate from './Hooks/useDeleteMutate'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const RemoveButton: React.FC<{
   messageId: string
}> = ({ messageId }) => {
   const deleteMessageMutation = useDeleteMutate(messageId)

   const removeSingleMsg = () => {
      deleteMessageMutation()
   }

   return (
      <Tooltip title='Üzenet törlése' arrow placement='top'>
         <IconButton onClick={removeSingleMsg} aria-label='delete' size='small'>
            <DeleteOutlineIcon fontSize='inherit' />
         </IconButton>
      </Tooltip>
   )
}

export default RemoveButton
