import { useState, useEffect } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import ImagePreview from './ImagePreview'
import ImageSelector from './ImageSelector/ImageSelector'

const AddImage: React.FC<{
   setUploadedPictures: Dispatch<SetStateAction<FileList | null>>
   uploadedPictures: FileList | null
   maxFileCount?: number
   multiple?: boolean
}> = ({ setUploadedPictures, uploadedPictures, maxFileCount = 3, multiple }) => {
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
         {!selectedFilePreview ? (
            <></>
         ) : (
            <ImagePreview
               setSelectedFilePreview={setSelectedFilePreview}
               selectedFilePreview={selectedFilePreview}
            />
         )}
         <ImageSelector
            multiple={multiple}
            maxFileCount={maxFileCount}
            handleSetUploadPictures={handleSetUploadPictures}
         />
      </>
   )
}

export default AddImage
