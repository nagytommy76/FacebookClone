import React from 'react'

import ClickAwayListener from '@mui/base/ClickAwayListener'
import data from '@emoji-mart/data'
// import {} from 'emoji-mart'
import Picker from '@emoji-mart/react'

const EmojiTooltipTitle: React.FC<{
   handleCloseTooltip: () => void
   handleChangeTextWithEmoji: (emoji?: string) => void
}> = ({ handleCloseTooltip, handleChangeTextWithEmoji }) => {
   const handleEmojiSelect = (event: any) => {
      console.log(event.native)
      handleChangeTextWithEmoji(event.native)

      // https://medium.com/weekly-webtips/how-to-add-an-emoji-picker-to-an-input-field-in-react-app-d41a2966fcc1
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
