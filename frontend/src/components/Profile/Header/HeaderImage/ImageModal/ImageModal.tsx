import React from 'react'
import useGetCurrentPictures from '../Hooks/useGetCurrentPictures'

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
   const { currentProfilePictures, isLoading, setCurrentProfilePictures } = useGetCurrentPictures()
   const { mutate } = useMutateSelectedPic(setCurrentProfilePictures)

   const handleSetCurrentPic = (modifyId: string) => {
      mutate(modifyId)
   }

   return (
      <StyledDialog open={isModalOpen} onClose={handleCloseDialog}>
         <DialogTitle>Profilkép feltöltése</DialogTitle>
         <DialogContent dividers>{AddImage}</DialogContent>
         <DialogTitle>Jelenlegi profilkép módosítása</DialogTitle>
         <DialogContent>
            {isLoading ? (
               <p>Töltés...</p>
            ) : (
               <StyledImageContainer>
                  {currentProfilePictures?.map((image) => (
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
            )}
         </DialogContent>
         <DialogActions>{children}</DialogActions>
      </StyledDialog>
   )
}

export default ImageModal
