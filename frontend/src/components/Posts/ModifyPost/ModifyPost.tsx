import React, { Dispatch, SetStateAction, useEffect, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'

import useDialog from '../AddPost/Hooks/useDialog'
import useModifyPost from './Hooks/useModifyPost'

import LoadingButton from '@mui/lab/LoadingButton'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

import DialogBody from '../AddPost/AddDialog/Includes/DialogBody'
import DialogHeader from '../AddPost/AddDialog/Includes/DialogHeader'

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
   const { updatePostMutate } = useModifyPost()
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
         <DialogActions>
            <LoadingButton
               // disabled={isSendBtnDisabled}
               onClick={() => updatePostMutate(postDescription)}
               loading={false}
               loadingPosition='start'
               startIcon={<EditIcon />}
               fullWidth
               variant='contained'
               color='primary'
            >
               Közzététel
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default ModifyPost
