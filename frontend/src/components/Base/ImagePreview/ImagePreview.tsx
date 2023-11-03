import React, { useContext } from 'react'
import { ImageContext } from '../../Posts/HandlePosts/Context/ImageContextProvider'

import ImageView from './Includes/ImageView'

const ImagePreview = () => {
   const {
      imageReducer: { uploadedImages, newUploadedImages },
      imageDispatch,
   } = useContext(ImageContext)

   const handleRemoveFromNewImages = (filePreview: string) => {
      console.log(filePreview)
      imageDispatch({ type: 'REMOVE_NEW_SINGLE_IMAGE', payload: filePreview })
   }
   const handleRemoveFromUploadedImages = (filePreview: string) => {
      imageDispatch({ type: 'REMOVE_SINGLE_IMAGE', payload: filePreview })
   }

   return (
      <>
         {newUploadedImages !== null && (
            <ImageView
               selectedFilePreview={newUploadedImages}
               handleRemoveFromImages={handleRemoveFromNewImages}
            />
         )}
         {uploadedImages !== null && (
            <ImageView
               selectedFilePreview={uploadedImages}
               handleRemoveFromImages={handleRemoveFromUploadedImages}
            />
         )}
      </>
   )
}

export default ImagePreview
