import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { axiosInstance as axios } from '@/src/utils/axiosSetup/AxiosInstance'

const mutationFunction = async ({ answerId, postId }: { answerId: string; postId: string }) => {
   const response = await axios.delete('/post/post-comment-answer-delete', {
      data: { answerId, postId },
   })
   return response.data
}

const useRemoveAnswer = () => {
   const { mutate } = useMutation({
      mutationKey: ['deleteCommentAnswer'],
      mutationFn: mutationFunction,
   })
   return mutate
}

export default useRemoveAnswer
