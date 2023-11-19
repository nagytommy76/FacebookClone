import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/utils/axiosSetup/AxiosInstance'
import type { IPost } from '@/types/PostTypes'

const usePostMutationFn = (description: string) => {
   const handleAddPostSend = async (
      event: React.FormEvent
   ): Promise<AxiosResponse<{ createdPost: IPost }>> => {
      event.preventDefault()
      return await axios.post('/post/save-post', {
         description,
      })
   }
   return handleAddPostSend
}

export default usePostMutationFn
