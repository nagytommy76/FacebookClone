import { useState, useEffect } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import ImagePreview from './ImagePreview'

import { StyledImageInputField, StyledLabelAsButton } from './Style'
import UploadFileIcon from '@mui/icons-material/UploadFile'

const AddImage: React.FC<{
   setUploadedPictures: Dispatch<SetStateAction<FileList | null>>
   uploadedPictures: FileList | null
}> = ({ setUploadedPictures, uploadedPictures }) => {
   const [selectedFilePreview, setSelectedFilePreview] = useState<string[] | undefined>(undefined)

   const handleSetUploadPictures = (event: ChangeEvent<HTMLInputElement>) => {
      setUploadedPictures(event.target.files)
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
         {!selectedFilePreview ? <></> : <ImagePreview selectedFilePreview={selectedFilePreview} />}
         <StyledLabelAsButton htmlFor='uploadImage'>
            <UploadFileIcon />
            Válassz fényképeket {selectedFilePreview?.length}
         </StyledLabelAsButton>
         <StyledImageInputField
            type='file'
            accept='image/*'
            multiple
            max={3}
            onChange={handleSetUploadPictures}
            name='imageUpload'
            id='uploadImage'
         />
      </>
   )
}

export default AddImage
