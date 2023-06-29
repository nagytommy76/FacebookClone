import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const useCreateAnswer = (
   postId: string,
   commentId: string,
   commentDepth: number,
   parentCommentId: string | null,
   commentAnswer: string
) => {
   const handleMutate = async () => {
      const response = await axios.post('/post/add-comment-answer', {
         postId,
         commentId,
         commentDepth,
         parentCommentId,
         answeredAt: new Date(),
         commentAnswer,
      })
      return response
   }

   const { mutate } = useMutation({
      mutationKey: ['saveAnswerText'],
      mutationFn: handleMutate,
   })
   return mutate
}

export default useCreateAnswer
