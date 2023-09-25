import React from 'react'

import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

const CommentButton: React.FC<{
   commentRef: React.MutableRefObject<null | HTMLInputElement>
   handleOpenFn: () => void
   isTextFieldActive?: boolean
}> = ({ commentRef, handleOpenFn, isTextFieldActive = false }) => {
   const handleClick = () => {
      if (isTextFieldActive) {
         commentRef && commentRef.current?.focus()
      } else {
         handleOpenFn()
      }
   }
   return (
      <Button disableRipple fullWidth startIcon={<ChatBubbleOutlineIcon />} onClick={handleClick}>
         Hozzászólás
      </Button>
   )
}

export default CommentButton
