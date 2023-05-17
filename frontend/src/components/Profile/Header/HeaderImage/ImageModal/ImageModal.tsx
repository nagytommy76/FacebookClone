import React, { useContext } from 'react'
import { ProfileContext } from '../../../Context/ProfileContextProvider'
import { UserDataActions } from '../../../Context/ProfileReducer'

import { StyledDialog, StyledUploadedPic, StyledImageContainer } from '../Style'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import useMutateSelectedPic from '../Hooks/useMutateSelectedPic'

const ImageModal: React.FC<{
   isModalOpen: boolean
   AddImage: React.ReactNode
   children: React.ReactNode
   handleCloseDialog: () => void
}> = ({ isModalOpen, AddImage, children, handleCloseDialog }) => {
   const { profileReducer } = useContext(ProfileContext)
   const { mutate } = useMutateSelectedPic()

   const handleSetCurrentPic = (modifyId: string) => {
      if (profileReducer.getSelectedProfilePicture()?._id != modifyId) mutate(modifyId)
   }

   return (
      <StyledDialog open={isModalOpen} onClose={handleCloseDialog}>
         <DialogTitle>Profilkép feltöltése</DialogTitle>
         <DialogContent dividers>{AddImage}</DialogContent>
         <DialogTitle>Jelenlegi profilkép módosítása</DialogTitle>
         <DialogContent>
            <StyledImageContainer>
               {profileReducer.getEveryProfilePictures().map((image) => (
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
