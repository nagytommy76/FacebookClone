import { useState } from 'react'
import usePostMutate from './Hooks/usePostMutate'

import TextInputField from './Includes/TextInputField'
import AddImage from './AddImage/AddImage'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

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
         <DialogTitle
            sx={{
               width: '100%',
               display: 'flex',
               justifyContent: 'space-between',
            }}>
            Bejegyzés létrehozása
            <IconButton onClick={handleCloseAddDialog}>
               <CloseIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent>
            <TextInputField onChange={chancgeTextField} textValue={postDescription} />
            <AddImage setUploadedPictures={setUploadedPictures} uploadedPictures={uploadedPictures} />
         </DialogContent>
         <DialogActions>
            <Button
               disabled={isSendBtnDisabled}
               onClick={(event) => postMutate(event)}
               fullWidth
               variant='contained'
               color='primary'>
               Közzététel
            </Button>
         </DialogActions>
      </Dialog>
   )
}

export default AddDialog
