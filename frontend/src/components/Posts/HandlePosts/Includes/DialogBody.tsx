import React, { ChangeEvent, useContext } from 'react'
import { ImageContext } from '@/src/components/Posts/HandlePosts/Context/ImageContextProvider'

import TextInputField from './TextInputField'
import AddEmojiButton from '@/Base/EmojiPicker/AddEmojiButton'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
import ImagePreview from '@/Base/ImagePreview/ImagePreview'

import { IconsFooterStyle } from '../AddPost/AddDialog/Styles'
import DialogContent from '@mui/material/DialogContent'

const DialogBody: React.FC<{
   changeTextField: (event: ChangeEvent<HTMLInputElement>) => void
   changeTextWithEmoji: (emoji?: string) => void
   postDescription: string
   textAreaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>
}> = ({ changeTextField, changeTextWithEmoji, postDescription, textAreaRef }) => {
   const { imageDispatch } = useContext(ImageContext)
   const addPictures = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) imageDispatch({ type: 'SET_IMAGES', payload: [...e.target.files] })
   }

   return (
      <DialogContent>
         <TextInputField textAreaRef={textAreaRef} onChange={changeTextField} textValue={postDescription} />
         <IconsFooterStyle>
            <ImageSelector maxFileCount={3} addPictures={addPictures} />
            <AddEmojiButton size='medium' handleChangeTextWithEmoji={changeTextWithEmoji} />
         </IconsFooterStyle>
         <ImagePreview />
      </DialogContent>
   )
}

export default DialogBody
