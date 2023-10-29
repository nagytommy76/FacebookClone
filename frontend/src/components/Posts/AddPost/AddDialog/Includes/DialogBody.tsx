import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'

import TextInputField from './TextInputField'
import AddEmojiButton from '@/Base/EmojiPicker/AddEmojiButton'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
import ImagePreview from '@/Base/ImagePreview/ImagePreview'

import { IconsFooterStyle } from '../Styles'
import DialogContent from '@mui/material/DialogContent'

const DialogBody: React.FC<{
   setUploadedPictures: Dispatch<SetStateAction<FileList | null>>
   changeTextField: (event: ChangeEvent<HTMLInputElement>) => void
   changeTextWithEmoji: (emoji?: string) => void
   postDescription: string
   uploadedPictures: FileList | null
   textAreaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>
}> = ({
   setUploadedPictures,
   changeTextField,
   changeTextWithEmoji,
   postDescription,
   uploadedPictures,
   textAreaRef,
}) => {
   return (
      <DialogContent>
         <TextInputField textAreaRef={textAreaRef} onChange={changeTextField} textValue={postDescription} />
         <IconsFooterStyle>
            <ImageSelector
               maxFileCount={3}
               handleSetUploadPictures={(e: ChangeEvent<HTMLInputElement>) =>
                  setUploadedPictures(e.target.files)
               }
            />
            <AddEmojiButton size='medium' handleChangeTextWithEmoji={changeTextWithEmoji} />
         </IconsFooterStyle>
         <ImagePreview uploadedPictures={uploadedPictures} />
      </DialogContent>
   )
}

export default DialogBody
