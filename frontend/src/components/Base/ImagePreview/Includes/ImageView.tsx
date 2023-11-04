import useImage from './Hook/useImage'

import { StyledImagePreviewContainer } from './Style'
import SingleImage from './SingleImage'

const ImageView: React.FC<{
   selectedFilePreview: File[] | string[]
   handleRemoveFromImages: (filePreview: string) => void
}> = ({ selectedFilePreview, handleRemoveFromImages }) => {
   const { displayImages, imageUrls } = useImage(selectedFilePreview)

   return (
      <StyledImagePreviewContainer>
         {displayImages &&
            displayImages.map((filePreview, index) => (
               <SingleImage
                  key={index}
                  filePreviewUrl={filePreview.url}
                  fileName={filePreview.name}
                  handleRemoveFromImages={handleRemoveFromImages}
               />
            ))}
         {imageUrls &&
            imageUrls.map((image, index) => (
               <SingleImage
                  key={index}
                  fileName={image}
                  filePreviewUrl={image}
                  handleRemoveFromImages={handleRemoveFromImages}
               />
            ))}
      </StyledImagePreviewContainer>
   )
}

export default ImageView
