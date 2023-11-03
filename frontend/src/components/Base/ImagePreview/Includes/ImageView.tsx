import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

import { StyledImagePreview, StyledImagePreviewContainer, StyledRemoveIcon } from './Style'

const ImageView: React.FC<{
   selectedFilePreview: string[]
   handleRemoveFromImages: (filePreview: string) => void
}> = ({ selectedFilePreview, handleRemoveFromImages }) => {
   return (
      <StyledImagePreviewContainer>
         {selectedFilePreview.map((filePreview, index) => (
            <div
               key={index}
               style={{
                  position: 'relative',
               }}
            >
               <StyledImagePreview key={index} width={500} height={200} alt={filePreview} src={filePreview} />
               <StyledRemoveIcon
                  onClick={() => handleRemoveFromImages(filePreview)}
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

export default ImageView
