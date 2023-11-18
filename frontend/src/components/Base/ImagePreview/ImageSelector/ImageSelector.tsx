import { ChangeEvent } from 'react'
import { StyledImageInputField } from './Style'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const ImageSelector: React.FC<{
   maxFileCount: number
   addPictures: (e: ChangeEvent<HTMLInputElement>) => void
   multiple?: boolean
   size?: 'small' | 'medium' | 'large'
}> = ({ maxFileCount, addPictures, multiple = true, size = 'medium' }) => {
   return (
      <Tooltip title='Fénykép hozzáadása' placement='top' arrow>
         <IconButton component='label' size={size}>
            <AddPhotoAlternateIcon fontSize='inherit' />
            <StyledImageInputField
               type='file'
               accept='image/*'
               multiple={multiple}
               max={maxFileCount}
               onChange={addPictures}
               name='imageUpload'
               id='uploadImage'
            />
         </IconButton>
      </Tooltip>
   )
}

export default ImageSelector
