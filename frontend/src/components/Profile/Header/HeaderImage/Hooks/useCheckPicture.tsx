import { useEffect, useState } from 'react'

const useCheckPicture = () => {
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)

   useEffect(() => {
      if (!uploadedPictures) setIsButtonDisabled(true)
      else setIsButtonDisabled(false)
   }, [uploadedPictures])
   return {
      uploadedPictures,
      isButtonDisabled,
      setUploadedPictures,
   }
}

export default useCheckPicture
