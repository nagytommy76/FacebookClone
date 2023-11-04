import { useContext, ChangeEvent } from 'react'
import { ImageContext } from '@/src/components/Posts/HandlePosts/Context/ImageContextProvider'
import { StyledImageInputField } from './Style'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

const ImageSelector: React.FC<{
   maxFileCount: number
   multiple?: boolean
}> = ({ maxFileCount, multiple = true }) => {
   const { imageDispatch } = useContext(ImageContext)
   const addPictures = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) imageDispatch({ type: 'SET_IMAGES', payload: [...e.target.files] })
   }

   return (
      <Tooltip title='Fénykép hozzáadása' placement='top' arrow>
         <IconButton component='label'>
            <AddPhotoAlternateIcon />
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
