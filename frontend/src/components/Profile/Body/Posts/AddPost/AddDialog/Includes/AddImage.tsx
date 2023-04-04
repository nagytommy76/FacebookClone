import { useState, useEffect } from 'react'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

const AddImage: React.FC<{
   setUploadedPictures: Dispatch<SetStateAction<FileList | null>>
   uploadedPictures: FileList | null
}> = ({ setUploadedPictures, uploadedPictures }) => {
   const [selectedFilePreview, setSelectedFilePreview] = useState()

   const handleSetUploadPictures = (event: ChangeEvent<HTMLInputElement>) => {
      setUploadedPictures(event.target.files)
   }

   useEffect(() => {
      if (!uploadedPictures) {
         setSelectedFilePreview(undefined)
         return
      }
      const objectUrl = URL.createObjectURL(uploadedPictures[0])
      console.log(objectUrl)
      setSelectedFilePreview(objectUrl as any)

      return () => URL.revokeObjectURL(objectUrl)
   }, [uploadedPictures])

   return (
      <>
         <img src={selectedFilePreview} />
         <input
            type='file'
            accept='image/*'
            onChange={handleSetUploadPictures}
            name='imageUpload'
            id='uploadImage'
         />
      </>
   )
}

export default AddImage
