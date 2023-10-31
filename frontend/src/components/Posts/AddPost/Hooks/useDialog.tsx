import { Dispatch, SetStateAction, useState, ChangeEvent, useRef } from 'react'
import useEmojiText from '@/hooks/useEmojiText'

const useDialog = (
   setAddDialogOpen: Dispatch<SetStateAction<boolean>>,
   setIsSendBtnDisabled: Dispatch<SetStateAction<boolean>>
) => {
   const [postDescription, setPostDescription] = useState<string>('')
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)
   const textAreaRef = useRef<HTMLTextAreaElement>()
   const changeTextEmoji = useEmojiText(textAreaRef, setPostDescription)

   const handleDialogClose = () => {
      setAddDialogOpen(false)
   }

   const handleDialogCloseOnSuccess = () => {
      setPostDescription('')
      setUploadedPictures(null)
      setAddDialogOpen(false)
   }

   const changeTextWithEmoji = (emoji: string = '') => {
      if (postDescription.length === 0) setIsSendBtnDisabled(true)
      else setIsSendBtnDisabled(false)
      changeTextEmoji(emoji)
   }

   const changeTextField = (event: ChangeEvent<HTMLInputElement>) => {
      setPostDescription(event.target.value)
      setIsSendBtnDisabled(event.target.value.length <= 1)
   }

   return {
      changeTextWithEmoji,
      changeTextField,
      handleDialogClose,
      handleDialogCloseOnSuccess,
      setUploadedPictures,
      setPostDescription,
      postDescription,
      uploadedPictures,
      textAreaRef,
   }
}

export default useDialog
