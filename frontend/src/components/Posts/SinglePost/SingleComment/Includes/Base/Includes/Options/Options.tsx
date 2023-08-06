import React, { useContext } from 'react'
import { CommentContext } from '../../../../Context/CommentContext'

import { useAppSelector } from '@/reduxStore/store'
import useRemoveComment from './Hooks/useRemoveComment'
import useRemoveAnswer from './Hooks/useRemoveAnswer'

import { StyledOptions } from './Style'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const Options: React.FC<{
   answeredUserId: string
   commentId: string
   isChildComment: boolean
   handleSetAnswerOpen: () => void
}> = ({ answeredUserId, commentId, isChildComment = false, handleSetAnswerOpen }) => {
   const userId = useAppSelector((state) => state.auth.userId)
   const {
      commentReducer: { postId },
   } = useContext(CommentContext)
   const mutateRemoveComment = useRemoveComment()
   const mutateRemoveCommentAnswer = useRemoveAnswer()

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
   const open = Boolean(anchorEl)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget)
   }
   const handleCloseAndDelete = () => {
      if (!isChildComment) mutateRemoveComment({ commentId, postId })
      else mutateRemoveCommentAnswer({ answerId: commentId, postId })
      setAnchorEl(null)
   }
   const handleCloseAndUpdate = () => {
      handleSetAnswerOpen()
      setAnchorEl(null)
   }

   return (
      <>
         {answeredUserId == userId ? (
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
      </>
   )
}

export default Options
