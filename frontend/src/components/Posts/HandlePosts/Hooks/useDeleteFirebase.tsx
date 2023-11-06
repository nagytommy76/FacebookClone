import { useContext } from 'react'
import { ImageContext } from '../Context/ImageContextProvider'
import { PostContext } from '@/PostContext/PostContextProvider'

import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage'
import { firebaseStorage } from '@/utils/firebase/firebase'

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

   const desertRef = ref(storage, 'images/desert.jpg')

   const returnDeletedImages = async () => {
      // Ezzel megvannak a kitörölt elemek amiket a firebase-en törölnöm kell az onSucecss-ben
      // Ha NULL akkkor simán nem hívom meg ezt a hookot
      let deletedImages: string[] = []
      for (const iterator of postedPicturesPath as string[]) {
         if (!uploadedImages?.includes(iterator)) {
            deletedImages.push(iterator)
         }
      }
      console.log(deletedImages)
   }

   return returnDeletedImages
}

export default useDeleteFirebase
