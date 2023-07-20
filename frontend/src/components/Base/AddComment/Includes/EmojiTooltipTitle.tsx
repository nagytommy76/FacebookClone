import React from 'react'

import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/base/ClickAwayListener'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const EmojiTooltipTitle: React.FC<{ handleCloseTooltip: () => void }> = ({ handleCloseTooltip }) => {
   return (
      <ClickAwayListener onClickAway={handleCloseTooltip}>
         <div>
            <Picker data={data} onEmojiSelect={console.log} />
         </div>
      </ClickAwayListener>
   )
}

export default EmojiTooltipTitle
