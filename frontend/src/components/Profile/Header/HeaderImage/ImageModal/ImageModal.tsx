import React, { useContext } from 'react'
import { useAppSelector } from '@/reduxStore/store'
import { ProfileContext } from '../../../Context/ProfileContextProvider'

import useMutateSelectedPic from '../Hooks/useMutateSelectedPic'

import { StyledDialog, StyledUploadedPic, StyledImageContainer } from '../Style'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const ImageModal: React.FC<{
   isModalOpen: boolean
   handleCloseDialog: () => void
   AddImageComponent: React.ReactNode
   ImagePreviewComponent: React.ReactNode
   children: React.ReactNode
}> = ({ isModalOpen, AddImageComponent, ImagePreviewComponent, children, handleCloseDialog }) => {
   const userProfileImage = useAppSelector((state) => state.auth.currentImage)
   const {
      profileReducer: { initialUserDataState },
   } = useContext(ProfileContext)
   const { mutate } = useMutateSelectedPic()
   const handleSetCurrentPic = (modifyId: string) => {
      if (userProfileImage._id != modifyId) mutate(modifyId)
   }

   return (
      <StyledDialog open={isModalOpen} onClose={handleCloseDialog}>
         <DialogTitle variant='h4'>Profilkép feltöltése: {AddImageComponent}</DialogTitle>
         {ImagePreviewComponent}
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
