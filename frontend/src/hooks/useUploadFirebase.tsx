import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { firebaseStorage } from '@/utils/firebase/firebase'
import { v4 } from 'uuid'

import { useAppSelector } from '@/reduxStore/store'

const useUploadFirebase = () => {
   const userId = useAppSelector((state) => state.auth.userId)

   const handleMultipleImageUploadToFirebase = async (uploadImage: File[], postID: string) => {
      const uploadedImagesArray: string[] = []
      for (let index = 0; index < uploadImage.length; index++) {
         const singleImageFile = uploadImage[index]
         const imagesPath = await handleSingleImageUploadToFirebase(singleImageFile, postID)
         uploadedImagesArray.push(imagesPath as string)
      }
      return uploadedImagesArray
   }

   const handleSingleProfileImageUploadToFirebase = async (singleImageFile: Blob | File, userId: string) => {
      try {
         const imageReference = ref(
            firebaseStorage,
            `${userId}/profilePicture/${v4()}_${singleImageFile.name}`
         )
         await uploadBytes(imageReference, singleImageFile)
         const currentImageLink = await getDownloadURL(imageReference)

         return currentImageLink
      } catch (error) {
         console.log(error)
         return null
      }
   }

   const handleSingleImageUploadToFirebase = async (
      singleImageFile: Blob | File,
      postID: string,
      isCommentImage: boolean = false,
      subFolderName: string = 'posts'
   ) => {
      try {
         const imageReference = ref(
            firebaseStorage,
            `${userId}/${subFolderName}/${postID}/${isCommentImage ? 'comments/' : ''}${v4()}_${
               singleImageFile.name
            }`
         )
         await uploadBytes(imageReference, singleImageFile)
         const currentImageLink = await getDownloadURL(imageReference)

         return currentImageLink
      } catch (error) {
         console.log(error)
         return null
      }
   }

   const handleChatImgUpload = async (chatId: string, chatImage: File) => {
      try {
         const imageReference = ref(firebaseStorage, `${chatId}/${v4()}_${chatImage.name}`)
         await uploadBytes(imageReference, chatImage)
         const currentImageLink = await getDownloadURL(imageReference)

         return currentImageLink
      } catch (error) {
         console.log(error)
         return null
      }
   }

   return {
      handleMultipleImageUploadToFirebase,
      handleSingleImageUploadToFirebase,
      handleSingleProfileImageUploadToFirebase,
      handleChatImgUpload,
   }
}

export default useUploadFirebase
