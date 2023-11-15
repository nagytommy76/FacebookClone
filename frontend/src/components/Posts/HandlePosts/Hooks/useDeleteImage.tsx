import { ref, getStorage, deleteObject } from 'firebase/storage'

const useDeleteImage = () => {
   const storage = getStorage()

   const deleteImagesHelper = async (postedPicturesPath: string[]) => {
      for (const image of postedPicturesPath) {
         const currentImageRef = ref(storage, image)
         await deleteObject(currentImageRef)
      }
   }
   return deleteImagesHelper
}

export default useDeleteImage
