import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { useAppSelector } from '@/reduxStore/store'

import { StyledOptions } from './Style'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const ConfirmDeleteDialog = dynamic(() => import('./Includes/ConfirmDeleteDialog'), {
   loading: () => <h1>Töltés egyelőre</h1>,
})

const Options: React.FC<{
   answeredUserId: string
   answerId: string
   commentId?: string
   isChildComment: boolean
   answerIsDeleted?: boolean
   handleSetAnswerOpenForUpdate: () => void
}> = ({
   answeredUserId,
   answerId,
   commentId,
   isChildComment = false,
   handleSetAnswerOpenForUpdate,
   answerIsDeleted = false,
}) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleCloseAndDelete = () => {
      setIsDialogOpen(true)
      setAnchorEl(null)
   }
   const handleCloseAndUpdate = () => {
      handleSetAnswerOpenForUpdate()
      setAnchorEl(null)
   }

   return (
      <>
         {answeredUserId == userId && !answerIsDeleted ? (
            <>
               <StyledOptions>
                  <IconButton size='small' onClick={handleClick}>
                     <MoreHorizIcon fontSize='inherit' />
                  </IconButton>
               </StyledOptions>
               <Menu id='basic-menu' anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                  <MenuItem onClick={handleCloseAndDelete}>Törlés</MenuItem>
                  <MenuItem onClick={handleCloseAndUpdate}>Módosítás</MenuItem>
               </Menu>
            </>
         ) : (
            <></>
         )}
         <ConfirmDeleteDialog
            commentId={commentId || ''}
            answerId={answerId}
            isChildComment={isChildComment}
            isOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
         />
      </>
   )
}

export default Options
