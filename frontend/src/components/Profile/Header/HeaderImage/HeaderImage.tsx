import React, { useState } from 'react'
import { HeaderImage as HeaderImageStyle } from './Style'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import AddImage from '../../../Base/ImagePreview/AddImage'

const HeaderImage: React.FC<{ profilePicturePath: string }> = ({ profilePicturePath }) => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)

   const handleSetUploadPictures = (event: React.ChangeEvent<HTMLInputElement>) => {}
   const handleOpenDialog = () => {
      setIsModalOpen(true)
   }
   const handleCloseDialog = () => {
      setIsModalOpen(false)
   }
   return (
      <>
         <HeaderImageStyle
            onClick={handleOpenDialog}
            src={profilePicturePath}
            alt='Profil kép'
            width={100}
            height={100}
         />
         <Dialog open={isModalOpen} onClose={handleCloseDialog}>
            <DialogTitle>Profilkép feltöltése</DialogTitle>
            <DialogContent>
               <AddImage setUploadedPictures={setUploadedPictures} uploadedPictures={uploadedPictures} />
            </DialogContent>
         </Dialog>
      </>
   )
}

export default HeaderImage
