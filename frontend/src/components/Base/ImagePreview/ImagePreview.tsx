import React, { useState, useEffect } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { StyledImagePreview, StyledImagePreviewContainer, StyledRemoveIcon } from './Style'

const ImagePreview: React.FC<{
   uploadedPictures: FileList | null
}> = ({ uploadedPictures }) => {
   const [selectedFilePreview, setSelectedFilePreview] = useState<string[] | undefined>(undefined)
   const removeSingleImgOnClick = (filePreview: string) => {
      setSelectedFilePreview((prev) => prev?.filter((image) => image != filePreview))
   }

   useEffect(() => {
      if (!uploadedPictures) {
         setSelectedFilePreview(undefined)
         return
      }
      let objectUrl: string[] = []
      for (let index = 0; index < uploadedPictures.length; index++) {
         objectUrl.push(URL.createObjectURL(uploadedPictures[index]))
      }
      setSelectedFilePreview(objectUrl)
   }, [uploadedPictures])

   return (
      <>
         {!selectedFilePreview ? (
            <></>
         ) : (
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
         )}
      </>
   )
}

export default ImagePreview
