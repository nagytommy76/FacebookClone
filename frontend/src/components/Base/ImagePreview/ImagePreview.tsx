import React, { Dispatch, SetStateAction } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { StyledImagePreview, StyledImagePreviewContainer, StyledRemoveIcon } from './Style'

const ImagePreview: React.FC<{
   selectedFilePreview: string[]
   setSelectedFilePreview: Dispatch<SetStateAction<string[] | undefined>>
}> = ({ selectedFilePreview, setSelectedFilePreview }) => {
   const removeSingleImgOnClick = (filePreview: string) => {
      setSelectedFilePreview((prev) => prev?.filter((image) => image != filePreview))
   }

   return (
      <StyledImagePreviewContainer>
         {selectedFilePreview.map((filePreview, index) => (
            <div
               key={index}
               style={{
                  position: 'relative',
               }}
            >
               <StyledImagePreview
                  key={index}
                  width={500}
                  height={200}
                  alt={filePreview}
                  src={filePreview}
               />
               <StyledRemoveIcon
                  onClick={() => removeSingleImgOnClick(filePreview)}
                  color='info'
                  sx={{
                     backgroundColor: '#555',
                  }}
               >
                  <CloseIcon fontSize='inherit' />
               </StyledRemoveIcon>
            </div>
         ))}
      </StyledImagePreviewContainer>
   )
}

export default ImagePreview
