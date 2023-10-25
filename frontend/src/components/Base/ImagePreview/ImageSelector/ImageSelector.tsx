import React from 'react'
import { StyledImageInputField } from './Style'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const ImageSelector: React.FC<{
   maxFileCount: number
   handleSetUploadPictures: (event: React.ChangeEvent<HTMLInputElement>) => void
   multiple?: boolean
   selectedFilePreview?: string[]
}> = ({ maxFileCount, handleSetUploadPictures, multiple = true, selectedFilePreview = [] }) => {
   return (
      <Tooltip title='Fénykép hozzáadása' placement='top' arrow>
         <IconButton component='label'>
            <AddPhotoAlternateIcon />
            <StyledImageInputField
               type='file'
               accept='image/*'
               multiple={multiple}
               max={maxFileCount}
               onChange={handleSetUploadPictures}
               name='imageUpload'
               id='uploadImage'
            />
         </IconButton>
      </Tooltip>
   )
}

export default ImageSelector
