import { useState, useEffect } from 'react'

const useGetImgURL = (uploadedPictures: FileList | null) => {
   const [image, setImage] = useState<string | null>(null)
   useEffect(() => {
      if (uploadedPictures !== null) {
         const imageUrl = URL.createObjectURL(uploadedPictures[0])
         setImage(imageUrl)
         return () => URL.revokeObjectURL(imageUrl)
      }
   }, [uploadedPictures])
   return image
}

export default useGetImgURL
