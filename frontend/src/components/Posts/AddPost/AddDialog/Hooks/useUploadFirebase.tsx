import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '@/utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '@/reduxStore/store'

const useUploadFirebase = () => {
   const userId = useAppSelector((state) => state.auth.userId)

   const handleMultipleImageUploadToFirebase = async (uploadImage: string[]) => {
      const uploadedImagesArray: string[] = []
      for (let index = 0; index < uploadImage.length; index++) {
         // const singleImageFile = new Blob([uploadImage[index]], { type: 'text/plain' })
         const response = await fetch(uploadImage[index])
         const blob = await response.blob()

         const file = new File([blob], 'test', { type: blob.type })

         console.log(file)
         const imagesPath = await handleSingleImageUploadToFirebase(file)
         uploadedImagesArray.push(imagesPath as string)
      }
      return uploadedImagesArray
   }

   const handleSingleImageUploadToFirebase = async (
      singleImageFile: Blob | File,
      subFolderName: string = 'posts'
   ) => {
      try {
         const imageReference = ref(
            firebaseStorage,
            `${userId}/${subFolderName}/${v4()}_${singleImageFile.name}`
         )
         await uploadBytes(imageReference, singleImageFile)
         const currentImageLink = await getDownloadURL(imageReference)

         return currentImageLink
      } catch (error) {
         console.log(error)
      }
   }
   return { handleMultipleImageUploadToFirebase, handleSingleImageUploadToFirebase }
}

export default useUploadFirebase
