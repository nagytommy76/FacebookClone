import React, { useContext } from 'react'
import { ProfileContext } from '../../Context/ProfileContextProvider'
import dynamic from 'next/dynamic'
import useUploadFirebase from '../../../Posts/AddPost/AddDialog/Hooks/useUploadFirebase'
import useCheckPicture from './Hooks/useCheckPicture'
import useModalControl from './Hooks/useModalControl'
import usePictureMutate from './Hooks/usePictureMutate'

import { HeaderImage as HeaderImageStyle } from './Style'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import AddImage from '../../../Base/ImagePreview/AddImage'
const ImageModal = dynamic(() => import('./ImageModal/ImageModal'))

const HeaderImage = () => {
   const { handleSingleImageUploadToFirebase } = useUploadFirebase()
   const { profileReducer } = useContext(ProfileContext)
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
            src={profileReducer.getSelectedProfilePicture()?.path || ''}
            alt='Profil kép'
            width={100}
            height={100}
         />
         <ImageModal
            isModalOpen={isModalOpen}
            handleCloseDialog={handleCloseDialog}
            AddImage={
               <AddImage
                  multiple={false}
                  setUploadedPictures={setUploadedPictures}
                  uploadedPictures={uploadedPictures}
               />
            }>
            <Button
               onClick={handleSetUploadPictures}
               disabled={isButtonDisabled}
               fullWidth
               variant='contained'
               endIcon={<SendIcon />}>
               Feltöltés
            </Button>
         </ImageModal>
      </>
   )
}

export default HeaderImage
