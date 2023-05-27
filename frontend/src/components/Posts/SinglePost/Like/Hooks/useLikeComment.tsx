import React from 'react'
import { axiosInstance as axios } from '../../../../../utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import type { LikeTypes } from '../Types'

interface ICommentLike {
   likeTypeFomInput: LikeTypes
   postId: string
   commentId?: string
}

const useLikeComment = () => {
   const handleSendLike = async ({ likeTypeFomInput, postId, commentId }: ICommentLike) => {
      try {
         return await axios.post('/post/post-comment-like', {
            reactionType: likeTypeFomInput,
            postId,
            commentId,
         })
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likeComment'],
      mutationFn: handleSendLike,
   })
   return { mutateCommentLike: mutate }
}

export default useLikeComment
