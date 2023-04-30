import { useState } from 'react'

const useDialog = () => {
   const [postDescription, setPostDescription] = useState<string>('')
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)
   const [addDialogOpen, setAddDialogOpen] = useState<boolean>(false)

   const handleDialogClickOpen = () => {
      setAddDialogOpen(true)
   }
   const handleDialogClose = () => {
      setAddDialogOpen(false)
   }

   const handleDialogCloseOnSuccess = () => {
      setPostDescription('')
      setUploadedPictures(null)
      setAddDialogOpen(false)
   }

   return {
      handleDialogClickOpen,
      handleDialogClose,
      handleDialogCloseOnSuccess,
      setPostDescription,
      setUploadedPictures,
      postDescription,
      addDialogOpen,
      uploadedPictures,
   }
}

export default useDialog
