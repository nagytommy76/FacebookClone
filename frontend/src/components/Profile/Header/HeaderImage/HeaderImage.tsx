import React from 'react'
import useUploadFirebase from '../../../Posts/AddPost/AddDialog/Hooks/useUploadFirebase'
import useCheckPicture from './Hooks/useCheckPicture'
import useModalControl from './Hooks/useModalControl'
import usePictureMutate from './Hooks/usePictureMutate'

import { HeaderImage as HeaderImageStyle } from './Style'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import AddImage from '../../../Base/ImagePreview/AddImage'

const HeaderImage: React.FC<{ profilePicturePath: string }> = ({ profilePicturePath }) => {
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const { isButtonDisabled, setUploadedPictures, uploadedPictures } = useCheckPicture()
   const { handleCloseDialog, handleOpenDialog, isModalOpen } = useModalControl()
   const mutationFunction = usePictureMutate()

   const handleSetUploadPictures = async () => {
      if (!uploadedPictures) return
      // Először feltöltöm az 1DB képet firebase/userId/profileImage mappába ha ez megvan ->
      const uploadedPicturePath = await handleSingleImageUploadToFirebase(
         uploadedPictures.item(0) as File,
         'profilePicture'
      )
      console.log(uploadedPicturePath)
      // Elküldöm az adatbázisnak a visszakapott url-t
      mutationFunction(uploadedPicturePath as string)
   }
   return (
      <>
         <HeaderImageStyle
            onClick={handleOpenDialog}
            src={profilePicturePath || ''}
            alt='Profil kép'
            width={100}
            height={100}
         />
         <Dialog open={isModalOpen} onClose={handleCloseDialog}>
            <DialogTitle>Profilkép feltöltése</DialogTitle>
            <DialogContent>
               <AddImage
                  multiple={false}
                  setUploadedPictures={setUploadedPictures}
                  uploadedPictures={uploadedPictures}
               />
            </DialogContent>
            <DialogActions>
               <Button
                  onClick={handleSetUploadPictures}
                  disabled={isButtonDisabled}
                  fullWidth
                  variant='contained'
                  endIcon={<SendIcon />}>
                  Feltöltés
               </Button>
            </DialogActions>
         </Dialog>
      </>
   )
}

export default HeaderImage
