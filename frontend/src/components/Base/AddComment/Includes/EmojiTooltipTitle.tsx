import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ClickAwayListener from '@mui/base/ClickAwayListener'

const EmojiHexUnicodes = [
   '&#x1F600;',
   '&#x1F601;',
   '&#x1F602;',
   '&#x1F923;',
   '&#x1F603;',
   '&#x1F604;',
   '&#x1F605;',
   '&#x1F606;',
   '&#x1F60B;',
]

const EmojiTooltipTitle: React.FC<{ handleCloseTooltip: () => void }> = ({ handleCloseTooltip }) => {
   return (
      <ClickAwayListener onClickAway={handleCloseTooltip}>
         <Box>
            {EmojiHexUnicodes.map((emoji, index) => (
               //    <Typography  key={index}>{emoji}</Typography>
               <span key={index} role='img' aria-label='dog'>
                  {emoji}
               </span>
            ))}
         </Box>
      </ClickAwayListener>
   )
}

export default EmojiTooltipTitle
