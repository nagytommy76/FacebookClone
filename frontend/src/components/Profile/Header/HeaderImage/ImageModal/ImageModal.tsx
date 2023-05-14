import React from 'react'
import Image from 'next/image'
import useGetCurrentPictures from '../Hooks/useGetCurrentPictures'

import { StyledDialog, StyledUploadedPic, StyledImageContainer } from '../Style'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const ImageModal: React.FC<{
   isModalOpen: boolean
   AddImage: React.ReactNode
   children: React.ReactNode
   handleCloseDialog: () => void
}> = ({ isModalOpen, AddImage, children, handleCloseDialog }) => {
   const { currentProfilePictures, isLoading } = useGetCurrentPictures()
   return (
      <StyledDialog open={isModalOpen} onClose={handleCloseDialog}>
         <DialogTitle>Profilkép feltöltése</DialogTitle>
         <DialogContent dividers>{AddImage}</DialogContent>
         <DialogTitle>Jelenlegi képek</DialogTitle>
         <DialogContent>
            {isLoading ? (
               <p>Töltés...</p>
            ) : (
               <StyledImageContainer>
                  {currentProfilePictures?.map((image, index) => (
                     <StyledUploadedPic
                        isHighlighted={image.isSelected}
                        key={index}
                        alt='image'
                        src={image.path}
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
