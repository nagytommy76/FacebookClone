import { useContext, Dispatch, SetStateAction } from 'react'
import { PostContext } from '@/PostContext/PostContextProvider'
import { ImageContext } from '../../Context/ImageContextProvider'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'

import useUploadFirebase from '../../Hooks/useUploadFirebase'

const useModifyPostFn = (
   modifiedImageLinks: string[] | null,
   modifiedDescription: string | null,
   newUploadedImages: File[] | null,
   setNewFirebaseImageLinks: Dispatch<SetStateAction<string[] | null>>
) => {
   const {
      // postsDispatch,
      postsReducer: {
         singlePost: { _id },
      },
   } = useContext(PostContext)
   const { imageDispatch } = useContext(ImageContext)
   const { handleMultipleImageUploadToFirebase } = useUploadFirebase()
   const handlePostMutateFn = async () => {
      let returnedImagePaths: string[] | null = null
      if (newUploadedImages) {
         returnedImagePaths = await handleMultipleImageUploadToFirebase(newUploadedImages)
         // postsDispatch({ type: 'ADD_UPLOADED_IMAGES', payload: returnedImagePaths })
         setNewFirebaseImageLinks(returnedImagePaths)
         // imageDispatch({ type: 'SET_FIREBASE_IMAGES', payload: returnedImagePaths })
      }
      return await axios.put('/post/edit/update-post', {
         postId: _id,
         postDescription: modifiedDescription,
         modifiedImageLinks,
         newAddedImageLinks: returnedImagePaths,
      })
   }
   return { handlePostMutateFn }
}

export default useModifyPostFn
