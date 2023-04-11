import { useState } from 'react'
import usePostMutate from './Hooks/usePostMutate'

import TextInputField from './Includes/TextInputField'
import AddImage from './AddImage/AddImage'
import DialogHeader from './Includes/DialogHeader'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

const AddDialog: React.FC<{ openAddDialog: boolean; handleCloseAddDialog: () => void }> = ({
   handleCloseAddDialog,
   openAddDialog,
}) => {
   const [postDescription, setPostDescription] = useState<string>('')
   const [isSendBtnDisabled, setIsSendBtnDisabled] = useState<boolean>(true)
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)
   const { data, isLoading, postMutate } = usePostMutate(postDescription, uploadedPictures)
   const chancgeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPostDescription(event.target.value)
      setIsSendBtnDisabled(event.target.value.length <= 1)
   }

   return (
      <Dialog fullWidth maxWidth='sm' open={openAddDialog} onClose={handleCloseAddDialog}>
         <DialogHeader handleCloseAddDialog={handleCloseAddDialog} />
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
               color='primary'>
               Közzététel
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}

export default AddDialog
