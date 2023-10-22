import { Dispatch, SetStateAction, useState } from 'react'

const useDialog = (setAddDialogOpen: Dispatch<SetStateAction<boolean>>) => {
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

   return {
      handleDialogClose,
      handleDialogCloseOnSuccess,
      setPostDescription,
      setUploadedPictures,
      postDescription,
      uploadedPictures,
   }
}

export default useDialog
