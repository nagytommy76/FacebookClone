import React from 'react'

import Button from '@mui/material/Button'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

const CommentButton: React.FC<{ setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>> }> = ({
   setIsCollapsed,
}) => {
   return (
      <Button
         disableRipple
         fullWidth
         startIcon={<ChatBubbleOutlineIcon />}
         onClick={() => setIsCollapsed((prevState) => !prevState)}>
         Hozzászólás
      </Button>
   )
}

export default CommentButton
