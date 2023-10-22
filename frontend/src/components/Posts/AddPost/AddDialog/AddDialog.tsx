import { useState, Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic'
import useDialog from '../Hooks/useDialog'
import usePostMutate from './Hooks/usePostMutate'
import useSnack from '../Hooks/useSnack'

import type { IPost } from '@/src/types/PostTypes'

import TextInputField from './Includes/TextInputField'
import AddImage from '../../../Base/ImagePreview/AddImage'
import DialogHeader from './Includes/DialogHeader'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

const InformSnackbar = dynamic(() => import('../Includes/InformSnackbar'))

const AddDialog: React.FC<{
   openAddDialog: boolean
   addNewPost: (newPost: IPost) => void
   setAddDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({ openAddDialog, addNewPost, setAddDialogOpen }) => {
   const [isSendBtnDisabled, setIsSendBtnDisabled] = useState<boolean>(true)
   const {
      postDescription,
      uploadedPictures,
      setPostDescription,
      setUploadedPictures,
      handleDialogCloseOnSuccess,
      handleDialogClose,
   } = useDialog(setAddDialogOpen)
   const { handleSnackClose, handleSnackOpenIfSuccess, isSnackOpen } = useSnack()
   const { isLoading, postMutate } = usePostMutate(
      postDescription,
      uploadedPictures,
      handleSnackOpenIfSuccess,
      handleDialogCloseOnSuccess,
      setIsSendBtnDisabled,
      addNewPost
   )

   const chancgeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPostDescription(event.target.value)
      setIsSendBtnDisabled(event.target.value.length <= 1)
   }

   return (
      <>
         <Dialog fullWidth maxWidth='sm' open={openAddDialog} onClose={handleDialogClose}>
            <DialogHeader handleCloseAddDialog={handleDialogClose} />
            <DialogContent>
               <TextInputField onChange={chancgeTextField} textValue={postDescription} />
               <AddImage setUploadedPictures={setUploadedPictures} uploadedPictures={uploadedPictures} />
            </DialogContent>
            <DialogActions>
               <LoadingButton
                  disabled={isSendBtnDisabled}
                  onClick={(event) => postMutate(event)}
                  loading={isLoading}
                  loadingPosition='start'
                  startIcon={<SendIcon />}
                  fullWidth
                  variant='contained'
                  color='primary'
               >
                  Közzététel
               </LoadingButton>
            </DialogActions>
         </Dialog>
         <InformSnackbar
            handleClose={handleSnackClose}
            message={isSnackOpen.msg}
            isOpen={isSnackOpen.isOpen}
         />
      </>
   )
}

export default AddDialog
