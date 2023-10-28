import { Dispatch, SetStateAction, useState } from 'react'

const useDialog = (
   setAddDialogOpen: Dispatch<SetStateAction<boolean>>,
   setIsSendBtnDisabled: Dispatch<SetStateAction<boolean>>
) => {
   const [postDescription, setPostDescription] = useState<string>('')
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)

   const handleDialogClose = () => {
      setAddDialogOpen(false)
   }

   const handleDialogCloseOnSuccess = () => {
      setPostDescription('')
      setUploadedPictures(null)
      setAddDialogOpen(false)
   }

   const changeTextWithEmoji = (emoji: string = '') => {
      // console.log(event.target.selectionStart)
      setPostDescription(`${postDescription}${emoji}`)
   }

   const changeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.selectionStart)
      setPostDescription(event.target.value)
      setIsSendBtnDisabled(event.target.value.length <= 1)
   }

   return {
      changeTextWithEmoji,
      changeTextField,
      handleDialogClose,
      handleDialogCloseOnSuccess,
      setUploadedPictures,
      postDescription,
      uploadedPictures,
   }
}

export default useDialog
