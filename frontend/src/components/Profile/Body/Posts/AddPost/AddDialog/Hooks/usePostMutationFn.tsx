import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '../../../../../../../utils/axiosSetup/AxiosInstance'

const usePostMutationFn = (description: string, postedPicturesPath?: FileList | null) => {
   const handleAddPostSend = async (event: React.FormEvent): Promise<AxiosResponse> => {
      event.preventDefault()
      return await axios.post('/post/save-post', {
         description,
         postedPicturesPath,
      })
   }
   return handleAddPostSend
}

export default usePostMutationFn
