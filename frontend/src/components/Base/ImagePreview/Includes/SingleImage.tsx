import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { StyledImagePreview, StyledRemoveIcon } from './Style'

const SingleImage: React.FC<{
   fileName?: string
   filePreviewUrl: string
   handleRemoveFromImages: (filePreview: string) => void
}> = ({ filePreviewUrl, fileName = '', handleRemoveFromImages }) => {
   return (
      <div
         style={{
            position: 'relative',
         }}
      >
         <StyledImagePreview width={500} height={200} alt={fileName} src={filePreviewUrl} />
         <StyledRemoveIcon
            onClick={() => handleRemoveFromImages(fileName)}
            color='info'
            sx={{
               backgroundColor: '#555',
            }}
         >
            <CloseIcon fontSize='inherit' />
         </StyledRemoveIcon>
      </div>
   )
}

export default SingleImage
