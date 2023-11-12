import { useContext } from 'react'
import { ImageContext } from '../Context/ImageContextProvider'
import { PostContext } from '@/PostContext/PostContextProvider'

import { ref, getStorage, deleteObject } from 'firebase/storage'

const returnDeletedImages = (
   postedPicturesPath: string[] | null,
   uploadedImages: string[] | null
): string[] | null => {
   // Ezzel megvannak a kitörölt elemek amiket a firebase-en törölnöm kell az onSucecss-ben
   // Ha NULL akkkor simán nem hívom meg ezt a hookot
   if (postedPicturesPath === null || uploadedImages === null) return null
   let deletedImages: string[] = []
   for (const postedImage of postedPicturesPath as string[]) {
      if (!uploadedImages.includes(postedImage)) {
         deletedImages.push(postedImage)
      }
   }
   return deletedImages
}

const useDeleteFirebase = () => {
   const {
      imageReducer: { uploadedImages },
   } = useContext(ImageContext)
   const {
      // A meglévő képekből kell "kivonnom a törölt képeket. HA null ->return"
      postsReducer: {
         singlePost: { postedPicturesPath },
      },
   } = useContext(PostContext)

   const storage = getStorage()

   const deleteImagesFromFirebase = async () => {
      const deletedImages = returnDeletedImages(postedPicturesPath, uploadedImages)
      if (deletedImages === null) return null
      for (const currentImage of deletedImages) {
         const currentImageRef = ref(storage, currentImage)
         await deleteObject(currentImageRef)
      }
   }

   return { deleteImagesFromFirebase }
}

export default useDeleteFirebase
