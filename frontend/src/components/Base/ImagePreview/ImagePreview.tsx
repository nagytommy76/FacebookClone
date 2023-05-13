import React from 'react'

import { StyledImagePreview, StyledImagePreviewContainer } from './Style'

const ImagePreview: React.FC<{ selectedFilePreview: string[] }> = ({ selectedFilePreview }) => {
   return (
      <StyledImagePreviewContainer>
         {selectedFilePreview.map((filePreview, index) => (
            <StyledImagePreview key={index} width={500} height={200} alt={filePreview} src={filePreview} />
         ))}
      </StyledImagePreviewContainer>
   )
}

export default ImagePreview
