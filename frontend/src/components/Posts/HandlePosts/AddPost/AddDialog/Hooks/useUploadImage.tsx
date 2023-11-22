import { useContext } from 'react'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

import type { IPost } from '@/src/types/PostTypes'
import { ImageContext } from '../../../Context/ImageContextProvider'
import useUploadFirebase from '@/hooks/useUploadFirebase'

const useUploadImage = () => {
   const {
      imageReducer: { newUploadedImages },
   } = useContext(ImageContext)
   const { handleMultipleImageUploadToFirebase } = useUploadFirebase()

   const handleUploadNewImages = async (createdPost: IPost) => {
      if (newUploadedImages) {
         let uploadedImagesPaths: string[] | null = null
         uploadedImagesPaths = await handleMultipleImageUploadToFirebase(newUploadedImages, createdPost._id)
         // Itt kell egy újabb AXIOS call /post/save-post-image
         // Majd hozzá kell fűzni a kép[]-t a data.data.createdPost-hoz és ezt az obj-t átadni a addNewPost-nrk

         const response = await axios.put('/post/save-post-image', {
            postId: createdPost._id,
            postedPicturesPath: uploadedImagesPaths,
         })
         if (response.status === 201) createdPost.postedPicturesPath = uploadedImagesPaths
      }
   }
   return handleUploadNewImages
}

export default useUploadImage
