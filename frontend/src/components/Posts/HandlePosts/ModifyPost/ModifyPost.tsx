import React, { Dispatch, SetStateAction, useEffect, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'

import useDialog from '../AddPost/Hooks/useDialog'

import Dialog from '@mui/material/Dialog'

import DialogBody from '../Includes/DialogBody'
import DialogHeader from '../Includes/DialogHeader'
import ModifyButton from './Includes/ModifyButton'

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
      textAreaRef,
      changeTextField,
      changeTextWithEmoji,
      setPostDescription,
      handleDialogCloseOnSuccess,
      handleDialogClose,
   } = useDialog(setIsModifyDialogOpen, () => {})
   // Megoldani esetleg, hogy a textAreaRef legyen egyben a postDescription is? Lehetne egyben a 2!??!
   useEffect(() => {
      setPostDescription(description)
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
         <DialogHeader handleCloseAddDialog={handleDialogClose} headerText='módosítása' />
         <DialogBody
            changeTextField={changeTextField}
            changeTextWithEmoji={changeTextWithEmoji}
            postDescription={postDescription}
            textAreaRef={textAreaRef}
         />
         <ModifyButton modifiedDescription={postDescription} />
      </Dialog>
   )
}

export default ModifyPost
