import { useState, Dispatch, SetStateAction } from 'react'
import dynamic from 'next/dynamic'
import useDialog from '../Hooks/useDialog'
import usePostMutate from './Hooks/usePostMutate'
import useSnack from '../Hooks/useSnack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

import type { IPost } from '@/src/types/PostTypes'
import DialogHeader from './Includes/DialogHeader'
import DialogBody from './Includes/DialogBody'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

const InformSnackbar = dynamic(() => import('../Includes/InformSnackbar'))

const AddDialog: React.FC<{
   openAddDialog: boolean
   addNewPost: (newPost: IPost) => void
   setAddDialogOpen: Dispatch<SetStateAction<boolean>>
}> = ({ openAddDialog, addNewPost, setAddDialogOpen }) => {
   const [isSendBtnDisabled, setIsSendBtnDisabled] = useState<boolean>(true)
   const theme = useTheme()
   const isFullScreen = useMediaQuery(theme.breakpoints.down('md'))
   const {
      postDescription,
      uploadedPictures,
      textAreaRef,
      setUploadedPictures,
      changeTextField,
      changeTextWithEmoji,
      handleDialogCloseOnSuccess,
      handleDialogClose,
   } = useDialog(setAddDialogOpen, setIsSendBtnDisabled)
   const { handleSnackClose, handleSnackOpenIfSuccess, isSnackOpen } = useSnack()
   const { isLoading, postMutate } = usePostMutate(
      postDescription,
      uploadedPictures,
      handleSnackOpenIfSuccess,
      handleDialogCloseOnSuccess,
      setIsSendBtnDisabled,
      addNewPost
   )

   return (
      <>
         <Dialog
            fullWidth
            fullScreen={isFullScreen}
            maxWidth='sm'
            open={openAddDialog}
            onClose={handleDialogClose}
         >
            <DialogHeader handleCloseAddDialog={handleDialogClose} />
            <DialogBody
               changeTextField={changeTextField}
               changeTextWithEmoji={changeTextWithEmoji}
               setUploadedPictures={setUploadedPictures}
               textAreaRef={textAreaRef}
               uploadedPictures={uploadedPictures}
               postDescription={postDescription}
            />
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
