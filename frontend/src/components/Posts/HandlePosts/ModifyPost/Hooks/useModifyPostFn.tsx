import { useContext } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import useUploadFirebase from '../../Hooks/useUploadFirebase'

const useModifyPostFn = (
   modifiedImageLinks: string[] | null,
   postDescription: string | null,
   newUploadedImages: File[] | null
) => {
   const {
      postsDispatch,
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)
   const { handleMultipleImageUploadToFirebase } = useUploadFirebase()
   const handlePostMutateFn = async () => {
      let returnedImagePaths: string[] | null = null
      if (newUploadedImages) {
         returnedImagePaths = await handleMultipleImageUploadToFirebase(newUploadedImages)
         postsDispatch({ type: 'ADD_UPLOADED_IMAGES', payload: returnedImagePaths })
      }
      return await axios.put('/post/edit/update-post', {
         postId: _id,
         postDescription,
         modifiedImageLinks,
         newAddedImageLinks: returnedImagePaths,
      })
   }
   return { handlePostMutateFn }
}

export default useModifyPostFn
