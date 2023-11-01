import React, { Dispatch, SetStateAction, useEffect, useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'

import useDialog from '../AddPost/Hooks/useDialog'

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
         singlePost: { description, postedPicturesPath },
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
            setUploadedPictures={setUploadedPictures}
            postDescription={postDescription}
            textAreaRef={textAreaRef}
            uploadedPictures={uploadedPictures}
         />
         <DialogActions>
            <LoadingButton
               // disabled={isSendBtnDisabled}
               // onClick={(event) => postMutate(event)}
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
