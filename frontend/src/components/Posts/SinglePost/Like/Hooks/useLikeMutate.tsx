import React from 'react'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { LikeTypes } from '../../../../Profile/Body/Posts/OwnPosts/Types'

interface ISendLike {
   likeTypeFomInput: LikeTypes
   postId: string
}

const useLikeMutate = () => {
   const handleSendLike = async ({ likeTypeFomInput, postId }: ISendLike) => {
      try {
         return await axios.post('/post/post-like', { reactionType: likeTypeFomInput, postId })
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likePost'],
      mutationFn: handleSendLike,
   })
   return { mutatePostLike: mutate }
}

export default useLikeMutate
