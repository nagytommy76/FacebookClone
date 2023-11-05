import React from 'react'
import { axiosInstance as axios, AxiosResponse } from '@/axios/AxiosInstance'
import { useMutation } from '@tanstack/react-query'

const updatePostFn = async (postDescription: string) => {
   return await axios.put('/post/edit/update-post', { postDescription })
}

const useModifyPost = () => {
   const { mutate } = useMutation({
      mutationKey: ['postUpdate'],
      mutationFn: updatePostFn,
   })
   return { updatePostMutate: mutate }
}

export default useModifyPost
