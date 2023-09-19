import React from 'react'
import { AxiosResponse, axiosInstance as axios } from '@/utils/axiosSetup/AxiosInstance'
import { useMutation } from '@tanstack/react-query'
import { CommentContext } from '@/CommentContext/CommentContext'

interface IAnswerLike {
   commentId: string
   postId: string
   commentAnswerId?: string
   reactionType: string
}

const useLikeAnswer = () => {
   const handleSendAnswerLike = async ({ commentId, postId, commentAnswerId, reactionType }: IAnswerLike) => {
      try {
         const response = await axios.post('post/comment-answer-like', {
            commentId,
            postId,
            commentAnswerId,
            reactionType,
         })
         return response
      } catch (error) {
         console.log(error)
      }
   }

   const { mutate } = useMutation({
      mutationKey: ['likeCommentAnswer'],
      mutationFn: handleSendAnswerLike,
   })
   return { mutateAnswerLike: mutate }
}

export default useLikeAnswer
