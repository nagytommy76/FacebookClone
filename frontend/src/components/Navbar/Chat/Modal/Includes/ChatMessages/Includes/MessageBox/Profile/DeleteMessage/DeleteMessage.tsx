import { useState } from 'react'
import dynamic from 'next/dynamic'

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Tooltip from '@mui/material/Tooltip'

import useDeleteChat from './Hooks/useDeleteChat'

const ConfirmDelete = dynamic(() => import('@/Base/ConfirmDelete/ConfirmDelete'))

const DeleteMessage: React.FC<{ fullName: string }> = ({ fullName }) => {
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
   const deleteChatMutate = useDeleteChat(setIsDialogOpen)

   return (
      <>
         <Tooltip title='Beszélgetés törlése'>
            <IconButton onClick={() => setIsDialogOpen(true)} size='medium' color='error' aria-label='delete'>
               <DeleteIcon fontSize='inherit' />
            </IconButton>
         </Tooltip>
         <ConfirmDelete
            isOpen={isDialogOpen}
            otherTextToDisplay={`A beszélgetésed ${fullName} felhasználóval törölve lesz. Biztosan folytatod?`}
            handleCloseAndDelete={() => deleteChatMutate()}
            setIsDialogOpen={setIsDialogOpen}
         />
      </>
   )
}

export default DeleteMessage
