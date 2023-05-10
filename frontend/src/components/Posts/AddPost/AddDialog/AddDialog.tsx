import { useState } from 'react'
import type { AxiosResponse } from 'axios'
import type { UseMutateFunction } from '@tanstack/react-query'

import TextInputField from './Includes/TextInputField'
import AddImage from '../../../Base/ImagePreview/AddImage'
import DialogHeader from './Includes/DialogHeader'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import LoadingButton from '@mui/lab/LoadingButton'
import SendIcon from '@mui/icons-material/Send'

const AddDialog: React.FC<{
   openAddDialog: boolean
   uploadedPictures: FileList | null
   postDescription: string
   isLoading: boolean
   handleCloseAddDialog: () => void
   setUploadedPictures: React.Dispatch<React.SetStateAction<FileList | null>>
   setPostDescription: React.Dispatch<React.SetStateAction<string>>
   postMutate: UseMutateFunction<AxiosResponse<any, any>, unknown, React.FormEvent<Element>, unknown>
}> = ({
   handleCloseAddDialog,
   openAddDialog,
   setUploadedPictures,
   setPostDescription,
   postDescription,
   uploadedPictures,
   postMutate,
   isLoading,
}) => {
   const [isSendBtnDisabled, setIsSendBtnDisabled] = useState<boolean>(true)
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
