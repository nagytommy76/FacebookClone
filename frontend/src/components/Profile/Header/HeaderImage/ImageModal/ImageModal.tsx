import React, { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'

import useMutateSelectedPic from '../Hooks/useMutateSelectedPic'

import { StyledDialog, StyledUploadedPic, StyledImageContainer } from '../Style'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import ImagePreview from './ImagePreview'

const ImageModal: React.FC<{
   isModalOpen: boolean
   AddImage: React.ReactNode
   children: React.ReactNode
   uploadedPictures?: FileList | null
   handleCloseDialog: () => void
}> = ({ isModalOpen, AddImage, children, uploadedPictures = null, handleCloseDialog }) => {
   const {
      profileReducer: { initialUserDataState },
      selectSelectedProfilePicture,
   } = useContext(ProfileContext)
   const { mutate } = useMutateSelectedPic()
   const handleSetCurrentPic = (modifyId: string) => {
      if (selectSelectedProfilePicture()?._id != modifyId) mutate(modifyId)
   }

   return (
      <StyledDialog open={isModalOpen} onClose={handleCloseDialog}>
         <DialogTitle variant='h4'>Profilkép feltöltése: {AddImage}</DialogTitle>
         <ImagePreview uploadedPictures={uploadedPictures} />
         <DialogTitle>Jelenlegi profilkép módosítása</DialogTitle>
         <DialogContent>
            <StyledImageContainer>
               {initialUserDataState.userDetails?.profilePicturePath.map((image) => (
                  <StyledUploadedPic
                     isHighlighted={image.isSelected}
                     key={image._id}
                     alt='image'
                     src={image.path}
                     onClick={() => handleSetCurrentPic(image._id)}
                     width={150}
                     height={150}
                  />
               ))}
            </StyledImageContainer>
         </DialogContent>
         <DialogActions>{children}</DialogActions>
      </StyledDialog>
   )
}

export default ImageModal
