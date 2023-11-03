import React, { ChangeEvent } from 'react'

import TextInputField from './TextInputField'
import AddEmojiButton from '@/Base/EmojiPicker/AddEmojiButton'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
import ImagePreview from '@/Base/ImagePreview/ImagePreview'

import { IconsFooterStyle } from '../Styles'
import DialogContent from '@mui/material/DialogContent'

const DialogBody: React.FC<{
   changeTextField: (event: ChangeEvent<HTMLInputElement>) => void
   changeTextWithEmoji: (emoji?: string) => void
   postDescription: string
   textAreaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>
}> = ({ changeTextField, changeTextWithEmoji, postDescription, textAreaRef }) => {
   return (
      <DialogContent>
         <TextInputField textAreaRef={textAreaRef} onChange={changeTextField} textValue={postDescription} />
         <IconsFooterStyle>
            <ImageSelector maxFileCount={3} />
            <AddEmojiButton size='medium' handleChangeTextWithEmoji={changeTextWithEmoji} />
         </IconsFooterStyle>
         <ImagePreview />
      </DialogContent>
   )
}

export default DialogBody
