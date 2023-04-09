import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '../../../../../../../utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '../../../../../../../utils/redux/store'

const useUploadFirebase = (uploadImage: FileList) => {
   const userId = useAppSelector((state) => state.auth.userId)

   const handleMultipleImageUploadToFirebase = async () => {
      const uploadedImagesArray: string[] = []
      for (let index = 0; index < uploadImage.length; index++) {
         const singleImageFile = uploadImage[index]
         const imagesPath = await handleSingleImageUploadToFirebase(singleImageFile)
         console.log(imagesPath)
         uploadedImagesArray.push(imagesPath as string)
      }
      return uploadedImagesArray
   }

   const handleSingleImageUploadToFirebase = async (singleImageFile: File) => {
      try {
         const imageReference = ref(firebaseStorage, `${userId}/${v4()}_${singleImageFile.name}`)
         await uploadBytes(imageReference, singleImageFile)
         const currentImageLink = await getDownloadURL(imageReference)

         return currentImageLink
      } catch (error) {
         console.log(error)
      }
   }
   return handleMultipleImageUploadToFirebase
}

export default useUploadFirebase
