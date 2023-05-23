import React from 'react'

import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

const CommentButton: React.FC<{ commentRef: React.MutableRefObject<null | HTMLInputElement> }> = ({
   commentRef,
}) => {
   const handleClick = () => {
      if (commentRef) commentRef.current?.focus()
   }
   return (
      <Button disableRipple fullWidth startIcon={<ChatBubbleOutlineIcon />} onClick={handleClick}>
         Hozzászólás
      </Button>
   )
}

export default CommentButton
