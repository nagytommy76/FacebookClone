import React from 'react'
import Image from 'next/image'

import useGetImgURL from './useGetImgURL'

import DialogContent from '@mui/material/DialogContent'

const ImagePreview: React.FC<{ uploadedPictures: FileList | null }> = ({ uploadedPictures = null }) => {
   const imagePreview = useGetImgURL(uploadedPictures)
   return (
      <>
         {imagePreview && uploadedPictures && (
            <DialogContent dividers>
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
