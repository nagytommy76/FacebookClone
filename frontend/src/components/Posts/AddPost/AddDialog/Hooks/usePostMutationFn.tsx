import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'

import useUploadFirebase from './useUploadFirebase'
import type { IPost } from '@/types/PostTypes'

const usePostMutationFn = (description: string, postedPicturesPath: FileList | null) => {
   const { handleMultipleImageUploadToFirebase } = useUploadFirebase()
   const handleAddPostSend = async (
      event: React.FormEvent
   ): Promise<AxiosResponse<{ createdPost: IPost }>> => {
      event.preventDefault()
      let uploadedImagesPaths = null
      if (postedPicturesPath) {
         uploadedImagesPaths = await handleMultipleImageUploadToFirebase(postedPicturesPath)
      }

      return await axios.post('/post/save-post', {
         description,
         postedPicturesPath: uploadedImagesPaths,
      })
   }
   return handleAddPostSend
}

export default usePostMutationFn
