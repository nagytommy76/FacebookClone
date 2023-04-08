import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '../../../../../../../utils/axiosSetup/AxiosInstance'

import useUploadFirebase from './useUploadFirebase'

const usePostMutationFn = (description: string, postedPicturesPath: FileList | null) => {
   const handleImageUploadToFirebase = useUploadFirebase(postedPicturesPath as FileList)

   const handleAddPostSend = async (event: React.FormEvent): Promise<AxiosResponse> => {
      event.preventDefault()
      if (postedPicturesPath !== null) {
         await handleImageUploadToFirebase()
         console.log(postedPicturesPath[0].name)
      }
      return await axios.post('/post/save-post', {
         description,
         postedPicturesPath,
      })
   }
   return handleAddPostSend
}

export default usePostMutationFn
