import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '@/utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '@/reduxStore/store'

const useUploadFirebase = () => {
   const userId = useAppSelector((state) => state.auth.userId)

   const handleMultipleImageUploadToFirebase = async (uploadImage: File[]) => {
      const uploadedImagesArray: string[] = []
      for (let index = 0; index < uploadImage.length; index++) {
         const singleImageFile = uploadImage[index]
         const imagesPath = await handleSingleImageUploadToFirebase(singleImageFile)
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
