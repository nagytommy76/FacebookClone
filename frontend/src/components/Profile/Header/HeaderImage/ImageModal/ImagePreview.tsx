import React from 'react'
import Image from 'next/image'

import useGetImgURL from './useGetImgURL'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogContent from '@mui/material/DialogContent'

const ImagePreview: React.FC<{ uploadedPictures: FileList | null; removePicture: () => void }> = ({
   uploadedPictures = null,
   removePicture,
}) => {
   const imagePreview = useGetImgURL(uploadedPictures)
   return (
      <>
         {imagePreview && uploadedPictures && (
            <DialogContent dividers sx={{ position: 'relative' }}>
               <Tooltip title='Fénykép törlése' arrow placement='top'>
                  <IconButton
                     onClick={removePicture}
                     sx={{ position: 'absolute', right: 15, top: 15 }}
                     aria-label='delete'
                     size='large'
                     color='warning'
                  >
                     <DeleteIcon fontSize='inherit' />
                  </IconButton>
               </Tooltip>
               <Image
                  style={{ objectFit: 'cover' }}
                  src={imagePreview}
                  alt='uploaded_image'
                  width={175}
                  height={175}
               />
            </DialogContent>
         )}
      </>
   )
}

export default ImagePreview
