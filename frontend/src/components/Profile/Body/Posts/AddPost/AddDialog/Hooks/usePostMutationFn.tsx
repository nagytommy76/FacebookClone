import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '../../../../../../../utils/axiosSetup/AxiosInstance'

import useUploadFirebase from './useUploadFirebase'

const usePostMutationFn = (description: string, postedPicturesPath: FileList | null) => {
   const handleAddPostSend = async (event: React.FormEvent): Promise<AxiosResponse> => {
      event.preventDefault()
      let uploadedImagesPaths = null
      if (postedPicturesPath) {
         const handleMultipleImageUploadToFirebase = useUploadFirebase(postedPicturesPath)
         uploadedImagesPaths = await handleMultipleImageUploadToFirebase()
      }

      return await axios.post('/post/save-post', {
         description,
         postedPicturesPath: uploadedImagesPaths,
      })
   }
   return handleAddPostSend
}

export default usePostMutationFn
