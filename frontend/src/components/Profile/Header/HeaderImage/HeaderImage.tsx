import React from 'react'
import dynamic from 'next/dynamic'
import type { IProfilePicture } from '@/src/types/PostTypes'

import useCheckPicture from './Hooks/useCheckPicture'
import useModalControl from './Hooks/useModalControl'
import useGetSelectedPic from './Hooks/useGetSelectedPic'

import ProfilePic from '@/assets/facebook-profile.jpg'
import { HeaderImage as HeaderImageStyle } from './Style'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import ImagePreview from './ImageModal/ImagePreview'
import ImageSelector from '@/Base/ImagePreview/ImageSelector/ImageSelector'
const ImageModal = dynamic(() => import('./ImageModal/ImageModal'))

const HeaderImage: React.FC<{ profileImagePath: IProfilePicture[] }> = ({ profileImagePath }) => {
   const { isButtonDisabled, uploadedPictures, addPicture, removePicture, handleSetUploadPictures } =
      useCheckPicture()
   const { handleCloseDialog, handleOpenDialog, isModalOpen } = useModalControl()
   const selectedProfileImg = useGetSelectedPic(profileImagePath)

   return (
      <>
         <HeaderImageStyle
            onClick={handleOpenDialog}
            src={selectedProfileImg || ProfilePic}
            alt='Profil kép'
            width={200}
            height={200}
         />
         <ImageModal
            isModalOpen={isModalOpen}
            handleCloseDialog={handleCloseDialog}
            AddImageComponent={<ImageSelector addPictures={addPicture} maxFileCount={1} multiple={false} />}
            ImagePreviewComponent={
               <ImagePreview removePicture={removePicture} uploadedPictures={uploadedPictures} />
            }
         >
            <Button
               onClick={handleSetUploadPictures}
               disabled={isButtonDisabled}
               fullWidth
               variant='contained'
               endIcon={<SendIcon />}
            >
               Feltöltés
            </Button>
         </ImageModal>
      </>
   )
}

export default HeaderImage
