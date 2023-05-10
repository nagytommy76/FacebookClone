import React from 'react'
import { StyledImageInputField } from './Style'

const ImageSelector: React.FC<{
   maxFileCount: number
   handleSetUploadPictures: (event: React.ChangeEvent<HTMLInputElement>) => void
   multiple?: boolean
}> = ({ maxFileCount, handleSetUploadPictures, multiple = true }) => {
   return (
      <StyledImageInputField
         type='file'
         accept='image/*'
         multiple={multiple}
         max={maxFileCount}
         onChange={handleSetUploadPictures}
         name='imageUpload'
         id='uploadImage'
      />
   )
}

export default ImageSelector
