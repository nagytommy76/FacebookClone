import React from 'react'

import ClickAwayListener from '@mui/base/ClickAwayListener'
import data from '@emoji-mart/data'
import {} from 'emoji-mart'
import Picker from '@emoji-mart/react'

const EmojiTooltipTitle: React.FC<{ handleCloseTooltip: () => void }> = ({ handleCloseTooltip }) => {
   const handleEmojiSelect = (event: any) => {
      console.log(event.native)
   }

   return (
      <ClickAwayListener onClickAway={handleCloseTooltip}>
         <div>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
         </div>
      </ClickAwayListener>
   )
}

export default EmojiTooltipTitle
