import React, { useContext } from 'react'
import dynamic from 'next/dynamic'

import { ProfileContext } from '../../Context/ProfileContextProvider'
import useCheckPicture from './Hooks/useCheckPicture'
import useModalControl from './Hooks/useModalControl'

import ProfilePic from '../../../../assets/facebook-profile.jpg'
import { HeaderImage as HeaderImageStyle } from './Style'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

import ImageSelector from '../../../Base/ImagePreview/ImageSelector/ImageSelector'
const ImageModal = dynamic(() => import('./ImageModal/ImageModal'))

const HeaderImage = () => {
   const { selectSelectedProfilePicture } = useContext(ProfileContext)
   const { isButtonDisabled, addPictures, handleSetUploadPictures } = useCheckPicture()
   const { handleCloseDialog, handleOpenDialog, isModalOpen } = useModalControl()

   return (
      <>
         <HeaderImageStyle
            onClick={handleOpenDialog}
            src={selectSelectedProfilePicture()?.path || ProfilePic}
            alt='Profil kép'
            width={100}
            height={100}
         />
         <ImageModal
            isModalOpen={isModalOpen}
            handleCloseDialog={handleCloseDialog}
            AddImage={<ImageSelector addPictures={addPictures} maxFileCount={1} multiple={false} />}
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
