import React, { useState } from 'react'

import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AddReactionIcon from '@mui/icons-material/AddReaction'

import EmojiTooltipTitle from './EmojiTooltipTitle'

const AddEmojiButton = () => {
   const [openTooltip, setOpenTooltip] = useState<boolean>(false)
   const handleCloseTooltip = () => setOpenTooltip(false)
   const handleOpenTooltip = () => setOpenTooltip(true)

   return (
      <Tooltip
         open={openTooltip}
         title={<EmojiTooltipTitle handleCloseTooltip={handleCloseTooltip} />}
         arrow
         placement='top-end'
      >
         <IconButton
            sx={{
               color: 'primary.main',
            }}
            onClick={handleOpenTooltip}
            type='button'
            size='small'
            aria-label='add-reaction-emoji'
         >
            <AddReactionIcon fontSize='inherit' />
         </IconButton>
      </Tooltip>
   )
}

export default AddEmojiButton
