import React, { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import AddReactionIcon from '@mui/icons-material/AddReaction'

import EmojiTooltipTitle from './EmojiTooltipTitle'

import { StyledEmojiTooltip } from './Styles'

const AddEmojiButton: React.FC<{
   size?: 'small' | 'medium' | 'large'
   handleChangeTextWithEmoji: (emoji?: string) => void
}> = ({ handleChangeTextWithEmoji, size = 'small' }) => {
   const [openTooltip, setOpenTooltip] = useState<boolean>(false)
   const handleCloseTooltip = () => setOpenTooltip(false)
   const handleOpenTooltip = () => setOpenTooltip(true)

   return (
      <StyledEmojiTooltip
         open={openTooltip}
         title={
            <EmojiTooltipTitle
               handleChangeTextWithEmoji={handleChangeTextWithEmoji}
               handleCloseTooltip={handleCloseTooltip}
            />
         }
         arrow
         placement='top-end'
      >
         <IconButton
            sx={{
               color: 'primary.main',
            }}
            onClick={handleOpenTooltip}
            type='button'
            size={size}
            aria-label='add-reaction-emoji'
         >
            <AddReactionIcon fontSize='inherit' />
         </IconButton>
      </StyledEmojiTooltip>
   )
}

export default AddEmojiButton
