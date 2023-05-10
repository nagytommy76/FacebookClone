import { useState, useEffect } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import ImagePreview from './ImagePreview'
import ImageSelector from '../../../../Base/ImageSelector/ImageSelector'

import { StyledLabelAsButton } from './Style'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'

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
            <AddPhotoAlternateIcon />
            Válassz fényképeket {selectedFilePreview?.length}
         </StyledLabelAsButton>
         <ImageSelector maxFileCount={3} handleSetUploadPictures={handleSetUploadPictures} />
      </>
   )
}

export default AddImage
