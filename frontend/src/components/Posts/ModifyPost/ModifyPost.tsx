import React, { Dispatch, SetStateAction, useEffect, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'

import useDialog from '../AddPost/Hooks/useDialog'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

import DialogBody from '../AddPost/AddDialog/Includes/DialogBody'

const ModifyPost: React.FC<{ isOpen: boolean; setIsModifyDialogOpen: Dispatch<SetStateAction<boolean>> }> = ({
   isOpen,
   setIsModifyDialogOpen,
}) => {
   const {
      postsReducer: {
         singlePost: { description },
      },
   } = useContext(PostContext)
   const {
      postDescription,
      uploadedPictures,
      textAreaRef,
      setUploadedPictures,
      changeTextField,
      changeTextWithEmoji,
      setPostDescription,
      handleDialogCloseOnSuccess,
      handleDialogClose,
   } = useDialog(setIsModifyDialogOpen, () => {})
   // Megoldani esetleg, hogy a textAreaRef legyen egyben a postDescription is? Lehetne egyben a 2!??!
   useEffect(() => {
      setPostDescription(description)
      //   if (textAreaRef.current) {
      //      textAreaRef.current.value = postDescription
      //   }
      //   console.log(textAreaRef.current?.value)
   }, [description, setPostDescription])

   return (
      <Dialog
         fullWidth
         maxWidth='sm'
         open={isOpen}
         onClose={() => setIsModifyDialogOpen(false)}
         aria-labelledby='alert-dialog-title'
         aria-describedby='alert-dialog-description'
      >
         <DialogTitle id='alert-dialog-title'>{"Use Google's location service?"}</DialogTitle>
         <DialogBody
            changeTextField={changeTextField}
            changeTextWithEmoji={changeTextWithEmoji}
            setUploadedPictures={setUploadedPictures}
            postDescription={postDescription}
            textAreaRef={textAreaRef}
            uploadedPictures={uploadedPictures}
         />
         <DialogActions>
            <Button onClick={() => {}}>Disagree</Button>
            <Button onClick={() => {}} autoFocus>
               Agree
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default ModifyPost
