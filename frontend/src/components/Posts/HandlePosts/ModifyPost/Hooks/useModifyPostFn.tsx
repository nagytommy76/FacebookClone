import { useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { ImageContext } from '../../Context/ImageContextProvider'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import useUploadFirebase from '@/hooks/useUploadFirebase'

const useModifyPostFn = (modifiedDescription: string | null) => {
   const {
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)
   const {
      imageReducer: { newUploadedImages, uploadedImages },
   } = useContext(ImageContext)

   const { handleMultipleImageUploadToFirebase } = useUploadFirebase()
   const handlePostMutateFn = async () => {
      let returnedImagePaths: string[] | null = null
      if (newUploadedImages) {
         returnedImagePaths = await handleMultipleImageUploadToFirebase(newUploadedImages, _id)
      }
      return (await axios.put('/post/edit/update-post', {
         postId: _id,
         postDescription: modifiedDescription,
         modifiedImageLinks: uploadedImages,
         newAddedImageLinks: returnedImagePaths,
      })) as AxiosResponse<{ newImagesLinks: string[] | null }>
   }
   return { handlePostMutateFn }
}

export default useModifyPostFn
