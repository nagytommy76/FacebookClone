import React from 'react'
import { StyledImageInputField, StyledLabelAsButton } from './Style'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

const ImageSelector: React.FC<{
   maxFileCount: number
   handleSetUploadPictures: (event: React.ChangeEvent<HTMLInputElement>) => void
   multiple?: boolean
   selectedFilePreview?: string[]
}> = ({ maxFileCount, handleSetUploadPictures, multiple = true, selectedFilePreview = [] }) => {
   return (
      <>
         <StyledLabelAsButton htmlFor='uploadImage'>
            <AddPhotoAlternateIcon />
            Válassz fényképeket {selectedFilePreview?.length}
         </StyledLabelAsButton>
         <StyledImageInputField
            type='file'
            accept='image/*'
            multiple={multiple}
            max={maxFileCount}
            onChange={handleSetUploadPictures}
            name='imageUpload'
            id='uploadImage'
         />
      </>
   )
}

export default ImageSelector
