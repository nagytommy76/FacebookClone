import React from 'react'

import { AddedImageContainer, StyledAddedImage, StyledCloseIconBtn } from './Styles'
import DeleteIcon from '@mui/icons-material/Delete'

const DisplayCommentImage: React.FC<{
   commentImagePath: FileList
   setCommentImagePath: React.Dispatch<React.SetStateAction<FileList | null>>
}> = ({ commentImagePath, setCommentImagePath }) => {
   const removeImgOnClick = () => {
      setCommentImagePath(null)
   }

   return (
      <AddedImageContainer>
         <StyledCloseIconBtn onClick={removeImgOnClick}>
            <DeleteIcon />
         </StyledCloseIconBtn>
         <StyledAddedImage
            src={URL.createObjectURL(commentImagePath[0])}
            width={350}
            height={200}
            alt='kép'
         />
      </AddedImageContainer>
   )
}

export default DisplayCommentImage
