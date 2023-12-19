import React from 'react'
import Image from 'next/image'

import useGetImgURL from './useGetImgURL'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import DialogContent from '@mui/material/DialogContent'
import Collapse from '@mui/material/Collapse'

const ImagePreview: React.FC<{ uploadedPictures: FileList | null; removePicture: () => void }> = ({
   uploadedPictures = null,
   removePicture,
}) => {
   const imagePreview = useGetImgURL(uploadedPictures)
   return (
      <Collapse timeout={180} in={uploadedPictures !== null}>
         {imagePreview && (
            <DialogContent sx={{ position: 'relative', width: '275px', minHeight: '200px' }}>
               <Tooltip title='Fénykép törlése' arrow placement='top'>
                  <IconButton
                     onClick={removePicture}
                     sx={{ position: 'absolute', right: 10, top: 12 }}
                     aria-label='delete'
                     size='medium'
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
      </Collapse>
   )
}

export default ImagePreview
