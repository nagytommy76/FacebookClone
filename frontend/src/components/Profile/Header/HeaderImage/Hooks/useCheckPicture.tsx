import React, { useEffect, useState } from 'react'

const useCheckPicture = () => {
   const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
   const [uploadedPictures, setUploadedPictures] = useState<FileList | null>(null)

   useEffect(() => {
      if (!uploadedPictures) setIsButtonDisabled(true)
      else setIsButtonDisabled(false)
   }, [uploadedPictures])
   const addPictures = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUploadedPictures(e.target.files)
   }
   return {
      uploadedPictures,
      isButtonDisabled,
      addPictures,
      setUploadedPictures,
   }
}

export default useCheckPicture
